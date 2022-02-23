import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setPosts, setSearchedPosts} from '../@redux/app/action';
import {baseUrl} from '../helpers/baseUrl';

const NewPost = ({navigation}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');

  const savePost = () => {
    var data = JSON.stringify({
      title: title,
      description: desc,
      image: 'https://picsum.photos/200/300',
    });

    var config = {
      method: 'post',
      url: `${baseUrl}:3000/api/posts/sendPost`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setTimeout(() => {
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
        }, 500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.postScreen}>
      <TouchableOpacity onPress={() => navigation.pop()}>
        <View
          style={{
            margin: 5,
            width: 60,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 15,
          }}>
          <Image
            style={{width: 30, height: 20}}
            source={require('../assets/back.png')}
          />
        </View>
      </TouchableOpacity>
      <View style={{alignItems: 'center', marginTop: 25}}>
        <Text style={{fontSize: 18, color: 'black'}}>Add A New Post</Text>
      </View>
      <View style={{marginHorizontal: 30}}>
        <View style={{borderWidth: 1, height: 50, marginTop: 20}}>
          <TextInput
            placeholder="Title"
            style={{backgroundColor: 'white', padding: 10, fontSize: 16}}
            onChangeText={text => setTitle(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            height: 250,
            backgroundColor: 'white',
            marginTop: 12,
          }}>
          <TextInput
            placeholder="Description"
            style={{backgroundColor: 'white', padding: 10, fontSize: 16}}
            onChangeText={text => setDesc(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                backgroundColor: 'white',
                width: 150,
                height: 50,
                justifyContent: 'center',
              }}>
              <View>
                <Image
                  source={require('../assets/image.png')}
                  style={{width: 30, height: 30}}
                />
              </View>
              <View>
                <Text style={{color: 'black', fontSize: 14, marginLeft: 5}}>
                  Upload Image
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={savePost}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                backgroundColor: 'white',
                width: 150,
                height: 50,
                justifyContent: 'center',
              }}>
              <View>
                <Image
                  source={require('../assets/save.png')}
                  style={{width: 22, height: 22}}
                />
              </View>
              <View>
                <Text style={{color: 'black', fontSize: 14, marginLeft: 5}}>
                  Save Post
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  postScreen: {},
});
