import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/pages/Home';
import RegistrarConta from './src/pages/RegistrarConta';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Home"
          component={Home}
        />
        <Stack.Screen
          name="RegistrarConta"
          component={RegistrarConta}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

