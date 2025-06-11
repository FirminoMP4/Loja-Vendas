import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { List, IconButton, FAB } from 'react-native-paper';
import ClienteService from '../../services/ClienteService';

export default function ClienteLista({ navigation }) {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarDados);
    return unsubscribe;
  }, [navigation]);

  const carregarDados = async () => {
    const dados = await ClienteService.listar();
    setClientes(dados);
  };

  const excluir = async (id) => {
    await ClienteService.remover(id);
    carregarDados();
  };

  const editar = (cliente) => {
    navigation.navigate('ClienteForm', { cliente });
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <List.Item
            title={item.nome}
            description={`CPF: ${item.cpf || '---'}\nEmail: ${item.email}`}
            right={() => (
              <>
                <IconButton icon="pencil" onPress={() => editar(item)} />
                <IconButton icon="delete" onPress={() => excluir(item.id)} />
              </>
            )}
          />
        )}
      />
      <FAB
        icon="plus"
        style={{ position: 'absolute', right: 16, bottom: 16 }}
        onPress={() => navigation.navigate('ClienteForm')}
      />
    </View>
  );
}
