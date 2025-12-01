
// Variáveis do jogo
let jogadorAtual = 'X'; // Define o jogador atual como 'X' no início
let tabuleiro = ['', '', '', '', '', '', '', '', '']; // Define o tabuleiro como um array vazio de 9 posições (uma para cada célula do jogo)
let jogoAtivo = true; // Define que o jogo está ativo no início
let mensagem = document.getElementById('mensagem'); // Obtém o elemento onde a mensagem de status do jogo será exibida
const tabuleiroElement = document.getElementById('tabuleiro'); // Obtém o elemento do DOM onde o tabuleiro será exibido

// Função para atualizar a visualização do tabuleiro
function atualizarTabuleiro() {
    tabuleiroElement.innerHTML = ''; // Limpa o conteúdo atual do tabuleiro na tela
    tabuleiro.forEach((celula, index) => { // Para cada célula no tabuleiro
        const div = document.createElement('div'); // Cria uma nova div para representar a célula
        div.classList.add('celula'); // Adiciona a classe 'celula' à div para estilização
        div.textContent = celula; // Define o conteúdo da célula (se estiver vazia ou com 'X' ou 'O')
        div.addEventListener('click', () => jogar(index)); // Adiciona um ouvinte de evento para quando a célula for clicada
        tabuleiroElement.appendChild(div); // Adiciona a célula ao tabuleiro na tela
    });
}

// Função para alternar o jogador
function alternarJogador() {
    jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'; // Alterna o jogador entre 'X' e 'O'
    mensagem.textContent = `Vez do jogador ${jogadorAtual}`; // Atualiza a mensagem na tela com o jogador atual
}

// Função que executa a jogada
function jogar(index) {
    if (tabuleiro[index] !== '' || !jogoAtivo) { // Se a célula já estiver ocupada ou o jogo não estiver ativo
        return; // Não faz nada
    }

    tabuleiro[index] = jogadorAtual; // Marca a célula com o símbolo do jogador atual
    atualizarTabuleiro(); // Atualiza o tabuleiro na tela

    if (verificarVitoria()) { // Verifica se o jogador atual venceu
        mensagem.textContent = `Jogador ${jogadorAtual} venceu!`; // Se venceu, exibe mensagem de vitória
        jogoAtivo = false; // O jogo acaba
    } else if (tabuleiro.every(celula => celula !== '')) { // Se todas as células estiverem preenchidas
        mensagem.textContent = 'Empate!'; // Se o jogo chegou a um empate
        jogoAtivo = false; // O jogo acaba
    } else {
        alternarJogador(); // Caso contrário, alterna para o próximo jogador
    }
}

// Função para verificar se um jogador venceu
function verificarVitoria() {
    const combinacoesVitoria = [ // Lista de combinações vencedoras (linhas, colunas, diagonais)
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal 1
        [2, 4, 6], // Diagonal 2
    ];

    return combinacoesVitoria.some(combinacao => { // Verifica se alguma combinação vencedora é válida
        const [a, b, c] = combinacao; // Desestrutura os índices da combinação
        return tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]; // Verifica se as células estão ocupadas e são iguais
    });
}

// Função para reiniciar o jogo
document.getElementById('reiniciar').addEventListener('click', () => { // Quando o botão de reiniciar for clicado
    tabuleiro = ['', '', '', '', '', '', '', '', '']; // Limpa o tabuleiro
    jogoAtivo = true; // Define que o jogo está ativo novamente
    mensagem.textContent = 'Vez do jogador X'; // Define a mensagem inicial como sendo a vez do jogador 'X'
    atualizarTabuleiro(); // Atualiza o tabuleiro na tela
});

// Inicialização
atualizarTabuleiro(); // Chama a função para desenhar o tabuleiro pela primeira ve



