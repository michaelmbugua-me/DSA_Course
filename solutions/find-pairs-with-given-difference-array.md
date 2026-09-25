# Find pairs with difference `k` in an array

> Source: https://www.techiedelight.com/find-pairs-with-given-difference-array/

Given an unsorted integer array, print all pairs with a given difference `k` in it.

For example,

**Input:** arr = [1, 5, 2, 2, 2, 5, 5, 4] k = 3 **Output:** (2, 5) and (1, 4)

> 

A naive solution would be to consider every pair in a given array and return if the desired difference is found. The time complexity of this solution would be O(n2), where `n` is the size of the input.

We can use a set to solve this problem in linear time. The idea is to insert each array element `arr[i]` into a set. We also check if element `(arr[i] - diff)` or `(arr[i] + diff)` already exists in the set or not. If the element is seen before, print the pair `(arr[i], arr[i] - diff)` or `(arr[i] + diff, arr[i])`.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find a pair with the given difference in an array.
// This method does not handle duplicates in the array
function findPair(A: number[], diff: number): void {

    // array is unsorted

    // take an empty set
    const s = new Set<number>();

    // do for every element in the array
    for (const i of A) {

        // check if pair with the given difference `(i, i-diff)` exists
        if (s.has(i - diff)) {
            console.log(`(${i}, ${i - diff})`);
        }

        // check if pair with the given difference `(i + diff, i)` exists
        if (s.has(i + diff)) {
            console.log(`(${i + diff}, ${i})`);
        }

        // insert the current element into the set
        s.add(i);
    }
}

const A = [1, 5, 2, 2, 2, 5, 5, 4];
const diff = 3;

findPair(A, diff);
```

**Output:** (5, 2) (5, 2) (5, 2) (5, 2) (5, 2) (4, 1)

The time complexity of the above solution is O(n) and requires O(n) extra space. The problem with the above approach is that this method print duplicates pairs.

How to handle duplicates?

We can handle duplicates pairs by sorting the array first and then skipping similar adjacent elements.

```ts
// Function to find a pair with the given difference in an array.
// This method handles duplicates in the array
function findPair(A: number[], diff: number): void {

    // sort array in ascending order
    A.sort((a, b) => a - b);

    // take an empty set
    const s = new Set<number>();

    // do for every element in the array
    let i = 0;
    while (i < A.length) {

        // to avoid printing duplicates (skip adjacent duplicates)
        while (i + 1 < A.length && A[i] === A[i + 1]) {
            i = i + 1;
        }

        // check if pair with the given difference `(A[i], A[i]-diff)` exists
        if (s.has(A[i] - diff)) {
            console.log(`(${A[i]}, ${A[i] - diff})`);
        }

        // check if pair with the given difference `(A[i]+diff, A[i])` exists
        if (s.has(A[i] + diff)) {
            console.log(`(${A[i] + diff}, ${A[i]})`);
        }

        // insert the current element into the set
        s.add(A[i]);

        i = i + 1;
    }
}

const A = [1, 5, 2, 2, 2, 5, 5, 4];
const diff = -3;

findPair(A, diff);
```

**Output:** (1, 4) (2, 5)

The time complexity of the above solution is O(n.log(n)) and requires O(n) extra space, where `n` is the size of the input.

**Also See:**

> [Find pairs with difference `k` in an array ( Constant Space Solution)](https://techiedelight.com/find-pairs-given-difference-k-array-constant-space-solution/)
