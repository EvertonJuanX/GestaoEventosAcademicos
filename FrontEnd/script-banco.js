document.addEventListener("DOMContentLoaded", () => {
    listarBancos();
    
    // Evento para cancelar a edição
    document.getElementById('cancelar-edicao').addEventListener('click', () => {
        document.getElementById('edit-banco-form').style.display = 'none';
    });

    // Evento para processar a edição do banco
    document.getElementById('form-edit-banco').addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita o comportamento padrão do formulário
        await atualizarBanco();
    });
});

async function listarBancos() {
    try {
        const response = await fetch('http://localhost:8080/bancos');
        if (!response.ok) {
            throw new Error('Erro ao buscar bancos');
        }

        const bancos = await response.json();
        const eventsContainer = document.querySelector('.events-container');
        eventsContainer.innerHTML = '';

        bancos.forEach(banco => {
            const eventCard = document.createElement('div');
            eventCard.className = 'event-card';

            const eventTitle = document.createElement('h3');
            eventTitle.textContent = banco.nomeBanco;

            const eventDetails = document.createElement('div');
            eventDetails.className = 'event-details';

            const contaDetail = document.createElement('p');
            contaDetail.textContent = `Conta: ${banco.numConta}`;

            const agenciaDetail = document.createElement('p');
            agenciaDetail.textContent = `Agência: ${banco.agencia}`;

            const operacaoDetail = document.createElement('p');
            operacaoDetail.textContent = `Operação: ${banco.operacao}`;

            // Botão de editar
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.onclick = () => abrirFormularioEdicao(banco); // Abre o formulário de edição

            // Botão de deletar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Deletar';
            deleteButton.onclick = () => deletarBanco(banco.id); // Chama a função de deletar

            eventDetails.appendChild(contaDetail);
            eventDetails.appendChild(agenciaDetail);
            eventDetails.appendChild(operacaoDetail);
            eventDetails.appendChild(editButton); // Adiciona o botão de edição


            eventCard.appendChild(eventTitle);
            eventCard.appendChild(eventDetails);

            eventsContainer.appendChild(eventCard);
        });
    } catch (error) {
        console.error('Erro:', error);
    }
}

function abrirFormularioEdicao(banco) {
    document.getElementById('banco-id').value = banco.id; // Preenche o id no formulário
    document.getElementById('nomeBanco').value = banco.nomeBanco; // Preenche o nome do banco
    document.getElementById('numConta').value = banco.numConta; // Preenche o número da conta
    document.getElementById('agencia').value = banco.agencia; // Preenche a agência
    document.getElementById('operacao').value = banco.operacao; // Preenche a operação
    document.getElementById('edit-banco-form').style.display = 'block'; // Exibe o formulário
}

async function atualizarBanco() {
    const id = document.getElementById('banco-id').value;
    const dadosAtualizacao = {
        id: id,
        nomeBanco: document.getElementById('nomeBanco').value,
        numConta: document.getElementById('numConta').value,
        agencia: document.getElementById('agencia').value,
        operacao: document.getElementById('operacao').value,
    };

    try {
        const response = await fetch('http://localhost:8080/bancos', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizacao),
        });

        if (!response.ok) {
            throw new Error('Erro ao atualizar banco');
        }

        // Atualiza a lista de bancos após a edição
        listarBancos();
        document.getElementById('edit-banco-form').style.display = 'none'; // Esconde o formulário
    } catch (error) {
        console.error('Erro:', error);
    }
}

async function deletarBanco(id) {
    const confirmacao = confirm('Tem certeza que deseja deletar este banco?');
    if (confirmacao) {
        try {
            const response = await fetch(`http://localhost:8080/bancos/deletar/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error('Erro ao deletar banco');
            }

            // Atualiza a lista de bancos após a exclusão
            listarBancos();
        } catch (error) {
            console.error('Erro:', error);
        }
    }
}