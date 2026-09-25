# Convert a multilevel linked list to a singly linked list

> Source: https://www.techiedelight.com/convert-multilevel-linked-list-singly/

Given a multilevel linked list, convert it into a [singly linked list](https://techiedelight.com/introduction-linked-lists/) so that all nodes of the first level appear first, followed by all nodes of the second level, and so on.

The multilevel linked list is similar to the simple linked list, except that it has one extra field that points to that node’s child. The child may point to a separate list altogether, which may have children of its own.

For example, consider the following multilevel linked list:

We should convert it into list `1—>2—>3—>4—>5—>6—>7—>8—>9—>10—>11—>12—>null`.

The idea is to use the [queue data structure](https://techiedelight.com/queue-implementation-cpp/) to solve this problem. We start by traversing the list horizontally from the head node using the next pointer, and whenever a node with a child is found, insert the child node into a queue. If the end of the list is reached, dequeue the front node, set it as the next node of the last encountered node, and repeat the entire process till the queue becomes empty.

The algorithm can be implemented as follows in TypeScript:

```ts
# A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null, public child: Node | null = null) {}
}

// Function to convert a multilevel linked list into a singly linked list
function convertList(head: Node | null): Node | null {
    let curr = head;
    const q: Node[] = [];

    // process all nodes
    while (curr) {
        // last node is reached
        // dequeue the front node and set it as the next node of the current node
        if (curr.next === null && q.length > 0) {
            curr.next = q.shift()!;
        }

        // if the current node has a child
        if (curr.child) {
            q.push(curr.child);
        }

        // advance the current node
        curr = curr.next;
    }

    return head;
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(out + 'null');
}

// Helper function to create a linked list with elements of a given input
function createHorizontalList(input: number[]): Node | null {
    let head: Node | null = null;
    for (let i = input.length - 1; i >= 0; i--) {
        head = new Node(input[i], head, null);
    }
    return head;
}

// create a multilevel linked list
const head = createHorizontalList([1, 2, 3, 4, 5]);
head!.child = createHorizontalList([6, 7]);
head!.next!.next!.child = createHorizontalList([8, 9]);
head!.child!.next!.child = createHorizontalList([10, 11]);
head!.child!.next!.child!.child = createHorizontalList([12]);

convertList(head);
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> NULL

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the multilevel linked list, and doesn’t require any extra space.

The above solution requires O(n) extra space for the queue data structure. We can also solve this problem with constant space. The idea is to maintain a tail pointer that always points at the end of the current list. Like the previous approach, start by traversing the list horizontally using the next pointer. Whenever we encounter a child node, append it at the end of the list and update the tail to the last node of the child node. Repeat this process until the end of the list is reached.

This is demonstrated below in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null, public child: Node | null = null) {}
}

// Function to find the last node of a linked list
function findTail(head: Node | null): Node | null {
    let tail = head;
    while (tail && tail.next) {
        tail = tail.next;
    }
    return tail;
}

// Function to convert a multilevel linked list into a singly linked list
function convertList(head: Node | null): Node | null {
    // find the tail node of the head node
    let tail = findTail(head);

    // start from the head node
    let curr = head;

    // process all nodes
    while (curr) {
        // if the current node has a child
        if (curr.child) {
            // set the child node as the next node of the tail node
            tail!.next = curr.child;

            // update the tail to the last node of the child node
            tail = findTail(curr.child);
        }

        // advance current node
        curr = curr.next;
    }

    return head;
}

// Function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(out + 'null');
}

// Function to create a linked list with elements of a given input
function createHorizontalList(input: number[]): Node | null {
    let head: Node | null = null;
    for (let i = input.length - 1; i >= 0; i--) {
        head = new Node(input[i], head, null);
    }
    return head;
}

// create a multilevel linked list
const head = createHorizontalList([1, 2, 3, 4, 5]);
head!.child = createHorizontalList([6, 7]);
head!.next!.next!.child = createHorizontalList([8, 9]);
head!.child!.next!.child = createHorizontalList([10, 11]);
head!.child!.next!.child!.child = createHorizontalList([12]);

convertList(head);
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> nullptr

