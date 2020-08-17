
;
'use strict'

const jwt = require('jsonwebtoken'),
     cache = require('memory-cache'),
     authConfig = require('../config/auth')


let autentica = (req, res, next) => {
    
    let token = req.headers.authorization || null
    console.log(token)
    
  jwt.verify(token,  process.env.AUTH_SECRET, (err, decode) => {
        if(err) {
            return res.status(400).json({
                data : err,
                msg: 'Token invalido'
            }) 
        }else {
            req.decode = decode
            
            let token = jwt.sign({data: decode.data}, process.env.AUTH_SECRET, {
                algorithm: 'HS256',
                expiresIn: parseInt(process.env.AUTH_EXPIRES)
            
              
            })
           
            req.token = token
            next()
        }
    })
}

module.exports = {
  
    autentica
 }