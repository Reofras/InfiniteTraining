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
  // Verifica se existe ao menos UMA habilidade desbloqueada e ainda não ativa
  const algumaDesbloqueada = Object.values(habilidades).some(h => h.desbloqueada && !h.ativa);
  habilidadesContainer.classList.toggle('hidden', !algumaDesbloqueada);

  // === FORÇA ===
  const btnForca = document.getElementById('btn-hab-forca');
  if (habilidades.forca.desbloqueada && !habilidades.forca.ativa) {
    habForca.classList.remove('hidden'); // mostra só se desbloqueada
    btnForca.textContent = `Comprar (${custoHabilidadeGlobal} E.F)`;
    btnForca.disabled = false;
  } else {
    habForca.classList.add('hidden'); // oculta se ainda bloqueada ou já ativa
    btnForca.textContent = habilidades.forca.ativa
      ? "Já ativada!"
      : "Desbloqueie a Força nível 5";
    btnForca.disabled = true;
  }

  // === DURABILIDADE ===
  const btnDur = document.getElementById('btn-hab-durabilidade');
  if (habilidades.durabilidade.desbloqueada && !habilidades.durabilidade.ativa) {
    habDurabilidade.classList.remove('hidden');
    btnDur.textContent = `Comprar (${custoHabilidadeGlobal} E.F)`;
    btnDur.disabled = false;
  } else {
    habDurabilidade.classList.add('hidden');
    btnDur.textContent = habilidades.durabilidade.ativa
      ? "Já ativada!"
      : "Desbloqueie a Durabilidade nível 5";
    btnDur.disabled = true;
  }

  // === AGILIDADE ===
  const btnAgi = document.getElementById('btn-hab-agilidade');
  if (habilidades.agilidade.desbloqueada && !habilidades.agilidade.ativa) {
    habAgilidade.classList.remove('hidden');
    btnAgi.textContent = `Comprar (${custoHabilidadeGlobal} E.F)`;
    btnAgi.disabled = false;
  } else {
    habAgilidade.classList.add('hidden');
    btnAgi.textContent = habilidades.agilidade.ativa
      ? "Já ativada!"
      : "Desbloqueie a Agilidade nível 5";
    btnAgi.disabled = true;
  }
}
