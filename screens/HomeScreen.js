import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import db from '../services/db';

const HomeScreen = ({ navigation }) => {
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
    <View>
      <Text>{item.name}</Text>
      <Text>{item.description}</Text>
      <Button title="Editar" onPress={() => navigation.navigate('Edit', { itemId: item.id })} />
      <Button title="Eliminar" onPress={async () => {
        try {
          await db.deleteUser(item.id);
          setItems(prevItems => prevItems.filter(i => i.id !== item.id));
        } catch (err) {
          console.error(err);
        }
      }} />
    </View>
  );

  return (
    <View>
      <Button title="Agregar Item" onPress={() => navigation.navigate('Add')} />
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default HomeScreen;
