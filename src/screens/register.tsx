import { StyleSheet, Text, View,SafeAreaView,ScrollView, TextInput, Button,Alert } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../App'
import { Q } from '@nozbe/watermelondb'
import database from '../Database/Database';
import User from '../models/user';
type RegisterProps= NativeStackScreenProps<RootStackParamList, 'register'>;

const Register = ({navigation}:RegisterProps) => {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSumbit = async() => {
    if(!username || !email || !password) {
      Alert.alert('Please fill in all fields.');
      return;
    }
    if (typeof password !== 'string' || password.trim() === '') {
      Alert.alert('Invalid password.');
      return;
    }
    try {
      const UserCollection= database.collections.get<User>('user');
      const existingUser = await UserCollection.query(Q.where('email', email)).fetch();
      if (existingUser.length > 0) {
        Alert.alert('Email already exists!');
        return;
      }
      await database.write(async () => {
        await UserCollection.create((user) => {
          user.name = username; 
          user.email = email;
          user.password =password; 
        });
      });
      Alert.alert('Registration successful!');
      navigation.navigate('Home');
     } catch (error) {
       console.error('Error registering:', error);
       Alert.alert('An error occurred while registering.');
     }
   finally{
      setUsername('');
      setEmail('');
      setPassword('');
   }

  };
  return (
     <SafeAreaView>
      <ScrollView>
        <Text style={styles.text}>Register</Text>
        <View style={styles.container}>
          <TextInput
            style={styles.textinput}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
            <TextInput
                style={styles.textinput}
                placeholder="Email"
                value={email}
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
          <Button title="Register" onPress={handleSumbit} />
          <Text>Already have an account?</Text>
          <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </View>
      </ScrollView>
     </SafeAreaView>
  )
}

export default Register

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