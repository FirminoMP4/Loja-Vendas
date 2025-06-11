
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@clientes';

async function listar() {
  const dados = await AsyncStorage.getItem(STORAGE_KEY);
  return dados ? JSON.parse(dados) : [];
}

async function buscarPorId(id) {
  const clientes = await listar();
  return clientes.find(c => c.id === id);
}

async function inserir(cliente) {
  const clientes = await listar();
  cliente.id = Date.now();
  clientes.push(cliente);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
}

async function atualizar(cliente) {
  const clientes = await listar();
  const index = clientes.findIndex(c => c.id === cliente.id);
  if (index !== -1) {
    clientes[index] = cliente;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(clientes));
  }
}

async function remover(id) {
  const clientes = await listar();
  const novos = clientes.filter(c => c.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(novos));
}

export default {
  listar,
  buscarPorId,
  inserir,
  atualizar,
  remover,
};
