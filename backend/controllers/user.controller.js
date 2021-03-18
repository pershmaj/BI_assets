const jwt = require('jsonwebtoken');
const secret_key = process.env.SECRET_KEY;

exports.login = (req, res, next) => {
    const {token, login, password} = req.body;
    // login with previous token
    if(token && login) {
        jwt.verify(token, secret_key, (err) => {
            if(err) {
              // old token
              const error = new Error('Token is old or invalid');
              error.status = 403;
              next(error)
            } else {
                // token is ok
                const newToken = jwt.sign( { login }, secret_key, { expiresIn: '1h' }); 
                res.status(200).json({
                    login: login,
                    token: newToken,
                });
            }
        })
    // login with credentials
    } else if(login && password) {
        // const user = Users.find((u) => u.login === login);
        // OK
        if(user && user.password === password) {
            const newToken = jwt.sign({ login }, secret_key, { expiresIn: '1h' }); 
            res.status(200).json({
                login: login,
                token: newToken,
            });
        // mismatch
        } else {
            const error = new Error(`Login or password mismatch`);
            error.status = 403;
            next(error);
        }
    } else {
        const error = new Error(`Token or credentials haven't been provided`);
        error.status = 403;
        next(error);
    }
}



