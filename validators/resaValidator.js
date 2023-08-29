const { body, validationResult } = require("express-validator");
exports.resaValidator = [
    body("firstname").isString().isLength({ min: 3 }).not().isEmpty(),
    body("lastname").isString().isLength({ min: 3 }).not().isEmpty(),
    body("phone").isString().not().isEmpty(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(400).json({ errors: errors.array() });   
        
        next()
    }
]