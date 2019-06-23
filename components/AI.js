/*Code of Minmax here*/

const HUMAN = -1
const COMP = +1

/* Function to heuristic evaluation of state. */
function evalute(state) {
  let score = 0

  if (gameOver(state, COMP)) {
    score = +1
  } else if (gameOver(state, HUMAN)) {
    score = -1
  } else {
    score = 0
  }

  return score
}

/* This function tests if a specific player wins */
function gameOver(state, player) {
  const win_state = [
    [state[0][0], state[0][1], state[0][2]],
    [state[1][0], state[1][1], state[1][2]],
    [state[2][0], state[2][1], state[2][2]],
    [state[0][0], state[1][0], state[2][0]],
    [state[0][1], state[1][1], state[2][1]],
    [state[0][2], state[1][2], state[2][2]],
    [state[0][0], state[1][1], state[2][2]],
    [state[2][0], state[1][1], state[0][2]]
  ]

  for (let i = 0; i < 8; i++) {
    const line = win_state[i]
    let filled = 0
    for (let j = 0; j < 3; j++) {
      if (line[j] === player) filled++
    }
    if (filled === 3) return true
  }
  return false
}

/* This function test if the human or computer wins */
function gameOverAll(state) {
  return gameOver(state, HUMAN) || gameOver(state, COMP)
}

function emptyCells(state) {
  const cells = []
  for (let x = 0; x < 3; x++) {
    for (let y = 0; y < 3; y++) {
      if (state[x][y] === 0) cells.push([x, y])
    }
  }

  return cells
}

/* *** AI function that choice the best move *** */

export default function minimax(state, depth, player) {
  let best

  if (player === COMP) {
    best = [-1, -1, -1000]
  } else {
    best = [-1, -1, +1000]
  }

  if (depth === 0 || gameOverAll(state)) {
    const score = evalute(state)
    return [-1, -1, score]
  }

  emptyCells(state).forEach(function(cell) {
    const x = cell[0]
    const y = cell[1]
    state[x][y] = player
    const score = minimax(state, depth - 1, -player)
    state[x][y] = 0
    score[0] = x
    score[1] = y

    if (player === COMP) {
      if (score[2] > best[2]) best = score
    } else if (score[2] < best[2]) best = score
  })

  return best
}
