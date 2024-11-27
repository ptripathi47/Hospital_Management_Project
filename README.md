# 🏥 Hospital Management System

A robust hospital management system built with the MERN stack, featuring role-based authentication and authorization for **Admin**, **Doctor**, and **Patient** roles. This system efficiently manages hospital operations such as patient record tracking, scheduling, and user authentication.

---

## 📖 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Roles](#roles)
- [Learning](#learning)
- [Project Structure](#project-structure)

---

## ✨ Features

- **User Management**: Allows Admin to manage Doctors and Patients. Doctors and Patients have access to their profiles and relevant data.
- **Appointment Management**: Patients can schedule appointments, and Doctors can view and update them.
- **Messaging System**: Allows direct communication between Doctors and Patients.
- **Admin Dashboard**: Provides full control over managing users and appointments.

---

## Roles

1. **Admin**:
   - Full access to manage all users (Doctors and Patients).
   - Ability to view, update, and delete appointments.
   - Can view all messages.
   
2. **Doctor**:
   - Can view and manage appointments for their patients.
   - Can send and receive messages with patients.
   - Access to their profile and relevant details.
   
3. **Patient**:
   - Can schedule and view their appointments.
   - Can send and receive messages to/from Doctors.
   - Access to their personal profile and appointment history.

---

## 💻 Tech Stack

- **Frontend:** ReactJS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT, Bcrypt
- **File Storage:** Cloudinary
- **Hosting:** AWS

---

# Learning and Achievements Through the Hospital Management System Project

This project has been an enriching journey that enhanced my technical skills and provided valuable hands-on experience in building a full-stack web application. Here's a summary of the key areas I’ve learned and mastered throughout this project:

---

## 1. Full-Stack Development

### Backend Development:
- **Node.js & Express**: I gained hands-on experience in building RESTful APIs using Node.js and Express.js. I have implemented various backend functionalities such as user authentication, data validation, and creating APIs to manage appointments, messages, and user data.
- **Middleware Implementation**: I learned how to design middleware for handling user authentication and authorization. This included integrating JWT (JSON Web Token) for secure token-based authentication and using Bcrypt for password hashing.
- **Role-Based Access Control**: I applied role-based access control (RBAC) to manage the permissions for different users (Doctor, Patient, Admin). This ensures that users can only access and modify data relevant to their role.
  
### Frontend Development:
- **ReactJS**: I strengthened my ReactJS skills by building the user interface for managing user profiles, appointments, and messaging. This involved creating responsive components, managing state using React hooks, and working with APIs to fetch data.
- **Frontend-Backend Integration**: I learned to connect the frontend (React) with the backend (Node.js/Express), using RESTful API calls (fetch/axios) to exchange data between the client and server.

### Database Management:
- **MongoDB**: I implemented a NoSQL database using MongoDB to store and retrieve data for users, appointments, and messages. I designed MongoDB schemas to structure the data and used Mongoose for querying and validation.
- **Cloudinary**: I integrated Cloudinary for storing user profile images and other media files, enhancing the user experience by allowing seamless image uploads.

---

## 2. Authentication & Authorization

- **JWT Authentication**: I implemented JWT for secure authentication, enabling users to log in and gain access to protected routes. I also learned how to manage token expiration and refresh cycles.
- **Bcrypt Password Hashing**: To enhance security, I used Bcrypt to hash passwords before storing them in the database. This ensures that user credentials are never stored in plain text.
- **Role-Based Authorization**: I developed middleware that checks the user’s role (Admin, Doctor, or Patient) to ensure that they only have access to actions and data that correspond to their role.

---

## 3. API Development & RESTful Architecture

- **CRUD Operations**: I built several APIs with full CRUD (Create, Read, Update, Delete) functionality for managing users, appointments, and messages. This allowed me to practice how to build efficient, scalable, and secure API endpoints.
- **Error Handling**: I learned to implement custom error-handling middleware that returns standardized error responses, improving the robustness and user experience of the application.

---

## 4. UI/UX Development

- **User Interface Design**: I focused on creating a user-friendly interface that is intuitive and easy to navigate. This involved designing forms for user registration, login, appointment scheduling, and messaging.
- **Responsive Design**: I ensured the web application is responsive, allowing users to interact with it on various devices, including desktops, tablets, and mobile phones.

---

## 5. Cloud Integration

- **File Uploads with Cloudinary**: I integrated Cloudinary to handle profile image uploads, improving the overall user experience with seamless media storage and retrieval.
  
---

## 6. Deployment & Hosting

- **Heroku & MongoDB Atlas**: I deployed the backend to Heroku and connected it to MongoDB Atlas for cloud database storage, ensuring the application is live and accessible from anywhere.
- **Environment Variables**: I implemented environment variables for storing sensitive information like database URIs and JWT secrets, ensuring secure and flexible deployment configurations.

---

## 7. Project Management and Best Practices

- **Version Control with Git**: Throughout the project, I used Git for version control, enabling me to track changes, collaborate with others (if needed), and maintain a clean codebase.
- **Project Structuring**: I followed best practices for organizing my project files into logical directories, such as Controllers, Models, Routes, Middleware, and Utils, improving the maintainability and scalability of the application.
- **Code Quality**: I maintained clean and readable code, ensuring it was modular, well-documented, and easy to follow for future development or modifications.

---

## Key Command Mastery:

- **CRUD Operations**: Mastered building and managing APIs for Create, Read, Update, and Delete operations.
- **Authentication**: Proficient in integrating JWT and Bcrypt for secure authentication and password hashing.
- **Frontend-Backend Integration**: Solid understanding of connecting the frontend to backend services using RESTful APIs.
- **Role-Based Access Control**: Applied secure authorization logic to ensure users have access only to the data and operations relevant to their role.
- **Cloud Integration**: Gained hands-on experience integrating third-party services like Cloudinary for file management.

---

## Conclusion

Through the development of this Hospital Management System, I have expanded my skill set in full-stack web development, learned about secure user authentication and authorization, and worked with cloud services to enhance the functionality of the system. This project has also given me real-world experience in implementing best practices for organizing, building, and deploying scalable web applications.

---

## 📂 Project Structure

```plaintext
Hospital-Management-System/
│
├── src
│   ├── Controllers
│   │       appointmentController.js
│   │       messageController.js
│   │       userController.js
│   │
│   ├── Database
│   │       DbConnection.js
│   │
│   ├── MiddleWare
│   │       isAuth.js
│   │
│   ├── Models
│   │       AppointmentSchema.js
│   │       MessageModel.js
│   │       UserModel.js
│   │
│   └── Routes
│           appointmentRouter.js
│           messageRouter.js
│           userRouter.js
│
├── Utils
│       apiError.js
│       apiResponse.js
│       asynchandlers.js
│       generateToken.js
│
├── .env                 # Environment variables (e.g., API keys, secrets)
├── .gitignore           # Git ignore file to exclude sensitive files (e.g., node_modules, .env)
├── package.json         # Dependencies and project metadata
├── package-lock.json    # Lock file for dependencies
├── server.js            # Main server file (entry point)
└── README.md            # Project documentation
