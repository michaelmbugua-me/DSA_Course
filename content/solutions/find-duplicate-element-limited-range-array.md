# Find the duplicate element in a limited range array

> Source: https://www.techiedelight.com/find-duplicate-element-limited-range-array/

Given a limited range array of size `n` containing elements between 1 and `n-1` with one element repeating, find the duplicate number in it without using any extra space.

For example,

**Input:** { 1, 2, 3, 4, 4 } **Output:** The duplicate element is 4 **Input:** { 1, 2, 3, 4, 2 } **Output:** The duplicate element is 2

> 

## Approach 1: Using Hashing

The idea is to use [hashing](https://techiedelight.com/hashing-in-data-structure/) to solve this problem. We can use a visited boolean array to mark if an element is seen before or not. If the element is already encountered before, the visited array will return true.

Following is a TypeScript implementation based on the above idea:

```ts
// Function to find a duplicate element in a limited range array
function findDuplicate(nums: number[]): number {

    // create a visited array of size `n+1`
    // we can also use a map instead of a visited array
    const visited: boolean[] = new Array(nums.length + 1).fill(false);

    // for each element in the array, mark it as visited and
    // return it if seen before
    for (const i of nums) {

        // if the element is seen before
        if (visited[i]) {
            return i;
        }

        // mark element as visited
        visited[i] = true;
    }

    // no duplicate found
    return -1;
}

// input array contains `n` numbers between 1 and `n-1`
// with one duplicate, where `n = nums.length`
const nums = [1, 2, 3, 4, 4];

console.log(`The duplicate element is ${findDuplicate(nums)}`);
```

**Output:** The duplicate element is 4

The time complexity of the above solution is O(n) and requires O(n) extra space, where `n` is the size of the input.

## Approach 2: Using Array Indices

We can solve this problem in constant space. Since the array contains all distinct elements except one and all elements lie in range 1 to `n-1`, we can check for a duplicate element by marking array elements as negative using the array index as a key. For each array element `nums[i]`, invert the sign of the element present at index `nums[i]`. Finally, traverse the array once again, and if a positive number is found at index `i`, then the duplicate element is `i`.

The above approach takes two traversals of the array. We can achieve the same in only a single traversal. For each array element `nums[i]`, invert the sign of the element present at index `nums[i]` if it is positive; otherwise, if the element is already negative, then it is a duplicate.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find a duplicate element in a limited range array
function findDuplicate(nums: number[]): number {

    let duplicate = -1;

    // do for each element in the array
    for (let i = 0; i < nums.length; i++) {

        // get the value of the current element
        const val = nums[i] < 0 ? -nums[i] : nums[i];

        // make element at index `val` negative if it is positive
        if (nums[val] >= 0) {
            nums[val] = -nums[val];
        }
        else {
            // if the element is already negative, it is repeated
            duplicate = val;
            break;
        }
    }

    // restore the original array before returning
    for (let i = 0; i < nums.length; i++) {
        // make negative elements positive
        if (nums[i] < 0) {
            nums[i] = -nums[i];
        }
    }

    // return duplicate element
    return duplicate;
}

// input array contains `n` numbers between 1 and `n-1`
// with one duplicate, where `n = nums.length`
const nums = [1, 2, 3, 4, 2];

console.log(`The duplicate element is ${findDuplicate(nums)}`);
```

**Output:** The duplicate element is 2

The time complexity of the above solution is O(n).

## Approach 3: Using XOR

We can also solve this problem by taking xor of all array elements with numbers 1 to `n-1`. Since the same elements will cancel each other as `a^a = 0, 0^0 = 0` and `a^0 = a`, we will be left with the duplicate element. This approach is demonstrated below in TypeScript:

```ts
// Function to find a duplicate element in a limited range array
function findDuplicate(nums: number[]): number {
    let xor = 0;

    // take xor of all array elements
    for (let i = 0; i < nums.length; i++) {
        xor ^= nums[i];
    }

    // take xor of numbers from 1 to `n-1`
    for (let i = 1; i <= nums.length - 1; i++) {
        xor ^= i;
    }

    // same elements will cancel each other as a ^ a = 0,
    // 0 ^ 0 = 0 and a ^ 0 = a

    // `xor` will contain the missing number
    return xor;
}

// input array contains `n` numbers between 1 and `n-1` with one duplicate
const nums = [1, 2, 3, 4, 2];

console.log(`The duplicate element is ${findDuplicate(nums)}`);
```

**Output:** The duplicate element is 4
