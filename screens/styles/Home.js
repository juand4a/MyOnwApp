import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    padding: 20,
  }, contentIMG: {
    marginTop:20,
    width: 300,
    height:300,
    display:"flex",
    marginBottom:20,
    overflow:"hidden"
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius:200,
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
  }, btn: {
    width: 300,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center"
  }, btnText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold"
  }, title: {
    fontSize: 20,
    color: "black",
    fontWeight: "bold",
  
  }
});

export default styles;