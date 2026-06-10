# Binary Search Algorithm – Iterative and Recursive Implementation

> Source: https://www.techiedelight.com/binary-search/

Given a sorted array of `n` integers and a target value, determine if the target exists in the array in logarithmic time using the binary search algorithm. If target exists in the array, print the index of it.

For example,

**Input:** nums[] = [2, 3, 5, 7, 9] target = 7 **Output:** Element found at index 3 **Input:** nums[] = [1, 4, 5, 8, 9] target = 2 **Output:** Element not found

> 

A simple solution would be to perform a [linear search](https://en.wikipedia.org/wiki/Linear_search) on the given array. It sequentially checks each array element for the target value until a match is found or all the elements have been searched. The worst-case time complexity of this approach is O(n) as it makes at most `n` comparisons, where `n` is the size of the input. This approach doesn’t take advantage of the fact that the input is sorted.

## How to perform better?

The idea is to use [binary search](https://techiedelight.com/binary-search/) which is a [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) algorithm. Like all divide-and-conquer algorithms, binary search first divides a large array into two smaller subarrays and then recursively (or iteratively) operate the subarrays. But instead of working on both subarrays, it discards one subarray and continues on the second subarray. This decision of discarding one subarray is made in just one comparison.

So binary search reduces the search space to half at each step. By search space, we mean a subarray of the given array where the target value is located (if present in the array). Initially, the search space is the entire array, and binary search redefines the search space at every step of the algorithm by using the property of the array that it is sorted. It does so by comparing the mid-value in the search space to the target value. If the target value matches the middle element, its position in the array is returned; otherwise, it discards half of the search space based on the comparison result.

Let’s track the search space by using two indexes – `start` and `end`. Initially, `start = 0` and `end = n-1` (as initially, the whole array is our search space). At each step, find the mid-value in the search space and compares it with the target. There are three possible cases:

  1. If `target = nums[mid]`, return `mid`.
  2. If `target < nums[mid]`, discard all elements in the right search space, including the middle element, i.e., ~~nums[mid…high]~~. Now our new high would be `mid-1`.
  3. If `target > nums[mid]`, discard all elements in the left search space, including the middle element, i.e., ~~nums[low…mid]~~. Now our new low would be `mid+1`.

Repeat the process until the target is found, or our search space is exhausted. Let’s understand this by taking an example. Let

nums = [2, 3, 5, 7, 8, 10, 12, 15, 18, 20] target = 7

## 1\. Iterative Implementation

The algorithm can be implemented iteratively as follows in TypeScript:

```ts
// Function to determine if a `target` exists in the sorted list `nums`
// or not using a binary search algorithm
function binarySearch(nums: number[], target: number): number {

    // search space is nums[left…right]
    const [left, right] = [0, nums.length - 1];

    let low = left, high = right;

    // loop till the search space is exhausted
    while (low <= high) {

        // find the mid-value in the search space and
        // compares it with the target

        const mid = Math.floor((low + high) / 2);

        // overflow can happen. Use:
        // mid = low + (high - low) / 2
        // mid = high - (high - low) / 2

        // target is found
        if (target === nums[mid]) {
            return mid;
        }

        // discard all elements in the right search space,
        // including the middle element
        else if (target < nums[mid]) {
            high = mid - 1;
        }

        // discard all elements in the left search space,
        // including the middle element
        else {
            low = mid + 1;
        }
    }

    // `target` doesn't exist in the list
    return -1;
}

const nums = [2, 5, 6, 8, 9, 10];
const target = 5;

const index = binarySearch(nums, target);

if (index !== -1) {
    console.log(`Element found at index ${index}`);
} else {
    console.log('Element found not in the list');
}
```

**Output:** Element found at index 1


## 2\. Recursive Implementation

We can easily convert the above iterative version of the binary search algorithm into a recursive one. The algorithm can be implemented recursively as follows in TypeScript:

```ts
// Recursive implementation of the binary search algorithm to return
// the position of `target` in subarray nums[left…right]
function binarySearch(nums: number[], left: number, right: number, target: number): number {

    // Base condition (search space is exhausted)
    if (left > right) {
        return -1;
    }

    // find the mid-value in the search space and
    // compares it with the target

    const mid = Math.floor((left + right) / 2);

    // overflow can happen. Use below
    // mid = left + (right - low) / 2

    // Base condition (a target is found)
    if (target === nums[mid]) {
        return mid;
    }

    // discard all elements in the right search space,
    // including the middle element
    else if (target < nums[mid]) {
        return binarySearch(nums, left, mid - 1, target);
    }

    // discard all elements in the left search space,
    // including the middle element
    else {
        return binarySearch(nums, mid + 1, right, target);
    }
}

const nums = [2, 5, 6, 8, 9, 10];
const target = 5;

const [left, right] = [0, nums.length - 1];
const index = binarySearch(nums, left, right, target);

if (index !== -1) {
    console.log(`Element found at index ${index}`);
} else {
    console.log('Element found not in the list');
}
```

**Output:** Element found at index 1

## Performance of Binary Search

We know that at each step of the algorithm, our search space reduces to half. That means if initially, our search space contains n elements, then after one iteration it contains `n/2`, then `n/4` and so on…

n —> n/2 —> n/4 —> … —> 1

Suppose our search space is exhausted after `k` steps. Then,

n/2k = 1 n = 2k k = log2n

Therefore, the time complexity of the binary search algorithm is O(log2n), which is very efficient. The auxiliary space required by the program is O(1) for iterative implementation and O(log2n) for recursive implementation due to call stack.

## Avoid Integer Overflow

The signed int in C/C++ takes up 4 bytes of storage, i.e., It allows storage for integers between `-2147483648` and `2147483647`. Note that some compilers might take up 2 bytes storage as well. The exact value can be found by `sizeof(int)`.

So, if `(low + high) > 2147483647`, integer overflow will happen.

int mid = (low + high)/2; // overflow can happen

To avoid integer overflow, we can use any of the following expressions:

int mid = low + (high – low)/2; OR int mid = high – (high – low)/2;

Now, `low + (high - low) / 2` or `high - (high - low) / 2` always computes a valid index halfway between `high` and `low`, and overflow will never happen even for extreme values.

**Suggested Read:**

> [Binary Search in C++ STL and Java Collections](https://techiedelight.com/binary-search-stl-java-collections/)

> [Ternary Search vs Binary search](https://techiedelight.com/ternary-search-vs-binary-search/)
