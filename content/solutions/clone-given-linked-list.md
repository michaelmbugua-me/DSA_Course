# Clone a Linked List

> Source: https://www.techiedelight.com/clone-given-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write a function that takes a singly linked list and returns a complete copy of that list.

> 

## 1\. Naive Approach

The idea is to iterate over the original list in the usual way and maintain two pointers to keep track of the new list: one head pointer and one tail pointer, which always points to the last node of the new list. The first node is done as a special case, and then the tail pointer is used in the standard way for the others.

This approach is demonstrated below in TypeScript:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null;

    constructor(data: number, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.next;
    }

    console.log(out + 'None');
}

// Function takes a linked list and returns its complete copy
function copyList(head: Node | null): Node | null {
    let current = head;      // used to iterate over the original list
    let newList: Node | null = null;    // head of the new list
    let tail: Node | null = null;       // point to the last node in a new list

    while (current !== null) {
        // special case for the first new node
        if (newList === null) {
            newList = new Node(current.data, null);
            tail = newList;
        }
        else {
            if (tail === null) {
                return newList;
            }
            tail.next = new Node(current.data, null);
            tail = tail.next;
        }
        current = current.next;
    }

    return newList;
}

// construct a linked list
const keys = [1, 2, 3, 4];
let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

// copy linked list
const copy = copyList(head);

// print duplicate linked list
printList(copy);
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL



## 2\. Using `push()` function

The above implementation is a little unsatisfying because the 3–step link-in is repeated – once for the first node and once for all the other nodes. The following TypeScript implementation uses [push()](https://techiedelight.com/linked-list-implementation-part-1/) to allocate and insert the new nodes and avoid repeating that code.

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null;

    constructor(data: number, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.next;
    }

    console.log(out + 'NULL');
}

// Helper function to insert a new node at the beginning of the linked list
function push(headRef: { next: Node | null }, data: number): void {
    // allocate a new node and set its data
    const newNode = new Node(data);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode.next = headRef.next;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    headRef.next = newNode;
}

// Function takes a linked list and returns a complete copy of that
// list using a dummy node using the `push()` function
function copyList(head: Node | null): Node | null {
    let current = head;    // used to iterate over the original list
    const headRef: { next: Node | null } = { next: null };    // head of the new list
    let tail: Node | null = null;       // point to the last node in a new list

    while (current !== null) {
        // special case for the first new node
        if (tail === null) {
            push(headRef, current.data);
            tail = headRef.next;
        }
        else {
            push(tail, current.data);        // add each node at the tail
            tail = tail.next;        // advance the tail to the new last node
        }
        current = current.next;
    }

    return headRef.next;
}

// construct a linked list
const keys = [1, 2, 3, 4];
let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

// copy linked list
const dup = copyList(head);

// print duplicate linked list
printList(dup);
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL



## 3\. Using Dummy Node

Another strategy is to use a temporary dummy node to take care of the first node case. The dummy node is temporarily the first node in the list, and the tail pointer starts off pointing to it. All nodes are added off the tail pointer.

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null;

    constructor(data: number, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.next;
    }

    console.log(out + 'NULL');
}

// Helper function to insert a new node at the beginning of the linked list
function push(headRef: { next: Node | null }, data: number): void {
    // allocate a new node and set its data
    const newNode = new Node(data);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode.next = headRef.next;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    headRef.next = newNode;
}

// Function takes a linked list and returns a complete copy of that
// list using a dummy node
function copyList(head: Node | null): Node | null {
    let current = head;    // used to iterate over the original list
    let tail: Node;    // point to the last node in the new list
    const dummy = new Node(0, null);    // build the new list off this dummy node

    tail = dummy;                       // start the tail pointing at the dummy

    while (current !== null) {
        push(tail, current.data);        // add each node at the tail
        const next = tail.next;
        if (next === null) {
            return dummy.next;
        }
        tail = next;
        current = current.next;
    }
    return dummy.next;
}

// construct a linked list
const keys = [1, 2, 3, 4];
let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

// copy linked list
const dup = copyList(head);

// print duplicate linked list
printList(dup);
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL
