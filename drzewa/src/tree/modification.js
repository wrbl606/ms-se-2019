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
