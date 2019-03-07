import { StyleSheet } from "react-native";

export default StyleSheet.create({
    header: {
        backgroundColor: "#E72373",
        color: "#fff"
    },
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        paddingTop: 20
    },
    containerVerticalCenter: {
        flex: 1,
        alignItems: "center",
        textAlign: "center",
        justifyContent: "center",
        backgroundColor: "#F5FCFF"
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 8
    },
    tagline: {
        fontSize: 11,
        textAlign: "center",
        color: "#666",
        width: "90%",
        marginTop: 4,
        marginBottom: 8
    },
    or: {
        textAlign: "center",
        color: "#888",
        marginTop: 5,
        marginBottom: 2.5
    },
    buttonContainer: {
        flex: 1,
        alignItems: "center",
        marginTop: 30
    },
    errorMsg: {
        fontSize: 13,
        textAlign: "center",
        color: "#E72373",
        width: "90%",
        marginTop: 10
    },
    unicornLoading: {
        paddingBottom: 30,
        fontSize: 80
    }
});
