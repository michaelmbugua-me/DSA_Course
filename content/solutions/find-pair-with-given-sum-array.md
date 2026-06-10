# Find a pair with the given sum in an array

> Source: https://www.techiedelight.com/find-pair-with-given-sum-array/

Given an unsorted integer array, find a pair with the given sum in it.

For example,

**Input:** nums = [8, 7, 2, 5, 3, 1] target = 10 **Output:** Pair found (8, 2) or Pair found (7, 3) **Input:** nums = [5, 2, 6, 8, 1, 9] target = 12 **Output:** Pair not found

> 

There are several methods to solve this problem using brute-force, sorting, and hashing. These are discussed below:

## 1\. Using Brute-Force

A naive solution is to consider every pair in the given array and return if the desired sum is found. This approach is demonstrated below in TypeScript:

```ts
// Naive method to find a pair in an array with the given sum
function findPair(nums: number[], target: number): void {

    // consider each element except the last
    for (let i = 0; i < nums.length - 1; i++) {

        // start from the i'th element until the last element
        for (let j = i + 1; j < nums.length; j++) {

            // if the desired sum is found, print it
            if (nums[i] + nums[j] === target) {
                console.log(`Pair found (${nums[i]}, ${nums[j]})`);
                return;
            }
        }
    }

    // No pair with the given sum exists in the array
    console.log('Pair not found');
}

const nums = [8, 7, 2, 5, 3, 1];
const target = 10;

findPair(nums, target);
```

The time complexity of the above solution is O(n2) and doesn’t require any extra space, where `n` is the size of the input.

## 2\. Using Sorting

The idea is to [sort the given array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order and maintain search space by maintaining two indices (`low` and `high`) that initially points to two endpoints of the array. Then reduce the search space `nums[low…high]` at each iteration of the loop by comparing the sum of elements present at indices `low` and `high` with the desired sum. Increment `low` if the sum is less than the expected sum; otherwise, decrement `high` if the sum is more than the desired sum. If the pair is found, return it.

Following is the TypeScript implementation based on the idea:

```ts
// Function to find a pair in an array with a given sum using sorting
function findPair(nums: number[], target: number): void {

    // sort the array in ascending order
    nums.sort((a, b) => a - b);

    // maintain two indices pointing to endpoints of the array
    let low = 0;
    let high = nums.length - 1;

    // reduce the search space `nums[low…high]` at each iteration of the loop

    // loop till the search space is exhausted
    while (low < high) {

        if (nums[low] + nums[high] === target) {        // target found
            console.log(`Pair found (${nums[low]}, ${nums[high]})`);
            return;
        }

        // increment `low` index if the total is less than the desired sum;
        // decrement `high` index if the total is more than the desired sum
        if (nums[low] + nums[high] < target) {
            low = low + 1;
        } else {
            high = high - 1;
        }
    }

    // No pair with the given sum exists
    console.log('Pair not found');
}

const nums = [8, 7, 2, 5, 3, 1];
const target = 10;

findPair(nums, target);
```

The time complexity of the above solution is O(n.log(n)) and doesn’t require any extra space.

## 3\. Using Hashing

We can use a [hash table](https://techiedelight.com/hashing-in-data-structure/) to solve this problem in linear time. The idea is to insert each array element `nums[i]` into a map. We also check if difference `(nums[i], target - nums[i])` already exists in the map or not. If the difference is seen before, print the pair and return. The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find a pair in an array with a given sum using hashing
function findPair(nums: number[], target: number): void {
    // create an empty map
    const map = new Map<number, number>();

    // do for each element
    for (let i = 0; i < nums.length; i++) {
        // check if pair (nums[i], target - nums[i]) exists

        // index of the complement element, if it is seen before
        const j = map.get(target - nums[i]);

        // if the difference is seen before, print the pair
        if (j !== undefined) {
            console.log(`Pair found (${nums[j]}, ${nums[i]})`);
            return;
        }

        // store index of the current element in the map
        map.set(nums[i], i);
    }

    // we reach here if the pair is not found
    console.log('Pair not found');
}

const nums = [8, 7, 2, 5, 3, 1];
const target = 10;

findPair(nums, target);
```

**Output:** Pair found (8, 2)
