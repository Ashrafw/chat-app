import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const markdownCheck = `
In JavaScript, a closure is a combination of a function and the lexical environment within which that function was declared. This lexical environment consists of the variables and their values available to the function at the time of its creation. Closures allow functions to access variables from their outer (enclosing) scope even after the outer function has finished executing.

Here's a simple example to illustrate closures:

\`\`\`javascript
function outerFunction() {
  let outerVariable = 'I am from the outer function';

  function innerFunction() {
    console.log(outerVariable);
  }

  return innerFunction;
}

// Create a closure by calling outerFunction
let closure = outerFunction();

// Execute the closure
closure(); // Output: "I am from the outer function"
\`\`\`

In this example, \`innerFunction\` is defined inside \`outerFunction\`, and it has access to the \`outerVariable\`. When \`outerFunction\` is called, it returns \`innerFunction\`, forming a closure. Even though \`outerFunction\` has finished executing, the closure retains access to the \`outerVariable\`.
In JavaScript, a closure is a combination of a function and the lexical environment within which that function was declared. This lexical environment consists of the variables and their values available to the function at the time of its creation. Closures allow functions to access variables from their outer (enclosing) scope even after the outer function has finished executing.

In JavaScript, a closure is a combination of a function and the lexical environment within which that function was declared. This lexical environment consists of the variables and their values available to the function at the time of its creation. Closures allow functions to access variables from their outer (enclosing) scope even after the outer function has finished executing.

In JavaScript, a closure is a combination of a function and the lexical environment within which that function was declared. This lexical environment consists of the variables and their values available to the function at the time of its creation. Closures allow functions to access variables from their outer (enclosing) scope even after the outer function has finished executing.

In JavaScript, a closure is a combination of a function and the lexical environment within which that function was declared. This lexical environment consists of the variables and their values available to the function at the time of its creation. Closures allow functions to access variables from their outer (enclosing) scope even after the outer function has finished executing.



Closures are powerful in JavaScript and are often used to create private variables, implement data encapsulation, and manage state in functional programming paradigms. They play a crucial role in creating modular and maintainable code.
`;
