
let lista = [];

function calcular() {
  const descricao = document.getElementById("descrição").value.trim();
  const altura = parseFloat(document.getElementById("altura").value.replace(",", "."));
  const largura = parseFloat(document.getElementById("largura").value.replace(",", "."));
  const valor = parseFloat(document.getElementById("valor").value.replace(",", "."));
  const quantidade = parseInt(document.getElementById("quantidade").value);

  if (!descricao || isNaN(altura) || isNaN(largura) || isNaN(valor) || isNaN(quantidade)) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }

  const area = altura * largura;
  const preco = area * valor * quantidade;

  document.getElementById("area").innerText = `Área: ${area.toFixed(3)} m²`;
  document.getElementById("preco").innerText = `Preço: R$ ${preco.toFixed(3)}`;

  // Mostra o botão adicionar
  const btnAdd = document.getElementById("btnAdd");
  btnAdd.style.display = "inline-block";
  btnAdd.dataset.area = area;
  btnAdd.dataset.preco = preco;
  btnAdd.dataset.descricao = descricao;
}


function adicionarLista() {
  const area = parseFloat(document.getElementById("btnAdd").dataset.area);
  const preco = parseFloat(document.getElementById("btnAdd").dataset.preco);
  const descricao = document.getElementById("btnAdd").dataset.descricao;

  const item = { descricao, area, preco };
  lista.push(item);

  atualizarLista();

  document.getElementById("btnAdd").style.display = "none";

  document.getElementById("area").innerText = "Área:";
  document.getElementById("preco").innerText = "Preço:";
}


function atualizarLista() {
  const listaResultados = document.getElementById("listaResultados");
  const totalGeral = document.getElementById("totalGeral");

  listaResultados.innerHTML = "";

  let total = 0;

  lista.forEach((item, index) => {
    total += item.preco;
    listaResultados.innerHTML += `
      <div class="item-lista">
        <p><strong>${index + 1}. ${item.descricao}</strong><br>
        Área: ${item.area.toFixed(3)} m² <br>
        Preço: R$ ${item.preco.toFixed(3)}</p>
        <button class="btn-acao" onclick="editarItem(${index})">Editar</button>
        <button class="btn-acao" onclick="excluirItem(${index})">Excluir</button>
      </div>
    `;
  });

  totalGeral.innerText = `Total Geral: R$ ${total.toFixed(3)}`;
}


function excluir() {
  document.getElementById("descrição").value = "";
  document.getElementById("altura").value = "";
  document.getElementById("largura").value = "";
  document.getElementById("valor").value = "";
  document.getElementById("quantidade").value = "";

  document.getElementById("area").innerText = "Área:";
  document.getElementById("preco").innerText = "Preço:";
  document.getElementById("btnAdd").style.display = "none";
}


function mostrarLista() {
  document.getElementById("listaContainer").style.display = "block";
  document.querySelector(".calculadora").style.display = "none";
  atualizarLista();
}



function voltarCalculadora() {
  document.getElementById("listaContainer").style.display = "none";
  document.querySelector(".calculadora").style.display = "block";
}


function enviarWhatsApp() {
  if (lista.length === 0) {
    alert("A lista está vazia!");
    return;
  }

  let mensagem = "🌟 *Lista de Cálculos* 🌟\n\n";
  let total = 0;

  lista.forEach((item, index) => {
    mensagem += `📋 *Item ${index + 1}* - ${item.descricao}:\n`;
    mensagem += `  - Área: *${item.area.toFixed(3)} m²*\n`;
    mensagem += `  - Preço: *R$ ${item.preco.toFixed(3)}*\n\n`;
    total += item.preco;
  });

  mensagem += `==========================\n`;
  mensagem += `💰 *Total Geral: R$ ${total.toFixed(3)}*`;

  const url = `https://wa.me/5592985228991?text=${encodeURIComponent(mensagem)}`;
  window.open(url, "_blank");
}