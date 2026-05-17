# Lead Management App (Full Stack CRM)

A simple CRM-style lead management system with authentication, role-based access, pagination, filtering, and CRUD operations for leads.

---

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT Authentication
- TypeScript

### Frontend
- React
- Zustand (state management)
- React Router
- Axios
- Tailwind CSS + DaisyUI

---

## Features

### Auth
- Signup / Login
- JWT based session
- Profile update
- Admin toggle system (password protected)

### Leads
- Create lead
- View all leads (paginated)
- Filter by:
  - status
  - source
  - search (name/email)
- View single lead
- Update lead (owner or admin only)
- Delete lead (owner or admin only)
- My Leads page (user-specific filtering)

---

## Backend Setup

### Environment Variables

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=

JWT_SECRET=

CLIENT_URL=

ADMIN_PASSWORD=
```

