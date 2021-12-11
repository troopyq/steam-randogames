import { createSlice } from '@reduxjs/toolkit';

export const filters = createSlice({
	name: 'filters',
	initialState: [
		{ id: 1, description: 'Для нескольких игроков', name: 'multiple_players' },
		{ id: 2, description: 'Для одного игрока', name: 'once_player' },
		{ id: 9, description: 'Кооперативная игра', name: 'coop' },
		{ id: 36, description: 'Против игроков (по сети)', name: 'online' },
		{ id: 37, description: 'Против игроков (общий экран)', name: 'screen' },
		{ id: 49, description: 'Против игроков', name: 'battle' },
	],
	reducers: {
		changeFilter: (state, action) => {
			const id = action.payload.id;
			const category = state.find((cat) => cat.id === id);
			category.checked = action.payload.checked;
		},
	},
});

// Action creators are generated for each case reducer function
export const { changeFilter } = filters.actions;

export default filters.reducer;
