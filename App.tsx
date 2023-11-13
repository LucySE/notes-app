import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateNote from './src/screens/CreateNote';
import NoteList from './src/screens/NoteList';
import EditNote from './src/screens/EditNote';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider theme={DefaultTheme}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="NoteList">
        <Stack.Screen name="NoteList" component={NoteList} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="EditNote" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>
  );
};

export default App;