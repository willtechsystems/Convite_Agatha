document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG !== "undefined") {
    // 1. Vincula as fontes de áudio aos elementos
    const audioFundo = document.getElementById("audio-fundo");
    if (audioFundo && CONFIG.audioFundo) {
      audioFundo.src = CONFIG.audioFundo;

      // Limita o tempo do loop se estiver configurado
      if (CONFIG.tempoMaximoAudioSegundos) {
        audioFundo.addEventListener("timeupdate", () => {
          if (audioFundo.currentTime >= CONFIG.tempoMaximoAudioSegundos) {
            audioFundo.currentTime = 0;
            audioFundo.play().catch(e => console.log("Erro no loop:", e));
          }
        });
      }
    }

    const audioEnvelope = document.getElementById("audio-envelope");
    if (audioEnvelope && CONFIG.audioEnvelope) {
      audioEnvelope.src = CONFIG.audioEnvelope;
      audioEnvelope.volume = 0.6;
    }

    // 2. Preenche os campos do convite
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

    const txtLocal = document.getElementById("txt-local");
    if (txtLocal) {
      const nomeCasa = CONFIG.localNome ? `<strong>${CONFIG.localNome}</strong><br>` : "";
      const endereco = CONFIG.localEndereco || "";
      txtLocal.innerHTML = nomeCasa + endereco;
    }

    const imgTema = document.getElementById("img-tema");
    if (imgTema && CONFIG.imagemTema) imgTema.src = CONFIG.imagemTema;

    const linkMaps = document.getElementById("link-maps");
    if (linkMaps && CONFIG.linkGoogleMaps) linkMaps.href = CONFIG.linkGoogleMaps;
  }
});

// ABRIR CONVITE (EXECUTA SOM E NAVEGAÇÃO AO CLICAR)
function abrirConvite() {
  const telaEnvelope = document.getElementById("tela-envelope");
  const telaPrincipal = document.getElementById("tela-principal");
  const audioFundo = document.getElementById("audio-fundo");
  const audioEnvelope = document.getElementById("audio-envelope");

  // 1. Toca o efeito do envelope
  if (audioEnvelope) {
    audioEnvelope.currentTime = 0;
    audioEnvelope.play().catch(err => console.log("Erro ao tocar efeito do envelope:", err));
  }

  // 2. Toca a música de fundo e ajusta o volume de forma garantida
  if (audioFundo) {
    audioFundo.muted = false;
    audioFundo.currentTime = 0;
    audioFundo.volume = 0.35; // Volume a 35%
    audioFundo.play().catch(err => console.log("Erro ao iniciar música de fundo:", err));
  }

  // 3. Transição das telas via classes CSS
  if (telaEnvelope && telaPrincipal) {
    telaEnvelope.classList.add("oculto");
    telaPrincipal.classList.remove("oculto");
  }
}

// PAUSA O ÁUDIO AO MINIMIZAR / ALTERAR ABA
document.addEventListener("visibilitychange", () => {
  const audioFundo = document.getElementById("audio-fundo");
  if (!audioFundo) return;

  if (document.hidden) {
    audioFundo.pause();
  } else {
    const telaPrincipal = document.getElementById("tela-principal");
    if (telaPrincipal && !telaPrincipal.classList.contains("oculto")) {
      audioFundo.play().catch(err => console.log("Erro ao retomar áudio:", err));
    }
  }
});

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
  if (typeof CONFIG !== "undefined" && CONFIG.numeroWhatsApp) {
    const textoMensagem = `Oii Ozy! Recebi o convite, gostaria de confirmar minha presença no aniversário da ${CONFIG.nomeAniversariante}💚.`;
    const mensagemFormatada = encodeURIComponent(textoMensagem);
    window.open(`https://wa.me/${CONFIG.numeroWhatsApp}?text=${mensagemFormatada}`, '_blank');
  }
}