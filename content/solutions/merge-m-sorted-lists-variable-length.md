# Merge `M` sorted lists of variable length

> Source: https://www.techiedelight.com/merge-m-sorted-lists-variable-length/

Given `M` sorted lists of variable length, merge them efficiently in sorted order.

For example,

**Input:** 4 sorted lists of variable length [10, 20, 30, 40] [15, 25, 35] [27, 29, 37, 48, 93] [32, 33] **Output:** [10, 15, 20, 25, 27, 29, 30, 32, 33, 35, 37, 40, 48, 93]

> 

A simple solution would be to create an auxiliary array containing all lists’ elements (order doesn’t matter). Then use an efficient sorting algorithm to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order and print the elements. The worst-case time complexity of this approach will be O(N.log(N)), where `N` is the total number of elements present in all lists. Also, this approach does not take advantage of the fact that each list is already sorted.

We can easily solve this problem in O(N.log(M)) time by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `M` and insert the first element of each list into it. Then pop the root element (minimum element) from the heap and insert the next element from the “same” list as the popped element. Repeat this process till the heap is exhausted. Depending upon the requirement, either print the popped element or store it in an auxiliary array.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a heap node
class Node {
    // `value` stores the element
    // `listNum` stores the list number of the element
    // `index` stores the column number of the list from which element was taken
    value: number;
    listNum: number;
    index: number;
    constructor(value: number, listNum: number, index: number) {
        this.value = value;
        this.listNum = listNum;
        this.index = index;
    }
}

// Function to merge `M` sorted lists of variable length and
// print them in ascending order
function printSorted(lists: number[][]): void {

    // min-heap assumed (JS has no builtin heap); heap ops are done as plain
    // array ops on `pq`, always extracting the node with the smallest value
    const pq: Node[] = [];
    const result: number[] = [];

    // push the first element of each list into the min-heap
    // along with the list number and their index in the list
    for (let i = 0; i < lists.length; i++)
    {
        const first = lists[i][0];
        if (first !== undefined) {
            pq.push(new Node(first, i, 0));
        }
    }

    // run till min-heap is empty
    while (pq.length > 0) {

        // extract the minimum node from the min-heap
        let minIdx = 0;
        for (let i = 1; i < pq.length; i++) {
            if (pq[i].value < pq[minIdx].value) {
                minIdx = i;
            }
        }
        const min = pq[minIdx];
        if (min === undefined) {
            break;
        }
        pq.splice(minIdx, 1);

        // print the minimum element
        result.push(min.value);

        // take the next element from the 'same' list and insert it into the min-heap
        const list = lists[min.listNum];
        const nextIndex = min.index + 1;
        const nextValue = list === undefined ? undefined : list[nextIndex];
        if (nextValue !== undefined) {
            min.index = nextIndex;
            min.value = nextValue;
            pq.push(min);
        }
    }

    console.log(result.join(' '));
}

// `M` lists of variable size
const lists = [
    [10, 20, 30, 40],
    [15, 25, 35],
    [27, 29, 37, 48, 93],
    [32, 33]
];

printSorted(lists);
```

**Output:** 10 15 20 25 27 29 30 32 33 35 37 40 48 93

The time complexity of the above solution is O(N.log(M)) as the heap has size `M`, and we pop and push exactly `N` times, where `N` is the total number of elements. Note that each pop/push operation takes O(log(M)) time.

Also See:

> [Merge `M` sorted lists each containing `N` elements](https://www.techiedelight.com/merge-m-sorted-lists-containing-n-elements/ "Merge `M` sorted lists each containing `N` elements")

> [Efficiently merge `k` sorted linked lists](https://www.techiedelight.com/efficiently-merge-k-sorted-linked-lists/ "Efficiently merge `k` sorted linked lists")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 174

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
