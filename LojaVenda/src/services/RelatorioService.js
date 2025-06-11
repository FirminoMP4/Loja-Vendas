import PedidoService from './PedidoService';
import ClienteService from './ClienteService';
import ProdutoService from './ProdutoService';

async function obterResumoFinanceiro() {
  const pedidos = await PedidoService.listar();
  const clientes = await ClienteService.listar();
  const produtos = await ProdutoService.listar();

  const totalPedidos = pedidos.length;
  const totalClientes = clientes.length;
  const totalProdutos = produtos.length;

  let receitaTotalBRL = 0;

  // Calcula receita total
  pedidos.forEach(pedido => {
    const produto = produtos.find(p => p.id === pedido.produtoId);
    if (produto) {
      receitaTotalBRL += pedido.quantidade * produto.preco;
    }
  });

  // Calcula receita por data para o gráfico
  const receitaPorData = {};
  pedidos.forEach(pedido => {
    const data = pedido.data || 'Sem Data';
    const produto = produtos.find(p => p.id === pedido.produtoId);
    if (produto) {
      receitaPorData[data] = (receitaPorData[data] || 0) + pedido.quantidade * produto.preco;
    }
  });

  const labels = Object.keys(receitaPorData).sort();
  const dados = labels.map(label => receitaPorData[label]);

  const graficoData = {
    labels,
    datasets: [{ data: dados }],
  };

  return {
    totalPedidos,
    totalClientes,
    totalProdutos,
    receitaTotalBRL,
    graficoData,
  };
}

export default {
  obterResumoFinanceiro,
};
