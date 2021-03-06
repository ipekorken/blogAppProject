import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts, setSearchedPosts, setPostInfo} from '../@redux/app/action';
import {baseUrl} from '../helpers/baseUrl';
import axios from 'axios';

const Detail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {id} = route.params;
  const postInfo = useSelector(state => state.app.postInfo);
  const userInfo = useSelector(state => state.app.userInfo);
  const userToken = useSelector(state => state.app.userToken);
  const [favorites, setFavorites] = useState([]);

  const getFavorites = () => {
    var config = {
      method: 'get',
      url: `${baseUrl}:3000/api/favorites`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        setFavorites(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPostInfo();
    getFavorites();
  }, []);

  const getPostInfo = () => {
    var config = {
      method: 'get',
      url: `${baseUrl}:3000/api/posts/${id}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
        dispatch(setPostInfo(response.data[0]));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const doFavorite = () => {
    var data = JSON.stringify({
      user_Id: userInfo._id,
      post_Id: postInfo._id,
      isFavorite: !favorites.isFavorite,
    });

    var config = {
      method: 'post',
      url: `${baseUrl}:3000/api/favorites/doFavorite`,
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        //console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const deletePost = () => {
    Alert.alert(
      'Postu silmek istedi??inizden emin misiniz?',
      'Bu i??lem geri al??namaz!',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            var config = {
              method: 'delete',
              url: `${baseUrl}:3000/api/posts/${id}`,
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            };

            axios(config)
              .then(function (response) {
                //console.log(JSON.stringify(response.data));
                setTimeout(() => {
                  Alert.alert('', 'Post silindi.', [
                    {
                      text: 'OK',
                      onPress: () => {
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
                        setTimeout(() => {
                          navigation.navigate('Home');
                        }, 1000);
                      },
                    },
                  ]);
                }, 500);
              })
              .catch(function (error) {
                console.log(error);
              });
          },
        },
      ],
    );
  };

  return (
    <View style={styles.detailScreen}>
      <View style={styles.titleView}>
        <Text style={styles.titleTxt}>{postInfo.title}</Text>
      </View>
      <TouchableOpacity onPress={doFavorite}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              position: 'absolute',
              alignSelf: 'flex-end',
              width: 50,
              height: 60,
            }}>
            {favorites.map(item => item.post_Id.includes(postInfo._id)) ? (
              <Image
                style={{width: 22, height: 20}}
                source={require('../assets/fullFav.png')}
              />
            ) : (
              <Image
                style={{width: 22, height: 20}}
                source={require('../assets/emptyFav.png')}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
      <View style={styles.imgView}>
        <Image style={styles.img} source={{uri: postInfo?.image}} />
      </View>
      <ScrollView>
        <View style={styles.descView}>
          <Text style={styles.descTxt}>{postInfo?.description}</Text>
        </View>
      </ScrollView>
      {userInfo?.isAdmin == true ? (
        <TouchableOpacity onPress={deletePost} style={{alignItems: 'center'}}>
          <View style={styles.btnView}>
            <Text style={styles.btnTxt}>Sil</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <></>
      )}
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
    height: 260,
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
    marginTop: 5,
  },
  btnTxt: {
    fontSize: 14,
    color: 'white',
  },
});
