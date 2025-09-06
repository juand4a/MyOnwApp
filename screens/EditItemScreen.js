import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import db from '../services/db';

const EditItemScreen = ({ route, navigation }) => {
  const { itemId } = route.params;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const loadItem = async () => {
      try {
        const result = await db.getAllItems();
        const item = result.find(i => i.id === itemId);
        if (item) {
          setName(item.name);
          setDescription(item.description);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadItem();
  }, [itemId]);

  const handleEditItem = async () => {
    try {
      await db.updateItem(itemId, name, description);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar el item');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Actualizar" onPress={handleEditItem} />
        <Button title="Eliminar" onPress={async () => {
              try {
                await db.deleteUser(item.id);
                setItems(prevItems => prevItems.filter(i => i.id !== item.id));
                Alert.alert("Exito","Usuario Eliminado Con Exito")
              } catch (err) {
                console.error(err);
              }
            }} />
    </View>
  );
};

export default EditItemScreen;
