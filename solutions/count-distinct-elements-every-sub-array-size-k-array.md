# Find the count of distinct elements in every subarray of size `k`

> Source: https://www.techiedelight.com/count-distinct-elements-every-sub-array-size-k-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array and an integer `k`, find the count of distinct elements in every subarray of size `k`.

For example,

**Input:** arr[] = { 2, 1, 2, 3, 2, 1, 4, 5 }; k = 5; **Output:** The count of distinct elements in subarray { 2, 1, 2, 3, 2 } is 3 The count of distinct elements in subarray { 1, 2, 3, 2, 1 } is 3 The count of distinct elements in subarray { 2, 3, 2, 1, 4 } is 4 The count of distinct elements in subarray { 3, 2, 1, 4, 5 } is 5

> 

Please note that the problem specifically targets [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) that are contiguous (i.e., occupy consecutive positions) and inherently maintains the order of elements.

A naive solution is to consider every subarray in the given array and count all distinct elements in it using two nested loops, as demonstrated below in TypeScript. The time complexity of this approach is O(n.k2), where `n` is the size of the input and `k` is the size of the subarray.

```ts
// Function to find the count of distinct elements in every sublist
// of size `k` in a list
function findDistinctCount(A: number[], k: number): void {
    // consider every sublist of size `k`
    for (let x = 0; x <= A.length - k; x++) {
        // maintains a counter for distinct elements in the current sublist
        let distinct = 0;

        // current sublist is formed by sublist `A[x, x+k)`
        for (let i = x; i < x + k; i++) {
            // increase distinct count for `A[i]` in current sublist
            distinct = distinct + 1;

            // check if `A[i]` is present in sublist `A[x, i-1]` or not
            for (let j = x; j < i; j++) {
                // If duplicate element found in the current sublist
                if (A[i] === A[j]) {
                    // unmark element `A[i]` as distinct – decrease count
                    distinct = distinct - 1;
                    break;
                }
            }
        }

        console.log(`The count of distinct elements in sublist [${x}, ${x + k - 1}] is ${distinct}`);
    }
}

const A = [2, 1, 2, 3, 2, 1, 4, 5];
const k = 5;
findDistinctCount(A, k);
```

**Output:** The count of distinct elements in subarray [0, 4] is 3 The count of distinct elements in subarray [1, 5] is 3 The count of distinct elements in subarray [2, 6] is 4 The count of distinct elements in subarray [3, 7] is 5

We know that a set doesn’t store duplicate elements. We can take advantage of this fact and insert all elements of the current subarray into a set. Then the set’s size would be the distinct element count. This reduces the time complexity to O(n.k) but uses O(k) extra space.

The algorithm can be implemented as follows in TypeScript. We can even extend the solution to print the contents of the set, as shown [here](https://techiedelight.com/compiler/?run=SPLrtr).

```ts
// Function to find all distinct elements present in each sublist
// of size `k` in a list
function findDistinctCount(A: number[], k: number): void {
    // loop through the list
    for (let i = 0; i < A.length - (k - 1); i++) {
        const distinct = new Set(A.slice(i, i + k));
        console.log(`The count of distinct elements in sublist [${i}, ${(i + k - 1)}] is`, distinct.size);
    }
}

const input = [2, 1, 2, 3, 2, 1, 4, 5];
const k = 5;
findDistinctCount(input, k);
```

**Output:** The count of distinct elements in subarray [0, 4] is 3 The count of distinct elements in subarray [1, 5] is 3 The count of distinct elements in subarray [2, 6] is 4 The count of distinct elements in subarray [3, 7] is 5

We can further reduce the time complexity to O(n) by using the [sliding window](https://techiedelight.com/sliding-window-problems/) technique. The idea is to store the frequency of elements in the current window in a map and keep track of the distinct elements count in the current window (of size `k`). The code can be optimized to derive the count of elements in any window using the count of elements in the previous window by inserting the new element to the previous window from its right and removing an element from its left.

Following is a TypeScript program that demonstrates it:

```ts
// Function to find the count of distinct elements in every subarray
// of size `k` in an array
function findDistinctCount(input: number[], k: number): void {
    // map to store the frequency of elements in the current window of size `k`
    const freq = new Map<number, number>();

    // maintains the count of distinct elements in every subarray of size `k`
    let distinct = 0;

    // loop through the array
    for (let i = 0; i < input.length; i++) {
        // ignore the first `k` elements
        if (i >= k) {
            // remove the first element from the subarray by reducing its
            // frequency in the map
            freq.set(input[i - k], (freq.get(input[i - k]) ?? 0) - 1);

            // reduce the distinct count if we are left with 0
            if (freq.get(input[i - k]) === 0) {
                distinct--;
            }
        }

        // add the current element to the subarray by incrementing its
        // count in the map
        freq.set(input[i], (freq.get(input[i]) ?? 0) + 1);

        // increment distinct count by 1 if element occurs for the first
        // time in the current window
        if (freq.get(input[i]) === 1) {
            distinct++;
        }

        // print count of distinct elements in the current subarray
        if (i >= k - 1) {
            console.log(`The count of distinct elements in subarray [${i - k + 1}, ${i}] is ${distinct}`);
        }
    }
}

const input = [1, 1, 2, 1, 3];
const k = 3;
findDistinctCount(input, k);
```

