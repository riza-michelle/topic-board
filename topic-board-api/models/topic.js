const mongoose = require('mongoose');
const uuid = require('uuid');

const Schema = mongoose.Schema;

const topicSchema = new Schema(
    {
        _id: { type: String, default: uuid.v1, alias: 'id' },
        subject: { type: String, required: true },
        description: { type: String },
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

topicSchema.set('toJSON', {
    transform: (doc, ret, opts) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.deleted_at;
    }
});

const topicModel = mongoose.model('Topic', topicSchema);

module.exports = topicModel;
