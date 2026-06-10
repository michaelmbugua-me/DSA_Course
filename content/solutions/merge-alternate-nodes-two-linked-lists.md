# Construct a linked list by merging alternate nodes of two given lists

> Source: https://www.techiedelight.com/merge-alternate-nodes-two-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two linked lists, [merge](https://techiedelight.com/merge-given-sorted-linked-lists/) their nodes to make one list, taking nodes alternately between the two lists. If either list runs out, all the nodes should be taken from the other list.

For example, merging lists `{1, 2, 3}` and `{7, 13, 1}` should yield `{1, 7, 2, 13, 3, 1}`.

> 

The solution depends on being able to move nodes to the end of the list. Several techniques are available to solve this problem: dummy node, local reference, or [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/).

## 1\. Using Dummy Node

The strategy here uses a temporary dummy node as the start of the result list. The pointer `tail` always points to the last node in the result list, so appending new nodes is easy. The dummy node gives `tail` something to point to initially when the result list is empty. This dummy node is efficient since it is only temporary, and it is allocated in the stack. The loop proceeds, removing one node from either `a` or `b` and adding it to `tail`. When we are done, the result is in `dummy.next`.

Following is a TypeScript implementation of the idea:

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

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'NULL');
}

// Function to construct a linked list by merging alternate nodes of
// two given linked lists using a dummy node
function shuffleMerge(a: ListNode | null, b: ListNode | null): ListNode | null {

    const dummy = new ListNode(0);
    let tail = dummy;

    while (true) {
        // empty list cases
        if (a === null) {
            tail.next = b;
            break;
        }

        else if (b === null) {
            tail.next = a;
            break;
        }

        // common case: move two nodes to the tail
        else {
            tail.next = a;
            tail = a;
            a = a.next;

            tail.next = b;
            tail = b;
            b = b.next;
        }
    }

    return dummy.next;
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7];

let a: ListNode | null = null, b: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i = i - 2) {
    a = new ListNode(keys[i], a);
}

for (let i = keys.length - 2; i >= 0; i = i - 2) {
    b = new ListNode(keys[i], b);
}

// print both lists
printList('First List: ', a);
printList('Second List: ', b);

const head = shuffleMerge(a, b);
printList('After Merge: ', head);
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL After Merge: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL

## 2\. Using Dummy Node with `moveNode()` function

This method is logically the same as above, but it uses the [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) function as a helper. This approach is demonstrated below in TypeScript:

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

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'NULL');
}

// Helper function to insert a new node at the beginning of the linked list
function push(headRef: { node: ListNode | null }, data: number): void {
    headRef.node = new ListNode(data, headRef.node);
}

// Function takes the node from the front of the source and moves it
// to the front of the destination
function moveNode(sourceRef: { node: ListNode | null }): ListNode | null {
    // if the source list is empty, do nothing
    if (sourceRef.node === null) {
        return null;
    }

    const newNode = sourceRef.node;     // the front source node
    sourceRef.node = newNode.next;      // advance the source pointer
    newNode.next = null;                // link the old dest off the new node
    return newNode;                     // return the moved node
}

// Function to construct a linked list by merging alternate nodes of two
// given linked lists using dummy node and `moveNode()` as a helper
function shuffleMerge(a: { node: ListNode | null }, b: { node: ListNode | null }): ListNode | null {

    const dummy = new ListNode(0);
    let tail = dummy;

    while (true)
    {
        if (a.node === null)
        {
            tail.next = b.node;
            break;
        }
        else if (b.node === null)
        {
            tail.next = a.node;
            break;
        }
        else {
            tail.next = moveNode(a);
            tail = tail.next!;

            tail.next = moveNode(b);
            tail = tail.next!;
        }
    }

    return dummy.next;
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7];

const a = { node: null as ListNode | null };
const b = { node: null as ListNode | null };
for (let i = keys.length - 1; i >= 0; i = i - 2) {
    push(a, keys[i]);
}

for (let i = keys.length - 2; i >= 0; i = i - 2) {
    push(b, keys[i]);
}

// print both lists
printList('First List: ', a.node);

printList('Second List: ', b.node);

const head = shuffleMerge(a, b);
printList('After Merge: ', head);
```

## 3\. Using Local References

This solution is structurally very similar to the above, but avoids using a dummy node. Instead, the `lastPtrRef` wrapper’s getter and setter target either the result head or a node’s `next` field, so the tail can be updated while the result is empty or nonempty.

Following is a TypeScript implementation based on the above idea:

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

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'NULL');
}

// Helper function to insert a new node at the beginning of the linked list
function push(headRef: { node: ListNode | null }, data: number): void {
    headRef.node = new ListNode(data, headRef.node);
}

type NodePtrRef = {
    get: () => ListNode | null;
    set: (node: ListNode | null) => void;
};

function toNodePtrRef(ref: { node: ListNode | null }): NodePtrRef {
    return {
        get: () => ref.node,
        set: (node) => { ref.node = node; }
    };
}

// Function takes the node from the front of the source and moves it
// to the front of the destination
function moveNode(destRef: NodePtrRef, sourceRef: NodePtrRef): void {
    // if the source list is empty, do nothing
    if (sourceRef.get() === null) {
        return;
    }

    const newNode = sourceRef.get()!;   // the front source node
    sourceRef.set(newNode.next);        // advance the source pointer
    newNode.next = destRef.get();       // link the old dest off the new node
    destRef.set(newNode);               // move dest to point to the new node
}

// Function to construct a linked list by merging alternate nodes of two
// given linked lists using Local References and `moveNode()` as a helper
function shuffleMerge(a: { node: ListNode | null }, b: { node: ListNode | null }): ListNode | null {
    const aRef = toNodePtrRef(a);
    const bRef = toNodePtrRef(b);
    let result: ListNode | null = null;
    let lastPtrRef: NodePtrRef = {
        get: () => result,
        set: (node) => { result = node; }
    };

    while (true)
    {
        if (aRef.get() === null)
        {
            lastPtrRef.set(bRef.get());
            break;
        }
        else if (bRef.get() === null)
        {
            lastPtrRef.set(aRef.get());
            break;
        }
        else {
            moveNode(lastPtrRef, aRef);
            const appended = lastPtrRef.get()!;
            lastPtrRef = { get: () => appended.next, set: (node) => { appended.next = node; } };

            moveNode(lastPtrRef, bRef);
            const appendedB = lastPtrRef.get()!;
            lastPtrRef = { get: () => appendedB.next, set: (node) => { appendedB.next = node; } };
        }
    }

    return result;
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7];

const a = { node: null as ListNode | null };
const b = { node: null as ListNode | null };
for (let i = keys.length - 1; i >= 0; i = i - 2) {
    push(a, keys[i]);
}

for (let i = keys.length - 2; i >= 0; i = i - 2) {
    push(b, keys[i]);
}

// print both lists
printList('First List: ', a.node);

printList('Second List: ', b.node);

const head = shuffleMerge(a, b);
printList('After Merge: ', head);
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL After Merge: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL
