import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddUserScreen from './screens/AddUserScreen';
import UserDetailScreen from './screens/UserDetailScreen';
import UserScreen from './screens/UserScreen';
const Stack = createStackNavigator();

function MyStack(){
  return(
    <Stack.Navigator
      screenOptions={{
        headerStyle:{backgroundColor:'blue'},
        headerTintColor:'white',
        headerTitleStyle:{fontWeight:'bold'}
      }}
    >
      <Stack.Screen
        name="AddUserScreen"
        component={AddUserScreen}
        options={{title:'Adición de Usuarios'}}
      />
      <Stack.Screen
        name="UserScreen"
        component={UserScreen}
        options={{title:'Listado de Usuarios'}}
      />
      <Stack.Screen
        name="UserDetailScreen"
        component={UserDetailScreen}
        options={{title:'Detalle de Usuario'}}
      />

    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
