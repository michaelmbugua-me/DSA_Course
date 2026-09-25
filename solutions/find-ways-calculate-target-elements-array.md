# Find ways to calculate a target from elements of the specified array

> Source: https://www.techiedelight.com/find-ways-calculate-target-elements-array/

Given an integer array, return the total number of ways to calculate the specified target from array elements using only the addition and subtraction operator. The use of any other operator is forbidden.

For example,

Consider the array { 5, 3, -6, 2 }. The total number of ways to reach a target of 6 using only + and – operators is 4 as: (-)-6 = 6 (+) 5 (+) 3 (-) 2 = 6 (+) 5 (-) 3 (-) -6 (-) 2 = 6 (-) 5 (+) 3 (-) -6 (+) 2 = 6 Similarly, there are 4 ways to calculate the target of 4: (-)-6 (-) 2 = 4 (-) 5 (+) 3 (-)-6 = 4 (+) 5 (-) 3 (+) 2 = 4 (+) 5 (+) 3 (+)-6 (+) 2 = 4

> 

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to solve this problem. The idea is to recursively consider each array element, add or subtract its value from the target, and recur for the remaining elements with every element’s remaining target. Also recur with remaining elements with the same target by ignoring the element completely. Finally, return the number of times the desired target is reached at any point in the recursion.

The algorithm can be implemented as follows in TypeScript:

```ts
// Count ways to calculate a target from elements of a specified list
const countWays = (nums: number[], i: number, target: number): number => {
    // base case: if a target is found
    if (target === 0 && i === nums.length) {
        return 1;
    }

    // base case: no elements are left
    if (i === nums.length) {
        return 0;
    }

    // 1. ignore the current element
    const exclude = countWays(nums, i + 1, target);

    // 2. Consider the current element
    //    2.1. Subtract the current element from the target
    //    2.2. Add the current element to the target
    const include = countWays(nums, i + 1, target - nums[i]) +
            countWays(nums, i + 1, target + nums[i]);

    // Return total count
    return exclude + include;
};

// input list and target number
const nums = [5, 3, -6, 2];
const target = 6;

console.log(countWays(nums, 0, target), 'ways');
```

**Output:** 4 ways

The above solution is very similar to the famous [0–1 Knapsack Problem](https://techiedelight.com/0-1-knapsack-problem/) and runs in O(3^n) time, where `n` is the size of the input. The [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) solution is recommended for large input, which is left as an exercise to the readers.

How can we extend the solution to print all pairs?

We can easily extend the solution to print all pairs of elements. The idea is to maintain a list to store the processed elements at any point, along with the information about the operator used.

```ts
const printList = (list: [number, string][]): void => {
    for (const [num, sign] of list) {
        console.log(`(${sign})${num} `, '');
    }
    console.log();
};

// Print all ways to calculate a target from elements of a specified list
const printWays = (nums: number[], i: number, target: number, auxlist: [number, string][]): void => {
    // base case: if a target is found, print the result list.
    if (target === 0 && i === nums.length) {
        printList(auxlist);
    }

    // base case: no elements are left
    if (i === nums.length) {
        return;
    }

    // ignore the current element
    printWays(nums, i + 1, target, auxlist);

    // consider the current element and subtract it from the target
    auxlist.push([nums[i], '+']);
    printWays(nums, i + 1, target - nums[i], auxlist);
    auxlist.pop();  // backtrack

    // consider the current element and add it to the target
    auxlist.push([nums[i], '-']);
    printWays(nums, i + 1, target + nums[i], auxlist);
    auxlist.pop();  // backtrack
};

// input list and target number
const nums = [5, 3, -6, 2];
const target = 6;

printWays(nums, 0, target, []);
```

**Output:** (-)-6 (+)5 (+)3 (-)2 (+)5 (-)3 (-)-6 (-)2 (-)5 (+)3 (-)-6 (+)2
