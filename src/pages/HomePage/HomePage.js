import React, { Component } from "react";
import {
    View,
    Text,
    AsyncStorage,
    NativeModules,
    Platform
} from "react-native";
import { Button } from "react-native-elements";

import AudioPlayer from "../../components/AudioPlayer/";
import styles from "../../components/Theme/Theme";

class HomePage extends Component {
    static navigationOptions = {
        title: "myUnicorn"
    };

    constructor() {
        super();
        this.logout = this.logout.bind(this);
        this.AudioPlayerRef = React.createRef();
        this.state = {
            userName: ""
        };
        this.getUserName();
    }
    async getUserName() {
        const userName = await AsyncStorage.getItem("userName");
        this.setState({ userName: userName });
    }

    async logout() {
        await this.AudioPlayerRef.current.stopMusic(); // make sure music is stopped
        NativeModules.NativeAlert.openAlert("Success!", "You've been logged out."); // our super fancy native bridge
        await AsyncStorage.setItem("lastUser", ""); // using this to Logout instead of .clear(), so we keep the displayName until next register
        this.props.navigation.navigate("ReAuth"); // now send back to login screen
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome {this.state.userName} to🦄 paradise!
                </Text>
                <AudioPlayer
                    ref={this.AudioPlayerRef}
                    url="https://austincameron.com/Pink%20Fluffy%20Unicorns%20Dancing%20on%20Rainbows%20-%20Fluffle%20Puff%20.mp3"
                    looping={Platform.OS === "ios" ? true : false}
                />
                <Button
                    onPress={this.logout}
                    type="outline"
                    title="Logout"
                    style={{ marginTop: 50 }}
                />
            </View>
        );
    }
}
export default HomePage;