# Spreadsheet CRUD Application

This project is a fully functional CRUD (Create, Read, Update, Delete) application that work like spreadsheet in a web-based application.

## Features

1. **Spreadsheet View**:
   - The application presents data in a grid-like structure resembling a spreadsheet.
   - Data is organized in rows and columns.

2. **CRUD Operations**:
   - **Create**: Add new rows and columns using a '+' symbol at the end of each row and column.
   - **Read**: Display data in a spreadsheet format.
   - **Update**: Double-clicking a cell enables editing.
   - **Delete**: Rows and columns can be deleted after confirming the delete operation.

3. **Spreadsheet Functionalities**:
   - **Undo (Ctrl + Z)**: Revert the last action.
   - **Redo (Ctrl + Y)**: Repeat the last undone action.
   - **Copy (Ctrl + C)**: Copy selected data.
   - **Paste (Ctrl + V)**: Paste copied data.
   - **Auto-Save**: Data is saved in real-time.

## Technologies Used

- **Database**: PostgreSQL
- **ORM**: PRISMA
- **Frontend**: React
- **CSS Framework**: Tailwind CSS
- **Backend**: ExpressJS and Node.js
- **Hosting**: VERCEL

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/spreadsheet-crud-app.git
   ```

2. For backend:
   ```
   cd server
   npm install
   ```

3. Set up the postgresql database:
   - Create a new postgresql database.
   - Update the database configuration using seed.js file.
   
   ```
   node prisma/seed.js
   ```
   
4. configure env file :
   ```
   DATABASE_URL=
   PORT= 3000
   ```

5. Run the database migrations:
   ```
   npx prisma generate
   ```

6. Start server:
   ```
   node server.js
   ```
7. For Frontend:
   ```
   cd ciient
   npm install
   ```

8. Run the client:
   ```
   npm run dev
   
9. Open the application in your browser at `http://localhost:3000`.

## Deployment

The application is deployed and accessible at the following URL: [https://spreadsheet-crud-app.vercel.app/]
