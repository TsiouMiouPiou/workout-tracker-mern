# 🏋️ Gym MERN Project


Welcome to my personal **Gym Project**, built with the **MERN stack** (MongoDB, Express.js, React, Node.js). I created this app because I wanted full control over my workout routines — no monthly fees, just freedom to create and manage workouts my way.

## Check out the screenshots to explore the functionality...

<h1 align="center">Home Page</h1>
<p align="center">
  <img src="https://github.com/TsiouMiouPiou/workout-tracker-mern/blob/740fb47e37a63f55629c08336cdf3bb78a21bdd1/screenshots/image%202.png" width="400" />
</p>

<h1 align="center">Create New Template</h1>
<p align="center">
  <img src="https://github.com/TsiouMiouPiou/workout-tracker-mern/blob/main/screenshots/image%207.png?raw=true" width="400" />
</p>

<h1 align="center">Add New Exercises</h1>
<p align="center">
  <img src="https://github.com/TsiouMiouPiou/workout-tracker-mern/blob/main/screenshots/image%204.png?raw=true" width="400" />
</p>

<h1 align="center">Delete Exercises</h1>
<p align="center">
  <img src="https://github.com/TsiouMiouPiou/workout-tracker-mern/blob/main/screenshots/image%205.png?raw=true" width="400" />
</p>

<h1 align="center">Start Workout Session</h1>
<p align="center">
  <img src="https://github.com/TsiouMiouPiou/workout-tracker-mern/blob/main/screenshots/image%209.png?raw=true" width="400" />
</p>

<h1 align="center">Workout History</h1>
<p align="center">
  <img src="https://github.com/TsiouMiouPiou/workout-tracker-mern/blob/main/screenshots/image%208.png?raw=true" width="400" />
</p>
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
