import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
        padding: 20,
    }, contentCard: {
        width: 350,
        backgroundColor: "#63B3C9",
        display: "flex",
        justifyContent: "center",
        padding: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 40
    }, cardText: {
        marginTop: 10,
        color: "black",
        fontSize: 17,
        fontWeight: "bold"
    }, contentButtons: {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "row"
    }, btn: {
        width: "50%",
        height: 150,
        backgroundColor: "white",
        borderColor: '#63B3C9',
        borderWidth: 1,
        justifyContent:"center",
        alignItems:"center"
    },btnText:{
        color:"#63B3C9",
        fontWeight:"bold",
        fontSize:15
    }
});

export default styles;