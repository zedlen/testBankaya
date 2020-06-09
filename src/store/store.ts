import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import pokemonReducer from './pokemonSlice';
import pokemonDetailReducer from './pokemonDetailSlice';

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    pokemonDetail: pokemonDetailReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
