import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import styles from './styles/Home';
import { Image } from 'expo-image';
const imageSource = require('./../assets/camaro.jpg');

const HomeScreen = ({ navigation }) => {



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to your OWNAPP</Text>
      <Text style={styles.title}>Because the Camaro it's the important</Text>
      <View style={styles.contentIMG}>
        <Image
          style={styles.image}
          source={imageSource}
          transition={1000}
        />
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.btn}>
        <Text style={styles.btnText}>Ingresar</Text>

      </TouchableOpacity>

    </View>

  );
};

export default HomeScreen;
