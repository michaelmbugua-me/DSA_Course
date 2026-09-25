# Shuffle an array according to the given order of elements

> Source: https://www.techiedelight.com/shuffle-array-according-to-given-order/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array of distinct integers, shuffle it according to the given order of elements.

For example,

**Input:** nums[] = { 1, 2, 3, 4, 5 } pos[] = { 3, 2, 4, 1, 0 } **Output:** nums[] = { 5, 4, 2, 1, 3 } i.e., if pos[i] = j, then update nums[j] = nums[i] for every index i. In other words, update nums[pos[i]] = nums[i] for every index i.

> 

A simple solution is to create an auxiliary array of size `n`, and for each element in the input array, set the corresponding values in it. After filling the auxiliary array, we copy it back to the given array. This solution can be implemented as follows in TypeScript:

```ts
// Function to shuffle an array according to the given order of elements
function shuffle(nums: number[], pos: number[]): void {
    // create an auxiliary space of size `n`
    const aux: number[] = new Array(nums.length);

    // fill the auxiliary space with the correct order of elements
    for (let i = 0; i < nums.length; i++) {
        aux[pos[i]] = nums[i];
    }

    // copy the auxiliary space back to the given array
    for (let i = 0; i < nums.length; i++) {
        nums[i] = aux[i];
    }
}

// demo
const nums = [1, 2, 3, 4, 5];   // input array
const pos = [3, 2, 4, 1, 0];    // position array

shuffle(nums, pos);
console.log(nums);
```

We can also use a map replacing the auxiliary array, as demonstrated below in TypeScript:

```ts
// Function to shuffle an array according to the given order of elements
function shuffle(nums: number[], pos: number[]): void {
    // create an empty map
    const map = new Map<number, number>();

    // fill the map with the required mappings
    for (let i = 0; i < nums.length; i++) {
        map.set(pos[i], nums[i]);
    }

    // iterate through the map and replace the array elements
    for (const [key, value] of map) {
        nums[key] = value;
    }
}

// demo
const nums = [1, 2, 3, 4, 5];   // input array
const pos = [3, 2, 4, 1, 0];    // position array

shuffle(nums, pos);
console.log(nums);
```

The time complexity of both above-discussed methods is O(n). However, both solution requires extra space. The algorithm can be implemented with O(1) extra space, as shown below:

```ts
// Function to shuffle an array according to the given order of elements
function shuffle(nums: number[], pos: number[]): void {
    // traverse the array from left to right
    for (let i = 0; i < nums.length; i++) {
        // loop till the current set is swapped
        while (pos[i] !== i) {
            // update `nums[]` and `pos[]` with the correct order of elements
            const temp = nums[pos[i]];
            nums[pos[i]] = nums[i];
            nums[i] = temp;

            const posTemp = pos[pos[i]];
            pos[pos[i]] = pos[i];
            pos[i] = posTemp;
        }
    }
}

// demo
const nums = [1, 2, 3, 4, 5];   // input array
const pos = [3, 2, 4, 1, 0];    // position array

shuffle(nums, pos);

console.log(nums);
```

**Output:** 5 4 2 1 3
