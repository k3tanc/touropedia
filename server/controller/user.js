import bcrypt from 'bcryptjs';

import { error500Response, jwtResponse, resResponse } from '../util/helper.js';
import UserModel from '../models/user.js';


export const signin = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const oldUser = await UserModel.findOne({email});
        
        if(!oldUser) 
                return  resResponse(res, {message: "Invalid credentials, please check details or register"}, 404);

        const passwordCheck = await bcrypt.compare(password, oldUser.password);
        if(!passwordCheck) 
                return resResponse(res, {message: "Invalid credentials"}, 404);
        
        const responseData = jwtResponse(oldUser);
        resResponse(res, responseData, 200);

    }catch(err){
        error500Response (err, res);
    }
}

export const signup = async (req,res) => {
    const {email, password, firstname, lastname } = req.body;
    try{
        const oldUser = await UserModel.findOne({email});
        if(oldUser) 
            return resResponse(res, {message: "Email address already asossiate with user account, please login or forgot password" }, 404)

        const hashPassword = await bcrypt.hash(password, 12);

        const result = await UserModel.create({
            email, 
            password : hashPassword,
            name : `${firstname} ${lastname}` 
        });

        const responseData = jwtResponse(result);

        resResponse(res, responseData, 201);
    }catch(err){
        error500Response (err, res);
    }
}