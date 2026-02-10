let callStackCounter = 0;
 
function measureStackDepth() {
  callStackCounter++;
 
 
  measureStackDepth();
}
 
 
try {
  measureStackDepth();
} catch (error) {
   console.log(`Stack overflow error caught!`);
console.log(`Error message: ${error.message}`);
console.log(`Maximum call stack size: ${callStackCounter} calls`);
}
 