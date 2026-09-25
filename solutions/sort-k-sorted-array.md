# Sort a k-sorted array

> Source: https://www.techiedelight.com/sort-k-sorted-array/

Given a k–sorted array that is almost sorted such that each of the `n` elements may be misplaced by no more than `k` positions from the correct sorted order. Find a space-and-time efficient algorithm to sort the array.

For example,

**Input:** arr = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9] k = 2 **Output:**[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

> 

A simple solution would be to use an [efficient sorting algorithm](https://techiedelight.com/quicksort/) to sort the whole array again. The worst-case time complexity of this approach will be O(n.log(n)), where `n` is the size of the input. This method also does not use the fact that the array is k–sorted. We can also use the [insertion sort algorithm](https://techiedelight.com/insertion-sort-iterative-recursive/) to correct the order in just O(n.k) time. Insertion sort performs really well for small values of `k`, but it’s not recommended for a large value of `k` (we can use it for `k < 12`).

We can solve this problem in O(n.log(k)) using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `k+1` and insert the first `k+1` elements into the heap. Then remove minimum from the heap and insert the next element from the array into the heap and continue the process till both array and heap are exhausted. Each pop operation from the heap should insert the corresponding top element in its correct position into the array.

The algorithm can be implemented as follows in TypeScript:

```ts
// min-heap assumed (JS has no builtin heap)
class MinHeap {
    data: number[] = [];

    // build a min-heap from the given elements
    constructor(elements: number[]) {
        this.data = elements;
        for (let i = (this.data.length >> 1) - 1; i >= 0; i--) {
            this.siftDown(i);
        }
    }

    private siftDown(i: number): void {
        for (;;) {
            const left = 2 * i + 1, right = left + 1;
            let smallest = i;
            if (left < this.data.length && this.data[left] < this.data[smallest]) smallest = left;
            if (right < this.data.length && this.data[right] < this.data[smallest]) smallest = right;
            if (smallest === i) break;
            [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
            i = smallest;
        }
    }

    push(value: number): void {
        this.data.push(value);
        let i = this.data.length - 1;
        while (i > 0) {
            const parent = (i - 1) >> 1;
            if (this.data[parent] <= this.data[i]) break;
            [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
            i = parent;
        }
    }

    pop(): number | undefined {
        if (this.data.length === 0) {
            return undefined;
        }
        const top = this.data[0];
        const last = this.data.pop()!;
        if (this.data.length > 0) {
            this.data[0] = last;
            this.siftDown(0);
        }
        return top;
    }

    get size(): number {
        return this.data.length;
    }
}

// Function to sort a k–sorted array
function sortKSortedArray(nums: number[], k: number): void {

    // build a min-heap from the first `k+1` elements in the array
    const pq = new MinHeap(nums.slice(0, k + 1));

    // do for remaining elements in the array
    let index = 0;
    for (let i = k + 1; i < nums.length; i++) {

        // pop the top element from the min-heap and assign them to the
        // next available array index
        nums[index++] = pq.pop()!;

        // push the next array element into min-heap
        pq.push(nums[i]);
    }

    // pop all remaining elements from the min-heap and assign them to the
    // next available array index
    while (pq.size > 0) {
        nums[index++] = pq.pop()!;
    }
}

const nums = [1, 4, 5, 2, 3, 7, 8, 6, 10, 9];
const k = 2;

sortKSortedArray(nums, k);

// print the sorted array
console.log(nums);
```

The time complexity of the above solution is O(n.log(k)) since each insertion operation takes O(log(k)) time, and there are `n` elements in the input. The additional space used by the program is O(k).

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.82/5. Vote count: 204

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
