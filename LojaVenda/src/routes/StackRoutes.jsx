import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ClienteLista from '../screens/cliente/ClienteLista';
import ProdutoLista from '../screens/produto/ProdutoLista';
import PedidoLista from '../screens/pedido/PedidoLista';
import RelatorioScreen from '../screens/RelatorioScreen';

import ProdutoForm from '../screens/produto/ProdutoForm';
import ClienteForm from '../screens/cliente/ClienteForm';
import PedidoForm from '../screens/pedido/PedidoForm';

import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="ClienteLista"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'ClienteLista') iconName = 'account-group';
          else if (route.name === 'ProdutoLista') iconName = 'shopping';
          else if (route.name === 'PedidoLista') iconName = 'clipboard-list';
          else if (route.name === 'Relatorio') iconName = 'chart-bar';

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="ClienteLista" component={ClienteLista} options={{ title: 'Clientes' }} />
      <Tab.Screen name="ProdutoLista" component={ProdutoLista} options={{ title: 'Produtos' }} />
      <Tab.Screen name="PedidoLista" component={PedidoLista} options={{ title: 'Pedidos' }} />
      <Tab.Screen name="Relatorio" component={RelatorioScreen} options={{ title: 'Relatório' }} />
    </Tab.Navigator>
  );
}


function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="Tabs">
      <Drawer.Screen name="Tabs" component={TabRoutes} options={{ headerShown: false }} />
 
    </Drawer.Navigator>
  );
}


export default function StackRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
   
      <Stack.Screen name="DrawerRoutes" component={DrawerRoutes} options={{ headerShown: false }} />
      
    
      <Stack.Screen name="ProdutoForm" component={ProdutoForm} options={{ title: 'Cadastrar / Editar Produto' }} />
      <Stack.Screen name="ClienteForm" component={ClienteForm} options={{ title: 'Cadastrar / Editar Cliente' }} />
      <Stack.Screen name="PedidoForm" component={PedidoForm} options={{ title: 'Cadastrar / Editar Pedido' }} />
    </Stack.Navigator>
  );
}
