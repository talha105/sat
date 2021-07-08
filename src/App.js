import React, { Component } from 'react';
import { View } from 'react-native';
import {connect, Provider} from "react-redux"
import store from "./store/index";
import Routes from "./routes"
import SplashScreen from 'react-native-splash-screen';


class App extends Component{

  componentDidMount() {
    // do stuff while splash screen is shown
      // After having done stuff (such as async tasks) hide the splash screen
      SplashScreen.hide();
  }
  
  render(){
    return (
      <Provider store={store}>
        <Routes/>
      </Provider>
    );
  }
}


export default App;