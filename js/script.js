function calcular() {
  const altura = parseFloat(document.getElementById('altura').value);
  const largura = parseFloat(document.getElementById('largura').value);
  const valor = parseFloat(document.getElementById('valor').value);
  const quantidade = parseInt(document.getElementById('quantidade').value);

  if (isNaN(altura) || isNaN(largura) || isNaN(valor) || isNaN(quantidade)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }
  const area = altura * largura;
  const precoTotal = area * valor * quantidade;

  // Formatar a área com 3 casas decimais
  document.getElementById('area').innerText = `Área : ${area.toFixed(3   )}m²`;

  // Formatar o preço total com 3 casas decimais e com a moeda brasileira
  document.getElementById('preco').innerText = `Preço Total : ${precoTotal.toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL',
    minimumFractionDigits: 3,  // Define 3 casas decimais mínimas
    maximumFractionDigits: 3   // Define 3 casas decimais máximas
  })}`;
}

function excluir() {
  document.getElementById('altura').value = '';
  document.getElementById('largura').value = '';
  document.getElementById('valor').value = '';
  document.getElementById('quantidade').value = '';
  document.getElementById('area').innerText = 'Área : 0m²';
  document.getElementById('preco').innerText = 'Preço Total : R$ 0,00';
}
