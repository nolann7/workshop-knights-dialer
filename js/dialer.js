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

// dynamic programming - bottom up approach with tabulation
// time - O(n), space O(1)
function countPaths(startingDigit, hopCount) {
  let buckets = new Array(10).fill(1);
  for (let i = 0; i < hopCount; i++) {
    let newBuckets = new Array(10).fill(0);
    for (let j = 0; j < newBuckets.length; j++) {
      const neighbors = reachableKeys(j);
      for (const neighbor of neighbors) {
        newBuckets[j] += buckets[neighbor];
      }
    }
    buckets = newBuckets;
  }
  return buckets[startingDigit];
}

// top down approach with memoization
/* function countPaths(startingDigit, hopCount) {
  count = memoize(count);
  let allPossiblePaths = count(startingDigit, hopCount);

  function count(currentDigit, hopCount) {
    if (hopCount === 0) return 1;
    let allNeighborsPaths = 0;
    const neighbors = reachableKeys(currentDigit);
    for (const neighbor of neighbors) {
      allNeighborsPaths += count(neighbor, hopCount - 1);
    }
    return allNeighborsPaths;
  }
  // function count(currentDigit, hopCount, memo = {}) {
  //   if (hopCount === 0) {
  //     return 1;
  //   }
  //   let allNeighborsPaths = 0;
  //   const neighbors = reachableKeys(currentDigit);
  //   for (const neighbor of neighbors) {
  //     let neighborPaths = 0;
  //     if (`${neighbor}-${hopCount - 1}` in memo) {
  //       neighborPaths = memo[`${neighbor}-${hopCount - 1}`];
  //     } else {
  //       neighborPaths += count(neighbor, hopCount - 1, memo);
  //       memo[`${neighbor}-${hopCount - 1}`] = neighborPaths;
  //     }
  //     allNeighborsPaths += neighborPaths;
  //   }
  //   return allNeighborsPaths;
  // }

  return allPossiblePaths;
  
  function memoize(fn) {
    const memo = {};
    return function memoized(digit, hops) {
      if (!(`${digit}-${hops}` in memo)) {
        memo[`${digit}-${hops}`] = fn(digit, hops);
      }
      return memo[`${digit}-${hops}`];
    };
  }
} */

function listAcyclicPaths(startingDigit) {
  if (!reachableKeys(startingDigit).length) return [];
  let allDistinctPaths = [];
  const seen = new Set();
  seen.add(startingDigit);

  countRecursive(startingDigit, seen, [startingDigit]);

  function countRecursive(currentDigit, seen, currentPath = []) {
    // pre
    let pathForwardFound = false;

    const neighbors = reachableKeys(currentDigit);
    for (const neighbor of neighbors) {
      if (seen.has(neighbor)) continue;
      pathForwardFound = true;
      seen.add(neighbor);

      let nextPath = [...currentPath, neighbor];
      // currentPath.push(neighbor);

      countRecursive(neighbor, seen, nextPath);
    }
    if (!pathForwardFound) {
      allDistinctPaths.push(currentPath);
    }
    // post
    seen.delete(currentDigit);
    // currentPath.pop();
  }
  return allDistinctPaths;
}
