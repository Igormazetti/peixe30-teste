import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './src/screens/Login';
import {Dashboard} from './src/screens/Dashboard';
import Toast from 'react-native-toast-message';
import {ReactQueryProvider} from './src/providers/ReactQueryProvider';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <ReactQueryProvider>
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />

          <Stack.Screen
            options={{headerShown: false}}
            name="Dashboard"
            component={Dashboard}
          />
        </Stack.Navigator>
      </ReactQueryProvider>
      <Toast />
    </NavigationContainer>
  );
}

export default App;
