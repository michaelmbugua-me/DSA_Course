# Find the smallest range with at least one element from each of the given lists

> Source: https://www.techiedelight.com/find-smallest-range-least-one-element-given-lists/

Given `M` sorted lists of variable length, efficiently compute the smallest range, including at least one element from each list.

For example,

**Input:** 4 sorted lists of variable length [ 3, **6** , 8, 10, 15 ] [ 1, **5** , 12 ] [ **4** , 8, 15, 16 ] [ 2, **6** ] **Output:** The minimum range is 4–6 **Input:** 4 sorted lists of variable length [ 2, 3, **4** , 8, 10, 15 ] [ 1, **5** , 12 ] [ **7** , 8, 15, 16 ] [ 3, **6** ] **Output:** The minimum range is 4–7

> 

We can solve this problem in O(N.log(M)) time using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap) where `N` is the total number of elements present in `M` lists. The idea is to construct a min-heap of size `M` and insert the first element of each list into it. Then pop the root element (minimum element) from the heap and insert the next element from the “same” list as the popped element. Repeat this process until any list is exhausted. To find the minimum range, maintain a variable `high` that stores the maximum element present in a heap at any point. Since the minimum element is present in the min-heap at its root, compute the range (high element – root element) and return the minimum range found at every pop operation.

The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a heap node
class Node {
    // `value` stores the element
    constructor(public value: number,

    // `list_num` stores the list number of the element
                public list_num: number,

    // `index` stores the column number of the list from which element was taken
                public index: number) {}
}

// Function to compute the minimum range that includes at least one element
// from each of the given `M` lists
function findMinimumRange(lists: number[][]): [number, number] {

    // invalid input
    if (!lists || lists.length === 0) {
        return [-1, -1];
    }

    // `high` will be the maximum element in a heap
    let high = Number.MIN_SAFE_INTEGER;

    // stores minimum and maximum elements found so far in a heap
    let p: [number, number] = [0, Number.MAX_SAFE_INTEGER];

    // create an empty min-heap
    // min-heap assumed (JS has no builtin heap); keeps the smallest node at index 0
    const pq: Node[] = [];

    // push the first element of each list into the min-heap
    // along with the list number and their index in the list
    for (let i = 0; i < lists.length; i++) {
        if (!lists[i]) {        // invalid input
            return [-1, -1];
        }
        push(pq, new Node(lists[i][0], i, 0));
        high = Math.max(high, lists[i][0]);
    }

    // run till the end of any list is reached
    while (true) {

        // remove the root node
        const top = pop(pq);

        // retrieve root node information from the min-heap
        const low = top.value;
        const i = top.list_num;
        const j = top.index;

        // update `low` and `high` if a new minimum is found
        if (high - low < p[1] - p[0]) {
            p = [low, high];
        }

        // return on reaching the end of any list
        if (j === lists[i].length - 1) {
            return p;
        }

        // take the next element from the "same" list and
        // insert it into the min-heap
        push(pq, new Node(lists[i][j + 1], i, j + 1));

        // update high if the new element is greater
        high = Math.max(high, lists[i][j + 1]);
    }
}

// insert a node into the min-heap and restore heap order
function push(pq: Node[], node: Node): void {
    pq.push(node);
    pq.sort((a, b) => a.value - b.value);
}

// remove and return the root node of the min-heap
function pop(pq: Node[]): Node {
    return pq.shift();
}

const lists = [[3, 6, 8, 10, 15], [1, 5, 12], [4, 8, 15, 16], [2, 6]];
console.log('The minimum range is', findMinimumRange(lists));
```

**Output:** The minimum range is (4, 6)

The time complexity of the above solution is O(N.log(M)) as the heap has size `M`, and we pop and push at most `N` times, where `N` is the total number of elements present in all lists. Note that each pop/push operation takes O(log(M)) time.

Also See:

> [Merge `M` sorted lists of variable length](https://www.techiedelight.com/merge-m-sorted-lists-variable-length/ "Merge `M` sorted lists of variable length")

> [Merge `M` sorted lists each containing `N` elements](https://www.techiedelight.com/merge-m-sorted-lists-containing-n-elements/ "Merge `M` sorted lists each containing `N` elements")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 189

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [Priority Queue](https://www.techiedelight.com/Tags/Priority-Queue/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
