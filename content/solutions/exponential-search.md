# Exponential search

> Source: https://www.techiedelight.com/exponential-search/

Given a sorted array of `n` integers and a target value, determine if the target exists in the array or not in logarithmic time. If the target exists in the array, return the index of it.

For example,

**Input:** A[] = [2, 3, 5, 7, 9] target = 7 **Output:** Element found at index 3 **Input:** A[] = [1, 4, 5, 8, 9] target = 2 **Output:** Element not found

> 

Exponential search is an algorithm used for searching sorted, unbounded/infinite arrays. The idea is to determine a range that the target value resides in and perform a [binary search](https://techiedelight.com/binary-search/) within that range. Assuming that the array is sorted in ascending order, _it looks for the first exponent,`k`, where the value `2k` is greater than the search key_. Now `2k` and `2k-1` becomes the upper bound and lower bound for the binary search algorithm, respectively.

The algorithm can be implemented as follows in TypeScript:

```ts
// Binary search algorithm to return the position of key `x` in sublist A[left…right]
function binarySearch(A: number[], left: number, right: number, x: number): number {

    // base condition (search space is exhausted)
    if (left > right) {
        return -1;
    }

    // find the mid-value in the search space and
    // compares it with the key

    const mid = Math.floor((left + right) / 2);

    // overflow can happen. Use below
    // mid = left + Math.floor((right - left) / 2)

    // base condition (a key is found)
    if (x === A[mid]) {
        return mid;
    }
    // discard all elements in the right search space,
    // including the middle element
    else if (x < A[mid]) {
        return binarySearch(A, left, mid - 1, x);
    }
    // discard all elements in the left search space,
    // including the middle element
    else {
        return binarySearch(A, mid + 1, right, x);
    }
}

// Returns the position of key `x` in a given list `A` of length `n`
function exponentialSearch(A: number[], x: number): number {

    // base case
    if (!A.length) {
        return -1;
    }

    let bound = 1;

    // find the range in which key `x` would reside
    while (bound < A.length && A[bound] < x) {
        bound *= 2;        // calculate the next power of 2
    }

    // call binary search on A[bound/2 … min(bound, n-1)]
    return binarySearch(A, Math.floor(bound / 2), Math.min(bound, A.length - 1), x);
}

// Exponential search algorithm

const A = [2, 5, 6, 8, 9, 10];
const key = 9;

const index = exponentialSearch(A, key);

if (index !== -1) {
    console.log(`Element found at index ${index}`);
}
else {
    console.log('Element found not in the list');
}
```

**Output:** Element found at index 4

## Performance

The exponential search takes O(log(i)) time, where `i` is the target’s position in the array when the target is in the array or position where the target should be if it isn’t in the array.

We can also use the exponential search to search in bounded arrays. It can even out-perform binary search when the target is near the beginning of the array. This is because the exponential search will run in O(log(i)) time, where `i` is the index of the element being searched for in the array, whereas binary search would run in O(log(n)) time, where `n` is the total number of elements in the array.

**Exercise:** Find where a strictly increasing function (`f(x) > f(x-1)` for all values of x) becomes positive for the first time. Consider `f(x) = x2 + 2x - 400`. It becomes positive for the first time for `x = 20`.

**References:** <https://en.wikipedia.org/wiki/Exponential_search>

Also See:

> [Unbounded Binary Search](https://www.techiedelight.com/unbounded-binary-search/ "Unbounded Binary Search")

> [Interpolation search](https://www.techiedelight.com/interpolation-search/ "Interpolation search")

> [Binary Search Algorithm – Iterative and Recursive Implementation](https://www.techiedelight.com/binary-search/ "Binary Search Algorithm – Iterative and Recursive Implementation")

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

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
