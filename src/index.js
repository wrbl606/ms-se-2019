import { generateTree } from './tree/generation'
import { swap, newSwap, compareArrays } from './tree/swap'
import {findIndex} from '../drzewa/src/tree/modification'

function printTree (tree) {
  console.log('print tree', JSON.stringify(tree))
}

const tree = generateTree(4, 2)
//printTree(tree)

const t2 = generateTree(2, 2)
//printTree(t2)
const swappedT2 = newSwap(t2, [1, 0], [1, 1])
//printTree(swappedT2)
console.log('swap test', JSON.stringify(swappedT2).includes(JSON.stringify([3, [2, 1]])))

const t1 = generateTree(6, 5)
const c1 = t1[1][4][1][3]
const c2 = t1[1][4][1][0]
const a = [1, 4, 1, 3]
const b = [1, 4, 1, 0]

const swappedTree = newSwap(t1, a, b)
console.log('swapped', typeof swappedTree)
//printTree(swappedTree)


let toFind=11;
let i=findIndex(toFind, tree);
let j=findIndex(toFind-1, tree);
printTree(tree);
const swappedTree2 = newSwap(tree, i, j);
printTree(swappedTree2, "\n", tree);
