window.addEventListener('DOMContentLoaded', () => {
  document.documentElement.style.setProperty('--bg-start', CONFIG.cores.fundoInicio);
  document.documentElement.style.setProperty('--bg-end', CONFIG.cores.fundoFim);
  document.documentElement.style.setProperty('--primary', CONFIG.cores.destaqueBordas);
  document.documentElement.style.setProperty('--btn-bg', CONFIG.cores.fundoBotoes);
  document.documentElement.style.setProperty('--btn-text', CONFIG.cores.textoBotoes);

  document.getElementById('txt-nome').innerText = CONFIG.nomeAniversariante;
  document.getElementById('txt-idade').innerText = CONFIG.idade;
  document.getElementById('txt-data').innerText = CONFIG.dataExtenso;
  document.getElementById('txt-horario').innerText = CONFIG.horario;
  document.getElementById('txt-local').innerText = `Local: ${CONFIG.localNome}`;

  document.getElementById('img-envelope').src = CONFIG.imagemEnvelope;
  document.getElementById('img-tema').src = CONFIG.imagemTema;
  document.getElementById('link-maps').href = CONFIG.linkGoogleMaps;
  document.getElementById('link-grupo').href = CONFIG.linkGrupoWhatsapp;

  const listaUl = document.getElementById('lista-presentes');
  CONFIG.sugestoesPresente.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    listaUl.appendChild(li);
  });
});

function abrirConvite() {
  document.getElementById('tela-envelope').classList.add('oculto');
  document.getElementById('tela-principal').classList.remove('oculto');
}

function abrirModalPresentes() {
  document.getElementById('modal-presentes').style.display = 'flex';
}

function fecharModalPresentes() {
  document.getElementById('modal-presentes').style.display = 'none';
}

function confirmarPresenca() {
  const mensagem = encodeURIComponent(`Olá! Gostaria de confirmar minha presença no aniversário da ${CONFIG.nomeAniversariante}.`);
  window.open(`https://wa.me/${CONFIG.whatsappNumero}?text=${mensagem}`, '_blank');
}