// Função para obter matriculas
async function getMatriculas() {
    try {
        const response = await fetch("http://localhost:8080/matriculas");
        if (!response.ok) {
            throw new Error(`Erro ao buscar matrículas: ${response.status}`);
        }
        const matriculas = await response.json();
        return matriculas;
    } catch (error) {
        console.error(error);
        alert("Erro ao carregar matrículas. Tente novamente mais tarde.");
        return [];
    }
}

// Função para exibir cursos na página
function exibirMatriculas(matriculas) {
    const eventsContainer = document.querySelector(".events-container");
    eventsContainer.innerHTML = ""; // Limpa a lista existente

    if (matriculas.length === 0) {
        eventsContainer.innerHTML = "<p>Nenhuma matrícula encontrada.</p>";
        return;
    }

    matriculas.forEach((matricula) => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        eventCard.innerHTML = `
            <div class="event-details">
                <p><strong>Matrícula:</strong> <span id="numMatricula-display-${matricula.id}">${matricula.numMatricula}</span>
                <input type="text" id="numMatricula-${matricula.id}" value="${matricula.numMatricula}" style="display:none;" /></p>

                <p><strong>Período de Ingresso:</strong> <span id="periodoIngresso-display-${matricula.id}">${matricula.periodoIngresso}</span>
                <input type="text" id="periodoIngresso-${matricula.id}" value="${matricula.periodoIngresso}" style="display:none;" /></p>

                <p><strong>Turno:</strong> <span id="turno-display-${matricula.id}">${matricula.turno}</span>
                <input type="text" id="turno-${matricula.id}" value="${matricula.turno}" style="display:none;" /></p>
            </div>
            <br>
            <button onclick="deletarMatricula(${matricula.id})">🗑️ Deletar</button>
            <button onclick="toggleEditAll(${matricula.id})">🖋️Editar </button>
            <button id="atualizar-${matricula.id}" style="display:none;" onclick="atualizarMatricula(${matricula.id})">Atualizar</button>
        `;
        eventsContainer.appendChild(eventCard);
    });

    // Adiciona o evento de clique aos botões de deletar
    document.querySelectorAll(".delete-button").forEach((button) => {
        button.addEventListener("click", function (event) {
            const matriculaId = event.target.getAttribute("data-id");
            console.log(`ID da matricula clicada: ${matriculaId}`);
            deletarMatricula(matriculaId);
        });
    });
}

// Chama a função para obter matriculas e exibi-las na página
getMatriculas().then((matriculas) => {
    exibirMatriculas(matriculas);
});


// Função para alternar entre editar e exibir valores de todos os campos ao mesmo tempo
function toggleEditAll(id) {
    const fields = ['numMatricula', 'periodoIngresso', 'turno'];

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


// Função para atualizar todos os atributos do transporte
async function atualizarMatricula(id) {
    const matriculaData = {
        id: id,
        numMatricula: document.getElementById(`numMatricula-${id}`).value.trim(),
        periodoIngresso: document.getElementById(`periodoIngresso-${id}`).value.trim(),
        turno: document.getElementById(`turno-${id}`).value.trim()
    };

    // Validação dos campos obrigatórios
    if (!matriculaData.numMatricula || !matriculaData.periodoIngresso || !matriculaData.turno) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Realiza a atualização via PUT
        const response = await fetch(`http://localhost:8080/matriculas`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(matriculaData)
        });

        if (!response.ok) throw new Error("Erro ao atualizar matrícula.");

        alert("Matrícula atualizada com sucesso!");
        const matriculaAtualizada = await getMatriculas();
        exibirMatriculas(matriculaAtualizada); // Atualiza a lista de matrículas após a atualização
    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar matrícula.");
    }
}

// Função para deletar matricula
async function deletarMatricula(matriculaId) {
    // Confirmação antes de deletar
    if (window.confirm("Tem certeza que deseja deletar esta matrícula?")) {
        try {
            console.log(`Tentando deletar a matrícula com ID: ${matriculaId}`);
            const response = await fetch(`http://localhost:8080/matriculas/deletar/${matriculaId}`, {
                    method: "DELETE",
                }
            );
            console.log("Resposta da requisição:", response);
            if (!response.ok) {
                throw new Error(`Erro ao deletar matrícula: ${response.status}`);
            }
            console.log(`Matrícula ${matriculaId} deletada com sucesso.`);
            alert("Matrícula deletada com sucesso!");
            window.location.reload();
        } catch (error) {
            console.error(`Erro: ${error.message}`);
            alert("Erro ao deletar a matrícula. Tente novamente mais tarde.");
        }
    }
}