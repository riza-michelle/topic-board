const messageModel = require('../models/message');

class messageController {
	create(topic_id, message, user_id, callback){
		messageModel.create({
			topic_id,
			message,
			created_by: user_id,
			updated_by: user_id
		}, callback);
	}
	retrieveFromTopic(topic_id, callback, pagination=null){
		const limit = (pagination.limit == null) ? null : pagination.limit;
		const pageNumber = (pagination.pageNumber == null) ? null : pagination.pageNumber;
		const skip = (pagination.skip == null) ? 0 : pagination.skip;
		const pageSkip = (pageNumber && limit) ? limit * ( pagination.pageNumber -1 ) : 0;
		messageModel.find({ topic_id, deleted_at: null })
			.sort({updated_at: -1})
			.limit(limit)
			.skip(skip + pageSkip)
			.exec(callback);
	}
}

module.exports = messageController;
