const { body, validationResult } = require("express-validator");
exports.clubValidator = [
    body("name").isString().isLength({ min: 3 }).not().isEmpty(),
    body("teamId").isInt().optional(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });   
        
        next()
    }
]


exports.clubUpdateValidator = [
    body("name").isString().isLength({ min: 3 }).optional,
    body("teamId").isInt().optional(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });   
        
        next()
    }
]