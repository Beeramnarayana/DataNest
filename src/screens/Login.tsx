import { StyleSheet, Text, View,SafeAreaView,ScrollView, TextInput, Button,Alert } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { Q } from '@nozbe/watermelondb'
import database from '../Database/Database';
type LoginProps= NativeStackScreenProps<RootStackParamList, 'Login'>;
import  User  from '../models/user';
import bcrypt from 'bcryptjs';

const Login = ({navigation}:LoginProps) => {
   const [Email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
  const handleSumbit = async () => {
    if(!Email || !password) {
      Alert.alert('Please fill in both email and password.');
      return;
    }
    try {
      const Cerdientials = database.collections.get<User>('user');
        const user = await Cerdientials.query(Q.where('email', Email)).fetch();
        
        if (user.length > 0 && user[0].password===password) {
          // const isPasswordValid = await bcrypt.compare(password, user[0].password); // Compare the password with the hashed password
          // if (isPasswordValid){ 
            Alert.alert('Login successful!');
            navigation.navigate('Home');
          }
          // else {
          //   Alert.alert('Invalid password!');
          // }
       // }
         else {
          Alert.alert('Invalid password!');
        }
    }
    catch (error) {
      console.error('Error logging in:', error);
      Alert.alert('An error occurred while logging in.');
    }
  };

  return (
     <SafeAreaView>
      <ScrollView >
        <Text style={styles.text}>Login</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.textinput}
            placeholder="email"
            value={Email}
            onChangeText={setEmail}

          />
          <TextInput
            style={styles.textinput}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.button}>
        <Button title="Login" onPress={handleSumbit} />
          <Text>Don't have Account?</Text>
        <Button title="Register" onPress={() => navigation.navigate('register')} />  
        </View>
      </ScrollView>
     </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  textinput:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingLeft: 10,
  },
  button:{
    padding: 10,
    borderRadius: 5,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 30,
    gap: 10,
  },
  text:{
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    alignItems:'center',
    justifyContent:'center',
  }
})
