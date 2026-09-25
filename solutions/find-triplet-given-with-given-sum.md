# Find a triplet with the given sum in an array

> Source: https://www.techiedelight.com/find-triplet-given-with-given-sum/

Given an unsorted integer array, find a triplet with a given sum in it.

For example,

**Input:** nums = [ 2, 7, 4, 0, 9, 5, 1, 3 ] target = 6 **Output:** Triplet exists. The triplets with the given sum 6 are {0, 1, 5}, {0, 2, 4}, {1, 2, 3}

> 

The problem is a standard variation of the [3SUM problem](https://techiedelight.com/?problem=3Sum), where instead of looking for numbers whose sum is 0, we look for numbers whose sum is any constant `C`.

## 1\. Naive Recursive Approach

The idea is similar to the [0–1 Knapsack problem](https://techiedelight.com/0-1-knapsack-problem/) and uses [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). We either consider the current item or exclude it and recur for the remaining elements for each item. Return true if we get the desired sum by including or excluding the current item. Following is a TypeScript implementation based on the idea:

```ts
// Naive recursive function to check if triplet exists in a list
// with the given sum
const isTripletExist = (nums: number[], n: number, target: number, count: number): boolean => {
    // if triplet has the desired sum, return true
    if (count === 3 && target === 0) {
        return true;
    }

    // return false if the sum is not possible with the current configuration
    if (count === 3 || n === 0 || target < 0) {
        return false;
    }

    // recur with including and excluding the current element
    return isTripletExist(nums, n - 1, target - nums[n - 1], count + 1) ||
        isTripletExist(nums, n - 1, target, count);
};

const nums = [2, 7, 4, 0, 9, 5, 1, 3];
const target = 6;

if (isTripletExist(nums, nums.length, target, 0)) {
    console.log('Triplet exists');
} else {
    console.log("Triplet doesn't exist");
}
```

**Output:** Triplet exists

We can also use three nested loops and consider every triplet in the given array to check if the desired sum is found.

## 2\. Using Hashing

The idea is to insert each array element into a [hash table](https://techiedelight.com/hashing-in-data-structure/). Then consider all pairs present in the array and check if the remaining sum exists in the map or not. If the remaining sum is seen before and triplet doesn’t overlap with each other, i.e., `(i, j, i)` or `(i, j, j)`, print the triplet and return. The algorithm can be implemented as follows in TypeScript:

```ts
// Function to check if triplet exists in a list with the given sum
const isTripletExist = (nums: number[], target: number): boolean => {
    // create an empty dictionary
    const d = new Map<number, number>();

    // insert (element, index) pair into the dictionary for each input element
    nums.forEach((e, i) => d.set(e, i));

    // consider each element except the last element
    for (let i = 0; i < nums.length - 1; i++) {
        // start from the i'th element until the last element
        for (let j = i + 1; j < nums.length; j++) {
            // remaining sum
            const val = target - (nums[i] + nums[j]);

            // if the remaining sum is found, we have found a triplet
            if (d.has(val)) {
                // if the triplet doesn't overlap, return true
                if (d.get(val) !== i && d.get(val) !== j) {
                    return true;
                }
            }
        }
    }

    // return false if triplet doesn't exist
    return false;
};

const nums = [2, 7, 4, 0, 9, 5, 1, 3];
const target = 6;

if (isTripletExist(nums, target)) {
    console.log('Triplet exists');
} else {
    console.log("Triplet doesn't exist");
}
```

**Output:** Triplet exists

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the size of the input.

## 3\. Printing distinct triplets

The idea is to [sort the given array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order, and for each element `nums[i]` in the array, check if the triplet is formed by nums[i] and [a pair from subarray nums[i+1…n)](https://techiedelight.com/find-pair-with-given-sum-array/). This is demonstrated below in TypeScript:

```ts
// Function to print all distinct triplet in an array with the given sum
const printAllTriplets = (nums: number[], target: number): void => {
    // sort the array in ascending order
    nums.sort((a, b) => a - b);

    // check if triplet is formed by nums[i] and a pair from
    // subarray nums[i+1…n)
    for (let i = 0; i <= nums.length - 3; i++) {
        // remaining sum
        const k = target - nums[i];

        // maintain two indices pointing to endpoints of the
        // subarray nums[i+1…n)
        let low = i + 1, high = nums.length - 1;

        // loop if `low` is less than `high`
        while (low < high) {
            // increment `low` index if the total is less than the remaining sum
            if (nums[low] + nums[high] < k) {
                low++;
            }

            // decrement `high` index if the total is more than the remaining sum
            else if (nums[low] + nums[high] > k) {
                high--;
            }

            // triplet with the given sum is found
            else {
                // print the triplet
                console.log(`(${nums[i]} ${nums[low]} ${nums[high]})`);

                // increment `low` index and decrement `high` index
                low++, high--;
            }
        }
    }
};

const nums = [2, 7, 4, 0, 9, 5, 1, 3];
const target = 6;
printAllTriplets(nums, target);
```

**Output:** (0 1 5) (0 2 4) (1 2 3)
