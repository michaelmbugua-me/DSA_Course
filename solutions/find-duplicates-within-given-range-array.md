# Find duplicates within a range `k` in an array

> Source: https://www.techiedelight.com/find-duplicates-within-given-range-array/

[Array](https://www.techiedelight.com/Category/Array/)

Given an array and a positive number `k`, check whether the array contains any duplicate elements within the range `k`. If `k` is more than the array’s size, the solution should check for duplicates in the complete array.

For example,

**Input:** nums[] = { 5, 6, 8, 2, 4, 6, 9 } k = 4 **Output:** Duplicates found (element 6 repeats at distance 4 which is <= k) **Input:** nums[] = { 5, 6, 8, 2, 4, 6, 9 } k = 2 **Output:** No duplicates were found (element 6 repeats at distance 4 which is > k) **Input:** nums[] = { 1, 2, 3, 2, 1 } k = 7 **Output:** Duplicates found (element 1 and 2 repeats at distance 4 and 2, respectively which are both <= k)

> 

A naive solution would be to consider every subarray of size `k` and check for duplicates in it. The time complexity of this solution is O(n.k2) since there can be `n` subarrays of size `k`, and each subarray might take O(k2) time for checking duplicates.

The problem can be efficiently solved using [hashing](https://techiedelight.com/hashing-in-data-structure/) in O(n) time and O(n) extra space. The idea is to traverse the array and store each element and its index in a map, i.e., `(element, index)` as `(key, value)` pairs in a map. If any element is already found present on the map, check if that element repeats within the range of `k` using its previous occurrence information from the map.

The algorithm can be implemented as follows in TypeScript:

```ts
function hasDuplicate(nums: number[], k: number): boolean {

    // stores (element, index) pairs as (key, value) pairs
    const d = new Map<number, number>();

    // traverse the array
    for (const [i, e] of nums.entries()) {

        // if the current element already exists in the map

        // return true if the current element repeats within range of `k`
        if (d.has(e) && i - (d.get(e) as number) <= k) {
            return true;
        }

        // store elements along with their indices
        d.set(e, i);
    }

    // we reach here when no element repeats within range `k`
    return false;
}

const nums = [5, 6, 8, 2, 4, 6, 9];
const k = 4;

if (hasDuplicate(nums, k)) {
    console.log('Duplicates found');
}
else {
    console.log('No duplicates were found');
}
```

**Output:** Duplicates found

We can also use a [sliding window](https://techiedelight.com/sliding-window-problems/) to solve the above problem. The idea is to process every window of size `k` and store its elements in a set. If any element repeats in the window, we can say that it repeats within the range of k.

Initially, our window will contain the first `k` elements of the input. Then for each item of the remaining input, add it to the current window. While adding the `i'th` item of the input to the current window, remove the `(i-k)'th` element from it. This ensures the efficiency of the solution and keeps the window balance at any point.

Following is a TypeScript implementation based on the above idea:

```ts
function hasDuplicate(nums: number[], k: number): boolean {

    // create an empty set to store elements within range `k`
    const window = new Set<number>();

    // traverse the array
    for (let i = 0; i < nums.length; i++) {

        // if the current element already exists in the window,
        // then it repeats within range of `k`
        if (window.has(nums[i])) {
            return true;
        }

        // add the current element to the window
        window.add(nums[i]);

        // remove the element at k'th range from the current element
        if (i >= k) {
            window.delete(nums[i - k]);
        }
    }

    // we reach here when no element repeats within range `k`
    return false;
}

const nums = [5, 6, 8, 2, 4, 6, 9];
const k = 4;

if (hasDuplicate(nums, k)) {
    console.log('Duplicates found');
}
else {
    console.log('No duplicates were found');
}
```

**Output:** Duplicates found

The time complexity of the above solution is O(n) and requires O(k) extra space.
