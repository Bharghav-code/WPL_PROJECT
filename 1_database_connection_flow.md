# Database Connection & Data Flow

Currently, the application connects the SQLite database to the React frontend through a Flask backend REST API.

## Current Flow
1. **Database (SQLite)**: Stores `users`, `listings`, and `enrollments` in `database.db`.
2. **Backend (Flask)**: Exposes endpoints (e.g., `/api/login`, `/api/listings`) and interacts with SQLite using raw SQL queries.
3. **Frontend (React)**: Uses native `fetch` in `src/api/client.js` to call the Flask endpoints and passes JWT tokens via the `Authorization` header.

## Recommended Changes
To make the data flow more robust and production-ready, we should implement the following:

- **Centralized State Management**: Introduce React Context or Zustand in the frontend to manage user authentication state globally. Currently, authentication relies on checking `localStorage` per route, which can lead to UI inconsistencies.
- **Enhanced Error Handling**: Update `client.js` to intercept 401 Unauthorized responses and automatically log the user out. Integrate a toast notification system (e.g., `react-hot-toast`) to alert the user of failed API calls.
- **Query Caching**: Consider using `React Query` (@tanstack/react-query) to cache listings and enrollments, which will provide instant loading states on revisit and reduce backend load.
