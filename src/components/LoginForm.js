import React, { Component } from 'react';
import { Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import firebase from 'firebase';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  };

  renderButton(){
    if (this.state.loading){
      return <Spinner size='small' />
    }
    return <Button onPress={this.onButtonPress} >Log In</Button>
  }

  usernameChanged = (username) => {
    this.setState({ username });
  }

  emailChanged = (email) => {
    this.setState({ email });
  }

  passwordChanged = (password) => {
    this.setState({ password });
  }

  onLoginSuccess = () => {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    })
  }

  onLoginFail = () => {
    this.setState({ error: 'Authentication Failed', loading: false})
  }

  onButtonPress = () => {
    this.setState({error: '', loading: true})

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
    .then(this.onLoginSuccess)
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(this.onLoginSuccess)
      .catch(this.onLoginFail)
    });


    // // For auth testing my app IT WORKS!!!
    // let data = JSON.stringify(this.state)
    // let headers = new Headers
    // headers.set("Content-Type", "application/json")
    // let url = 'http://localhost:3000/api/v1/login'
    // let config = {
    //   method: 'POST',
    //   body: data,
    //   headers, headers
    // }
    // let request = fetch( url, config)
    // .then(resp => resp.json()).then((data)=> this.setState({error: data[0].jwt}))

  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input onChangeText={this.emailChanged} placeholder="user@gmail.com" value={this.state.email} label="Email"/>
        </CardSection>

        <CardSection>
          <Input onChangeText={this.passwordChanged} secureTextEntry={true} placeholder="password" value={this.state.password} label="Password"/>
        </CardSection>
        <Text style={styles.errorTextStyle}>{this.state.error}</Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}
export default LoginForm
