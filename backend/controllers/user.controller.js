const jwt = require('jsonwebtoken');
const hash = require('object-hash');
const secret_key = process.env.SECRET_KEY;
const User = require("../models").User;
const Asset = require("../models").Asset;

exports.login = async (req, res, next) => {
    const {token, nickname, password} = req.body;
    // login with previous token
    if(token) {
        jwt.verify(token, secret_key, async (err) => {
            if(err) {
              // old token
              const error = new Error('Token is old or invalid');
              error.status = 403;
              next(error)
            } else {
                // token is ok
                const newToken = jwt.sign( { nickname }, secret_key, { expiresIn: '1h' }); 
                const user = await User.findOne({ where: {nickname}, attributes: ['id', 'nickname']});
                res.status(200).json({
                    id: user.id,
                    nickname: user.nickname,
                    token: newToken,
                });
            }
        })
    // login with credentials
    } else if(nickname && password) {
        const user = await User.findOne({ where: {nickname}, attributes: ['id', 'nickname', 'password']});
        // OK
        if(user && user.password === hash(password)) {
            const newToken = jwt.sign({ nickname }, secret_key, { expiresIn: '1h' }); 
            res.status(200).json({
                id: user.id,
                nickname: user.nickname,
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

exports.registration = async (req, res, next) => {
    const { nickname, password1, password2 } = req.body;
    try {
        if( password1 !== password2 ) {
            throw new Error('Passwords doesnt match');
        }
        if(nickname && password1) {
            const user = await User.create({
                nickname,
                password: hash(password1),
            });
            const newToken = jwt.sign({ nickname }, secret_key, { expiresIn: '1h' }); 
            res.status(200).json({
                id: user.id,
                nickname: user.nickname,
                token: newToken,
            });
        } else {
            throw new Error('Credentials missing');
        } 
    } catch(e) {
        res.status(500).json(e);
    }
}

exports.updateUser = async (req, res, next) => {
    const { nickname, previousPassword, password1, password2 } = req.body;
    try {
        if( !!previousPassword && password1 !== password2 ) {
            throw new Error('New passwords mismatch');
        }

        const { user: tokenUser } = req;
        const user = await User.findByPk(tokenUser.id);
        if(user) {
            user.nickname = nickname ?? user.nickname;
            if(!!previousPassword) {
                if(hash(previousPassword) === user.password) {
                    user.password = hash(password1);
                } else {
                    throw new Error('New and old passwords mismatch');
                }
            }
            await user.save();
            const newToken = jwt.sign({ nickname: user.nickname }, secret_key, { expiresIn: '1h' });
            res.status(200).json({
                nickname: user.nickname,
                token: newToken,
            });
        } else {
            throw new Error('user cannot be found');
        } 
    } catch(e) {
        next(e);
    }
}


