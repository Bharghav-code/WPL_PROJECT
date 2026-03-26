# SkillShare — Design Document

> Visual and UX design guidelines for the SkillShare neighbourhood platform.  
> Inspired by The Kinetic Atelier design system — clean, modern, warm, and approachable.

---

## 1. Design Philosophy

SkillShare should feel like a **friendly community notice board**, not a corporate e-learning platform. The design should be:

- **Warm but clean** — not sterile, not cluttered
- **Easy to scan** — users should understand what to do within 5 seconds of landing on any page
- **Low friction** — minimal steps to get from login to finding a teacher

---

## 2. Color Palette

| Role              | Color             | Hex       |
|-------------------|-------------------|-----------|
| Primary (Blue)    | Royal Blue        | `#2563EB` |
| Primary Dark      | Deep Blue         | `#1D4ED8` |
| Accent (Green)    | Skill Green       | `#22C55E` |
| Background        | Off White / Lavender | `#F1F5FF` |
| Card Background   | Pure White        | `#FFFFFF` |
| Text Primary      | Near Black        | `#1E1E2E` |
| Text Secondary    | Muted Grey        | `#6B7280` |
| Border            | Light Grey        | `#E5E7EB` |
| Danger / Reject   | Soft Red          | `#EF4444` |
| Success / Accept  | Green             | `#16A34A` |

> The left panel on the login page uses `#2563EB` as a solid blue background — this is the primary brand colour. The right panel is white/off-white.

---

## 3. Typography

Use **Inter** (Google Fonts) throughout the app.

| Usage             | Weight    | Size      |
|-------------------|-----------|-----------|
| Page Headline     | 700 Bold  | 28–32px   |
| Section Title     | 600 Semi  | 20px      |
| Card Title        | 600 Semi  | 16px      |
| Body Text         | 400 Regular | 14px    |
| Label / Tag       | 500 Medium | 12px     |
| Button Text       | 600 Semi  | 14–15px   |

Accent words in headlines (like "skill" or "rhythm" in the inspiration images) can use the green accent colour `#22C55E` or italic styling to add personality.

---

## 4. Spacing & Layout

- Base spacing unit: **8px**
- Card padding: `24px`
- Section gap: `32px`
- Border radius — Cards: `16px`, Buttons: `10px`, Inputs: `10px`, Tags/Chips: `999px` (pill)
- Max content width: `1100px`, centered

---

## 5. Component Styles

### 5.1 Buttons

**Primary Button** (Sign In, Enroll, Accept)
```
background: #2563EB
color: white
padding: 12px 24px
border-radius: 10px
font-weight: 600
hover: background #1D4ED8, slight shadow
```

**Secondary / Outline Button** (Trial Session, Cancel)
```
background: transparent
border: 1.5px solid #2563EB
color: #2563EB
padding: 10px 20px
border-radius: 10px
hover: background #EFF6FF
```

**Danger Button** (Reject)
```
background: transparent
border: 1.5px solid #EF4444
color: #EF4444
hover: background #FEF2F2
```

---

### 5.2 Input Fields

```
background: #F1F5FF  (light lavender tint — as seen in reference)
border: 1.5px solid #E5E7EB
border-radius: 10px
padding: 12px 16px
font-size: 14px
focus: border-color #2563EB, subtle box-shadow
```

Include a small icon on the left inside the input (email icon for email field, lock icon for password).

---

### 5.3 Cards (Teacher / Listing)

```
background: white
border-radius: 16px
padding: 20px
box-shadow: 0 2px 12px rgba(0,0,0,0.07)
border: 1px solid #E5E7EB
```

Each teacher card contains:
- Avatar (circular, 48px)
- Teacher name + subcategory tag
- Star rating (mocked, shown as static ★ icons)
- Distance badge (e.g., "2.3 km away") — pill shaped, light blue bg
- Short description (2 lines, truncated)
- Two buttons: **Enroll** (primary) + **Trial Session** (secondary)

---

### 5.4 Category Cards (Skill Grid)

Square cards arranged in a row of 6 (or wrapping on mobile):
```
background: white
border-radius: 14px
padding: 20px
text-align: center
icon: 32px, blue tint background circle
label: 13px semi-bold below icon
hover: border 1.5px solid #2563EB, shadow lift
```

Icons for categories (use emojis or simple SVG):
- 🎵 Music, 🎨 Art, 💃 Dance, 🎭 Drama, 🍳 Cooking, 🚗 Driving

---

### 5.5 Status Badges (Enrollment)

| Status   | Style                                        |
|----------|----------------------------------------------|
| Pending  | Yellow bg `#FEF9C3`, text `#854D0E`          |
| Accepted | Green bg `#DCFCE7`, text `#166534`           |
| Rejected | Red bg `#FEE2E2`, text `#991B1B`             |

Pill shaped, font-size 12px, padding `4px 12px`.

---

## 6. Page-by-Page Layout

### 6.1 Login / Register Page

**Two-column split layout** (inspired directly by reference Image 1):

```
Left Panel (40% width):
  - Solid blue (#2563EB) background
  - Background: subtle photo of a cozy learning space (low opacity overlay)
  - App logo + name top-left
  - Large bold headline: "Where every skill finds its home."
    (highlight "skill" in green #22C55E)
  - Subtext: "Learn from people in your neighbourhood."
  - Bottom: small avatar cluster + "Join 200+ teachers nearby"

Right Panel (60% width):
  - White background
  - "Welcome Back" headline
  - Subtext: "Sign in to continue"
  - Email + Password inputs
  - "Keep me logged in" checkbox
  - Primary "Sign In →" button (full width)
  - "New here? Create Account" link at bottom
```

Register page — same layout, right panel shows Name, Email, Location (text), Password fields.

---

### 6.2 Role Selection Page

Simple centered card after login:

```
"How would you like to continue today?"
[ 🎓 I want to Learn ]   [ 🏫 I want to Teach ]
```

Two large clickable cards side by side. Clicking one routes to the respective dashboard.

---

### 6.3 Learner Dashboard

**Three-zone layout** (inspired by reference Image 2):

```
Left Sidebar (fixed, 180px):
  - Profile avatar + name + location tag
  - Nav links: Dashboard, My Enrollments, Settings

Main Content Area:
  - Hero banner (blue gradient):
      "Find your next skill."
      Subtext about teachers nearby
      "Browse Skills →" button
  - Section: Skill Categories (6 icon cards in a row)
  - Section: Teachers Nearby (3 cards side-by-side)

Right Panel (240px):
  - "My Enrollments" quick summary
  - Status chips for recent 2–3 requests
  - "X teachers available now" with avatar stack
```

---

### 6.4 Category → Subcategory Picker

After clicking a category (e.g., Music):

```
Breadcrumb: Dashboard > Music

Sub-categories shown as 4 pill/chip buttons:
  [ Guitar ]  [ Piano ]  [ Violin ]  [ Singing ]

Clicking one takes user to the Teacher List for that subcategory.
```

---

### 6.5 Teacher List Page

```
Header: "Guitar Teachers Near You"
Distance Slider: ──●────── 4km  (drag up to 8km)

Teacher Cards (grid, 3 per row):
  [Avatar] Name         ★ 4.8
           [Guitar] [2.1 km away]
           "I've been playing for 10 years..."
           [Enroll]  [Trial Session]
```

---

### 6.6 My Enrollments (Learner)

Simple list view:

```
[ Guitar — Rahul Mehta ]      ● Pending
  Requested: 22 Mar 2025

[ Baking — Priya Shah ]       ✓ Accepted
  Requested: 18 Mar 2025

[ Salsa — Marco D'Silva ]     ✗ Rejected
  Requested: 10 Mar 2025
```

---

### 6.7 Teacher Dashboard

```
Left Sidebar: same as learner but with Teaching-focused links
  - Dashboard, List a Skill, My Listings, Requests, Settings

Main Content:
  - Section: "Pending Requests" (cards with Accept / Reject buttons)
  - Section: "My Active Listings" (smaller cards, with Delete option)
  - "List a New Skill +" button (prominent, top right)
```

---

### 6.8 List a Skill Form (Teacher)

```
Step 1 — Pick Category (same 6 icon cards)
Step 2 — Pick Subcategory (4 pill options)
Step 3 — Fill Details:
  - "What will you teach?" (textarea, 3 lines)
  - "Availability" (text input, e.g., "Saturdays 10am–12pm")
  - "Trial Session" (checkbox) → if checked, show:
      "Describe your trial session" (textarea)
  - [Post Listing] button
```

---

## 7. Navigation

### Learner Sidebar Links
- 📊 Dashboard
- 📚 My Enrollments
- ⚙️ Settings

### Teacher Sidebar Links
- 📊 Dashboard
- ➕ List a Skill
- 📋 My Listings
- 📩 Requests
- ⚙️ Settings

Active link: blue left border `3px solid #2563EB`, light blue bg `#EFF6FF`.

---

## 8. Responsive Behaviour (Basic)

| Breakpoint | Behaviour |
|------------|-----------|
| > 1024px   | Full sidebar + main + right panel layout |
| 768–1024px | Sidebar collapses to icons only; right panel drops below |
| < 768px    | Single column; sidebar becomes bottom tab bar |

> Since this is a web lab project, **desktop-first** is fine. Mobile responsiveness is a bonus.

---

## 9. Micro-interactions (Simple CSS Only)

- Buttons: `transform: translateY(-1px)` on hover with subtle shadow
- Cards: `box-shadow` deepens slightly on hover
- Distance slider: thumb styled in blue `#2563EB`
- Input focus: border turns blue with a `0 0 0 3px rgba(37,99,235,0.15)` glow
- Status badges: no animation, just colour-coded

---

## 10. File Structure (Frontend — React)

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Sidebar.jsx
│   ├── TeacherCard.jsx
│   ├── CategoryCard.jsx
│   ├── EnrollmentItem.jsx
│   └── StatusBadge.jsx
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── RoleSelect.jsx
│   ├── LearnerDashboard.jsx
│   ├── TeacherList.jsx
│   ├── MyEnrollments.jsx
│   ├── TeacherDashboard.jsx
│   ├── ListSkill.jsx
│   └── ManageRequests.jsx
├── api/
│   └── client.js        ← all fetch() calls to Flask backend
├── App.jsx
└── index.css            ← global styles, CSS variables
```

---

## 11. File Structure (Backend — Python/Flask)

```
backend/
├── app.py               ← Flask app, routes
├── models.py            ← SQLite schema setup
├── seed.py              ← Mock data seeding script
├── auth.py              ← Register / Login logic
└── database.db          ← SQLite file (auto-created)
```

---

## 12. Design Don'ts

- ❌ Don't use multiple font families
- ❌ Don't use more than 2 accent colours
- ❌ Don't use full-black (`#000`) — use `#1E1E2E`
- ❌ Don't add animations that need JavaScript libraries
- ❌ Don't make the sidebar too wide — keep it minimal
- ❌ Don't show empty states without a helpful message ("No teachers found nearby — try increasing the distance")
