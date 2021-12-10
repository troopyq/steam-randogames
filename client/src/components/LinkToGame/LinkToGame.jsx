import React from 'react';

export const LinkToGame = ({ appid, className = '', children }) => {
	return (
		<a className={className} target='_blank' href={`https://store.steampowered.com/app/${appid}`}>
			{children}
		</a>
	);
};
