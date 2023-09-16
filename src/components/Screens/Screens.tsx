import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { IconButton } from 'components';
import AddPlace from 'screens/AddPlace';
import Places from 'screens/Places';
import Login from 'screens/Login';
import theme from 'styles/theme';
import { useAuth } from 'hooks';
import { View } from 'react-native';
import { useCallback, useEffect, useState } from 'react';

export type RootStackParamList = {
  Login: undefined;
  Places: undefined;
  AddPlace: undefined;
};

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamList>();

// SET ROOT AUTHENTICATION NAVIGATIONS
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme().colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: theme().colors.primary100 },
      }}>
      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Screen name="Signup" component={SignupScreen} /> */}
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme().colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: theme().colors.primary100 },
      }}>
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
    async function getStoredToken() {
      const storedToken = await AsyncStorage.getItem('token'); // USE ENV
      if (storedToken)
        updateUser((currentUserData) => {
          return { ...currentUserData, idToken: storedToken };
        });

      setAppIsLoading(false);
    }
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
