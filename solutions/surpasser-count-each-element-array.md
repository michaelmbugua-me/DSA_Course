# Find surpasser count for each array element

> Source: https://www.techiedelight.com/surpasser-count-each-element-array/

Given an integer array having distinct elements, find the surpasser count for each element in it. In other words, for each array element, find the total number of elements to its right, which are greater than it.

For example,

**Input:** { 4, 6, 3, 9, 7, 10 } **Output:** { 4, 3, 3, 1, 1, 0 }

> 

A simple solution would be for each array element, count all elements greater than it to its right. The implementation of this approach can be seen [here](https://techiedelight.com/compiler/?run=pqkGMd). It runs in O(n2) time, where `n` is the size of the input.

We can reduce the time complexity to O(n.log(n)) by using [merge sort algorithm](https://techiedelight.com/merge-sort/). The problem is similar to finding the [inversion count of an array](https://techiedelight.com/inversion-count-array/). Since surpasser is just the opposite of inversion, [sort the array in descending order](https://techiedelight.com/sort-array-descending-order-cpp/) and maintain a map to store the surpasser count for each distinct array element.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to merge two sorted subarrays `A[low … mid]` and
// `A[mid + 1 … high]`
function merge(A: number[], aux: number[], low: number, mid: number, high: number,
               count: Map<number, number>): void {

    let k = low, i = low;
    let j = mid + 1;
    let c = 0;

    // run if there are elements in the left and right runs
    while (i <= mid && j <= high) {

        if (A[i] > A[j]) {
            // update surpasser count of `A[i]`
            count.set(A[i], (count.get(A[i]) ?? 0) + c);
            aux[k++] = A[i++];
        }
        else {
            aux[k++] = A[j++];
            c++;
        }
    }

    // copy remaining elements
    while (i <= mid) {
        count[A[i]] = (count.get(A[i]) ?? 0) + c;
        aux[k++] = A[i++];
    }

    /* no need to copy the second half (since the remaining items
        are already in their correct position in the temporary array) */

    // copy back to the original array to reflect sorted order
    for (let x = low; x <= high; x++) {
        A[x] = aux[x];
    }
}

// Function to sort array `A[low…high]` in descending order
function mergesort(A: number[], aux: number[], low: number, high: number,
                   count: Map<number, number>): void {

    // base case: run size is less than or equal to 1
    if (high <= low) {
        return;
    }

    // find midpoint
    const mid = low + ((high - low) >> 1);

    // recursively split runs into two halves until run size == 1,
    // merge them, and return up the call chain

    mergesort(A, aux, low, mid, count);
    mergesort(A, aux, mid + 1, high, count);

    merge(A, aux, low, mid, high, count);
}

// Function to find the surpasser count for each element of an array
function getSurpasserCount(A: number[]): Map<number, number> {

    const count = new Map<number, number>();

    // create two copies of the original array
    const aux = A.slice();
    const arr = A.slice();

    // sort the array in descending order using auxiliary space `aux`
    mergesort(arr, aux, 0, arr.length - 1, count);

    return count;
}

const A = [4, 6, 3, 9, 7, 10];

// find the surpasser count for array elements
const surpasserCount = getSurpasserCount(A);

for (const value of A) {
    process.stdout.write(`${surpasserCount.get(value)} `);
}
```

Also See:

> [Inversion count of an array](https://www.techiedelight.com/inversion-count-array/ "Inversion count of an array")

> [Merge Sort Algorithm – C++, Java, and Python Implementation](https://www.techiedelight.com/merge-sort/ "Merge Sort Algorithm – C++, Java, and Python Implementation")

> [Segregate positive and negative integers using merge sort](https://www.techiedelight.com/segregate-positive-negative-integers-using-mergesort/ "Segregate positive and negative integers using merge sort")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 161

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
