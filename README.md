# File Upload

This application allows users to securely **sign up**, **log in**, and manage folders and files. Authenticated users can create folders, upload files (which are stored on **Cloudinary**), and delete both files and folders. It also supports **password recovery** in case a user forgets their credentials.

---

## Features

- **User Authentication**

  - Sign up with first name, last name, email (used as username), and password.
  - Log in with valid credentials.
  - Forgot password functionality with secure reset process.

- **File and Folder Management (Authenticated Users Only)**
  - Create folders.
  - Upload files directly to **Cloudinary** (files are not stored locally).
  - View files inside folders.
  - Delete individual files.
  - Delete folders (only if empty).

---

## How This Project Works

1. When visiting the app, users see a login page.
2. If not registered, they can sign up by filling out a form with personal details.
3. Users can reset their password using the "Forgot Password" feature.
4. Upon successful login:
   - Users can create folders.
   - Upload files to those folders (stored on **Cloudinary**).
   - Delete files and empty folders.
5. Authentication is required to access any of the folder/file functionality.

---

## Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm or yarn
- A **Cloudinary** account
- A **PostgreSQL** database (local or cloud)
- [dotenv](https://www.npmjs.com/package/dotenv) for managing environment variables

---

## Setup and Run Locally

### 1. Clone the Repository

```bash
git clone <repository_url>
cd file-upload
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Server

```bash
node app.js
```

Visit: [http://localhost:3000](http://localhost:3000)

---
