# Sort a doubly-linked list using merge sort

> Source: https://www.techiedelight.com/sort-doubly-linked-list-merge-sort/

Given a doubly linked list, sort it using the merge sort algorithm.

> 

[Merge sort](https://techiedelight.com/merge-sort/) is an efficient sorting algorithm that uses the [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) technique to sort a sequence of items. It is stable in nature, which means that the original order of equal elements is preserved in the output.

In the [previous post](https://techiedelight.com/merge-sort-singly-linked-list/), we have discussed the merge sort algorithm on a singly linked list. The merge sort algorithm on the doubly linked list works similarly by splitting the list into two halves, sorting each sublist recursively, and finally merge both the sorted lists together to get a single sorted list.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Doubly Linked List Node
class Node {
    data: number;
    next: Node | null = null;
    prev: Node | null = null;
    constructor(data: number, next: Node | null = null, prev: Node | null = null) {}
}

// Utility function to push a node at the beginning of the doubly linked list
function push(head: Node | null, key: number): Node {

    const node = new Node(key, head);

    // change `prev` of the existing head node to point to the new node
    if (head !== null) {
        head.prev = node;
    }

    // return new head node
    return node;
}

// Helper function to print nodes of a doubly linked list
function printDDL(head: Node | null): void {

    while (head !== null) {
        process.stdout.write(`${head.data} ⇔ `);
        head = head.next;
    }
    console.log('null');
}

// Function to split nodes of the given doubly linked list into
// two halves using the fast/slow pointer strategy
function split(head: Node): Node {

    let slow: Node = head;
    let fast: Node | null = head.next;

    // advance `fast` by two nodes, and advance `slow` by a single node
    while (fast !== null) {
        fast = fast.next;
        if (fast !== null) {
            slow = slow.next!;
            fast = fast.next;
        }
    }

    return slow;
}

// Recursive function to merge nodes of two sorted lists
// into a single sorted list
function merge(a: Node | null, b: Node | null): Node | null {

    // base cases
    if (a === null) {
        return b;
    }

    if (b === null) {
        return a;
    }

    // pick either `a` or `b`, and recur
    if (a.data <= b.data) {
        a.next = merge(a.next, b);
        a.next!.prev = a;
        a.prev = null;
        return a;
    }
    else {
        b.next = merge(a, b.next);
        b.next!.prev = b;
        b.prev = null;
        return b;
    }
}

// Function to sort a doubly-linked list using merge sort algorithm
function mergesort(head: Node | null): Node | null {

    // base case: 0 or 1 node
    if (head === null || head.next === null) {
        return head;
    }

    // split head into `a` and `b` sublists
    let a: Node | null = head;

    const slow = split(head);
    let b = slow.next;
    slow.next = null;

    // recursively sort the sublists
    a = mergesort(a);
    b = mergesort(b);

    // merge the two sorted lists
    return merge(a, b);
}

const keys = [6, 4, 8, 7, 9, 2, 1];

let head: Node | null = null;
for (const key of keys) {
    head = push(head, key);
}

head = mergesort(head);
printDDL(head);
```

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Merge sort algorithm for a singly linked list – C, Java, and Python](https://www.techiedelight.com/merge-sort-singly-linked-list/ "Merge sort algorithm for a singly linked list – C, Java, and Python")

> [Rearrange linked list in a specific manner in linear time](https://www.techiedelight.com/rearrange-linked-list-specific-manner-linear-time/ "Rearrange linked list in a specific manner in linear time")

> [Merge two BSTs into a doubly-linked list in sorted order](https://www.techiedelight.com/merge-two-bsts-into-doubly-linked-list-sorted-order/ "Merge two BSTs into a doubly-linked list in sorted order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.62/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
