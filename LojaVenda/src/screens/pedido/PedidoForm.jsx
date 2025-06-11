import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
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
    data: new Date().toISOString(),
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

    const pedidoFinal = {
      ...pedido,
      clienteId: pedido.clienteId.toString(),
      produtoId: pedido.produtoId.toString(),
      quantidade: parseFloat(pedido.quantidade),
      data: pedido.data || new Date().toISOString(),
    };

    if (pedidoFinal.id) {
      await PedidoService.atualizar(pedidoFinal);
    } else {
      await PedidoService.inserir(pedidoFinal);
    }

    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.field}>
          <Text style={styles.label} accessibilityRole="header" accessibilityLevel={2}>
            Cliente:
          </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={pedido.clienteId}
              onValueChange={(value) => setPedido({ ...pedido, clienteId: value })}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode="dropdown"
              accessibilityLabel="Selecione o cliente"
              accessibilityHint="Abre lista de clientes para seleção"
            >
              <Picker.Item label="Selecione um cliente" value="" />
              {clientes.map(c => (
                <Picker.Item key={c.id} label={c.nome} value={c.id.toString()} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label} accessibilityRole="header" accessibilityLevel={2}>
            Produto:
          </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={pedido.produtoId}
              onValueChange={(value) => setPedido({ ...pedido, produtoId: value })}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode="dropdown"
              accessibilityLabel="Selecione o produto"
              accessibilityHint="Abre lista de produtos para seleção"
            >
              <Picker.Item label="Selecione um produto" value="" />
              {produtos.map(p => (
                <Picker.Item key={p.id} label={p.nome} value={p.id.toString()} />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label} accessibilityRole="header" accessibilityLevel={2}>
            Quantidade:
          </Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={pedido.quantidade}
              onValueChange={(value) => setPedido({ ...pedido, quantidade: value })}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              mode="dropdown"
              accessibilityLabel="Selecione a quantidade"
              accessibilityHint="Abre lista para selecionar quantidade"
            >
              {[...Array(10)].map((_, i) => (
                <Picker.Item key={i + 1} label={`${i + 1}`} value={`${i + 1}`} />
              ))}
            </Picker>
          </View>
        </View>

        <Button
          mode="contained"
          onPress={salvar}
          style={styles.button}
          accessibilityLabel="Botão salvar pedido"
          accessibilityHint="Salva o pedido e volta para a tela anterior"
          rippleColor="#6200ee"
        >
          Salvar Pedido
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f9f9f9',
  },
  field: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#333',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'white',
    ...Platform.select({
      android: { height: 50 },
      ios: { height: 150 },
    }),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  picker: {
    width: '100%',
    height: '100%',
  },
  pickerItem: {
    fontSize: 16,
  },
  button: {
    marginTop: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
