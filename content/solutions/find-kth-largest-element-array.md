# Find k’th largest element in an array

> Source: https://www.techiedelight.com/find-kth-largest-element-array/

Given an integer array, find k’th largest element in the array where k is a positive integer less than or equal to the length of array.

For example,

**Input:** arr = [7, 4, 6, 3, 9, 1] k = 2 **Output:** The 2nd largest array element is 7

> 

A simple solution would be to use an [efficient sorting algorithm](https://techiedelight.com/quicksort/) to sort the array in descending order and return the element at `(k-1)'th` index. The worst-case time complexity of this approach will be O(n.log(n)), where `n` is the size of the input. We can improve the time complexity using the following methods:

## Using Min Heap

We can easily solve this problem in O(n.log(k)) by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `k` and insert the first `k` elements of array `A[0…k-1]` into the min-heap. Then for each of the remaining array elements `A[k…n-1]`, if that element is more than the min-heap’s root, replace the root with the current element. Repeat this process until the array is exhausted. Now we will be left with top `k` largest array elements in the min-heap, and `k'th` largest element will reside at the root of the min-heap.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the k'th largest element in an array using min-heap
function findKthLargest(ints: number[], k: number): number {

    // base case
    if (!ints || ints.length < k) {
        process.exit(-1);
    }

    // build a min-heap from the first `k` elements in the list
    // min-heap assumed (JS has no builtin heap)
    const pq = ints.slice(0, k);

    const siftDown = (pos: number): void => {
        while (2 * pos + 1 < pq.length) {
            let child = 2 * pos + 1;
            if (child + 1 < pq.length && pq[child + 1] < pq[child]) {
                child++;
            }
            if (pq[pos] <= pq[child]) {
                break;
            }
            [pq[pos], pq[child]] = [pq[child], pq[pos]];
            pos = child;
        }
    };

    const heapify = (): void => {
        for (let i = Math.floor(pq.length / 2) - 1; i >= 0; i--) {
            siftDown(i);
        }
    };

    const heapreplace = (item: number): void => {
        pq[0] = item;
        siftDown(0);
    };

    heapify();

    // do for remaining list elements
    for (let i = k; i < ints.length; i++) {
        // if the current element is more than the root of the heap
        if (ints[i] > pq[0]) {
            // replace root with the current element
            heapreplace(ints[i]);
        }
    }

    // return the root of min-heap
    return pq[0];
}

const ints = [7, 4, 6, 3, 9, 1];
const k = 2;

console.log(`k'th largest element in the list is ${findKthLargest(ints, k)}`);
```

**Output:** k’th largest array element is 7

## Using Max Heap

We can easily solve this problem in O(n + k.log(n)) by using a [max-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to simply construct a max-heap of size `n` and insert all the array elements `[0…n-1]` into it. Then pop first `k-1` elements from it. Now `k'th` largest element will reside at the root of the max-heap.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the k'th largest element in an array using max-heap
function findKthLargest(ints: number[], k: number): number {

    // base case
    if (!ints || ints.length < k) {
        process.exit(-1);
    }

    // build a max-heap from all elements in the list
    // max-heap assumed (JS has no builtin heap)
    const pq = [...ints];

    const siftDown = (pos: number): void => {
        while (2 * pos + 1 < pq.length) {
            let child = 2 * pos + 1;
            if (child + 1 < pq.length && pq[child + 1] > pq[child]) {
                child++;
            }
            if (pq[pos] >= pq[child]) {
                break;
            }
            [pq[pos], pq[child]] = [pq[child], pq[pos]];
            pos = child;
        }
    };

    const heapify = (): void => {
        for (let i = Math.floor(pq.length / 2) - 1; i >= 0; i--) {
            siftDown(i);
        }
    };

    heapify();

    const pop = (): number => {
        const top = pq[0];
        pq[0] = pq[pq.length - 1];
        pq.pop();
        siftDown(0);
        return top;
    };

    // pop from max-heap exactly `k-1` times
    while (k > 1) {
        pop();
        k = k - 1;
    }

    // return the root of max-heap
    return pq[0];
}

const ints = [7, 4, 6, 3, 9, 1];
const k = 2;

console.log(`k'th largest element in the list is ${findKthLargest(ints, k)}`);
```

**Output:** k’th largest array element is 7

## Using Quickselect-based selection

We can easily solve this problem by selecting the element that would occupy the `k'th` position in a sorted sequence. This is the idea behind [quickselect](https://techiedelight.com/quickselect-algorithm/), which is typically implemented using a version called [Introselect](https://en.wikipedia.org/wiki/Introselect). Introselect is a hybrid of quickselect and [median of medians](https://en.wikipedia.org/wiki/Median_of_medians). If quickselect takes too long (bad pivot selection), then it falls back to the slower but guaranteed linear time algorithm, thus capping its worst-case runtime before it becomes worse than linear.

```ts
// Function to find the k'th largest element in an array
function findKthLargest(ints: number[], k: number): number {
    // base case
    if (ints.length < k) {
        process.exit(-1);
    }

    // sort in descending order so that the element at the `k-1'th`
    // index is the k'th largest element
    ints.sort((a, b) => b - a);
    return ints[k - 1];
}

const ints = [7, 4, 6, 3, 9, 1];
const k = 2;

console.log(`k'th largest array element is ${findKthLargest(ints, k)}`);
```

**Output:** k’th largest array element is 7
