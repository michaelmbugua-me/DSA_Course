# Linked List Implementation in C++

> Source: https://www.techiedelight.com/linked-list-implementation-cpp/

This post provides an overview of some available techniques to implement a linked list in TypeScript programming language.

We know that each node of a linked list contains a single data field and a pointer to the next node in the list.

```ts
// A Linked List Node
class Node {
    public key: number;        // data field
    public next: Node | null;  // pointer to the next node

    constructor(key: number, next: Node | null = null) {
        this.key = key;
        this.next = next;
    }
}
```

The nodes of the linked list are allocated at runtime. We can use the `new` operator in TypeScript for dynamic object allocation and the garbage collector automatically reclaims the allocated memory.

```ts
// Utility function to return a new linked list node
function newNode(key: number): Node {
    // allocate the new node using the new operator and set its data
    const node = new Node(key);

    // set the `.next` pointer of the new node to point to null
    node.next = null;

    return node;
}
```

> 

There are several methods to construct a singly linked list. Each is covered in detail below:

## 1\. Naive method

A simple solution would be to allocate memory for all individual nodes of the linked list, set their data, and rearrange their pointers to build the complete list.

```ts
// Function for linked list implementation containing three nodes
function constructList(): Node {
    // construct three linked list nodes
    const first = newNode(1);
    const second = newNode(2);
    const third = newNode(3);

    // rearrange the pointers to construct a list
    const head = first;
    first.next = second;
    second.next = third;

    // return a pointer to the first node in the list
    return head;
}

// Helper function to print a linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.key} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("null");
}

(function main() {
    // `head` points to the first node (also known as a head node) of a linked list
    const head = constructList();

    // print linked list
    printList(head);
})();
```

## 2\. Single Line

We can write the above code in a single line by passing the next node as an argument to the `newNode()` function:

```ts
// Utility function to return a new linked list node
function newNode(key: number, next: Node | null = null): Node {
    // allocate a new node and set its data
    const node = new Node(key);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node.next = next;

    return node;
}

// Function for linked list implementation containing three nodes
function constructList(): Node {
    const head = newNode(1, newNode(2, newNode(3, null)));
    return head;
}

// Helper function to print a linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.key} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("null");
}

(function main() {
    // `head` points to the first node (also known as a head node) of a linked list
    const head = constructList();

    // print linked list
    printList(head);
})();
```

## 3\. Generic Method

Both above methods are not practical when the total number of nodes increases in the linked list. If the keys are given in any container, such as an array, list, or set, we can easily construct a linked list by traversing the container, as shown below:

```ts
// Utility function to return a new linked list node
function newNode(key: number, next: Node | null = null): Node {
    // allocate a new node and set its data
    const node = new Node(key);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node.next = next;

    return node;
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[]): Node | null {
    let head: Node | null = null, node: Node | null = null;

    // start from the end of the array
    for (let i = keys.length - 1; i >= 0; i--) {
        node = newNode(keys[i], node);
        head = node;
    }

    return head;
}

// Helper function to print a linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.key} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("null");
}

(function main() {
    // input keys (in reverse order)
    const keys = [4, 3, 2, 1];

    // construct linked list
    const head = constructList(keys);

    // print linked list
    printList(head);
})();
```

## 4\. Standard Solution

The standard solution adds a single node to the head end of any list. This function is called `push()` since we are adding the link to the head end, making a list look a bit like a [stack](https://techiedelight.com/stack-implementation/).

We know that TypeScript passes objects by reference, but a reassignment of a parameter (such as `head = node`) is not visible to the caller. To emulate C++’s reference parameter, we can wrap the head in a small holder object whose contents the callee mutates.

```ts
/*
    push() in TypeScript — we pass the head inside a small holder object,
    which is passed by reference. So, this code changes the caller's memory,
    and we can access and update "head.node" directly.
*/
function push(headRef: { node: Node | null }, key: number): void {
    // allocate a new node and set its data
    const node = new Node(key);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.

    // no extra use of `*` necessary on the head — the reference
    // semantics take care of it behind the scenes
    node.next = headRef.node;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    headRef.node = node;
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[]): Node | null {
    const headRef: { node: Node | null } = { node: null };

    // start from the end of the array
    for (let i = keys.length - 1; i >= 0; i--) {
        // Note that no extra handling is necessary — the reference
        // semantics take care of it here too. These calls are changing the head.

        push(headRef, keys[i]);
    }

    return headRef.node;
}

// Helper function to print a linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.key} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("null");
}

(function main() {
    // input keys (in reverse order)
    const keys = [4, 3, 2, 1];

    // construct linked list
    const head = constructList(keys);

    // print linked list
    printList(head);
})();
```

## 5\. Make head pointer global

We can construct a linked list by making the head pointer global, but this approach is not recommended since [global variables](https://en.wikipedia.org/wiki/Global_variable) are usually considered bad practice.

```ts
// Global head pointer
let head: Node | null = null;

// Takes a list and a data value, creates a new link with the given
// data and pushes it onto the list's front.
function push(key: number): void {
    // allocate a new node and set its data
    const node = new Node(key);

    // set the `.next` pointer of the new node to point to the current
    // head node of the list.
    node.next = head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    head = node;
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[]): void {
    // start from the end of the array
    for (let i = keys.length - 1; i >= 0; i--) {
        push(keys[i]);
    }
}

// Helper function to print the global linked list `head`
function printList(): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.key} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("null");
}

(function main() {
    // input keys (in reverse order)
    const keys = [4, 3, 2, 1];

    // construct linked list
    constructList(keys);

    // print linked list
    printList();
})();
```

## 6\. Return head from the `push()` function

Another common approach many programmers follow is to return the head node from the `push()` function and update the head in the caller. This is demonstrated below:

```ts
/*
    Takes a list and a data value, creates a new link with the given data
    and pushes it onto the list's front.
*/
function push(head: Node | null, key: number): Node {
    // allocate a new node and set its data
    const node = new Node(key);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node.next = head;

    // return the new node, so it becomes the first node in the list
    return node;
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[]): Node | null {
    let head: Node | null = null;

    // start from the end of the array
    for (let i = keys.length - 1; i >= 0; i--) {
        head = push(head, keys[i]);        // update head here
    }

    return head;
}

// Helper function to print a linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.key} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("null");
}

(function main() {
    // input keys (in reverse order)
    const keys = [4, 3, 2, 1];

    // construct linked list
    const head = constructList(keys);

    // print linked list
    printList(head);
})();
```

**Continue Reading:**

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Also See:**

> [Linked List Implementation in C](https://techiedelight.com/linked-list-implementation-part-1/)

> [Linked List Implementation in Java](https://techiedelight.com/linked-list-implementation-java/)

> [Linked List Implementation in Python](https://techiedelight.com/linked-list-implementation-python/)

**References:** <http://cslibrary.stanford.edu/103/LinkedListBasics.pdf>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 267

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
