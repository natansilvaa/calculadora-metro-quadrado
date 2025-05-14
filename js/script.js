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


let listaCalculos = [];

function adicionarCalculo() {
  const altura = parseFloat(document.getElementById('altura').value);
  const largura = parseFloat(document.getElementById('largura').value);
  const valor = parseFloat(document.getElementById('valor').value);
  const quantidade = parseInt(document.getElementById('quantidade').value);

  if (isNaN(altura) || isNaN(largura) || isNaN(valor) || isNaN(quantidade)) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const area = altura * largura;
  const precoTotal = area * valor * quantidade;

  const calculo = {
    id: Date.now(),
    altura,
    largura,
    valor,
    quantidade,
    area,
    precoTotal
  };

  listaCalculos.push(calculo);
  renderizarLista();
  excluir(); // limpa campos após adicionar
}

function renderizarLista() {
  const lista = document.getElementById('lista-calculos');
  lista.innerHTML = '';

  let precoFinal = 0;

  listaCalculos.forEach(item => {
    precoFinal += item.precoTotal;

    const li = document.createElement('li');
    li.innerHTML = `
      Área: ${item.area.toFixed(3)}m² |
      Quantidade: ${item.quantidade} |
      Valor M²: R$ ${item.valor.toFixed(2)} |
      Preço Total: ${item.precoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 3 })}
      <button onclick="editarCalculo(${item.id})">Editar</button>
      <button onclick="removerCalculo(${item.id})">Excluir</button>
    `;
    lista.appendChild(li);
  });

  document.getElementById('preco-final').innerText = `Preço Final Total: ${precoFinal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 3
  })}`;
}

function removerCalculo(id) {
  listaCalculos = listaCalculos.filter(item => item.id !== id);
  renderizarLista();
}

function editarCalculo(id) {
  const item = listaCalculos.find(i => i.id === id);
  if (!item) return;

  document.getElementById('altura').value = item.altura;
  document.getElementById('largura').value = item.largura;
  document.getElementById('valor').value = item.valor;
  document.getElementById('quantidade').value = item.quantidade;

  removerCalculo(id); // remove da lista para permitir salvar novamente
}
