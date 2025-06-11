import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { TextInputMask } from 'react-native-masked-text';
import ClienteService from '../../services/ClienteService';

function MaskedField({ label, value, onChangeText, type, options }) {
  return (
    <View style={styles.maskedContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInputMask
        type={type}
        options={options}
        value={value}
        onChangeText={onChangeText}
        style={styles.maskedInput}
        keyboardType={type === 'cpf' || type === 'cel-phone' ? 'numeric' : 'default'}
      />
    </View>
  );
}

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
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Nome"
        value={cliente.nome}
        onChangeText={(text) => handleChange('nome', text)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Email"
        value={cliente.email}
        onChangeText={(text) => handleChange('email', text)}
        style={styles.input}
        keyboardType="email-address"
        mode="outlined"
      />

      <MaskedField
        label="Telefone"
        type="cel-phone"
        options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
        value={cliente.telefone}
        onChangeText={(text) => handleChange('telefone', text)}
      />

      <MaskedField
        label="CPF"
        type="cpf"
        value={cliente.cpf}
        onChangeText={(text) => handleChange('cpf', text)}
      />

      <TextInput
        label="Endereço"
        value={cliente.endereco}
        onChangeText={(text) => handleChange('endereco', text)}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Cidade"
        value={cliente.cidade}
        onChangeText={(text) => handleChange('cidade', text)}
        style={styles.input}
        mode="outlined"
      />

      <Button mode="contained" onPress={salvar} style={styles.button}>
        Salvar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  maskedContainer: {
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
    fontWeight: '600',
  },
  maskedInput: {
    height: 56,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 16,
  },
});
