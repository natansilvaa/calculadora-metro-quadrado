
  let lista = [];

  function calcular() {
    const altura = parseFloat(document.getElementById("altura").value.replace(",", "."));
    const largura = parseFloat(document.getElementById("largura").value.replace(",", "."));
    const valor = parseFloat(document.getElementById("valor").value.replace(",", "."));
    const quantidade = parseInt(document.getElementById("quantidade").value);

    if (isNaN(altura) || isNaN(largura) || isNaN(valor) || isNaN(quantidade)) {
      alert("Por favor, preencha todos os campos corretamente.");
      return;
    }

    const area = altura * largura;
    const preco = area * valor * quantidade;

    document.getElementById("area").innerText = `Área: ${area.toFixed(2)} m²`;
    document.getElementById("preco").innerText = `Preço: R$ ${preco.toFixed(2)}`;
    
    // Mostra o botão adicionar
    document.getElementById("btnAdd").style.display = "inline-block";

    // Armazena temporariamente os dados
    document.getElementById("btnAdd").dataset.area = area;
    document.getElementById("btnAdd").dataset.preco = preco;
  }

  function adicionarLista() {
    const area = parseFloat(document.getElementById("btnAdd").dataset.area);
    const preco = parseFloat(document.getElementById("btnAdd").dataset.preco);

    const item = { area, preco };
    lista.push(item);

    atualizarLista();

    // Oculta botão após adicionar
    document.getElementById("btnAdd").style.display = "none";
    
    // Limpa resultados atuais
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
          <p>${index + 1}. Área: ${item.area.toFixed(2)} m² | Preço: R$ ${item.preco.toFixed(2)}</p>
        </div>
      `;
    });

    totalGeral.innerText = `Total Geral: R$ ${total.toFixed(2)}`;
  }

  function excluir() {
    // Limpa campos e resultados
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

    let mensagem = "Lista de Cálculos:\n";
    let total = 0;

    lista.forEach((item, index) => {
      mensagem += `${index + 1}. Área: ${item.area.toFixed(2)} m² | Preço: R$ ${item.preco.toFixed(2)}\n`;
      total += item.preco;
    });

    mensagem += `\nTotal Geral: R$ ${total.toFixed(2)}`;

    const url = `https://wa.me/5592985228991?text=${123}`;
    window.open(url, "_blank");
  }