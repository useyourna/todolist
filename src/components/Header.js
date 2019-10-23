import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = () => {
    return (
    <View>
        <Text style={styles.headertext}>TO DO APP</Text>
    </View>
    );
  };

    const styles = StyleSheet.create({
        headercontainer: {
            marginTop:70,
            marginBottom:40,
        },
        headertext: {
          fontSize: 26,
          fontWeight: 'bold',
          color: '#3f4e66',
        }
      });

export default Header;