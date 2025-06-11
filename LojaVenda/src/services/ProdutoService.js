import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@produtos';

async function listar() {
  const dados = await AsyncStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

async function inserir(produto) {
  const produtos = await listar();
  produto.id = Date.now();
  produtos.push(produto);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
}

async function atualizar(produto) {
  const produtos = await listar();
  const index = produtos.findIndex(p => p.id === produto.id);
  if (index !== -1) {
    produtos[index] = produto;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(produtos));
  }
}

async function remover(id) {
  const produtos = await listar();
  const novos = produtos.filter(p => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novos));
}

export default {
  listar,
  inserir,
  atualizar,
  remover,
};
