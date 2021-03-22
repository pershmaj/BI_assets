const User = require("../models").User;
const Asset = require("../models").Asset;
const UserAssetToLike = require("../models").UserAssetToLike;
const fs = require('fs');

exports.getAssets = async (req, res, next) => {
    try {
        const assets = await Asset.findAll({
            include: [
                { model: User, as: 'likes', attributes: ['id', 'nickname'] },
                { model: User, as: 'owner', attributes: ['id', 'nickname']}
            ]
        });
        res.status(200).json({assets});
    } catch(e) {
        next(e);
    }
}

exports.createAsset = async(req, res, next) => {
    const { name } = req.body;
    const link = req.asset.filename;
    const { user } = req;
    try {
        
        
        const asset = await Asset.create({
            name,
            link,
            user_id: user.id,
        });

        res.status(200).json({
            asset,
            message: 'Asset successfully created'
        });
    } catch(e) {
        next(e);
    }
}

exports.updateAsset = async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    const link = req.file.filename;
    const { user } = req;
    try {
        const asset = await Asset.findByPk(id, {
            include: [
                { model: User, as: 'likes', attributes: ['id', 'nickname'] },
                { model: User, as: 'owner', attributes: ['id', 'nickname']}
            ]
        });
        if(asset.user_id !== user.id) {
            throw new Error('Permission denied');
        }
        //delete old file
        const targetPath = `./public/assets/${asset.link}`;
        if(fs.existsSync(targetPath)) {
            fs.unlink(targetPath, err => {
              if (err) throw new Error(err);
            });
        } else {
            throw new Error('Cannot find asset file');
        } 

        asset.name = name ?? asset.name;
        asset.link = link ?? asset.link;
        await asset.save();
        res.status(200).json({
            asset,
            message: 'Asset successfully updated',
        });
    } catch(e) {
        next(e);
    }
}

exports.deleteAsset = async (req, res, next) => {
    const { id } = req.params;
    const { user } = req;
    try {
        const asset = await Asset.findByPk(id);
        if(asset.user_id != user.id) {
            throw new Error('Permission denied');
        }
        
        const link = asset.link;
        const targetPath = `./public/assets/${link}`
        
        if(fs.existsSync(targetPath)) {
            fs.unlink(targetPath, err => {
              if (err) throw new Error(err);
            });
        } else {
            throw new Error('Cannot find asset file');
        } 

        await UserAssetToLike.destroy({where: {asset_id: asset.id}})
        await asset.destroy();
        
        res.status(200).json({
            message: 'Asset successfully deleted'
        });
    } catch(e) {
        next(e);
    }
}