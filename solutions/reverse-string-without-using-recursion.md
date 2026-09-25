# Iterative solution to reverse a string in TypeScript

> Source: https://www.techiedelight.com/reverse-string-without-using-recursion/

Write an iterative program to reverse a string in C++ and Java.

For example,

**Input:** Hello, World **Output:** dlroW ,olleH

## 1\. Using built-in methods

A simple approach is to use the array's `reverse()` method in JavaScript, combined with `split()` and `join()`:

```ts
const str = 'Hello, World';
const rev = str.split('').reverse().join('');

console.log(`The reverse of the given string is ${rev}`);
```

## 2\. Using Stack

We can easily reverse a given string using the [stack data structure](https://techiedelight.com/stack-implementation/). The idea is to push each character of the string into a stack and then start filling the input string (starting from index 0) by popping characters from the stack until it is empty.

Following is a TypeScript implementation of the idea:

```ts
// Iterative function to reverse a given string.
function reverse(c: string[]): void {
    // create an empty stack of characters
    const stack: string[] = [];

    // push each character of the given string into the stack
    for (let i = 0; i < c.length; i++) {
        stack.push(c[i]);
    }

    // start from index 0
    let k = 0;

    // pop characters from the stack until it is empty
    while (stack.length) {
        // assign each popped character back to the input string
        c[k++] = stack.pop()!;
    }
}

// demo
let str = 'Hello, World';

const c = str.split('');
reverse(c);
str = c.join('');

console.log('Reverse of the given string is ' + str);
```

The time complexity of the above solution is O(n) and the auxiliary space used by the program is O(n) for stack.

## 3\. In-place conversion

The above solution takes O(n) for stack data structure which is not recommended. We can easily solve this problem in linear time and constant space. Following is the iterative [in-place solution](https://techiedelight.com/in-place-vs-out-of-place-algorithms/) in TypeScript:

```ts
// Iterative function to reverse a given string.
// Note that the string is passed as an array of characters
function reverse(str: string[]): void {
    // start with two endpoints of the given string
    let begin = 0;
    let end = str.length - 1;

    // run till two end-points intersect
    while (begin < end) {
        const temp = str[begin];
        str[begin++] = str[end];
        str[end--] = temp;
    }
}

// demo
const str = 'Hello, World'.split('');

reverse(str);
console.log('Reverse of the given string is ' + str.join(''));
```
