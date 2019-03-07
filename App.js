import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer
} from "react-navigation";

import AuthLoader from "./src/components/AuthLoader/";
import LoginPage from "./src/pages/LoginPage/";
import SignupPage from "./src/pages/SignupPage/";
import HomePage from "./src/pages/HomePage/";

import styles from "./src/components/Theme/Theme";

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: styles.header.backgroundColor
    },
    headerTintColor: styles.header.color
};

const AppStack = createStackNavigator(
    { Home: HomePage },
    { defaultNavigationOptions: defaultNavOptions }
);
const AuthStack = createStackNavigator(
    { SignUp: SignupPage, LogIn: LoginPage },
    { defaultNavigationOptions: defaultNavOptions }
);
const ReAuthStack = createStackNavigator(
    { LogIn: LoginPage, SignUp: SignupPage },
    { defaultNavigationOptions: defaultNavOptions }
);

const AppNavigator = createSwitchNavigator(
    {
        AuthLoader: AuthLoader,
        App: AppStack,
        Auth: AuthStack,
        ReAuth: ReAuthStack // less friction for return users, triggered on Logout
    },
    {
        initialRouteName: "AuthLoader"
    }
);

export default createAppContainer(AppNavigator);