import PedidoService from './PedidoService';
import ClienteService from './ClienteService';
import ProdutoService from './ProdutoService';

function formatarData(dataISO) {
  if (!dataISO) return 'Sem Data';
  const d = new Date(dataISO);
  const dia = d.getDate().toString().padStart(2, '0');
  const mes = (d.getMonth() + 1).toString().padStart(2, '0');
  return `${dia}/${mes}`;
}

async function obterResumoFinanceiro() {
  const pedidos = await PedidoService.listar();
  const clientes = await ClienteService.listar();
  const produtos = await ProdutoService.listar();

  const totalPedidos = pedidos.length;
  const totalClientes = clientes.length;
  const totalProdutos = produtos.length;

  let receitaTotalBRL = 0;

  pedidos.forEach(pedido => {
    const produto = produtos.find(p => p.id === pedido.produtoId);
    if (produto) {
      receitaTotalBRL += pedido.quantidade * produto.preco;
    }
  });

  const receitaPorData = {};
  pedidos.forEach(pedido => {
    const dataFormatada = formatarData(pedido.data);
    const produto = produtos.find(p => p.id === pedido.produtoId);
    if (produto) {
      receitaPorData[dataFormatada] = (receitaPorData[dataFormatada] || 0) + pedido.quantidade * produto.preco;
    }
  });

  // Ordena labels por data - converter para Date para ordenar corretamente
  const labels = Object.keys(receitaPorData).sort((a, b) => {
    // 'DD/MM' -> Date
    const [diaA, mesA] = a.split('/').map(Number);
    const [diaB, mesB] = b.split('/').map(Number);
    return new Date(2025, mesA - 1, diaA) - new Date(2025, mesB - 1, diaB);
  });

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
