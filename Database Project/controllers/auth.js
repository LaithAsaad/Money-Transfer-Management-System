const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		token = req.headers.authorization.split(' ')[1];
	} else {
		return res.json({success: false, msg: "No token Provided"})
	}

	if (!token) {
		return res.json({success: false, msg: "No token Provided"})
	}
	const secret = "123456789";
	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
            console.log(err.message)
			return res.json({success: false, msg: err.message})
		}
        console.log(decoded)
		req.email = decoded.email;
        console.log(decoded.email)
        console.log(req.email)
		next();
	});
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = {
        "email": email,
        "password": password
    }
    const secret = "123456789";
    try{
        const token = jwt.sign(user, secret, { expiresIn:3600})
        const refreshToken = jwt.sign(user, secret, { expiresIn: 86400})
    return res.json({success: true, accessToken: token, refreshToken: refreshToken});
    } catch (err){
        console.log(err);
        return res.json({success: false, msg: err.message})
    }
}
