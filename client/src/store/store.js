import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from './filters';
import randomGame from './randomGame';

export default configureStore({
	reducer: {
		filters: filtersReducer,
		randomGame: randomGame,
	},
});
