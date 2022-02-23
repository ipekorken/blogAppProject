import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Card from '../components/Card';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import {useDispatch, useSelector} from 'react-redux';
import {setPosts, setSearchedPosts} from '../@redux/app/action';
import {baseUrl} from '../helpers/baseUrl';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const searchedPosts = useSelector(state => state.app.searchedPosts);

  const getPosts = () => {
    var axios = require('axios');
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
  };
  useEffect(() => {
    getPosts();
  }, []);

  const renderItem = itemData => {
    return (
      <Card
        id={itemData.item._id}
        title={itemData.item.title}
        desc={itemData.item.description}
        img={itemData.item.image}
        goDetail={() => {
          navigation.navigate('Detail', {
            id: itemData.item._id,
            title: itemData.item.title,
            desc: itemData.item.description,
            img: itemData.item.image,
          });
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.homeScreen}>
      <TouchableOpacity>
        <View
          style={{
            width: 60,
            height: 60,
            position: 'absolute',
            alignSelf: 'flex-end',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: 50,
              height: 45,
            }}
            source={require('../assets/profile.png')}
          />
        </View>
      </TouchableOpacity>
      <Header screenTitle="Blog Sayfası" />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <SearchBar />
        <TouchableOpacity
          style={{marginLeft: 10, marginTop: 18, alignItems: 'center'}}
          onPress={() => navigation.navigate('NewPost')}>
          <Image
            style={{width: 30, height: 30}}
            source={require('../assets/add.png')}
          />
          <Text style={{color: 'black'}}>New Post</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.flatView}>
        <FlatList
          data={searchedPosts}
          keyExtractor={(item, index) => item._id}
          renderItem={renderItem}
          numColumns={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeScreen: {
    flex: 1,
  },
  flatView: {
    alignItems: 'center',
    marginTop: 20,
    height: 500,
  },
});
