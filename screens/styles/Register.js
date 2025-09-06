import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffff',
        padding: 20,
    }, contentForm: {
        marginTop:40,
        width: "90%",
        display: "flex",
        justifyContent: "center",
    }, input: {
        width: "100%",
        fontSize: 17,
        backgroundColor: "#63B3C9",
        marginTop: 15,
        padding: 13,
        borderRadius: 10
    }, contentBtn: {
        width: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30
    }, btnR: {
        width: "100%",
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 25
    }, btnTextR: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white"
    }, btnText: {
        fontSize: 16,
        fontWeight: "bold",
    },contentIMG:{
        width:180,
        height:180
    },image: {
    width: "100%",
    height: "100%",
    borderRadius:200,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }
});

export default styles;