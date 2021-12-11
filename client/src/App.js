import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container } from './components/Container/Container';
import { GameContent } from './components/GameContent/GameContent';
import { Filters } from './components/Filters/Filters';
import { setGame } from './store/randomGame';

import loader from './assets/icon/loader.svg';
import { useSelector, useDispatch } from 'react-redux';

function App() {
	// const [game, setGame] = useState({});
	const game = useSelector((state) => state.randomGame.game);
	const filters = useSelector((state) => state.filters);
	const dispatch = useDispatch();
	const [isLoad, setIsLoad] = useState(false);

	async function getRandomGame(id = false) {
		setIsLoad(true);
		console.log('id: ', id);

		const paramFilters = filters
			.map((filter) => (filter.checked ? filter.id : false))
			.filter((el) => el !== false)
			.toString();
		console.log(paramFilters);
		let data;
		try {
			data = await axios(
				`/game${paramFilters ? '?filters=' + paramFilters : ''}${+id ? '/' + id : ''}`,
			);
		} catch (e) {
			console.log('error:', e.message);
			console.log(e);
			setIsLoad(false);
			dispatch(
				setGame({
					success: false,
					message: `Не удалось найти игру. Попробуйте еще раз или перезагрузите страницу`,
				}),
			);
			return;
		}

		if (data && data.status[0] != 2) setIsLoad(false);
		dispatch(setGame({ success: false, message: 'Не удалось найти игру. Ошибка' }));

		const res = data.data;

		console.log(res);
		if (res.success) {
			console.log('Игра найдена');
			dispatch(setGame({ ...res, message: 'Игра найдена' }));
			console.log((window.location.hash = '/game/' + res.appid));
		} else {
			console.log('Такой игры нет');
			dispatch(setGame({ success: false, message: 'Такой игры нет' }));
		}
		setIsLoad(false);
	}

	useEffect(() => {
		const id = window.location.hash.split('/').slice(1)[1];

		if (id) getRandomGame(id);
	}, []);

	return (
		<div className='App'>
			<main className='main'>
				<Container className='y-center'>
					<div className='button-wrap'>
						<button
							className='btn'
							disabled={isLoad ? true : false}
							onClick={() => getRandomGame()}>
							Искать игру
						</button>
						<img className={`loader ${isLoad ? 'active' : ''}`} src={loader} />
						{game.count ? (
							<p>
								Перебрал игр: <b> {game.count}</b>
							</p>
						) : null}
					</div>
					<Filters />
					{game.success ? <GameContent game={game} /> : <h2>{game.message}</h2>}
				</Container>
			</main>
		</div>
	);
}

export default App;
