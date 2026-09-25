# Merge `M` sorted lists each containing `N` elements

> Source: https://www.techiedelight.com/merge-m-sorted-lists-containing-n-elements/

Given `m` sorted lists, each containing `n` elements, print them efficiently in sorted order.

For example,

**Input:** 5 sorted lists of fixed size 4 [10, 20, 30, 40] [15, 25, 35, 45] [27, 29, 37, 48] [32, 33, 39, 50] [16, 18, 22, 28] **Output:** [10, 15, 16, 18, 20, 22, 25, 27, 28, 29, 30, 32, 33, 35, 37, 39, 40, 45, 48, 50]

A simple solution would be to create an auxiliary array containing all lists’ elements (order doesn’t matter). Then use an efficient sorting algorithm to [sort the array](https://techiedelight.com/sort-array-ascending-order-cpp/) in ascending order and print the elements. The worst-case time complexity of this approach will be O(m.n.log(m.n)). Also, this approach does not take advantage of the fact that each list is already sorted.

We can easily solve this problem in O(m.n.log(m)) time by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `m` and insert the first element of each list in it. Then, pop the root element (minimum element) from the heap and insert the next element from the “same” list as the popped element. Repeat this process till the heap is exhausted. Depending upon the requirement, either print the popped element or store it in an auxiliary array.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a heap node
class Node {
    // `value` stores the element
    // `listNum` stores the list number of the element
    // `index` stores column number of the list from which element was taken
    constructor(public value: number, public listNum: number, public index: number) {}
}

// Function to merge `M` sorted lists each of size `N` and
// print them in ascending order
function printSorted(lists: number[][]): void {

    // min-heap assumed (JS has no builtin heap); heap ops are done as plain
    // array ops on `pq`, always extracting the node with the smallest value
    const pq: Node[] = [];

    // push the first element of each list into the min-heap
    // along with the list number and their index in the list
    for (let i = 0; i < lists.length; i++) {
        pq.push(new Node(lists[i][0], i, 0));
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
        const min = pq.splice(minIdx, 1)[0];

        // print the minimum element
        process.stdout.write(`${min.value} `);

        // take the next element from the "same" list and
        // insert it into the min-heap
        if (min.index + 1 < lists[min.listNum].length) {
            min.index = min.index + 1;
            min.value = lists[min.listNum][min.index];
            pq.push(min);
        }
    }
}

// `M` lists of size `N`, each in the form of a 2D-matrix
const lists = [
    [10, 20, 30, 40],
    [15, 25, 35, 45],
    [27, 29, 37, 48],
    [32, 33, 39, 50],
    [16, 18, 22, 28]
];

printSorted(lists);
console.log();
```

**Output:** 10 15 16 18 20 22 25 27 28 29 30 32 33 35 37 39 40 45 48 50

The time complexity of the proposed solution is O(M × N × log(M)) as the heap has the size `M`, and we pop and push exactly `M×N` times. Note that each pop/push operation takes O(log(M)) time.

Also See:

> [Merge `M` sorted lists of variable length](https://www.techiedelight.com/merge-m-sorted-lists-variable-length/ "Merge `M` sorted lists of variable length")

> [Find the smallest range with at least one element from each of the given lists](https://www.techiedelight.com/find-smallest-range-least-one-element-given-lists/ "Find the smallest range with at least one element from each of the given lists")

> [Efficiently merge `k` sorted linked lists](https://www.techiedelight.com/efficiently-merge-k-sorted-linked-lists/ "Efficiently merge `k` sorted linked lists")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 182

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
