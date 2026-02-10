// The Trampoline
function trampoline(fn) {
  let result = fn();
  while (typeof result === 'function') {
    result = result();
  }
  return result;
}
// Recursive Flattening
function flattenRecursive(arr, result = []) {
    if (arr.length === 0) return result;

    const [first, ...rest] = arr;

    if (Array.isArray(first)) {
// Return a Thunk to bounce back to trampoline
        return ()=> flattenRecursive([...first, ...rest], result);
    } else {
        result.push(first);
// Return a Thunk to move to the next item
        return () => flattenRecursive(rest, result);
    }
}
// Running of the code
const nested = [1, [2, [3, [4]]], 5];
// wrap call in an arrow function so the trampoline gets a Thunk  
const finalArray = trampoline(() => flattenRecursive(nested));

console.log(finalArray); 

function recursiveCount(n, acc = 0) {
  if (n === 0) return acc;
  return () => recursiveCount(n - 1, acc + 1);
}

const result = trampoline(() => recursiveCount(100000));
console.log(result); // 100000