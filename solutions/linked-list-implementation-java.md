# Linked List Implementation in Java

> Source: https://www.techiedelight.com/linked-list-implementation-java/

We know that the `LinkedList` class in TypeScript is commonly implemented as a doubly-linked list. This post provides an overview of common techniques to implement a linked list in TypeScript programming language.

We know that each node of a linked list contains a single data field and a reference to the next node in the list. The nodes of the linked list are allocated during runtime. We can use the constructor of the `Node` class to initialize the `data` field and the `next` pointer.

```ts
// A Linked List Node
class Node {
    public data: number;
    public next: Node | null;

    // constructor
    constructor(data: number, next: Node | null) {
        this.data = data;
        this.next = next;
    }
}
```

> 

There are several methods to construct a singly linked list in TypeScript:

## 1\. Naive method

A simple solution would be to allocate memory for all individual nodes of the linked list, set their data, and rearrange their references to build the complete list.

```ts
// A Linked List Node
class Node {
    public data: number;
    public next: Node | null;

    constructor(data: number) {
        this.data = data;
        this.next = null;
    }
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log("null");
}

// Naive function for linked list implementation containing three nodes
function constructList(): Node {
    // construct linked list nodes
    const first = new Node(1);
    const second = new Node(2);
    const third = new Node(3);
    const fourth = new Node(4);

    // rearrange the references to construct a list
    const head = first;
    first.next = second;
    second.next = third;
    third.next = fourth;

    // return reference to the first node in the list
    return head;
}

(function main() {
    // `head` points to the head node of the linked list
    const head = constructList();

    // print linked list
    printList(head);
})();
```

We can write the above code in a single line by passing the next node as an argument to the `Node` constructor:

```ts
// A Linked List Node
class Node {
    public data: number;
    public next: Node | null;

    constructor(data: number, next_node: Node | null) {
        // Set data
        this.data = data;

        // set the next field to point to a given node of the list
        this.next = next_node;
    }
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log("null");
}

// Naive function for linked list implementation containing three nodes
function constructList(): Node {
    const head = new Node(1, new Node(2, new Node(3, null)));
    return head;
}

(function main() {
    // `head` points to the head node of the linked list
    const head = constructList();

    // print linked list
    printList(head);
})();
```

## 2\. Return Head Node

The standard solution adds a single node to the head end of any list. This function is called `push()` since we are adding the link to the head end, making a list look a bit like a stack.

This is demonstrated below, where we return the head node from the `push()` function and update the head in the caller.

```ts
// A Linked List Node
class Node {
    public data: number;
    public next: Node | null;

    constructor(data: number = 0) {
        this.data = data;
        this.next = null;
    }
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log("null");
}

function push(head: Node | null, data: number): Node {
    // allocate a new node and set its data
    const newNode = new Node();
    newNode.data = data;

    // set the next field of the new node to point to the current
    // first node of the list.

    newNode.next = head;

    // change the head to point to the new node, so it is
    // now the first node in the list.

    return newNode;
}

// Function for linked list implementation from the given set of keys
function constructList(keys: number[]): Node | null {
    let head: Node | null = null;

    // start from the end of the array
    for (let i = keys.length - 1; i >= 0; i--) {
        head = push(head, keys[i]);
    }

    return head;
}

(function main() {
    // input keys
    const keys = [1, 2, 3, 4];

    // points to the head node of the linked list
    const head = constructList(keys);

    // print linked list
    printList(head);
})();
```

## 3\. Make head reference global

We can construct a linked list by making the head reference global, but this approach is not recommended since [global variables](https://en.wikipedia.org/wiki/Global_variable) are usually considered bad practice.

```ts
// A Linked List Node
class Node {
    public data: number;
    public next: Node | null;

    constructor(data: number = 0) {
        this.data = data;
        this.next = null;
    }
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log("null");
}

// global head
let head: Node | null = null;

// Takes a list and a data value, creates a new link with the given
// data and pushes it onto the list's front.
function push(data: number): Node {
    // allocate a new node and set its data
    const newNode = new Node();
    newNode.data = data;

    // set the next field of the new node to point to the current
    // head node of the list.
    newNode.next = head;

    // change the head to point to the new node, so it is
    // now the first node in the list.

    return newNode;
}

// Function for linked list implementation from the given set of keys
function constructList(keys: number[]): void {
    // start from the end of the array
    for (let i = keys.length - 1; i >= 0; i--) {
        head = push(keys[i]);
    }
}

(function main() {
    // input keys
    const keys = [1, 2, 3, 4];

    // points to the head node of the linked list
    constructList(keys);

    // print linked list
    printList(head);
})();
```

**Continue Reading:**

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Also See:**

> [Linked List Implementation in C](https://techiedelight.com/linked-list-implementation-part-1/)

> [Linked List Implementation in C++](https://techiedelight.com/linked-list-implementation-cpp/)

> [Linked List Implementation in Python](https://techiedelight.com/linked-list-implementation-python/)

**References:** <http://cslibrary.stanford.edu/103/LinkedListBasics.pdf>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.88/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
