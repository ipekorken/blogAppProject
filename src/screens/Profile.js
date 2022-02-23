import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setUsers} from '../@redux/app/action';
import {baseUrl} from '../helpers/baseUrl';

const Profile = ({navigation}) => {
  const userInfo = useSelector(state => state.app.userInfo);
  const userToken = useSelector(state => state.app.userToken);
  const dispatch = useDispatch();

  function goHome() {
    var config = {
      method: 'get',
      url: `${baseUrl}:3000/api/users`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        dispatch(setUsers(response.data.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    setTimeout(() => {
      navigation.navigate('Home');
    }, 300);
  }
  function goUpdate() {
    navigation.navigate('Update');
  }
  function deleteAccount() {
    Alert.alert(
      'Hesabınızı silmek istediğinizden emin misiniz?',
      'Bu işlem geri alınamaz!',
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
              url: `${baseUrl}:3000/api/users/deleteOwnAccount`,
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            };

            axios(config)
              .then(function (response) {
                //console.log(JSON.stringify(response.data));
                setTimeout(() => {
                  Alert.alert('', 'Hesabınız silindi.', [
                    {
                      text: 'OK',
                      onPress: () => {
                        setTimeout(() => {
                          navigation.navigate('Login');
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
  }
  function logout() {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle}>Profile Screen</Text>
      <View style={styles.infoContainer}>
        <View style={styles.infoView}>
          <Text style={styles.infoTitle}>Name: </Text>
          <Text style={styles.info}>{userInfo.name}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoTitle}>Surname: </Text>
          <Text style={styles.info}>{userInfo.surname}</Text>
        </View>
        <View style={styles.infoView}>
          <Text style={styles.infoTitle}>Email: </Text>
          <Text style={styles.info}>{userInfo.email}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={goUpdate} style={styles.btnTouch}>
        <View style={styles.edit}>
          <Text style={styles.btnTxt}>Edit</Text>
          <Image
            style={styles.pencilIcon}
            source={require('../assets/pencil.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={deleteAccount} style={styles.btnTouch}>
        <View style={styles.edit}>
          <Text style={styles.btnTxt}>Delete Account</Text>
          <Image
            style={styles.deleteIcon}
            source={require('../assets/delete.png')}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={goHome} style={styles.btnTouch}>
        <Text style={styles.btnTxt}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout} style={styles.btnTouch}>
        <Text style={styles.btnTxt}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
  screenTitle: {
    fontSize: 30,
  },
  btnTouch: {
    marginTop: 10,
  },
  btnTxt: {
    fontSize: 20,
  },
  infoContainer: {
    marginTop: 20,
    backgroundColor: 'lightgrey',
    width: 300,
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginBottom: 20,
  },
  infoView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  info: {
    fontSize: 16,
  },
  pencilIcon: {
    height: 18,
    width: 18,
    marginLeft: 8,
  },
  deleteIcon: {
    height: 20,
    width: 20,
    marginLeft: 6,
  },
  edit: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainer: {},
  inputView: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginTop: 10,
    width: 250,
    height: 80,
    justifyContent: 'center',
    borderWidth: 1,
  },
  input: {
    color: 'black',
    fontSize: 20,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  modalScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EBEBEB',
  },
});
