import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'components';

import AddPlace from 'screens/AddPlace';
import Places from 'screens/Places';
import Login from 'screens/Login';

export type RootStackParamList = {
  Login: undefined;
  Places: undefined;
  AddPlace: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// SET ROOT AUTHENTICATION NAVIGATIONS
function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen
          name="Places"
          component={Places}
          options={({ navigation }) => ({
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                color={tintColor}
                size={24}
                onPress={() => navigation.navigate('AddPlace')}
              />
            ),
          })}
        />
        <Stack.Screen name="AddPlace" component={AddPlace} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Screens;
