import express from 'express';
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import path from 'path';
import mentorRoutes from './routes/mentorRoutes.js'
import taskRoutes from './routes/taskRoutes.js'

dotenv.config()

const app = express();

connectDB();

app.use(express.json());

app.use('/api/mentors', mentorRoutes)
app.use('/api/tasks', taskRoutes)

if  (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/uploads')))

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, '/frontend/build'));
    })
}
else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on Port Number ${PORT}`))