import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotesList from '../screens/NoteList';
import CreateNote from '../screens/CreateNote';
import EditNote from '../screens/EditNote';
import { RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();

const NotesNavigator = () => {
    return (
        <Stack.Navigator initialRouteName="NoteList">
        <Stack.Screen name="NoteList" component={NotesList} />
        <Stack.Screen name="CreateNote" component={CreateNote} />
        <Stack.Screen name="EditNote" component={EditNote} />
        </Stack.Navigator>
    );
    }

export default NotesNavigator;