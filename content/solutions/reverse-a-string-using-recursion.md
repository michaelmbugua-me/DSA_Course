# Reverse a string using recursion – TypeScript

> Source: https://www.techiedelight.com/reverse-a-string-using-recursion/

Write a recursive program to efficiently reverse a given string in TypeScript.

For example,

**Input:** Techie Delight **Output:** thgileD eihceT

## Approach 1

As seen in the [previous post](https://techiedelight.com/reverse-string-without-using-recursion/), we can easily reverse a given string using a stack data structure. As the stack is involved, we can easily convert the code to use the [call stack](https://en.wikipedia.org/wiki/Call_stack).

The implementation can be seen below in TypeScript:

```ts
// Recursive function to reverse a given string
let i = 0;

function reverse(str: string[], k: number): void {
    // if the end of the string is reached
    if (k === str.length) {
        return;
    }

    reverse(str, k + 1);

    if (i <= k) {
        const temp = str[i];
        str[i++] = str[k];
        str[k] = temp;
    }
}

const str = 'Techie Delight';

const c = str.split('');
reverse(c, 0);
console.log('Reverse of the given string is ' + c.join(''));
```

## Approach 2

The above solution uses a static variable, which is not recommended. We can easily solve this problem without using any static variable. This approach is almost similar to approach #3 discussed [here](https://techiedelight.com/reverse-string-without-using-recursion/).

Following is a TypeScript implementation based on the above idea:

```ts
// Recursive function to reverse a given string
function reverse(c: string[], l: number, h: number): void {
    if (l < h) {
        const temp = c[l];
        c[l] = c[h];
        c[h] = temp;

        reverse(c, l + 1, h - 1);
    }
}

const str = 'Techie Delight';

const c = str.split('');
reverse(c, 0, c.length - 1);

console.log('Reverse of the given string is ' + c.join(''));
```



The time complexity of both above-discussed methods is O(n) and requires O(n) implicit space for the call stack, where `n` is the length of the input string.
