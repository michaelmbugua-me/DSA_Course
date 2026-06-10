# Linked List Implementation in TypeScript

> Source: https://www.techiedelight.com/linked-list-implementation-python/

This post provides an overview of several methods to implement a linked list in TypeScript.

A Linked List node consists of a data field and a reference to the next node in the list. We can use a constructor to initialize the data and the next field for a node allocated in the memory during runtime.

```ts
// A Linked List Node
class Node {
    data: number = 0;
    next: Node | null = null;
    constructor(data: number = 0, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
}
```

> 

There are several ways to construct a singly linked list in TypeScript:

## 1\. Standard Solution

The standard solution adds a single node to the `head` end of the list, making a list look a bit like a stack.

This is demonstrated below where the head node is updated in the caller.

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null;
    constructor(data: number, next: Node | null) {
        this.data = data;
        this.next = next;
    }
}

// Function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log('null');
}

// Function to construct a linked list from a given set of keys
function construct(keys: number[]): Node | null {
    let head: Node | null = null;

    // start from the end of the list
    for (let i = keys.length - 1; i >= 0; i--) {
        // allocate a new node and set its data
        head = new Node(keys[i], head);
    }

    return head;
}

(function main() {
    // input keys
    const keys = [1, 2, 3, 4];

    // points to the head node of the linked list
    const head = construct(keys);

    // print linked list
    printList(head);
})();
```

## 2\. Naive method

A simple solution would be to allocate memory for all individual nodes of the linked list, set their data, and rearrange their references to build the complete list.

Here’s what the code would look like:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null;
    constructor(data: number, next: Node | null) {
        this.data = data;
        this.next = next;
    }
}

// Function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Naive function for linked list implementation containing three nodes
function construct(): Node {
    // construct individual linked list nodes
    const first = new Node(1, null);
    const second = new Node(2, null);
    const third = new Node(3, null);
    const fourth = new Node(4, null);

    // rearrange the references to construct a list
    const head = first;
    first.next = second;
    second.next = third;
    third.next = fourth;

    // return first node in the list
    return head;
}

(function main() {
    // `head` points to the head node of the linked list
    const head = construct();

    // print linked list
    printList(head);
})();
```

We can write the above code in a single line by passing the next node as an argument to the `Node` constructor:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null;
    constructor(data: number, next: Node | null) {
        this.data = data;
        this.next = next;
    }
}

// Function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log('null');
}

// Function for linked list implementation containing four nodes
function construct(): Node {
    return new Node(1, new Node(2, new Node(3, new Node(4, null))));
}

(function main() {
    // `head` points to the head node of the linked list
    const head = construct();

    // print linked list
    printList(head);
})();
```

**References:** <http://cslibrary.stanford.edu/103/LinkedListBasics.pdf>

**Continue Reading:**

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Also See:**

> [Linked List Implementation in C](https://techiedelight.com/linked-list-implementation-part-1/)

> [Linked List Implementation in C++](https://techiedelight.com/linked-list-implementation-cpp/)

> [Linked List Implementation in Java](https://techiedelight.com/linked-list-implementation-java/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 144

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
