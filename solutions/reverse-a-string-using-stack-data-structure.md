# Reverse a string using a stack data structure

> Source: https://www.techiedelight.com/reverse-a-string-using-stack-data-structure/

This post will discuss how to reverse a string using the stack data structure in TypeScript.

## 1\. Using explicit stack

The idea is to create an empty [stack](https://techiedelight.com/stack-implementation/) and push all characters of the string into it. Then pop each character one by one from the stack and put them back to the input string starting from the `0'th` index.

Following is a TypeScript implementation of the idea:

```ts
// Reverse a string using a stack
function reverse(s: string): string {
    // build a stack from characters in the string
    const stack = s.split('');
    // pop all characters from the stack and join them back into a string
    let result = '';
    for (let i = 0; i < s.length; i++) {
        result += stack.pop();
    }
    return result;
}

let s = 'Reverse me';
s = reverse(s);
console.log(s);
```

**Output:** em esreveR



The time complexity of the above solution is O(n), where `n` is the length of the input string. The auxiliary space required by the program is O(n) for the stack data structure.

## 2\. Using implicit stack

We can also use an implicit stack, i.e., [call stack](https://en.wikipedia.org/wiki/Call_stack)., to reverse a string, as demonstrated below in TypeScript:

```ts
// Reverse a string using implicit stack (recursion)
function reverse(s: string[], i: number = 0, j: number = 0): number {
    // base case: `j` reaches string length
    if (j === s.length) {
        return i;
    }

    i = reverse(s, i, j + 1);

    // swap characters at i'th and j'th index
    if (i <= j) {
        const temp = s[i];
        s[i] = s[j];
        s[j] = temp;
        // advance `i` by one position, and recursion will take care of index `j`
        i += 1;
    }

    return i;
}

let s = 'Reverse me';

const chars = s.split('');
reverse(chars);
s = chars.join('');

console.log(s);
```

**Output:** em esreveR



Here’s the alternative, more straightforward approach that takes advantage of the implicit stack to reverse the string.

```ts
// Reverse a string using implicit stack (recursion)
function reverse(str: string[], i: number, j: number): void {
    if (i < j) {
        // swap characters at i'th and j'th index
        const temp = str[i];
        str[i] = str[j];
        str[j] = temp;

        // recur with increasing i'th index by position and
        // decreasing j'th index by one position
        reverse(str, i + 1, j - 1);
    }
}

const str = 'Reverse me';

const chars = str.split('');
reverse(chars, 0, chars.length - 1);
console.log(chars.join(''));
```

**Output:** em esreveR
