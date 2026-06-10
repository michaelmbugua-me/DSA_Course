# Print all combinations of positive integers in increasing order that sums to a given number

> Source: https://www.techiedelight.com/print-combinations-integers-sum-given-number/

[Array](https://www.techiedelight.com/Category/Array/)

Write code to print all combinations of positive integers in increasing order that sum to a given positive number.

For example,

**Input:** N = 3 1 1 1 1 2 3 **Input:** N = 4 1 1 1 1 1 1 2 1 3 2 2 4 **Input:** N = 5 1 1 1 1 1 1 1 1 2 1 1 3 1 2 2 1 4 2 3 5

> 

We can easily solve the problem using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) by taking the help of an auxiliary array to store combinations. This approach is demonstrated below in TypeScript:

```ts
// Recursive function to print all combinations of positive integers
// in increasing order that sum to a given number
function printCombinations(nums: number[], i: number, total: number, sumLeft: number): void {

    // to maintain the increasing order, start the loop from the
    // previous number stored in `nums`
    const prevNum = (i > 0) ? nums[i - 1] : 1;
    for (let k = prevNum; k <= total; k++) {

        // set the next element in the list to `k`
        nums[i] = k;

        // recur with the sum left and the next location in the list
        if (sumLeft > k) {
            printCombinations(nums, i + 1, total, sumLeft - k);
        }

        // if the sum is found
        if (sumLeft === k) {
            console.log(nums.slice(0, i + 1));
        }
    }
}

// Wrapper over `printCombinations()` function
function findCombinations(total: number): void {

    // create a temporary list for storing the combinations
    const nums: number[] = Array(total).fill(0);

    // recur for all combinations
    const startingIndex = 0;
    printCombinations(nums, startingIndex, total, total);
}

const total = 5;
findCombinations(total);
```

**Output:** 1 1 1 1 1 1 1 1 2 1 1 3 1 2 2 1 4 2 3 5

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

**Author:** Aditya Goel

Also See:

> [Print all combinations of numbers from 1 to `n` having sum `n`](https://www.techiedelight.com/print-all-combination-numbers-from-1-to-n/ "Print all combinations of numbers from 1 to `n` having sum `n`")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 190

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
