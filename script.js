// Guarda os números sorteados. Começa vazio e é preenchido pelo sorteio.
const numerosSorteados = [];

// Sorteia 6 números diferentes entre 1 e 60.
function sortearNumeros() {
    while (numerosSorteados.length < 6) {
        const sorteio = Math.floor(Math.random() * 60) + 1; // número entre 1 e 60

        // Se o número ainda não estiver na lista, adiciona.
        if (!numerosSorteados.includes(sorteio)) {
            numerosSorteados.push(sorteio);
        }
    }
}

// Exibe os números sorteados na página, dentro de caixas.
function mostrarNumeros() {
    const container = document.getElementById('numeros');

    // Limpa o conteúdo anterior para evitar duplicações.
    container.innerHTML = '';

    numerosSorteados.forEach(numero => {
        const box = document.createElement('div');
        box.className = 'numero-caixa';
        box.textContent = numero;
        container.appendChild(box);
    });
}

// Refaça o sorteio quando o usuário clicar no botão.
function sortearNovamente() {
    numerosSorteados.length = 0; // esvazia o array
    sortearNumeros();
    mostrarNumeros();
}

function aplicarTema(tema) {
    document.body.classList.toggle('dark', tema === 'dark');
    const botaoTema = document.getElementById('theme-toggle');
    const icone = botaoTema.querySelector('i');
    if (tema === 'dark') {
        botaoTema.textContent = 'Modo claro';
        botaoTema.insertBefore(icone, botaoTema.firstChild);
        icone.className = 'fas fa-sun';
    } else {
        botaoTema.textContent = 'Modo escuro';
        botaoTema.insertBefore(icone, botaoTema.firstChild);
        icone.className = 'fas fa-moon';
    }
    localStorage.setItem('temaMegaSena', tema);
}

function alternarTema() {
    const temaAtual = document.body.classList.contains('dark') ? 'dark' : 'light';
    aplicarTema(temaAtual === 'dark' ? 'light' : 'dark');
}

// Aguarda o carregamento do HTML antes de rodar o script.
document.addEventListener('DOMContentLoaded', () => {
    const temaSalvo = localStorage.getItem('temaMegaSena') || 'light';
    aplicarTema(temaSalvo);

    sortearNumeros(); // faz o primeiro sorteio
    mostrarNumeros(); // mostra os números iniciais

    const botao = document.getElementById('sortear-novamente');
    botao.addEventListener('click', sortearNovamente);

    const botaoTema = document.getElementById('theme-toggle');
    botaoTema.addEventListener('click', alternarTema);
});
