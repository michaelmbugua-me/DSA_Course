# Find the largest subarray formed by consecutive integers

> Source: https://www.techiedelight.com/find-largest-sub-array-formed-by-consecutive-integers/

[Array](https://www.techiedelight.com/Category/Array/)

Given an integer array, find the largest subarray formed by consecutive integers. The subarray should contain all distinct values.

For example,

**Input:** { 2, 0, 2, 1, 4, 3, 1, 0 } **Output:** The largest subarray is { 0, 2, 1, 4, 3 }

> 

The problem differs from the problem of finding the [longest subsequence formed by consecutive integers](https://techiedelight.com/find-longest-subsequence-formed-by-consecutive-integers/). Unlike subsequences, [subarrays](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subarray) are required to occupy consecutive positions within the original array.

The idea is to consider every subarray and keep track of the largest subarray found so far, formed by consecutive integers. For a subarray to contain consecutive integers,

  * The difference between the maximum and minimum element in it should be exactly equal to the subarray’s length minus one.
  * All elements in the array should be distinct (we can check this by inserting the elements in a set or using a visited array).

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to check if subarray `A[i…j]` is formed by consecutive integers.
// Here, `min` and `max` denote the minimum and maximum element in the subarray.
function isConsecutive(A: number[], i: number, j: number, min: number, max: number): boolean {

    // for a list to contain consecutive integers, the difference
    // between the maximum and minimum element in it should be exactly `j-i`
    if (max - min !== j - i) {
        return false;
    }

    // create a visited list (we can also use a set)
    const visited: boolean[] = new Array(j - i + 1).fill(false);

    // traverse the sublist and check if each element appears
    // only once
    for (let k = i; k <= j; k++) {

        // if the element is seen before, return false
        if (visited[A[k] - min]) {
            return false;
        }

        // mark the element as seen
        visited[A[k] - min] = true;
    }

    // we reach here when all elements in the list are distinct
    return true;
}

// Find the largest sublist formed by consecutive integers
function findMaxSublist(A: number[]): void {

    let length = 1;
    let start = 0, end = 0;

    // consider each sublist formed by `A[i…j]`

    // `i` denotes the beginning of the sublist
    for (let i = 0; i < A.length - 1; i++) {

        // stores the minimum and maximum element formed by `A[i…j]`
        let min_val = A[i];
        let max_val = A[i];

        // `j` denotes the end of the sublist
        for (let j = i + 1; j < A.length; j++) {
            // update the minimum and maximum elements of the sublist
            min_val = Math.min(min_val, A[j]);
            max_val = Math.max(max_val, A[j]);

            // check if `A[i…j]`is formed by consecutive integers
            if (isConsecutive(A, i, j, min_val, max_val)) {
                if (length < max_val - min_val + 1) {
                    length = max_val - min_val + 1;
                    start = i;
                    end = j;
                }
            }
        }
    }

    // print the maximum length sublist
    console.log('The largest sublist is', start, end);
}

const A = [2, 0, 2, 1, 4, 3, 1, 0];

findMaxSublist(A);
```

**Output:** The largest subarray is [1, 5]

The time complexity of the above solution O(n3) and requires O(n) extra space, where `n` is the size of the input.

**Exercise:** Extend the solution to consider duplicates in the subarray.

Also See:

> [Check if an array is formed by consecutive integers](https://www.techiedelight.com/check-array-formed-consecutive-integers/ "Check if an array is formed by consecutive integers")

> [Longest Consecutive Subsequence](https://www.techiedelight.com/find-longest-subsequence-formed-by-consecutive-integers/ "Longest Consecutive Subsequence")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.51/5. Vote count: 150

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hashing](https://www.techiedelight.com/Tags/Hashing/), [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
