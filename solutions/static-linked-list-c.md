# Static Linked List – C, Java, and Python

> Source: https://www.techiedelight.com/static-linked-list-c/

We have discussed the linked list data structure, which is dynamic in nature (the memory is allocated during the run time). Now the question that might be on a few people’s minds is – can a linked link be implemented statically as well? This post tries to answer this question.

The fundamental purpose of a pointer-based linked list is to provide dynamic expansion, but when your linked list does not need to have a dynamic size, we can use static storage for it. The automatic storage has the property that its lifetime ends when the block’s execution is declared terminated, so it is difficult to use it for long-lived data. Also, there’s typically a bound on the amount of such storage we can obtain, and past that memory, the overflow will happen. And there is no way to detect when we have exceeded that bound.

The following code in TypeScript uses automatic storage to allocate nodes of the linked list:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null = null;
    constructor(data: number, next: Node | null = null) {
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

const e = new Node(5, null);    // last node
const d = new Node(4, e);
const c = new Node(3, d);
const b = new Node(2, c);
const a = new Node(1, b);       // first node

const head = a;

printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> null

The above method will become a pain if the total number of nodes required is huge in the linked list. We can construct a linked list easily using iteration if the keys are given in the form of an array or any other data structure (using its iterator).

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null = null;
    constructor(data: number, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
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

const A = [1, 2, 3, 4, 5];

const node: (Node | null)[] = new Array(A.length).fill(null);

for (let i = 0; i < A.length; i++) {
    node[i] = new Node(A[i], null);
    if (i > 0) {
        node[i - 1]!.next = node[i];
    }
}

const head = node[0];

printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> null

These nodes’ lifetime is the scope they are declared in – they no longer exist when the scope ends. We can verify that by placing our code inside the block scope and accessing the nodes outside the block scope.

Following is a TypeScript program that demonstrates it:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null = null;
    constructor(data: number, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
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

const arr = [1, 2, 3, 4, 5];

let root: Node | null = null;

{ // Entering block scope
    // Unlike automatic storage in C, node objects in TypeScript live on
    // the heap and remain reachable as long as `root` references them
    const node: (Node | null)[] = new Array(arr.length).fill(null);
    for (let i = 0; i < arr.length; i++) {
        node[i] = new Node(arr[i], null);
        if (i > 0) {
            node[i - 1]!.next = node[i];
        }
    }
    root = node[0];
} // Exiting block scope

printList(root);
```

**Output:** Runtime Error
