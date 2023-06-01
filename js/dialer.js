export default {
  reachableKeys,
  countPaths,
  listAcyclicPaths,
};

// ****************************

function reachableKeys(startingDigit) {
  // TODO: return which digits a Knight's move
  // can hop to from a given starting digit/key
  //
  // e.g. 3 -> [ 4, 8 ]
  //      4 -> [ 3, 9, 0 ]
  //      5 -> []
  const adjListKeys = {
    1: [6, 8],
    2: [7, 9],
    3: [4, 8],
    4: [3, 9, 0],
    5: [],
    6: [1, 7, 0],
    7: [6, 2],
    8: [1, 3],
    9: [2, 4],
    0: [4, 6],
  };
  return adjListKeys[startingDigit];
}

function countPaths(startingDigit, hopCount) {
  let allPossiblePaths = 0;

  function count(currentDigit, hopCount) {
    if (hopCount === 0) {
      allPossiblePaths++;
      return;
    }
    const neighbors = reachableKeys(currentDigit);
    for (const neighbor of neighbors) {
      count(neighbor, hopCount - 1);
    }
  }
  count(startingDigit, hopCount);

  return allPossiblePaths;
}

function listAcyclicPaths(startingDigit) {
  // TODO: given the digit/key to start from,
  // return a list of the distinct acyclic
  // paths that are possible to traverse
  //
  // e.g. [
  //   [4, 3, 8, 1, 6, 7, 2, 9],
  //   [4, 3, 8, 1, 6, 0],
  //   ...
  // ]
  let allDistinctPaths = [];
  const seen = new Set();
  seen.add(startingDigit);
  // const prev = new Array(10).fill(false)

  countRecursive(startingDigit, seen, [startingDigit]);

  function countRecursive(currentDigit, seen, currentPath = []) {
    let pathForwardFound = false;

    const neighbors = reachableKeys(currentDigit);
    for (const neighbor of neighbors) {
      //pre
      if (seen.has(neighbor)) {
        continue;
      }
      pathForwardFound = true;
      seen.add(neighbor);
      currentPath.push(neighbor);

      //recurse
      countRecursive(neighbor, seen, currentPath);
    }
    if (!pathForwardFound) {
      allDistinctPaths.push([...currentPath]);
    }

    // post
    seen.delete(currentDigit);
    currentPath.pop();
  }
  // debugger;

  return allDistinctPaths;
}
