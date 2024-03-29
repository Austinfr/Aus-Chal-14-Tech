const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model{}
//initializes our model based on the criteria
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps: {
            createdAt: true,
            updatedAt: false
        },
        freezeTableName: true,
        modelName: 'Comment'
    }
);

module.exports = Comment;