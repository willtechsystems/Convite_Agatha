document.addEventListener("DOMContentLoaded", () => {
  // Preenche dados do HTML a partir do config.js
  document.getElementById("txt-nome").textContent = CONFIG.nomeAniversariante;
  document.getElementById("txt-idade").textContent = CONFIG.idade;
  document.getElementById("txt-data").textContent = CONFIG.dataExtenso;
  document.getElementById("txt-horario").textContent = CONFIG.horario;
  document.getElementById("txt-local").textContent = CONFIG.localNome;

  // Imagens
  document.getElementById("img-envelope").src = CONFIG.imgEnvelope;
  document.getElementById("img-tema").src = CONFIG.imgTema;

  // Links diretos
  document.getElementById("link-maps").href = CONFIG.linkGoogleMaps;
  document.getElementById("link-grupo").href = CONFIG.linkGrupoWhatsapp;

  // Renderiza lista de presentes
  const listaUl = document.getElementById("lista-presentes");
  listaUl.innerHTML = "";
  CONFIG.sugestoesPresentes.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${item.categoria}:</strong> ${item.detalhe}`;
    listaUl.appendChild(li);
  });
});

// Ação de abrir o convite ao clicar no envelope
function abrirConvite() {
  const telaEnvelope = document.getElementById("tela-envelope");
  const telaPrincipal = document.getElementById("tela-principal");

  telaEnvelope.classList.add("animar-saida");
  
  setTimeout(() => {
    telaEnvelope.style.display = "none";
    telaPrincipal.classList.remove("oculto");
    telaPrincipal.classList.add("animar-entrada");
  }, 500);
}

// Confirmação de Presença via WhatsApp (Tratado e codificado com segurança)
function confirmarPresenca() {
  const mensagem = `Olá! Gostaria de confirmar minha presença no aniversário de ${CONFIG.nomeAniversariante}.\n\nNome(s) dos convidados: `;
  const urlWhatsapp = `https://wa.me/${CONFIG.numeroWhatsappOrganizador}?text=${encodeURIComponent(mensagem)}`;
  window.open(urlWhatsapp, "_blank", "noopener,noreferrer");
}

// Modal de Presentes
function abrirModalPresentes() {
  document.getElementById("modal-presentes").classList.add("ativo");
}

function fecharModalPresentes() {
  document.getElementById("modal-presentes").classList.remove("ativo");
}