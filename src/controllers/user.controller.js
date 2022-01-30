const User = require('../models/user.model');

/**
 * @description {GET} Get user info by id
 */
exports.getUser = async (req, res, next) => {
    try {
        await User.findById(req.params.id)
            .exec((error, user) => {
                if (error) {
                    return next(res.status(500)
                        .send({ message: error })
                    );
                } else if (!user) {
                    return next(res.status(404).send({ message: "User doesn't exists" }));
                } else {
                    return next(res.status(200).send({
                        id: user._id,
                        username: user.username,
                        email: user.email,
                    }));
                }
            });
    } catch (error) {
        return next(res.status(500).send({ message: error }));
    }
};