import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import ProdutoService from '../../services/ProdutoService';

export default function ProdutoForm({ navigation, route }) {
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState('');
  const [categoria, setCategoria] = useState('');
  const [estoque, setEstoque] = useState('');
  const [fornecedor, setFornecedor] = useState('');

  useEffect(() => {
    if (route.params) {
      const produto = route.params;
      setId(produto.id);
      setNome(produto.nome);
      setDescricao(produto.descricao);
      setPreco(produto.preco.toString());
      setCategoria(produto.categoria);
      setEstoque(produto.estoque.toString());
      setFornecedor(produto.fornecedor);
    }
  }, [route.params]);

  function validarPreco(valor) {
    return /^\d+(\.\d{0,2})?$/.test(valor);
  }

  function validarInteiro(valor) {
    return /^\d+$/.test(valor);
  }

  async function salvar() {
    if (!nome.trim()) {
      Alert.alert('Erro', 'Nome é obrigatório');
      return;
    }
    if (!validarPreco(preco)) {
      Alert.alert('Erro', 'Preço inválido. Use ponto para decimais (ex: 12.50)');
      return;
    }
    if (!categoria.trim()) {
      Alert.alert('Erro', 'Categoria é obrigatória');
      return;
    }
    if (!validarInteiro(estoque)) {
      Alert.alert('Erro', 'Estoque deve ser um número inteiro');
      return;
    }
    if (!fornecedor.trim()) {
      Alert.alert('Erro', 'Fornecedor é obrigatório');
      return;
    }

    const produto = {
      id,
      nome,
      descricao,
      preco: parseFloat(preco),
      categoria,
      estoque: parseInt(estoque),
      fornecedor,
    };

    if (id) {
      await ProdutoService.atualizar(produto);
    } else {
      await ProdutoService.inserir(produto);
    }
    navigation.goBack();
  }

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <TextInput label="Nome" value={nome} onChangeText={setNome} mode="outlined" />
      <TextInput label="Descrição" value={descricao} onChangeText={setDescricao} mode="outlined" multiline />
      <TextInput label="Preço" value={preco} onChangeText={setPreco} keyboardType="decimal-pad" mode="outlined" />
      <TextInput label="Categoria" value={categoria} onChangeText={setCategoria} mode="outlined" />
      <TextInput label="Estoque" value={estoque} onChangeText={setEstoque} keyboardType="numeric" mode="outlined" />
      <TextInput label="Fornecedor" value={fornecedor} onChangeText={setFornecedor} mode="outlined" />
      <Button mode="contained" style={styles.btn} onPress={salvar}>
        Salvar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, backgroundColor: '#fff', flex: 1 },
  btn: { marginTop: 20 },
});
