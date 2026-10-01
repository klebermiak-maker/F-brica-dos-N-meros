import { D08Question } from '../types/math';

export const D08_STATIC_QUESTIONS: D08Question[] = [
  // ================= TIER 1: Dezenas e Unidades (Até 99 - 10 Desafios) =================
  {
    id: 't1_q1',
    tier: 1,
    title: 'Compondo o Número 47',
    targetNumber: 47,
    type: 'choose_addition',
    questionText: 'Qual das adições abaixo forma o número 47?',
    options: [
      { id: 'opt1', text: '40 + 7', expression: '40 + 7', isCorrect: true, explanation: 'Muito bem! 4 dezenas (40) mais 7 unidades (7) é igual a 47.' },
      { id: 'opt2', text: '4 + 7', expression: '4 + 7', isCorrect: false, explanation: 'Cuidado! 4 + 7 é igual a 11, não 47. O 4 vale 40 (4 dezenas)!' },
      { id: 'opt3', text: '40 + 70', expression: '40 + 70', isCorrect: false, explanation: '40 + 70 dá 110, passou de 47!' },
      { id: 'opt4', text: '30 + 7', expression: '30 + 7', isCorrect: false, explanation: '30 + 7 dá 37, faltaram 10 para 47.' }
    ],
    hint: { centenas: 0, dezenas: 4, unidades: 7, text: 'O número 47 é formado por 4 barras de dez (40) e 7 cubinhos (7).' }
  },
  {
    id: 't1_q2',
    tier: 1,
    title: 'Diferentes Adições para 54',
    targetNumber: 54,
    type: 'choose_addition',
    questionText: 'Podemos escrever o número 54 de várias formas! Qual destas somas também dá 54?',
    options: [
      { id: 'opt1', text: '40 + 14', expression: '40 + 14', isCorrect: true, explanation: 'Sensacional! 40 + 14 = 54. Foi trocada 1 dezena (10) para juntar com o 4 (ficando 14)!' },
      { id: 'opt2', text: '50 + 14', expression: '50 + 14', isCorrect: false, explanation: '50 + 14 é igual a 64, passa de 54.' },
      { id: 'opt3', text: '40 + 4', expression: '40 + 4', isCorrect: false, explanation: '40 + 4 dá 44, faltam 10.' },
      { id: 'opt4', text: '30 + 14', expression: '30 + 14', isCorrect: false, explanation: '30 + 14 dá 44, não chega a 54.' }
    ],
    hint: { centenas: 0, dezenas: 5, unidades: 4, text: 'Pense: 50 + 4 é 54. Se tiramos 10 do 50 fica 40, e passamos 10 para o 4, fica 14!' }
  },
  {
    id: 't1_q3',
    tier: 1,
    title: 'Complete a Adição para 68',
    targetNumber: 68,
    type: 'find_missing_term',
    questionText: 'Descubra o número que falta na adição: 68 = 50 + ___ + 8',
    options: [
      { id: 'opt1', text: '10', expression: '50 + 10 + 8 = 68', isCorrect: true, explanation: 'Parabéns! 50 + 10 = 60, e com mais 8 dá exatamente 68!' },
      { id: 'opt2', text: '20', expression: '50 + 20 + 8 = 78', isCorrect: false, explanation: '50 + 20 + 8 dá 78, passa de 68.' },
      { id: 'opt3', text: '8', expression: '50 + 8 + 8 = 66', isCorrect: false, explanation: '50 + 8 + 8 dá 66, faltaram 2.' },
      { id: 'opt4', text: '18', expression: '50 + 18 + 8 = 76', isCorrect: false, explanation: '50 + 18 + 8 dá 76, passa de 68.' }
    ],
    hint: { centenas: 0, dezenas: 6, unidades: 8, text: 'O número 68 tem 6 dezenas (60). Já temos 50 e 8, falta 1 dezena (10)!' }
  },
  {
    id: 't1_q4',
    tier: 1,
    title: 'Decomposição de 36',
    targetNumber: 36,
    type: 'choose_addition',
    questionText: 'Qual das alternativas apresenta uma adição correta para o número 36?',
    options: [
      { id: 'opt1', text: '20 + 16', expression: '20 + 16', isCorrect: true, explanation: 'Exato! 20 + 16 = 36. Foi trocada 1 dezena para somar com as 6 unidades!' },
      { id: 'opt2', text: '20 + 6', expression: '20 + 6 = 26', isCorrect: false, explanation: '20 + 6 é igual a 26, faltam 10.' },
      { id: 'opt3', text: '30 + 16', expression: '30 + 16 = 46', isCorrect: false, explanation: '30 + 16 é 46, passa de 36.' },
      { id: 'opt4', text: '10 + 16', expression: '10 + 16 = 26', isCorrect: false, explanation: '10 + 16 dá apenas 26.' }
    ],
    hint: { centenas: 0, dezenas: 3, unidades: 6, text: '36 = 30 + 6. Se diminuirmos 10 do 30 (ficando 20), juntamos 10 no 6 (ficando 16)!' }
  },
  {
    id: 't1_q5',
    tier: 1,
    title: 'Troca de Dezenas para 82',
    targetNumber: 82,
    type: 'choose_addition',
    questionText: 'Como podemos escrever 82 por meio de uma adição com 7 dezenas?',
    options: [
      { id: 'opt1', text: '70 + 12', expression: '70 + 12', isCorrect: true, explanation: 'Incrível! 70 + 12 = 82. Uma dezena de 80 foi reagrupada com as 2 unidades!' },
      { id: 'opt2', text: '70 + 2', expression: '70 + 2 = 72', isCorrect: false, explanation: '70 + 2 é 72, faltam 10 para 82.' },
      { id: 'opt3', text: '70 + 22', expression: '70 + 22 = 92', isCorrect: false, explanation: '70 + 22 dá 92, passou de 82.' },
      { id: 'opt4', text: '80 + 12', expression: '80 + 12 = 92', isCorrect: false, explanation: '80 + 12 é 92.' }
    ],
    hint: { centenas: 0, dezenas: 8, unidades: 2, text: '82 = 80 + 2. Com 7 dezenas (70), sobram 12 unidades: 70 + 12 = 82.' }
  },
  {
    id: 't1_q6',
    tier: 1,
    title: 'Compondo o Número 73',
    targetNumber: 73,
    type: 'choose_addition',
    questionText: 'Qual das opções abaixo soma exatamente 73?',
    options: [
      { id: 'opt1', text: '70 + 3', expression: '70 + 3', isCorrect: true, explanation: 'Muito bem! 7 dezenas (70) mais 3 unidades (3) é igual a 73.' },
      { id: 'opt2', text: '7 + 3', expression: '7 + 3 = 10', isCorrect: false, explanation: '7 + 3 dá apenas 10. O 7 representa 70!' },
      { id: 'opt3', text: '60 + 3', expression: '60 + 3 = 63', isCorrect: false, explanation: '60 + 3 dá 63, faltam 10.' },
      { id: 'opt4', text: '70 + 30', expression: '70 + 30 = 100', isCorrect: false, explanation: '70 + 30 dá 100.' }
    ],
    hint: { centenas: 0, dezenas: 7, unidades: 3, text: '7 barras de dez (70) e 3 cubinhos (3).' }
  },
  {
    id: 't1_q7',
    tier: 1,
    title: 'Diferente Adição para 95',
    targetNumber: 95,
    type: 'choose_addition',
    questionText: 'Se tirarmos 10 de 90 e juntarmos com o 5, qual adição representará 95?',
    options: [
      { id: 'opt1', text: '80 + 15', expression: '80 + 15', isCorrect: true, explanation: 'Parabéns! 80 + 15 = 95. Uma forma diferente e correta de compor 95!' },
      { id: 'opt2', text: '80 + 5', expression: '80 + 5 = 85', isCorrect: false, explanation: '80 + 5 dá 85, faltaram 10.' },
      { id: 'opt3', text: '90 + 15', expression: '90 + 15 = 105', isCorrect: false, explanation: '90 + 15 dá 105, passou de 95.' },
      { id: 'opt4', text: '70 + 15', expression: '70 + 15 = 85', isCorrect: false, explanation: '70 + 15 dá 85.' }
    ],
    hint: { centenas: 0, dezenas: 9, unidades: 5, text: '95 = 90 + 5. Passando 10 para as unidades: 80 + 15 = 95.' }
  },
  {
    id: 't1_q8',
    tier: 1,
    title: 'O Enigma de 29',
    targetNumber: 29,
    type: 'choose_addition',
    questionText: 'Qual das adições forma o número 29 usando apenas 1 dezena inteira?',
    options: [
      { id: 'opt1', text: '10 + 19', expression: '10 + 19', isCorrect: true, explanation: 'Perfeito! 10 + 19 = 29. 1 dezena mais 19 unidades dá 29!' },
      { id: 'opt2', text: '10 + 9', expression: '10 + 9 = 19', isCorrect: false, explanation: '10 + 9 é 19, faltam 10 para 29.' },
      { id: 'opt3', text: '20 + 19', expression: '20 + 19 = 39', isCorrect: false, explanation: '20 + 19 dá 39, passou de 29.' },
      { id: 'opt4', text: '10 + 29', expression: '10 + 29 = 39', isCorrect: false, explanation: '10 + 29 dá 39.' }
    ],
    hint: { centenas: 0, dezenas: 2, unidades: 9, text: '29 = 20 + 9. Se usarmos 10, sobram 19: 10 + 19 = 29.' }
  },
  {
    id: 't1_q9',
    tier: 1,
    title: 'Atenção: Qual NÃO é 61?',
    targetNumber: 61,
    type: 'which_is_not',
    questionText: 'Três opções somam 61, mas UMA NÃO soma. Qual das adições NÃO dá 61?',
    options: [
      { id: 'opt1', text: '60 + 10', expression: '60 + 10 = 70', isCorrect: true, explanation: 'Acertou! 60 + 10 = 70, portanto NÃO é 61! A correta seria 60 + 1.' },
      { id: 'opt2', text: '60 + 1', expression: '60 + 1 = 61', isCorrect: false, explanation: 'Esta soma dá 61 sim!' },
      { id: 'opt3', text: '50 + 11', expression: '50 + 11 = 61', isCorrect: false, explanation: 'Esta soma dá 61 sim (50 + 11 = 61)!' },
      { id: 'opt4', text: '40 + 21', expression: '40 + 21 = 61', isCorrect: false, explanation: 'Esta soma dá 61 sim (40 + 21 = 61)!' }
    ],
    hint: { centenas: 0, dezenas: 6, unidades: 1, text: 'Procure a alternativa que passa de 61.' }
  },
  {
    id: 't1_q10',
    tier: 1,
    title: 'Três Parcelas para 88',
    targetNumber: 88,
    type: 'choose_addition',
    questionText: 'Qual adição com 3 parcelas forma exatamente o número 88?',
    options: [
      { id: 'opt1', text: '40 + 40 + 8', expression: '40 + 40 + 8', isCorrect: true, explanation: 'Espetacular! 40 + 40 = 80, e com mais 8 dá 88!' },
      { id: 'opt2', text: '40 + 40 + 80', expression: '40 + 40 + 80 = 160', isCorrect: false, explanation: 'Essa soma passa de 88.' },
      { id: 'opt3', text: '30 + 40 + 8', expression: '30 + 40 + 8 = 78', isCorrect: false, explanation: '30 + 40 + 8 dá 78, faltam 10.' },
      { id: 'opt4', text: '50 + 20 + 8', expression: '50 + 20 + 8 = 78', isCorrect: false, explanation: '50 + 20 + 8 dá 78.' }
    ],
    hint: { centenas: 0, dezenas: 8, unidades: 8, text: '40 + 40 = 80. Mais 8 unidades dá 88.' }
  },

  // ================= TIER 2: Centenas Simples (100 a 300 - 10 Desafios) =================
  {
    id: 't2_q1',
    tier: 2,
    title: 'A Centena de 135',
    targetNumber: 135,
    type: 'choose_addition',
    questionText: 'A professora pediu para decompor o número 135. Qual adição está correta?',
    options: [
      { id: 'opt1', text: '100 + 30 + 5', expression: '100 + 30 + 5', isCorrect: true, explanation: 'Perfeito! 1 centena (100) + 3 dezenas (30) + 5 unidades (5) = 135.' },
      { id: 'opt2', text: '10 + 30 + 5', expression: '10 + 30 + 5 = 45', isCorrect: false, explanation: 'Atenção: 10 + 30 + 5 dá apenas 45. A 3ª ordem de 135 é centena (100)!' },
      { id: 'opt3', text: '100 + 350', expression: '100 + 350 = 450', isCorrect: false, explanation: '100 + 350 dá 450, bem maior que 135.' },
      { id: 'opt4', text: '100 + 3 + 5', expression: '100 + 3 + 5 = 108', isCorrect: false, explanation: '100 + 3 + 5 dá 108. O número 3 vale 30 (dezenas)!' }
    ],
    hint: { centenas: 1, dezenas: 3, unidades: 5, text: '1 placa de 100, 3 barras de 10 (30) e 5 cubinhos (5).' }
  },
  {
    id: 't2_q2',
    tier: 2,
    title: 'O Cofrinho de Lucas: R$ 246',
    targetNumber: 246,
    type: 'real_world_context',
    questionText: 'Lucas juntou 2 notas de 100 reais, 4 notas de 10 reais e 6 moedas de 1 real. Qual adição representa esse dinheiro?',
    options: [
      { id: 'opt1', text: '200 + 40 + 6', expression: '200 + 40 + 6 = 246', isCorrect: true, explanation: 'Excelente! 2 de 100 = 200. 4 de 10 = 40. 6 de 1 = 6. Total: 246 reais!' },
      { id: 'opt2', text: '20 + 40 + 6', expression: '20 + 40 + 6 = 66', isCorrect: false, explanation: 'Duas notas de 100 valem 200 reais, não 20!' },
      { id: 'opt3', text: '200 + 4 + 6', expression: '200 + 4 + 6 = 210', isCorrect: false, explanation: 'Quatro notas de 10 valem 40 reais, e não 4.' },
      { id: 'opt4', text: '200 + 400 + 6', expression: '200 + 400 + 6 = 606', isCorrect: false, explanation: '4 notas de 10 valem 40 reais, não 400.' }
    ],
    hint: { centenas: 2, dezenas: 4, unidades: 6, text: '100 + 100 = 200; 10 + 10 + 10 + 10 = 40; e 6 moedas = 6.' }
  },
  {
    id: 't2_q3',
    tier: 2,
    title: 'Outra Adição para 184',
    targetNumber: 184,
    type: 'choose_addition',
    questionText: 'O número 184 também pode ser decomposto sem separar a dezena da unidade. Como?',
    options: [
      { id: 'opt1', text: '100 + 84', expression: '100 + 84', isCorrect: true, explanation: 'Isso aí! 100 + 84 é uma adição que forma exatamente 184.' },
      { id: 'opt2', text: '180 + 14', expression: '180 + 14 = 194', isCorrect: false, explanation: '180 + 14 = 194, passa de 184.' },
      { id: 'opt3', text: '100 + 804', expression: '100 + 804 = 904', isCorrect: false, explanation: '804 é muito maior que 84!' },
      { id: 'opt4', text: '10 + 84', expression: '10 + 84 = 94', isCorrect: false, explanation: '10 + 84 dá apenas 94.' }
    ],
    hint: { centenas: 1, dezenas: 8, unidades: 4, text: 'Podemos juntar a centena (100) com todo o resto (84): 100 + 84 = 184.' }
  },
  {
    id: 't2_q4',
    tier: 2,
    title: 'Troca de Dezenas em 157',
    targetNumber: 157,
    type: 'choose_addition',
    questionText: 'Se trocarmos 1 dezena por 10 unidades, como fica a adição de 157?',
    options: [
      { id: 'opt1', text: '100 + 40 + 17', expression: '100 + 40 + 17', isCorrect: true, explanation: 'Muito bem! 100 + 40 + 17 = 157. Uma dezena de 50 virou 10 unidades somadas ao 7!' },
      { id: 'opt2', text: '100 + 50 + 17', expression: '100 + 50 + 17 = 167', isCorrect: false, explanation: 'Essa soma dá 167, passou de 157.' },
      { id: 'opt3', text: '100 + 40 + 7', expression: '100 + 40 + 7 = 147', isCorrect: false, explanation: 'Essa soma dá 147, faltam 10.' },
      { id: 'opt4', text: '100 + 30 + 17', expression: '100 + 30 + 17 = 147', isCorrect: false, explanation: 'Dá 147, faltam 10.' }
    ],
    hint: { centenas: 1, dezenas: 5, unidades: 7, text: '157 = 100 + 50 + 7. Tirando 10 do 50 fica 40, e 10 vai para o 7 virando 17.' }
  },
  {
    id: 't2_q5',
    tier: 2,
    title: 'Composição de 219',
    targetNumber: 219,
    type: 'choose_addition',
    questionText: 'Qual das alternativas representa o número 219?',
    options: [
      { id: 'opt1', text: '200 + 10 + 9', expression: '200 + 10 + 9', isCorrect: true, explanation: 'Parabéns! 2 centenas (200) + 1 dezena (10) + 9 unidades (9) = 219.' },
      { id: 'opt2', text: '200 + 100 + 9', expression: '200 + 100 + 9 = 309', isCorrect: false, explanation: 'Passa para 309.' },
      { id: 'opt3', text: '20 + 10 + 9', expression: '20 + 10 + 9 = 39', isCorrect: false, explanation: 'Dá apenas 39.' },
      { id: 'opt4', text: '200 + 190', expression: '200 + 190 = 390', isCorrect: false, explanation: 'Passa para 390.' }
    ],
    hint: { centenas: 2, dezenas: 1, unidades: 9, text: '2 centenas (200), 1 dezena (10) e 9 unidades (9).' }
  },
  {
    id: 't2_q6',
    tier: 2,
    title: 'Centena e Dezena Exata: 290',
    targetNumber: 290,
    type: 'choose_addition',
    questionText: 'Qual adição forma o número 290?',
    options: [
      { id: 'opt1', text: '200 + 90', expression: '200 + 90', isCorrect: true, explanation: 'Perfeito! 200 + 90 = 290. Como a unidade é 0, temos apenas centenas e dezenas.' },
      { id: 'opt2', text: '200 + 9', expression: '200 + 9 = 209', isCorrect: false, explanation: '200 + 9 = 209, o algarismo 9 está na ordem das dezenas (90)!' },
      { id: 'opt3', text: '20 + 90', expression: '20 + 90 = 110', isCorrect: false, explanation: '20 + 90 = 110.' },
      { id: 'opt4', text: '200 + 900', expression: '200 + 900 = 1100', isCorrect: false, explanation: 'Passa de 1000.' }
    ],
    hint: { centenas: 2, dezenas: 9, unidades: 0, text: '2 placas de 100 (200) e 9 barras de 10 (90).' }
  },
  {
    id: 't2_q7',
    tier: 2,
    title: 'Zero na Dezena: 108',
    targetNumber: 108,
    type: 'choose_addition',
    questionText: 'Como compor o número 108 por adição?',
    options: [
      { id: 'opt1', text: '100 + 8', expression: '100 + 8', isCorrect: true, explanation: 'Correto! 100 + 8 = 108. A ordem das dezenas tem valor zero!' },
      { id: 'opt2', text: '100 + 80', expression: '100 + 80 = 180', isCorrect: false, explanation: '100 + 80 = 180, não 108.' },
      { id: 'opt3', text: '10 + 8', expression: '10 + 8 = 18', isCorrect: false, explanation: '10 + 8 dá apenas 18.' },
      { id: 'opt4', text: '100 + 800', expression: '100 + 800 = 900', isCorrect: false, explanation: 'Passa de 108.' }
    ],
    hint: { centenas: 1, dezenas: 0, unidades: 8, text: 'O número 108 não tem dezenas inteiras: 100 + 8.' }
  },
  {
    id: 't2_q8',
    tier: 2,
    title: 'Troca de Centena em 273',
    targetNumber: 273,
    type: 'choose_addition',
    questionText: 'Se trocarmos 1 centena por 10 dezenas, o número 273 pode ser escrito como:',
    options: [
      { id: 'opt1', text: '100 + 170 + 3', expression: '100 + 170 + 3', isCorrect: true, explanation: 'Sensacional! 100 + 170 = 270. Com mais 3 dá 273!' },
      { id: 'opt2', text: '200 + 170 + 3', expression: '200 + 170 + 3 = 373', isCorrect: false, explanation: 'Ficou com 100 a mais (373)!' },
      { id: 'opt3', text: '100 + 70 + 3', expression: '100 + 70 + 3 = 173', isCorrect: false, explanation: 'Dá 173, faltam 100.' },
      { id: 'opt4', text: '100 + 180 + 3', expression: '100 + 180 + 3 = 283', isCorrect: false, explanation: 'Dá 283.' }
    ],
    hint: { centenas: 2, dezenas: 7, unidades: 3, text: '200 + 70 + 3 = 100 + (100 + 70) + 3 = 100 + 170 + 3.' }
  },
  {
    id: 't2_q9',
    tier: 2,
    title: 'Termo Faltante em 164',
    targetNumber: 164,
    type: 'find_missing_term',
    questionText: 'Complete a igualdade: 164 = 100 + ___ + 4',
    options: [
      { id: 'opt1', text: '60', expression: '100 + 60 + 4 = 164', isCorrect: true, explanation: 'Muito bem! As 6 dezenas valem 60: 100 + 60 + 4 = 164.' },
      { id: 'opt2', text: '6', expression: '100 + 6 + 4 = 110', isCorrect: false, explanation: '6 vale 6 unidades, mas precisamos de 6 dezenas (60).' },
      { id: 'opt3', text: '600', expression: '100 + 600 + 4 = 704', isCorrect: false, explanation: 'Passa muito de 164.' },
      { id: 'opt4', text: '16', expression: '100 + 16 + 4 = 120', isCorrect: false, explanation: 'Dá 120.' }
    ],
    hint: { centenas: 1, dezenas: 6, unidades: 4, text: 'Já temos 100 e 4. Faltam as 6 dezenas (60).' }
  },
  {
    id: 't2_q10',
    tier: 2,
    title: 'Diferentes Adições para 250',
    targetNumber: 250,
    type: 'choose_addition',
    questionText: 'Qual das opções abaixo soma exatamente 250?',
    options: [
      { id: 'opt1', text: '100 + 150', expression: '100 + 150', isCorrect: true, explanation: 'Show! 100 + 150 = 250.' },
      { id: 'opt2', text: '200 + 5', expression: '200 + 5 = 205', isCorrect: false, explanation: '200 + 5 é 205.' },
      { id: 'opt3', text: '100 + 50', expression: '100 + 50 = 150', isCorrect: false, explanation: '100 + 50 é 150, faltam 100.' },
      { id: 'opt4', text: '200 + 150', expression: '200 + 150 = 350', isCorrect: false, explanation: 'Passa para 350.' }
    ],
    hint: { centenas: 2, dezenas: 5, unidades: 0, text: '100 + 150 = 250.' }
  },

  // ================= TIER 3: Trocas e Reagrupamentos (300 a 600 - 10 Desafios) =================
  {
    id: 't3_q1',
    tier: 3,
    title: 'A Troca Mágica de 358',
    targetNumber: 358,
    type: 'choose_addition',
    questionText: 'O robô matemático decompôs 358 com uma dezena a menos e mais unidades. Qual é a adição dele?',
    options: [
      { id: 'opt1', text: '300 + 40 + 18', expression: '300 + 40 + 18', isCorrect: true, explanation: 'Brilhante! 40 + 18 = 58. E 300 + 58 = 358! Essa é uma diferente adição de 3 ordens!' },
      { id: 'opt2', text: '300 + 40 + 8', expression: '300 + 40 + 8 = 348', isCorrect: false, explanation: '300 + 40 + 8 dá 348, faltaram 10 unidades.' },
      { id: 'opt3', text: '300 + 50 + 18', expression: '300 + 50 + 18 = 368', isCorrect: false, explanation: '300 + 50 + 18 dá 368, passou de 358.' },
      { id: 'opt4', text: '200 + 40 + 18', expression: '200 + 40 + 18 = 258', isCorrect: false, explanation: '200 + 40 + 18 dá 258, faltaram 100 unidades.' }
    ],
    hint: { centenas: 3, dezenas: 5, unidades: 8, text: '358 = 300 + 50 + 8. Se tiramos 10 do 50 (fica 40), somamos 10 no 8 (fica 18)!' }
  },
  {
    id: 't3_q2',
    tier: 3,
    title: 'Troca de Centena: 425',
    targetNumber: 425,
    type: 'choose_addition',
    questionText: 'Se trocarmos 1 centena (100) por 10 dezenas, o número 425 pode ser escrito como:',
    options: [
      { id: 'opt1', text: '300 + 120 + 5', expression: '300 + 120 + 5', isCorrect: true, explanation: 'Incrível! 300 + 120 + 5 = 425. O 400 virou 300 e 100 foi somado ao 20 (virando 120)!' },
      { id: 'opt2', text: '400 + 120 + 5', expression: '400 + 120 + 5 = 525', isCorrect: false, explanation: '400 + 120 + 5 = 525, ficou com 100 a mais!' },
      { id: 'opt3', text: '300 + 20 + 5', expression: '300 + 20 + 5 = 325', isCorrect: false, explanation: '300 + 20 + 5 = 325, sumiram 100 unidades.' },
      { id: 'opt4', text: '200 + 120 + 5', expression: '200 + 120 + 5 = 325', isCorrect: false, explanation: 'Essa soma dá 325, não chega a 425.' }
    ],
    hint: { centenas: 4, dezenas: 2, unidades: 5, text: '425 = 400 + 20 + 5. Desagrupando 1 centena: 300 + (100 + 20) + 5 = 300 + 120 + 5.' }
  },
  {
    id: 't3_q3',
    tier: 3,
    title: 'O Enigma do Termo Ausente em 560',
    targetNumber: 560,
    type: 'find_missing_term',
    questionText: 'Qual número completa a igualdade: 560 = 500 + ___ ?',
    options: [
      { id: 'opt1', text: '60', expression: '500 + 60 = 560', isCorrect: true, explanation: 'Muito bem! 500 mais 60 unidades resulta em 560.' },
      { id: 'opt2', text: '6', expression: '500 + 6 = 506', isCorrect: false, explanation: '500 + 6 = 506, o algarismo 6 está na ordem das dezenas (60)!' },
      { id: 'opt3', text: '600', expression: '500 + 600 = 1100', isCorrect: false, explanation: '500 + 600 dá 1100, muito maior.' },
      { id: 'opt4', text: '56', expression: '500 + 56 = 556', isCorrect: false, explanation: '500 + 56 = 556, faltam 4 para 560.' }
    ],
    hint: { centenas: 5, dezenas: 6, unidades: 0, text: '5 centenas são 500. As 6 dezenas restantes valem 60!' }
  },
  {
    id: 't3_q4',
    tier: 3,
    title: 'Decomposição Simples de 317',
    targetNumber: 317,
    type: 'choose_addition',
    questionText: 'Qual das adições forma o número 317?',
    options: [
      { id: 'opt1', text: '300 + 10 + 7', expression: '300 + 10 + 7', isCorrect: true, explanation: 'Exato! 3 centenas (300) + 1 dezena (10) + 7 unidades (7) = 317.' },
      { id: 'opt2', text: '30 + 10 + 7', expression: '30 + 10 + 7 = 47', isCorrect: false, explanation: 'Dá 47, faltam as centenas.' },
      { id: 'opt3', text: '300 + 170', expression: '300 + 170 = 470', isCorrect: false, explanation: 'Passa para 470.' },
      { id: 'opt4', text: '300 + 1 + 7', expression: '300 + 1 + 7 = 308', isCorrect: false, explanation: 'O 1 vale 10 (dezena)!' }
    ],
    hint: { centenas: 3, dezenas: 1, unidades: 7, text: '3 centenas (300), 1 dezena (10) e 7 unidades (7).' }
  },
  {
    id: 't3_q5',
    tier: 3,
    title: 'Troca em 482',
    targetNumber: 482,
    type: 'choose_addition',
    questionText: 'Podemos decompor 482 como:',
    options: [
      { id: 'opt1', text: '400 + 70 + 12', expression: '400 + 70 + 12', isCorrect: true, explanation: 'Perfeito! 70 + 12 = 82, e 400 + 82 = 482.' },
      { id: 'opt2', text: '400 + 80 + 12', expression: '400 + 80 + 12 = 492', isCorrect: false, explanation: 'Passa de 482.' },
      { id: 'opt3', text: '400 + 60 + 12', expression: '400 + 60 + 12 = 472', isCorrect: false, explanation: 'Faltam 10.' },
      { id: 'opt4', text: '300 + 70 + 12', expression: '300 + 70 + 12 = 382', isCorrect: false, explanation: 'Faltam 100.' }
    ],
    hint: { centenas: 4, dezenas: 8, unidades: 2, text: '482 = 400 + 80 + 2 = 400 + 70 + 12.' }
  },
  {
    id: 't3_q6',
    tier: 3,
    title: 'Desagrupando Centena em 539',
    targetNumber: 539,
    type: 'choose_addition',
    questionText: 'Se desagruparmos 1 centena de 539 para as dezenas, teremos:',
    options: [
      { id: 'opt1', text: '400 + 130 + 9', expression: '400 + 130 + 9', isCorrect: true, explanation: 'Sensacional! 400 + 130 = 530, mais 9 = 539!' },
      { id: 'opt2', text: '500 + 130 + 9', expression: '500 + 130 + 9 = 639', isCorrect: false, explanation: 'Ficou com 100 a mais.' },
      { id: 'opt3', text: '400 + 30 + 9', expression: '400 + 30 + 9 = 439', isCorrect: false, explanation: 'Faltam 100.' },
      { id: 'opt4', text: '400 + 140 + 9', expression: '400 + 140 + 9 = 549', isCorrect: false, explanation: 'Passou de 539.' }
    ],
    hint: { centenas: 5, dezenas: 3, unidades: 9, text: '500 + 30 + 9 = 400 + (100 + 30) + 9 = 400 + 130 + 9.' }
  },
  {
    id: 't3_q7',
    tier: 3,
    title: 'Em 2 Parcelas: 394',
    targetNumber: 394,
    type: 'choose_addition',
    questionText: 'Como compor 394 em apenas duas parcelas?',
    options: [
      { id: 'opt1', text: '300 + 94', expression: '300 + 94', isCorrect: true, explanation: 'Muito bem! Centena inteira (300) mais dezenas e unidades (94) = 394.' },
      { id: 'opt2', text: '30 + 94', expression: '30 + 94 = 124', isCorrect: false, explanation: 'Dá 124.' },
      { id: 'opt3', text: '300 + 904', expression: '300 + 904 = 1204', isCorrect: false, explanation: 'Passa de 1000.' },
      { id: 'opt4', text: '390 + 14', expression: '390 + 14 = 404', isCorrect: false, explanation: 'Passa para 404.' }
    ],
    hint: { centenas: 3, dezenas: 9, unidades: 4, text: '300 + 94 = 394.' }
  },
  {
    id: 't3_q8',
    tier: 3,
    title: 'Troca de Dezena em 461',
    targetNumber: 461,
    type: 'choose_addition',
    questionText: 'Qual das adições forma o número 461?',
    options: [
      { id: 'opt1', text: '400 + 50 + 11', expression: '400 + 50 + 11', isCorrect: true, explanation: 'Exato! 50 + 11 = 61, e 400 + 61 = 461.' },
      { id: 'opt2', text: '400 + 60 + 11', expression: '400 + 60 + 11 = 471', isCorrect: false, explanation: 'Passa de 461.' },
      { id: 'opt3', text: '400 + 40 + 11', expression: '400 + 40 + 11 = 451', isCorrect: false, explanation: 'Faltam 10.' },
      { id: 'opt4', text: '300 + 50 + 11', expression: '300 + 50 + 11 = 361', isCorrect: false, explanation: 'Faltam 100.' }
    ],
    hint: { centenas: 4, dezenas: 6, unidades: 1, text: '461 = 400 + 50 + 11.' }
  },
  {
    id: 't3_q9',
    tier: 3,
    title: 'Qual NÃO é 578?',
    targetNumber: 578,
    type: 'which_is_not',
    questionText: 'Três opções somam 578, mas UMA NÃO soma. Qual NÃO representa 578?',
    options: [
      { id: 'opt1', text: '500 + 70 + 80', expression: '500 + 70 + 80 = 650', isCorrect: true, explanation: 'Parabéns! 500 + 70 + 80 = 650, portanto NÃO é 578 (o 8 é unidade, não 80)!' },
      { id: 'opt2', text: '500 + 70 + 8', expression: '500 + 70 + 8 = 578', isCorrect: false, explanation: 'Esta representa 578 sim!' },
      { id: 'opt3', text: '400 + 170 + 8', expression: '400 + 170 + 8 = 578', isCorrect: false, explanation: 'Esta representa 578 sim!' },
      { id: 'opt4', text: '500 + 60 + 18', expression: '500 + 60 + 18 = 578', isCorrect: false, explanation: 'Esta representa 578 sim!' }
    ],
    hint: { centenas: 5, dezenas: 7, unidades: 8, text: 'Atenção ao distrator que usou 80 em vez de 8.' }
  },
  {
    id: 't3_q10',
    tier: 3,
    title: 'Zero na Dezena em 305',
    targetNumber: 305,
    type: 'choose_addition',
    questionText: 'Qual das alternativas decompõe corretamente o número 305?',
    options: [
      { id: 'opt1', text: '300 + 5', expression: '300 + 5', isCorrect: true, explanation: 'Perfeito! 3 centenas (300) + 5 unidades (5) = 305.' },
      { id: 'opt2', text: '300 + 50', expression: '300 + 50 = 350', isCorrect: false, explanation: '300 + 50 é 350, o 5 está na unidade!' },
      { id: 'opt3', text: '30 + 5', expression: '30 + 5 = 35', isCorrect: false, explanation: 'Dá apenas 35.' },
      { id: 'opt4', text: '300 + 500', expression: '300 + 500 = 800', isCorrect: false, explanation: 'Passa para 800.' }
    ],
    hint: { centenas: 3, dezenas: 0, unidades: 5, text: 'Como a dezena é 0, temos apenas 300 + 5.' }
  },

  // ================= TIER 4: Mestre dos Números (Até 999 - Estilo Saeb - 10 Desafios) =================
  {
    id: 't4_q1',
    tier: 4,
    title: 'Atenção ao Detalhe: Número 645',
    targetNumber: 645,
    type: 'which_is_not',
    questionText: 'Três das adições abaixo representam o número 645, mas UMA NÃO representa. Qual NÃO é 645?',
    options: [
      { id: 'opt1', text: '600 + 40 + 50', expression: '600 + 40 + 50 = 690', isCorrect: true, explanation: 'Acertou em cheio! 600 + 40 + 50 = 690, portanto NÃO é 645 (a unidade deveria ser 5, não 50)!' },
      { id: 'opt2', text: '600 + 40 + 5', expression: '600 + 40 + 5 = 645', isCorrect: false, explanation: 'Essa representa sim 645! (600 + 40 + 5 = 645)' },
      { id: 'opt3', text: '600 + 45', expression: '600 + 45 = 645', isCorrect: false, explanation: 'Essa representa sim 645! (600 + 45 = 645)' },
      { id: 'opt4', text: '500 + 140 + 5', expression: '500 + 140 + 5 = 645', isCorrect: false, explanation: 'Essa representa sim 645! 500 + 140 = 640, com 5 dá 645!' }
    ],
    hint: { centenas: 6, dezenas: 4, unidades: 5, text: 'Cuidado com a pegadinha! Procure a soma cujo resultado NÃO é 645.' }
  },
  {
    id: 't4_q2',
    tier: 4,
    title: 'A Fábrica de Brinquedos: 789 Peças',
    targetNumber: 789,
    type: 'choose_addition',
    questionText: 'Uma fábrica embalou 789 brinquedos em caixas de 100, pacotes de 10 e unidades soltas. Qual das somas mostra isso com 6 caixas de 100?',
    options: [
      { id: 'opt1', text: '600 + 180 + 9', expression: '600 + 180 + 9', isCorrect: true, explanation: 'Fantástico! 6 caixas de 100 dão 600. Mais 18 pacotes de 10 dão 180 (600 + 180 = 780), mais 9 soltos = 789!' },
      { id: 'opt2', text: '600 + 80 + 9', expression: '600 + 80 + 9 = 689', isCorrect: false, explanation: '600 + 80 + 9 dá 689, faltam 100 para 789.' },
      { id: 'opt3', text: '600 + 18 + 9', expression: '600 + 18 + 9 = 627', isCorrect: false, explanation: '600 + 18 + 9 = 627, não chega a 789.' },
      { id: 'opt4', text: '600 + 280 + 9', expression: '600 + 280 + 9 = 889', isCorrect: false, explanation: '600 + 280 + 9 = 889, passou de 789.' }
    ],
    hint: { centenas: 7, dezenas: 8, unidades: 9, text: '700 + 80 + 9 = 789. Se usamos 600 (6 caixas), sobram 180 para os pacotes de dez!' }
  },
  {
    id: 't4_q3',
    tier: 4,
    title: 'A Decomposição de 804',
    targetNumber: 804,
    type: 'choose_addition',
    questionText: 'Como podemos decompor o número 804 por meio de adições?',
    options: [
      { id: 'opt1', text: '800 + 4', expression: '800 + 4', isCorrect: true, explanation: 'Certíssimo! Como a ordem da dezena é zero, temos 8 centenas (800) e 4 unidades (4): 800 + 4 = 804!' },
      { id: 'opt2', text: '80 + 4', expression: '80 + 4 = 84', isCorrect: false, explanation: '80 + 4 é 84. O número 804 tem 8 centenas (800)!' },
      { id: 'opt3', text: '800 + 40', expression: '800 + 40 = 840', isCorrect: false, explanation: '800 + 40 é 840, não 804.' },
      { id: 'opt4', text: '800 + 400', expression: '800 + 400 = 1200', isCorrect: false, explanation: '800 + 400 = 1200, passa muito.' }
    ],
    hint: { centenas: 8, dezenas: 0, unidades: 4, text: 'O número 804 não possui dezenas inteiras (é 0 na dezena): 800 + 4.' }
  },
  {
    id: 't4_q4',
    tier: 4,
    title: 'Desafio Máximo: Três Adições para 952',
    targetNumber: 952,
    type: 'choose_addition',
    questionText: 'Qual das adições abaixo forma corretamente o número 952 com troca entre centenas e dezenas?',
    options: [
      { id: 'opt1', text: '800 + 150 + 2', expression: '800 + 150 + 2', isCorrect: true, explanation: 'Genial! 800 + 150 = 950. Com mais 2, temos 952! Uma decomposição perfeita de 3 ordens!' },
      { id: 'opt2', text: '900 + 50 + 20', expression: '900 + 50 + 20 = 970', isCorrect: false, explanation: '900 + 50 + 20 = 970, passa de 952.' },
      { id: 'opt3', text: '800 + 50 + 2', expression: '800 + 50 + 2 = 852', isCorrect: false, explanation: '800 + 50 + 2 dá 852, faltam 100.' },
      { id: 'opt4', text: '700 + 150 + 2', expression: '700 + 150 + 2 = 852', isCorrect: false, explanation: '700 + 150 + 2 dá 852, não chega em 952.' }
    ],
    hint: { centenas: 9, dezenas: 5, unidades: 2, text: '952 = 900 + 50 + 2. Se diminuímos 100 do 900 (ficando 800), juntamos 100 ao 50 (ficando 150)!' }
  },
  {
    id: 't4_q5',
    tier: 4,
    title: 'Troca de Centena em 630',
    targetNumber: 630,
    type: 'choose_addition',
    questionText: 'Qual adição forma o número 630 com 5 centenas?',
    options: [
      { id: 'opt1', text: '500 + 130', expression: '500 + 130', isCorrect: true, explanation: 'Exato! 500 + 130 = 630. A centena que faltou foi somada às 3 dezenas!' },
      { id: 'opt2', text: '500 + 30', expression: '500 + 30 = 530', isCorrect: false, explanation: 'Dá 530, faltam 100.' },
      { id: 'opt3', text: '500 + 13', expression: '500 + 13 = 513', isCorrect: false, explanation: 'Dá 513.' },
      { id: 'opt4', text: '600 + 130', expression: '600 + 130 = 730', isCorrect: false, explanation: 'Passa para 730.' }
    ],
    hint: { centenas: 6, dezenas: 3, unidades: 0, text: '630 = 500 + 130.' }
  },
  {
    id: 't4_q6',
    tier: 4,
    title: 'Duas Parcelas para 715',
    targetNumber: 715,
    type: 'choose_addition',
    questionText: 'Como decompor 715 juntando dezenas e unidades?',
    options: [
      { id: 'opt1', text: '700 + 15', expression: '700 + 15', isCorrect: true, explanation: 'Perfeito! 700 + 15 = 715.' },
      { id: 'opt2', text: '70 + 15', expression: '70 + 15 = 85', isCorrect: false, explanation: 'Dá apenas 85.' },
      { id: 'opt3', text: '700 + 150', expression: '700 + 150 = 850', isCorrect: false, explanation: 'Passa para 850.' },
      { id: 'opt4', text: '710 + 15', expression: '710 + 15 = 725', isCorrect: false, explanation: 'Passa para 725.' }
    ],
    hint: { centenas: 7, dezenas: 1, unidades: 5, text: '7 centenas inteiras (700) + 15 unidades = 715.' }
  },
  {
    id: 't4_q7',
    tier: 4,
    title: 'Reagrupando Dezenas em 876',
    targetNumber: 876,
    type: 'choose_addition',
    questionText: 'Qual das alternativas decompõe 876 trocando 1 dezena por 10 unidades?',
    options: [
      { id: 'opt1', text: '800 + 60 + 16', expression: '800 + 60 + 16', isCorrect: true, explanation: 'Sensacional! 60 + 16 = 76, e 800 + 76 = 876!' },
      { id: 'opt2', text: '800 + 70 + 16', expression: '800 + 70 + 16 = 886', isCorrect: false, explanation: 'Passa de 876.' },
      { id: 'opt3', text: '800 + 50 + 16', expression: '800 + 50 + 16 = 866', isCorrect: false, explanation: 'Faltam 10.' },
      { id: 'opt4', text: '700 + 60 + 16', expression: '700 + 60 + 16 = 776', isCorrect: false, explanation: 'Faltam 100.' }
    ],
    hint: { centenas: 8, dezenas: 7, unidades: 6, text: '876 = 800 + 70 + 6 = 800 + 60 + 16.' }
  },
  {
    id: 't4_q8',
    tier: 4,
    title: 'Zero na Dezena em 908',
    targetNumber: 908,
    type: 'choose_addition',
    questionText: 'Qual adição forma o número 908?',
    options: [
      { id: 'opt1', text: '900 + 8', expression: '900 + 8', isCorrect: true, explanation: 'Corretíssimo! 9 centenas (900) e 8 unidades (8) = 908.' },
      { id: 'opt2', text: '900 + 80', expression: '900 + 80 = 980', isCorrect: false, explanation: '900 + 80 = 980, não 908.' },
      { id: 'opt3', text: '90 + 8', expression: '90 + 8 = 98', isCorrect: false, explanation: 'Dá apenas 98.' },
      { id: 'opt4', text: '900 + 800', expression: '900 + 800 = 1700', isCorrect: false, explanation: 'Passa muito.' }
    ],
    hint: { centenas: 9, dezenas: 0, unidades: 8, text: '900 + 8 = 908.' }
  },
  {
    id: 't4_q9',
    tier: 4,
    title: 'Termo Ausente em 742',
    targetNumber: 742,
    type: 'find_missing_term',
    questionText: 'Complete a igualdade com troca de centena: 742 = 600 + ___ + 2',
    options: [
      { id: 'opt1', text: '140', expression: '600 + 140 + 2 = 742', isCorrect: true, explanation: 'Espetacular! 600 + 140 = 740, mais 2 = 742!' },
      { id: 'opt2', text: '40', expression: '600 + 40 + 2 = 642', isCorrect: false, explanation: 'Dá 642, faltam 100.' },
      { id: 'opt3', text: '14', expression: '600 + 14 + 2 = 616', isCorrect: false, explanation: 'Dá 616.' },
      { id: 'opt4', text: '240', expression: '600 + 240 + 2 = 842', isCorrect: false, explanation: 'Passa para 842.' }
    ],
    hint: { centenas: 7, dezenas: 4, unidades: 2, text: '600 + 140 + 2 = 742.' }
  },
  {
    id: 't4_q10',
    tier: 4,
    title: 'Grande Decomposição de 999',
    targetNumber: 999,
    type: 'choose_addition',
    questionText: 'Qual das adições forma o maior número de 3 ordens, 999, com troca de 1 centena por dezenas?',
    options: [
      { id: 'opt1', text: '800 + 190 + 9', expression: '800 + 190 + 9', isCorrect: true, explanation: 'Fantástico! 800 + 190 = 990, mais 9 = 999! Você domina o Descritor D08!' },
      { id: 'opt2', text: '800 + 90 + 9', expression: '800 + 90 + 9 = 899', isCorrect: false, explanation: 'Dá 899, faltam 100.' },
      { id: 'opt3', text: '900 + 190 + 9', expression: '900 + 190 + 9 = 1099', isCorrect: false, explanation: 'Passa de 1000.' },
      { id: 'opt4', text: '700 + 190 + 9', expression: '700 + 190 + 9 = 899', isCorrect: false, explanation: 'Dá 899.' }
    ],
    hint: { centenas: 9, dezenas: 9, unidades: 9, text: '800 + 190 + 9 = 999.' }
  }
];

export const TIER_CONFIG = [
  {
    tier: 1,
    name: 'Nível 1: Dezenas & Unidades',
    range: 'Números até 99',
    description: 'Componha e decomponha dezenas e unidades com adições canônicas e primeiras trocas.',
    color: 'emerald'
  },
  {
    tier: 2,
    name: 'Nível 2: Primeiras Centenas',
    range: 'Números de 100 a 300',
    description: 'Explore a 3ª ordem (Centenas) com situações reais de cédulas e material dourado.',
    color: 'sky'
  },
  {
    tier: 3,
    name: 'Nível 3: Trocas & Reagrupamentos',
    range: 'Números de 300 a 600',
    description: 'Desvende adições não-canônicas: trocando centenas por dezenas e dezenas por unidades.',
    color: 'amber'
  },
  {
    tier: 4,
    name: 'Nível 4: Mestre dos Números (SAEB)',
    range: 'Números até 999',
    description: 'Resolva questões no formato das avaliações oficiais (SAEB/SPAECE D08) com distratores.',
    color: 'purple'
  }
];

/**
 * Generator for dynamic endless challenges
 */
export function generateRandomD08Problem(tier: 1 | 2 | 3 | 4): D08Question {
  let targetNumber = 100;
  if (tier === 1) {
    const tens = Math.floor(Math.random() * 8) + 2; // 2..9
    const units = Math.floor(Math.random() * 9) + 1; // 1..9
    targetNumber = tens * 10 + units;
  } else if (tier === 2) {
    const hundreds = Math.floor(Math.random() * 2) + 1; // 1..2
    const tens = Math.floor(Math.random() * 9) + 1;
    const units = Math.floor(Math.random() * 9) + 1;
    targetNumber = hundreds * 100 + tens * 10 + units;
  } else if (tier === 3) {
    const hundreds = Math.floor(Math.random() * 3) + 3; // 3..5
    const tens = Math.floor(Math.random() * 8) + 2;
    const units = Math.floor(Math.random() * 9) + 1;
    targetNumber = hundreds * 100 + tens * 10 + units;
  } else {
    const hundreds = Math.floor(Math.random() * 4) + 6; // 6..9
    const tens = Math.floor(Math.random() * 9);
    const units = Math.floor(Math.random() * 9) + 1;
    targetNumber = hundreds * 100 + tens * 10 + units;
  }

  const c = Math.floor(targetNumber / 100);
  const d = Math.floor((targetNumber % 100) / 10);
  const u = targetNumber % 10;

  // Decide decomposition type
  const style = Math.random() > 0.5 ? 'non_canonical' : 'canonical';

  let correctExpression = '';
  let correctText = '';
  let explanation = '';

  if (style === 'canonical' || c === 0) {
    if (c > 0) {
      correctExpression = `${c * 100} + ${d * 10} + ${u}`;
      correctText = `${c * 100} + ${d * 10} + ${u}`;
      explanation = `Exato! ${c} centenas (${c * 100}) + ${d} dezenas (${d * 10}) + ${u} unidades (${u}) = ${targetNumber}!`;
    } else {
      correctExpression = `${d * 10} + ${u}`;
      correctText = `${d * 10} + ${u}`;
      explanation = `Perfeito! ${d} dezenas (${d * 10}) + ${u} unidades (${u}) = ${targetNumber}!`;
    }
  } else {
    // Non canonical exchange
    if (c >= 1 && d >= 1) {
      // Transfer 100 to tens: (c-1)*100 + (100 + d*10) + u
      const newC = (c - 1) * 100;
      const newD = 100 + d * 10;
      correctExpression = newC > 0 ? `${newC} + ${newD} + ${u}` : `${newD} + ${u}`;
      correctText = correctExpression;
      explanation = `Incrível! ${correctExpression} = ${targetNumber}. Foi feita uma troca de 1 centena por 10 dezenas!`;
    } else {
      // Transfer 10 to units: c*100 + (d-1)*10 + (10 + u)
      const newD = (d - 1) * 10;
      const newU = 10 + u;
      correctExpression = `${c * 100} + ${newD} + ${newU}`;
      correctText = correctExpression;
      explanation = `Muito bem! ${correctExpression} = ${targetNumber}. Foi feita uma troca de 1 dezena por 10 unidades!`;
    }
  }

  // Create 3 plausible distractors
  const distractors: { text: string; exp: string; isCorrect: boolean; explanation: string }[] = [];
  
  if (c > 0) {
    distractors.push({
      text: `${c * 10} + ${d * 10} + ${u}`,
      exp: `${c * 10} + ${d * 10} + ${u}`,
      isCorrect: false,
      explanation: `Atenção: ${c * 10} são apenas ${c} dezenas, mas ${targetNumber} tem ${c} centenas (${c * 100})!`
    });
  } else {
    distractors.push({
      text: `${d} + ${u}`,
      exp: `${d} + ${u}`,
      isCorrect: false,
      explanation: `Cuidado: ${d} + ${u} = ${d + u}. O ${d} vale ${d * 10}!`
    });
  }

  distractors.push({
    text: c > 0 ? `${c * 100} + ${(d + 1) * 10} + ${u}` : `${(d + 1) * 10} + ${u}`,
    exp: c > 0 ? `${c * 100} + ${(d + 1) * 10} + ${u}` : `${(d + 1) * 10} + ${u}`,
    isCorrect: false,
    explanation: `Essa soma passa em 10 unidades do número ${targetNumber}!`
  });

  distractors.push({
    text: c > 0 ? `${c * 100} + ${d * 100} + ${u}` : `${d * 10} + ${u * 10}`,
    exp: c > 0 ? `${c * 100} + ${d * 100} + ${u}` : `${d * 10} + ${u * 10}`,
    isCorrect: false,
    explanation: `A ordem das dezenas foi confundida com centenas!`
  });

  const options = [
    {
      id: 'opt_correct',
      text: correctText,
      expression: correctExpression,
      isCorrect: true,
      explanation
    },
    ...distractors.map((d, idx) => ({
      id: `opt_dist_${idx}`,
      text: d.text,
      expression: d.exp,
      isCorrect: false,
      explanation: d.explanation
    }))
  ];

  // Shuffle options
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  return {
    id: `dyn_${Date.now()}_${targetNumber}`,
    tier,
    title: `Desafio Especial: Número ${targetNumber}`,
    targetNumber,
    type: 'choose_addition',
    questionText: `Qual das diferentes adições forma exatamente o número ${targetNumber}?`,
    options,
    hint: {
      centenas: c,
      dezenas: d,
      unidades: u,
      text: `O número ${targetNumber} possui ${c} centenas (${c * 100}), ${d} dezenas (${d * 10}) e ${u} unidades (${u}).`
    }
  };
}

/**
 * Fisher-Yates array shuffling algorithm
 */
export function shuffleArray<T>(array: T[]): T[] {
  const cloned = [...array];
  for (let i = cloned.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
  }
  return cloned;
}

/**
 * Shuffles alternatives (options) inside a question
 */
export function shuffleQuestion(question: D08Question): D08Question {
  return {
    ...question,
    options: shuffleArray(question.options)
  };
}

/**
 * Returns a randomized set of 10 questions for a tier with randomized alternatives
 */
export function getShuffledTierQuestions(tier: 1 | 2 | 3 | 4, count: number = 10): D08Question[] {
  const staticQuestions = D08_STATIC_QUESTIONS.filter(q => q.tier === tier);
  let pool = shuffleArray(staticQuestions);

  // If pool has fewer than count, top it up with dynamic questions
  while (pool.length < count) {
    pool.push(generateRandomD08Problem(tier));
  }

  // Slice exactly count (e.g. 10)
  const selected = pool.slice(0, count);
  return selected.map(q => shuffleQuestion(q));
}
