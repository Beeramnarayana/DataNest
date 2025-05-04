import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView,ScrollView,Alert } from 'react-native'
import database from '../Database/Database'
import { Q } from '@nozbe/watermelondb'
import  user from '../models/user'

const Search = () => {
  const [userName, setUserName] = React.useState('')
  const [data, setData] = React.useState<user[]>([]);
  const fetchData = async () => {
    try {
     const PostCollection=database.collections.get('user')
     const querySnapshot = await PostCollection.query(Q.where('name', userName)).fetch();
     setData(querySnapshot.map(item => item as user));
    } catch (error) {
      console.error(error);
    }
  }

  const handleSubmit=()=>{
    if (!userName) {
      Alert.alert('Validation Error', 'Please enter a movie name');
      return;
    }
    fetchData();
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <TextInput 
          placeholder='Search' 
          style={styles.input}
          value={userName}
          onChangeText={(text) => setUserName(text)}
          />
          <Button title='Search' onPress={handleSubmit} />
          {data.length === 0 ? 
          (
           <View style={styles.container}>
           <Text style={styles.text}>
            No Data Found</Text>
            </View>):
          (data.map((item, index) => (
            <View key={index} style={styles.container}>
              <Text style={styles.text}>{item.name}</Text>
            </View>
          )))
        }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Search

const styles = StyleSheet.create({  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    backgroundColor:'lightgray',
    padding: 10,
    color: 'black',
    margin: 10,
  },
  input:{
    height: 40,
    width: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
})