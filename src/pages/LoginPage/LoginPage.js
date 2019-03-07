import React, { Component } from "react";
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Alert,
    AsyncStorage
} from "react-native";

import { Input, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

import styles from "../../components/Theme/Theme";
import { firebaseLogin } from "../../api/Firebase.js";

class LoginPage extends Component {
  static navigationOptions = {
    title: "Welcome Back"
  };
  constructor() {
    super();
    this.state = {
      formVerify: false,
      formError: false,
      responseError: null,
      isLoggingIn: false,
      email: "",
      password: ""
    };
    this.formVerify = this.formVerify.bind(this);
  }

  formVerify = async nextStep => { // check the 2 required to enable button
    if (
        /(\S+@\S+\.\S+)/.test(this.state.email) && // possibly implement RFC-2822 later on
        this.state.password.length > 5 // 6 or higher
    ) {
      this.setState({ formVerify: true });
      this.setState({ formError: false }); // reset error
    } else {
      this.setState({ formVerify: false }); // just in case inputs change later
    }
    if (nextStep && this.state.formVerify) {
      // they've pressed the Login button
      // now check creds against local db

      this.setState({ isLoggingIn: true });
      firebaseLogin(this.state.email, this.state.password).then(async user => {
        console.log(user);
        if (user.code) {
          console.log("made it here");
          let errorMsg;
          switch (user.code) {
            case "auth/user-not-found":
            case "auth/wrong-password":
              errorMsg = "Invalid email address or password";
              break;
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
          this.setState({ isLoggingIn: false }); // re-activate button
        } else {
          // now let them in
          await AsyncStorage.setItem("lastUser", this.state.email); // enable auto login
          this.props.navigation.navigate("App");
        }
      });
    }
  };

  render() {
    return (
        <>
        <View style={styles.container}>
          <Text style={styles.welcome}>Log in to MyUnicorn!</Text>
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
              onChangeText={email => this.setState({ email }, this.formVerify)}
          />
          <Input
              leftIcon={
              <Icon
                name="unlock-alt"
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
          <Text style={styles.errorMsg}>
            {this.state.formError
                ? "Oops! Please double check your details."
                : ""}
          </Text>
          <View style={styles.buttonContainer}>
            <Text style={styles.errorMsg}>{this.state.responseError}</Text>
            <Button
                onPress={() => this.formVerify("nextStep")}
                disabled={!this.state.formVerify || this.state.isLoggingIn}
                loading={this.state.isLoggingIn}
                title="Log In"
                type="solid"
                raised={true}
                icon={
                <Icon name="sign-in" size={15} style={{ marginRight: 10 }} />
              }
            />
            <Text style={styles.or}>or</Text>
            <Button
                onPress={() => this.props.navigation.navigate("SignUp")}
                title="Register"
                type="clear"
            />
          </View>
        </View>
        </>
    );
  }
}

export default LoginPage;
