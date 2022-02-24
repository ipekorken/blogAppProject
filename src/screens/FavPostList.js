import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts, setSearchedPosts} from '../@redux/app/action';
import Header from '../components/Header';
import {baseUrl} from '../helpers/baseUrl';
import axios from 'axios';

const FavPostList = ({navigation}) => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.app.posts);
  const userToken = useSelector(state => state.app.userToken);
  const favList = posts.filter(post => post.isFavorite == true);

  const backProfile = () => {
    navigation.navigate('Profile');
  };

  const removeFav = id => {
    var data = JSON.stringify({
      isFavorite: false,
    });
    var config = {
      method: 'patch',
      url: `${baseUrl}:3000/api/posts/doFavorite/${id}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));

        var config = {
          method: 'get',
          url: `${baseUrl}:3000/api/posts`,
          headers: {},
        };

        axios(config)
          .then(function (response) {
            //console.log(JSON.stringify(response.data));
            dispatch(setPosts(response.data.data));
            dispatch(setSearchedPosts(response.data.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const renderItem = itemData => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={{uri: itemData.item.image}}
          />
        </View>
        <View
          style={{
            width: 150,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{itemData.item.title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            removeFav(itemData.item._id);
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {!true ? (
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/emptyFav.png')}
              />
            ) : (
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/fullFav.png')}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.favListScreen}>
      <Header screenTitle="Favorites" />
      <View style={styles.flatView}>
        <FlatList
          data={favList}
          keyExtractor={(item, index) => item._id}
          renderItem={renderItem}
        />
      </View>
      <TouchableOpacity onPress={backProfile} style={styles.btnTouch}>
        <Text style={styles.btnTxt}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FavPostList;

const styles = StyleSheet.create({
  favListScreen: {},
  flatView: {
    height: 480,
  },
  btnTouch: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 20,
  },
});
