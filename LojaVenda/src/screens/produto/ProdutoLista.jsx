import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, FlatList } from 'react-native';
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

  function renderItem({ item }) {
    return (
      <Card style={styles.card} elevation={3}>
        <Card.Title
          title={item.nome}
          subtitle={`Preço: R$ ${item.preco.toFixed(2)} • Estoque: ${item.estoque}`}
          titleStyle={styles.cardTitle}
          subtitleStyle={styles.cardSubtitle}
          right={(props) => (
            <View style={styles.iconButtons}>
              <IconButton
                {...props}
                icon="pencil"
                color="#6200ee"
                onPress={() => navigation.navigate('ProdutoForm', item)}
                size={24}
              />
              <IconButton
                {...props}
                icon="delete"
                color="#b00020"
                onPress={() => excluir(item.id)}
                size={24}
              />
            </View>
          )}
        />
        <Card.Content style={styles.cardContent}>
          <Text style={styles.text}><Text style={styles.label}>Descrição:</Text> {item.descricao}</Text>
          <Text style={styles.text}><Text style={styles.label}>Categoria:</Text> {item.categoria}</Text>
          <Text style={styles.text}><Text style={styles.label}>Fornecedor:</Text> {item.fornecedor}</Text>
        </Card.Content>
      </Card>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('ProdutoForm')}
        style={styles.btn}
        contentStyle={{ paddingVertical: 8 }}
      >
        Novo Produto
      </Button>

      {produtos.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum produto cadastrado</Text>
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa', padding: 16 },
  btn: {
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#6200ee',
    elevation: 3,
  },
  card: {
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#222',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  iconButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    paddingTop: 0,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  text: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
  },
  label: {
    fontWeight: '600',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
});
