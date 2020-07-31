const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        _id: { type: String, default: uuid.v1, alias: 'id' },
        email: { type: String, required: true,  unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
        credential: { type: String }
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

userSchema.set('toJSON', {
    transform: (doc, ret, opts) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
    }
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
