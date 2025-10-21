export let esforco = 0;
export let atributosDesbloqueados = localStorage.getItem('atributosDesbloqueados') === 'true';
export let habilidadesDesbloqueadas = localStorage.getItem('habilidadesDesbloqueadas') === 'true';
export let custoHabilidadeGlobal = 5;
export const atributos = {
    forca: { nivel: 1, custo: 3 },
    durabilidade: { nivel: 1, custo: 3 },
    agilidade: { nivel: 1, custo: 3 }
};

export const multiplicadores = {
  forca: 1,
  durabilidade: 1,
  agilidade: 1
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
  // 1. Zerar recurso principal
  esforco = 0;

  // 2. Reiniciar atributos
  for (let key in atributos) {
    atributos[key].nivel = 1;
    atributos[key].custo = 3;
  }

  // 3. Reiniciar habilidades (desbloqueio e ativação)
  for (let key in habilidades) {
    habilidades[key].desbloqueada = false;
    habilidades[key].ativa = false;
  }

  // 4. Reiniciar multiplicadores para o valor base (x1)
  for (let key in multiplicadores) {
    multiplicadores[key] = 1;
  }

  // 5. Atualizar status derivados após reset
  atualizarStatus();

  // 6. Salvar o estado limpo no localStorage
  salvarProgresso();
}


export function salvarProgresso() {
  const save = {
    esforco,
    atributos,
    habilidades,
    multiplicadores,
    custoHabilidadeGlobal
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

    for (let key in habilidades) {
      if (data.habilidades && data.habilidades[key]) {
        habilidades[key].desbloqueada = data.habilidades[key].desbloqueada;
        habilidades[key].ativa = data.habilidades[key].ativa;
      }
    }

    for (let key in multiplicadores) {
      if (data.multiplicadores && data.multiplicadores[key]) {
        multiplicadores[key] = data.multiplicadores[key];
      }
    }

    // carregar custo global se existir
    if (data.custoHabilidadeGlobal !== undefined) {
      custoHabilidadeGlobal = data.custoHabilidadeGlobal;
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
  forca: { nome: "Poder Bruto", desbloqueada: false, ativa: false },
  durabilidade: { nome: "Corpo de Aço", desbloqueada: false, ativa: false },
  agilidade: { nome: "Instinto Rápido", desbloqueada: false, ativa: false }
};

export function verificarDesbloqueioHabilidades() {
  // Força
  if (atributos.forca.nivel >= 5 && !habilidades.forca.desbloqueada) {
    habilidades.forca.desbloqueada = true;
  }

  // Durabilidade
  if (atributos.durabilidade.nivel >= 5 && !habilidades.durabilidade.desbloqueada) {
    habilidades.durabilidade.desbloqueada = true;
  }

  // Agilidade
  if (atributos.agilidade.nivel >= 5 && !habilidades.agilidade.desbloqueada) {
    habilidades.agilidade.desbloqueada = true;
  }

  salvarProgresso();
}

export function comprarHabilidade(tipo) {
  // custo dinâmico compartilhado entre todas as habilidades
  const custo = custoHabilidadeGlobal;

  // verificação de pré-condições
  if (!habilidades[tipo].desbloqueada || habilidades[tipo].ativa) return false;
  if (esforco < custo) return false;

  // custo pago
  gastarEsforco(custo);

  // aplicar efeito permanente
  habilidades[tipo].ativa = true;
  multiplicadores[tipo] = 2; // dobra ganhos futuros

  // custo global aumenta +5 para próxima compra
  custoHabilidadeGlobal += 5;

  salvarProgresso();
  return true;
}
