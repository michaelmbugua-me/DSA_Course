# Insert a node to its correct sorted position in a sorted linked list

> Source: https://www.techiedelight.com/sorted-insert-in-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a sorted list in increasing order and a single node, insert the node into the list’s correct sorted position. The function should take an existing node and rearranges pointers to insert it into the list.

For example,

> 

There are many possible solutions to this problem. The basic strategy is to iterate down the list looking for the place to insert the new node. That could be the end of the list or a point just before a larger node than the new node. The three solutions presented handle the “head end” case in different ways.

## 1\. Naive Approach

The naive implementation can be seen below in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(head: Node | null): void {

    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Function to insert a given node at its correct sorted position into
// a given list sorted in increasing order
function sortedInsert(head: Node | null, newNode: Node): Node {

    // special case for the head end
    if (head === null || head.data >= newNode.data) {
        newNode.next = head;
        head = newNode;
        return head;
    }

    // Locate the node before the point of insertion
    let current = head;
    while (current.next !== null && current.next.data < newNode.data) {
        current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;

    return head;
}

// input keys
const keys = [2, 4, 6, 8];

// points to the head node of the linked list
let head: Node | null = null;

// construct a linked list
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

head = sortedInsert(head, new Node(5));
head = sortedInsert(head, new Node(9));
head = sortedInsert(head, new Node(1));

// print linked list
printList(head);
```

**Output:** 1 —> 2 —> 4 —> 5 —> 6 —> 8 —> 9 —> null

## 2\. Using Dummy Node

Another strategy is to use a temporary dummy node to take care of the first node case – the dummy node nothing but temporarily the first node in the list. Following is a TypeScript program that demonstrates it:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(head: Node | null): void {

    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Function to insert a given node at its correct sorted position into a given
// list sorted in increasing order
function sortedInsert(head: Node | null, newNode: Node): Node {

    const dummy = new Node();
    let current = dummy;
    dummy.next = head;

    while (current.next !== null && current.next.data < newNode.data) {
        current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    return dummy.next;
}

// input keys
const keys = [2, 4, 6, 8];

// points to the head node of the linked list
let head: Node | null = null;

// construct a linked list
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

head = sortedInsert(head, new Node(5));
head = sortedInsert(head, new Node(9));
head = sortedInsert(head, new Node(1));

// print linked list
printList(head);
```

**Output:** 1 —> 2 —> 4 —> 5 —> 6 —> 8 —> 9 —> null

## 3\. Using Local references

Finally, we can use also use local references to insert a node into the list’s correct sorted position. The implementation can be seen below in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(head: Node | null): void {

    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Function to insert a given node at its correct sorted position into a given
// list sorted in increasing order
function sortedInsert(head: Node | null, newNode: Node): Node {

    let prev: Node | null = null;
    let current = head;

    // locate the node before the point of insertion
    while (current !== null && current.data < newNode.data) {
        prev = current;
        current = current.next;
    }

    newNode.next = current;
    if (prev === null) {
        return newNode;
    }
    prev.next = newNode;

    return head;
}

// input keys
const keys = [2, 4, 6, 8];

// points to the head node of the linked list
let head: Node | null = null;

// construct a linked list
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

head = sortedInsert(head, new Node(5));
head = sortedInsert(head, new Node(9));
head = sortedInsert(head, new Node(1));

// print linked list
printList(head);
```

**Output:** 1 —> 2 —> 4 —> 5 —> 6 —> 8 —> 9 —> null
