document.addEventListener("DOMContentLoaded", () => {
  if (typeof CONFIG !== "undefined") {
    // Carrega o áudio de fundo
    const audioFundo = document.getElementById("audio-fundo");
    if (audioFundo && CONFIG.audioFundo) {
      audioFundo.src = CONFIG.audioFundo;
      
      // Inicia com volume bem baixinho (10%) para a capa
      audioFundo.volume = 0.1;

      // Tenta tocar automaticamente ao carregar
      const promisePlay = audioFundo.play();
      if (promisePlay !== undefined) {
        promisePlay.catch(() => {
          // Se o navegador bloquear o autoplay com som, inicia mudo e ativa no primeiro toque na tela
          audioFundo.muted = true;
          audioFundo.play();

          const ativarSomNoToque = () => {
            audioFundo.muted = false;
            document.removeEventListener("touchstart", ativarSomNoToque);
            document.removeEventListener("click", ativarSomNoToque);
          };

          document.addEventListener("touchstart", ativarSomNoToque, { once: true });
          document.addEventListener("click", ativarSomNoToque, { once: true });
        });
      }
    }

    // Carrega o áudio do envelope
    const audioEnvelope = document.getElementById("audio-envelope");
    if (audioEnvelope && CONFIG.audioEnvelope) {
      audioEnvelope.src = CONFIG.audioEnvelope;
      audioEnvelope.volume = 0.6;
    }

    // Carrega os dados do convite
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

// ABRIR CONVITE (AUMENTA O VOLUME DA MÚSICA E TOCA O EFEITO DO ENVELOPE)
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

  // 2. Transição de telas
  if (telaEnvelope && telaPrincipal) {
    telaEnvelope.style.display = "none";
    telaPrincipal.classList.remove("oculto");
  }

  // 3. Aumenta o volume da música de fundo (de 10% para 35% de forma gradual)
  if (audioFundo) {
    audioFundo.muted = false;
    let vol = audioFundo.volume;
    const fadeInterval = setInterval(() => {
      if (vol < 0.35) {
        vol += 0.03;
        audioFundo.volume = Math.min(vol, 0.35);
      } else {
        clearInterval(fadeInterval);
      }
    }, 150);
  }
}

// PAUSAR O ÁUDIO QUANDO O USUÁRIO MINIMIZAR OU SAIR DA ABA DO NAVEGADOR
document.addEventListener("visibilitychange", () => {
  const audioFundo = document.getElementById("audio-fundo");
  if (!audioFundo) return;

  if (document.hidden) {
    audioFundo.pause();
  } else {
    // Retoma a música caso a tela do convite principal já esteja aberta
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
  const textoMensagem = `Oii Ozy! Recebi o convite, gostaria de confirmar minha presença no aniversário da ${CONFIG.nomeAniversariante}💚.`;
  const mensagemFormatada = encodeURIComponent(textoMensagem);
  window.open(`https://wa.me/${CONFIG.numeroWhatsApp}?text=${mensagemFormatada}`, '_blank');
}