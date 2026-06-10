# 4–Sum Problem | Quadruplets with a given sum

> Source: https://www.techiedelight.com/4-sum-problem/

4-sum problem: Given an unsorted integer array, check if it contains four elements tuple (quadruplets) having a given sum.

For example,

**Input:** nums = [ 2, 7, 4, 0, 9, 5, 1, 3 ] target = 20 **Output:** Quadruplet exists. Below are quadruplets with the given sum 20 (0, 4, 7, 9) (1, 3, 7, 9) (2, 4, 5, 9)

> 

## 1\. Naive Recursive Approach

The idea is similar to the [0–1 Knapsack problem](https://techiedelight.com/0-1-knapsack-problem/) and uses [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). For each item, either consider it or exclude it and recur for the remaining items. Return true if the desired sum is found by including or excluding the current item.

This approach is demonstrated below in TypeScript:

```ts
// Naive recursive function to check if quadruplet exists in a list
// with the given sum
function hasQuadruplet(nums: number[], n: number, target: number, count: number): boolean {

    // if the desired sum is reached with 4 elements, return true
    if (target === 0 && count === 4) {
        return true;
    }

    // return false if the sum is not possible with the current configuration
    if (count > 4 || n === 0) {
        return false;
    }

    // Recur with
    // 1. Including the current element
    // 2. Excluding the current element

    return hasQuadruplet(nums, n - 1, target - nums[n - 1], count + 1) ||
        hasQuadruplet(nums, n - 1, target, count);
}

const nums = [2, 7, 4, 0, 9, 5, 1, 3];
const target = 20;

if (hasQuadruplet(nums, nums.length, target, 0)) {
    console.log('Quadruplet exists');
} else {
    console.log(`Quadruplet doesn't exist`);
}
```

**Output:** Quadruplet exists


The time complexity of the above solution is exponential and requires additional space for the recursion (call stack). We can also use four nested loops and consider every quadruplet in the given array to check if the desired sum is found. This can reduce the time complexity to O(n4) for the input of `n` elements and doesn’t require any extra space.

## 2\. Efficient solution using Hashing

The idea is to consider every pair of elements in the array one by one and insert it into a [hash table](https://techiedelight.com/hashing-in-data-structure/). For each pair of elements `(i, j)`, calculate the remaining sum. If the remaining sum exists in the map and elements involved in the previous occurrence doesn’t overlap with the current pair, i.e., `(i, j, i, y)` or `(i, j, x, i)` or `(i, j, j, y)`, or `(i, j, x, j)`, print the quadruplet and return.

Following is the TypeScript program that demonstrates it:

```ts
// Function to check if quadruplet exists in a list with the given sum
function hasQuadruplet(nums: number[], target: number): boolean {

    // create an empty dictionary
    // key —> target of a pair in the list
    // value —> list storing an index of every pair having that sum
    const d = new Map<number, [number, number][]>();

    // consider each element except the last element
    for (let i = 0; i < nums.length - 1; i++) {

        // start from the i'th element until the last element
        for (let j = i + 1; j < nums.length; j++) {

            // calculate the remaining sum
            const val = target - (nums[i] + nums[j]);

            // if the remaining sum is found on the dictionary,
            // we have found a quadruplet
            if (d.has(val)) {

                // check every pair having a sum equal to the remaining sum
                for (const [x, y] of d.get(val)!) {

                    // if quadruplet doesn't overlap, print it and return true
                    if ((x !== i && x !== j) && (y !== i && y !== j)) {
                        console.log(`Quadruplet Found (${nums[i]}, ${nums[j]}, ${nums[x]}, ${nums[y]})`);
                        return true;
                    }
                }
            }

            // insert the current pair into the dictionary
            if (!d.has(nums[i] + nums[j])) {
                d.set(nums[i] + nums[j], []);
            }
            d.get(nums[i] + nums[j])!.push([i, j]);
        }
    }

    // return false if quadruplet doesn't exist
    return false;
}

const nums = [2, 7, 4, 0, 9, 5, 1, 3];
const target = 20;

if (!hasQuadruplet(nums, target)) {
    console.log(`Quadruplet doesn't exist`);
}
```

**Output:** Quadruplet Found (4, 0, 7, 9)


The time complexity of the above solution is O(n3) and requires O(n2) extra space, where `n` is the size of the input.

**Also See:**

> [Print all quadruplets with a given sum | 4 sum problem extended](https://techiedelight.com/print-all-quadruplets-with-given-sum-4-sum-problem-extended/)
