# Efficiently merge `k` sorted linked lists

> Source: https://www.techiedelight.com/efficiently-merge-k-sorted-linked-lists/

Given `k` sorted linked lists, merge them into a single list in increasing order.

In the previous post, we have discussed how to [merge two sorted linked lists](https://techiedelight.com/merge-given-sorted-linked-lists/) into one list. This post will merge `k` sorted linked lists into a single list efficiently.

For example,

**Input:** k = 3 List 1: 1 —> 5 —> 7 —> NULL List 2: 2 —> 3 —> 6 —> 9 —> NULL List 3: 4 —> 8 —> 10 —> NULL **Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> NULL

> 

## 1\. Naive Approach

A simple solution would be to connect all linked lists into one list (order doesn’t matter). Then use the [merge sort algorithm for the linked list](https://techiedelight.com/merge-sort-singly-linked-list/) to [sort the list](https://techiedelight.com/sort-vector-cpp/) in ascending order. The worst-case time complexity of this approach will be O(n.log(n)), where `n` is the total number of nodes present in all lists. Also, this approach does not take advantage of the fact that each list is already sorted.

## 2\. Using Min Heap

We can easily solve this problem in O(n.log(k)) time by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `k` and insert each list’s first node into it. Then pop the root node (having minimum value) from the heap and insert the next node from the “same” list as the popped node. We repeat this process until the heap is exhausted.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Utility function to print contents of a linked list
function printList(node: ListNode | null): void {
    let curr = node;
    while (curr) {
        process.stdout.write(`${curr.data} —> `);
        curr = curr.next;
    }
    console.log('null');
}

// tiny min-heap (JS has no builtin heap)
const pq: ListNode[] = [];
const push = (node: ListNode): void => {
    pq.push(node);
    let i = pq.length - 1;
    while (i > 0) {
        const p = (i - 1) >> 1;
        if (pq[p].data <= pq[i].data) {
            break;
        }
        [pq[p], pq[i]] = [pq[i], pq[p]];
        i = p;
    }
};
const pop = (): ListNode => {
    const top = pq[0];
    if (top === undefined) {
        throw new Error('Heap is empty');
    }
    const last = pq.pop();
    if (last === undefined) {
        return top;
    }
    if (pq.length) {
        pq[0] = last;
        let i = 0;
        while (true) {
            const l = 2 * i + 1;
            const r = l + 1;
            let m = i;
            if (l < pq.length && pq[l].data < pq[m].data) {
                m = l;
            }
            if (r < pq.length && pq[r].data < pq[m].data) {
                m = r;
            }
            if (m === i) {
                break;
            }
            [pq[m], pq[i]] = [pq[i], pq[m]];
            i = m;
        }
    }
    return top;
};

// The main function to merge given `k` sorted linked lists.
// It takes array `lists` of size `k` and generates the sorted output
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {

    // create a min-heap using the first node of each list
    for (const x of lists) {
        if (x) {
            push(x);
        }
    }

    // take two pointers, head and tail, where the head points to the first node
    // of the output list and tail points to its last node
    let head: ListNode | null = null;
    let last: ListNode | null = null;

    // run till min-heap is empty
    while (pq.length) {

        // extract the minimum node from the min-heap
        const min = pop();

        // add the minimum node to the output list
        if (head === null || last === null) {
            head = min;
            last = min;
        }
        else {
            last.next = min;
            last = min;
        }

        // take the next node from the "same" list and insert it into the min-heap
        if (min.next) {
            push(min.next);
        }
    }

    // return head node of the merged list
    return head;
}

// total number of linked lists
const k = 3;

// a list to store the head nodes of the linked lists
const lists: (ListNode | null)[] = new Array(k).fill(null);

const list0 = new ListNode(1);
const list0Next = new ListNode(5);
const list0NextNext = new ListNode(7);
list0.next = list0Next;
list0Next.next = list0NextNext;
lists[0] = list0;

const list1 = new ListNode(2);
const list1Next = new ListNode(3);
const list1NextNext = new ListNode(6);
const list1NextNextNext = new ListNode(9);
list1.next = list1Next;
list1Next.next = list1NextNext;
list1NextNext.next = list1NextNextNext;
lists[1] = list1;

const list2 = new ListNode(4);
const list2Next = new ListNode(8);
const list2NextNext = new ListNode(10);
list2.next = list2Next;
list2Next.next = list2NextNext;
lists[2] = list2;

// Merge all lists into one
const head = mergeKLists(lists);
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null

The heap has size `k` at any point, and we pop and push exactly `n` times, where `n` is the total number of nodes. Since each pop/push operation takes O(log(k)) time, the overall time complexity of this solution is O(n.log(k)).

## 3\. Using Divide and Conquer

The above approach reduces the time complexity to O(n.log(k)) but takes O(k) extra space for the heap. We can solve this problem in constant space using [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/).

We already know that [two linked lists can be merged](https://techiedelight.com/merge-given-sorted-linked-lists/) in O(n) time and O(1) space (For arrays, O(n) space is required). The idea is to pair up `k` lists and merge each pair in linear time using the O(1) space. After the first cycle, `K/2` lists are left each of size `2×N`. After the second cycle, `K/4` lists are left each of size `4×N` and so on. Repeat the procedure until we have only one list left.

This is demonstrated below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Utility function to print contents of a linked list
function printList(node: ListNode | null): void {
    let curr = node;
    while (curr) {
        process.stdout.write(`${curr.data} —> `);
        curr = curr.next;
    }
    console.log('null');
}

// Takes two lists sorted in increasing order and merges their nodes
// to make one big sorted list returned
function sortedMerge(a: ListNode | null, b: ListNode | null): ListNode | null {

    // base cases
    if (a === null) {
        return b;
    }
    else if (b === null) {
        return a;
    }

    // pick either `a` or `b`, and recur
    if (a.data <= b.data) {
        const result = a;
        result.next = sortedMerge(a.next, b);
        return result;
    }
    else {
        const result = b;
        result.next = sortedMerge(a, b.next);
        return result;
    }
}

// The main function to merge given `k` sorted linked lists.
// It takes a list of lists `lists[0…k)` and generates the sorted output
function mergeKLists(lists: (ListNode | null)[]): ListNode | null {

    // base case
    if (!lists.length) {
        return null;
    }

    let last = lists.length - 1;

    // repeat until only one list is left
    while (last) {
        let i = 0;
        let j = last;

        // `(i, j)` forms a pair
        while (i < j) {
            // merge list `j` with `i`
            lists[i] = sortedMerge(lists[i], lists[j]);

            // consider the next pair
            i = i + 1;
            j = j - 1;

            // if all pairs are merged, update last
            if (i >= j) {
                last = j;
            }
        }
    }

    return lists[0];
}

// total number of linked lists
const k = 3;

// a list to store the head nodes of the linked lists
const lists: (ListNode | null)[] = new Array(k).fill(null);

const list0 = new ListNode(1);
const list0Next = new ListNode(5);
const list0NextNext = new ListNode(7);
list0.next = list0Next;
list0Next.next = list0NextNext;
lists[0] = list0;

const list1 = new ListNode(2);
const list1Next = new ListNode(3);
const list1NextNext = new ListNode(6);
const list1NextNextNext = new ListNode(9);
list1.next = list1Next;
list1Next.next = list1NextNext;
list1NextNext.next = list1NextNextNext;
lists[1] = list1;

const list2 = new ListNode(4);
const list2Next = new ListNode(8);
const list2NextNext = new ListNode(10);
list2.next = list2Next;
list2Next.next = list2NextNext;
lists[2] = list2;

// Merge all lists into one
const head = mergeKLists(lists);
printList(head);
```

The time complexity of the above solution is O(n.log(k)) as the outer while loop in function `mergeKLists()` runs O(log(k)) times, and every time we are processing `n` nodes.

**Author:** Aditya Goel
