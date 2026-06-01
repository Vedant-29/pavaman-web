# pavaman-web

The admin-side web console for Pavaman — a field-workforce management
product. Admins sign in, browse their field employees, drill into a
single employee to see their assigned tasks for any day, and watch the
whole team's last-known location on a clustered Google Map. Companion
to the [pavaman-react-native](https://github.com/Vedant-29/pavaman-react-native)
mobile app that the field employees themselves carry.

## Table of contents

1. [What this builds](#what-this-builds)
2. [Architecture](#architecture)
3. [Supabase schema](#supabase-schema)
4. [Routes](#routes)
5. [Setup](#setup)
6. [Running and building](#running-and-building)
7. [Repository tour](#repository-tour)

---

## What this builds

A React + Vite admin console that owns four jobs:

- **Authenticated admin onboarding.** Email + password signup via
  Supabase Auth, with an email-verification round-trip and a
  password-recover / reset flow. Sign-up writes the new admin into an
  `admin_users` row alongside the auth user.
- **Employee directory.** A list view backed by `employee_users` with
  a per-row deep link to the employee's profile.
- **Per-employee task board.** For one selected employee on a
  selected day, fetches their `employee_tasks` (filtered by
  `completion_date` and `status`) and renders them in three
  status-bucketed columns ("To complete" / in-progress / done) using
  the `TaskCard` component.
- **Team-wide map view.** Every employee under this admin
  (`role_assigned_by = admin.id`) is dropped onto a Google Map using
  `@vis.gl/react-google-maps` with `MarkerClusterer` so dense
  workforces don't turn into a single pin soup. The selected
  employee's last reported position is highlighted on the same map.

## Architecture

Standard Vite + React 18 single-page app with a Supabase backend.

```
                  ┌────────────────────────────────┐
                  │  Browser (React 18 + Vite SPA) │
                  │                                │
   AuthProvider ──┤  hooks/auth.jsx ──────────────┤── ProtectedRoute
   (Supabase      │      ▲                         │   (utils/)
    session)      │      │                         │
                  │      │  react-router-dom v6    │
                  │      ▼                         │
   /signin        │  ┌─────────────────────────┐   │   tailwind +
   /signup ───────┤  │ pages/                  │   │   material-ui +
   /employee-list │  │  SignupLogin/           │   │   react-bootstrap +
   /employee-     │  │  HomePage/              │   │   mdb-react-ui-kit
   profile/:id    │  │  EmployeePage/          │   │
   /profile       │  │  ProfilePage/           │   │
   /password-     │  │  TestGoogleMaps/        │   │
   recover etc.   │  └─────┬───────────────────┘   │
                  │        │                       │
                  └────────┼───────────────────────┘
                           │
                           │  supabase-js (Auth + Postgres)
                           ▼
                  ┌────────────────────────────────┐
                  │           Supabase             │
                  │                                │
                  │  auth.users                    │
                  │  public.admin_users            │
                  │  public.user_profiles          │
                  │  public.employee_users         │
                  │  public.employee_tasks         │
                  └────────────────────────────────┘

                  ┌────────────────────────────────┐
                  │  Google Maps JS API            │
                  │  (@vis.gl/react-google-maps    │
                  │   + @googlemaps/markerclusterer)│
                  └────────────────────────────────┘
```

**Module responsibilities:**

| Module | Responsibility |
|---|---|
| `src/config/supabase-client.js` | One shared `createClient` instance reading `VITE_REACT_APP_SUPABASE_URL` / `VITE_REACT_APP_SUPABASE_ANON` from env. |
| `src/hooks/auth.jsx` | `AuthProvider` context with `session`, `user`, and `signOut`. Subscribes to `supabase.auth.onAuthStateChange` and re-renders on session changes. Gates initial render until session resolves. |
| `src/utils/ProtectedRoutes.jsx` | Route guard. Redirects unauthenticated visitors to `/signup`, remembers the intended URL in `localStorage`, and short-circuits on the role-based admin redirect. |
| `src/components/RootLayout.jsx` | Layout wrapper that mounts the Navbar (fixed vs static) around the routed page. |
| `src/components/Navbar.jsx`, `src/components/DefaultSidebar.jsx` | Top-nav for unauthenticated pages, sidebar nav for the authenticated employee dashboard. |
| `src/pages/SignupLogin/` | Email signup, signin, email-verify, password-recover, password-reset screens. Sign-up writes an `admin_users` row alongside the auth user. |
| `src/pages/EmployeePage/EmployeePage.jsx` | Lists all `employee_users` with stats cards and per-row navigation. |
| `src/pages/EmployeePage/EmployeeProfile.jsx` | Per-employee detail. Fetches that employee's `employee_tasks` and the rest of the team's `employee_users` (for the cluster map). Date picker filters tasks by `completion_date`; status tabs filter by `status`. |
| `src/pages/EmployeePage/components/TaskCard.jsx` | Renders one task: location name, POC contact, completion date, deep-link to Google Maps. |
| `src/pages/ProfilePage/ProfilePage.jsx` | The admin's own profile from `user_profiles`. |
| `src/pages/TestGoogleMaps/Intro.jsx` | Standalone `@vis.gl/react-google-maps` + `MarkerClusterer` demo against the bundled `trees` fixture, used while building the cluster map for `EmployeeProfile`. |

## Supabase schema

Tables the app reads or writes (Postgres on Supabase, gated by RLS):

| Table | Purpose | Read by | Written by |
|---|---|---|---|
| `admin_users` | One row per admin. Joined to `auth.users` by `admin_id`. | (none in this app yet) | sign-up |
| `user_profiles` | Admin profile details. | `ProfilePage` | (out of repo) |
| `employee_users` | Field employees. Carries `name`, `email`, `phoneNo`, `role`, `latitude`, `longitude`, `role_assigned_by` (admin id). | `EmployeePage`, `EmployeeProfile` | mobile app updates location |
| `employee_tasks` | Tasks assigned to an employee. Carries `assigned_to_id`, `status`, `completion_date`, `location_name`, `location_poc_name`, `location_poc_email`, `location_poc_phoneNo`, `location_map_link`, `latitude`, `longitude`. | `EmployeeProfile` (filtered by `assigned_to_id` + date) | mobile app updates `status` |

## Routes

All routes are wrapped in `RootLayout` (Navbar + outlet). Auth-gated
routes go through `ProtectedRoute`.

| Path | Page | Notes |
|---|---|---|
| `/` | `HomePage` | Public landing. |
| `/signup` | `SignUpPage` | Email + password. Creates `auth.users` row + `admin_users` row. |
| `/signin` | `SignInPage` | Supabase email sign-in. |
| `/email-verify` | `EmailVerifyPage` | Post-signup verification prompt. |
| `/verification-complete` | `EmailVerifyCompletePage` | Landing after the verify deep link. |
| `/password-recover` | `PasswordRecoverPage` | Triggers Supabase password-reset email. |
| `/password-reset` | `PasswordResetPage` | New-password screen behind the recover deep link. |
| `/employee-list` | `EmployeePage` | All field employees (auth-gated). |
| `/employee-profile/:id` | `EmployeeProfile` | One employee's tasks + team map (auth-gated). |
| `/profile` | `ProfilePage` | Admin's own profile (auth-gated). |
| `/test` | `Test` | Static template demo. |

## Setup

### Prerequisites

- **Node.js 18+**
- A **Supabase project** with Auth + the four tables above
- A **Google Maps JavaScript API key** with the Maps JS, Places, and
  Map Tiles APIs enabled
- A Google Maps **Map ID** (for `vector` map styling used by
  `AdvancedMarker`)

### 1. Install

```bash
git clone https://github.com/Vedant-29/pavaman-web.git
cd pavaman-web
npm install
```

### 2. Environment

Create a `.env.local` at the repo root:

```bash
VITE_REACT_APP_SUPABASE_URL=https://your-project.supabase.co
VITE_REACT_APP_SUPABASE_ANON=your-anon-key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
VITE_PUBLIC_MAP_ID=your-map-id
```

Both Supabase and Google envs are read with the `VITE_` prefix so Vite
exposes them to the bundle. The anon key is gated by Supabase RLS —
ship RLS policies before going live.

### 3. Schema

Create the four tables described in [Supabase schema](#supabase-schema).
At minimum:

```sql
create table admin_users (
  admin_id uuid primary key references auth.users on delete cascade,
  email text not null
);

create table employee_users (
  employee_id uuid primary key references auth.users on delete cascade,
  name text,
  email text,
  "phoneNo" text,
  role text,
  role_assigned_by uuid references auth.users,
  latitude double precision,
  longitude double precision
);

create table employee_tasks (
  id bigserial primary key,
  assigned_to_id uuid references auth.users on delete cascade,
  status text not null,
  completion_date timestamptz,
  location_name text,
  location_poc_name text,
  location_poc_email text,
  "location_poc_phoneNo" text,
  location_map_link text,
  latitude double precision,
  longitude double precision
);

create table user_profiles (
  id uuid primary key references auth.users on delete cascade,
  -- ... admin profile fields
);
```

## Running and building

```bash
npm run dev        # Vite dev server with HMR on http://localhost:5173
npm run build      # production bundle to dist/
npm run preview    # serve the production bundle locally
npm run lint       # eslint with --max-warnings 0
```

## Repository tour

```
pavaman-web/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .eslintrc.cjs
├── public/                          # static assets served verbatim
└── src/
    ├── main.jsx                     # React entry, mounts <App />
    ├── App.jsx                      # BrowserRouter + AuthProvider + Routes
    ├── index.css                    # tailwind + globals
    ├── App.css
    ├── assets/                      # logos, spinner, images
    ├── config/
    │   └── supabase-client.js       # shared createClient instance
    ├── hooks/
    │   └── auth.jsx                 # AuthProvider + useAuth
    ├── utils/
    │   └── ProtectedRoutes.jsx      # auth-gated route wrapper
    ├── components/
    │   ├── RootLayout.jsx
    │   ├── Navbar.jsx               # top-nav for public pages
    │   └── DefaultSidebar.jsx       # sidebar for the dashboard
    └── pages/
        ├── HomePage/
        ├── ProfilePage/             # admin's own profile
        ├── SignupLogin/
        │   ├── Main/                # SignUpPage, SignInPage
        │   ├── EmailVerify/         # EmailVerifyPage, EmailVerifyCompletePage
        │   └── PasswordRecover/     # PasswordRecoverPage, PasswordResetPage
        ├── EmployeePage/
        │   ├── EmployeePage.jsx     # directory list
        │   ├── EmployeeProfile.jsx  # task board + team map
        │   ├── Test.jsx             # static template demo
        │   └── components/
        │       └── TaskCard.jsx
        └── TestGoogleMaps/
            ├── Intro.jsx            # MarkerClusterer + AdvancedMarker demo
            └── data/trees.ts        # sample lat/lng fixture
```

## License

This project is unlicensed. All rights reserved.
