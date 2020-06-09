import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const Header = () => {
  return (
    <View style={style.container}>
      <Image
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/1280px-International_Pok%C3%A9mon_logo.svg.png',
        }}
        style={style.image}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    backgroundColor: '#3D7DCA',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    marginTop: 20,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
