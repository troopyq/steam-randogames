import React from 'react';

export const Price = ({ data }) => {
	return (
		<p className='price'>
			{data.is_free
				? 'Бесплатная'
				: data.price_overview
				? `Цена ${data.price_overview.final_formatted}`
				: 'Цена Неизвестно'}
		</p>
	);
};
