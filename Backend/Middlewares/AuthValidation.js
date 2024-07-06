const joi = require('joi')

const signupValidation = (req, res, next)=>{
   
    const schema = joi.object({
        firstName: joi.string().min(3).max(50).required(),
        lastName: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(16)
    })
  
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400)
            .json({ message: 'Bad request', error })
        }
        next()
}

const loginValidation = (req, res, next)=>{
   
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(16)
    })
  
        const {error} = schema.validate(req.body);
        if(error){
            return res.status(400)
            .json({ message: 'Bad request', error })
        }
        next()
}

module.exports ={
    signupValidation,
    loginValidation
}
