/**
 * @param {Number} n Number of levels
 * @param {Number} p Number of vertices
 * @returns {Number} Nodes on level
 */
export function nodesOnLvl (n, p) {
  return Math.pow(p, n)
}

/**
 * @param {Number} n Number of levels
 * @param {Number} p Number of vertices
 * @returns {Number} Sum of total nodes
 */
export function totalNodes (n, p) {
  let sum = 0
  for (let i = 0; i < n; i++) {
    sum += nodesOnLvl(i, p)
  }
  return sum
}

/**
 * @param {Number} n Number of levels
 * @param {Number} p Number of vertices for each node
 * @returns {Array} Generated tree
 */
export function generateTree (n, p) {
  const arr = []
  let tree = []

  if (n < 1 || p < 1) {
    throw new Error('Złe dane')
  }

  if (n === 1) {
    return [1]
  }

  for (let i = totalNodes(n, p); i > 0; i--) {
    arr.push(i)
  }

  // listki i ich rodzice
  let temp = []
  for (let i = 0; i < nodesOnLvl(n - 1, p); i++) {
    temp.push(arr.pop())
    if ((i + 1) % p === 0 && i !== 0) {
      tree.push([arr.pop(), ...temp])
      temp = []
    }
  }

  // TODO: generowanie wyższych gałęzi - not bad, ale refactor się przyda. Pomyślę czy da się listki i gałęzie załatwić za jednym zamachem. Wygląda nieskomplikowanie, ale teraz nie mam do tego głowy.
  const l = n - 2
  for (let j = l; j > 0; j--) {
    let temp2 = []
    for (let i = 0; i < nodesOnLvl(j, p); i++) {
      temp2.push(tree[i])
      if ((i + 1) % p === 0 && i !== 0) {
        temp.push([arr.pop(), ...temp2])
        temp2 = []
      }
    }
    if (nodesOnLvl(j, p) !== 0) {
      tree = temp
    }
    temp = []
  }

  return tree
}
