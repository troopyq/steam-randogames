import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFilter, changeFilter } from '../../store/filters';

export const Filters = () => {
	const filters = useSelector((state) => state.filters);
	const dispatch = useDispatch();

	function handleFilter(e, category) {
		console.log(e.target);
		const target = e.target;
		const checked = target.type === 'checkbox' ? target.checked : target.value;
		dispatch(changeFilter({ id: category.id, checked }));
	}

	return (
		<div className='filters'>
			{filters.map((category) => {
				return (
					<label key={category.id + ' - ' + category.name} htmlFor={category.name}>
						{category.description}
						<input
							onChange={(e) => handleFilter(e, category)}
							id={category.name}
							type='checkbox'
							name={category.name}
							// name='categories'
							checked={category.checked}
							value={category.id}
						/>
					</label>
				);
			})}
		</div>
	);
};
