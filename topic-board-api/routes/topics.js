const express = require('express');
const topicControllerCls = require('../controllers/topic');
const userCredential = require('../controllers/usercredential');

const topicController = new topicControllerCls();

const router = express.Router();

router.get('/', (req, res) => {
    userCredential.verify(req.headers.token, (err, userDetails) => {
        if (err)
            return res.status(err.code).json(err.toJSON());
        const pagination = {
            limit: parseInt(req.query.limit) || null,
            pageNumber: parseInt(req.query.page) || null,
            skip: parseInt(req.query.skip) || null
        };
        topicController.retrieveAll((err, doc) => {
            if (err)
                return res.status(err.code).json(err.toJSON());
            return res.json(doc);
        }, pagination);
    });
});

module.exports = router;
