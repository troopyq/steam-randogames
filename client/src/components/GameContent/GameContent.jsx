import React from 'react';
import { Categories } from '../Categories/Categories';
import { LinkToGame } from '../LinkToGame/LinkToGame';
import { Price } from '../Price/Price';

export const GameContent = ({ game }) => {
	const { name, header_image, background, is_free, price_overview } = game.data;
	const release_date = game.data.release_date.date;

	return (
		<div className='game-info'>
			<LinkToGame className='left-info' appid={game.appid}>
				<h2>{name}</h2>
				<img className='header-img-game' src={header_image} alt='' />
				<h4 style={{ textDecoration: 'underline' }}>Перейти в Steam к этой игре</h4>
			</LinkToGame>

			<div className='right-info'>
				<h4>Дата выхода {release_date}</h4>
				<Price data={{ is_free, price_overview }} />
				<Categories list={game.data.categories} />
			</div>

			{background && <div className='bg-game' style={{ background: `url('${background}')` }}></div>}
		</div>
	);
};
