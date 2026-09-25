# Merge two sorted linked lists into one

> Source: https://www.techiedelight.com/merge-given-sorted-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write a function that takes two lists, each of which is sorted in increasing order, and merges the two into a single list in increasing order, and returns it.

For example, consider lists `a = {1, 3, 5, 7}` and `b = {2, 4, 6}`. Merging them should yield the list `{1, 2, 3, 4, 5, 6, 7}`.

> 

The problem can be solved either iteratively or recursively. There are many cases to deal with – either `a` or `b` may be empty during processing, either `a` or `b` can run out first, and finally, there’s the problem of starting the result list empty, and building it up while going through `a` and `b`.

## 1\. Using Dummy Nodes

The strategy here uses a temporary dummy node as the start of the result list. The pointer tail always points to the last node in the result list, so appending new nodes is easy. The dummy node gives the tail something to point to initially when the result list is empty. This dummy node is efficient since it is only temporary, and it is allocated in the stack. The loop proceeds, removing one node from either `a` or `b` and adding it at the tail. When we are done, the result is in `dummy.next`.

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'null');
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
function sortedMerge(a: ListNode | null, b: ListNode | null): ListNode | null {

    // a dummy first node to hang the result on
    const dummy = new ListNode(0);

    // points to the last result node — so `tail.next` is the place
    // to add new nodes to the result.
    let tail = dummy;

    while (true) {

        // if either list runs out, use the other list
        if (a === null) {
            tail.next = b;
            break;
        }
        else if (b === null) {
            tail.next = a;
            break;
        }

        if (a.data <= b.data) {
            if (a) {
                const newNode = a;              // the front source node
                a = a.next;                     // advance the source

                newNode.next = tail.next;       // link the old dest off the new node
                tail.next = newNode;            // move dest to point to the new node
            }
        }
        else if (b) {
            const newNode = b;                  // the front source node
            b = b.next;                         // advance the source

            newNode.next = tail.next;           // link the old dest off the new node
            tail.next = newNode;                // move dest to point to the new node
        }

        tail = tail.next!;
    }

    return dummy.next;
}

let a: ListNode | null = null, b: ListNode | null = null;
for (let i = 7; i >= 1; i -= 2) {
    a = new ListNode(i, a);
}

for (let i = 6; i >= 2; i -= 2) {
    b = new ListNode(i, b);
}

// print both lists
printList('First List: ', a);
printList('Second List: ', b);

const head = sortedMerge(a, b);
printList('After Merge: ', head);
```

This solution is structurally very similar to the above, but it avoids using a dummy node. Instead, it maintains a `struct node**` pointer, `lastPtrRef`, which always points to the last pointer of the result list. This solves the same case that the dummy node did – dealing with the result list when it is empty. When trying to build up a list at its tail, use either the dummy node or the `struct node**` “reference” strategy.

This approach is demonstrated below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'null');
}

// Helper function to insert a new node at the beginning of the linked list
function push(headRef: { node: ListNode | null }, data: number): void {
    headRef.node = new ListNode(data, headRef.node);
}

// `NodePtrRef` emulates a C++ `Node**` using getter/setter closures
type NodePtrRef = {
    get: () => ListNode | null;
    set: (node: ListNode | null) => void;
};

// Function takes the node from the front of the source and moves it
// to the front of the destination
function moveNode(destRef: NodePtrRef, sourceRef: NodePtrRef): void {
    // if the source list is empty, do nothing
    if (sourceRef.get() === null) {
        return;
    }

    const newNode = sourceRef.get()!;       // the front source node
    sourceRef.set(newNode.next);            // advance the source pointer
    newNode.next = destRef.get();           // link the old dest off the new node
    destRef.set(newNode);                   // move dest to point to the new node
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
function sortedMerge(a: { node: ListNode | null }, b: { node: ListNode | null }): ListNode | null {
    let result: ListNode | null = null;
    let lastPtrRef: NodePtrRef = {
        get: () => result,
        set: (node) => { result = node; }
    };

    while (true)
    {
        if (a.node === null)
        {
            lastPtrRef.set(b.node);
            break;
        }
        else if (b.node === null)
        {
            lastPtrRef.set(a.node);
            break;
        }

        if (a.node.data <= b.node.data) {
            moveNode(lastPtrRef, a);
        }
        else {
            moveNode(lastPtrRef, b);
        }

        // tricky: advance to point to the next `.next` field
        const appended = lastPtrRef.get()!;
        lastPtrRef = { get: () => appended.next, set: (node) => { appended.next = node; } };
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

const head = sortedMerge(a, b);
printList('After Merge: ', head);
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL After Merge: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL

## 3\. Using Recursion

This is a nice problem where the recursive solution code is much cleaner than the iterative code. The recursive implementation can be seen below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    let str = msg;
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'null');
}

// Helper function to insert a new node at the beginning of the linked list
function push(headRef: { node: ListNode | null }, data: number): void {
    headRef.node = new ListNode(data, headRef.node);
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
function sortedMerge(a: ListNode | null, b: ListNode | null): ListNode | null {
    // base cases
    if (a === null) {
        return b;
    }

    else if (b === null) {
        return a;
    }

    let result: ListNode | null;

    // pick either `a` or `b`, and recur
    if (a.data <= b.data)
    {
        result = a;
        result.next = sortedMerge(a.next, b);
    }
    else {
        result = b;
        result.next = sortedMerge(a, b.next);
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

const head = sortedMerge(a.node, b.node);
printList('After Merge: ', head);
```


**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL After Merge: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL
