import React, { Component } from "react";
import { Platform, Text, View, Alert, AsyncStorage } from "react-native";

import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "../../components/Theme/Theme";
import { firebaseCreateAccount } from "../../api/Firebase.js";

class SignupPage extends Component {
    static navigationOptions = {
        title: "myUnicorn"
    };
    constructor() {
        super();
        this.state = {
            formVerify: false,
            isCreatingAccount: false,
            responseError: null,
            email: "",
            password: "",
            name: ""
        };
        this.formVerify = this.formVerify.bind(this);
    }

    formVerify = async nextStep => { // check the 3 required to enable button
        if (
            /(\S+@\S+\.\S+)/.test(this.state.email) && // possibly implement RFC-2822 later on
            this.state.password.length > 5 && // 6 or higher
            this.state.name &&
            /^([a-zA-Z\s]*)$/.test(this.state.name) // only letters and spaces
        ) {
            this.setState({ formVerify: true });
        } else {
            this.setState({ formVerify: false }); // just in case inputs change later
        }
        if (nextStep && this.state.formVerify) {
            // they've pressed the Signup button and it's validated

            // first, lets check if user already exists
            try {
                let value = await AsyncStorage.getItem("userName-" + this.state.email);

                if (value != null) {
                    //user found, login instead
                    Alert.alert(
                        "Email Already in Use",
                        "Would you like to log in instead?",
                        [
                            {
                                text: "Ok",
                                onPress: () => this.props.navigation.navigate("LogIn")
                            },
                            {
                                text: "Cancel",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            }
                        ],
                        { cancelable: false }
                    );
                } else {
                    //no users found, so we save.

                    this.setState({ isCreatingAccount: true }); // prevent multiple button presses

                    firebaseCreateAccount(
                        this.state.name,
                        this.state.email,
                        this.state.password
                    ).then(async result => {
                        if (result.code) {
                            let errorMsg;
                            switch (result.code) {
                                case "auth/email-already-in-use":
                                    errorMsg = "This email address is already taken.";
                                    break;
                                case "auth/invalid-email":
                                    errorMsg = "Invalid e-mail address format."; // shouldn't get this, but just in case.
                                    break;
                                case "auth/weak-password":
                                    errorMsg = "Password is too weak."; // shouldn't get this, but just in case.
                                    break;
                                default:
                                    errorMsg = "Check your internet connection.";
                            }
                            this.setState({ responseError: "Oops!\r\n" + errorMsg }); // let user know what went wrong
                            this.setState({ isCreatingAccount: false }); // re-activate button
                        } else {
                            // now let them in
                            await AsyncStorage.setItem("lastUser", this.state.email); // enable auto login
                            await AsyncStorage.setItem("userName", this.state.name); // Save name, to be polite.
                            this.props.navigation.navigate("App");
                        }
                    });
                }
            } catch (error) {
                // Error retrieving data
                // console.log(error);
            }
        }
    };

    render() {
        return (
            <>
            <View style={styles.container}>
                <Text style={styles.welcome}>Welcome to MyUnicorn!</Text>
                <Text style={styles.tagline}>
                    The #1 Resource for Pink Fluffy Unicorns Dancing on Rainbows.
                </Text>

                <Input
                    leftIcon={
              <Icon
                name="user-o"
                size={18}
                color="#222"
                style={{ marginRight: 15 }}
              />
            }
                    placeholder="Email Address"
                    value={this.state.email}
                    keyboardType="email-address"
                    onChangeText={email => this.setState({ email }, this.formVerify)}
                />
                <Input
                    leftIcon={
              <Icon
                name="lock"
                size={18}
                color="#222"
                style={{ marginRight: 15 }}
              />
            }
                    placeholder="Password"
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={password =>
              this.setState({ password }, this.formVerify)
            }
                />
                <Input
                    leftIcon={
              <Icon
                name="address-card-o"
                size={18}
                color="#222"
                style={{ marginRight: 15 }}
              />
            }
                    placeholder="Full Name"
                    value={this.state.name}
                    onChangeText={name => this.setState({ name }, this.formVerify)}
                />
                <Text style={styles.errorMsg}>{this.state.responseError}</Text>

                <View style={styles.buttonContainer}>
                    <Button
                        onPress={() => this.formVerify("nextStep")}
                        disabled={!this.state.formVerify || this.state.isCreatingAccount}
                        loading={this.state.isCreatingAccount}
                        title="Register"
                        type="solid"
                        raised={true}
                        icon={
                <Icon
                  name="sign-in"
                  size={15}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
              }
                    />
                    <Text style={styles.or}>or</Text>
                    <Button
                        onPress={() => this.props.navigation.navigate("LogIn")}
                        title="Log In"
                        type="clear"
                    />
                </View>
            </View>
            </>
        );
    }
}

export default SignupPage;