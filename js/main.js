import {verificarDesbloqueioHabilidades, comprarHabilidade, esforco, atributos, ganharEsforco, gastarEsforco, salvarProgresso, carregarProgresso, resetarProgresso } from './state.js';
import { atualizarStatus } from './state.js';

import { atualizarTela, atualizarHabilidadesUI} from './ui.js';
let carregando = false;


function treinar() {
    if (carregando) return;
    carregando = true;

    const progressBar = document.getElementById('progress-fill');
    progressBar.style.width = '0%';

    let progresso = 0;
    const duracao = 200;
    const interval = 100;
    const incremento = 100 / (duracao / interval);

    const timer = setInterval(() => {
        progresso += incremento;
        progressBar.style.width = `${Math.min(progresso, 100)}%`;

        if (progresso >= 100) {
            clearInterval(timer);
            progressBar.style.width = '100%';

            ganharEsforco(1);
            atualizarTela();
            carregando = false;

            // Se for o primeiro ponto, desbloqueia os atributos e salva
            if (esforco >= 1 && !localStorage.getItem('atributosDesbloqueados')) {
                localStorage.setItem('atributosDesbloqueados', 'true');
                document.getElementById('stats-container').classList.remove('hidden');
            }
        }
    }, interval);
}


function comprarAtributo(nome) {
  const attr = atributos[nome];
  if (gastarEsforco(attr.custo)) {
    attr.nivel++;
    attr.custo = Math.floor(attr.custo * 1.5);
    atualizarStatus();
    verificarDesbloqueioHabilidades(); // <-- NOVA LINHA
    atualizarTela();
  } else {
    alert("Esforço insuficiente!");
  }
}


// Eventos
document.getElementById('train-btn').addEventListener('click', treinar);
document.getElementById('forca-btn').addEventListener('click', () => comprarAtributo('forca'));
document.getElementById('durabilidade-btn').addEventListener('click', () => comprarAtributo('durabilidade'));
document.getElementById('agilidade-btn').addEventListener('click', () => comprarAtributo('agilidade'));
document.getElementById('btn-hab-forca').addEventListener('click', () => {
  if (comprarHabilidade('forca')) atualizarHabilidadesUI();
});

document.getElementById('btn-hab-durabilidade').addEventListener('click', () => {
  if (comprarHabilidade('durabilidade')) atualizarHabilidadesUI();
});

document.getElementById('btn-hab-agilidade').addEventListener('click', () => {
  if (comprarHabilidade('agilidade')) atualizarHabilidadesUI();
});



// Autosave a cada 2 segundos
setInterval(salvarProgresso, 2000);

window.addEventListener('beforeunload', salvarProgresso);

// =====================
// CONFIGURAÇÕES / RESET
// =====================


const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettings = document.getElementById('close-settings');
const deleteBtn = document.getElementById('delete-progress-btn');

const step1 = document.getElementById('confirm-step1');
const step2 = document.getElementById('confirm-step2');
const confirmInput1 = document.getElementById('confirm-input1');
const confirmInput2 = document.getElementById('confirm-input2');
const confirmBtn1 = document.getElementById('confirm-btn1');
const confirmBtn2 = document.getElementById('confirm-btn2');

// abrir modal
settingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
    step1.classList.add('hidden');
    step2.classList.add('hidden');
});

// Fechar clicando fora da caixa
settingsModal.addEventListener('click', (event) => {
    if (event.target === settingsModal) {
        settingsModal.classList.add('hidden');
        confirmInput1.value = '';
        confirmInput2.value = '';
    }
});


// fechar modal
closeSettings.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
    confirmInput1.value = '';
    confirmInput2.value = '';
});

// mostrar primeira confirmação
deleteBtn.addEventListener('click', () => {
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
});

// confirmar etapa 1
confirmBtn1.addEventListener('click', () => {
    if (confirmInput1.value.trim().toLowerCase() === 'sim') {
        step2.classList.remove('hidden');
    } else {
        alert('Você precisa digitar "SIM" para continuar.');
    }
});

// confirmar etapa 2
confirmBtn2.addEventListener('click', () => {
    if (confirmInput2.value.trim().toUpperCase() === 'DELETAR') {
        localStorage.clear();
        resetarProgresso();
        salvarProgresso();
        document.getElementById('stats-container').classList.add('hidden');
        localStorage.removeItem('atributosDesbloqueados');
        location.reload(); // opcional: manter pra recarregar a tela limpa
    } else {
        alert('Digite "DELETAR" exatamente em maiúsculas para confirmar.');
    }
});


carregarProgresso();
atualizarStatus();
// Se o jogador já desbloqueou os atributos antes, mostra direto
if (localStorage.getItem('atributosDesbloqueados') === 'true') {
    document.getElementById('stats-container').classList.remove('hidden');
}

atualizarTela();
atualizarHabilidadesUI();