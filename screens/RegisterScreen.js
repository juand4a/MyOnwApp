import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import db from '../services/db';
import styles from './styles/Register';
import { Image } from 'expo-image';
const imageSource = require('./../assets/camaro.jpg');

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [salary, setSalary] = useState('');
    const handleAddUser = async () => {
        try {
            await db.insertUser(name, email, password, salary);
            Alert.alert('Éxito', '¡Usuario registrado correctamente!'); // Agrega un mensaje de éxito
            setName('');
            setEmail('');
            setPassword('');
            setSalary('');
            navigation.navigate('Login');
        } catch (err) {
            console.error('Error al registrar usuario:', err); // 👈 Agrega este log
            Alert.alert('Error', 'No se pudo registrar el usuario. Intente de nuevo.');
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
                    placeholder="Nombre Completo"
                    value={name}
                    onChangeText={setName}
                />
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
                <TextInput
                    style={styles.input}
                    placeholder="Salario"
                    value={salary}
                    onChangeText={setSalary}
                />
            </View>
            <View style={styles.contentBtn}>
                <TouchableOpacity onPress={handleAddUser} style={styles.btnR}>
                    <Text style={styles.btnTextR}>Registrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.btnText}>¿Ya tienes un usuario Presiona este Texto?</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default RegisterScreen;
