# Linked List Implementation in C

> Source: https://www.techiedelight.com/linked-list-implementation-part-1/

We have introduced the linked list data structure in the [previous post](https://techiedelight.com/introduction-linked-lists/) and discussed various types of linked lists. We have also covered the applications of linked list data structure and its pros and cons concerning arrays. This post will discuss various linked list implementation techniques in detail and construct a singly linked list in the TypeScript programming language.

Let’s start by discussing the structure of a linked list node. Each node of a linked list contains a single data element and a pointer to the next node in the list.

```ts
// A Linked List Node
class Node {
    public data: number;      // integer data
    public next: Node | null; // pointer to the next node

    constructor(data: number, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
}
```

## Memory allocation of Linked List nodes

The nodes that will make up the list’s body are allocated at runtime. In TypeScript, we use the `new` operator to create a node object, and the garbage collector automatically reclaims the memory when the node is no longer referenced.

```ts
// Helper function in TypeScript to return a new linked list node
function newNode(data: number): Node {
    // allocate a new node using `new` and set its data
    const node = new Node(data);

    // set the `.next` pointer of the new node to point to null
    node.next = null;

    return node;
}
```

## Constructing Linked List

This section covers various methods to construct a linked list.

## 1\. Naive method

A naive solution is to construct individual linked list nodes first and rearrange their pointers later to build the list.

```ts
// Helper function to return a new linked list node
function newNode(data: number): Node {
    // allocate a new node and set its data
    const node = new Node(data);

    // `.next` pointer of the new node points to nothing
    node.next = null;

    return node;
}

// Naive function for linked list implementation containing three nodes
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
        process.stdout.write(`${ptr.data} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("NULL");
}

(function main() {
    // `head` points to the first node (also known as a head node) of a linked list
    const head = constructList();

    // print linked list
    printList(head);
})();
```

## 2\. Single Line

The above code can be rewritten in a single line by passing the next node as an argument to the `newNode()` function:

```ts
// Helper function to return a new linked list node
function newNode(data: number, nextNode: Node | null): Node {
    // allocate a new node and set its data
    const node = new Node(data);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node.next = nextNode;

    return node;
}

// Naive function for linked list implementation containing three nodes
function constructList(): Node {
    const head = newNode(1, newNode(2, newNode(3, null)));
    return head;
}

// Helper function to print a linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("NULL");
}

(function main() {
    // `head` points to the first node (also known as a head node) of a linked list
    const head = constructList();

    // print linked list
    printList(head);
})();
```

## 3\. Generic Method

The above-discussed methods will become a pain if the total number of nodes required is huge in the linked list. We can construct a linked list easily using iteration if the keys are given in the form of an array or any other data structure (using its iterator). Following is the implementation of the idea:

```ts
// Helper function to return a new linked list node
function newNode(data: number, nextNode: Node | null): Node {
    // allocate a new node and set its data
    const node = new Node(data);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node.next = nextNode;

    return node;
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[], n: number): Node | null {
    let head: Node | null = null, node: Node | null = null;

    // start from the end of the array
    for (let i = n - 1; i >= 0; i--) {
        node = newNode(keys[i], node);
        head = node;
    }

    return head;
}

// Helper function to print a linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("NULL");
}

(function main() {
    // input keys
    const keys = [1, 2, 3, 4];
    const n = keys.length;

    // `head` points to the first node (also known as a head node) of a linked list
    const head = constructList(keys, n);

    // print linked list
    printList(head);
})();
```

## 4\. Standard Solution

The standard function adds a single node to the head end of any list. This function is called `push()` since we are adding the link to the head end, making a list look a bit like a [stack](https://techiedelight.com/stack-implementation/). Alternately, it could be called `InsertAtFront()`.

Consider the following snippet:

```ts
function push(head: Node | null, data: number): void {
    // allocate a new node and set its data
    const newNode = new Node(data);

    // set the `.next` pointer of the new node to point to the current
    // first node (head node) of the list.
    newNode.next = head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    head = newNode;             // No, this line does not work! (Why?)
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[], n: number): Node | null {
    let head: Node | null = null;

    // start from the end of the array
    for (let i = n - 1; i >= 0; i--) {
        push(head, keys[i]);    // try to push a key at front – doesn't work
    }

    return head;
}

// Helper function to print given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("NULL");
}

(function main() {
    // input keys
    const keys = [1, 2, 3, 4];
    const n = keys.length;

    // head points to first node (also called as head node) of linked list
    const head = constructList(keys, n);

    // print linked list
    printList(head);
})();
```

The above code does not work as changes to local parameters are never reflected in the caller’s memory. In TypeScript, primitive values and parameter reassignments are passed by value, so the callee cannot change the caller’s `head` variable directly. To let a function change its caller’s memory, we pass a holder object that contains the head instead of a copy of the head value — the holder object is passed by reference, so changes to its contents are visible to the caller.

### Correct `push()` code:

```ts
/*
    push(): Takes a list and a data value, creates a new link with the given
    data and pushes it onto the list's front. The head pointer does not pass
    in the list directly. Instead, the list is passed in as a holder object
    referencing the head pointer — this allows us to modify the caller's memory.

    The parameter has the word "ref" in it as a reminder that this is a
    "reference" to the head instead of an ordinary copy of the head pointer.
*/
function push(headRef: { node: Node | null }, data: number): void {
    // allocate a new node and set its data
    const newNode = new Node(data);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode.next = headRef.node;   // access the real head through the holder

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    headRef.node = newNode;
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[], n: number): Node | null {
    const headRef: { node: Node | null } = { node: null };

    // start from the end of the array
    for (let i = n - 1; i >= 0; i--) {
        push(headRef, keys[i]);
    }

    return headRef.node;
}
```

## 5\. Make head pointer global

This approach is not recommended as [global variables](https://en.wikipedia.org/wiki/Global_variable) are usually considered bad practice precisely because of their non-locality: a global variable can potentially be modified from anywhere (unless they reside in protected memory or are otherwise, rendered read-only), and any part of the program may depend on it. Therefore, a global variable has unlimited potential for creating mutual dependencies, and adding mutual dependencies increases complexity. Global variables also make it challenging to integrate modules because others may use the same global names unless names are reserved by agreement or by naming convention.

```ts
// Global head pointer
let head: Node | null = null;

// Takes a list and a data value, creates a new link with the given
// data and pushes it onto the list's front
function push(data: number): void {
    // allocate a new node and set its data
    const newNode = new Node(data);

    // set the `.next` pointer of the new node to point to the current
    // head node of the list.
    newNode.next = head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    head = newNode;
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[], n: number): void {
    // start from the end of the array
    for (let i = n - 1; i >= 0; i--) {
        push(keys[i]);
    }
}

// Helper function to print the global linked list `head`
function printList(): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("NULL");
}

(function main() {
    // input keys
    const keys = [1, 2, 3, 4];
    const n = keys.length;

    // `head` points to the first node (also known as a head node) of a linked list
    constructList(keys, n);

    // print linked list
    printList();
})();
```

## 6\. Return head from the `push()` function

```ts
/*
    Takes a list and a data value, creates a new link with the given data
    and pushes it onto the list's front
*/
function push(head: Node | null, data: number): Node {
    // allocate a new node and set its data
    const newNode = new Node(data);

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode.next = head;

    // return the new node, so it becomes the first node in the list
    return newNode;
}

// Function for linked list implementation from a given set of keys
function constructList(keys: number[], n: number): Node | null {
    let head: Node | null = null;

    // start from the end of the array
    for (let i = n - 1; i >= 0; i--) {
        head = push(head, keys[i]);        // update head here
    }

    return head;
}

// Helper function to print a linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} -> `);
        ptr = ptr.next;
    }

    process.stdout.write("NULL");
}

(function main() {
    // input keys
    const keys = [1, 2, 3, 4];
    const n = keys.length;

    // `head` points to the first node (also known as a head node) of a linked list
    const head = constructList(keys, n);

    // print linked list
    printList(head);
})();
```

**Exercise:** Modify the `push()` function to add nodes to the _tail_ of the list.

(Hint – Locate the last node in the list, and then changing its `.next` field from `NULL` to point to the new node, or maintain a tail pointer along with a head pointer to perform insertion in constant time.)

**Continue Reading:**

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Also See:**

> [Linked List Implementation in C++](https://techiedelight.com/linked-list-implementation-cpp/)

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

Average rating 4.87/5. Vote count: 255

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
