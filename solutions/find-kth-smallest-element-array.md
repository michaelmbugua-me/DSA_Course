# Find k’th smallest element in an array

> Source: https://www.techiedelight.com/find-kth-smallest-element-array/

Given an integer array, find `k'th` smallest element in the array where `k` is a positive integer less than or equal to the length of array.

For example,

**Input:** arr = [7, 4, 6, 3, 9, 1] k = 3 **Output:** k’th smallest array element is 4

> 

A simple solution would be to use an [efficient sorting algorithm](https://techiedelight.com/quicksort/) to sort the array in ascending order and return the element at `(k-1)'th` index. The worst-case time complexity of this approach will be O(n.log(n)), where `n` is the size of the input. We can improve the time complexity using the following methods:

## Using Max Heap

We can easily solve this problem in O(n.log(k)) time by using a [max-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap), where `n` is the size of the input. The idea is to simply construct a max-heap of size `k` and insert the first `k` elements of array `[0…k-1]` into the max-heap. Then for each of the remaining array elements `[k…n-1]`, if that element is less than the heap’s root, replace the root with the current element. Repeat this process till the array is exhausted. Now, we will be left with `k` smallest array elements in the max-heap, and `k'th` smallest element will reside at the root of the max-heap.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the k'th smallest element in a list using max-heap
function findKthSmallest(input: number[], k: number): number {

    // base case
    if (!input || input.length < k) {
        process.exit(-1);
    }

    // build a max-heap from the first `k` elements in the list
    // max-heap assumed (JS has no builtin heap)
    const pq = input.slice(0, k);

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

    const replace = (item: number): void => {
        pq[0] = item;
        siftDown(0);
    };

    heapify();

    // do for remaining list elements
    for (let i = k; i < input.length; i++) {
        // if the current element is less than the root of the heap
        if (input[i] < pq[0]) {
            // replace root with the current element
            replace(input[i]);
        }
    }

    // return the root of max-heap
    return pq[0];
}

const input = [7, 4, 6, 3, 9, 1];
const k = 3;

console.log(`k'th smallest element in the list is ${findKthSmallest(input, k)}`);
```

**Output:** k’th smallest array element is 4

## Using Min Heap

We can easily solve this problem in O(n + k.log(n)) by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `n` and insert all the array elements `input[0…n-1]` into it. Then pop first `k-1` elements from it. Now `k'th` smallest element will reside at the root of the min-heap.

The algorithm can be implemented as follows in TypeScript:

```ts
// Function to find the k'th smallest element in a list using min-heap
function findKthSmallest(input: number[], k: number): number {

    // base case
    if (!input || input.length < k) {
        process.exit(-1);
    }

    // transform the input list into a min-heap
    // min-heap assumed (JS has no builtin heap)
    const pq = [...input];

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

    const heappop = (): number => {
        const top = pq[0];
        pq[0] = pq[pq.length - 1];
        pq.pop();
        siftDown(0);
        return top;
    };

    heapify();

    // pop from min-heap exactly `k-1` times
    while (k > 1) {
        heappop();
        k = k - 1;
    }

    // return the root of min-heap
    return pq[0];
}

const input = [7, 4, 6, 3, 9, 1];
const k = 3;

console.log(`k'th smallest element in the list is ${findKthSmallest(input, k)}`);
```

**Output:** k’th smallest array element is 4

## Using Quickselect-based selection

We can easily solve this problem by selecting the element that would occupy the `n'th` position in a sorted sequence. This is the idea behind [quickselect](https://techiedelight.com/quickselect-algorithm/). We can imagine quickselect as a Quicksort version where the recursive call is only executed on the side, which contains the element. Introselect ensures the worst-case linear running time if quickselect takes too long (bad pivot selection). It basically switches to an algorithm with worst-case O(n) time, which is slower in most cases but saves the day when quickselect has trouble.

```ts
// Function to find the k'th smallest element in an array
function findKthSmallest(input: number[], k: number): number {
    // base case
    if (input.length < k) {
        process.exit(-1);
    }

    // sort in ascending order so that the element at the `k-1'th`
    // index is the k'th smallest element
    input.sort((a, b) => a - b);
    return input[k - 1];
}

const input = [7, 4, 6, 3, 9, 1];
const k = 3;

console.log(`k'th smallest array element is ${findKthSmallest(input, k)}`);
```

**Output:** k’th smallest array element is 7
