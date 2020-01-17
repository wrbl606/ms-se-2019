
/**
 * @description Function that counts the level on which
 * the branch lies.
 * @param {*} a
 * @param {Number} n
 */
export function countN (a, n = 0) {
  if (Array.isArray(a)) {
    // This is actually counting the levels to the leaves, rather than to the trunk of the tree.
    n += 1
    n = countN(a[a.length - 1], n)
  }
  return n
}

/**
 * @description Function for swapping to branches
 * @param {*} branch1
 * @param {*} branch2
 * @returns {Array} array with swapped branches
 */
export function swap (branch1, branch2) {
  if (countN(branch1) !== countN(branch2)) {
    // making sure both branches are on the same level. If they weren't, the operation would not make mathematical sense.
    throw new Error('Branches are not on the same level. Cannot swap.')
  }
  return [branch2, branch1]
}

/**
 *
 * @param {Array} tree
 * @param {Array} list1
 * @param {Array} list2
 */
export function newSwap (tree, list1, list2) {
  if (compareArrays(list1, list2)) {
    return tree
  }

  if (!compareArrays(getParents(list1), getParents(list2))) {
    throw new Error(`Cannot swap ${list1} and ${list2}. Different parents.`)
  }

  const newTree = [...tree]
  if (compareArrays(list1[0], list2[0])) {
    const newTree2 = [...newTree]
    delete newTree2[list1[0]]
    newTree2[list1[0]] = newSwap(newTree[list1[0]], removeParent(list1), removeParent(list2))
    return newTree2
  } else {
    const a = [...list1].pop()
    const b = [...list2].pop()
    const swapCache = newTree[a]
    newTree[a] = newTree[b]
    newTree[b] = swapCache
    return newTree
  }
}

export function swap2 (tree, list1, list2) {
  if (compareArrays(list1, list2)) {
    return tree
  }

  if (!compareArrays(getParents(list1), getParents(list2))) {
    console.error('Different parents! Cannot swap.')
    return tree
  }

  if (compareArrays(list1[0], list2[0])) {
    swap2(tree[list1[0]], removeParent(list1), removeParent(list2))
  } else {
    const a = list1[list1.length - 1]
    const b = list2[list2.length - 1]
    const swapCache = tree[a]
    tree[a] = tree[b]
    tree[b] = swapCache
    return tree
  }
}

export function swap3 (tree, list1, list2) {
  const swappedTree = [...tree]
  const swapPath1 = list1.reduce((accumulator, current, index) => index === 1 ? `[${accumulator}][${current}]` : `${accumulator}[${current}]`)
  const swapPath2 = list2.reduce((accumulator, current, index) => index === 1 ? `[${accumulator}][${current}]` : `${accumulator}[${current}]`)
  console.log(swapPath1, swapPath2)
  eval(`const cache = swappedTree${swapPath1}; swappedTree${swapPath1} = swappedTree${swapPath2}; swappedTree${swapPath2} = cache;`)
  return swappedTree
}

function getParents (tree) {
  const parents = [...tree]
  parents.pop()
  return parents
}

function removeParent (tree) {
  const children = [...tree]
  children.shift()
  return children
}

export function compareArrays (array1, array2) {
  if (typeof array1 !== 'object' || typeof array2 !== 'object') {
    return array1 === array2
  }
  return array1.length === array2.length && array1.every(function (value, index) { return value === array2[index] })
}
