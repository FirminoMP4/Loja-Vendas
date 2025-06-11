import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { List, IconButton, FAB } from 'react-native-paper';
import PedidoService from '../../services/PedidoService';
import ProdutoService from '../../services/ProdutoService';
import ClienteService from '../../services/ClienteService';

export default function PedidoLista({ navigation }) {
  const [pedidos, setPedidos] = useState([]);
  const [clientesMap, setClientesMap] = useState({});
  const [produtosMap, setProdutosMap] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => carregarDados());
    return unsubscribe;
  }, [navigation]);

  
  async function carregarDados() {
    const pedidos = await PedidoService.listar();
    const clientes = await ClienteService.listar();
    const produtos = await ProdutoService.listar();

    const mapClientes = {};
    clientes.forEach(c => (mapClientes[c.id] = c.nome));
    setClientesMap(mapClientes);

    const mapProdutos = {};
    produtos.forEach(p => (mapProdutos[p.id] = p.nome));
    setProdutosMap(mapProdutos);

    setPedidos(pedidos);
  }

  function excluir(id) {
    Alert.alert('Confirmação', 'Deseja remover este pedido?', [
      { text: 'Cancelar' },
      {
        text: 'Remover',
        onPress: async () => {
          await PedidoService.remover(id);
          carregarDados();
        },
      },
    ]);
  }

  return (
    <View style={styles.container}>
      {pedidos.map(pedido => (
        <List.Item
          key={pedido.id}
          title={`Cliente: ${clientesMap[pedido.clienteId] || 'N/A'}`}
          description={`Produto: ${produtosMap[pedido.produtoId] || 'N/A'} - Quantidade: ${pedido.quantidade}`}
          right={() => (
            <View style={{ flexDirection: 'row' }}>
              <IconButton icon="pencil" onPress={() => navigation.push('PedidoForm', { id: pedido.id })} />
              <IconButton icon="delete" onPress={() => excluir(pedido.id)} />
            </View>
          )}
        />
      ))}

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate('PedidoForm')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
