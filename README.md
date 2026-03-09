<div align="center">
  <img src="./frontend/public/vite.svg" alt="SkillSwap Logo" width="100" />
  <h1>🚀 SkillSwap</h1>
  <p><strong>A modern career platform and collaboration hub where users can share skills, find mentors, join communities, and build projects together.</strong></p>
</div>

<br/>

## 🌟 Overview
SkillSwap is a full-stack web application designed to help individuals grow their careers through collaborative learning. Whether you want to learn a new programming language, find a mentor in UX design, or team up for a hackathon, SkillSwap provides the tools to connect and collaborate.

## ✨ Key Features
- **User Authentication:** Secure email-based registration and login system.
- **Mentor Discovery:** Browse and easily view detailed profiles of available mentors across various technical and creative domains.
- **Communities & Groups:** Join specialized groups (e.g., Open Source, Hackathons) to chat, collaborate, and access room-like interfaces.
- **Real-Time Chat:** Integrated messaging system to communicate with mentors and peers instantly.
- **Collaboration Hub:** Form project teams based on complementary skill sets to build startup ideas or open-source projects.
- **Gamification:** Earn credits, level up, and maintain streaks as you actively participate in the platform.
- **Credit System:** Purchase or earn platform credits to unlock premium mentorship sessions (integrated with mock Razorpay/payment flows).
- **Responsive UI/UX:** A beautiful, dark-themed, and highly interactive frontend built with React, Tailwind CSS, and Framer Motion for buttery smooth animations.

---

## 💻 Tech Stack
### **Frontend**
- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Icons:** Lucide React

### **Backend**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (via Mongoose)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Real-Time:** Socket.io
- **Cloud Storage:** Cloudinary (for user uploads)

---

## 🛠️ Local Development Setup

To run this project locally on your machine, follow these steps:

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas URL)

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/skillswap.git
cd skillswap
```

### 2. Setup the Backend
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory with the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend development server:
```bash
npm run dev
```

### 3. Setup the Frontend
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend` directory with the following variable:
```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:
```bash
npm run dev
```

The app will become available at `http://localhost:5174`!

---

## 🐳 Running with Docker
If you have Docker Desktop installed, you can effortlessly spin up the entire application stack:

```bash
docker-compose up --build
```
This will containerize both the frontend and backend instances automatically.

---

## 🚀 Deployment (Vercel)
This application is designed to be easily deployable using platforms like Vercel and Render.
* **Frontend:** Deploys natively to **Vercel** with the `npm run build` command. Ensure you set the `VITE_API_URL` environment variable in your Vercel project settings to point to your live backend.
* **Backend:** Since the backend utilizes WebSockets (Socket.io) and requires long-lived connections, it is highly recommended to deploy the `backend` directory to platforms like **Render**, **Railway**, or **Heroku**.

---

## 📜 License
This project is licensed under the MIT License - see the LICENSE file for details.
