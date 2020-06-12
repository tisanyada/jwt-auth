const passport = require('passport');


module.exports = passport.authenticate('jwt', { session: false });



// const jwt_decode = require('jsonwebtoken');
// module.exports = (req, res, next)=>{
//     try{
//         const token = req.headers.authorization;
//         const decoded = jwt_decode.verify(token);
//         req.user = decoded;
//         next();
//     }catch (error){
//         console.log(error);
//         return res.status(401).json({
//             status: 'Unauthorized',
//             error: error,
//             msg: 'provide jwt token in Authorization header'
//         });
//     }
// }
