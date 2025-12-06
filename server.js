import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import Student from './models/Student.js';

const app = express();
const port = 3000;

app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/studentdetails';
mongoose.connect(mongoUri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json({
            message: "Retrieved all students successfully",
            count: students.length,
            data: students
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve students" });
    }
});

app.post('/api/students', async (req, res) => {
    const { name, age, grade, section } = req.body;

    if (!name) {
        return res.status(400).json({ error: "Student name is required" });
    }

    try {
        const newStudent = new Student({
            name,
            age,
            grade,
            section
        });

        const savedStudent = await newStudent.save();
        console.log('New student added:', savedStudent);

        res.status(201).json({
            message: "Student added successfully",
            data: savedStudent
        });
    } catch (error) {
        res.status(500).json({ error: "Failed to add student" });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
