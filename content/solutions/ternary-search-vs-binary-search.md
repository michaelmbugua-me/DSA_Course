# Ternary Search vs Binary search

> Source: https://www.techiedelight.com/ternary-search-vs-binary-search/

In this article, we will implement a ternary search algorithm and compare its performance with binary search algorithm.

**Prerequisite:**

> [Binary Search Algorithm – Iterative and Recursive Implementation](https://techiedelight.com/binary-search/)

In Ternary Search, we divide our array into three parts (_by taking two mid_) and discard two-third of our search space at each iteration. At first look, it seems that ternary search might be faster than binary search as its time complexity on an input containing `n` items should be O(log3n), which is less than the time complexity of binary search O(log2n). Before analyzing this claim, let’s take a look at its TypeScript implementation first.

```ts
// Ternary search algorithm to return the position of
// target `x` in a given list `A`
function ternarySearch(A: number[], x: number): number {
    let [left, right] = [0, A.length - 1];

    while (left <= right) {
        const leftMid = left + Math.floor((right - left) / 3);
        const rightMid = right - Math.floor((right - left) / 3);

        // leftMid = Math.floor((2*left + right) / 3);
        // rightMid = Math.floor((left + 2*right) / 3);

        if (A[leftMid] === x) {
            return leftMid;
        } else if (A[rightMid] === x) {
            return rightMid;
        } else if (A[leftMid] > x) {
            right = leftMid - 1;
        } else if (A[rightMid] < x) {
            left = rightMid + 1;
        } else {
            left = leftMid + 1;
            right = rightMid - 1;
        }
    }

    return -1;
}

const A = [2, 5, 6, 8, 9, 10];
const key = 6;

const index = ternarySearch(A, key);

if (index !== -1) {
    console.log(`Element found at index ${index}`);
} else {
    console.log('Element found not in the list');
}
```

As we can see, at each iteration, ternary search makes at most 4 comparisons as compared to binary search, which only makes 2 comparisons. So,

For Binary search – `T(n) = 2clog2n + O(1)` For Ternary search – `T(n) = 4clog3n + O(1)`

By applying simple mathematics, we can establish that the time taken by ternary search is equal to `2.log32` times the time taken binary search algorithm.

Now since `2.log32 > 1`, we actually get **_more_ comparisons with the ternary search.**

Therefore, a ternary search will still give the same asymptotic complexity O(log(n)) search time but adds complexity to the implementation. The same argument is valid for a quaternary search or k–nary search for any other higher order.

As pointed out by Oriba Desu in the comments below, we can use a ternary search to find the extremum (minimum or maximum) of an [unimodal function](https://en.wikipedia.org/wiki/Unimodality#Unimodal_function).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 230

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Binary Search](https://www.techiedelight.com/Tags/Binary-Search/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
