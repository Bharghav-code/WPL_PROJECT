# SkillShare — Requirements Document

> A neighbourhood skill-sharing platform where people teach and learn from each other in a comfortable, local setting.

---

## 1. Project Overview

**SkillShare** connects people within a neighbourhood who want to share skills they know with people who want to learn them — casually, locally, and without the formality of professional classes. Think tuition-at-home, but for any skill.

---

## 2. Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React (with plain CSS, no UI libs)  |
| Backend    | Python (Flask)                      |
| Database   | SQLite (simple, file-based)         |
| API Style  | REST — only essential endpoints     |

---

## 3. User Roles

### 3.1 Learner
A person looking to learn a skill from someone nearby.

### 3.2 Teacher
A person who wants to share a skill they know with people nearby.

> A single account can act as both Learner and Teacher — the role is chosen after login.

---

## 4. App Flow

```
Landing Page
    └── Login / Register
            ├── Continue as Teacher → Teacher Dashboard
            └── Continue as Learner → Learner Dashboard
```

---

## 5. Features

### 5.1 Authentication

- Register with Name, Email, Password, and Location (city/area — text input, no GPS needed)
- Login with Email + Password
- After login, user picks role: **"I want to Teach"** or **"I want to Learn"**
- Session stored via simple token (localStorage)

---

### 5.2 Skill Categories & Subcategories

Six fixed top-level categories, each with four subcategories:

| Category | Subcategories |
|----------|---------------|
| 🎵 Music | Guitar, Piano, Violin, Singing |
| 🎨 Art | Sketching, Painting, Pottery, Origami |
| 💃 Dance | Bharatnatyam, Hip-Hop, Salsa, Freestyle |
| 🎭 Drama | Acting, Puppetry, Storytelling, Mime |
| 🍳 Cooking | Baking, Indian Cuisine, Pasta & Italian, Healthy Meals |
| 🚗 Driving | Car (Manual), Car (Automatic), Two-Wheeler, Parking & Basics |

> These are hardcoded — no admin panel needed.

---

### 5.3 Learner Flow

1. **Dashboard** — See skill categories, browse teachers nearby
2. **Pick a Category** → Pick a Subcategory (e.g., Music → Guitar)
3. **View Teachers** — See a list of teachers who teach that skill
   - Each card shows: Name, distance (mocked), rating (mocked), trial availability
   - Default filter: within **4 km**
   - Learner can adjust range up to **8 km** via a slider
4. **Enroll** — Send an enrollment request to a teacher
5. **Trial Session** — If teacher has a trial listed, learner can request it separately
6. **My Enrollments** — View pending / accepted / rejected enrollment status

---

### 5.4 Teacher Flow

1. **Dashboard** — See pending enrollment requests
2. **List a Skill** — Pick category → subcategory, set a short description and availability (text field, e.g., "Weekends 10am–12pm")
3. **Add Trial Info** — Optional short description of what the trial session includes
4. **Manage Requests** — Accept or Reject incoming learner enrollment requests
5. **My Listings** — View and delete their posted skill listings

---

### 5.5 Enrollment Request System

- Learner sends request → status = `pending`
- Teacher sees it on dashboard → clicks Accept or Reject
- Learner sees updated status on "My Enrollments" page
- No real-time updates needed — simple page refresh is fine

---

## 6. Database Schema (SQLite)

### `users`
| Column    | Type    | Notes                    |
|-----------|---------|--------------------------|
| id        | INTEGER | Primary key              |
| name      | TEXT    |                          |
| email     | TEXT    | Unique                   |
| password  | TEXT    | Hashed (bcrypt)          |
| location  | TEXT    | Area name, e.g. "Andheri"|

---

### `listings`
| Column      | Type    | Notes                              |
|-------------|---------|----------------------------------- |
| id          | INTEGER | Primary key                        |
| teacher_id  | INTEGER | FK → users.id                      |
| category    | TEXT    | e.g., "Music"                      |
| subcategory | TEXT    | e.g., "Guitar"                     |
| description | TEXT    | Short bio / what they teach        |
| availability| TEXT    | Free-text, e.g., "Sat 10am–12pm"  |
| trial_info  | TEXT    | Optional trial session description |
| distance_km | REAL    | Mocked value seeded in DB          |

---

### `enrollments`
| Column     | Type    | Notes                              |
|------------|---------|----------------------------------- |
| id         | INTEGER | Primary key                        |
| learner_id | INTEGER | FK → users.id                      |
| listing_id | INTEGER | FK → listings.id                   |
| type       | TEXT    | `"enroll"` or `"trial"`           |
| status     | TEXT    | `"pending"`, `"accepted"`, `"rejected"` |

---

## 7. API Endpoints (Flask)

Only essential endpoints. Non-critical UI interactions (like share/message icons) can be visual-only on the frontend.

### Auth
| Method | Endpoint         | Description          |
|--------|------------------|----------------------|
| POST   | `/api/register`  | Create account       |
| POST   | `/api/login`     | Login, returns token |

### Listings
| Method | Endpoint                        | Description                              |
|--------|---------------------------------|------------------------------------------|
| GET    | `/api/listings`                 | All listings (optional `?category=Music&max_km=4`) |
| POST   | `/api/listings`                 | Teacher creates a listing                |
| DELETE | `/api/listings/<id>`            | Teacher deletes their listing            |

### Enrollments
| Method | Endpoint                            | Description                      |
|--------|-------------------------------------|----------------------------------|
| POST   | `/api/enrollments`                  | Learner sends request            |
| GET    | `/api/enrollments/learner`          | Learner views their requests     |
| GET    | `/api/enrollments/teacher`          | Teacher views incoming requests  |
| PATCH  | `/api/enrollments/<id>/status`      | Teacher accepts or rejects       |

---

## 8. Mock Data (Pre-seeded in DB)

Seed the database with:
- **5 mock teacher accounts** with varied locations and distances
- **10–12 mock listings** spread across all 6 categories
- **Sample trial info** for at least one listing per category

This ensures the Learner flow works without needing real teachers to sign up first.

---

## 9. Pages / Screens Summary

| Screen | Role | Notes |
|--------|------|-------|
| Landing / Login | Both | Split-panel design |
| Register | Both | Simple form |
| Role Selection | Both | After login — pick Teacher or Learner |
| Learner Dashboard | Learner | Category grid + nearby teachers |
| Category → Subcategory | Learner | Two-step picker |
| Teacher List | Learner | Cards + distance slider |
| My Enrollments | Learner | Status list |
| Teacher Dashboard | Teacher | Pending requests |
| List a Skill | Teacher | Form |
| My Listings | Teacher | View + delete |
| Manage Requests | Teacher | Accept / Reject |

---

## 10. What's Intentionally Out of Scope

- No real GPS / geolocation — distance is a mocked field in the DB
- No payments
- No messaging / chat
- No ratings (shown as mocked static values in UI)
- No admin panel
- No email verification
- No image uploads

---

## 11. Success Criteria

- A teacher can register, list a skill with trial info, and accept/reject enrollments
- A learner can browse skills by category, filter by distance, and send an enroll or trial request
- Enrollment status updates are reflected on the learner's dashboard
- All core API endpoints return proper JSON responses
- Mock data is visible to demonstrate the full learner flow on first load
