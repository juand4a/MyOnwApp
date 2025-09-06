import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, TouchableOpacity } from 'react-native';
import db from '../services/db';
import styles from './styles/Main';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const MainScreen = ({ navigation }) => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const loadItems = async () => {
            try {
                const result = await db.getAllUsers();
                setItems(result);
            } catch (err) {
                console.error(err);
            }
        };

        loadItems();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.contentCard}>
            <Text style={styles.cardText}>Bienvenido </Text>
            <Text style={styles.cardText}>{item.name}</Text>
            <Text style={styles.cardText}>{item.email}</Text>
            <Text style={styles.cardText}>Slario: {item.salary}Cop</Text>
        </View>
    );

    return (
        <View style={styles.content}>
            <FlatList
                data={items}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
            />
            <View style={styles.contentButtons}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
                    <Icon name="bank" size={30} color="#63B3C9" />
                    <Text style={styles.btnText}>Mis Balances</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
                    <Icon name="dumbbell" size={30} color="#63B3C9" />

                    <Text style={styles.btnText}>Gimnasio</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
                    <Icon name="calendar-today" size={30} color="#63B3C9" />
                    <Text style={styles.btnText}>Calendario</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
                    <Icon name="image" size={30} color="#63B3C9" />

                    <Text style={styles.btnText}>Recuerdos </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
                    <Icon name="notebook" size={30} color="#63B3C9" />
                    <Text style={styles.btnText}>Notas</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default MainScreen;
