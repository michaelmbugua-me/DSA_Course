# K–Partition Problem | Printing all partitions

> Source: https://www.techiedelight.com/k-partition-problem-print-all-subsets/

In the k–partition problem, we need to partition an array of positive integers into `k` disjoint subsets that all have an equal sum, and they completely cover the set.

For example, consider set `S = { 7, 3, 5, 12, 2, 1, 5, 3, 8, 4, 6, 4 }`.

1\. `S` can be partitioned into two partitions, each having a sum of 30.

`S1 = { 5, 3, 8, 4, 6, 4 }` `S2 = { 7, 3, 5, 12, 2, 1 }`

2\. `S` can be partitioned into three partitions, each having a sum of 20.

`S1 = { 2, 1, 3, 4, 6, 4 }` `S2 = { 7, 5, 8 }` `S3 = { 3, 5, 12 }`

3\. `S` can be partitioned into four partitions, each having a sum of 15.

`S1 = { 1, 4, 6, 4 }` `S2 = { 2, 5, 8 }` `S3 = { 12, 3 }` `S4 = { 7, 3, 5 }`

4\. `S` can be partitioned into five partitions, each having a sum of 12.

`S1 = { 2, 6, 4 }` `S2 = { 8, 4 }` `S3 = { 3, 1, 5, 3 }` `S4 = { 12 }` `S5 = { 7, 5 }`

> 

k-partition problem is a special case of [Partition Problem](https://techiedelight.com/partition-problem/), where the goal is to partition `S` into two subsets with equal sum. This post will extend the [3-partition](https://techiedelight.com/3-partition-problem/) solution to find and print k–partitions.

We can start by calculating the sum of all elements in the set. If the sum is not divisible by `k`, we can’t divide the array into `k` subsets with an equal sum. If the sum is divisible by `k`, check if `k` subsets with the sum of elements equal to `sum/k` exists or not. We can find this by considering each item in the given array one by one, and for each item, include it in the `i'th` subset & recur for the remaining items with the remaining sum. We [backtrack](https://techiedelight.com/backtracking-interview-questions/) if the solution is not found by including a current item in the `i'th` subset and try for the `(i+i)'th` subset.

The solution should return true and print the subsets when `k` subsets each with zero-sum are found. For printing the partitions, maintain a separate array `A[]` to keep track of subsets elements. If the value of `A[i]` is `k`, then it means that the `i'th` item of `S` is part of the `k'th` subset.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to check if all subsets are filled or not
function checkSum(sumLeft: number[], k: number): boolean {

    let r = true;
    for (let i = 0; i < k; i++) {
        if (sumLeft[i]) {
            r = false;
        }
    }

    return r;
}

// Helper function for solving `k` partition problem.
// It returns true if there exist `k` subsets with the given sum
function subsetSum(S: number[], n: number, sumLeft: number[], A: number[], k: number): boolean {

    // return true if a subset is found
    if (checkSum(sumLeft, k)) {
        return true;
    }

    // base case: no items left
    if (n < 0) {
        return false;
    }

    let result = false;

    // consider current item `S[n]` and explore all possibilities
    // using backtracking
    for (let i = 0; i < k; i++) {
        if (!result && (sumLeft[i] - S[n]) >= 0) {

            // mark the current element subset
            A[n] = i + 1;

            // add the current item to the i'th subset
            sumLeft[i] = sumLeft[i] - S[n];

            // recur for remaining items
            result = subsetSum(S, n - 1, sumLeft, A, k);

            // backtrack: remove the current item from the i'th subset
            sumLeft[i] = sumLeft[i] + S[n];
        }
    }

    // return true if we get a solution
    return result;
}

// Function for solving k–partition problem. It prints the subsets if
// set `S[0…n-1]` can be divided into `k` subsets with equal sum
function partition(S: number[], k: number): void {

    // get the total number of items in `S`
    const n = S.length;

    // base case
    if (n < k) {
        console.log('k-partition of set S is not possible');
        return;
    }

    // get the sum of all elements in the set
    const total = S.reduce((x, y) => x + y, 0);
    const A: number[] = new Array(n).fill(0);

    // create an array of size `k` for each subset and initialize it
    // by their expected sum, i.e., `sum/k`
    const sumLeft: number[] = new Array(k).fill(Math.trunc(total / k));

    // return true if the sum is divisible by `k` and set `S` can
    // be divided into `k` subsets with equal sum
    const result = total % k === 0 && subsetSum(S, n - 1, sumLeft, A, k);

    if (!result) {
        console.log('k-partition of set S is not possible');
        return;
    }

    // print all k–partitions
    for (let i = 0; i < k; i++) {
        console.log(`Partition ${i} is`, S.filter((_, j) => A[j] === i + 1));
    }
}

// Input: a set of integers
const S = [7, 3, 5, 12, 2, 1, 5, 3, 8, 4, 6, 4];
const k = 5;

partition(S, k);
```

**Output:** Partition 0 is 2 6 4 Partition 1 is 8 4 Partition 2 is 3 1 5 3 Partition 3 is 12 Partition 4 is 7 5

The time complexity of the above solution is exponential and requires additional space for the recursion (call stack).

Also See:

> [3–partition problem extended | Printing all partitions](https://www.techiedelight.com/3-partition-problem-extended-print-all-partitions/ "3–partition problem extended | Printing all partitions")

> [3–Partition Problem](https://www.techiedelight.com/3-partition-problem/ "3–Partition Problem")

> [Partition Problem using Dynamic Programming](https://www.techiedelight.com/partition-problem/ "Partition Problem using Dynamic Programming")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.75/5. Vote count: 159

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
