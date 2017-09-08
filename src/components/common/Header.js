import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Header extends Component {


  render() {
    const { textStyle, viewStyle } = styles;
    return (
      <View style={viewStyle}>
        <Text style={textStyle} >{this.props.text}</Text>
      </View>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 20

  },

   viewStyle: {
     backgroundColor: '#f8f8f8',
     justifyContent: 'center',
     alignItems: 'center',
     height: 60,
     paddingTop: 15,
     shadowColor: '#000',
     shadowOffset: { width: 0, height: 1.5 },
     shadowOpacity: 0.2
   }
};

export { Header }
