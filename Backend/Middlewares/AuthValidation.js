const joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().min(3).max(50).required(),
        lastName: joi.string().min(3).max(50).required(),
        email: joi.string().email().required(),
        password: joi.string().min(4).max(16).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad request', error: error.details });
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(4).max(16).required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Bad request', error: error.details });
    }
    next();
};

const profileUpdateValidation = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().min(3).max(50),
        lastName: joi.string().min(3).max(50),
        bio: joi.string().max(250),
        image: joi.string().uri()  // Ensure image URL validation
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: 'Validation error', error: error.details });
    }

    next();
};

module.exports = {
    signupValidation,
    loginValidation,
    profileUpdateValidation
};
