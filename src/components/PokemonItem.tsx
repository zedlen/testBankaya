import React from 'react';
import {PokemonListItemInterface} from '../store/pokemonSlice';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Actions} from 'react-native-router-flux';

export const PokemonItem = (props: PokemonListItemInterface) => {
  const goDetail = () => {
    Actions.detail({pokemon: props});
  };
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.card} onPress={goDetail}>
        <Image source={{uri: props.image}} style={style.image} />
        <Text>{props.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '50%',
    display: 'flex',
    backgroundColor: 'transparent',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
  card: {
    margin: 5,
    padding: 20,
    backgroundColor: 'white',
    borderColor: '#afafaf',
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
});
