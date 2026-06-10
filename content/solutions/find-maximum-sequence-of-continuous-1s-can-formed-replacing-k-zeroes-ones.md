# Find the maximum sequence of continuous 1’s formed by replacing at-most `k` zeros by ones

> Source: https://www.techiedelight.com/find-maximum-sequence-of-continuous-1s-can-formed-replacing-k-zeroes-ones/

[Array](https://www.techiedelight.com/Category/Array/)

Given a binary array, find the maximum sequence of continuous 1’s that can be formed by replacing at most `k` zeros by ones.

For example, consider the following binary array `A`:

**Input:** A[] = { 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0 } For k = 0, The length of the longest sequence is 4 (from index 6 to 9) For k = 1, The length of the longest sequence is 7 (from index 3 to 9) For k = 2, The length of the longest sequence is 10 (from index 0 to 9) For k = 3, The length of the longest sequence is 11 (from index 0 to 10)

> 

We can solve this problem by using the [sliding window technique](https://techiedelight.com/sliding-window-problems/). The idea is to maintain a window containing at most `k` zeros at any point. Add elements to the window from the right until it becomes unstable. The window becomes unstable if the total number of zeros in it becomes more than `k`. If the window becomes unstable, remove elements from its left till it becomes stable again (by removing leftmost zero). If the window is stable and the current window length is more than the maximum window found so far, set the maximum window size to the current window size.

The algorithm can be implemented as follows in TypeScript:

**Output:** The longest sequence has length 10 from index 0 to 9

```ts
// Function to find the maximum sequence of continuous 1's by replacing
// at most `k` zeros by 1 using sliding window technique
function findLongestSequence(A: number[], k: number): void {

    let left = 0;       // represents the current window's starting index
    let count = 0;      // stores the total number of zeros in the current window
    let window = 0;     // stores the maximum number of continuous 1's found
                        // so far (including `k` zeros)

    let leftIndex = 0;  // stores the left index of maximum window found so far

    // maintain a window `[left…right]` containing at most `k` zeros
    for (let right = 0; right < A.length; right++) {

        // if the current element is 0, increase the count of zeros in the
        // current window by 1
        if (A[right] === 0) {
            count++;
        }

        // the window becomes unstable if the total number of zeros in it becomes
        // more than `k`
        while (count > k) {
            // if we have found zero, decrement the number of zeros in the
            // current window by 1
            if (A[left] === 0) {
                count--;
            }

            // remove elements from the window's left side till the window
            // becomes stable again
            left++;
        }

        // when we reach here, window `[left…right]` contains at most
        // `k` zeros, and we update max window size and leftmost index
        // of the window
        if (right - left + 1 > window) {
            window = right - left + 1;
            leftIndex = left;
        }
    }

    // no sequence found
    if (window === 0) {
        return;
    }

    // print the maximum sequence of continuous 1's
    console.log(`The longest sequence has length ${window} from index ${leftIndex} to ${leftIndex + window - 1}`);
}

const A = [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0];
const k = 2;

findLongestSequence(A, k);
```

The time complexity of the above solution is O(n) and doesn’t require any extra space, where `n` is the size of the given sequence.

**Exercise:** Extend the solution to print the index of all zeros replaced.

Also See:

> [Find maximum length sequence of continuous ones (Using Sliding Window)](https://www.techiedelight.com/find-maximum-length-sequence-continuous-ones-sliding-window/ "Find maximum length sequence of continuous ones \(Using Sliding Window\)")

> [Find the index of 0 to be replaced to get the maximum length sequence of continuous ones](https://www.techiedelight.com/find-index-0-replaced-get-maximum-length-sequence-of-continuous-ones/ "Find the index of 0 to be replaced to get the maximum length sequence of continuous ones")

> [Find maximum length sequence of continuous ones](https://www.techiedelight.com/find-maximum-length-sequence-continuous-ones/ "Find maximum length sequence of continuous ones")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 206

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Sliding Window](https://www.techiedelight.com/Tags/Sliding-Window/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
