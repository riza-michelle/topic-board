const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        _id: { type: String, default: uuid.v1, alias: 'id' },
        topic_id: { type: String, required: true },
        message: { type: String, required: true },
        created_by: { type: String, required: true },
        updated_by: { type: String, required: true },
        deleted_at: { type: Date }
    }, {
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    }
);

messageSchema.set('toJSON', {
    transform: (doc, ret, opts) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.deleted_at;
    }
});

const messageModel = mongoose.model('Message', messageSchema);

module.exports = messageModel;
