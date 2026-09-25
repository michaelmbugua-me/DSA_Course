# Unbounded Binary Search

> Source: https://www.techiedelight.com/unbounded-binary-search/

Divide & Conquer

Given a monotonically increasing function f(x) on positive numbers, find the lowest positive integer x where f(x) > 0\. In other words, find a positive number x such that f(i) > 0 for any integer i greater than or equal to x.

A function is called monotonically increasing, if `f(x) <= f(y)` is true for all `x` and `y` such that `x <= y`. For example, `f(x) = 3x - 100` is a monotonically increasing function. It becomes positive for the first time when `x = 34`, as shown below:

> 

A simple solution would be to consider all positive numbers starting from `0` and find the first number for which `f(x)` is positive. The time complexity of this solution is O(x).

We can solve this problem in O(log(x)) time with the help of a [binary search algorithm](https://techiedelight.com/binary-search/). But we can’t apply standard binary search on an _unbounded_ search space since the upper limit of the search space is not known.

The idea is to determine the range in which `x` resides using [exponential search](https://techiedelight.com/exponential-search/) and perform a binary search within that range. The exponential search routine starts with `i = 1` and keep on doubling `i` until `f(i)` becomes positive for the first time. When `f(i)` becomes positive, perform a binary search within the search space `[i/2, i]` and find the target value `x` in O(log(x)) time.

Following is a TypeScript program that demonstrates it:

```ts
// A monotonically increasing function `f(x) = 3x - 100`
function f(x: number): number {
    return 3 * x - 100;
}

// Find the value of `x` in the search space [low, high] using binary search
// where f(x) becomes positive for the first time
function binarySearch(low: number, high: number): number {
    // base condition (search space is exhausted)
    if (high < low) {
        return -1;
    }

    // find the mid-value in the search space
    const mid = low + Math.floor((high - low) / 2);

    // if `f(mid)` is positive
    if (f(mid) > 0) {
        // return `mid` if it is the first element of the search space or
        // when f(mid-1) is not positive
        if (mid === low || f(mid - 1) <= 0) {
            return mid;
        }

        // otherwise, discard all elements in the right search space
        return binarySearch(low, mid - 1);
    }

    // if f(mid) is zero or negative, discard all elements in the left search space
    return binarySearch(mid + 1, high);
}

// Returns the positive value `x`, where f(x) becomes positive for the first time
function exponentialSearch(): number {
    // find the range in which the result would reside
    let i = 1;
    while (f(i) <= 0) {
        // calculate the next power of 2
        i *= 2;
    }

    // call binary search on [i/2, i]
    return binarySearch(Math.floor(i / 2), i);
}

const x = exponentialSearch();
console.log('f(x) becomes positive for the first time when x =', x);
```

Also See:

> [Division of two numbers using binary search algorithm](https://www.techiedelight.com/division-two-numbers-using-binary-search-algorithm/ "Division of two numbers using binary search algorithm")

> [Exponential search](https://www.techiedelight.com/exponential-search/ "Exponential search")

> [Binary Search Algorithm – Iterative and Recursive Implementation](https://www.techiedelight.com/binary-search/ "Binary Search Algorithm – Iterative and Recursive Implementation")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 174

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/), [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
