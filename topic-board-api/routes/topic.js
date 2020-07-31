const express = require('express');
const topicControllerCls = require('../controllers/topic');
const messageControllerCls = require('../controllers/message');
const userCredential = require('../controllers/usercredential');

const topicController = new topicControllerCls();
const messageController = new messageControllerCls();

const router = express.Router();

router.post('/', (req, res) => {
    userCredential.verify(req.headers.token, (err, userDetails) => {
        if (err)
            return res.status(err.code).json(err.toJSON());
        topicController.create(req.body.subject, req.body.description, userDetails.user_id, (err, doc) => {
            if (err)
                return res.status(err.code).json(err.toJSON());
            return res.json(doc);
        });
    });
});

router.patch('/:id', (req, res) => {
    userCredential.verify(req.headers.token, (err, userDetails) => {
        if (err)
            return res.status(err.code).json(err.toJSON());
        topicController.update(req.params.id, req.body.subject, req.body.description, userDetails.user_id, (err, doc) => {
            if (err)
                return res.status(err.code).json(err.toJSON());
            return res.json(doc);
        });
    });
});

router.get('/:id', (req, res) => {
    userCredential.verify(req.headers.token, (err, userDetails) => {
        if (err)
            return res.status(err.code).json(err.toJSON());
        topicController.retrieveByID(req.params.id, (err, doc) => {
            if (err)
                return res.status(err.code).json(err.toJSON());
            return res.json(doc);
        });
    });
});

router.delete('/:id', (req, res) => {
    userCredential.verify(req.headers.token, (err, userDetails) => {
        if (err)
            return res.status(err.code).json(err.toJSON());
        topicController.delete(req.params.id, userDetails.user_id, (err, result) => {
            if (err)
                return res.status(err.code).json(err.toJSON());
            return res.json({ success: result });
        });
    });
});

router.post('/:id/message', (req, res) => {
    userCredential.verify(req.headers.token, (err, userDetails) => {
        if (err)
            return res.status(err.code).json(err.toJSON());
        messageController.create(req.params.id, req.body.message, userDetails.user_id, (err, doc) => {
            if (err)
                return res.status(err.code).json(err.toJSON());
            return res.json(doc);
        });
    });
});

router.get('/:id/messages', (req, res) => {
    userCredential.verify(req.headers.token, (err, userDetails) => {
        if (err)
            return res.status(err.code).json(err.toJSON());
        const pagination = {
            limit: parseInt(req.query.limit) || null,
            pageNumber: parseInt(req.query.page) || null,
            skip: parseInt(req.query.skip) || null
        };
        messageController.retrieveFromTopic(req.params.id, (err, doc) => {
            if (err)
                return res.status(err.code).json(err.toJSON());
            return res.json(doc);
        }, pagination);
    });
});

module.exports = router;
