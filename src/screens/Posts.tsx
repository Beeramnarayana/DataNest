import React, { useEffect, useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert, Image } from 'react-native';
import database from '../Database/Database-post';
import  Post from '../models/post';

interface PostItem {
  id: string;
  title: string;
  body: string;
  image:string 
}

const Account: React.FC = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(''); 
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const postsCollection = database.collections.get<Post>('posts');
      const allPosts = await postsCollection.query().fetch();

      const formattedPosts: PostItem[] = allPosts.map(post => ({
        id: post.id,
        title: post.title,
        body: post.body,
        image: post.image, 
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Save post (create or update)
  const handleSave = async () => {
    if (!title || !body) {
      Alert.alert('Please fill in both title and body.');
      return;
    }
  
    try {
      const postsCollection = database.collections.get<Post>('posts');
  
      if (editingPostId) {
        const postToUpdate = await postsCollection.find(editingPostId);
  
        await database.write(async () => {
          await postToUpdate.update((post) => {
            post.title = title; 
            post.body = body;
            post.image = image; 
          });
        });
      } else {
        await database.write(async () => {
          await postsCollection.create((post) => {
            post.title = title; 
            post.body = body;
            post.image = image;
          });
        });
      }
      
      fetchPosts();
      setTitle('');
      setBody('');
      setImage(''); 
      setEditingPostId(null); 
    } catch (error) {
      console.error('Error saving post:', error);
    } 
  };

 const handleSelectImage = async() => {
    launchImageLibrary({ mediaType: 'photo',includeBase64:true },(response)=>{
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.errorMessage) {
            console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
            const selectedImage = response.assets[0];
            setImage(selectedImage.base64 || ''); 
        }
        else {
            console.log('No image selected');
        }
    });
 }

  const handleDelete = async (id: string) => {
    try {
      const postsCollection = database.collections.get<Post>('posts');
      const postToDelete = await postsCollection.find(id);
  
      await database.write(async () => {
        await postToDelete.destroyPermanently();
      });
  
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  
  const handleEdit = (post: PostItem) => {
    setTitle(post.title);
    setBody(post.body);
    setImage(post.image); 
    setEditingPostId(post.id);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: PostItem }) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
      {item.image ? (
        <Image source={{ uri: `data:image/jpeg;base64,${item.image}` }} style={styles.image} />
      ) : (
        <Text>No Image</Text>
      )}
      <View style={styles.buttonRow}>
        <Button title="Edit" onPress={() => handleEdit(item)} />
        <Button title="Delete" onPress={() => handleDelete(item.id)} color="red" />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Posts</Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Body"
        value={body}
        onChangeText={setBody}
        style={styles.input}
      />
      <Button title="select image" onPress={handleSelectImage}></Button>
      {image ? <Image source={{ uri: `data:image/jpeg;base64,${image}` }} style={styles.previewImage} /> : null}

      <Button
        title={editingPostId ? 'Update Post' : 'Create Post'}
        onPress={handleSave}
      />

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  list: {
    marginTop: 20,
  },
  postItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postBody: {
    fontSize: 14,
    color: '#666',
    marginVertical: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  image:{
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 10,
  },
  previewImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginVertical: 8,
  },
});
