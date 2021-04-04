import Mentor from '../models/mentorModel.js'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'

// POST api/mentors/login
export const authMentor = asyncHandler(async (req, res) => {
    const {email, password} = req.body;

    const user = await Mentor.findOne({email});

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            isAdmin: user.isAdmin, 
            token: generateToken(user._id)
        })
    } else {
        res.status(401);
        throw new Error('Invalid email or Password');
    }
});

// POST /api/mentors
const registerMentor = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;

    const userExists = await Mentor.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error('User already Exists');
    }

    const user = await Mentor.create({
        name, 
        email,
        password
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email, 
            isAdmin: user.isAdmin, 
            token: generateToken(user._id)
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid User Data');
    }
})

// GET /api/mentors
export const getMentors = asyncHandler( async (req, res) => {
    const mentors = await Mentor.find({});
    res.json(mentors);
})

// PUT /api/mentors/:id
export const updateMentor = asyncHandler(async (req, res) => {
    const mentor = await Mentor.findById(req.params.id);

    if (mentor) {
        mentor.name= req.body.name || mentor.name
        mentor.email= req.body.email || mentor.email
        mentor.isAdmin = req.body.isAdmin

    const updateMentor = await mentor.save();

    res.json({
        _id: mentor._id,
        name: mentor.name,
        email: mentor.email,
        isAdmin: mentor.isAdmin,
    });
    }
    else {
        res.status(404);
        throw new Error('User Not Found');
    }
})

export {registerMentor}