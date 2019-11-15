import { generateTree } from './tree/generation'
import { swap, newSwap } from './tree/swap'

function printTree (tree) {
  console.log(JSON.stringify(tree))
}

const tree = generateTree(4, 2)
printTree(tree)

const t1 = generateTree(6, 5)
const a = [1, 4, 1, 3]
const b = [1, 4, 1, 0]

const swappedTree = newSwap(t1[0], a, b)
console.log('swapped', typeof swappedTree)
printTree(swappedTree)
