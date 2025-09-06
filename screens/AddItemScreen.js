import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import db from '../services/db';

const AddItemScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleAddItem = async () => {
    try {
      await db.insertItem(name, description);
      navigation.goBack();
    } catch (err) {
      Alert.alert('Error', 'No se pudo agregar el item');
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
      <Button title="Agregar" onPress={handleAddItem} />
    </View>
  );
};

export default AddItemScreen;
