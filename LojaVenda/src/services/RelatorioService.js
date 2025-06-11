import PedidoService from './PedidoService';
import ClienteService from './ClienteService';
import ProdutoService from './ProdutoService';

const formatarData = (isoString) => {
  if (!isoString) return 'Sem Data';
  return isoString.split('T')[0]; // yyyy-mm-dd
};

async function obterResumoFinanceiro() {
  const pedidos = await PedidoService.listar();
  const clientes = await ClienteService.listar();
  const produtos = await ProdutoService.listar();

  const totalPedidos = pedidos.length;
  const totalClientes = clientes.length;
  const totalProdutos = produtos.length;

  let receitaTotalBRL = 0;

  pedidos.forEach(pedido => {
    // Comparar IDs como string para evitar erros
    const produto = produtos.find(p => p.id.toString() === pedido.produtoId.toString());
    if (produto) {
      const quantidade = parseFloat(pedido.quantidade);
      const preco = parseFloat(produto.preco);
      receitaTotalBRL += quantidade * preco;
    }
  });

  receitaTotalBRR = parseFloat(receitaTotalBRL.toFixed(2));

  const receitaPorData = {};
  pedidos.forEach(pedido => {
    const data = formatarData(pedido.data);
    const produto = produtos.find(p => p.id.toString() === pedido.produtoId.toString());
    if (produto) {
      const quantidade = parseFloat(pedido.quantidade);
      const preco = parseFloat(produto.preco);
      receitaPorData[data] = (receitaPorData[data] || 0) + quantidade * preco;
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
