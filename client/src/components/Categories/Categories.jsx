import React from 'react';

export const Categories = ({ list }) => {
	return (
		<ul className='list list-categories'>
			{list && list.length && list.map((cat) => <li key={cat.id}>{cat.description}</li>)}
		</ul>
	);
};
