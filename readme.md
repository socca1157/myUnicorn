# myUnicorn
This *Unicorn app* is designed to demonstrate an understanding of [React Native](https://facebook.github.io/react-native/).

## Features
  - Sign Up / Login using [Firebase](https://firebase.google.com) for persistent user storage.
  - Basic form and email validation.
  - Auth Routing separate App Stacks with help from [React-Navigation](https://reactnavigation.org).
  - Play/Pause & Stop buttons to control [this](https://austincameron.com/Pink%20Fluffy%20Unicorns%20Dancing%20on%20Rainbows%20-%20Fluffle%20Puff%20.mp3) lovely song using [React-Sound](https://github.com/zmxv/react-native-sound).
  - Taking advantage of [React Native Elements UI Toolkit](https://react-native-training.github.io/react-native-elements/) to simplify our icon and loading animations for buttons.
  - Animated “Unicorn Carousel” component.
  - Jest testing using Enzyme and Snapshots.

### Notes
  - Audio takes longer to load on iOS compared to Android.
  - Pausing keeps song in memory, but Stopping removes it.

### Installation
This project requires [React Native CLI tools](https://facebook.github.io/react-native/docs/getting-started) to run.

Open your favorite Terminal and run these commands to install the dependencies.
```sh
$ cd myUnicorn
$ npm i
$ react-native link react-native-gesture-handler
$ react-native link react-native-vector-icons
$ react-native link react-native-sound
```
### Setup
Navigate to ``src/api/Firebase.js`` and update your config to the correct API credentials.
```sh
const config = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxx"
};
```

Lastly, depending on your device/simulator:

```sh
$ react-native run-ios
```
or
```sh
$ react-native run-android
```
### Bugs

  - Unicorn Carousel animation should pause when music pauses

### Todos

 - Add Night Mode

License
----

MIT