# Rearrange an array such that it contains alternate positive and negative numbers

> Source: https://www.techiedelight.com/rearrange-array-positive-negative-numbers-alternate-positions/

Given an integer array, rearrange it such that it contains positive and negative numbers at alternate positions. If the array contains more positive or negative elements, move them to the end of the array. Assume that all values in the array are non-zero.

For example,

**Input:** { 9, -3, 5, -2, -8, -6, 1, 3 } **Output:** { 5, -2, 9, -6, 1, -8, 3, -3 } **Input:** { 9, -3, 5, -2, -8, -6 } **Output:** { 5, -2, 9, -6, -3, -8 } **Input:** { 9, -3, 5, -2, 8, 6, 1, 3 } **Output:** { 5, -2, 9, -3, 8, 6, 1, 3 }

> 

We can solve this problem in linear time by using the [partitioning logic of Quicksort](https://techiedelight.com/quicksort/). The idea is to use 0 as a pivot element and make one pass of the partition process. The resultant array will contain all positive integers to the end of the array and all negative integers at the beginning. Then swap alternate negative elements from the next available positive element until the end of the array is reached, or all negative or positive integers are exhausted.

Following is a TypeScript implementation of the above approach:

```ts
// Partitioning routine of Quicksort
function partition(A: number[]): number {

    let j = 0;
    const pivot = 0;       // consider 0 as a pivot

    // each time we find a negative number, `j` is incremented,
    // and a negative element would be placed before the pivot
    for (let i = 0; i < A.length; i++) {
        if (A[i] < pivot) {
            // swap `A[i]` with `A[j]`
            const temp = A[i];
            A[i] = A[j];
            A[j] = temp;

            j = j + 1;
        }
    }

    // `j` holds the index of the first positive element
    return j;
}

// Function to rearrange a given list such that it contains positive
// and negative numbers at alternate positions
function rearrange(A: number[]): void {

    // partition a given list such that all positive elements move
    // to the end of the list

    let p = partition(A);

    // swap alternate negative elements from the next available positive
    // element till the end of the list is reached or all negative or
    // positive elements are exhausted.

    let n = 0;
    while (A.length > p && p > n) {
        // swap `A[n]` with `A[p]`
        const temp = A[n];
        A[n] = A[p];
        A[p] = temp;

        p = p + 1;
        n = n + 2;
    }
}

const A = [9, -3, 5, -2, -8, -6, 1, 3];

rearrange(A);
console.log(A);        // print the rearranged list
```

**Output:** 5 -2 9 -6 1 -8 3 -3

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input. The problem with this approach is that it changes the relative order of elements.

**Exercise:** Implement a solution that preserves the relative order of elements.

Also See:

> [Problems solved using partitioning logic of Quicksort](https://www.techiedelight.com/problems-solved-using-partitioning-logic-quicksort/ "Problems solved using partitioning logic of Quicksort")

> [Segregate positive and negative integers in linear time](https://www.techiedelight.com/positive-and-negative-integers-segregate/ "Segregate positive and negative integers in linear time")

> [Segregate positive and negative integers using merge sort](https://www.techiedelight.com/segregate-positive-negative-integers-using-mergesort/ "Segregate positive and negative integers using merge sort")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.73/5. Vote count: 124

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
