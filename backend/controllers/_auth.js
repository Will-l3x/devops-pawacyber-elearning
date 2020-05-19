
let checkToken = (req, res, next) => {


    if (req.url !== '/api/login' && req.url !== '/api/register'  && req.url !== '/api/resetpassword' && req.url.indexOf('/api/verify') < 0 && req.url !== '/api/refreshotp') {

        let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase

        if (token) {
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }
        } else {
            return res.json({
                status: 401,
                success: false,
                message: 'Auth token is not supplied'
            });
        }


        if (token) {
            jwt.verify(token, process.env.jwt_secret, (err, decoded) => {
                if (err) {
                    return res.json({
                        status: 401,
                        success: false,
                        message: 'Token is not valid'
                    });
                } else {
                    req.decoded = decoded;
                    console.log(decoded);

                    next();
                }
            });
        } else {
            return res.json({
                status: 401,
                success: false,
                message: 'Auth token is not supplied'
            });
        }
    } else {
        next();
    }
};