import {custoHabilidadeGlobal, habilidades, esforco, atributos, status } from './state.js';


const esforcoDisplay = document.getElementById('esforco-display');
const forcaNivelDisplay = document.getElementById('forca-nivel');
const durabilidadeNivelDisplay = document.getElementById('durabilidade-nivel');
const agilidadeNivelDisplay = document.getElementById('agilidade-nivel');
const forcaBtn = document.getElementById('forca-btn');
const durabilidadeBtn = document.getElementById('durabilidade-btn');
const agilidadeBtn = document.getElementById('agilidade-btn');
const habilidadesContainer = document.getElementById('habilidades-container');
const habForca = document.getElementById('hab-forca');
const habDurabilidade = document.getElementById('hab-durabilidade');
const habAgilidade = document.getElementById('hab-agilidade');
const statusVida = document.getElementById('status-vida');
const statusForca = document.getElementById('status-forca');
const statusTenacidade = document.getElementById('status-tenacidade');
const statusVelocidade = document.getElementById('status-velocidade');
const statusIntelecto = document.getElementById('status-intelecto');
export function atualizarTela() {
    // já existente
    esforcoDisplay.textContent = `Esforço Físico: ${Math.floor(esforco)}`;
    forcaNivelDisplay.textContent = atributos.forca.nivel;
    durabilidadeNivelDisplay.textContent = atributos.durabilidade.nivel;
    agilidadeNivelDisplay.textContent = atributos.agilidade.nivel;

    forcaBtn.innerHTML = `Aumentar <span class="cost">${atributos.forca.custo} E.F</span>`;
    durabilidadeBtn.innerHTML = `Aumentar <span class="cost">${atributos.durabilidade.custo} E.F</span>`;
    agilidadeBtn.innerHTML = `Aumentar <span class="cost">${atributos.agilidade.custo} E.F</span>`;

    // atualiza status derivados
    statusVida.textContent = status.vida.toFixed(1);
    statusForca.textContent = status.forca.toFixed(1);
    statusTenacidade.textContent = status.tenacidade.toFixed(1);
    statusVelocidade.textContent = status.velocidade.toFixed(1);
    statusIntelecto.textContent = status.intelecto.toFixed(1);
    atualizarHabilidadesUI()
}

export function atualizarHabilidadesUI() {
  // se nenhuma habilidade desbloqueada, oculta o container
  const algumaDesbloqueada = Object.values(habilidades).some(h => h.desbloqueada && !h.ativa);
  habilidadesContainer.classList.toggle('hidden', !algumaDesbloqueada);

  // controle individual
  habForca.classList.toggle('hidden', !habilidades.forca.desbloqueada || habilidades.forca.ativa);
  habDurabilidade.classList.toggle('hidden', !habilidades.durabilidade.desbloqueada || habilidades.durabilidade.ativa);
  habAgilidade.classList.toggle('hidden', !habilidades.agilidade.desbloqueada || habilidades.agilidade.ativa);
    if (habilidades.forca.desbloqueada && !habilidades.forca.ativa) {
        document.getElementById('btn-hab-forca').textContent = `Comprar (${custoHabilidadeGlobal} E.F)`;
}

    if (habilidades.durabilidade.desbloqueada && !habilidades.durabilidade.ativa) {
        document.getElementById('btn-hab-durabilidade').textContent = `Comprar (${custoHabilidadeGlobal} E.F)`;
}

    if (habilidades.agilidade.desbloqueada && !habilidades.agilidade.ativa) {
        document.getElementById('btn-hab-agilidade').textContent = `Comprar (${custoHabilidadeGlobal} E.F)`;
}
}