# 3–partition problem extended | Printing all partitions

> Source: https://www.techiedelight.com/3-partition-problem-extended-print-all-partitions/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of positive integers, which can be partitioned into three disjoint subsets having the same sum, print the partitions.

For example, consider the following set:

`S = { 7, 3, 2, 1, 5, 4, 8 }`

We can partition `S` into three partitions, each having a sum of 10.

`S1 = {7, 3}` `S2 = {5, 4, 1}` `S3 = {8, 2}`

> 

As discussed in the [previous post](https://techiedelight.com/3-partition-problem/), the 3–partition problem is a special case of the [Partition Problem](https://techiedelight.com/partition-problem/). The goal is to partition `S` into 3 subsets with an equal sum, unlike the partition problem, where the goal is to partition `S` into two subsets with an equal sum.

This post will extend the previous solution to print the partitions. The idea is to maintain a separate array `A[]` to keep track of subsets elements. The implementation can be seen below in TypeScript. Note that if the value of `A[i]` is `k`, it means that the `i'th` item of `S` is part of the `k'th` subset.

```ts
// Helper function to 3–partition problem.
// It returns true if there exist three subsets with a given sum
function isSubsetExist(S: number[], n: number, a: number, b: number, c: number, arr: number[]): boolean {
    // return true if the subset is found
    if (a === 0 && b === 0 && c === 0) {
        return true;
    }

    // base case: no items left
    if (n < 0) {
        return false;
    }

    // Case 1. The current item becomes part of the first subset
    let A = false;
    if (a - S[n] >= 0) {
        arr[n] = 1;        // current element goes to the first subset
        A = isSubsetExist(S, n - 1, a - S[n], b, c, arr);
    }

    // Case 2. The current item becomes part of the second subset
    let B = false;
    if (!A && (b - S[n] >= 0)) {
        arr[n] = 2;        // current element goes to the second subset
        B = isSubsetExist(S, n - 1, a, b - S[n], c, arr);
    }

    // Case 3. The current item becomes part of the third subset
    let C = false;
    if ((!A && !B) && (c - S[n] >= 0)) {
        arr[n] = 3;        // current element goes to the third subset
        C = isSubsetExist(S, n - 1, a, b, c - S[n], arr);
    }

    // return true if we get a solution
    return A || B || C;
}

// Function for solving the 3–partition problem. It prints the subset if
// given set `S[0…n-1]` can be divided into three subsets with an equal sum
function partition(S: number[]): void {

    // get the sum of all elements in the set
    const total = S.reduce((x, y) => x + y, 0);

    // construct an array to track the subsets
    // `A[i] = k` represents i'th item of `S` is part of k'th subset
    const A: number[] = new Array(S.length).fill(0);

    // set result to true if the sum is divisible by 3 and the set `S` can
    // be divided into three subsets with an equal sum
    const result = (S.length >= 3) && (total % 3) === 0 &&
        isSubsetExist(S, S.length - 1, Math.floor(total / 3), Math.floor(total / 3), Math.floor(total / 3), A);

    if (!result) {
        console.log('3-Partition of set is not possible');
        return;
    }

    // print the partitions
    for (let i = 0; i < 3; i++) {
        console.log(`Partition ${i} is [${S.filter((_, j) => A[j] === i + 1).join(', ')}]`);
    }
}

// Input: a set of integers
const S = [7, 3, 2, 1, 5, 4, 8];
partition(S);
```

**Output:** Partition 0 is 2 8 Partition 1 is 1 5 4 Partition 2 is 7 3

The time complexity of the above solution is exponential and occupies space in the call stack. It can be optimized using [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/), as discussed in the [previous post](https://techiedelight.com/3-partition-problem/).

**Exercise:** Extend the solution to [print k–partitions](https://techiedelight.com/k-partition-problem-print-all-subsets/)

Also See:

> [K–Partition Problem | Printing all partitions](https://www.techiedelight.com/k-partition-problem-print-all-subsets/ "K–Partition Problem | Printing all partitions")

> [3–Partition Problem](https://www.techiedelight.com/3-partition-problem/ "3–Partition Problem")

> [Partition Problem using Dynamic Programming](https://www.techiedelight.com/partition-problem/ "Partition Problem using Dynamic Programming")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 152

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
