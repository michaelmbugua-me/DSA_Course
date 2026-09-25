# Longest Bitonic Subarray Problem

> Source: https://www.techiedelight.com/find-longest-bitonic-subarray-array/

[Array](https://www.techiedelight.com/Category/Array/)

The Longest Bitonic Subarray (LBS) problem is to find a subarray of a given sequence in which the subarray’s elements are first sorted in increasing order, then in decreasing order, and the subarray is as long as possible. Strictly ascending or descending subarrays are also accepted.

For example,

Longest bitonic subarray of the sequence { 3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4 } is { 4, 5, 9, 10, 8, 5, 3 } For sequences sorted in increasing or decreasing order, the output is the same as the input sequence, i.e., [1, 2, 3, 4, 5] ——> [1, 2, 3, 4, 5] [5, 4, 3, 2, 1] ——> [5, 4, 3, 2, 1]

> 

The problem differs from the problem of finding the [longest bitonic subsequence](https://techiedelight.com/longest-bitonic-subsequence/). Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

The idea is to maintain two arrays, `I[]` and `D[]`:

  * `I[i]` store the length of the longest increasing subarray, ending at `arr[i]`.
  * `D[i]` store the length of the longest decreasing subarray, starting from `arr[i]`.

Finally, the length of the longest bitonic subarray is maximum among all `I[i] + D[i] - 1`. We can also keep track of two endpoints of the longest bitonic subarray found so far to print LBS. The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the length of the longest bitonic subarray in a list
function findBitonicSublist(A: number[]): void {

    if (A.length === 0) {
        return;
    }

    // `I[i]` store the length of the longest increasing sublist,
    // ending at `A[i]`
    const I: number[] = new Array(A.length).fill(1);

    for (let i = 1; i < A.length; i++) {
        if (A[i - 1] < A[i]) {
            I[i] = I[i - 1] + 1;
        }
    }

    // `D[i]` store the length of the longest decreasing sublist,
    // starting with `A[i]`
    const D: number[] = new Array(A.length).fill(1);

    for (let i = A.length - 2; i >= 0; i--) {
        if (A[i] > A[i + 1]) {
            D[i] = D[i + 1] + 1;
        }
    }

    // consider each element as a peak and calculate LBS
    let lbs_len = 1;
    let beg = 0, end = 0;

    for (let i = 0; i < A.length; i++) {
        if (lbs_len < I[i] + D[i] - 1) {
            lbs_len = I[i] + D[i] - 1;
            beg = i - I[i] + 1;
            end = i + D[i] - 1;
        }
    }

    // print the longest bitonic subarray
    console.log('The length of the longest bitonic subarray is', lbs_len);
    console.log('The longest bitonic subarray is', A.slice(beg, end + 1));
}

const A = [3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4];
findBitonicSublist(A);
```

**Output:** The length of the longest bitonic subarray is 7 The longest bitonic subarray indices is [3, 9]

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

We can solve this problem without using extra space. The idea is to check for the longest bitonic subarray starting at `A[i]`. If the longest bitonic subarray starting at `A[i]` ends at `A[j]`, the trick is to skip all elements between `i` and `j` as the longest bitonic subarray starting from them will have less length. Next, check for the longest bitonic subarray starting at `A[j]`. We continue this process until the end of the array is reached and keep track of the longest bitonic subarray found so far.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to find the length of the longest bitonic subarray in a list
function findBitonicSublist(A: number[]): void {

    const n = A.length;
    if (n === 0) {
        return;
    }

    let end_index = 0;
    let max_len = 1;
    let i = 0;

    while (i + 1 < n) {

        // check for the longest bitonic subarray starting at `A[i]`

        // reset length to 1
        let length = 1;

        // run till sequence is increasing
        while (i + 1 < n && A[i] < A[i + 1]) {
            i = i + 1;
            length = length + 1;
        }

        // run till sequence is decreasing
        while (i + 1 < n && A[i] > A[i + 1]) {
            i = i + 1;
            length = length + 1;
        }

        // run till sequence is equal
        while (i + 1 < n && A[i] === A[i + 1]) {
            i = i + 1;
        }

        // update longest bitonic subarray if required
        if (length > max_len) {
            max_len = length;
            end_index = i;
        }
    }

    // print the longest bitonic subarray
    console.log('The length of the longest bitonic subarray is', max_len);
    console.log('The longest bitonic subarray is', A.slice(end_index - max_len + 1, end_index + 1));
}

const A = [3, 5, 8, 4, 5, 9, 10, 8, 5, 3, 4];
findBitonicSublist(A);
```

The time complexity of the above solution is O(n) and doesn’t require any extra space.

**Exercise:** Find an array element before which all the items are smaller and after which all are greater.
