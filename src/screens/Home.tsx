import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src'
import { RootStackParamList } from '../../App' 
type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>
  

const Home = ({navigation}:HomeProps) => {
  return (
    <View>
      <Text>Home</Text>
      <View>
          <Button title='Home' onPress={() => navigation.navigate('Home')} />
          <Button title='Posts' onPress={() => navigation.navigate('Posts')} />
          <Button title='search' onPress={() => navigation.navigate('Search')} />
          <Button title='ApiFetching' onPress={() => navigation.navigate('ApiFetching')} />
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
})