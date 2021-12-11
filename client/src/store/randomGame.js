import { createSlice } from '@reduxjs/toolkit';

export const randomGame = createSlice({
	name: 'randomGame',
	initialState: {
		game: {},
	},
	reducers: {
		setGame: (state, action) => {
			state.game = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setGame } = randomGame.actions;

export default randomGame.reducer;
