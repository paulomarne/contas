import React, { Component}  from "react";
import {View, Text, StyleSheet} from 'react-native';

class Detalhe extends Component{
    render(){
      return(
        <View style={styles.celula}>
          <Text style={styles.layoutConta}> {this.props.data.id}  -  {this.props.data.nomeDaConta}  </Text>
        </View>
      );
    }
  }

const styles = StyleSheet.create({
    celula:{
        backgroundColor: '#FFF',
        height: 56,
        width: 356,
        marginBottom: 10
    },
    layoutConta:{
        color: '#111',
        fontSize: 20,
    },
});

export default Detalhe;