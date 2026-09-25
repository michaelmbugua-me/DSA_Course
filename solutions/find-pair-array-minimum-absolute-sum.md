# Find a pair with a minimum absolute sum in an array

> Source: https://www.techiedelight.com/find-pair-array-minimum-absolute-sum/

Given a sorted integer array, find a pair in it having an absolute minimum sum.

For example,

**Input:** A = [-6, -5, -3, 0, 2, 4, 9] **Output:** Pair is (-5, 4) (-5, 4) = abs(-5 + 4) = abs(-1) = 1, which is minimum among all pairs.

> 

The idea is to maintain search space by maintaining two indexes (`low` and `high`) that initially points to two endpoints of the array. Then loop if low is less than the `high` index and reduce the search space `arr[low…high]` at each iteration of the loop by comparing the sum of elements present at index `low` and `high` with 0. We increment index `low` if the sum is less than the 0; otherwise, decrement index `high` if the sum is more than the 0. We also maintain the minimum absolute difference among all pairs present at `low` and `high` index.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find a pair in an array with an absolute minimum sum
function findPair(A: number[]): void {
    if (A.length < 2) {
        return;
    }

    // sort the array if it is unsorted

    // maintain two indexes pointing to endpoints of the array
    let low = 0;
    let high = A.length - 1;

    // `min` stores the minimum absolute difference
    let min = Number.MAX_SAFE_INTEGER;
    let i = 0, j = 0;

    // reduce the search space `A[low…high]` at each iteration of the loop

    // loop if `low` is less than `high`
    while (low < high) {
        // update the minimum if the current absolute sum is less
        if (Math.abs(A[high] + A[low]) < min) {
            min = Math.abs(A[high] + A[low]);
            i = low;
            j = high;
        }

        // optimization: pair with zero-sum is found
        if (min === 0) {
            break;
        }

        // increment `low` index if the total is less than 0;
        // decrement `high` index if the total is more than 0
        if (A[high] + A[low] < 0) {
            low++;
        } else {
            high--;
        }
    }

    // print the pair
    console.log(`Pair found (${A[i]}, ${A[j]})`);
}

const A = [-6, -5, -3, 0, 2, 4, 9];

findPair(A);
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the input.

Also See:

> [Find a pair with the given sum in a circularly sorted array](https://www.techiedelight.com/find-pair-with-given-sum-circularly-sorted-array/ "Find a pair with the given sum in a circularly sorted array")

> [Find a pair with the given sum in an array](https://www.techiedelight.com/find-pair-with-given-sum-array/ "Find a pair with the given sum in an array")

> [Find the closest pair to a given sum in two sorted arrays](https://www.techiedelight.com/find-closest-pair-two-sorted-arrays/ "Find the closest pair to a given sum in two sorted arrays")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.53/5. Vote count: 131

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
