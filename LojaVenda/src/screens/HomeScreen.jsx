
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Title } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Title>Bem-vindo ao App de Vendas Caseiras</Title>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate('ProdutoLista')}>
        Produtos
      </Button>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate('ClienteLista')}>
        Clientes
      </Button>
      <Button mode="contained" style={styles.btn} onPress={() => navigation.navigate('PedidoLista')}>
        Pedidos
      </Button>
      <Button mode="outlined" style={styles.btn} onPress={() => navigation.navigate('Relatorio')}>
        Relatório de Vendas
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  btn: { marginTop: 15 },
});
