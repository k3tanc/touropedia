import jwt from 'jsonwebtoken';

export const error500Response = (err, res) =>{
    console.log(err);
    res.status(500).json({message:"Something went wrong "})
}

export const resResponse = (res, data, status) => {
    res.status(status).json({data});
}

export const jwtResponse = (user) =>{

    const secret = process.env.SECRET;

    const token = jwt.sign({email: user.email, id: user._id}, secret, {expiresIn: "1h"});

    return {
            name: user.name,
            id: user._id,
            email: user.email,
            token
        }
}