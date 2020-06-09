import React, {useEffect} from 'react';
import {
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {loadList} from '../../store/pokemonSlice';
import {PokemonItem, Header} from '../../components';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = () => {
  const {items, loaded, after, loading, error, errorMsg} = useSelector(
    (state: RootState) => state.pokemon,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) {
      dispatch(loadList());
    }
  }, [dispatch, loaded]);
  const endReached = () => {
    dispatch(loadList(after));
  };
  const pressButton = () => {
    //console.log('pressed');
  };
  const reloadData = () => {
    dispatch(loadList());
  };
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.main}>
        <Header />
        <View style={style.conatiner}>
          {error && (
            <View style={style.error}>
              <Text style={style.errorMsg}> {errorMsg}</Text>
              <Button title="Retry" onPress={reloadData}/>
            </View>
          )}
          <FlatList
            data={items}
            numColumns={2}
            horizontal={false}
            renderItem={({item}) => <PokemonItem {...item} />}
            keyExtractor={item => item.url}
            onEndReached={endReached}
            onEndReachedThreshold={0.5}
          />
        </View>
        {loading && (
          <ActivityIndicator
            size="large"
            color="#FFCB05"
            style={style.loader}
          />
        )}
      </View>
      {/*<TouchableOpacity style={style.button} onPress={pressButton}>
        <Icon name="filter" size={30} color="#003A70" />
      </TouchableOpacity>*/}
    </SafeAreaView>
  );
};

export default Home;

const style = StyleSheet.create({
  main: {
    height: '100%',
  },
  conatiner: {
    backgroundColor: '#003A70',
    zIndex: 0,
    borderRadius: 25,
    paddingTop: 30,
    paddingBottom: 5,
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#3D7DCA',
  },
  loader: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
  },
  button: {
    position: 'absolute',
    top: 210,
    right: 10,
    zIndex: 1,
    backgroundColor: '#FFCB05',
    height: 50,
    width: 50,
    borderRadius: 25,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  errorMsg: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});
