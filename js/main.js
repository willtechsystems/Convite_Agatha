document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG !== "undefined") {
    // Carrega o áudio
    const audio = document.getElementById("audio-fundo");
    if (audio && CONFIG.audioFundo) {
      audio.src = CONFIG.audioFundo;
      audio.volume = 0;
    }

    // Carrega os textos e links
    const txtNome = document.getElementById("txt-nome");
    if (txtNome) txtNome.innerText = CONFIG.nomeAniversariante || "";

    const txtIdade = document.getElementById("txt-idade");
    if (txtIdade) txtIdade.innerText = CONFIG.idade || "";

    const txtData = document.getElementById("txt-data");
    if (txtData) txtData.innerText = CONFIG.data || "";

    const txtHorario = document.getElementById("txt-horario");
    if (txtHorario) txtHorario.innerText = CONFIG.horario || "";

    const txtLocal = document.getElementById("txt-local");
    if (txtLocal) txtLocal.innerText = CONFIG.local || "";

    const imgTema = document.getElementById("img-tema");
    if (imgTema && CONFIG.imagemTema) imgTema.src = CONFIG.imagemTema;

    const linkMaps = document.getElementById("link-maps");
    if (linkMaps && CONFIG.linkMaps) linkMaps.href = CONFIG.linkMaps;

    const linkGrupo = document.getElementById("link-grupo");
    if (linkGrupo && CONFIG.linkGrupoWhatsApp) linkGrupo.href = CONFIG.linkGrupoWhatsApp;
  }
});

// ABRIR CONVITE
function abrirConvite() {
  const telaEnvelope = document.getElementById("tela-envelope");
  const telaPrincipal = document.getElementById("tela-principal");
  const audio = document.getElementById("audio-fundo");

  if (telaEnvelope && telaPrincipal) {
    telaEnvelope.style.display = "none"; // Garante que o envelope suma
    telaPrincipal.classList.remove("oculto");
  }

  // Tocar Música com Fade-in
  if (audio && audio.src) {
    audio.play().then(() => {
      let volume = 0;
      audio.volume = volume;
      const fadeInterval = setInterval(() => {
        if (volume < 0.6) {
          volume += 0.05;
          audio.volume = Math.min(volume, 0.6);
        } else {
          clearInterval(fadeInterval);
        }
      }, 200);
    }).catch(err => {
      console.log("Autoplay bloqueado pelo navegador:", err);
    });
  }
}

// MODAL DE PRESENTES
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
    modal.style.display = "flex";
  }
}

function fecharModalPresentes() {
  const modal = document.getElementById("modal-presentes");
  if (modal) {
    modal.style.display = "none";
  }
}

// CONFIRMAÇÃO VIA WHATSAPP
function confirmarPresenca() {
  if (typeof CONFIG !== "undefined" && CONFIG.numeroWhatsApp) {
    const mensagem = encodeURIComponent(
      `Olá! Gostaria de confirmar minha presença no aniversário da ${CONFIG.nomeAniversariante || "Ágatha"}.`
    );
    window.open(`https://wa.me/${CONFIG.numeroWhatsApp}?text=${mensagem}`, "_blank");
  }
}