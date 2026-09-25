# Find minimum jumps required to reach the destination

> Source: https://www.techiedelight.com/find-minimum-jumps-required-reach-destination/

Given an array of non-negative integers, where each array element represents the maximum number of positions one can move forward from that element. Find the minimum number of jumps required to reach a given destination from a given source within the array.

If any element has value zero in the array, the destination cannot be reached through that element. If the source itself has value zero, return infinity as the destination cannot be reached at all. To make the problem simpler, let’s assume the source and destination to be the start and end of the array.

For example,

**Input:** nums[] = { 4, 2, 0, 3, 2, 0, 1, 8 } **Output:** Minimum jumps required to reach the destination are 3. 3 jumps: (4 —> 3 —> 1 —> 8) or (4 —> 2 —> 1 —> 8) 4 jumps: (4 —> 2 —> 3 —> 1 —> 8) or (4 —> 3 —> 2 —> 1 —> 8) 5 jumps: (4 —> 2 —> 3 —> 2 —> 1 —> 8) **Input:** nums[] = { 4, 2, 2, 1, 0, 8, 1 } **Output:** Minimum jumps required to reach the destination are infinity. This is because no matter what path we choose, we will always end up in a dead cell. 4 —> 2 —> 2 —> 1 —> 0 4 —> 2 —> 1 —> 0 4 —> 1 —> 0 4 —> 0

> 

The idea is to recur for all elements reachable from the source and consider their minimum cost. The recurrence relation `T(n)` can be written as:

T(source, dest) = minimum{T(j, dest)} for all j reachable from source

The time complexity of this solution would be exponential since we might end up computing the same subproblem repeatedly. We can use [dynamic programming](https://techiedelight.com/dynamic-programming-interview-questions/) to optimize the code since this problem exhibits both properties of dynamic programming, i.e., [overlapping subproblems](https://techiedelight.com/introduction-dynamic-programming/#overlapping-subproblems) and [optimal substructure](https://techiedelight.com/introduction-dynamic-programming/#optimal-substructure).

## 1\. Using Memoization

We can use memoization to solve this problem in a top-down fashion. The idea is to store the results of function calls and return the cached result when the same inputs occur again.

```ts
// Find minimum jumps required to reach the destination
function findMinJumps(nums: number[], i: number, n: number, lookup: number[]): number {

    // base case: destination is reached
    if (i === n - 1) {
        return 0;
    }

    // base case: array index out of bound or destination is
    // unreachable from the source
    if (i >= n || nums[i] === 0) {
        return Infinity;
    }

    // if the subproblem is seen before
    if (lookup[i]) {
        return lookup[i];
    }

    // find the minimum jumps required to reach the destination by considering
    // the minimum of all elements reachable from `nums[i]`
    let min_jumps = Infinity;
    for (let j = i + 1; j <= i + nums[i]; j++) {
        const cost = findMinJumps(nums, j, n, lookup);
        if (cost !== Infinity) {
            min_jumps = Math.min(min_jumps, cost + 1);
        }
    }

    // if the subproblem is seen for the first time
    lookup[i] = min_jumps;
    return lookup[i];
}

function findMinimumJumps(nums: number[]): number {

    // base case
    if (!nums) {
        return 0;
    }

    // create an auxiliary array to store solutions to the subproblems and
    // initialize it with 0
    const lookup: number[] = Array(nums.length).fill(0);

    return findMinJumps(nums, 0, nums.length, lookup);
}

const nums = [1, 3, 6, 1, 0, 9];

console.log(`The minimum jumps required to reach the destination are ${findMinimumJumps(nums)}`);
```

**Output:** The minimum jumps required to reach the destination are 3

The time complexity of the above top-down solution is O(n3) and requires O(n2) extra space, where `n` is the size of the input.

## 2\. Using Tabulation

Another idea is to construct an auxiliary array `lookup[]` for storing the subproblem solutions. For an array `nums[]`, `lookup[i]` will store the minimum jumps required to reach nums[i] from source nums[0]. The algorithm can be implemented as follows in TypeScript, where `lookup[]` is filled in a bottom-up fashion:

```ts
// Find minimum jumps required to reach the destination
function findMinJumps(nums: number[]): number {

    // base case
    if (!nums) {
        return 0;
    }

    // get length of the array
    const n = nums.length;

    // base case: the destination is unreachable from the source
    if (n > 1 && nums[0] === 0) {
        return Infinity;
    }

    // lookup[i] stores the minimum jumps required to reach nums[i] from source nums[0]
    const lookup: number[] = Array(n).fill(Infinity);

    // destination is the same as the source
    lookup[0] = 0;

    // do for every position
    for (let i = 0; i < n; i++) {

        // find the minimum jumps required to reach the destination by
        // considering the minimum from each position reachable from nums[i]
        for (let j = 1; (i + j < n) && j <= Math.min(n - 1, nums[i]) &&
            lookup[i] !== Infinity; j++) {
            lookup[i + j] = Math.min(lookup[i + j], lookup[i] + 1);
        }
    }

    // lookup[n-1] would have the result since nums[n-1] is the destination
    return lookup[n - 1];
}

const nums = [4, 2, 0, 3, 2, 0, 1, 8];
console.log(`The minimum jumps required to reach the destination are ${findMinJumps(nums)}`);
```

**Output:** The minimum jumps required to reach the destination are 3

The time complexity of the above bottom-up solution is O(n2) and requires O(n) extra space, where `n` is the size of the input.
