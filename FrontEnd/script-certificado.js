//Função para criar eventos
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-certificados");
    const saveButton = document.querySelector(".btn");

    saveButton.addEventListener("click", (e) => {
        e.preventDefault();  // Evita o comportamento padrão de recarregar a página
        
        // Captura os valores do formulário
        const cargaHoraria = document.getElementById("cargaHoraria").value;
        const descricao = document.getElementById("descricao").value;

        // Criação do objeto com os dados do evento
        const certificadoData = {
            cargaHoraria: cargaHoraria,
            descricao: descricao
        };

        // Envia os dados para a API
        fetch("http://localhost:8080/certificados", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(certificadoData)
        })
        .then(response => {
            if (response.ok) {
                alert("Certificado criado com sucesso!");
                window.location.href = "lista-certificado.html";

            } else {
                throw new Error("Erro ao criar o certificado");
            }
        })
        .catch(error => {
            console.error("Erro:", error);
            alert("Erro ao criar o certificado.");
        });
    });
});

//Função para obter eventos
async function getCertificados() {
    try {
        const response = await fetch('http://localhost:8080/certificados'); // URL do seu backend
        if (!response.ok) {
            throw new Error(`Erro ao buscar certificados: ${response.status}`);
        }
        const certificados = await response.json(); // Parse do JSON retornado
        return certificados; // Retorna a lista de eventos
    } catch (error) {
        console.error(error); // Log de erros
        alert("Erro ao carregar eventos. Tente novamente mais tarde."); // Mensagem ao usuário
        return []; // Retorna um array vazio em caso de erro
    }
}


// Função para exibir certificados na página
function exibirCertificados(certificados) {
    const eventsContainer = document.querySelector('.events-container');
    eventsContainer.innerHTML = ''; // Limpa a lista existente

    if (certificados.length === 0) {
        eventsContainer.innerHTML = '<p>Nenhum certificado encontrado.</p>';
        return;
    }

    certificados.forEach(certificado => {
        const eventCard = document.createElement('div');
        eventCard.classList.add('event-card');
        eventCard.innerHTML = `
            <div class="event-details">
            <p><strong>Carga Horaria:</strong> <span id="cargaHoraria-display-${certificado.id}">${certificado.cargaHoraria}</span>
            <input type="text" id="cargaHoraria-${certificado.id}" value="${certificado.cargaHoraria}" style="display:none;" /></p>

            <p><strong>Descricao:</strong> <span id="descricao-display-${certificado.id}">${certificado.descricao}</span>
            <input type="text" id="descricao-${certificado.id}" value="${certificado.descricao}" style="display:none;" /></p>
            </div>
            <br>
            <button onclick="deletarCertificado(${certificado.id})">🗑️ Deletar</button>
            <button onclick="toggleEditAll(${certificado.id})">🖋️Editar </button>
            <button id="atualizar-${certificado.id}" style="display:none;" onclick="atualizarCertificado(${certificado.id})">Atualizar</button>
        `;
        eventsContainer.appendChild(eventCard);
    });

    // Adiciona o evento de clique aos botões de deletar
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', function(event) {
            const certificadoId = event.target.getAttribute('data-id');
            console.log(`ID do certificado clicado: ${certificadoId}`);
            deletarCertificado(certificadoId);
        });
    });
}

// Chama a função para obter certificados e exibi-los na página
getCertificados().then(certificados => {
    exibirCertificados(certificados); // Exibe os certificados na página
});

// Função para alternar entre editar e exibir valores de todos os campos ao mesmo tempo
function toggleEditAll(id) {
    const fields = ['cargaHoraria', 'descricao'];

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
async function atualizarCertificado(id) {
    const certificadoData = {
        id: id,
        cargaHoraria: document.getElementById(`cargaHoraria-${id}`).value.trim(),
        descricao: document.getElementById(`descricao-${id}`).value.trim()
    };

    // Validação dos campos obrigatórios
    if (!certificadoData.cargaHoraria || !certificadoData.descricao) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // Realiza a atualização via PUT
        const response = await fetch(`http://localhost:8080/certificados`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(certificadoData)
        });

        if (!response.ok) throw new Error("Erro ao atualizar certificado.");

        alert("Certificado atualizado com sucesso!");
        const certificadoAtualizado = await getCertificados();
        exibirCertificados(certificadoAtualizado); // Atualiza a lista de certificados após a atualização
    } catch (error) {
        console.error(error);
        alert("Erro ao atualizar certificado.");
    }
}


// Função para deletar certificado
async function deletarCertificado(certificadoId) {
    // Confirmação antes de deletar
    if (window.confirm("Tem certeza que deseja deletar este certificado?")) {
        try {
            console.log(`Tentando deletar o certificado com ID: ${certificadoId}`);
            const response = await fetch(`http://localhost:8080/certificados/deletar/${certificadoId}`, {
                method: 'DELETE',
            });
            console.log('Resposta da requisição:', response); // Log da resposta
            if (!response.ok) {
                throw new Error(`Erro ao deletar certificado: ${response.status}`);
            }
            console.log(`Certificado ${certificadoId} deletado com sucesso.`);
            // Recarrega a página após a exclusão bem-sucedida
            alert("Certificado deletado com sucesso!"); // Alerta de sucesso antes de recarregar
            window.location.reload(); // Recarrega a página para atualizar a lista de eventos
        } catch (error) {
            console.error(`Erro: ${error.message}`);
            alert("Erro ao deletar o certificado. Tente novamente mais tarde."); // Mensagem ao usuário
        }
    }
}
