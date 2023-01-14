import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ToDo from './src/screens/ToDo';
import Done from './src/screens/Done';
import Tache from './src/screens/Tache';
import Home from './src/screens/Home';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={
        ({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'A faire') {
              iconName = 'clipboard-list';
              size = focused ? 25 : 20;
            } else if (route.name === 'Fait') {
              iconName = 'clipboard-check';
              size = focused ? 25 : 20;
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: '#0080ff',
          tabBarInactiveTintColor: '#777777',
          tabBarLabelStyle: { fontSize: 15, fontWeight: 'bold' }
        })
       
      }
      
    >
      <Tab.Screen name={'A faire'} component={ToDo} />
      <Tab.Screen name={'Fait'} component={Done} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerTitreAlign: 'center',
            headerStyle: {
              backgroundColor: '#0080ff'
            },
            headerTintColor: '#ffffff',
            headerTitreStyle: {
              fontSize: 25,
              fontWeight: 'bold'
            }
          }}
        >
          <RootStack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: false,
            }}
          />
          <RootStack.Screen
            name="Mes Taches"
            component={HomeTabs}
          />
          <RootStack.Screen
            name="Tache"
            component={Tache}
          />
          
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}

export default App;