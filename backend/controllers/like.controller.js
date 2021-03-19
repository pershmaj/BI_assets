const UserAssetToLike = require("../models").UserAssetToLike;

exports.doLike = async (req, res, next) => {
    const { user_id, asset_id } = req.params;

    try {

        if(user_id !== user.id) {
            throw new Error('Permission denied');
        }

        const like = await UserAssetToLike.findOne({
            where: {user_id, asset_id}
        });
        
        if(like) {
            await like.destroy();
            res.status(200).json({
                message: 'Disliked',
                like: false,
            });
        } else {
            const like = await UserAssetToLike.create({user_id, asset_id});
            res.status(200).json({
                message: 'Liked',
                like,
            });
        }
    } catch(e) {
        next(e);
    }
}