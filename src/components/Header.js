import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({screenTitle, navigation}) => {
  return (
    <View style={styles.headerScreen}>
      <View style={styles.titleView}>
        <Text style={styles.titleTxt}>{screenTitle}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerScreen: {
    alignItems: 'center',
    marginTop: 20,
  },
  titleView: {},
  titleTxt: {
    color: 'black',
    fontSize: 40,
  },
});
