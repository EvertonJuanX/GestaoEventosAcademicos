// Função para cadastrar aluno
async function cadastrarAluno() {
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

        // 3. Cadastra o aluno com os IDs de banco e endereço
        const alunoData = {
            nome: document.getElementById("nome-aluno").value,
            cpf: document.getElementById("cpf").value,
            rg: document.getElementById("rg").value,
            dataNasc: document.getElementById("dataNasc").value,
            telefone: document.getElementById("telefone").value,
            email: document.getElementById("email").value,
            matricula: document.getElementById("matricula").value,
            banco: { id: bancoId },
            endereco: { id: enderecoId }
        };

        const alunoResponse = await fetch("http://localhost:8080/alunos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alunoData)
        });

        if (!alunoResponse.ok) throw new Error("Erro ao salvar aluno.");
        alert("Aluno cadastrado com sucesso!");

        // Redireciona para outra página
        window.location.href = "lista-aluno.html";

    } catch (error) {
        console.error(error);
        alert("Erro ao cadastrar. Tente novamente.");
    }
}

// Função para listar alunos
async function listarAlunos() {
    try {
        const response = await fetch("http://localhost:8080/alunos");
        if (!response.ok) throw new Error("Erro ao buscar alunos.");

        const alunos = await response.json();
        const alunosContainer = document.getElementById("alunos-container");

        alunosContainer.innerHTML = ""; // Limpa o container antes de adicionar novos dados

        alunos.forEach((aluno) => {
            const alunoDiv = document.createElement("div");
            alunoDiv.classList.add("aluno");

            alunoDiv.innerHTML = `
                <p><strong>Nome:</strong> <span id="nome-display-${aluno.id}">${aluno.nome}</span>
                <input type="text" id="nome-${aluno.id}" value="${aluno.nome}" style="display:none;" /></p>

                <p><strong>Matrícula:</strong> <span id="matricula-display-${aluno.id}">${aluno.matricula}</span>
                <input type="text" id="matricula-${aluno.id}" value="${aluno.matricula}" style="display:none;" /></p>

                <p><strong>CPF:</strong> <span id="cpf-display-${aluno.id}">${aluno.cpf}</span>
                <input type="text" id="cpf-${aluno.id}" value="${aluno.cpf}" style="display:none;" /></p>

                <p><strong>RG:</strong> <span id="rg-display-${aluno.id}">${aluno.rg}</span>
                <input type="text" id="rg-${aluno.id}" value="${aluno.rg}" style="display:none;" /></p>

                <p><strong>Data de Nascimento:</strong> <span id="dataNasc-display-${aluno.id}">${aluno.dataNasc}</span>
                <input type="text" id="dataNasc-${aluno.id}" value="${aluno.dataNasc}" style="display:none;" /></p>

                <p><strong>Telefone:</strong> <span id="telefone-display-${aluno.id}">${aluno.telefone}</span>
                <input type="text" id="telefone-${aluno.id}" value="${aluno.telefone}" style="display:none;" /></p>

                <p><strong>Email:</strong> <span id="email-display-${aluno.id}">${aluno.email}</span>
                <input type="text" id="email-${aluno.id}" value="${aluno.email}" style="display:none;" /></p>

                <br>
                <button onclick="deletarAluno(${aluno.id})">🗑️ Deletar</button>
                <button onclick="toggleEditAll(${aluno.id})">🖋️Editar </button>
                <button id="atualizar-${aluno.id}" style="display:none;" onclick="atualizarAluno(${aluno.id})">Atualizar</button>
                <hr>
            `;

            alunosContainer.appendChild(alunoDiv);
        });
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar alunos.");
    }
}

// Função para alternar entre editar e exibir valores de todos os campos ao mesmo tempo
function toggleEditAll(id) {
    const fields = ['nome', 'matricula', 'cpf', 'rg', 'dataNasc', 'telefone', 'email'];

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

// Função para atualizar todos os atributos do aluno
async function atualizarAluno(id) {
    const alunoData = {
        id: id,
        nome: document.getElementById(`nome-${id}`).value.trim(),
        matricula: document.getElementById(`matricula-${id}`).value.trim(),
        dataNasc: document.getElementById(`dataNasc-${id}`).value.trim(),
        telefone: document.getElementById(`telefone-${id}`).value.trim(),
        email: document.getElementById(`email-${id}`).value.trim()
    };

    if (!alunoData.nome || !alunoData.matricula || !alunoData.dataNasc || !alunoData.telefone || !alunoData.email) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/alunos`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(alunoData)
        });

        if (!response.ok) throw new Error("Erro ao atualizar aluno.");

        alert("Aluno atualizado com sucesso!");
        listarAlunos(); // Atualiza a lista de alunos após a atualização
    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar aluno.");
    }
}


// Função para deletar aluno
async function deletarAluno(id) {
    const confirmacao = confirm("Tem certeza de que deseja deletar este aluno?");
    if (!confirmacao) return;

    try {
        const response = await fetch(`http://localhost:8080/alunos/deletar/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Erro ao deletar aluno.");

        alert("Aluno deletado com sucesso!");
        listarAlunos();
    } catch (error) {
        console.error(error);
        alert("Erro ao deletar aluno.");
    }
}

// Verifica em qual página o script está sendo executado
document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById("submit-aluno");
    const alunosContainer = document.getElementById("alunos-container");

    // Se o botão de cadastro existir, estamos na página de cadastro
    if (submitButton) {
        submitButton.addEventListener("click", cadastrarAluno);
    }

    // Se o container de alunos existir, estamos na página de listagem
    if (alunosContainer) {
        listarAlunos();
    }
});



