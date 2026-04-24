from flask import Flask, request, jsonify
from flask_cors import CORS
from models import get_db_connection, init_db
from auth import hash_password, verify_password, generate_token, decode_token
import sqlite3

app = Flask(__name__)
CORS(app)

# Initialize DB on startup
init_db()

def get_current_user_id(request):
    auth_header = request.headers.get('Authorization')
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        user_id = decode_token(token)
        if isinstance(user_id, int):
            return user_id
    return None

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    location = data.get('location')

    if not all([name, email, password, location]):
        return jsonify({'error': 'Missing required fields'}), 400

    hashed_pw = hash_password(password)

    conn = get_db_connection()
    c = conn.cursor()
    try:
        c.execute('INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)',
                  (name, email, hashed_pw, location))
        conn.commit()
        user_id = c.lastrowid
        token = generate_token(user_id)
        return jsonify({'token': token, 'user': {'id': user_id, 'name': name, 'email': email, 'location': location}}), 201
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Email already exists'}), 409
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    conn = get_db_connection()
    c = conn.cursor()
    user = c.execute('SELECT * FROM users WHERE email = ?', (email,)).fetchone()
    conn.close()

    if user and verify_password(password, user['password']):
        token = generate_token(user['id'])
        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'name': user['name'],
                'email': user['email'],
                'location': user['location']
            }
        }), 200
    
    return jsonify({'error': 'Invalid email or password'}), 401


@app.route('/api/profile', methods=['GET', 'PUT'])
def profile():
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    conn = get_db_connection()
    c = conn.cursor()

    if request.method == 'GET':
        user = c.execute('SELECT id, name, email, location, profile_photo, bio, languages, social_links FROM users WHERE id = ?', (user_id,)).fetchone()
        conn.close()
        if user:
            return jsonify(dict(user)), 200
        return jsonify({'error': 'User not found'}), 404

    elif request.method == 'PUT':
        data = request.json
        name = data.get('name')
        email = data.get('email')
        location = data.get('location')
        profile_photo = data.get('profile_photo')
        bio = data.get('bio')
        languages = data.get('languages')
        social_links = data.get('social_links')
        
        try:
            c.execute('''
                UPDATE users 
                SET name = ?, email = ?, location = ?, profile_photo = ?, bio = ?, languages = ?, social_links = ?
                WHERE id = ?
            ''', (name, email, location, profile_photo, bio, languages, social_links, user_id))
            conn.commit()
            conn.close()
            return jsonify({'message': 'Profile updated successfully'}), 200
        except sqlite3.IntegrityError:
            conn.close()
            return jsonify({'error': 'Email already exists'}), 409


@app.route('/api/listings', methods=['GET', 'POST'])
def handle_listings():
    conn = get_db_connection()
    c = conn.cursor()

    if request.method == 'GET':
        category = request.args.get('category')
        max_km = request.args.get('max_km', default=4.0, type=float)
        
        query = '''
            SELECT l.id, l.teacher_id, l.category, l.subcategory, l.description, l.availability, l.trial_info, l.distance_km,
                   u.name as teacher_name, u.location as teacher_location, u.email as teacher_email, u.bio as teacher_bio, u.social_links as teacher_social_links
            FROM listings l
            JOIN users u ON l.teacher_id = u.id
            WHERE l.distance_km <= ?
        '''
        params = [max_km]
        
        if category:
            query += ' AND l.category = ?'
            params.append(category)
            
        listings = c.execute(query, params).fetchall()
        conn.close()
        return jsonify([dict(row) for row in listings]), 200

    elif request.method == 'POST':
        user_id = get_current_user_id(request)
        if not user_id:
            conn.close()
            return jsonify({'error': 'Unauthorized'}), 401
            
        data = request.json
        c.execute('''
            INSERT INTO listings (teacher_id, category, subcategory, description, availability, trial_info, distance_km)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, data['category'], data['subcategory'], data['description'], 
              data['availability'], data.get('trial_info', ''), data.get('distance_km', 0.0)))
        
        conn.commit()
        listing_id = c.lastrowid
        conn.close()
        return jsonify({'message': 'Listing created', 'id': listing_id}), 201

@app.route('/api/listings/mine', methods=['GET'])
def get_my_listings():
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    conn = get_db_connection()
    c = conn.cursor()
    listings = c.execute('''
        SELECT l.id, l.category, l.subcategory, l.description, l.availability, l.trial_info, l.created_at,
               (SELECT COUNT(*) FROM enrollments e WHERE e.listing_id = l.id AND e.status = 'accepted') as student_count
        FROM listings l
        WHERE l.teacher_id = ?
        ORDER BY l.created_at DESC
    ''', (user_id,)).fetchall()
    conn.close()
    return jsonify([dict(row) for row in listings]), 200

@app.route('/api/listings/<int:id>/students', methods=['GET'])
def get_listing_students(id):
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    conn = get_db_connection()
    c = conn.cursor()

    # Verify teacher owns this listing
    listing = c.execute('SELECT teacher_id, subcategory, category FROM listings WHERE id = ?', (id,)).fetchone()
    if not listing:
        conn.close()
        return jsonify({'error': 'Not found'}), 404
    if listing['teacher_id'] != user_id:
        conn.close()
        return jsonify({'error': 'Forbidden'}), 403

    students = c.execute('''
        SELECT u.id, u.name, u.email, u.location, e.type, e.status
        FROM enrollments e
        JOIN users u ON e.learner_id = u.id
        WHERE e.listing_id = ? AND e.status = 'accepted'
    ''', (id,)).fetchall()
    conn.close()
    return jsonify({
        'listing': {'id': id, 'subcategory': listing['subcategory'], 'category': listing['category']},
        'students': [dict(s) for s in students]
    }), 200

@app.route('/api/listings/<int:id>', methods=['DELETE'])
def delete_listing(id):
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
        
    conn = get_db_connection()
    c = conn.cursor()
    
    # Check ownership
    listing = c.execute('SELECT teacher_id FROM listings WHERE id = ?', (id,)).fetchone()
    if not listing:
        conn.close()
        return jsonify({'error': 'Not found'}), 404
    if listing['teacher_id'] != user_id:
        conn.close()
        return jsonify({'error': 'Forbidden'}), 403
        
    c.execute('DELETE FROM listings WHERE id = ?', (id,))
    # also delete enrollments for this listing
    c.execute('DELETE FROM enrollments WHERE listing_id = ?', (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Deleted successfully'}), 200

@app.route('/api/enrollments', methods=['POST'])
def create_enrollment():
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
        
    data = request.json
    listing_id = data.get('listing_id')
    req_type = data.get('type', 'enroll') # "enroll" or "trial"
    
    conn = get_db_connection()
    c = conn.cursor()
    c.execute('''
        INSERT INTO enrollments (learner_id, listing_id, type, status)
        VALUES (?, ?, ?, ?)
    ''', (user_id, listing_id, req_type, 'pending'))
    
    conn.commit()
    enrollment_id = c.lastrowid
    conn.close()
    return jsonify({'message': 'Enrollment requested', 'id': enrollment_id}), 201

@app.route('/api/enrollments/learner', methods=['GET'])
def get_learner_enrollments():
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
        
    conn = get_db_connection()
    c = conn.cursor()
    enrollments = c.execute('''
        SELECT e.id, e.type, e.status, l.category, l.subcategory, u.name as teacher_name, u.email as teacher_email, u.bio as teacher_bio, u.social_links as teacher_social_links
        FROM enrollments e
        JOIN listings l ON e.listing_id = l.id
        JOIN users u ON l.teacher_id = u.id
        WHERE e.learner_id = ?
    ''', (user_id,)).fetchall()
    conn.close()
    
    return jsonify([dict(row) for row in enrollments]), 200

@app.route('/api/enrollments/teacher', methods=['GET'])
def get_teacher_enrollments():
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
        
    conn = get_db_connection()
    c = conn.cursor()
    enrollments = c.execute('''
        SELECT e.id, e.type, e.status, l.category, l.subcategory, u.name as learner_name
        FROM enrollments e
        JOIN listings l ON e.listing_id = l.id
        JOIN users u ON e.learner_id = u.id
        WHERE l.teacher_id = ? AND e.status = 'pending'
    ''', (user_id,)).fetchall()
    conn.close()
    
    return jsonify([dict(row) for row in enrollments]), 200

@app.route('/api/enrollments/teacher/all', methods=['GET'])
def get_all_teacher_enrollments():
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401

    conn = get_db_connection()
    c = conn.cursor()
    enrollments = c.execute('''
        SELECT e.id, e.type, e.status, l.id as listing_id, l.category, l.subcategory, u.name as learner_name, u.email as learner_email
        FROM enrollments e
        JOIN listings l ON e.listing_id = l.id
        JOIN users u ON e.learner_id = u.id
        WHERE l.teacher_id = ?
        ORDER BY
            CASE e.status WHEN 'pending' THEN 0 WHEN 'accepted' THEN 1 WHEN 'rejected' THEN 2 END,
            e.id DESC
    ''', (user_id,)).fetchall()
    conn.close()
    return jsonify([dict(row) for row in enrollments]), 200

@app.route('/api/enrollments/<int:id>/status', methods=['PATCH'])
def update_enrollment_status(id):
    user_id = get_current_user_id(request)
    if not user_id:
        return jsonify({'error': 'Unauthorized'}), 401
        
    data = request.json
    new_status = data.get('status')
    if new_status not in ['accepted', 'rejected']:
        return jsonify({'error': 'Invalid status'}), 400
        
    conn = get_db_connection()
    c = conn.cursor()
    
    # Check if teacher owns the listing
    enrollment = c.execute('''
        SELECT l.teacher_id 
        FROM enrollments e
        JOIN listings l ON e.listing_id = l.id
        WHERE e.id = ?
    ''', (id,)).fetchone()
    
    if not enrollment:
        conn.close()
        return jsonify({'error': 'Not found'}), 404
        
    if enrollment['teacher_id'] != user_id:
        conn.close()
        return jsonify({'error': 'Forbidden'}), 403
        
    c.execute('UPDATE enrollments SET status = ? WHERE id = ?', (new_status, id))
    conn.commit()
    conn.close()
    
    return jsonify({'message': 'Status updated'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5001)
