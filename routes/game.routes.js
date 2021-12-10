const { Router } = require('express');
const router = Router();

router.post('/game', async (req, res) => {
	try {
		console.log(req);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так...' });
	}
});
