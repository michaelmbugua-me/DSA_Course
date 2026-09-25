# Quickselect Algorithm

> Source: https://www.techiedelight.com/quickselect-algorithm/

[Array](https://www.techiedelight.com/Category/Array/)

Quickselect is a selection algorithm to find the `k'th` smallest element in an unordered list. It is closely related to the [Quicksort sorting algorithm](https://techiedelight.com/quicksort/). Like Quicksort, it is efficient traditionally and offers good average-case performance, but has a poor worst-case performance.

For example,

**Input:** [7, 4, 6, 3, 9, 1] k = 2 **Output:** k’th smallest array element is 3 **Input:** [7, 4, 6, 3, 9, 1] k = 1 **Output:** k’th smallest array element is 1

> 

Quickselect uses the same overall approach as Quicksort, choosing one element as a pivot and partitioning the data in two based on the pivot, accordingly as less than or greater than the pivot. However, instead of recursing into both sides as in Quicksort, quickselect only recurs into one side with its searching element. Since the pivot is in its final sorted position, all those preceding it in unsorted order, and all those following it in an unsorted order. This reduces the average-case complexity from O(n.log(n)) to O(n) with a worst-case of O(n2), where `n` is the size of the input.

The algorithm can be implemented as follows in TypeScript:

```ts
function swap(nums: number[], i: number, j: number): void {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

// Partition using Lomuto partition scheme
function partition(nums: number[], left: number, right: number, pIndex: number): number {

    // Pick `pIndex` as a pivot from the list
    const pivot = nums[pIndex];

    // Move pivot to end
    swap(nums, pIndex, right);

    // elements less than the pivot will be pushed to the left of `pIndex`;
    // elements more than the pivot will be pushed to the right of `pIndex`;
    // equal elements can go either way
    pIndex = left;

    // each time we find an element less than or equal to the pivot, `pIndex`
    // is incremented, and that element would be placed before the pivot.
    for (let i = left; i < right; i++) {
        if (nums[i] <= pivot) {
            swap(nums, i, pIndex);
            pIndex = pIndex + 1;
        }
    }

    // Move pivot to its place
    swap(nums, pIndex, right);

    // return `pIndex` (index of the pivot element)
    return pIndex;
}

// Returns the k'th smallest element in a list within `left…right`
// (i.e., left <= k <= right). The search space within the list is
// changing for each round – but the list is still the same size.
// Thus, `k` does not need to be updated with each round.
function quickSelect(nums: number[], left: number, right: number, k: number): number {

    // If the list contains only one element, return that element
    if (left === right) {
        return nums[left];
    }

    // select `pIndex` between left and right
    let pIndex = left + Math.floor(Math.random() * (right - left + 1));

    pIndex = partition(nums, left, right, pIndex);

    // The pivot is in its sorted position
    if (k === pIndex) {
        return nums[k];
    }

    // if `k` is less than the pivot index
    else if (k < pIndex) {
        return quickSelect(nums, left, pIndex - 1, k);
    }

    // if `k` is more than the pivot index
    else {
        return quickSelect(nums, pIndex + 1, right, k);
    }
}

const nums = [7, 4, 6, 3, 9, 1];
const k = 2;

console.log(`k'th smallest element is ${quickSelect(nums, 0, nums.length - 1, k - 1)}`);
```

**Output:** k’th smallest element is 3

It is worth noticing the resemblance to the Quicksort algorithm. This simple procedure has expected linear performance and, like Quicksort, has excellent performance traditionally, and beyond selecting the `k'th` element, it also partially sorts the data. It is also an [in-place algorithm](https://techiedelight.com/in-place-vs-out-of-place-algorithms/), requiring only constant memory overhead if tail-call optimization is available, or we can eliminate the tail recursion with a loop.

```ts
// Returns the k'th smallest element in the list within `left…right` (inclusive)
function quickselect(nums: number[], left: number, right: number, k: number): number {
    while (true) {
        // If the array contains only one element, return that element
        if (left === right) {
            return nums[left];
        }

        // select `pIndex` between left and right
        let pIndex = left + Math.floor(Math.random() * (right - left + 1));

        pIndex = partition(nums, left, right, pIndex);

        // The pivot is in its final sorted position
        if (k === pIndex) {
            return nums[k];
        }

        // if `k` is less than the pivot index
        else if (k < pIndex) {
            right = pIndex - 1;
        }

        // if `k` is more than the pivot index
        else {
            left = pIndex + 1;
        }
    }
}
```

Time complexity:

Like Quicksort, the quickselect has good average performance but is sensitive to the chosen pivot. With good pivots, meaning ones that consistently decrease the search set by a given fraction, the search set decreases exponentially. By induction (or summing the geometric series), one sees that performance is linear, as each step is linear. The overall time is constant (depending on how quickly the search set reduces). However, if bad pivots are consistently chosen, such as decreasing by only a single element each time, then worst-case performance is quadratic: O(n2). For example, this occurs in searching for the maximum element of a set, using the first element as the pivot, and having sorted data.

Using the built-in `sort` method:

Quickselect and its variants are the selection algorithms most often used in efficient real-world implementations. JavaScript provides the built-in [sort method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) which sorts the elements of an array in place and returns the sorted array. Its default implementation is typically a hybrid of quicksort and insertion sort called [TimSort](https://en.wikipedia.org/wiki/Timsort) (via V8). If quicksort takes too long (bad pivot selection), it falls back to the slower but guaranteed O(n.log(n)) algorithm, thus capping its worst-case runtime.

```ts
const a = [7, 4, 6, 3, 9, 1];
const k = 2;

a.sort((x, y) => x - y);
console.log(`k'th smallest element is ${a[k]}`);
```

**Output:** k’th smallest element is 3

**References:** <https://en.wikipedia.org/wiki/Quickselect>
