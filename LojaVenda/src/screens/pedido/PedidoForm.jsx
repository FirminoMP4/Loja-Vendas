import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';

import PedidoService from '../../services/PedidoService';
import ClienteService from '../../services/ClienteService';
import ProdutoService from '../../services/ProdutoService';

export default function PedidoForm({ navigation, route }) {
  const [pedido, setPedido] = useState({
    id: null,
    clienteId: '',
    produtoId: '',
    quantidade: '1',
  });

  const [clientes, setClientes] = useState([]);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      const listaClientes = await ClienteService.listar();
      setClientes(listaClientes);
      const listaProdutos = await ProdutoService.listar();
      setProdutos(listaProdutos);
    }
    carregarDados();

    if (route.params?.pedido) {
      setPedido(route.params.pedido);
    }
  }, [route.params]);

  const salvar = async () => {
    if (!pedido.clienteId || !pedido.produtoId) {
      Alert.alert('Erro', 'Selecione cliente e produto!');
      return;
    }

    if (pedido.id) {
      await PedidoService.atualizar(pedido);
    } else {
      await PedidoService.inserir(pedido);
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>

      <View style={styles.field}>
        <Text style={styles.label}>Cliente:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={pedido.clienteId}
            onValueChange={(value) => setPedido({ ...pedido, clienteId: value })}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            mode="dropdown"
          >
            <Picker.Item label="Selecione um cliente" value="" />
            {clientes.map(c => (
              <Picker.Item key={c.id} label={c.nome} value={c.id.toString()} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Produto:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={pedido.produtoId}
            onValueChange={(value) => setPedido({ ...pedido, produtoId: value })}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            mode="dropdown"
          >
            <Picker.Item label="Selecione um produto" value="" />
            {produtos.map(p => (
              <Picker.Item key={p.id} label={p.nome} value={p.id.toString()} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Quantidade:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={pedido.quantidade}
            onValueChange={(value) => setPedido({ ...pedido, quantidade: value })}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            mode="dropdown"
          >
            {[...Array(10)].map((_, i) => (
              <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
            ))}
          </Picker>
        </View>
      </View>

      <Button mode="contained" onPress={salvar} style={styles.button}>
        Salvar Pedido
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '600',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    ...Platform.select({
      android: {
        height: 45,
      },
      ios: {
        height: 150, 
      },
    }),
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  pickerItem: {
    fontSize: 16,
  },
  button: {
    marginTop: 10,
  },
});
