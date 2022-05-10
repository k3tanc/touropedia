import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserModel from '../models/user.js';

const secret = "nckowncofihq;NQP";

export const signup = async (req,res) => {
    const {email, password, firstname, lastname } = req.body;
    try{
        const oldUser = await UserModel.findOne({email});
        if(oldUser) return res.status(400).json({message: "Email address already asossiate with user account, please login or forgot password"});

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({
            email, 
            password : hashPassword,
            name : `${firstname} ${lastname}` 
        });
        console.log(result)
        const token = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"});

        res.status(201).json({result,token});
    }catch(err){
        res.status(500).json({message:"Something went wrong "})
        console.log(err);
    }
}