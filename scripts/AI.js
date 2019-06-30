const HUMAN = 'X'
const COMP = 'O'

function evaluate(gameState, size, winningLength, nextMove, lastMove) {
  const x = parseInt(lastMove[0])
  const y = parseInt(lastMove[1])
  const nextX = nextMove[0]
  const nextY = nextMove[1]

  if (gameOver(gameState, size, winningLength, lastMove)) return Number.MAX_SAFE_INTEGER

  const score1 = evaluateLines(gameState, x, y, size, winningLength, HUMAN, nextX, nextY)
  gameState[nextX][nextY] = COMP
  const score2 = evaluateLines(gameState, nextX, nextY, size, winningLength, COMP, nextX, nextY)

  return Math.max(score1, score2 + 1)
}

function evaluateLines(gameState, x, y, size, winningLength, player, nextX, nextY) {
  let score = 1
  const opponent = player === HUMAN ? COMP : HUMAN

  for (let k = 2; k <= winningLength; k++) {
    for (let i = x - k + 1, countMe = 1; i < x + k && i < size; i++) {
      if (i < 0) continue
      if (gameState[i][y] === player) {
        countMe *= 100
        if (score < countMe) score = countMe
      } else if (gameState[i][y] === opponent) countMe = 1
    }

    for (let i = y - k + 1, countMe = 1; i < y + k && i < size; i++) {
      if (i < 0) continue
      if (gameState[x][i] === player) {
        countMe *= 100
        if (score < countMe) score = countMe
      } else if (gameState[i][y] === opponent) countMe = 1
    }

    for (
      let i = x - k + 1, j = y - k + 1, countMe = 1;
      i < x + k && i < size && j < y + k && j < size;
      i++, j++
    ) {
      if (i < 0 || j < 0) continue
      if (gameState[i][j] === player) {
        countMe *= 101
        if (score < countMe) score = countMe
      } else if (gameState[i][y] === opponent) countMe = 1
    }

    for (
      let i = x - k + 1, j = y + k - 1, countMe = 1;
      i < x + k && i < size && j > y - k && j >= 0;
      i++, j--
    ) {
      if (i < 0 || j >= size) continue
      if (gameState[i][j] === player) {
        countMe *= 101
        if (score < countMe) score = countMe
      } else if (gameState[i][y] === opponent) countMe = 1
    }
  }

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++)
      if (nextX + i >= 0 && nextX + i < size)
        if (gameState[nextX + i][nextY + j] === player) score *= 1.1
  }

  if (player === HUMAN) {
    if (
      nextX + 1 < size &&
      nextX - 1 >= 0 &&
      gameState[nextX - 1][nextY] === player &&
      gameState[nextX + 1][nextY] === player &&
      gameState[nextX][nextY + 1] === player &&
      gameState[nextX][nextY - 1] === player
    )
      score *= 102
    if (
      nextX + 1 < size &&
      nextX - 1 >= 0 &&
      gameState[nextX - 1][nextY - 1] === player &&
      gameState[nextX + 1][nextY - 1] === player &&
      gameState[nextX - 1][nextY + 1] === player &&
      gameState[nextX + 1][nextY + 1] === player
    )
      score *= 102
  }

  if (player === COMP && size === 3) {
    if (x === 0 && y === 0) score *= 5
    if (x === 0 && y === size - 1) score *= 5
    if (x === size - 1 && y === size - 1) score *= 5
    if (x === size - 1 && y === 0) score *= 5
  }

  return score
}

export function gameOver(gameState, size, winningLength, lastMove) {
  const x = lastMove[0]
  const y = lastMove[1]
  const player = gameState[x][y]

  for (
    let i = x - winningLength + 1, count = 0, line = [];
    i < x + winningLength && i < size;
    i++
  ) {
    if (i < 0) continue
    if (gameState[i][y] === player) {
      count += 1
      line.push(`${i}${y}`)
    } else {
      count = 0
      line = []
    }
    if (count === winningLength) {
      return { winningLine: line, lineOrientation: 'vertical' }
    }
  }

  for (
    let i = y - winningLength + 1, count = 0, line = [];
    i < y + winningLength && i < size;
    i++
  ) {
    if (i < 0) continue
    if (gameState[x][i] === player) {
      count += 1
      line.push(`${x}${i}`)
    } else {
      count = 0
      line = []
    }
    if (count === winningLength) {
      return { winningLine: line, lineOrientation: 'horizontal' }
    }
  }

  for (
    let i = x - winningLength + 1, j = y - winningLength + 1, count = 0, line = [];
    i < x + winningLength && i < size && j < y + winningLength && j < size;
    i++, j++
  ) {
    if (i < 0 || j < 0) continue
    if (gameState[i][j] === player) {
      count += 1
      line.push(`${i}${j}`)
    } else {
      count = 0
      line = []
    }
    if (count === winningLength) {
      return { winningLine: line, lineOrientation: 'diagonal' }
    }
  }

  for (
    let i = x - winningLength + 1, j = y + winningLength - 1, count = 0, line = [];
    i < x + winningLength && i < size && j > y - winningLength && j >= 0;
    i++, j--
  ) {
    if (i < 0 || j >= size) continue
    if (gameState[i][j] === player) {
      count += 1
      line.push(`${i}${j}`)
    } else {
      count = 0
      line = []
    }
    if (count === winningLength) {
      return { winningLine: line, lineOrientation: 'diagonalback' }
    }
  }
  return false
}

function emptyCells(state, size) {
  const cells = []
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
      if (!state[x][y]) cells.push([x, y])
    }
  }

  return cells
}

export function computer(state, size, winningLength, lastMove) {
  let best = [-1, -1, Number.MIN_SAFE_INTEGER]

  emptyCells(state, size).forEach(function(cell) {
    const x = cell[0]
    const y = cell[1]
    state[x][y] = COMP
    if (gameOver(state, size, winningLength, [x, y])) {
      state[x][y] = null
      best = [x, y]
      return
    }
    state[x][y] = HUMAN
    const score = [-1, -1, evaluate(state, size, winningLength, [x, y], lastMove)]
    state[x][y] = null
    score[0] = x
    score[1] = y

    if (score[2] > best[2]) best = score
  })

  if (best[0] === -1) {
    best[0] = emptyCells(state, size)[0][0]
    best[1] = emptyCells(state, size)[0][1]
  }

  return best
}
