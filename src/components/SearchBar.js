import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setSearchedPosts} from '../@redux/app/action';

const SearchBar = () => {
  const dispatch = useDispatch();
  const posts = useSelector(state => state.app.posts);
  const [search, setSearch] = useState('');

  const goSearch = text => {
    if (text) {
      const newData = posts.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setSearch(text);
      dispatch(setSearchedPosts(newData));
    } else {
      setSearch(text);
      dispatch(setSearchedPosts(posts));
    }
  };
  return (
    <View style={styles.barScreen}>
      <View style={styles.barContainer}>
        <View style={styles.barInputView}>
          <TextInput
            style={styles.barInputTxt}
            placeholder="Arama yapın..."
            value={search}
            onChangeText={text => goSearch(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  barScreen: {
    marginTop: 20,
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
  },
  barInputView: {
    borderWidth: 1,
    width: 180,
    height: 40,
  },
  barInputTxt: {
    color: 'black',
    padding: 10,
  },
});
