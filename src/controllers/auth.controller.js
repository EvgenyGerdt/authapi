const User = require('../models/user.model');
const ErrorResponse = require('../utils/errorResponse');
const { sendResponse } = require('../utils/successResponse');

/**
 *  @description Sign Up method
 *  @type Express.post
 */
exports.register = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        await User.findOne({ email: email }).exec(async (e, user) => {
            if (e) {
                return next(new ErrorResponse(e, 500));
            } else if (user) {
                return next(new ErrorResponse('User already exists', 409));
            } else {
                const user = await User.create({ email, password, username });
                await sendResponse(user, 200, res);
            }
        })
    } catch (e) {
        return next(new ErrorResponse(e.message, 500));
    }
};

/**
 * @description Sign in method
 * @type Express.post
 */
exports.login = async (req, res, next) => {
    try {
        const authCandidate = {
            email: req.body.email,
            password: req.body.password,
        };

        if (!authCandidate.email || !authCandidate.password) {
            return next(new ErrorResponse('Please, provide email and password'));
        }

        await User.findOne({ email: authCandidate.email }).exec(async (e, user) => {
            if (e) {
                return next(new ErrorResponse(e, 500));
            } else if (!user) {
                return next(new ErrorResponse('Invalid credentials', 404));
            } else {
                const isMatch = await user.matchPasswords(authCandidate.password);

                if (!isMatch) {
                    return next(new ErrorResponse('Invalid credentials', 404));
                } else {
                    const body = {
                        user: {
                            id: user._id,
                            username: user.username,
                            email: user.email,
                            createdAt: user.createdAt,
                        },
                        token: await user.createToken(),
                    };
                    await sendResponse(body, 200, res);
                }
            }
        });
    } catch (e) {
        return next(new ErrorResponse(e.message, 500));
    }
};

