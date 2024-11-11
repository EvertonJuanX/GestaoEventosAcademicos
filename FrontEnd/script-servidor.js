// Função para cadastrar servidor
async function cadastrarServidor() {
    try {
        // 1. Cadastra o banco e obtém o ID
        const bancoData = {
            nomeBanco: document.getElementById("nomeBanco").value,
            numConta: document.getElementById("numConta").value,
            agencia: document.getElementById("agencia").value,
            operacao: document.getElementById("operacao").value
        };

        const bancoResponse = await fetch("http://localhost:8080/bancos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bancoData)
        });

        if (!bancoResponse.ok) throw new Error("Erro ao salvar banco.");
        const banco = await bancoResponse.json();
        const bancoId = banco.id;

        // 2. Cadastra o endereço e obtém o ID
        const enderecoData = {
            rua: document.getElementById("rua").value,
            numero: document.getElementById("numero").value,
            bairro: document.getElementById("bairro").value,
            cidade: document.getElementById("cidade").value,
            estado: document.getElementById("estado").value,
            cep: document.getElementById("cep").value,
            complemento: document.getElementById("complemento").value
        };

        const enderecoResponse = await fetch("http://localhost:8080/enderecos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(enderecoData)
        });

        if (!enderecoResponse.ok) throw new Error("Erro ao salvar endereço.");
        const endereco = await enderecoResponse.json();
        const enderecoId = endereco.id;

        // 3. Cadastra o servidor com os IDs de banco e endereço
        const servidorData = {
            nome: document.getElementById("nome-servidor").value,
            cpf: document.getElementById("cpf").value,
            rg: document.getElementById("rg").value,
            dataNasc: document.getElementById("dataNasc").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            siape: document.getElementById("siape").value,
            cargo: document.getElementById("cargo").value,
            banco: { id: bancoId },
            endereco: { id: enderecoId }
        };

        const servidorResponse = await fetch("http://localhost:8080/servidores", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(servidorData)
        });

        if (!servidorResponse.ok) throw new Error("Erro ao salvar servidor.");
        alert("servidor cadastrado com sucesso!");

        // Redireciona para outra página
        window.location.href = "lista-servidor.html";  
        

    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar. Tente novamente.");
    }
}

// Função para listar servidor
async function listarServidores() {
    try {
        const response = await fetch("http://localhost:8080/servidores");
        if (!response.ok) throw new Error("Erro ao buscar servidores.");

        const servidores = await response.json();
        const servidoresContainer = document.getElementById("servidores-container");

        servidoresContainer.innerHTML = ""; // Limpa o container antes de adicionar novos dados

        servidores.forEach((servidor) => {
            const servidorDiv = document.createElement("div");
            servidorDiv.classList.add("servidor");

            servidorDiv.innerHTML = `
                <p><strong>Nome:</strong> <span id="nome-display-${servidor.id}">${servidor.nome}</span>
                <input type="text" id="nome-${servidor.id}" value="${servidor.nome}" style="display:none;" /></p>

                <p><strong>Siape:</strong> <span id="siape-display-${servidor.id}">${servidor.siape}</span>
                <input type="text" id="siape-${servidor.id}" value="${servidor.siape}" style="display:none;" /></p>

		<p><strong>Cargo:</strong> <span id="cargo-display-${servidor.id}">${servidor.cargo}</span>
                <input type="text" id="cargo-${servidor.id}" value="${servidor.cargo}" style="display:none;" /></p>

                <p><strong>CPF:</strong> <span id="cpf-display-${servidor.id}">${servidor.cpf}</span>
                <input type="text" id="cpf-${servidor.id}" value="${servidor.cpf}" style="display:none;" /></p>

                <p><strong>RG:</strong> <span id="rg-display-${servidor.id}">${servidor.rg}</span>
                <input type="text" id="rg-${servidor.id}" value="${servidor.rg}" style="display:none;" /></p>

                <p><strong>Data de Nascimento:</strong> <span id="dataNasc-display-${servidor.id}">${servidor.dataNasc}</span>
                <input type="text" id="dataNasc-${servidor.id}" value="${servidor.dataNasc}" style="display:none;" /></p>

                <p><strong>Telefone:</strong> <span id="telefone-display-${servidor.id}">${servidor.telefone}</span>
                <input type="text" id="telefone-${servidor.id}" value="${servidor.telefone}" style="display:none;" /></p>

                <p><strong>Email:</strong> <span id="email-display-${servidor.id}">${servidor.email}</span>
                <input type="text" id="email-${servidor.id}" value="${servidor.email}" style="display:none;" /></p>

                <br>
                <button onclick="deletarAluno(${servidor.id})">🗑️ Deletar</button>
                <button onclick="toggleEditAll(${servidor.id})">🖋️Editar </button>
                <button id="atualizar-${servidor.id}" style="display:none;" onclick="atualizarServidor(${servidor.id})">Atualizar</button>
                <hr>
            `;

            servidoresContainer.appendChild(servidorDiv);
        });
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar servidores.");
    }
}

// Função para alternar entre editar e exibir valores de todos os campos ao mesmo tempo
function toggleEditAll(id) {
    const fields = ['nome', 'siape','cargo', 'cpf', 'rg', 'dataNasc', 'telefone', 'email'];

    fields.forEach(field => {
        const inputField = document.getElementById(`${field}-${id}`);
        const displayField = document.getElementById(`${field}-display-${id}`);
        const atualizarButton = document.getElementById(`atualizar-${id}`);

        if (inputField.style.display === "none") {
            inputField.style.display = "inline";
            inputField.value = displayField.textContent; // Preenche o input com o valor atual
            displayField.style.display = "none"; // Oculta o valor exibido
        } else {
            inputField.style.display = "none";
            displayField.style.display = "inline"; // Mostra o valor exibido
        }

        atualizarButton.style.display = "inline"; // Mostra o botão de atualizar
    });
}

// Função para atualizar todos os atributos do servidor
async function atualizarServidor(id) {
    const servidorData = {
        id: id,
        nome: document.getElementById(`nome-${id}`).value.trim(),
        siape: document.getElementById(`siape-${id}`).value.trim(),
	    cargo: document.getElementById(`cargo-${id}`).value.trim(),
        dataNasc: document.getElementById(`dataNasc-${id}`).value.trim(),
        telefone: document.getElementById(`telefone-${id}`).value.trim(),
        email: document.getElementById(`email-${id}`).value.trim()
    };

    if (!servidorData.nome || !servidorData.siape || !servidorData.cargo || !servidorData.dataNasc || !servidorData.telefone || !servidorData.email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/servidores`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(servidorData)
        });

        if (!response.ok) throw new Error("Erro ao atualizar servidor.");

        alert("Servidor atualizado com sucesso!");
        listarServidores(); // Atualiza a lista de servidores após a atualização
    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar servidor.");
    }
}

// Função para deletar servidor
async function deletarServidor(id) {
    const confirmacao = confirm("Tem certeza de que deseja deletar este servidor?");
    if (!confirmacao) return;

    try {
        const response = await fetch(`http://localhost:8080/servidores/deletar/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Erro ao deletar servidor.");

        alert("Servidor deletado com sucesso!");
        listarServidores();
    } catch (error) {
        console.error(error);
        alert("Erro ao deletar servidor.");
    }
}

// Verifica em qual página o script está sendo executado
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit-servidor");
    const servidoresContainer = document.getElementById("servidores-container");

    // Se o botão de cadastro existir, estamos na página de cadastro
    if (submitButton) {
        submitButton.addEventListener("click", cadastrarServidor);
    }

    // Se o container de alunos existir, estamos na página de listagem
    if (servidoresContainer) {
        listarServidores();
    }
});
