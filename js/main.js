document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG !== "undefined") {
    // Carrega o áudio
    const audio = document.getElementById("audio-fundo");
    if (audio && CONFIG.audioFundo) {
      audio.src = CONFIG.audioFundo;
      audio.volume = 0;
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

    // Ajustado para CONFIG.linkGoogleMaps
    const linkMaps = document.getElementById("link-maps");
    if (linkMaps && CONFIG.linkGoogleMaps) linkMaps.href = CONFIG.linkGoogleMaps;
  }
});

// ABRIR CONVITE
function abrirConvite() {
  const telaEnvelope = document.getElementById("tela-envelope");
  const telaPrincipal = document.getElementById("tela-principal");
  const audio = document.getElementById("audio-fundo");

  if (telaEnvelope && telaPrincipal) {
    telaEnvelope.style.display = "none";
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

  // Corrigido para buscar CONFIG.sugestoesPresente (sem 's' no final)
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