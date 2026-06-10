# Find all binary strings that can be formed from a wildcard pattern

> Source: https://www.techiedelight.com/find-binary-strings-can-formed-given-wildcard-pattern/

Given a binary pattern containing `?` wildcard character at a few positions, find all possible combinations of binary strings that can be formed by replacing the wildcard character by either `0` or `1`.

For example, for wildcard pattern `1?11?00?1?`, the possible combinations are:

1011000010 1011000011 1011000110 1011000111 1011100010 1011100011 1011100110 1011100111 1111000010 1111000011 1111000110 1111000111 1111100010 1111100011 1111100110 1111100111

> 

## Recursive Solution

We can easily solve this problem by using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to process each character of the pattern one at a time and recur for the remaining pattern. If the current digit is `0` or `1`, ignore it. If the current character is a wildcard character `?`, replace it with `0` and `1`, and recur for the remaining pattern.

Following is a TypeScript program that demonstrates it:

```ts
// Find all binary strings that can be formed from a given wildcard pattern
function printAllCombinations(pattern: string[], i = 0): void {

    // base case
    if (!pattern.length) {
        return;
    }

    if (i === pattern.length) {
        console.log(pattern.join(''));
        return;
    }

    // if the current character is '?'
    if (pattern[i] === '?') {
        for (const ch of '01') {

            // replace '?' with 0 and 1
            pattern[i] = ch;

            // recur for the remaining pattern
            printAllCombinations(pattern, i + 1);

            // backtrack
            pattern[i] = '?';
        }
    }
    else {
        // if the current character is 0 or 1, ignore it and
        // recur for the remaining pattern
        printAllCombinations(pattern, i + 1);
    }
}

const pattern = '1?11?00?1?';
printAllCombinations([...pattern]);
```

**Output:** 1011000010 1011000011 1011000110 1011000111 1011100010 1011100011 1011100110 1011100111 1111000010 1111000011 1111000110 1111000111 1111100010 1111100011 1111100110 1111100111

**Output:** 1011000010 1011000011 1011000110 1011000111 1011100010 1011100011 1011100110 1011100111 1111000010 1111000011 1111000110 1111000111 1111100010 1111100011 1111100110 1111100111

## Iterative Solution

We can also solve this problem iteratively using [stack](https://techiedelight.com/stack-implementation/), [queue](https://techiedelight.com/circular-queue-implementation-c/), set, vector, or any other container. The idea remains the same. Start by processing each character of the pattern one at a time, but instead of recursing for the remaining pattern, push it into a container. At each iteration, pop a string from the container, find the first occurrence of wildcard pattern `?` in it, replace `?` with `0` and `1`, and finally push it back into the container. If no wildcard pattern is found, print the popped string. Repeat this process until the container is empty.

Following is the TypeScript implementation of the idea:

```ts
// Find all binary strings that can be formed from a given wildcard pattern
function printAllCombinations(pattern: string): void {

    // base case
    if (!pattern) {
        return;
    }

    // create an empty stack (we can also use a set, list, or any other container)
    const stack: string[] = [];
    stack.push(pattern);        // push the pattern into the stack

    // loop till stack is empty
    while (stack.length) {

        // pop a string from the stack and process it
        let curr = stack.pop() as string;

        // `index` stores position of the first occurrence of wildcard
        // pattern in `curr`
        const index = curr.indexOf('?');
        if (index !== -1) {
            // replace '?' with 0 and 1 and push it into the stack
            for (const ch of '01') {
                curr = curr.slice(0, index) + ch + curr.slice(index + 1);
                stack.push(curr);
            }
        }
        // if no wildcard pattern is found, print the string
        else {
            console.log(curr);
        }
    }
}

const pattern = '1?11?00?1?';

printAllCombinations(pattern);
```

**Output:** 1111100111 1111100110 1111100011 1111100010 1111000111 1111000110 1111000011 1111000010 1011100111 1011100110 1011100011 1011100010 1011000111 1011000110 1011000011 1011000010

The worst-case time complexity of the above solutions is O(2n) and requires O(n) extra space, where `n` is the length of the input string. The worst case happens when all the strings’ characters are `?` and exponential number of strings gets generated. For example, for the string `??????`, there are `64` strings in the output.

The best-case time complexity of the above solution is O(n). The best case happens when the string doesn’t contain any wildcard character `?`.
