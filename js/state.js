export let esforco = 0;
export let atributosDesbloqueados = localStorage.getItem('atributosDesbloqueados') === 'true';
export let habilidadesDesbloqueadas = localStorage.getItem('habilidadesDesbloqueadas') === 'true';

export const atributos = {
    forca: { nivel: 1, custo: 3 },
    durabilidade: { nivel: 1, custo: 3 },
    agilidade: { nivel: 1, custo: 3 }
};

export function ganharEsforco(valor) {
    esforco += valor;
}

export function gastarEsforco(valor) {
    if (esforco >= valor) {
        esforco -= valor;
        return true;
    }
    return false;
}

export function resetarProgresso() {
    esforco = 0;
    for (let key in atributos) {
        atributos[key].nivel = 1;
        atributos[key].custo = 3;
    }
}


export function salvarProgresso() {
    const save = {
        esforco,
        atributos
    };
    localStorage.setItem('saveGame', JSON.stringify(save));
}

export function carregarProgresso() {
    const saveData = localStorage.getItem('saveGame');
    if (saveData) {
        const data = JSON.parse(saveData);
        esforco = data.esforco || 0;

        for (let key in atributos) {
            if (data.atributos[key]) {
                atributos[key].nivel = data.atributos[key].nivel;
                atributos[key].custo = data.atributos[key].custo;
            }
        }
    }
}

export const status = {
    forca: 0,
    vida: 0,
    tenacidade: 0,
    velocidade: 0,
    intelecto: 0,
    energia: 0 // ainda bloqueada
};

export function atualizarStatus() {
    const f = atributos.forca.nivel;
    const d = atributos.durabilidade.nivel;
    const a = atributos.agilidade.nivel;

    status.forca = (f * 1.0) + (a * 0.05) + (d * 0.1);
    status.vida = (d * 1.0);
    status.tenacidade = (d * 0.5) + (f * 0.1);
    status.velocidade = (a * 1.0) + (f * 0.05);
    status.intelecto = (a * 0.1);
    // status.energia = 0 (bloqueada)
}

export const habilidades = {
  forca: { desbloqueada: false, ativa: false },
  durabilidade: { desbloqueada: false, ativa: false },
  agilidade: { desbloqueada: false, ativa: false }
};

export function verificarDesbloqueioHabilidades() {
  if (atributos.forca.nivel >= 5) habilidades.forca.desbloqueada = true;
  if (atributos.durabilidade.nivel >= 5) habilidades.durabilidade.desbloqueada = true;
  if (atributos.agilidade.nivel >= 5) habilidades.agilidade.desbloqueada = true;
  salvarProgresso();
}

export function comprarHabilidade(tipo) {
  const custo = 25;
  if (esforco < custo) return false;
  gastarEsforco(custo);
  habilidades[tipo].ativa = true;
  salvarProgresso();
  return true;
}