

## Project info


## How can I edit this code?

There are several ways of editing your application.



Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS


1. Install dependencies and start dev server:

```bash
npm install
npm run dev
```

2. The dev server will print a local URL (usually `http://localhost:5173`) — open it in your browser.

## MySQL Schema (MySQL Workbench)

I added a MySQL schema file at `db/schema_mysql.sql` you can import into MySQL Workbench.

Steps:

1. Open MySQL Workbench and connect to your server.
2. From the File menu choose "Open SQL Script" and select `db/schema_mysql.sql`.
3. Run the script to create the `alpha_fx_trader` database and sample data.

Tables included: `users`, `portfolios`, `trades`, `settings`.

If you want, I can add a small Node.js backend to persist trades to this MySQL database.
