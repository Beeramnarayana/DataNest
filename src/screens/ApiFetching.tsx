import { Image, StyleSheet, Text, View, Button,TextInput,Alert,FlatList} from 'react-native'
import React from 'react'
import database from '../Database/Movie-Database';
import movie from '../models/Movie';
import { Q } from '@nozbe/watermelondb';

const ApiFetching = () => {
    const [data, setData] = React.useState({} as any);
    const [name, setName] = React.useState('');
    const [data_base_data, setDataBaseData] = React.useState([] as any[]);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?t=${name}&y=2023&&apikey=8964c97b`)
            const json = await response.json()
            if (json.Response === 'False') {
                Alert.alert('Movie not found!');
                return;
            }
            setName('')
            setData(json)
            await handleSave()
        } catch (error) {
            console.error(error)
        }
    }

    const handleSave = async () => {
        if (!name) {    
            Alert.alert('Please enter a movie name!');
            return;
        }
        try {
            const moviesCollection = database.collections.get<movie>('movie');
            const existingMovie = await moviesCollection.query(Q.where('title', data.Title)).fetch();
            if (existingMovie.length > 0) {
                Alert.alert('Movie already exists!');
                return;
            }
            
            await database.write(async () => {
                await moviesCollection.create((movie) => {
                  movie.title = data.Title || ''; 
                  movie.rating=data.imdbRating || '';
                  movie.year = data.Year || '';
                  movie.director = data.Director || '';
                  movie.genre = data.Genre || '';
                });
              });
            Alert.alert('Movie saved successfully!');
            setDataBaseData((prevData) => [
                ...prevData,
                {
                    id: data.imdbID || '', 
                    Title: data.Title || '', 
                    Year: data.Year || '',
                    Director: data.Director || '',
                    Genre: data.Genre || '',
                    Rated: data.Rated || '',
                    Poster: data.Poster || '', 
                },
            ]);
        }
        catch (error) {
            console.error('Error saving movie:', error);
            Alert.alert('An error occurred while saving the movie.');
        }
    };

    const handleSubmit = async() => {
        if (!name) {
            Alert.alert('Validation Error', 'Please enter a movie name');
            return;
        }
        await fetchData();
    }

    const handleDelete= (Title: string) => async() => {
        Alert.alert('Delete Movie', 'Are you sure you want to delete this movie?')
        try
        {
            const moviesCollection = database.collections.get<movie>('movie');
            await database.write(async () => {
                const movieToDelete = await moviesCollection.query(Q.where('title', Title)).fetch();
                if (movieToDelete.length > 0) {
                    await movieToDelete[0].markAsDeleted();
                    movieToDelete.forEach((movie) => {
                        movie.destroyPermanently();
                    }   
                );
                }
            });
            Alert.alert('Movie deleted successfully!');
            setDataBaseData((prevData) => prevData.filter((item) => item.Title !== Title));
        }
        catch (error) {
            console.error('Error deleting movie:', error);
            Alert.alert('An error occurred while deleting the movie.');
        }
    }

   const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={styles.container}>
                <Image
                    source={{ uri: item.Poster }}
                    style={{ width: 200, height: 200 }}
                />
                <Text>Movie Title : {item.Title}</Text>
                <Text>Movie Year:  {item.Year}</Text>
                <Text>Movie Director: {item.Director}</Text>
                <Text>Movie Actors: {item.Actors}</Text>
                <Text>Movie Genre: {item.Genre}</Text>
                <Text>Movie Rating: {item.Rated}</Text>
                <Button title="Delete" onPress={handleDelete(item.Title)} />
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text>Api Fetching</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter Movie Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <View style={styles.button}>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
            <FlatList
                data={data_base_data} 
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    )   
};
export default ApiFetching

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    text:{
        fontSize: 20,
        color: 'black',
    },
    input: {
        height: 40,
        width: 100,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    button: {   
        padding: 10,
        borderRadius: 5,
    },
    list: {
        marginTop: 20,
      },
})