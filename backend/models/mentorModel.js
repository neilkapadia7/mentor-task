import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const mentorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
}, {
    timestamps: true
});

mentorSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

mentorSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

const Mentor = mongoose.model('Mentor', mentorSchema);

export default Mentor;