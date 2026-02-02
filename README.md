# Poker AI & Game Locator

A modern web application for finding local poker games and tracking your poker sessions, powered by AI.

## Features

- **Game Locator**: Find active poker games nearby (Sample data + Supabase integration).
- **Session Tracker**: Log your sessions, track profit/loss, and view history.
- **Hand Analysis**: (Coming Soon) AI-powered strategy advice.
- **User Authentication**: Secure login via Supabase Auth (or Guest Mode).

## Tech Stack

- **Frontend**: React, Vite, TailwindCSS
- **Backend/DB**: Supabase (PostgreSQL, Auth)
- **AI**: Google Gemini API

## Setup & installation

1.  **Clone the repository** (or download the zip).

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env.local` file in the root directory with the following credentials:
    ```env
    VITE_GEMINI_API_KEY=your_gemini_key_here
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup (Supabase)**:
    -   Create a new Supabase project.
    -   Go to the SQL Editor in your Supabase Dashboard.
    -   Copy the contents of `schema.sql` (included in this repo) and run it. this will create the necessary tables (`venues`, `sessions`) and security policies.
    -   (Optional) Disable "Confirm Email" in Supabase Auth -> Providers -> Email for easier testing.

5.  **Run Locally**:
    ```bash
    npm run dev
    ```
    *Note: If you encounter issues with the `&` in the folder name on Windows/PowerShell, try:*
    ```bash
    node node_modules/vite/bin/vite.js
    ```

## License

MIT
