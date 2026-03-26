import sqlite3
from auth import hash_password
from models import init_db

def seed_database():
    init_db()
    conn = sqlite3.connect('database.db')
    c = conn.cursor()
    
    # Check if we already seeded
    users_count = c.execute('SELECT COUNT(*) FROM users').fetchone()[0]
    if users_count > 0:
        print("Database already seeded.")
        conn.close()
        return

    print("Seeding database...")
    
    pw = hash_password('password123')
    
    # 5 Mock Teachers
    teachers = [
        ('Rahul Mehta', 'rahul@example.com', pw, 'Andheri West'),
        ('Priya Shah', 'priya@example.com', pw, 'Bandra'),
        ('Marco DSilva', 'marco@example.com', pw, 'Koregaon Park'),
        ('Anita Desai', 'anita@example.com', pw, 'Juhu'),
        ('Vikram Singh', 'vikram@example.com', pw, 'Powai')
    ]
    
    c.executemany('INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)', teachers)
    
    # Add a mock learner who already has some enrollments to see
    c.execute('INSERT INTO users (name, email, password, location) VALUES (?, ?, ?, ?)',
              ('Test Learner', 'learner@test.com', pw, 'Andheri East'))
    learner_id = c.lastrowid
    
    # 10-12 mock listings spread across categories
    listings = [
        (1, 'Music', 'Guitar', 'I have been playing guitar for 10 years and love teaching beginners.', 'Weekends 10am-12pm', 'First 30 min trial is free, we will cover basic chords.', 2.1),
        (2, 'Music', 'Piano', 'Classically trained pianist.', 'Mon-Wed 6pm-8pm', '', 3.5),
        (3, 'Art', 'Sketching', 'Learn portrait and landscape sketching.', 'Sundays only', '15 min intro call and quick sketch demo.', 1.4),
        (2, 'Cooking', 'Baking', 'Master the art of sourdough and cakes.', 'Tue-Thu 4pm-7pm', '', 4.2),
        (4, 'Cooking', 'Indian Cuisine', 'North Indian delicacies and street food.', 'Daily after 7pm', 'Cook a quick meal with me in 20 mins!', 5.8),
        (5, 'Driving', 'Car (Manual)', 'Patience is my strong suit. Learn driving safely.', 'Weekends early morning', '', 0.8),
        (1, 'Driving', 'Parking & Basics', 'Struggle with parallel parking? I can help.', 'Anytime on weekends', '10 min brief session.', 2.5),
        (3, 'Dance', 'Salsa', 'Fun and energetic salsa sessions.', 'Fridays 8pm', '', 7.1),
        (4, 'Dance', 'Hip-Hop', 'Urban styles and choreo.', 'Mon-Wed 5pm', 'Learn a simple 15-sec choreo.', 6.2),
        (5, 'Drama', 'Acting', 'Method acting basics.', 'Saturdays 2pm-5pm', '', 3.9),
        (2, 'Drama', 'Storytelling', 'Engage your audience with voice modulations.', 'Wednesdays 8pm', 'A short story recitation.', 1.1)
    ]
    c.executemany('INSERT INTO listings (teacher_id, category, subcategory, description, availability, trial_info, distance_km) VALUES (?, ?, ?, ?, ?, ?, ?)', listings)
    
    # Mock enrollments
    c.execute("INSERT INTO enrollments (learner_id, listing_id, type, status) VALUES (?, 1, 'enroll', 'pending')", (learner_id,))
    c.execute("INSERT INTO enrollments (learner_id, listing_id, type, status) VALUES (?, 4, 'enroll', 'accepted')", (learner_id,))
    c.execute("INSERT INTO enrollments (learner_id, listing_id, type, status) VALUES (?, 8, 'enroll', 'rejected')", (learner_id,))
    
    conn.commit()
    print("Seeding complete.")
    conn.close()

if __name__ == '__main__':
    seed_database()
