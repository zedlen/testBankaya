import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/store';
import {loadDetail, clearData} from '../../store/pokemonDetailSlice';
import {Actions} from 'react-native-router-flux';
interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

interface Ability {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}
const Detail = (props: any) => {
  const {loading, data, loaded} = useSelector(
    (state: RootState) => state.pokemonDetail,
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!loaded) {
      dispatch(loadDetail(props.pokemon.name.toLowerCase()));
    }
  }, [dispatch, loaded, props.pokemon.name]);
  useEffect(() => {
    return () => {
      dispatch(clearData());
    };
  }, [dispatch]);
  const goBack = () => {
    Actions.pop();
  };
  return (
    <SafeAreaView style={style.safeArea}>
      <View style={style.main}>
        <View style={style.conatiner}>
          <View style={style.row}>
            <TouchableOpacity onPress={goBack} style={style.backContainer}>
              <Text style={style.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={style.name}>{props.pokemon.name}</Text>
          </View>
          {loading && <ActivityIndicator size="large" color="#FFCB05" />}
          {loaded && (
            <>
              <View style={style.row}>
                <Image
                  source={{uri: data.sprites.front_default}}
                  style={style.image}
                />
                <Image
                  source={{uri: data.sprites.back_default}}
                  style={style.image}
                />
              </View>
              <View style={style.row}>
                {data.types.map((type: any) => (
                  <View style={style.chip}>
                    <Text style={style.chipText}>{type.type.name}</Text>
                  </View>
                ))}
              </View>
              <ScrollView>
                <View>
                  <Text style={style.title}>Stats </Text>
                </View>
                {data.stats.map((stat: Stat) => (
                  <View style={{...style.row, ...style.statHolder}}>
                    <View style={style.statNameHolder}>
                      <Text style={style.statName}>{stat.stat.name}:</Text>
                    </View>
                    <View style={style.statValueHolder}>
                      <View
                        style={{
                          ...style.statValue,
                          width: (stat.base_stat * 100) / 200 + '%',
                        }}>
                        <Text style={style.statText}>{stat.base_stat}</Text>
                      </View>
                    </View>
                  </View>
                ))}
                <View>
                  <Text style={style.title}>Abilities </Text>
                </View>
                <View style={style.row}>
                  {data.abilities.map((abilitie: Ability) => (
                    <Text style={style.ability}>{abilitie.ability.name}</Text>
                  ))}
                </View>
              </ScrollView>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Detail;

const style = StyleSheet.create({
  main: {
    height: '100%',
  },
  conatiner: {
    backgroundColor: '#003A70',
    zIndex: 0,
    borderRadius: 25,
    paddingTop: 30,
    paddingBottom: 30,
    flex: 1,
  },
  safeArea: {
    backgroundColor: '#3D7DCA',
  },
  name: {
    textAlign: 'center',
    color: 'white',
    fontSize: 25,
    flex: 1,
  },
  backText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  backContainer: {
    padding: 10,
    position: 'absolute',
    left: 10,
    zIndex: 1,
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flexWrap: 'wrap',
  },
  image: {
    height: 150,
    width: 150,
  },
  chip: {
    width: 'auto',
    margin: 5,
    backgroundColor: '#FFCB05',
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  chipText: {
    fontSize: 15,
  },
  title: {
    marginTop: 15,
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
  },
  statHolder: {
    borderColor: '#afafaf',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  statNameHolder: {
    flex: 2,
    padding: 5,
  },
  statName: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
  },
  statValueHolder: {
    flex: 3,
    backgroundColor: '#3D7DCA',
    height: 15,
    marginRight: 5,
  },
  statValue: {
    backgroundColor: '#FFCB05',
    height: 15,
  },
  statText: {
    textAlign: 'right',
    paddingRight: 5,
  },
  ability: {
    color: 'white',
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
  },
});
