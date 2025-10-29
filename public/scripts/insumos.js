function renderizarInsumos(insumos) {
    const listaInsumos = document.getElementById("listaInsumosDetalhada");

    if (!listaInsumos) return; 

    let htmlContent = '';

    if (insumos && insumos.length > 0) {
        // Gera o <li> para cada insumo
        htmlContent = insumos.map(insumo => `
            <li>
                <h3>Insumo: ${insumo.descricaoInsumo}</h3>
                <h4>Data de validade: ${insumo.dadoInsumo.dataValidadeInsumo}</h4>
            </li>
        `).join(''); 
    } else {
        htmlContent = '<li>Nenhum insumo registrado para este tipo.</li>';
    }

    // Injeta o HTML
    listaInsumos.innerHTML = htmlContent;
}


// abriContainerInsumos
async function abriContainerInsumos(tipoInsumo) {
    const tituloInsumo = document.getElementById("tituloInsumo");
    if (tituloInsumo) {
        tituloInsumo.textContent = "Insumos " + tipoInsumo;
        tituloInsumo.style.display = 'flex'; 
    }
    
    const lista = document.getElementById("listaInsumosDetalhada");
    if(lista) lista.innerHTML = '<li>Carregando...</li>'; // Feedback visual

    const tiposValidos = ["", "biologico", "quimico", "mecanico"];
    const indice = tiposValidos.indexOf(tipoInsumo); 

    if (indice !== -1) {
        try {
            const url = `/all-insumos`;
            
            const resp = await fetch(url, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // Envia o índice como a propriedade 'tipo'
                body: JSON.stringify({ tipo: indice }) 
            });

            if (!resp.ok) {
                 const erroAPI = await resp.json(); 
                 throw new Error(`Erro na API: ${resp.status}. Mensagem: ${erroAPI.message}`);
            }

            // O controller retorna o array de insumos diretamente
            const dadosInsumos = await resp.json(); 
            
            // RENDERIZAÇÃO
            renderizarInsumos(dadosInsumos); 

        } catch (error) {
            console.error("Houve um erro ao buscar os insumos:", error);
            renderizarInsumos(null); // Limpa ou mostra erro se falhar
        }
    } else {
        console.warn(`Tipo de insumo inválido: ${tipoInsumo}`);
    }
};