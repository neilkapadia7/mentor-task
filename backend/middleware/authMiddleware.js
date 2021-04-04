import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import Mentor from '../models/mentorModel.js'

export const protect = asyncHandler(async (req, res, next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.mentor = await Mentor.findById(decoded.id).select('-password');

            // console.log(req.mentor);

            next()
        } catch (err) {
            console.error(err);
            res.status(401)
            throw new Error('Not Authorized, token failed')
        }
    }
    if(!token) {
        res.status(401);
        throw new Error('Not Authorized, No Token');
    }
})