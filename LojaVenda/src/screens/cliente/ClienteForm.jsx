import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import ClienteService from '../../services/ClienteService';

export default function ClienteForm({ navigation, route }) {
  const [cliente, setCliente] = useState({
    id: null,
    nome: '',
    email: '',
    telefone: '',
    endereco: '',
    cidade: '',
    cpf: '',
  });

  useEffect(() => {
    if (route.params?.cliente) {
      setCliente(route.params.cliente);
    }
  }, [route.params]);

  const handleChange = (field, value) => {
    setCliente({ ...cliente, [field]: value });
  };

  const salvar = async () => {
    if (cliente.id) {
      await ClienteService.atualizar(cliente);
    } else {
      await ClienteService.inserir(cliente);
    }
    navigation.goBack();
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        label="Nome"
        value={cliente.nome}
        onChangeText={(text) => handleChange('nome', text)}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label="Email"
        value={cliente.email}
        onChangeText={(text) => handleChange('email', text)}
        style={{ marginBottom: 8 }}
        keyboardType="email-address"
      />
     <TextInput
  label="Telefone"
  render={(props) => (
    <TextInputMask
      {...props}
      type={'cel-phone'}
      options={{
        maskType: 'BRL',
        withDDD: true,
        dddMask: '(99) '
      }}
      value={cliente.telefone}
      onChangeText={(text) => handleChange('telefone', text)}
      style={{
        backgroundColor: 'transparent',
        marginBottom: 8,
        fontSize: 16,
        paddingHorizontal: 12,
        height: 56
      }}
      keyboardType="phone-pad"
/>
  )}
/>

      <TextInput
        label="CPF"
        render={(props) => (
          <TextInputMask
            {...props}
            type={'cpf'}
            value={cliente.cpf}
            onChangeText={(text) => handleChange('cpf', text)}
            style={{ backgroundColor: 'transparent', marginBottom: 8, fontSize: 16, paddingHorizontal: 12, height: 56 }}
          />
        )}
      />
      <TextInput
        label="Endereço"
        value={cliente.endereco}
        onChangeText={(text) => handleChange('endereco', text)}
        style={{ marginBottom: 8 }}
      />
      <TextInput
        label="Cidade"
        value={cliente.cidade}
        onChangeText={(text) => handleChange('cidade', text)}
        style={{ marginBottom: 8 }}
      />
      <Button mode="contained" onPress={salvar}>
        Salvar
      </Button>
    </View>
  );
}
