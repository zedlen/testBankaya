import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk} from './store';
import {AxiosService} from '../services/api';
import {union} from 'lodash';
import {Alert} from 'react-native';

export interface PokemonListItemInterface {
  name: string;
  url: string;
  image: string;
}

interface PokemonListInterface {
  items: Array<PokemonListItemInterface>;
  before?: string;
  after?: string;
  page: number;
  loading: boolean;
  loaded: boolean;
  total: number;
  error: boolean;
  errorMsg?: string;
}

const initialState: PokemonListInterface = {
  items: [],
  page: 1,
  loading: true,
  loaded: false,
  total: 0,
  error: false,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setList: (
      state,
      action: PayloadAction<Array<PokemonListItemInterface>>,
    ) => {
      state.items = union(state.items, action.payload);
      state.loaded = true;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page += action.payload;
    },
    setBefore: (state, action: PayloadAction<string>) => {
      state.before = action.payload;
    },
    setAfter: (state, action: PayloadAction<string>) => {
      state.after = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    setError: (state, action: PayloadAction<boolean>) => {
      state.error = action.payload;
    },
    setErrorMsg: (state, action: PayloadAction<string>) => {
      state.errorMsg = action.payload;
    },
  },
});

export const {
  setList,
  setPage,
  setBefore,
  setAfter,
  setLoading,
  setTotal,
  setError,
  setErrorMsg,
} = pokemonSlice.actions;

export const loadList = (
  url: string = '/api/v2/pokemon/',
): AppThunk => dispatch => {
  dispatch(setLoading(true));
  dispatch(setError(false));
  dispatch(setErrorMsg(''));
  if (url.includes('?')) {
    const auxUrl = url.split('?');
    const params = auxUrl[1].split('&');
    url = auxUrl[0] + '?';
    for (let index = 0; index < params.length; index++) {
      const element = params[index];
      if (element.includes('limit')) {
        url += 'limit=20&';
      } else {
        url += element + '&';
      }
    }
  }
  console.log('load list called', url);
  AxiosService.get(url)
    .then((pokeResponse: any) => {
      if (pokeResponse.status === 200) {
        dispatch(setAfter(pokeResponse.data.next));
        dispatch(setBefore(pokeResponse.data.previous));
        dispatch(setTotal(pokeResponse.data.count));
        dispatch(
          setList(
            pokeResponse.data.results.map((pokemon: any) => {
              return {
                name: pokemon.name[0].toUpperCase() + pokemon.name.slice(1),
                url: pokemon.url,
                image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split('/')[pokemon.url.split('/').length - 2]
                }.png`,
              };
            }),
          ),
        );
      } else {
        dispatch(setError(true));
        dispatch(setErrorMsg('Error while getting pokemon list'));
      }
      dispatch(setLoading(false));
    })
    .catch(() => {
      Alert.alert('Error while getting pokemon list');
      dispatch(setError(true));
      dispatch(setErrorMsg('Error while getting pokemon list'));
      dispatch(setLoading(false));
    });
};

export default pokemonSlice.reducer;
