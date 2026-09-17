document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG !== "undefined") {
    // Carrega o áudio de fundo
    const audioFundo = document.getElementById("audio-fundo");
    if (audioFundo && CONFIG.audioFundo) {
      audioFundo.src = CONFIG.audioFundo;
      audioFundo.volume = 0;
    }

    // Carrega o áudio do envelope (efeito mágico)
    const audioEnvelope = document.getElementById("audio-envelope");
    if (audioEnvelope && CONFIG.audioEnvelope) {
      audioEnvelope.src = CONFIG.audioEnvelope;
      audioEnvelope.volume = 0.6;
    }

    // Carrega os textos
    const txtNome = document.getElementById("txt-nome");
    if (txtNome) txtNome.innerText = CONFIG.nomeAniversariante || "";

    const txtIdade = document.getElementById("txt-idade");
    if (txtIdade) txtIdade.innerText = CONFIG.idade || "";

    const txtFrase = document.getElementById("txt-frase");
    if (txtFrase) txtFrase.innerText = CONFIG.fraseTema || "";

    const txtData = document.getElementById("txt-data");
    if (txtData) txtData.innerText = CONFIG.dataExtenso || "";

    const txtHorario = document.getElementById("txt-horario");
    if (txtHorario) txtHorario.innerText = CONFIG.horario || "";

    // Exibe Nome da Casa + Endereço
    const txtLocal = document.getElementById("txt-local");
    if (txtLocal) {
      const nomeCasa = CONFIG.localNome ? `<strong>${CONFIG.localNome}</strong><br>` : "";
      const endereco = CONFIG.localEndereco || "";
      txtLocal.innerHTML = nomeCasa + endereco;
    }

    const imgTema = document.getElementById("img-tema");
    if (imgTema && CONFIG.imagemTema) imgTema.src = CONFIG.imagemTema;

    // Link do Google Maps
    const linkMaps = document.getElementById("link-maps");
    if (linkMaps && CONFIG.linkGoogleMaps) linkMaps.href = CONFIG.linkGoogleMaps;
  }
});

// ABRIR CONVITE COM EFEITO E MÚSICA DE FUNDO
function abrirConvite() {
  const telaEnvelope = document.getElementById("tela-envelope");
  const telaPrincipal = document.getElementById("tela-principal");
  const audioFundo = document.getElementById("audio-fundo");
  const audioEnvelope = document.getElementById("audio-envelope");

  // 1. Toca o Efeito Sonoro Mágico do Envelope
  if (audioEnvelope && audioEnvelope.src) {
    audioEnvelope.currentTime = 0;
    audioEnvelope.play().catch(err => console.log("Erro ao tocar efeito do envelope:", err));
  }

  // 2. Esconde o envelope e mostra o convite principal
  if (telaEnvelope && telaPrincipal) {
    telaEnvelope.style.display = "none";
    telaPrincipal.classList.remove("oculto");
  }

  // 3. Toca a Música de Fundo com Fade-in Suave
  if (audioFundo && audioFundo.src) {
    audioFundo.play().then(() => {
      let volume = 0;
      audioFundo.volume = volume;
      const fadeInterval = setInterval(() => {
        if (volume < 0.3) { // Mantém a música num volume de fundo agradável (30%)
          volume += 0.03;
          audioFundo.volume = Math.min(volume, 0.3);
        } else {
          clearInterval(fadeInterval);
        }
      }, 150);
    }).catch(err => {
      console.log("Autoplay bloqueado pelo navegador:", err);
    });
  }
}

// MODAL DE PRESENTES
function abrirModalPresentes() {
  const modal = document.getElementById("modal-presentes");
  const lista = document.getElementById("lista-presentes");

  if (modal && lista && typeof CONFIG !== "undefined" && CONFIG.sugestoesPresente) {
    lista.innerHTML = "";
    CONFIG.sugestoesPresente.forEach(item => {
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
  const textoMensagem = `Oii Ozy! Recebi o convite, gostaria de confirmar minha presença no aniversário da ${CONFIG.nomeAniversariante}💚.`;
  const mensagemFormatada = encodeURIComponent(textoMensagem);
  window.open(`https://wa.me/${CONFIG.numeroWhatsApp}?text=${mensagemFormatada}`, '_blank');
}