import { React, useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, FlatList,Modal } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { height } from '@fortawesome/free-solid-svg-icons/faMugSaucer';
const HomeScreen = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [datas,setData]=useState({});
  const [TvList,setTv]=useState({});
  const [MovieList,setMovie]=useState({});
  const [userData,setUser]=useState({});
  useEffect(() => {
           
    axios.get('http://10.45.17.175:9000/api/v1/info')
  .then(function (response) {

setData(response.data.data.allInfo);

console.log(response.data)
  })
  .catch(function (error) {
    console.log(error);
  });

// Retrieve the user data from AsyncStorage
const retrieveUserData = async () => {
  try {
    const Data = await AsyncStorage.getItem('userData');
    if (Data !== null) {
      const parsedUserData = JSON.parse(Data);
      setUser(parsedUserData);
      console.log('Retrieved user data: ', Data);
      // You can use the user data as needed
    } else {
      console.log('No user data found');
    }
  } catch (error) {
    console.error('Error retrieving user data: ', error);
  }
};

retrieveUserData();

  const timer = setInterval(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({
        animated: true,
        index: (currentIndex + 1) % bannerData.length,
      });
    }
  }, 3000);

  return () => {
    clearInterval(timer);
  };
  },[]);
  const handleLogout = () => {
    navigation.navigate('Login',);
  };

  const bannerData = [
    { id: 1, image: require('../imagePoster/local/banner1.png') },
    { id: 2, image: require('../imagePoster/local/banner2.png') },
    { id: 3, image: require('../imagePoster/local/banner3.png') },
    // Add more banner items as needed
  ];
  const movies = [
    {
      id: 1,
      title: 'Movie 1',
      genre: 'Action',
      poster: require('../imagePoster/ironman.png')
    },
    {
      id: 2,
      title: 'Movie 2',
      genre: 'Comedy',
      poster: require('../imagePoster/ironman.png'),
    },
    {
      id: 3,
      title: 'Movie 3',
      genre: 'Drama',
      poster: require('../imagePoster/ironman.png'),
    },
    // Add more movies as needed
  ];

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
 

  const handleMoviePress = (movie) => {
    navigation.navigate('MovieDetail', { movie });
  };
  const renderBannerItem = ({ item }) => {
    return (
      <View style={styles.bannerItem}>
        <Image source={item.image} style={styles.bannerImage} />
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={require('../imagePoster/local/logo.png')} style={styles.logo} />
      <TouchableOpacity style={styles.set} onPress={() => setModalVisible(!modalVisible)}>
        <Text style={{width:100 ,height:50}}>{userData.username}  
       
        </Text>
      </TouchableOpacity> 
      <Image style={styles.logo} source={{uri:userData.avatar}}/>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.logoutButton} >
              <Text style={styles.logoutButtonText}>setting1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton}>
              <Text style={styles.logoutButtonText}>setting1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} >
              <Text style={styles.logoutButtonText}>setting1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} >
              <Text style={styles.logoutButtonText}>setting1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} >
              <Text style={styles.logoutButtonText}>setting1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} >
              <Text style={styles.logoutButtonText}>setting1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <FlatList
        ref={flatListRef}
        data={bannerData}
        renderItem={renderBannerItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={true}
        pagingEnabled
        onMomentumScrollEnd={(event) => {
          const contentOffset = event.nativeEvent.contentOffset;
          const viewSize = event.nativeEvent.layoutMeasurement;
          setCurrentIndex(Math.floor(contentOffset.x / viewSize.width));
        }}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.sectionTitle}>Popular Movies</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
         
          { datas.length > 0 ? ( datas.map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieContainer}
              onPress={() => handleMoviePress(movie)}
            >
              <Image source={{uri:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'+movie.filmInfo.backdrop_path}} style={styles.poster} />
              <View style={styles.movieDetails}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.genre}>{movie.genre}</Text>
              </View>
            </TouchableOpacity>
          ))):(<Text>loadding</Text>)}
        </ScrollView>

        {/* Add more sections as needed */}
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TV Show</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        { datas.length > 0 ? ( datas.filter((x)=>x.filmType==="TV").map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieContainer}
              onPress={() => handleMoviePress(movie)}
            >
              <Image source={{uri:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'+movie.filmInfo.backdrop_path}} style={styles.poster} />
              <View style={styles.movieDetails}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.genre}>{movie.genre}</Text>
              </View>
            </TouchableOpacity>
          ))):(<Text>loadding</Text>)}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Movie</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        { datas.length > 0 ? ( datas.filter((x)=>x.filmType==="Movie").map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieContainer}
              onPress={() => handleMoviePress(movie)}
            >
              <Image source={{uri:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'+movie.filmInfo.backdrop_path}} style={styles.poster} />
              <View style={styles.movieDetails}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.genre}>{movie.genre}</Text>
              </View>
            </TouchableOpacity>
          ))):(<Text>loadding</Text>)}
        </ScrollView>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>continue Watching</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        { datas.length > 0 ? ( datas.filter((x)=>x.filmType==="TV").map((movie) => (
            <TouchableOpacity
              key={movie.id}
              style={styles.movieContainer}
              onPress={() => handleMoviePress(movie)}
            >
              <Image source={{uri:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/'+movie.filmInfo.backdrop_path}} style={styles.poster} />
              <View style={styles.movieDetails}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.genre}>{movie.genre}</Text>
              </View>
            </TouchableOpacity>
          ))):(<Text>loadding</Text>)}
        </ScrollView>
      </View>
      <View style={styles.navigationBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Browse</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Search</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navButtonText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',

    backgroundColor: '#000',
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  banner: {
    height: 200,


    backgroundColor: '#FFFFFF'
  },
  bannerImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  movieContainer: {
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  movieDetails: {
    marginTop: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  genre: {
    fontSize: 14,
    color: '#fff',
  }, modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#ff6f00',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  set: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: '#ff6f00',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    display:'flex',
    

  },
});

export default HomeScreen;
