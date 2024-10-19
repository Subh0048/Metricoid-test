# MERN Stack Blog Application

This project is a full-stack blog application built using the MERN (MongoDB, Express.js, React, Node.js) stack. Users can register, log in, and perform CRUD operations on posts, including creating, reading, updating, and deleting posts.

## Features

- **User Authentication**: Secure login and registration using JSON Web Tokens (JWT).
- **CRUD Operations**: 
  - Create posts
  - Read posts
  - Update posts
  - Delete posts
- **Responsive Design**: Works well on both desktop and mobile devices.

## Technologies Used

- **Frontend**: 
  - React
  - Axios
  - React Router
- **Backend**: 
  - Node.js
  - Express.js
  - MongoDB
  - Mongoose
- **Authentication**: JSON Web Tokens (JWT)

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js
- MongoDB

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
2. **Install dependencies for the backend**:
   ```bash
   cd backend
   npm install
   
3. **Set up the environment variables**:
  - Create a .env file in the backend directory and add your MongoDB connection string and any other necessary configurations.
   
4. **Start the backend server**:
   ```bash
    npm run dev

5. **Install dependencies for the frontend**:
   ```bash
     cd ../frontend
     npm install

6. **Start the frontend development server**:
   ```bash
     npm run dev

  ## Usage 
  
  - Navigate to http://localhost:3000 in your browser.
  - Register a new account or log in with an existing account.
  - Create, view, update, or delete posts.
