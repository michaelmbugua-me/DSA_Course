# Count total possible combinations of n-digit numbers in a mobile keypad

> Source: https://www.techiedelight.com/count-total-possible-combinations-n-digit-numbers-mobile-keypad/

[Dynamic Programming](https://www.techiedelight.com/Category/Dynamic-Programming/)

Given a positive number `n` and a mobile keypad having digits from 0 to 9 associated with each key, count the total possible combinations of digits having length `n`. We can start with any digit and press only four adjacent keys of any digit. The keypad also contains `*` and `#` keys, which we are not allowed to press.

For example,

**Input:** n = 2 **Output:** 36 **Explanation:** Total possible combinations are 36 [00, 08, 11, 12, 14, 21, 22, 23, 25, 32, 33, 36, 41, 44, 45, 47, … ,96, 98, 99]

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem since the problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). The problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial.

The idea is to consider each digit one by one and count all n–digit numbers starting from the current digit. For each digit `i`, recur for digit `i`, and all digits reachable from `i`. To easily find all digits reachable from any digit, use a [multimap](https://techiedelight.com/implement-multimap-java/) that stores the mapping of digits reachable from every digit. When the digit becomes n–digit, update the count.

The above solution exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). As shown below, the same subproblems (highlighted in the same color) are getting computed repeatedly.

**n–digit number starting from 1 =** 1 + (n-1) digit number starting from 1 2 + (n-1) digit number starting from 2 4 + (n-1) digit number starting from 4 **n–digit number starting from 2 =** 1 + (n-1) digit number starting from 1 2 + (n-1) digit number starting from 2 3 + (n-1) digit number starting from 3 5 + (n-1) digit number starting from 5 **n–digit number starting from 5 =** 2 + (n-1) digit number starting from 2 4 + (n-1) digit number starting from 4 5 + (n-1) digit number starting from 5 6 + (n-1) digit number starting from 6 8 + (n-1) digit number starting from 8

We know that problems with optimal substructure and overlapping subproblems can be solved using dynamic programming, where subproblem solutions are _memo_ ized rather than computed repeatedly. The top-down _memo_ ized approach is demonstrated below in TypeScript:

```ts
// The function returns false if `(i, j)` is not a valid position
function isValid(i: number, j: number): boolean {
    // for handling `*` or `#` (present in 4th row and 1st & 3rd column)
    if (i === 3 && (j === 0 || j === 2)) {
        return false;
    }

    return 0 <= i && i <= 3 && 0 <= j && j <= 2;
}

// Function to fill a map that stores the mapping of cells
// reachable from the current cell
function fillDictionary(keypad: string[][]): Map<number, number[]> {
    // use a map to store a mapping of cells reachable from the current cell
    const mapping = new Map<number, number[]>();

    // Below lists detail all four possible movements from the current cell
    const row = [0, -1, 0, 1];
    const col = [-1, 0, 1, 0];

    // do for each row
    for (let i = 0; i < 4; i++) {
        // do for each column of row i
        for (let j = 0; j < 3; j++) {
            // move in all four possible directions of current digit `keypad[i][j]`
            for (let k = 0; k < 4; k++) {
                const r = i + row[k];
                const c = j + col[k];
                // insert the adjacent cell into the map if valid
                if (isValid(i, j) && isValid(r, c)) {
                    const key = Number(keypad[i][j]);
                    const value = Number(keypad[r][c]);
                    if (!mapping.has(key)) {
                        mapping.set(key, []);
                    }
                    mapping.get(key)!.push(value);
                }
            }
        }
    }
    return mapping;
}

// Function to count all numbers starting from digit `i` and
// having length `n`
function getCount(mapping: Map<number, number[]>, i: number, n: number, lookup: number[][]): number {
    if (n === 1) {          // reached end of the digit
        return 1;
    }

    // if the subproblem is seen for the first time, solve it and
    // store its result in a list
    if (lookup[i][n] === 0) {
        // recur for digit i
        lookup[i][n] = getCount(mapping, i, n - 1, lookup);

        // recur for all digits reachable from i
        for (const e of mapping.get(i)!) {
            lookup[i][n] += getCount(mapping, e, n - 1, lookup);
        }
    }

    // return the subproblem solution
    return lookup[i][n];
}

function findCounts(n: number, keypad: string[][]): number {
    // get a mapping of cells reachable from the current cell
    const mapping = fillDictionary(keypad);

    // create a lookup table to store solutions to subproblems `lookup[i][j]`
    // stores count of all numbers starting from digit `i` having length `n`
    const lookup: number[][] = Array.from({ length: 10 }, () => new Array(n + 1).fill(0));

    // get the count of each digit
    let count = 0;
    for (let i = 0; i < 10; i++) {
        count += getCount(mapping, i, n, lookup);
    }

    return count;
}

// n–digit
const n = 2;

// mobile mapping
const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['*', '0', '#']
];

console.log('Total possible combinations are', findCounts(n, keypad));
```

**Output:** Total possible combinations are 36

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the given length of digits.

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 158

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/), [Top-down](https://www.techiedelight.com/Tags/Memoization/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
