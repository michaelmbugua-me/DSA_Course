# Find all distinct combinations of a given length – I

> Source: https://www.techiedelight.com/find-distinct-combinations-of-given-length/

Given an integer array, find all distinct combinations of a given length `k`.

For example,

**Input:** {2, 3, 4}, k = 2 **Output:** {2, 3}, {2, 4}, {3, 4} **Input:** {1, 2, 1}, k = 2 **Output:** {1, 2}, {1, 1}, {2, 1}

The program should print all the distinct combinations, while preserving the relative order of elements as they appear in the array.

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to add each element to the output and recur for the remaining items with one less element. To avoid printing permutations, construct each tuple in the same order as array elements. Then if the combination of the given size is found, print it.

The following solution in TypeScript generates all tuples using the above logic by traversing the array from left to right. To print only distinct combinations for inputs containing repeated elements, [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) and exclude all adjacent duplicate elements from it.

```ts
// Function to print all distinct combinations of length `k`
function findCombinations(A: number[], k: number, subarrays: Set<string>, out: number[] = [], i = 0): void {

    // invalid input
    if (A.length === 0 || k > A.length) {
        return;
    }

    // base case: combination size is `k`
    if (k === 0) {
        subarrays.add(`[${out.join(', ')}]`);
        return;
    }

    // start from the next index till the last index
    for (let j = i; j < A.length; j++) {
        // add current element `A[j]` to the solution and recur for next index
        // `j+1` with one less element `k-1`
        findCombinations(A, k - 1, subarrays, [...out, A[j]], j + 1);
    }
}

const A = [1, 2, 3];
const k = 2;

const subarrays = new Set<string>();

// process elements from left to right
findCombinations(A, k, subarrays);
console.log([...subarrays].join(' '));
```

**Output:** [1, 2] [1, 3] [2, 3]

We can also process the array elements from right to left. The algorithm can be implemented as follows in TypeScript:

```ts
// Function to print all distinct combinations of length `k`
function findCombinations(A: number[], n: number, k: number, subarrays: Set<string>, out: number[] = []): void {

    // invalid input
    if (A.length === 0 || k > n) {
        return;
    }

    // base case: combination size is `k`
    if (k === 0) {
        subarrays.add(`[${out.join(', ')}]`);
        return;
    }

    // start from the next index till the first index
    for (let i = n - 1; i >= 0; i--) {
        // add current element `A[i]` to the output and recur for next index
        // `i-1` with one less element `k-1`
        findCombinations(A, i, k - 1, subarrays, [A[i], ...out]);
    }
}

function getDistinctCombinations(A: number[], k: number): Set<string> {
    const subarrays = new Set<string>();
    findCombinations(A, A.length, k, subarrays);
    return subarrays;
}

const A = [1, 2, 3];
const k = 2;

// process elements from right to left
const subarrays = getDistinctCombinations(A, k);
console.log([...subarrays].join(' '));
```

**Output:** [1, 2] [1, 3] [2, 3]

The time complexity of both above-discussed methods is exponential and requires additional space for the recursion (call stack).
