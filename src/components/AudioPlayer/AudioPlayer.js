import React, { Component } from "react";
import { Platform } from "react-native";

import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import Sound from "react-native-sound";

import UnicornCarrousel from "../UnicornCarrousel/";

class AudioPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
      isLoading: false,
      sound: null
    };
    Sound.setCategory("Playback", true);
    this.startMusic = this.startMusic.bind(this);
    this.stopMusic = this.stopMusic.bind(this);
    this.pauseMusic = this.pauseMusic.bind(this);
  }

  pauseMusic() {
    this.state.sound.pause();
    this.setState({ isPlaying: false });
  }
  stopMusic() {
    if (this.state.sound) {
      // if sound obj exists
      this.state.sound.stop(() => {
        this.state.sound.release(); // Release when done to clear up resources
        if (this._isMounted) {
          this.setState({ sound: null });
          this.setState({ isPlaying: false });
        }
      });
    }
  }

  startMusic() {
    if (this.state.sound) {
      //if already loaded
      this.state.sound.play();
      this.setState({ isPlaying: true });
    } else {
      this.setState({ isLoading: true }); //let buttons know we're loading
      const sound = new Sound(this.props.url, "", error =>
          callback(error, sound)
      );
      this.setState({ sound: sound }); // Store Sound obj in state so we can use it's methods

      const callback = (error, sound) => {
        if (error) {
          Alert.alert("error", error.message);
          this.setState({ isPlaying: false });
          return;
        }
        if (this._isMounted) {
          if (this.props.looping) {
            // iOS gets looped version
            sound.setNumberOfLoops(-1);
          }
          this.setState({ isPlaying: true, isLoading: false });

          sound.play(() => {
            this.state.sound.release(); // Release when done to clear up resources
          });
        }
      };
    }
  }
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const status = this.state.isPlaying;
    const loading = this.state.isLoading;
    return (
        <>
        <Button
            onPress={status ? this.pauseMusic : this.startMusic}
            disabled={loading}
            loading={loading}
            raised={true}
            type="solid"
            icon={
            status ? (
              <Icon
                name="pause"
                size={36}
                color="#fff"
                style={{ margin: 10 }}
              />
            ) : (
              <Icon name="play" size={36} color="#fff" style={{ margin: 10 }} />
            )
          }
        />
        <Button
            disabled={!status}
            onPress={this.stopMusic}
            type="solid"
            raised={true}
            icon={
            <Icon name="stop" size={36} color="#fff" style={{ margin: 10 }} />
          }
        />

        <UnicornCarrousel />
        </>
    );
  }
}

export default AudioPlayer;