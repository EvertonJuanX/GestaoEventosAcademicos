document.addEventListener("DOMContentLoaded", () => {
    listarEnderecos();
    
    // Evento para cancelar a edição
    document.getElementById('cancelar-edicao').addEventListener('click', () => {
        document.getElementById('edit-endereco-form').style.display = 'none';
    });

    // Evento para processar a edição do endereço
    document.getElementById('form-edit-endereco').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        await atualizarEndereco();
    });
});

async function listarEnderecos() {
    try {
        const response = await fetch('http://localhost:8080/enderecos');
        if (!response.ok) {
            throw new Error('Erro ao buscar endereços');
        }

        const enderecos = await response.json();
        const eventsContainer = document.querySelector('.events-container');
        eventsContainer.innerHTML = '';

        enderecos.forEach(endereco => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';

            const eventTitle = document.createElement('h3');
            eventTitle.textContent = `${endereco.rua}, ${endereco.numero}`; // Atualizado para rua e número

            const eventDetails = document.createElement('div');
            eventDetails.className = 'event-details';

            const bairroDetail = document.createElement('p');
            bairroDetail.textContent = `Bairro: ${endereco.bairro}`;

            const cidadeDetail = document.createElement('p');
            cidadeDetail.textContent = `Cidade: ${endereco.cidade}`;

            const estadoDetail = document.createElement('p');
            estadoDetail.textContent = `Estado: ${endereco.estado}`;

            const cepDetail = document.createElement('p');
            cepDetail.textContent = `CEP: ${endereco.cep}`;

            const complementoDetail = document.createElement('p');
            complementoDetail.textContent = `Complemento: ${endereco.complemento}`;

            // Botão de editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => abrirFormularioEdicao(endereco); // Abre o formulário de edição

            // Botão de deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deletarEndereco(endereco.id); // Chama a função de deletar

            eventDetails.appendChild(bairroDetail);
            eventDetails.appendChild(cidadeDetail);
            eventDetails.appendChild(estadoDetail);
            eventDetails.appendChild(cepDetail);
            eventDetails.appendChild(complementoDetail);
            eventDetails.appendChild(editButton); // Adiciona o botão de edição


            eventCard.appendChild(eventTitle);
            eventCard.appendChild(eventDetails);

            eventsContainer.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

function abrirFormularioEdicao(endereco) {
    document.getElementById('endereco-id').value = endereco.id; // Preenche o id no formulário
    document.getElementById('rua').value = endereco.rua; // Preenche a rua
    document.getElementById('numero').value = endereco.numero; // Preenche o número
    document.getElementById('bairro').value = endereco.bairro; // Preenche o bairro
    document.getElementById('cidade').value = endereco.cidade; // Preenche a cidade
    document.getElementById('estado').value = endereco.estado; // Preenche o estado
    document.getElementById('cep').value = endereco.cep; // Preenche o CEP
    document.getElementById('complemento').value = endereco.complemento; // Preenche o complemento
    document.getElementById('edit-endereco-form').style.display = 'block'; // Exibe o formulário
}

async function atualizarEndereco() {
    const id = document.getElementById('endereco-id').value;
    const dadosAtualizacao = {
        id: id,
        rua: document.getElementById('rua').value,
        numero: document.getElementById('numero').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        complemento: document.getElementById('complemento').value,
    };

    try {
        const response = await fetch('http://localhost:8080/enderecos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizacao),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar endereço');
        }

        // Atualiza a lista de endereços após a edição
        listarEnderecos();
        document.getElementById('edit-endereco-form').style.display = 'none'; // Esconde o formulário
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function deletarEndereco(id) {
    const confirmacao = confirm('Tem certeza que deseja deletar este endereço?');
    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:8080/enderecos/deletar/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar endereço');
            }

            // Atualiza a lista de endereços após a exclusão
            listarEnderecos();
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}