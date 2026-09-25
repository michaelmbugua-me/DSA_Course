# Linked List – Insertion at Tail | C, Java, and Python Implementation

> Source: https://www.techiedelight.com/linked-list-implementation-part-2/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

In the previous two posts ([here](https://techiedelight.com/introduction-linked-lists/) and [here](https://techiedelight.com/linked-list-implementation-part-1/)), we have introduced linked list data structure and discussed various types of linked lists. We also covered in great detail the various methods to construct a linked list that inserts every new node onto the list’s front. This post will discuss various methods to implement a linked list by inserting it at the tail of the singly linked list.

> 

A simple solution would be to locate the last node in the list and then change its `.next` field from `NULL` to point the new node. This is just a particular case of the general rule: _to insert or delete a node inside a list, we need a pointer to the node just before that position to change its`.next` field._ Many list problems include the subproblem of advancing a pointer to the node before the point of insertion or deletion. The one exception is if the node is first in the list – in that case, we must change the head pointer.

Consider below the `appendNode()` function, which is like `push()`, except it adds the new node at the tail end of the list instead of the head. If the list is empty, it uses the reference pointer to change the head pointer. Otherwise, it uses a loop to locate the last node in the list. This version does not use `push()`, but builds the new node directly.

Following is a TypeScript program that demonstrates it:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log('null');
}

// Function to add a node at the tail end of the list instead of its head
function appendNode(head: ListNode | null, key: number): ListNode | null {
    let current = head;
    const node = new ListNode(key);

    // special case for length 0
    if (current === null) {
        head = node;
    } else {
        // locate the last node
        while (current.next) {
            current = current.next;
        }
        current.next = node;
    }

    return head;
}

// input keys
const keys = [1, 2, 3, 4];

// points to the head node of the linked list
let head: ListNode | null = null;
for (const key of keys) {
    head = appendNode(head, key);
}

// print linked list
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL

The following version is very similar to the above code but relies on `push()` to build the new node. Understanding this version requires a real understanding of reference pointers.

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Function to insert a node at the beginning of the linked list
function push(head: ListNode | null, data: number): ListNode {
    // allocate a new node and set its data
    const newNode = new ListNode(data);

    // set the next field of the node to point to the current
    // first node of the list.
    newNode.next = head;

    // return the head to point to the node, so it is
    // now the first node in the list.

    return newNode;
}

// Function to add a node at the tail end of the list instead
// of its head
function appendNode(head: ListNode | null, key: number): ListNode | null {
    let current = head;

    // special case for the empty list
    if (current === null) {
        head = push(head, key);
    } else {
        // locate the last node
        while (current.next) {
            current = current.next;
        }

        // Build the node after the last node
        current.next = push(current.next, key);
    }

    return head;
}

// input keys
const keys = [1, 2, 3, 4];

// points to the head node of the linked list
let head: ListNode | null = null;
for (const key of keys) {
    head = appendNode(head, key);
}

// print linked list
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL

The time complexity in the above solution would be linear for each insertion as we are traversing the whole list till the very end. An efficient approach is maintaining a tail pointer and a head pointer to perform insertion in constant time. There are two standard ways to do it:

## 1\. Build using Dummy Node

The idea is to use a temporary dummy node at the head of the list during computation. The trick is that every node appears to be added after the `.next` field of a node with the dummy. That way, the code for the first node is the same as for the other nodes. The tail pointer plays the same role as in the previous example. It now also handles the first node (avoids making dummy a permanent part of the list).

Following is a TypeScript program that demonstrates it:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log('null');
}

/*
    Takes a list and a data value, creates a new link with the given data and
    pushes it onto the list's front.
*/
function push(head: ListNode | null, data: number): ListNode {
    // allocate a new node and set its data
    const newNode = new ListNode(data);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode.next = head;

    // the new node becomes the first node in the list.
    return newNode;
}

// Function to implement a linked list from a given set of keys
// using a dummy node
function constructList(keys: number[], n: number): ListNode | null {
    // dummy node is temporarily the first node
    const dummy = new ListNode(0);
    // start the tail at the dummy
    let tail: ListNode = dummy;

    // Build the list on `dummy.next` (aka `tail.next`)
    dummy.next = null;

    for (let i = 0; i < n; i++) {
        tail.next = push(tail.next, keys[i]);
        tail = tail.next!;
    }

    // The real result list is now in `dummy.next`
    // dummy.next == {key[0], key[1], key[2], key[3]};
    return dummy.next;
}

// input keys
const keys = [1, 2, 3, 4];
const n = keys.length;

// points to the head node of the linked list
const head = constructList(keys, n);

// print linked list
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL
