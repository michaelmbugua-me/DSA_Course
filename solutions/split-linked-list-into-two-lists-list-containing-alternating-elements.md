# Split a linked list into two lists where each list contains alternating elements from it

> Source: https://www.techiedelight.com/split-linked-list-into-two-lists-list-containing-alternating-elements/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list of integers, split it into two lists containing alternating elements from the original list.

For example, if the original list is `{1, 2, 3, 4, 5}`, then one sublist should be `{1, 3, 5}` and the other should be `{2, 4}`. The elements in the output lists may be in any order. i.e., the sublists can be `{5, 3, 1}` and `{4, 2}` for input list `{1, 2, 3, 4, 5}`.

> 

## 1\. Using `moveNode()` function

The simplest approach iterates over the source list and use [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) to pull nodes off the source and alternately put them on `a` and `b`. The only strange part is that the nodes will be in the reverse order in the source list.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
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
    Given the source list, split its nodes into two shorter lists.
    If we number the elements 0, 1, 2, then all the even elements
    should go in the first list and all the odd elements in the second.
    The elements in the lists may be in any order.
*/

function alternatingSplit(source: Node | null): [Node | null, Node | null] {

    // Split the nodes into `a` and `b` lists
    let a: Node | null = null;
    let b: Node | null = null;
    let current = source;

    while (current !== null) {

        // Move a node to `a`

        const newNode = current;        // the front source node
        current = current.next;         // advance the source

        newNode.next = a;               // link the old dest off the new node
        a = newNode;                    // move dest to point to the new node

        if (current !== null) {
            // Move a node to `b`

            const newNode = current;    // the front source node
            current = current.next;     // advance the source

            newNode.next = b;           // link the old dest off the new node
            b = newNode;                // move dest to point to the new node
        }
    }

    return [a, b];
}

// construct the first linked list
let head: Node | null = null;
for (let i = 6; i >= 0; i--) {
    head = new Node(i + 1, head);
}

const [first, second] = alternatingSplit(head);

// print both lists
printList('First List: ', first);
printList('Second List: ', second);
```

**Output:** First List: 7 —> 5 —> 3 —> 1 —> null Second List: 6 —> 4 —> 2 —> null

## 2\. Using Dummy Nodes

Here is an alternative approach that builds the sublists in the same order as the source list. The code uses temporary dummy header nodes for the `a` and `b` lists as they are being built. Each sublist has a “tail” pointer that points to its current last node – that way, new nodes can be appended at the end of each list easily. The dummy nodes give the tail pointers something to point to initially. The dummy nodes are efficient in this case because they are temporary and allocated in the stack.

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
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
    Given the source list, split its nodes into two shorter lists.
    If we number the elements 0, 1, 2, then all the even elements
    should go in the first list and all the odd elements in the second.
    The elements in the new lists may be in any order.
*/

function alternatingSplit(source: Node | null): [Node | null, Node | null] {

    const aDummy = new Node(0);
    let aTail = aDummy;                 // points to the last node in `a`

    const bDummy = new Node(0);
    let bTail = bDummy;                 // points to the last node in `b`

    let current = source;

    while (current !== null) {

        // add at `a` tail

        const newNode = current;
        current = current.next;

        newNode.next = aTail.next;
        aTail.next = newNode;

        aTail = aTail.next;             // advance the `a` tail

        if (current !== null) {

            // add at `b` tail

            const newNode = current;
            current = current.next;

            newNode.next = bTail.next;
            bTail.next = newNode;

            bTail = bTail.next;         // advance the `b` tail
        }
    }

    return [aDummy.next, bDummy.next];
}

// construct the first linked list
let head: Node | null = null;
for (let i = 6; i >= 0; i--) {
    head = new Node(i + 1, head);
}

const [first, second] = alternatingSplit(head);

// print both lists
printList('First List: ', first);
printList('Second List: ', second);
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> null Second List: 2 —> 4 —> 6 —> null

## 3\. Using Recursion

We can easily solve this problem by [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) as well. The recursive implementation can be seen below in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
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

// Recursive function to split a given linked list into two lists where
// each list containing alternating elements from the original list.
// The solution maintains the same order as the source list
function alternatingSplit(odd: Node | null, even: Node | null): void {

    if (odd === null || even === null) {
        return;
    }

    if (odd.next) {
        odd.next = odd.next.next;
    }

    if (even.next) {
        even.next = even.next.next;
    }

    alternatingSplit(odd.next, even.next);
}

/*
    Given the source list, split its nodes into two shorter lists.
    If we number the elements 0, 1, 2, then all the even elements
    should go in the first list and all the odd elements in the second.
    The elements in the new lists may be in any order.
*/

function split(source: Node): [Node, Node] {
    const a = source;
    const b = source.next;
    alternatingSplit(a, b);
    return [a, b!];
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7];

// construct the first linked list
let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

const [a, b] = split(head!);

// print both lists
printList('First List: ', a);
printList('Second List: ', b);
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> null Second List: 2 —> 4 —> 6 —> null
