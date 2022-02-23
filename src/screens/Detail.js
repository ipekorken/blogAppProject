import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Detail = ({navigation, route}) => {
  const {id, title, desc, img} = route.params;
  return (
    <View style={styles.detailScreen}>
      <View style={styles.titleView}>
        <Text style={styles.titleTxt}>{title}</Text>
      </View>
      <View style={styles.imgView}>
        <Image style={styles.img} source={{uri: img}} />
      </View>
      <View style={styles.descView}>
        <Text style={styles.descTxt}>{desc}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.pop()}
        style={{alignItems: 'center'}}>
        <View style={styles.btnView}>
          <Text style={styles.btnTxt}>Geri</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  detailScreen: {
    margin: 20,
  },
  titleView: {
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 30,
    color: 'black',
  },
  imgView: {
    alignItems: 'center',
    marginTop: 10,
  },
  img: {
    width: 300,
    height: 200,
  },
  descView: {
    marginTop: 20,
    height: 300,
  },
  descTxt: {
    fontSize: 16,
  },
  btnView: {
    backgroundColor: 'black',
    width: 80,
    alignItems: 'center',
    borderRadius: 20,
    height: 30,
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: 14,
    color: 'white',
  },
});
