import { StyleSheet } from "react-native";

const LogIn = StyleSheet.create({
  head: {
    flex: 1,
    paddingBottom:30
  },
  logo:{
    height: 80,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '600',
    marginLeft: 45,
    marginTop: 40
  },
  para:{
color:'#fff',
fontSize: 15,
fontWeight: '500',
marginLeft: 45,
marginTop: 10
  },
  input: {
    width: '85%',
    marginTop: 10,
    height: 45,
    paddingLeft: 25,
    paddingRight: 30,
    fontWeight: '500',
    fontSize: 15,
    borderRadius: 10,
   backgroundColor:'#ededed',
   alignSelf:'center'
},
  main: {
    flex: 3,
    // height: '85%',
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  detail:{
  marginTop:35,
  marginBottom:15
},
lable:{
  fontSize:15,
  fontWeight: '500',
  marginLeft:35
},
icons:{
  display:'flex',
  flexDirection:'row',
  alignSelf:'center',
  justifyContent:'space-around',
  width:'40%',
  marginTop:55
}

})
export default LogIn;