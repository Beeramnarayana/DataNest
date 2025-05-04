// import { StyleSheet, Text, View ,Alert,FlatList} from 'react-native'
// import React, { useEffect, useState } from 'react'



// const Home = () => {
//   const [data, setData] = useState<{ id: number; title: string; price: number }[]>([])
//   const fetchPosts= async()=>{
//     try{
//        const response= await fetch('https://fakestoreapi.com/products')
//        const jsoneddata= await response.json()
//        setData(jsoneddata)
//     }
//     catch(error)
//     {
//       Alert.alert('Fetching Error');
//     }
//   };

//   useEffect(()=>{
//     fetchPosts()
//   })

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Home</Text>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <View style={styles.item}>
//             <Text style={styles.itemTitle}>{item.title}</Text>
//             <Text style={styles.itemPrice}>${item.price}</Text>
//           </View>
//         )}
//       />
//     </View>
//   );
// };


// export default Home

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   itemTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   itemPrice: {
//     fontSize: 16,
//     color: 'green',
//   },
// });


// import { Image, StyleSheet, Text, View, Button,TextInput,Alert} from 'react-native'
// import React from 'react'

// const Home = () => {
//     const [data, setData] = React.useState({} as any);
//     const [name, setName] = React.useState('');

//     const fetchData = async () => {
//         try {
//             const response = await fetch(`https://www.omdbapi.com/?t=${name}&y=2023&&apikey=8964c97b`)
//             const json = await response.json()
//             setData(json)

//         } catch (error) {
//             console.error(error)
//         }
//     }
//     const handleSubmit = () => {
//         if (!name) {
//             Alert.alert('Validation Error', 'Please enter a movie name');
//             return;
//         }
//         fetchData();
//     }


//     return (
//         <View style={styles.container}>
//             <Text>Api Fetching</Text>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter Movie Name"
//                 value={name}
//                 onChangeText={(text) => setName(text)}
//             />
//             <View style={styles.button}>
//                 <Button title="Submit" onPress={handleSubmit} />
//             </View>
//             <Image
//                 source={{ uri: data.Poster }}
//                 style={{ width: 200, height: 200  }}
//             />
//             <>
//                 <Text>Movie Title : {data.Title}</Text>
//                 <Text>Movie Year:  {data.Year}</Text>
//                 <Text>Movie Director: {data.Director}</Text>
//                 <Text>Movie Actors: {data.Actors}</Text>
//                 <Text>Movie Genre: {data.Genre}</Text>
//                 <Text>Movie Rating: {data.Rated}</Text>
//             </>
//         </View>
//     )   
// };
// export default Home

// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
        
//     },
//     text:{
//         fontSize: 20,
//         color: 'black',
//     },
//     input: {
//         height: 40,
//         width: 100,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//     },
//     button: {   
//         padding: 10,
//         borderRadius: 5,
//     },
// })


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