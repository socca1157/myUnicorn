import React, { Component } from "react";
import {
    ActivityIndicator,
    AsyncStorage,
    View,
    Text
} from "react-native";

import styles from "../Theme/Theme";

class AuthLoader extends Component {
    static navigationOptions = {
        title: "myUnicorn"
    };
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    // Check if user had logged in before
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem("lastUser");

        // Switch to the App or Auth flow & un-mount AuthLoader
        this.props.navigation.navigate(userToken ? "App" : "Auth");
    };
    render() {
        return (
            <View style={styles.containerVerticalCenter}>
                <Text style={styles.unicornLoading}>🦄</Text>
                <ActivityIndicator />
            </View>
        );
    }
}
export default AuthLoader;