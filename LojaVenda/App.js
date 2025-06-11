import * as React from 'react';

import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StackRoutes from './src/routes/StackRoutes';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Venda em Casa">
    
          <Drawer.Screen name="Venda em Casa" component={StackRoutes} />
        
        </Drawer.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
