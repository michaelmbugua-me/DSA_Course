# Check if an expression is balanced or not

> Source: https://www.techiedelight.com/check-given-expression-balanced-expression-not/

Given a string containing opening and closing braces, check if it represents a balanced expression or not.

For example,

{[{}{}]}[()], {{}{}}, []{}() are balanced expressions. {()}[), {(}) are not balanced.

> 

We can use a [stack](https://techiedelight.com/stack-implementation/) to solve this problem. The idea is to traverse the given expression, and

  * If the current character in the expression is an opening brace `(` or `{` or `[`, push it into the stack.
  * If the current character in the expression is a closing brace `)` or `}` or `]`, pop a character from the stack, and return false if the popped character is not the same as the current character, or it does not pair with the current character of the expression. Also, if the stack is empty, the total number of opening braces is less than the closing brace number at that point, so the expression cannot be balanced.

This would translate to a simple code below in TypeScript:

```ts
// Function to check if the given expression is balanced or not
const isBalanced = (exp: string): boolean => {

    // base case: length of the expression must be even
    if (exp.length & 1) {
        return false;
    }

    // take an empty stack of characters
    const stack: string[] = [];

    // traverse the input expression
    for (const ch of exp) {

        // if the current character in the expression is an opening brace,
        // push it into the stack
        if (ch === '(' || ch === '{' || ch === '[') {
            stack.push(ch);
        }

        // if the current character in the expression is a closing brace
        if (ch === ')' || ch === '}' || ch === ']') {
            // return false if a mismatch is found (i.e., if the stack is empty,
            // the expression cannot be balanced since the total number of opening
            // braces is less than the total number of closing braces)
            if (stack.length === 0) {
                return false;
            }

            // pop character from the stack
            const top = stack.pop()!;

            // if the popped character is not an opening brace or does not pair
            // with the current character of the expression
            if ((top === '(' && ch !== ')') || (top === '{' && ch !== '}') ||
                    (top === '[' && ch !== ']')) {
                return false;
            }
        }
    }

    // the expression is only balanced if the stack is empty at this point
    return stack.length === 0;
};

const exp = '{()}[{}]';

if (isBalanced(exp)) {
    console.log('The expression is balanced');
}
else {
    console.log('The expression is not balanced');
}
```

**Output:** The expression is balanced

Another good solution traverses the given expression, and for each opening brace in the expression, push the corresponding closing brace into the stack. If the expression’s current character is a closing brace, it should match the stack’s top element. If a match is found, pop the top character from the stack; otherwise, we can say that the expression is not balanced. Also, note that the stack should be empty after we have processed all characters in the expression.

This would translate to a simple code below in TypeScript:

```ts
// Function to check if the given expression is balanced or not
const isBalanced = (exp: string): boolean => {

    // base case: length of the expression must be even
    if (exp.length & 1) {
        return false;
    }

    // take an empty stack of characters
    const stack: string[] = [];

    // traverse the input expression
    for (const ch of exp) {

        // if the current character in the expression is an opening brace,
        // push the corresponding closing brace into the stack.
        if (ch === '(') {
            stack.push(')');
        }
        else if (ch === '{') {
            stack.push('}');
        }
        else if (ch === '[') {
            stack.push(']');
        }

        // check if the current character is the same as the last inserted
        // character on the stack
        else if (stack.length !== 0 && stack[stack.length - 1] === ch) {
            stack.pop();
        }

        // return false if the stack is empty or
        // if the popped character is not an opening brace
        else {
            return false;
        }
    }

    // the expression is balanced only when the stack is empty at this point
    return stack.length === 0;
};

const exp = '{()}[{}]';

if (isBalanced(exp)) {
    console.log('The expression is balanced');
}
else {
    console.log('The expression is not balanced');
}
```

**Output:** The expression is balanced

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the length of the input expression.
