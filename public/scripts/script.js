function abrirContainerPlantios() {
    document.getElementById("containerPlantios").style.display = "block";
    document.getElementById("containerColheitas").style.display = "none";
    document.getElementById("containerInsumos").style.display = "none";
}

function abrirContainerColheitas() {
    document.getElementById("containerPlantios").style.display = "none";
    document.getElementById("containerColheitas").style.display = "block";
    document.getElementById("containerInsumos").style.display = "none";
}

function abrirContainerInsumos(){
    document.getElementById("containerPlantios").style.display = "none";
    document.getElementById("containerColheitas").style.display = "none";
    document.getElementById("containerInsumos").style.display = "block";
}

function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = modal.style.display === "none" ? "block" : "none";
    }
}

function abrirModalCad(id) {
    abrirModal(id);
}

function gravarColheita(idPlantio) {
    if (confirm("Confirmar colheita deste plantio?")) {
        window.location.href = `/colheita/add/${idPlantio}`;
    }
}


function abrirContainerPlantios() {
    const containerPlantios = document.getElementById('containerPlantios');
    const containerColheitas = document.getElementById('containerColheitas');
    if (containerPlantios.style.display == 'none'){
        containerPlantios.style.display = 'flex';
        containerColheitas.style.display = 'none';
    } else {
        containerPlantios.style.display = 'none';
        containerColheitas.style.display = 'none';
    }
};

function abrirContainerColheita() {
    const containerPlantios = document.getElementById('containerPlantios');
    const containerColheitas = document.getElementById('containerColheitas');
    if (containerColheitas.style.display == 'none'){
        containerColheitas.style.display = 'flex';
        containerPlantios.style.display = 'none';
    } else {
        containerColheitas.style.display = 'none';
        containerPlantios.style.display = 'none';
    }
};


function abrirModal(id) {
    const modal = document.getElementById(id);
    if (modal.style.display == 'none'){
        modal.style.display = 'flex';

        const idPlantio = id.replace('modalPlantio','');
        const li = document.getElementById(`dadosPlantio${idPlantio}`);
        const form = document.getElementById(`formAlteracaoPlantio${idPlantio}`);

        form.querySelector('input[name="descricao"]').value = li.querySelector('h3').innerText.replace('Plantio: ', '');
        form.querySelector('input[name="quantidade"]').value = li.querySelectorAll('h4')[0].innerText.replace('Quantidade: ', '');
        form.querySelector('select[name="unidade"]').value = li.querySelectorAll('h4')[1].innerText.replace('Unidade: ', '');
        form.querySelector('input[name="dataInicio"]').value = li.querySelectorAll('h4')[2].innerText.replace('Início: ', '');
        form.querySelector('input[name="duracao"]').value = li.querySelectorAll('h4')[3].innerText.replace('Duração: ', '');

    } else {
        modal.style.display = 'none';  
    }
};


function abrirModalCad(idModal) {
    const modal = document.getElementById(idModal);
    if(modal.style.display == 'none'){
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
};

function gravarColheita(idPlantio) {
    const hoje = new Date();
    const data = hoje.toISOString().split('T')[0];

    const body = new URLSearchParams();
    body.append('plantio', idPlantio);
    body.append('data', data);

    fetch('/colheita/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body
    })
    .then(res => {
        if (!res.ok) throw new Error('Erro na requisição'); // trata 404 ou 500
        return res.json();
    })
    .then(data => {
        alert(data.message);
        location.reload();
    })
    .catch(err => {
        console.error(err);
        alert("Erro inesperado ao gravar colheita.");
    });
}
