
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, Card, IconButton, Text } from 'react-native-paper';
import ProdutoService from '../../services/ProdutoService';



export default function ProdutoLista({ navigation }) {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarProdutos);
    return unsubscribe;
  }, [navigation]);

  async function carregarProdutos() {
    const data = await ProdutoService.listar();
    setProdutos(data);
  }

  function excluir(id) {
    Alert.alert('Confirmação', 'Deseja realmente excluir este produto?', [
      { text: 'Cancelar' },
      {
        text: 'Excluir',
        onPress: async () => {
          await ProdutoService.remover(id);
          carregarProdutos();
        },
        style: 'destructive',
      },
    ]);
  }

  return (
    <View style={styles.container}>
      <Button mode="contained" onPress={() => navigation.navigate('ProdutoForm')} style={styles.btn}>
        Novo Produto
      </Button>

      {produtos.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum produto cadastrado</Text>
      ) : (
        produtos.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Title
              title={item.nome}
              subtitle={`Preço: R$ ${item.preco.toFixed(2)} - Estoque: ${item.estoque}`}
              right={(props) => (
                <>
                  <IconButton {...props} icon="pencil" onPress={() => navigation.navigate('ProdutoForm', item)} />
                  <IconButton {...props} icon="delete" onPress={() => excluir(item.id)} />
                </>
              )}
            />
            <Card.Content>
              <Text>Descrição: {item.descricao}</Text>
              <Text>Categoria: {item.categoria}</Text>
              <Text>Fornecedor: {item.fornecedor}</Text>
            </Card.Content>
          </Card>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  btn: { marginBottom: 10 },
  card: { marginBottom: 10 },
});
