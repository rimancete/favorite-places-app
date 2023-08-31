import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton } from 'components';

import AddPlace from 'screens/AddPlace';
import Places from 'screens/Places';

export type RootStackParamList = {
  Places: undefined;
  AddPlace: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Screens() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
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
