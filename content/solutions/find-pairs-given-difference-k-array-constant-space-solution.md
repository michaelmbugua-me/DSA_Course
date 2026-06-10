# Find pairs with difference `k` in an array | Constant Space Solution

> Source: https://www.techiedelight.com/find-pairs-given-difference-k-array-constant-space-solution/

Given an unsorted integer array, find all pairs with a given difference `k` in it without using any extra space.

For example,

**Input:** arr = [1, 5, 2, 2, 2, 5, 5, 4] k = 3 **Output:** (2, 5) and (1, 4)

> 

We have discussed a linear time solution in the [previous post](https://techiedelight.com/find-pairs-with-given-difference-array/) that takes O(n) extra space for an input containing `n` items. The solution inserts each array element `arr[i]` in a set and check if element `(arr[i] - diff)` or `(arr[i] + diff)` already exists in the set or not. If the element is seen before, it prints the pair `(arr[i], arr[i] - diff)` or `(arr[i] + diff, arr[i])`.

We can avoid using extra space by performing [binary search](https://techiedelight.com/binary-search/) for element `(arr[i] - diff) or (arr[i] + diff)` instead of using [hashing](https://techiedelight.com/hashing-in-data-structure/). This approach is demonstrated below in TypeScript:

```ts
function binarySearch(sequence: number[], value: number): number {

    let low = 0, high = sequence.length - 1;
    while (low <= high) {
        const mid = Math.floor((low + high) / 2);
        if (sequence[mid] < value) {
            low = mid + 1;
        } else if (value < sequence[mid]) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -1;
}

// Function to find a pair with the given difference in an array.
// This method handles duplicates in the array
function findPair(A: number[], diff: number): void {

    // sort array in ascending order
    A.sort((a, b) => a - b);

    // do for each element in the array
    let i = 0;
    while (i < A.length) {

        // to avoid printing duplicates (skip adjacent duplicates)
        while (i < A.length - 1 && A[i] === A[i + 1]) {
            i = i + 1;
        }

        // perform a binary search on element `A[i]-diff`
        if (binarySearch(A, A[i] - diff) >= 0) {
            console.log(`(${A[i]}, ${A[i] - diff})`);
        }

        i = i + 1;
    }
}

const A = [1, 5, 2, 2, 2, 5, 5, 4];
const diff = 3;

findPair(A, diff);
```

**Output:** (4, 1) (5, 2)

The time complexity of the above solution is O(n.log(n)).

## Alternate Approach

The idea is somewhat similar to [finding a pair with the given sum](https://techiedelight.com/find-pair-with-given-sum-array/) in the array. But instead of starting from two endpoints of the array, we start from the beginning of the sorted array.

```ts
// Function to find a pair with the given difference in an array.
// This method handles duplicates in the array
function findPair(A: number[], diff: number): void {

    // sort array in ascending order
    A.sort((a, b) => a - b);

    // maintain two indices in the array
    let i = 0, j = 0;
    const n = A.length;

    // run till the end of the array is reached
    while (i < n && j < n) {

        // to avoid printing duplicates
        while (i < n - 1 && A[i] === A[i + 1]) {
            i++;
        }

        while (j < n - 1 && A[j] === A[j + 1]) {
            j++;
        }

        // increment `i` if the current difference is more than the desired difference
        if (A[j] - A[i] > diff) {
            i++;

        // increment `j` if the current difference is less than the desired difference
        } else if (A[j] - A[i] < diff) {
            j++;

        // print the pair and increment both `i` & `j` if the current difference is
        // the same as the desired difference
        } else {
            console.log(`(${A[j]}, ${A[i]})`);
            i++;
            j++;
        }
    }
}

const A = [1, 5, 2, 2, 2, 5, 5, 4];
const diff = 3;

findPair(A, diff);
```

**Output:** (4, 1) (5, 2)

The time complexity of the above solution is O(n.log(n)).
