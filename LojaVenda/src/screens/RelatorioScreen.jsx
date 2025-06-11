import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Title, Text, Card, Paragraph } from 'react-native-paper';
import { LineChart } from 'react-native-chart-kit';
import { styles } from '../styles/RelatorioStyles';

import RelatorioService from '../services/RelatorioService';
import { useIsFocused } from '@react-navigation/native';

export default function RelatorioScreen() {
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [receitaTotal, setReceitaTotal] = useState(0);  // mudou aqui
  const [graficoData, setGraficoData] = useState({ labels: [], datasets: [{ data: [] }] });

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      carregarDados();
    }
  }, [isFocused]);

  async function carregarDados() {
    const resumo = await RelatorioService.obterResumoFinanceiro();
    console.log('Resumo do relatório:', resumo);

    setTotalPedidos(resumo.totalPedidos);
    setTotalClientes(resumo.totalClientes);
    setTotalProdutos(resumo.totalProdutos);
    setReceitaTotal(resumo.receitaTotal);  // mudou aqui

    if (resumo.graficoData.labels.length === 0) {
      console.warn('Dados do gráfico vazios, usando dados de teste');
      setGraficoData({
        labels: ['01/06', '02/06', '03/06'],
        datasets: [{ data: [100, 200, 150] }],
      });
    } else {
      setGraficoData(resumo.graficoData);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Title style={{ marginBottom: 16 }}>Relatório Financeiro Completo</Title>

      <View style={styles.cardsContainer}>
        <Card style={styles.card}>
          <Card.Title title="Total de Pedidos" />
          <Card.Content>
            <Paragraph style={styles.number}>{totalPedidos}</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Total de Clientes" />
          <Card.Content>
            <Paragraph style={styles.number}>{totalClientes}</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Total de Produtos" />
          <Card.Content>
            <Paragraph style={styles.number}>{totalProdutos}</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Title title="Receita Total (R$)" />
          <Card.Content>
            <Paragraph style={styles.number}>{(receitaTotal ?? 0).toFixed(2)}</Paragraph>
          </Card.Content>
        </Card>
      </View>

      <Title style={{ marginTop: 24 }}>Receita por Data</Title>
      {graficoData.labels.length === 0 ? (
        <Text>Nenhum dado para exibir no gráfico.</Text>
      ) : (
        <LineChart
          data={graficoData}
          width={Dimensions.get('window').width - 40}
          height={250}
          yAxisLabel="R$ "
          chartConfig={{
            backgroundColor: '#fff',
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: '6', strokeWidth: '2', stroke: '#007AFF' },
          }}
          bezier
          style={{ marginVertical: 16, borderRadius: 16 }}
        />
      )}
    </ScrollView>
  );
}
