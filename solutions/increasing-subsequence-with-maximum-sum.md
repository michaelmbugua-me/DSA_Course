# Maximum Sum Increasing Subsequence Problem

> Source: https://www.techiedelight.com/increasing-subsequence-with-maximum-sum/

Find a subsequence of a given sequence such that the subsequence sum is as high as possible and the subsequence’s elements are sorted in ascending order. This subsequence is not necessarily contiguous or unique.

Please note that the problem specifically targets [subsequences](https://techiedelight.com/difference-between-subarray-subsequence-subset/#subsequence) that need not be contiguous, i.e., subsequences are not required to occupy consecutive positions within the original sequences.

For example, consider subsequence `{0, 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11}`. The maximum sum increasing subsequence is `{8, 12, 14}` which has sum 34.

> 

The Maximum Sum Increasing Subsequence (MSIS) problem is a standard variation of the [Longest Increasing Subsequence (LIS)](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/) problem. The idea is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. For each item, there are two possibilities:

  1. Include the current item in MSIS if it is greater than the previous element in MSIS and recur for the remaining items.
  2. Exclude the current item from MSIS and recur for the remaining items.

Finally, return the maximum sum we get by including or excluding the current item. The base case of the recursion would be when no items are left. Following is a TypeScript implementation of the idea:

```ts
// Function to find the maximum sum of an increasing subsequence
function MSIS(nums: number[], i = 0, prev = -Infinity, total = 0): number {

    // base case: nothing is remaining
    if (i === nums.length) {
        return total;
    }

    // case 1: exclude the current element and process the
    // remaining elements
    const excl = MSIS(nums, i + 1, prev, total);

    // case 2: include the current element if it is greater
    // than the previous element
    let incl = total;
    if (nums[i] > prev) {
        incl = MSIS(nums, i + 1, nums[i], total + nums[i]);
    }

    // return the maximum of the above two choices
    return Math.max(incl, excl);
}

const nums = [8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11];
console.log('The maximum sum of the increasing subsequence is', MSIS(nums));
```

**Output:** The maximum sum of the increasing subsequence is 34

The time complexity of the above solution is exponential and occupies space in the call stack.

The problem has [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure). That means the problem can be broken down into smaller, simple “subproblems”, which can further be divided into yet simpler, smaller subproblems until the solution becomes trivial. The above solution also exhibits [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems). If we draw the solution’s recursion tree, we can see that the same subproblems are repeatedly computed.

We know that problems with optimal substructure and overlapping subproblems can be solved using [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/), in which subproblem solutions are _memo_ ized rather than repeatedly computed. The _memo_ ized version follows the top-down approach since we first break the problem into subproblems and then calculate and store values.

We can also solve this problem in a bottom-up manner. In the bottom-up approach, we solve smaller subproblems first, then solve larger subproblems from them. The following bottom-up approach computes `sum[i]`, for each `0 <= i < n`, which stores the maximum sum of an increasing subsequence of subarray `nums[0…i]` that ends with `nums[i]`. To calculate the `sum[i]`, consider MSIS of all smaller values of `i` (say `j`) already computed and pick maximum `sum[j]`, where `nums[j]` is less than the current element `nums[i]` and add current element `nums[i]` to it. It has the same asymptotic runtime as Memoization but no recursion overhead.

Following is a TypeScript implementation of the idea:

```ts
// Iterative function to find the maximum sum of an increasing subsequence
function MSIS(nums: number[]): number {

    // base case
    if (nums.length === 0) {
        return 0;
    }

    // list to store subproblem solutions. `sum[i]` stores the maximum
    // sum of the increasing subsequence that ends with `nums[i]`
    const total: number[] = new Array(nums.length).fill(0);

    // base case
    total[0] = nums[0];

    // start from the second element in the list
    for (let i = 1; i < nums.length; i++) {

        // do for each element in sublist `nums[0…i-1]`
        for (let j = 0; j < i; j++) {

            // find increasing subsequence with the maximum sum that ends with
            // `nums[j]`, where `nums[j]` is less than the current element `nums[i]`
            if (total[i] < total[j] && nums[i] > nums[j]) {
                total[i] = total[j];
            }
        }

        // include `nums[i]` in MSIS
        total[i] += nums[i];
    }

    // find increasing subsequence with the maximum sum
    return Math.max(...total);
}

const nums = [8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11];

console.log('The maximum sum of the increasing subsequence is', MSIS(nums));
```

**Output:** The maximum sum of the increasing subsequence is 34

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the given sequence.

How to print MSIS?

The above-discussed methods only print the sum of MSIS but do not actually print MSIS itself. To print the MSIS, we actually have to store the maximum sum increasing subsequence in the lookup table along with storing the maximum sum.

For example, consider `nums = [ 8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11 ]`. The maximum sum increasing subsequence `MSIS[i]` of subarray `nums[0…i]` that ends with `nums[i]` are:

MSIS[0] — 8 MSIS[1] — 4 MSIS[2] — 8 12 MSIS[3] — 2 MSIS[4] — 8 10 MSIS[5] — 4 6 **MSIS[6] — 8 12 14** MSIS[7] — 1 MSIS[8] — 4 6 9 MSIS[9] — 4 5 MSIS[10] — 8 12 13 MSIS[11] — 2 3 MSIS[12] — 4 6 9 11

Following is a TypeScript implementation of the idea:

```ts
// Iterative function to print increasing subsequence with the maximum sum
function printMSIS(nums: number[]): void {
    const n = nums.length;

    // base case
    if (n === 0) {
        return;
    }

    // `MSIS[i]` stores the increasing subsequence having the maximum sum
    // that ends with `nums[i]`
    const MSIS: number[][] = [];
    MSIS[0] = [nums[0]];

    // `sum[i]` stores the maximum sum of the increasing subsequence
    // that ends with `nums[i]`
    const sum: number[] = new Array(n).fill(0);
    sum[0] = nums[0];

    // start from the second array element
    for (let i = 1; i < n; i++) {
        // do for each element in subarray `nums[0…i-1]`
        for (let j = 0; j < i; j++) {
            // find increasing subsequence with the maximum sum that ends with
            // `nums[j]`, where `nums[j]` is less than the current element `nums[i]`

            if (sum[i] < sum[j] && nums[i] > nums[j]) {
                MSIS[i] = MSIS[j];      // update increasing subsequence
                sum[i] = sum[j];        // update maximum sum
            }
        }

        // include the current element in increasing subsequence
        MSIS[i].push(nums[i]);

        // add the current element to the maximum sum
        sum[i] += nums[i];
    }

    // uncomment the following code to print contents of `MSIS`
    /* for (let i = 0; i < n; i++)
    {
        console.log(`MSIS[${i}] — `);
        for (const j of MSIS[i]) {
            console.log(j + ' ');
        }
    } */

    // `j` will contain the index of MSIS
    let j = 0;
    for (let i = 1; i < n; i++) {
        if (sum[i] > sum[j]) {
            j = i;
        }
    }

    // print MSIS
    console.log(MSIS[j].join(' '));
}

const nums = [8, 4, 12, 2, 10, 6, 14, 1, 9, 5, 13, 3, 11];

printMSIS(nums);
```

**Output:** 8 12 14
