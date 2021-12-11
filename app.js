const express = require('express');
const config = require('config');
const path = require('path');
const { default: axios } = require('axios');

const app = express();
const PORT = config.get('port') || 80;

app.use(express.json({ extended: true }));

const gameListLocal = require('./game_list.json');

const gamesList = gameListLocal.applist.apps;

const gameRouter = express.Router();

// app.get('/', function(req, res){
//   res.send('hello world');
// });

gameRouter.get('/', async (req, res) => {
	try {
		console.log('---------');
		let filters;
		if (req.query.filters) {
			filters = req.query.filters.split(',').map((el) => parseInt(el));
		}
		console.log('params: ', filters || []);
		const [game, appid, count] = await getGame({ filters });

		res.status(201).json({ ...game, appid: appid, count: count ? count : 0 });
	} catch (e) {
		res.status(500).json(e);
	}
});
gameRouter.get('/:appid', async (req, res) => {
	try {
		if (req.params.appid) {
			const [game, appid] = await getGame({ id: req.params.appid });
			res.status(201).json({ ...game, appid: appid });
		} else {
			const [game, appid] = await getGame();
			res.status(201).json({ ...game, appid: appid });
		}
	} catch (e) {
		res.status(500).json(e);
	}
});

app.use('/game', gameRouter);

async function getGame({ id = null, filters = [], count = 1 }) {
	console.log('count: ', count);
	let randGame, appid;
	if (!id) {
		randGame = gamesList[random(0, gamesList.length - 1)];
		appid = randGame.appid;
	} else {
		appid = id;
	}

	console.log('game: ', randGame || appid);

	function timeout(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	// await timeout(50);

	const { data: game } = await axios.get(
		`http://store.steampowered.com/api/appdetails?appids=${appid}&l=russian&cc=ru`,
	);
	// игра в доступе и ее можно скачать
	if (
		game &&
		game[appid].success &&
		(game[appid].data.is_free || game[appid].data.price_overview)
	) {
		const isCat = game[appid].data.categories.filter((cat) => filters.includes(cat.id));
		console.log('filter: ', isCat);
		// console.log('categories: ', game[appid].data.categories);
		if (filters.length && isCat.length) return [game[appid], appid, count];
		if (filters.length && !isCat.length) return getGame({ count: ++count, filters });
		return [game[appid], appid, count];
	}

	return getGame({ count: ++count, filters });
}

function random(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'client', 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
	// 	app.use('/', express.static(path.join(__dirname, 'client', 'build')));
	// 	app.get('*', (req, res) => {
	// 		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	// 	});
	// 	app.use('/', file.serve(request, response));
	// 	app.get('*', (req, res) => {
	// 	    fileServer.serveFile('/index.html', 200, {}, request, response);
	// 	});
}

app.listen(PORT, () => console.log(`App started on port ${PORT}...`));
