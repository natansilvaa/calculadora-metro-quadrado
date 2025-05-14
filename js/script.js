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


    function adicionarLista() {
      const altura = parseFloat(document.getElementById('altura').value);
      const largura = parseFloat(document.getElementById('largura').value);
      const valor = parseFloat(document.getElementById('valor').value);
      const quantidade = parseInt(document.getElementById('quantidade').value);

      if (isNaN(altura) || isNaN(largura) || isNaN(valor) || isNaN(quantidade)) {
        alert("Preencha todos os campos corretamente antes de adicionar.");
        return;
      }

      const area = altura * largura;
      const precoTotal = area * valor * quantidade;

      lista.push({ altura, largura, valor, quantidade, area, precoTotal });
      alert("Cálculo adicionado à lista!");
    }

    function mostrarLista() {
      const container = document.getElementById('listaContainer');
      const listaResultados = document.getElementById('listaResultados');
      listaResultados.innerHTML = '';
      let totalGeral = 0;

      lista.forEach((item, index) => {
        totalGeral += item.precoTotal;

        const div = document.createElement('div');
        div.classList.add('item-lista');
        div.innerHTML = `
          <div>
            Altura: ${item.altura.toFixed(2)}<br>
            Largura: ${item.largura.toFixed(2)}<br>
            Valor: R$ ${item.valor.toFixed(3)}<br>
            Quantidade: ${item.quantidade}<br>
            Área: ${item.area.toFixed(3)} m²<br>
            Preço: R$ ${item.precoTotal.toFixed(3)}
          </div>
          <div>
            <button class="btn-editar" onclick="editarItem(${index})">Editar</button>
            <button class="btn-excluir" onclick="excluirItem(${index})">Excluir</button>
          </div>
        `;
        listaResultados.appendChild(div);
      });

      document.getElementById('totalGeral').innerText = `Total Geral: R$ ${totalGeral.toFixed(3)}`;
      container.style.display = 'block';
    }

    function excluirItem(index) {
      if (confirm("Deseja realmente excluir este item?")) {
        lista.splice(index, 1);
        mostrarLista();
      }
    }

    function editarItem(index) {
      const item = lista[index];
      document.getElementById('altura').value = item.altura;
      document.getElementById('largura').value = item.largura;
      document.getElementById('valor').value = item.valor;
      document.getElementById('quantidade').value = item.quantidade;
      lista.splice(index, 1);
      mostrarLista();
      window.scrollTo(0, 0);
    }

    function enviarWhatsApp() {
      if (lista.length === 0) {
        alert("A lista está vazia.");
        return;
      }

      let texto = "Lista de Cálculos:\n";
      let total = 0;
      lista.forEach((item, i) => {
        texto += `\nItem ${i + 1}:\nAltura: ${item.altura.toFixed(2)}\nLargura: ${item.largura.toFixed(2)}\nValor: R$ ${item.valor.toFixed(3)}\nQuantidade: ${item.quantidade}\nÁrea: ${item.area.toFixed(3)} m²\nPreço: R$ ${item.precoTotal.toFixed(3)}\n`;
        total += item.precoTotal;
      });

      texto += `\nTotal Geral: R$ ${total.toFixed(3)}`;

      const numeroWhatsApp = '5599999999999'; // Substitua pelo seu número com DDI
      const link = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
      window.open(link, '_blank');
/*
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
*/