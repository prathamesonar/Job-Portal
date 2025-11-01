# Job Portal - Full-Stack MERN Application

This is a comprehensive, full-stack Job Portal application built using the **MERN (MongoDB, Express, React, Node.js)** stack. It features robust user authentication with JWT, a fully responsive dashboard powered by **Tailwind CSS**, and essential job management tools including **Create, Read, Update, and Delete (CRUD)** operations.

##  Live Demo and Deployment Links

| Component | Status | Platform | URL |
| :--- | :--- | :--- | :--- |
| **Frontend (Client)** | **Live** | **Vercel** | [**https://jobc-portaal.vercel.app**](https://jobc-portaal.vercel.app) |
| **Backend (API)** | **Live** | **Render** | [**https://jobc-8hsk.onrender.com**](https://jobc-8hsk.onrender.com) |

***

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
* **Edit/Delete (Bonus):** Users can **edit** and **delete** their own posted job listings from the "Job Posted" section.

### Analytics & Profile Management
* **Customer Analysis:** Features a dedicated section utilizing **Recharts** to display visual data representations (charts/graphs) using dummy data, simulating application and post performance tracking.
* **Profile Management (Bonus):** The Profile section allows users to **update their personal details (Name, Email)** and **change their password**.

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

Follow these steps to get a local copy of the project up and running.

### Prerequisites
* Node.js (LTS version)
* MongoDB Atlas account
* Git

### 1. Backend Setup (`mern-job-portal/backend`)

1.  **Navigate and Install:**
    ```bash
    cd backend
    npm install
    ```
2.  **Create `.env`:** Create a file named `.env` in the `backend` directory and add your secret keys (using your Atlas connection string):
    ```env
    PORT=5000
    MONGO_URI="YOUR_MONGODB_ATLAS_CONNECTION_STRING"
    JWT_SECRET="YOUR_STRONG_SECRET_KEY"
    ```
3.  **Start the API:**
    ```bash
    npm run dev 
    # API runs on http://localhost:5000
    ```

### 2. Frontend Setup (`mern-job-portal/frontend`)

1.  **Navigate and Install:**
    ```bash
    cd ../frontend
    npm install
    ```
2.  **Verify API URL:** Ensure the base API URL in `src/config/api.js` is set to the local backend address for development:
    ```javascript
    const API_BASE_URL = 'http://localhost:5000/api'; 
    ```
3.  **Start the Client:**
    ```bash
    npm run dev
    # Client runs on http://localhost:5173
    ```

Access the client URL (`http://localhost:5173`) in your browser to begin testing.
