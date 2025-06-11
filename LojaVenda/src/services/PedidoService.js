
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@pedidos';

async function listar() {
  const dados = await AsyncStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

async function buscarPorId(id) {
  const pedidos = await listar();
  return pedidos.find(p => p.id === id);
}

async function inserir(pedido) {
  const pedidos = await listar();
  pedido.id = Date.now();
  pedidos.push(pedido);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
}

async function atualizar(pedido) {
  const pedidos = await listar();
  const index = pedidos.findIndex(p => p.id === pedido.id);
  if (index !== -1) {
    pedidos[index] = pedido;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(pedidos));
  }
}

async function remover(id) {
  const pedidos = await listar();
  const novos = pedidos.filter(p => p.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novos));
}

export default {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  remover,
};
