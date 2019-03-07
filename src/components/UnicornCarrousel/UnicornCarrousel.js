import React, { Component } from "react";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";

class UnicornCarrousel extends Component {
    constructor() {
        super();
        this.animatedValue = new Animated.Value(0);
        this.pauseAnimation = this.pauseAnimation.bind(this);
    }
    componentDidMount() {
        this.animate();
    }
    animate() {
        this.animatedValue.setValue(0);
        Animated.timing(this.animatedValue, {
            toValue: 1,
            duration: 5000,
            easing: Easing.linear
        }).start(() => this.animate());
    }
    pauseAnimation() {
        this.animatedValue.stopAnimation();
    }
    render() {
        const marginRight = this.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['10%', '-90%']
        })
        return (
            <>
            <View style={styles.carrousel}>
            <Animated.Text
                onPress={this.pauseAnimation}
                style={{
              marginLeft: marginRight,
              width: "100%",
              textAlign: "right",
              fontSize: 34
            }}
            >🦄🦄🦄</Animated.Text>
            </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    carrousel: {
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        height: 34
    }
});

export default UnicornCarrousel;