const express = require('express');
const userControllerCls = require('../controllers/user');
const userCredential = require('../controllers/usercredential');


const userController = new userControllerCls();

const router = express.Router();

router.post('/register', (req, res) => {
	userController.register(req.body.email, req.body.password, req.body.name, (err, doc) => {
		if (err)
			return res.status(err.code).json(err.toJSON());
		res.json(doc);
	});
});

router.post('/login', (req, res) => {
	userController.login(req.body.email, req.body.password, (err, doc) => {
		if (err){
			return res.status(err.code).json(err.toJSON());
		}
		userCredential.sign(doc.id, doc.email, (err, token) => {
			if (err)
				return res.status(err.code).json(err.toJSON());
			res.json({ token });
		});
	});
});

router.post('/logout', (req, res) => {
	userCredential.invalidate(req.headers.token, (err, doc) => {
		if (err){
			return res.status(err.code).json(err.toJSON());
		}
		res.json({ success: true });
	});
});

module.exports = router;
