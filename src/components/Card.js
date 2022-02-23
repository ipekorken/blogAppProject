import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Card = ({id, title, desc, img, goDetail}) => {
  return (
    <View style={styles.cardScreen}>
      <View style={styles.cardContainer}>
        <View style={styles.cardImgView}>
          <Image source={{uri: img}} style={styles.cardImg} />
        </View>
        <View style={styles.cardTitleView}>
          <Text style={styles.cardTitle}>{title}</Text>
        </View>
        <View style={styles.cardDescView}>
          <Text style={styles.cardDesc}>{desc?.substring(0, 25)}</Text>
          <TouchableOpacity style={styles.cardNextTouch} onPress={goDetail}>
            <Text style={styles.cardNextTxt}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  cardScreen: {},
  cardContainer: {
    backgroundColor: 'lightgrey',
    margin: 10,
    height: 200,
  },
  cardImgView: {
    alignItems: 'center',
  },
  cardImg: {
    width: 150,
    height: 100,
  },
  cardTitleView: {
    marginTop: 8,
    width: 150,
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  cardDescView: {
    flexDirection: 'row',
    width: 100,
    marginTop: 5,
    padding: 5,
    alignItems: 'center',
  },
  cardDesc: {
    width: 100,
  },
  cardNextTouch: {
    width: 50,
  },
  cardNextTxt: {
    color: 'blue',
    width: 30,
    alignSelf: 'center',
  },
});
