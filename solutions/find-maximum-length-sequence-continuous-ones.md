# Find maximum length sequence of continuous ones

> Source: https://www.techiedelight.com/find-maximum-length-sequence-continuous-ones/

[Array](https://www.techiedelight.com/Category/Array/)

Given a binary array, find the index of 0 to be replaced with 1 to get a maximum length sequence of continuous ones.

For example, consider the array `[0, 0, 1, 0, 1, 1, 1, 0, 1, 1]`. We need to replace index 7 to get the continuous sequence of length 6 containing all 1’s.

> 

The idea is simple – update each non-zero array element with a count of their adjacent consecutive 1’s. For example, the array `[0, 0, 1, 0, 1, 1, 1, 0, 1, 1]` is converted into `[0, 0, 1, 0, 3, 3, 3, 0, 2, 2]`. Now, the problem reduces to finding the index of 0 whose sum of the left and the right element is maximum.

Following is a TypeScript implementation of the same. Note that this approach will modify the array and at least requires two traversals of the array. We can use an auxiliary array to avoid modifying the original array or restore the original array before returning.

**Output:** Index to be replaced is 7

```ts
// Find the index of 0 to replace with 1 to get the maximum sequence of continuous 1's
function findIndexofZero(A: number[]): number {

    // base case
    if (A.length === 1 && A[0] === 0) {
        return 0;
    }

    // A[i] now stores the length of consecutive 1's ending at `A[i]`
    for (let i = 1; i < A.length; i++) {
        if (A[i] === 1) {
            A[i] += A[i - 1];
        }
    }

    let count = 0;

    // traverse the array from right to left
    for (let i = A.length - 1; i >= 0; i--) {

        // update the count to the number of adjacent 1's, which includes the
        // current element
        count = Math.max(A[i], count);

        // update the array with the count of adjacent 1's for each
        // non-zero element
        if (A[i]) {
            A[i] = count;
        } else {
            // reset the count if the current element is 0
            count = 0;
        }
    }

    let max_count = 0;      // stores the maximum number of 1's (including 0)
    let max_index = -1;     // stores the index of 0 to be replaced

    // consider each index `i` in the array
    for (let i = 0; i < A.length; i++) {

        // if the current element is 0
        if (A[i] === 0) {
            // update maximum count and index of 0 to be replaced if
            // required by taking a left and right element count

            if (i === 0) {
                if (max_count < A[i + 1] + 1) {
                    max_count = A[i + 1] + 1;
                    max_index = i;
                }
            }

            else if (i === A.length - 1) {
                if (max_count < A[i - 1] + 1) {
                    max_count = A[i - 1] + 1;
                    max_index = i;
                }
            }

            else if (max_count < A[i - 1] + A[i + 1] + 1) {
                max_count = A[i - 1] + A[i + 1] + 1;
                max_index = i;
            }
        }
    }

    // restore the original array
    for (let i = 1; i < A.length; i++) {
        if (A[i]) {
            A[i] = 1;
        }
    }

    // return the index of 0 to be replaced, or -1 if the array contains all 1's
    return max_index;
}

const A = [0, 0, 1, 0, 1, 1, 1, 0, 1, 1];

const index = findIndexofZero(A);

if (index !== -1) {
    console.log(`Index to be replaced is ${index}`);
} else {
    console.log("Invalid input");
}
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the given sequence.

We have discussed two more approaches to solve this problem ([here](https://techiedelight.com/find-index-0-replaced-get-maximum-length-sequence-of-continuous-ones/) and [here](https://techiedelight.com/find-maximum-length-sequence-continuous-ones-sliding-window/)).

Also See:

> [Find the index of 0 to be replaced to get the maximum length sequence of continuous ones](https://www.techiedelight.com/find-index-0-replaced-get-maximum-length-sequence-of-continuous-ones/ "Find the index of 0 to be replaced to get the maximum length sequence of continuous ones")

> [Find maximum length sequence of continuous ones (Using Sliding Window)](https://www.techiedelight.com/find-maximum-length-sequence-continuous-ones-sliding-window/ "Find maximum length sequence of continuous ones \(Using Sliding Window\)")

> [Find the maximum sequence of continuous 1’s formed by replacing at-most `k` zeros by ones](https://www.techiedelight.com/find-maximum-sequence-of-continuous-1s-can-formed-replacing-k-zeroes-ones/ "Find the maximum sequence of continuous 1’s formed by replacing at-most `k` zeros by ones")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
