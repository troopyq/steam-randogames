import React from 'react';
import { LinkToGame } from '../LinkToGame/LinkToGame';

export const GameContent = ({ game }) => {
	const { name, header_image, background, is_free, price_overview } = game.data;
	const release_date = game.data.release_date.date;

	return (
		<div className='game-info'>
			<LinkToGame className='left-info' appid={game.appid}>
				<h2>{name}</h2>
				<img className='header-img-game' src={header_image} alt='' />
			</LinkToGame>

			<div className='right-info'>
				<h4>Дата выхода {release_date}</h4>
				<p className='price'>
					{is_free
						? 'Бесплатная'
						: price_overview
						? `Цена ${price_overview.final_formatted}`
						: 'Цена Неизвестно'}
				</p>
				<ul>
					{game.data.categories.map((cat) => (
						<li key={cat.id}>{cat.description}</li>
					))}
				</ul>
			</div>
			{background && <img className='bg-game' src={background} alt='' />}
		</div>
	);
};
