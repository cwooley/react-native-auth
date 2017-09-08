import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import firebase from 'firebase';
import LoginForm from './components/LoginForm'

export default class App extends Component {

  state = {
    loggedIn: null
  }

  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyB2nBo0N7iI5M7-sl41Cocbsu4iSTclynM",
      authDomain: "auth-6482c.firebaseapp.com",
      databaseURL: "https://auth-6482c.firebaseio.com",
      projectId: "auth-6482c",
      storageBucket: "auth-6482c.appspot.com",
      messagingSenderId: "210446694938"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user){
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

logoutPressed = () => {
  firebase.auth().signOut()
}


renderContent(){
  switch (this.state.loggedIn) {
    case true:
       return( <Button onPress={this.logoutPressed}> Log Out </Button> );
    case false:
       return <LoginForm />;
    default:
      return <Spinner size="large" />;
  }

}
  render(){
    return (
      <View>
        <Header text="Authentication" />
        {this.renderContent()}
      </View>
    )
  }
}
