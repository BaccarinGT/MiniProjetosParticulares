

 // =====================================
 // 1. RECUPERANDO OS PEDIDOS
 // =====================================

let pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];


// =====================================
// 2. SELECIONANDO ELEMENTOS DO HTML
// =====================================

const listaPedidos = document.getElementById("lista-pedidos");
const valorTotal = document.getElementById("valor-total");
const pedidoVazio = document.getElementById("pedido-vazio");


// =====================================
// 3. FUNÇÃO PARA EXIBIR OS PEDIDOS
// =====================================

function exibirPedidos() {

    // Verificando se estamos na página de pedidos
    if (!listaPedidos) return;

    // Limpando a lista
    listaPedidos.innerHTML = "";

    // Verificando se existem pedidos
    if (pedidos.length === 0) {

        pedidoVazio.style.display = "block";
        valorTotal.textContent = "0,00";

        return;
    }

    pedidoVazio.style.display = "none";

    let total = 0;

    // Percorrendo os pedidos
    pedidos.forEach(prato => {

        let item = document.createElement("div");

        item.classList.add("item-pedido");

        let nome = document.createElement("h3");
        nome.textContent = prato.nome;

        let preco = document.createElement("p");
        preco.textContent = `R$ ${Number(prato.preco).toFixed(2).replace(".", ",")}`;

        item.appendChild(nome);
        item.appendChild(preco);

        listaPedidos.appendChild(item);

        total += Number(prato.preco);

    });

    // Atualizando o valor total
    valorTotal.textContent = total.toFixed(2).replace(".", ",");

}


// =====================================
// 4. ADICIONANDO PRATOS AO PEDIDO
// =====================================

const botoesAdicionar = document.querySelectorAll(".adicionar");

botoesAdicionar.forEach(botao => {

    botao.addEventListener("click", function () {

        // Capturando nome e preço
        let nome = botao.dataset.nome;
        let preco = Number(botao.dataset.preco);

        // Criando objeto do prato
        let prato = {
            nome: nome,
            preco: preco
        };

        // Adicionando prato à lista
        pedidos.push(prato);

        // Salvando no LocalStorage
        localStorage.setItem("pedidos", JSON.stringify(pedidos));

        // Exibindo no console
        console.log(pedidos);

    });

});


// =====================================
// 5. EXECUTANDO A FUNÇÃO
// =====================================

exibirPedidos();

