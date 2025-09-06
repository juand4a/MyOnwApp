import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput,Alert  } from 'react-native';
import db from '../services/db';
import styles from './styles/Register';
import { Image } from 'expo-image';
const imageSource = require('./../assets/camaro.jpg');

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const handleLoginUser = async () => {
    try {
        await db.getUserByCredentials( email, password);
        Alert.alert('Éxito', '¡Usuario Ingresa correctamente!'); 
        setEmail('');
        setPassword('');
        navigation.navigate('Main');
    } catch (err) {
        console.error('Error al Ingresar usuario:', err); 
        Alert.alert('Error', 'No se pudo Ingresar el usuario. Intente de nuevo.');
    }
};
    return (
        <View style={styles.content}>
            <View style={styles.contentIMG}>
                <Image
                    style={styles.image}
                    source={imageSource}
                    transition={1000}
                />
            </View>
            <View style={styles.contentForm}>

            
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                />
                
            </View>
            <View style={styles.contentBtn}>
                <TouchableOpacity onPress={handleLoginUser} style={styles.btnR}>
                    <Text style={styles.btnTextR}>Log In</Text>
                </TouchableOpacity>
    
            </View>

        </View>
    );
};

export default LoginScreen;
