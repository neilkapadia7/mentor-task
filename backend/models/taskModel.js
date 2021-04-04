import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema({
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Mentor'
    },
    name: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', TaskSchema);

export default Task;