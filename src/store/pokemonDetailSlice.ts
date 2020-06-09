import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';
import {AxiosService} from '../services/api';
import {Alert} from 'react-native';

export interface PokemonDetail {
  loading: boolean;
  data: any;
  loaded: boolean;
}

const initialState: PokemonDetail = {
  loading: true,
  data: {},
  loaded: false,
};

export const pokemonDetailSlice = createSlice({
  name: 'pokemonDetail',
  initialState,
  reducers: {
    setLoadingDetail: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setLoadedDetail: (state, action: PayloadAction<boolean>) => {
      state.loaded = action.payload;
    },
    setData: (state, action: PayloadAction<object>) => {
      state.data = action.payload;
    },
  },
});

export const {
  setLoadingDetail,
  setData,
  setLoadedDetail,
} = pokemonDetailSlice.actions;

export const loadDetail = (name: string): AppThunk => dispatch => {
  dispatch(setLoadingDetail(true));
  console.log('cargando ' + name);
  AxiosService.get('api/v2/pokemon/' + name)
    .then((pokeResponse: any) => {
      if (pokeResponse.status === 200) {
        dispatch(setData(pokeResponse.data));
      }
      dispatch(setLoadingDetail(false));
      dispatch(setLoadedDetail(true));
    })
    .catch(() => {
      console.log('error');
      Alert.alert('Error while loading pokemon detail');
      dispatch(setLoadingDetail(false));
    });
};

export const clearData = (): AppThunk => dispatch => {
  dispatch(setLoadingDetail(true));
  dispatch(setLoadedDetail(false));
  dispatch(setData({}));
};

export default pokemonDetailSlice.reducer;
