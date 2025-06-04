# 🏋️ Gym MERN Project


Welcome to my personal **Gym Project**, built with the **MERN stack** (MongoDB, Express.js, React, Node.js). I created this app because I wanted full control over my workout routines — no monthly fees, just freedom to create and manage workouts my way.

---

## 🚀 Features

- ✅ Create unlimited **workout templates**
- 🏋️ Add and manage **unlimited exercises** per template
- 📝 Save your data and track your progress
- 💻 Built with **MERN Stack**

---


## 📦 Installation

## MondoDB Setup
To use this app, you’ll need a MongoDB account and a connection string.

1. Go to https://www.mongodb.com and create a free account.

2. Create a new project and database using MongoDB Atlas.

3. In the Database Deployment, click Connect, then choose "Connect your application".

4. Copy the provided connection string (it looks like this):
mongodb+srv://<username>:<password>@cluster.mongodb.net/<your-db-name>?retryWrites=true&w=majority
5. Replace <username>, <password>, and <your-db-name> with your own details.

6. Create a .env file in the backend folder and add: 

```bash 
MONGO_URI=your_connection_string_here
```



```bash
git clone https://github.com/TsiouMiouPiou/Gym_MERN.git
cd Gym_MERN
```

## Backend Setup
```bash
cd backend
npm install 
npm run dev
```

## Frontend Setup (New Terminal)
```bash
cd frontend
npm install 
npm run dev
```
