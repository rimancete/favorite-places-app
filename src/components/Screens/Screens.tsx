import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IconButton } from 'components';
import AddPlace, { AddPlaceParams } from 'screens/AddPlace';
import Places, { PlacesParams } from 'screens/Places';
import Login from 'screens/Login';
import Signup from 'screens/Signup';
import Map, { MapParams } from 'screens/Map';
import theme from 'styles/theme';
import { useAuth } from 'hooks';
import { View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';
import { User } from 'hooks/useAuth/useAuth';
import { dbinit } from 'utils/database';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Places: PlacesParams;
  AddPlace: AddPlaceParams;
  Map: MapParams;
};

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme().colors.primary500 },
        headerTintColor: theme().colors.gray700,
        contentStyle: { backgroundColor: theme().colors.gray700 },
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { updateUser } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme().colors.primary500 },
        headerTintColor: theme().colors.gray700,
        contentStyle: { backgroundColor: theme().colors.gray700 },
      }}>
      <Stack.Screen
        name="Places"
        component={Places}
        options={({ navigation }) => ({
          title: 'Your Favorite Places',
          headerRight: ({ tintColor }) => (
            <View style={{ flexDirection: 'row' }}>
              <IconButton
                icon="add"
                color={tintColor}
                size={24}
                onPress={() => navigation.navigate('AddPlace')}
              />
              <IconButton
                icon="logout"
                color={tintColor}
                size={24}
                onPress={async () => {
                  await AsyncStorage.removeItem('token');
                  updateUser({} as User);
                }}
              />
            </View>
          ),
        })}
      />
      <Stack.Screen name="AddPlace" component={AddPlace} options={{ title: 'Add a new Place' }} />
      <Stack.Screen name="Map" component={Map} options={{ title: 'Choose location' }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}

function Screens() {
  const { updateUser } = useAuth();
  const [appIsloading, setAppIsLoading] = useState(true);

  useEffect(() => {
    async function startDb() {
      await dbinit().catch((error) => console.log(error));
    }
    async function getStoredToken() {
      const storedToken = await AsyncStorage.getItem('token'); // USE ENV
      if (storedToken)
        updateUser((currentUserData) => {
          return { ...currentUserData, idToken: storedToken };
        });

      setAppIsLoading(false);
    }
    startDb();
    getStoredToken();
  }, [updateUser]);

  const onLayoutRootView = useCallback(async () => {
    if (!appIsloading) {
      await SplashScreen.hideAsync();
    }
  }, [appIsloading]);

  if (appIsloading) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <Navigation />
    </View>
  );
}

export default Screens;
