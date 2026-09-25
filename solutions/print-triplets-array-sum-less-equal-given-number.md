# Print all triplets in an array with a sum less than or equal to a given number

> Source: https://www.techiedelight.com/print-triplets-array-sum-less-equal-given-number/

Given an unsorted integer array, print all triplets in it with sum less than or equal to a given number.

For example,

**Input:** nums = [ 2, 7, 4, 9, 5, 1, 3 ] sum = 10 **Output:** Triplets are (1, 2, 3) (1, 2, 4) (1, 2, 5) (1, 2, 7) (1, 3, 4) (1, 3, 5) (1, 4, 5) (2, 3, 4) (2, 3, 5)

> 

The idea is to [sort the given array in ascending order](https://techiedelight.com/sort-array-ascending-order-cpp/) and for each element `nums[i]` in the array, check if triplets can be formed by `nums[i]` and [pairs from subarray [i+1…n)](https://techiedelight.com/find-pair-with-given-sum-array/). This is demonstrated below in TypeScript:

```ts
// Function to print all distinct triplets in the list with a sum
// less than or equal to a given number
function printAllTriplets(nums: number[], total: number): void {

    // sort the list in ascending order
    nums.sort((a, b) => a - b);

    // check if triplet is formed by `nums[i]` and a pair from
    // sublist `nums[i+1…n)`
    for (let i = 0; i < nums.length - 2; i++) {
        // maintain two indexes pointing to endpoints of the
        // sublist `nums[i+1…n)`
        let low = i + 1;
        let high = nums.length - 1;

        // loop if `low` is less than `high`
        while (low < high) {
            // decrement `high` if the total is more than the remaining sum
            if (nums[i] + nums[low] + nums[high] > total) {
                high = high - 1;
            }
            else {
                // if the total is less than or equal to the remaining sum,
                // print all triplets
                for (let x = low + 1; x <= high; x++) {
                    console.log(`(${nums[i]}, ${nums[low]}, ${nums[x]})`);
                }

                low = low + 1;        // increment low
            }
        }
    }
}

const nums = [2, 7, 4, 9, 5, 1, 3];
const total = 10;

printAllTriplets(nums, total);
```

**Output:** (1, 2, 3) (1, 2, 4) (1, 2, 5) (1, 2, 7) (1, 3, 4) (1, 3, 5) (1, 4, 5) (2, 3, 4) (2, 3, 5)

The time complexity of the above solution is O(n2) and doesn’t require any extra space, where `n` is the size of the input.

We can also solve this problem using [backtracking](https://techiedelight.com/backtracking-interview-questions/), as shown below. Thanks to Tamara Vasylenko for suggesting this alternative approach.

```ts
// Function to print all distinct triplets in the list with a sum
// less than or equal to a given number
function generateAllTriplets(input: number[], total: number, triplets: number[][], comb: number[] = [], begin: number = 0): void {
    if (comb.length === 3) {
        triplets.push([...comb]);
        return;
    }

    let i = begin;
    while (i < input.length && input[i] <= total) {
        comb.push(input[i]);
        generateAllTriplets(input, total - input[i], triplets, comb, i + 1);
        comb.pop();        // backtrack
        i = i + 1;
    }
}

// Wrapper over `generateAllTriplets()` function
function printAllTriplets(input: number[], total: number): void {

    // sort the input
    input.sort((a, b) => a - b);

    // find all distinct triplets
    const triplets: number[][] = [];
    generateAllTriplets(input, total, triplets);

    console.log(triplets);
}

const input = [2, 7, 4, 9, 5, 1, 3];  // 1 2 3 4 5 7 9
const total = 10;

printAllTriplets(input, total);
```

**Output:** (1, 2, 3) (1, 2, 4) (1, 2, 5) (1, 2, 7) (1, 3, 4) (1, 3, 5) (1, 4, 5) (2, 3, 4) (2, 3, 5)
