# 🔐 Clerk Authentication System

A full-stack authentication system built using React.js, Node.js, MongoDB, and Clerk. This project demonstrates modern authentication workflows with secure and scalable architecture.



## 🚀 Features

- User Signup & Login
- Logout functionality
- Protected Routes
- Email Verification
- Password Reset
- Google OAuth Login
- Role-Based Access Control (Admin/User)
- MongoDB User Storage



## 🛠️ Tech Stack

**Frontend**
- React.js
- HTML, CSS, JavaScript

**Backend**
- Node.js
- Express.js

**Database**
- MongoDB

**Authentication**
- Clerk


## ⚙️ Environment Variables

Create `.env` files in both `client` and `server`.

### Server
```
MONGO_URI=your_mongodb_uri
CLERK_SECRET_KEY=your_secret_key
```

### Client
```
REACT_APP_CLERK_PUBLISHABLE_KEY=your_publishable_key
```



## ▶️ Getting Started

### 1. Clone the repository
```
git clone https://github.com/mir-arsh/Auth-System.git
cd Auth-System
```


### 2. Install dependencies

**Server**
```
cd server
npm install
```

**Client**
```
cd client
npm install
```


### 3. Run the project

**Start backend**
```
cd server
node server.js
```


**Start frontend**
```
cd client
npm start
```

**Start NGROK**
```
ngrok http 5000
```

**Note:** You will need to install ngrok in your system and add your ngrok link to clerk webhook.




## 🔐 Role-Based Access

- Default users are assigned `user` role
- Admin routes are protected via middleware
- Admin dashboard allows user management



## 🌐 Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

**Note:** For deployment links in certain files have been changed from localhost to domain.

## Live Link: 
https://arsh-auth.vercel.app


## 👨‍💻 Author

Arsh Zaffar Mir



## ⭐ If you found this useful

Give it a star on GitHub!
#
