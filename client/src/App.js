import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from './components/Container/Container';
import { GameContent } from './components/GameContent/GameContent';

import loader from './assets/icon/loader.svg';

function App() {
	const [game, setGame] = useState({});
	const [isLoad, setIsLoad] = useState(false);

	async function getRandomGame() {
		setIsLoad(true);
		const { data: res } = await axios('/game');
		console.log(res);
		if (res.success) {
			console.log('Игра найдена');
			setGame({ ...res, message: 'Игра найдена' });
			console.log(res.data.name);
		} else {
			console.log('Такой игры нет');
			setGame({ success: false, message: 'Такой игры нет' });
		}
		setIsLoad(false);
	}

	console.log(game);

	return (
		<div className='App'>
			<main className='main'>
				<Container className='y-center'>
					<div className='button-wrap'>
						<button className='btn' disabled={isLoad ? true : false} onClick={getRandomGame}>
							Искать игру
						</button>
						<img className={`loader ${isLoad ? 'active' : ''}`} src={loader} />
					</div>
					{game.success ? <GameContent game={game} /> : <h2>{game.message}</h2>}
				</Container>
			</main>
		</div>
	);
}

export default App;
