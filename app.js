const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');
const { default: axios } = require('axios');

const app = express();

app.use(express.json({ extended: true }));

const PORT = config.get('port') || 5000;

const gameListLocal = require('./game_list.json');
const { path } = require('express/lib/application');
const gamesList = gameListLocal.applist.apps;

app.get('/game', async (req, res) => {
	try {
		// const games = await axios
		// 	.get('https://api.steampowered.com/ISteamApps/GetAppList/v2/')
		// 	.then((response) => response.data);

		const [game, appid] = await getGame();

		res.status(201).json({ ...game, appid: appid });
		// res.status(201).json(gameList);
	} catch (e) {
		// console.log('error', e.message);
		// console.log('error line', e.lineNumber);
		// res.status(201).json(e);
	}
});

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'), {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
	} catch (e) {
		console.log('Server Error', e.message);
	}
}

async function getGame() {
	const randGame = gamesList[random(0, gamesList.length - 1)];

	console.log(randGame);

	const appid = randGame.appid;

	const { data: game } = await axios.get(
		`http://store.steampowered.com/api/appdetails?appids=${appid}&l=russian&cc=ru`,
	);

	if (game[appid].success && (game[appid].data.is_free || game[appid].data.price_overview)) {
		return [game[appid], appid];
	}

	return getGame();
}

function random(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

// start();

if (process.env.NODE_ENV === 'pproduction') {
	app.use('/', express.static(path.join(__dirname, 'client', 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => console.log(`App started on port ${PORT}...`));
