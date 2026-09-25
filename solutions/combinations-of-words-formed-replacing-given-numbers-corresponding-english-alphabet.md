# Combinations of words formed by replacing given numbers with corresponding alphabets

> Source: https://www.techiedelight.com/combinations-of-words-formed-replacing-given-numbers-corresponding-english-alphabet/

Given a set of single-digit positive numbers, find all possible combinations of words formed by replacing the continuous digits with corresponding character in the English alphabet, i.e., subset `{1}` can be replaced by `A`, `{2}` can be replaced by `B`, `{1, 0}` can be replaced by `J`, `{2, 1}` can be replaced by `U`, etc.

For example,

**Input:** digits[] = { 1, 2, 2 } **Output:** ABB, AV, LB {1, 2, 2} = ABB {1, 22} = AV {12, 2} = LB **Input:** digits[] = { 1, 2, 2, 1 } **Output:** ABBA, ABU, AVA, LBA, LU {1, 2, 2, 1} = ABBA {1, 2, 21} = ABU {1, 22, 1} = AVA {12, 2, 1} = LBA {12, 21} = LU

> 

For every `i'th` element of the input, there are two possibilities – either this `i'th` element will be combined with `(i+1)'th` element if the number formed by them is less than equal to 26 or `i'th` element itself will form a new character.

The idea is to recur with the remaining digits by considering both possibilities. The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find all possible combinations of words formed by replacing
// given positive numbers with the corresponding character of the English alphabet
function findCombinations(digits: number[], i = 0, s = ''): void {

    // base case
    if (!digits || digits.length === 0) {
        return;
    }

    // base case: all digits are processed in the current configuration
    if (i === digits.length) {
        // print the string
        console.log(s);
        return;
    }

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let total = 0;

    // process the next two digits (i'th and (i+1)'th)
    for (let j = i; j <= Math.min(i + 1, digits.length - 1); j++) {

        total = (total * 10) + digits[j];

        // if a valid character can be formed by taking one or both digits,
        // append it to the output and recur for the remaining digits
        if (total > 0 && total <= 26) {
            findCombinations(digits, j + 1, s + alphabet[total - 1]);
        }
    }
}

const digits = [1, 2, 2];

findCombinations(digits);
```

**Output:** ABB AV LB

We can also solve this problem by using binary tree and recursion. The basic idea remains the same, i.e., recur with the remaining digits by considering both possibilities for every `i'th` element of the input – either this `i'th` element will be combined with `(i+1)'th` element if the number formed by them is less than equal to `26` or `i'th` element itself will form a new character.

The only difference is that instead of using string to store the output, use binary tree nodes. Following is a TypeScript implementation based on the idea. It constructs a binary tree where each leaf node contains one unique combination of words formed.

```ts
// A class to store a binary tree node
class Node {
    constructor(public key: string,
                public left: Node | null = null,
                public right: Node | null = null) {}
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// Function to print all leaf nodes of the binary tree
function printBT(node: Node | null, output: string[] = []): void {
    if (node === null) {
        return;
    }

    if (node.left === null && node.right === null) {
        output.push(node.key);
    }
    else {
        printBT(node.right, output);
        printBT(node.left, output);
    }
}

// Function to construct a binary tree where each leaf node contains
// one unique combination of words formed
function construct(root: Node | null, digits: number[], i: number): void {

    // Base case: empty tree
    if (root === null || i === digits.length) {
        return;
    }

    // check if `digits[i+1]` exists
    if (i + 1 < digits.length) {
        // process current and next digit
        const total = 10 * digits[i] + digits[i + 1];

        // if both digits can form a valid character, create the left child from it
        if (total <= 26) {
            root.left = new Node(root.key + alphabet[total - 1]);
        }

        // construct the left subtree by remaining digits
        construct(root.left, digits, i + 2);
    }

    // process the current digit and create the right child from it
    root.right = new Node(root.key + alphabet[digits[i] - 1]);

    // construct the right subtree by remaining digits
    construct(root.right, digits, i + 1);
}

const digits = [1, 2, 2, 1];

// create an empty root
const root = new Node('');

// construct binary tree
construct(root, digits, 0);

const output: string[] = [];
printBT(root, output);
console.log(output.join(' '));
```

**Output:** ABBA ABU AVA LBA LU

The time complexity of both above-discussed methods is exponential and requires additional space for the recursion (call stack).
