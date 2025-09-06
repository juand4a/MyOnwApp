import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import AddItemScreen from './screens/AddItemScreen';
import EditItemScreen from './screens/EditItemScreen';
import db from './services/db';

const Stack = createStackNavigator();

const App = () => {
  React.useEffect(() => {
    db.init();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Add" component={AddItemScreen} />
        <Stack.Screen name="Edit" component={EditItemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
