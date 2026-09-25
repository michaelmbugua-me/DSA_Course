# Find all distinct combinations of a given length – II

> Source: https://www.techiedelight.com/find-distinct-combinations-given-length-2/

Given an integer array, find all distinct combinations of a given length `k`.

For example,

**Input:** {2, 3, 4}, k = 2 **Output:** {2, 3}, {2, 4}, {3, 4} **Input:** {1, 2, 1}, k = 2 **Output:** {1, 2}, {1, 1}, {2, 1}

The program should print all the distinct combinations, while preserving the relative order of elements as they appear in the array.

> 

**Previous Approach:**

> [Find all distinct combinations of a given length – I](https://techiedelight.com/find-distinct-combinations-of-given-length/)

The problem is very similar to the [0/1 knapsack problem](https://techiedelight.com/0-1-knapsack-problem/), where for each element in a given array, we have two cases:

  1. Consider that element.
  2. Don’t consider that element.

The following TypeScript solution generates all combinations using the above logic by traversing the array from left to right. If the tuple of the given size is found, print it. To avoid printing permutations, construct each tuple in the same order as array elements. To print only distinct tuples (when input contains repeated elements), [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and exclude all adjacent duplicates along with the current item in case 2.

```ts
// Function to print all distinct combinations of length `k`
function findCombinations(A: number[], k: number, subarrays: Set<string>, out: number[] = [], i = 0): void {

    // do nothing for empty input
    if (A.length === 0) {
        return;
    }

    // base case: combination size is `k`
    if (k === 0) {
        subarrays.add(`[${out.join(', ')}]`);
        return;
    }

    // return if no more elements are left
    if (i === A.length) {
        return;
    }

    // include the current element in the current combination and recur
    findCombinations(A, k - 1, subarrays, [...out, A[i]], i + 1);

    // exclude the current element from the current combination and recur
    findCombinations(A, k, subarrays, out, i + 1);
}

const A = [1, 2, 3];
const k = 2;

// process elements from left to right
const subarrays = new Set<string>();
findCombinations(A, k, subarrays);

// print the distinct combinations
console.log([...subarrays].join(' '));
```

**Output:** [1, 2] [1, 3] [2, 3]

We can also process the array elements from right to left. The following TypeScript program demonstrates it:

```ts
// Function to print all distinct combinations of length `k`
function findCombinations(A: number[], i: number, k: number, subarrays: Set<string>, out: number[] = []): void {

    // do nothing for empty input
    if (A.length === 0) {
        return;
    }

    // base case: combination size is `k`
    if (k === 0) {
        subarrays.add(`[${out.join(', ')}]`);
        return;
    }

    // return if no more elements are left
    if (i < 0) {
        return;
    }

    // include the current element in the current combination and recur
    findCombinations(A, i - 1, k - 1, subarrays, [A[i], ...out]);

    // exclude the current element from the current combination and recur
    findCombinations(A, i - 1, k, subarrays, out);
}

const A = [1, 2, 3];
const k = 2;

// process elements from right to left
const subarrays = new Set<string>();
findCombinations(A, A.length - 1, k, subarrays);

// print the distinct combinations
console.log([...subarrays].join(' '));
```

**Output:** [2, 1] [3, 1] [3, 2]

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).
