# Backend Architecture Improvements

While the current Flask + SQLite setup works perfectly for a demo, we should introduce structural improvements to ensure security, maintainability, and scalability.

## 1. ORM Integration
Currently, the backend uses raw SQL strings (`c.execute('SELECT * FROM users...')`).
- **Recommendation**: Integrate an Object-Relational Mapper (ORM) like **SQLAlchemy** (via `Flask-SQLAlchemy`).
- **Benefits**: This prevents SQL injection vulnerabilities, makes complex queries (like joins) easier to read, simplifies database schema migrations, and allows seamless switching to PostgreSQL in production.

## 2. Input Validation & Serialization
Currently, input is minimally validated (`if not all([name, email, password, location]): return error`).
- **Recommendation**: Use **Marshmallow** or **Pydantic** schemas for request validation.
- **Benefits**: Automatically validates email formats, enforces password complexity, and standardizes how JSON payloads are serialized and sent back to the frontend.

## 3. Security Enhancements
- **Rate Limiting**: Add `Flask-Limiter` to protect login and registration endpoints from brute-force attacks.
- **Environment Variables**: Move secrets (like the JWT signing key) and configuration parameters to a `.env` file instead of hardcoding them or generating them insecurely. The current `.env` configuration should be fully wired into `app.py`.
