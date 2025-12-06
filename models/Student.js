import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    email: {
        type: String
    },
    BTech: {
        type: String
    },
    city: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
