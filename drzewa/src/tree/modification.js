const exampleFunction = {
  label: 'example',
  levels: {
    0: [],
  },
};

export function reverseFunction(fun = exampleFunction) {
  const levels = {};
  for (const levelKey in fun.levels) {
    const reversedFunction = [];
    for (let i = fun.levels[levelKey].length - 1; i >= 0; i--) {
      reversedFunction.push(fun.levels[levelKey][i]);
    }
    levels[levelKey] = reversedFunction;
  }
  return {
    levels
  };
}

export function joinFunctions(funA = exampleFunction, funB = exampleFunction) {
  const levels = {};
  for (const levelKey in funA.levels) {
    const newLevel = [];
    for (let i = 0; i < funA.levels[levelKey].length; i++) {
      newLevel.push(funA.levels[levelKey][i]);
    }
    levels[levelKey] = newLevel;
  }

  for (const levelKey in funB.levels) {
    const newLevel = [];
    for (let i = 0; i < funB.levels[levelKey].length; i++) {
      newLevel.push(funB.levels[levelKey][i]);
    }
    if (!Object.keys(levels).includes(levelKey)) {
      levels[levelKey] = newLevel;
    } else {
      levels[levelKey] = [...levels[levelKey], ...newLevel];
    }
  }
  return {
    levels
  };
}

export function joinManyFunctions(funs = []) {
  if (funs.length < 1) {
    throw new Error('Too few functions to join: 0');
  }

  if (funs.length === 1) {
    return funs[0];
  }

  let joinedFunction = joinFunctions(funs.shift(), funs.shift());
  while (funs.length > 0) {
    joinedFunction = joinFunctions(joinedFunction, funs.shift());
  }
  return joinedFunction;
}

export function treeToGraph(tree = [3, [1, 2]]) {
  function getChildren(tree = [3, [1, 2]], parent = undefined) {
    const children = [];
    const name = `${tree[0]}`;

    if (Array.isArray(tree[1][1])) {
      for (let i = 1; i < tree.length; i++) {
        children.push(getChildren(tree[i], name));
      }
    } else {
      for (let i = 0; i < tree[1].length; i++) {
        children.push({ name: `${tree[1][i]}`, parent: name });
      }
    }

    return {
      name,
      children,
      parent
    };
  }

  const data = getChildren(tree);
  return data;
}


export function findIndex(valueToSearch, theArray, currentIndex='') {
  let newIndex;  
    if(Array.isArray(theArray)) {
      for (var i = 0; i < theArray.length; i++) {
        if(Array.isArray(theArray[i])) {
          newIndex = findIndex(valueToSearch, theArray[i], currentIndex + i + ',');
            if (newIndex) return newIndex;
         } else if (theArray[i] == valueToSearch) {
             return (currentIndex + i).split(',');
         }
      }
    } else if (theArray == valueToSearch) {
        return (currentIndex + i).split(',');
    }
    return false;
}