# Job Portal - Full-Stack Application

This is a comprehensive, full-stack Job Portal application built using the **MERN (MongoDB, Express, React, Node.js)** stack. It features robust user authentication with JWT, a fully responsive dashboard powered by **Tailwind CSS**, and essential job management tools including **Create, Read, Update, and Delete (CRUD)** operations.

---

##  Live Demo

* **Frontend (Vercel):** [https://jobc-portaal.vercel.app](https://jobc-portaal.vercel.app)
* **Backend (Render):** [https://jobc-8hsk.onrender.com](https://jobc-8hsk.onrender.com)

---

## Key Features

### Core Functionality
* **MERN Stack:** Built on MongoDB, Express.js, React.js (Vite), and Node.js.
* **JWT Authentication:** Secure user registration and login using **JSON Web Tokens (JWT)** for protected routes.
* **Dashboard Routing:** After successful login, users are routed to a responsive dashboard featuring dynamic views using **React Router**.

### Dashboard & UI/UX
* **Responsive Design:** Fully optimized for both desktop and mobile devices using **Tailwind CSS**.
* **Dark/Light Theme (Bonus):** Includes a **theme toggle** to switch between dark and light modes, managed via React Context.
* **Sidebar Navigation:** Provides clear navigation to the following sections:
    * Job Posting Form
    * Job Posted (My Listings)
    * Profile
    * Customer Analysis
    * Logout

### Job Management (Full CRUD)
* **Job Posting Form (Create):** Dedicated form for users to add new job listings with fields:
    * Job Title
    * Job Description
    * Last Date for Application
    * Company Name
* **Data Persistence:** Submitted job details are saved securely in **MongoDB**.
* **Edit/Delete :** Users can **edit** and **delete** their own posted job listings from the "Job Posted" section.

### Analytics & Profile Management
* **Customer Analysis:** Features a dedicated section utilizing **Recharts** to display visual data representations (charts/graphs) using dummy data, simulating application and post performance tracking.
* **Profile Management :** The Profile section allows users to **update their personal details (Name, Email)** and **change their password**.

***

## 🛠️ Technology Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | **React (Vite) / Tailwind CSS** | Fast UI development, component architecture, and utility-first styling. |
| **State/Routing** | **React Router / Context API** | Client-side routing and global theme management. |
| **Charting** | **Recharts** | Data visualization for the Customer Analysis section. |
| **Backend** | **Node.js / Express.js** | The runtime and framework for the RESTful API. |
| **Database** | **MongoDB / Mongoose** | NoSQL database and the ODM for schema definition. |
| **Authentication** | **JWT / bcryptjs** | Token-based security and password hashing. |

***

## ⚙️ Local Setup and Installation


### Prerequisites
* Node.js (LTS version)
* MongoDB Atlas account
* Git

### 1.  **Clone the Repository:**
    git clone https://github.com/prathamesonar/Job-Portal.git
    cd Job-Portal
    
### 2. Backend Setup (`Job-Portal/backend`)

1.  **Navigate and Install:**
    ```bash
    cd backend
    npm install
    ```
2.  **Create `.env`:** Create a file named `.env` in the `backend` directory :
    ```env
    PORT=5000
    MONGO_URI="YOUR_MONGODB_ATLAS_CONNECTION_STRING"
    JWT_SECRET="YOUR_STRONG_SECRET_KEY"
    ```
3.  **Run the backend server:**
    ```bash
    npm run dev 
    ```

### 3. Frontend Setup (`Job-Portal/frontend`)

1.  **Navigate and Install:**
    ```bash
    cd ../frontend
    npm install
    ```

2.  **Start the Client:**
    ```bash
    npm run dev
    ```

Access the client URL (`http://localhost:5173`) in your browser 

---

## Project Structure

```
Job-Portal/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection setup
│   ├── controllers/
│   │   ├── jobController.js      # Logic for Job CRUD (Create, Read, Update, Delete)
│   │   └── userController.js     # Logic for User Auth (Register, Login, Profile Update, Password Change)
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protection middleware
│   ├── models/
│   │   ├── Job.js                # Mongoose schema for Job Postings
│   │   └── User.js               # Mongoose schema for Users (Recruiters)
│   ├── routes/
│   │   ├── jobRoutes.js          # API routes for /api/jobs (Protected)
│   │   └── userRoutes.js         # API routes for /api/users (Auth, Profile)
│   ├── utils/
│   │   └── generateToken.js      # Utility for creating JWT
│   ├── .env                      # Environment variables (MONGO_URI, JWT_SECRET)
│   ├── package.json
│   ├── server.js                 # Main Express server file (includes CORS config)
│   └── .gitignore
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CustomerAnalysis.jsx # Dashboard charts (using Recharts)
    │   │   ├── JobPosted.jsx        # Displays, Edits, and Deletes posted jobs
    │   │   ├── JobPostingForm.jsx   # Form for creating new jobs
    │   │   ├── Profile.jsx          # User details and password change component
    │   │   └── Sidebar.jsx          # Responsive dashboard navigation
    │   ├── context/
    │   │   └── ThemeContext.jsx     #  Dark/Light theme toggling
    │   ├── pages/
    │   │   ├── Dashboard.jsx        # Main layout, handles routing for sidebar views
    │   │   ├── Login.jsx            # User login page
    │   │   └── Register.jsx         # User registration page
    │   ├── App.jsx                  # Main routing and ProtectedRoute logic
    │   └── main.jsx                 # Entry point, wrapping App with ThemeProvider
    ├── public/
    ├── index.css                   # Tailwind CSS imports
    ├── package.json
    ├── postcss.config.js           # Tailwind/PostCSS configuration
    ├── tailwind.config.js
    └── .gitignore
````
