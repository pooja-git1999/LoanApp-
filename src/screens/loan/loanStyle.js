import { StyleSheet } from "react-native";

const loanStyle = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: "100%",
    width: '100%',
    paddingBottom: 30,
    marginBottom:10
  },
  input: {
    width: '90%',
    height: 45,
    paddingLeft: 35,
    paddingRight: 30,
    fontWeight: '500',
    fontSize: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignSelf: "center",
    marginTop: 20,
    display: 'flex',

  },

  header: {
    paddingVertical: 5,
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: 'grey',
    elevation: 3,
    height: 125,
    paddingHorizontal: 20,
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  logo: {
    height: 50,
    width: 50,
    position: 'relative',
    right: '45%'

  },
  loan_name: {
    color: '#374a72',
    fontSize: 16,
    fontWeight: '600'
  },
  statustxt: {
    color: 'green',
    fontWeight: '500',
    textAlign:'center',
    paddingTop:10
  },
  date:{
    fontWeight:'600'
  },
  folonum:{
   fontWeight:'600',
   fontSize:16

  },
  
});
export default loanStyle;