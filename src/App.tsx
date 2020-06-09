import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Router,
  Stack,
  Scene,
  Lightbox,
  Modal,
  Overlay,
} from 'react-native-router-flux';
import {Home, Detail} from './pages';
import {StackViewStyleInterpolator} from 'react-navigation-stack';
import {store} from './store/store';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';

const transitionConfig = () => ({
  screenInterpolator: StackViewStyleInterpolator.forFadeFromBottomAndroid,
});

const App: () => React.ReactElement = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <Router sceneStyle={styles.scene}>
          <Overlay key="overlay">
            <Modal key="modal" hideNavBar transitionConfig={transitionConfig}>
              <Lightbox key="lightbox">
                <Stack hideNavBar key="root">
                  <Scene key="home" initial component={Home} title="Home" />
                  <Scene key="detail" component={Detail} title="Detail" />
                </Stack>
              </Lightbox>
            </Modal>
          </Overlay>
        </Router>
      </Provider>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scene: {
    backgroundColor: '#F5FCFF',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

export default App;
