# Partition Problem using Dynamic Programming

> Source: https://www.techiedelight.com/partition-problem/

Given a set of positive integers, check if it can be divided into two subsets with equal sum.

For example,

Consider S = {3, 1, 1, 2, 2, 1} We can partition `S` into two partitions, each having a sum of 5. S1 = {1, 1, 1, 2} S2 = {2, 3} Note that this solution is not unique. Here’s another solution. S1 = {3, 1, 1} S2 = {2, 2, 1}

> 

The partition problem is a special case of the [Subset Sum Problem](https://techiedelight.com/subset-sum-problem/), which itself is a special case of the [Knapsack Problem](https://techiedelight.com/0-1-knapsack-problem/). The idea is to calculate the sum of all elements in the set, say `sum`. If `sum` is odd, we can’t divide the array into two sets. If `sum` is even, check if a subset with `sum/2` exists or not. Following is the algorithm to find the subset sum:

Consider each item in the given array one by one, and for each item, there are two possibilities:

  1. Include the current item in the subset and recur for the remaining items with the remaining total.
  2. Exclude the current item from the subset and recur for the remaining items.

Finally, return true if we get a subset by including or excluding the current item; otherwise, return false. The recursion’s base case would be when no items are left, or the sum becomes negative. We return true when the sum becomes 0, i.e., the subset is found.

The algorithm can be implemented as follows in TypeScript:

```ts
// Returns true if there exists a subset of `nums[0…n]` with the given sum
function subsetSum(nums: number[], n: number, total: number): boolean {

    // return true if the sum becomes 0 (subset found)
    if (total === 0) {
        return true;
    }

    // base case: no items left or sum becomes negative
    if (n < 0 || total < 0) {
        return false;
    }

    // Case 1. Include the current item `nums[n]` in the subset and recur
    // for remaining items `n-1` with the remaining sum `total-nums[n]`
    const include = subsetSum(nums, n - 1, total - nums[n]);

    // return true if we get subset by including the current item
    if (include) {
        return true;
    }

    // Case 2. Exclude the current item `nums[n]` from the subset and recur for
    // remaining items `n-1`
    const exclude = subsetSum(nums, n - 1, total);

    // return true if we get subset by excluding the current item
    return exclude;
}

// Returns true if given array `nums[0…n-1]` can be divided into two
// subsets with equal sum
function partition(nums: number[]): boolean {

    const total = nums.reduce((a, b) => a + b, 0);

    // return true if the sum is even and the array can be divided into
    // two subsets with equal sum
    return (total & 1) === 0 && subsetSum(nums, nums.length - 1, total / 2);
}

// Input: a set of items
const nums = [7, 3, 1, 5, 4, 8];

if (partition(nums)) {
    console.log('Set can be partitioned');
} else {
    console.log('Set cannot be partitioned');
}
```

**Output:** Set can be partitioned

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has an [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure) and also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems), i.e., the problem can be split into smaller subproblems, and the same subproblems will get computed again and again. We can easily prove this by drawing a recursion tree of the above code.

[Dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) can solve this problem by saving subproblem solutions in memory rather than computing them again and again. The idea is to solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `T[i][j]`, for each `1 <= i <= n` and `1 <= j <= sum`, which is true if subset with sum `j` can be found using items up to first `i` items. It uses the value of smaller values `i` and `j` already computed. It has the same asymptotic runtime as Memoization but no recursion overhead.

Following is the TypeScript program that demonstrates it:

```ts
// Returns true if there exists a subset of `nums[0…n)` with the given sum
function subsetSum(nums: number[], total: number): boolean {

    const n = nums.length;

    // `T[i][j]` stores true if subset with sum `j` can be attained
    // using items up to first `i` items
    const T: boolean[][] = Array.from({ length: n + 1 },
        () => new Array(total + 1).fill(false));

    // if the sum is zero
    for (let i = 0; i <= n; i++) {
        T[i][0] = true;
    }

    // do for i'th item
    for (let i = 1; i <= n; i++) {

        // consider all sum from 1 to total
        for (let j = 1; j <= total; j++) {

            // don't include the i'th element if `j-nums[i-1]` is negative
            if (nums[i - 1] > j) {
                T[i][j] = T[i - 1][j];
            } else {
                // find the subset with sum `j` by excluding or including the i'th item
                T[i][j] = T[i - 1][j] || T[i - 1][j - nums[i - 1]];
            }
        }
    }

    // return maximum value
    return T[n][total];
}

// Partition problem – Returns true if given array `nums[0…n-1]` can
// be divided into two subsets with equal sum
function partition(nums: number[]): boolean {

    const total = nums.reduce((a, b) => a + b, 0);

    // return true if the sum is even and the array can be divided into
    // two subsets with equal sum
    return (total & 1) === 0 && subsetSum(nums, Math.floor(total / 2));
}

// Input: a set of items
const nums = [7, 3, 1, 5, 4, 8];

if (partition(nums)) {
    console.log('Set can be partitioned');
} else {
    console.log('Set cannot be partitioned');
}
```

**Output:** Set can be partitioned

The time complexity of the above bottom-up solution is O(n × sum) and requires O(n × sum) extra space, where `n` is the size of the input and `sum` is the sum of all elements in the input.

**Exercise:** Extend the solution to [3-partitions](https://techiedelight.com/3-partition-problem/) and also print the partitions.

**References:** <https://en.wikipedia.org/wiki/Partition_problem>
