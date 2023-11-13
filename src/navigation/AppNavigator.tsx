import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import NotesNavigator from "./NotesNavigator";

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <NotesNavigator />
        </NavigationContainer>
    );
}

export default AppNavigator;