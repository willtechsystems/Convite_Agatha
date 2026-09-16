document.addEventListener("DOMContentLoaded", () => {
  // Inicialização segura dos dados do config.js
  if (typeof CONFIG !== "undefined") {
    
    // Atualiza imagem do tema (se o elemento existir)
    const imgTema = document.getElementById("img-tema");
    if (imgTema && CONFIG.imagemTema) {
      imgTema.src = CONFIG.imagemTema;
    }

    // Preenche dados do evento
    const txtNome = document.getElementById("txt-nome");
    if (txtNome) txtNome.innerText = CONFIG.nomeAniversariante || "Ágatha";

    const txtIdade = document.getElementById("txt-idade");
    if (txtIdade) txtIdade.innerText = CONFIG.idade || "1 ANO";

    const txtData = document.getElementById("txt-data");
    if (txtData) txtData.innerText = CONFIG.data || "";

    const txtHorario = document.getElementById("txt-horario");
    if (txtHorario) txtHorario.innerText = CONFIG.horario || "";

    const txtLocal = document.getElementById("txt-local");
    if (txtLocal) txtLocal.innerText = CONFIG.local || "";

    // Configura links dos botões
    const linkMaps = document.getElementById("link-maps");
    if (linkMaps && CONFIG.linkMaps) linkMaps.href = CONFIG.linkMaps;

    const linkGrupo = document.getElementById("link-grupo");
    if (linkGrupo && CONFIG.linkGrupoWhatsApp) linkGrupo.href = CONFIG.linkGrupoWhatsApp;
  }
});

// Função para abrir o convite
function abrirConvite() {
  const telaEnvelope = document.getElementById("tela-envelope");
  const telaPrincipal = document.getElementById("tela-principal");

  if (telaEnvelope && telaPrincipal) {
    telaEnvelope.classList.add("oculto");
    telaPrincipal.classList.remove("oculto");
  }
}

// Funções do Modal de Presentes
function abrirModalPresentes() {
  const modal = document.getElementById("modal-presentes");
  const lista = document.getElementById("lista-presentes");

  if (modal && lista && typeof CONFIG !== "undefined" && CONFIG.sugestoesPresentes) {
    lista.innerHTML = "";
    CONFIG.sugestoesPresentes.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      lista.appendChild(li);
    });
    modal.classList.add("ativo");
    modal.style.display = "flex";
  }
}

function fecharModalPresentes() {
  const modal = document.getElementById("modal-presentes");
  if (modal) {
    modal.classList.remove("ativo");
    modal.style.display = "none";
  }
}

// Confirmação via WhatsApp
function confirmarPresenca() {
  if (typeof CONFIG !== "undefined" && CONFIG.numeroWhatsApp) {
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de confirmar minha presença no aniversário da ${CONFIG.nomeAniversariante || "Ágatha"}.`
    );
    window.open(`https://wa.me/${CONFIG.numeroWhatsApp}?text=${mensagem}`, "_blank");
  }
}