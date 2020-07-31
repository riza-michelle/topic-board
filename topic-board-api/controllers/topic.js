const topicModel = require('../models/topic');
const messageModel = require('../models/message');
const APIError = require('../utils/apierror');

class topicController {
	create(subject, description, user_id, callback){
		topicModel.create({
			subject,
			description,
			created_by: user_id,
			updated_by: user_id
		}, callback);
	}
	retrieveAll(callback, pagination=null){
		const limit = (pagination.limit == null) ? null : pagination.limit;
		const pageNumber = (pagination.pageNumber == null) ? null : pagination.pageNumber;
		const skip = (pagination.skip == null) ? 0 : pagination.skip;
		const pageSkip = (pageNumber && limit) ? limit * ( pagination.pageNumber -1 ) : 0;

		topicModel.find({ deleted_at: null })
			.sort({subject: 1})
			.collation({ locale: 'en_US', strength: 1 })
			.limit(limit)
			.skip(skip + pageSkip)
			.exec(callback);
	}
	retrieveByID(id, callback){
		topicModel.findById(id).exec(callback);
	}
	checkFromUser(topic_id, user_id, callback){
		topicModel.findOne({ _id: topic_id, created_by: user_id }).exec((err, docs) => {
			callback(err, docs != null);
		});
	}
	update(topic_id, subject, description, user_id, callback){
		this.checkFromUser(topic_id, user_id, (err, isTopicFromUser) => {
			if (err)
				return callback(new APIError(500, 'Server Error', err))
			if (!isTopicFromUser)
				return callback(new APIError(401, 'Operation is not allowed!', {}));
			topicModel.updateOne(
				{ _id: topic_id }, 
				{ $set: { subject, description, updated_by: user_id, updated_at: new Date() }},
				( err, result ) => {
					topicModel.findById(topic_id).exec(callback);
				}
			);
		});
	}
	delete(topic_id, user_id, callback){
		this.checkFromUser(topic_id, user_id, (err, isTopicFromUser) => {
			if (err)
				return callback(new APIError(500, 'Server Error', err))
			if (!isTopicFromUser)
				return callback(new APIError(401, 'Operation is not allowed!', {}));
			topicModel.updateOne(
				{ _id: topic_id },
				{ $set: { deleted_at: new Date() } },
				(err, result) => {
					if (err)
						return callback(new APIError(500, 'Server Error', err));
					if ( result.nModified != 1 )
						return callback(err, false);
					messageModel.update(
						{ topic_id: topic_id }, 
						{ $set: { deleted_at: new Date() } },
						(err, result) => {
							callback(err, (!err) ? true : null );
						}
					);
				}
			);
		});
	}
}

module.exports = topicController;
