import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './src/screens/Login';
import Register from './src/screens/register';
import { SafeAreaView, ScrollView } from 'react-native';
import Home from './src/screens/Home';
import Account from './src/screens/Posts';
import Search from './src/screens/Search';
import ApiFetching from './src/screens/ApiFetching';
export type RootStackParamList = {
  Login: undefined;
  register: undefined;
  Home: undefined;
  Posts: undefined;
  Search: undefined;
  ApiFetching: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
    <SafeAreaView style={{flex: 1}}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Posts" component={Account} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="ApiFetching" component={ApiFetching} />
      </Stack.Navigator>
    </SafeAreaView>
  </NavigationContainer>
  );
}

export default App;