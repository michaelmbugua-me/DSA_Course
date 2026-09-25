# Split nodes of a linked list into the front and back halves

> Source: https://www.techiedelight.com/split-nodes-given-linked-list-front-back-halves/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, split it into two sublists – one for the front half and one for the back half. If the total number of elements in the list is odd, the extra element should go in the front list.

For example, list `{2, 3, 5, 7, 11}` should yield the two lists `{2, 3, 5}` and `{7, 11}`.

> 

## 1\. Naive Solution

Probably the simplest strategy is to compute the length of the list, then use a for loop to hop over the right number of nodes to find the last node of the front half, and then cut the list at that point.

Following is a TypeScript program that demonstrates it:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null = null;
    constructor(data: number, next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: Node | null): void {

    process.stdout.write(msg);
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Return the total number of nodes in a list
function findLength(head: Node | null): number {

    let count = 0;
    let ptr = head;
    while (ptr !== null) {
        count = count + 1;
        ptr = ptr.next;
    }
    return count;
}

/*
    Split the given list's nodes into front and back halves,
    and return the two lists using an array.
    If the length is odd, the extra node should go in the front list.
*/
function frontBackSplit(source: Node | null): [Node | null, Node | null] {

    const length = findLength(source);
    if (length < 2) {
        const frontRef = source;
        const backRef = null;
        return [frontRef, backRef];
    }

    let current = source!;

    const hopCount = (length - 1) / 2 | 0;  // figured these with a few drawings
    for (let i = 0; i < hopCount; i++) {
        current = current.next!;
    }

    // Now cut at current
    const frontRef = source;
    const backRef = current.next;
    current.next = null;

    return [frontRef, backRef];
}

// input keys
const keys = [6, 3, 4, 8, 2, 9];

// points to the head node of the linked list
let head: Node | null = null;

// construct a linked list
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

const [first, second] = frontBackSplit(head);

// print linked list
printList('Front List: ', first);
printList('Back List: ', second);
```

**Output:** Front List: 6 —> 3 —> 4 —> null Back List: 8 —> 2 —> 9 —> null

## 2\. Fast/Slow Pointer Strategy

There is a tricky technique that uses two pointers to traverse the list. A “slow” pointer advances one node simultaneously, while the “fast” pointer goes two nodes at a time. When the fast pointer reaches the end, the slow pointer will be about halfway. For either strategy, care is required to split the list at the right point.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null = null;
    constructor(data: number, next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: Node | null): void {

    process.stdout.write(msg);
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

/*
    Split the given list's nodes into front and back halves,
    and return the two lists using an array.
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow reference strategy.
*/
function frontBackSplit(source: Node | null): [Node | null, Node | null] {

    // if the length is less than 2, handle it separately
    if (source === null || source.next === null) {
        const frontRef = source;
        const backRef = null;
        return [frontRef, backRef];
    }

    let slow: Node = source;
    let fast: Node | null = source.next;

    // advance `fast` two nodes and `slow` by one node
    while (fast !== null) {
        fast = fast.next;
        if (fast !== null) {
            slow = slow.next!;
            fast = fast.next;
        }
    }

    // `slow` is before the midpoint of the list, so split it in two
    // at that point.
    const frontRef = source;
    const backRef = slow.next;
    slow.next = null;

    return [frontRef, backRef];
}

// input keys
const keys = [6, 3, 4, 8, 2, 9];

// points to the head node of the linked list
let head: Node | null = null;

// construct a linked list
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

const [first, second] = frontBackSplit(head);

// print linked list
printList('Front List: ', first);
printList('Back List: ', second);
```

**Output:** Front List: 6 —> 3 —> 4 —> null Back List: 8 —> 2 —> 9 —> null

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>
