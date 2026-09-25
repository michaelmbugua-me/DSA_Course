# Rearrange a linked list by separating odd nodes from even ones

> Source: https://www.techiedelight.com/rearrange-linked-list-separating-odd-nodes-even/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, rearrange it by separating odd nodes from even ones. All even nodes should come before all odd nodes in the output list, and the relative order of even and odd nodes should be maintained.

For example, consider list `{1, 2, 3, 4, 5, 6, 7}`. Rearranging it should yield `{2, 4, 6, 1, 3, 5, 7}`.

> 

## 1\. Using Iteration

The problem can be solved either iteratively or recursively. Following is the simple iterative TypeScript implementation that does not use a dummy node:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Rearrange a given linked list by separating odd nodes from even ones and
// maintaining their relative order. This approach does not use any dummy node.
function rearrangeEvenOdd(head: Node | null): Node | null {

    let odd: Node | null = null;
    let oddTail: Node | null = null;

    let even: Node | null = null;
    let evenTail: Node | null = null;

    let curr = head;
    while (curr) {
        // current node is odd
        if (curr.data & 1) {
            // handle head for the first odd node
            if (odd === null) {
                odd = oddTail = curr;
            }
            else {
                oddTail.next = curr;
                oddTail = oddTail.next;
            }
        }
        // current node is even
        else {
            // handle head for the first even node
            if (even === null) {
                even = evenTail = curr;
            }
            else {
                evenTail.next = curr;
                evenTail = curr;
            }
        }

        curr = curr.next;
    }

    // if the list contains at least one even node
    if (even) {
        head = even;
        evenTail!.next = odd;
    }
    // special case – list contains all odd nodes
    else {
        head = odd;
    }

    // null to terminate the list; otherwise, it will go into an infinite loop
    if (oddTail) {
        oddTail.next = null;
    }

    return head;
}

// 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null
let head: Node | null = null;
for (let i = 9; i >= 0; i--) {
    head = new Node(i + 1, head);
}

head = rearrangeEvenOdd(head);
printList(head);
```

**Output:** 2 —> 4 —> 6 —> 8 —> 10 —> 1 —> 3 —> 5 —> 7 —> 9 —> null

## 2\. Using Dummy Nodes

We can simplify the above code by using two temporary dummy nodes as the odd and even list and maintaining two pointers that always point to the last node in individual lists, so appending new nodes is easy. The dummy node gives the tail something to point to initially when the result list is empty. This dummy node is efficient since it is only temporary, and it is allocated in the stack. The loop proceeds, removing nodes from the original list and adding it at the tail of the even or odd list. When we are done, rearrange the pointers so that all odd nodes follow all even nodes.

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class Node {
    constructor(public data: number = 0, public next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Rearrange a given linked list by separating odd nodes from even ones and
// maintaining their relative order. This approach uses a dummy node
function rearrangeEvenOdd(head: Node | null): Node | null {

    const odd = new Node();
    const even = new Node();

    let oddTail = odd;
    let evenTail = even;

    let curr = head;

    while (curr) {
        if (curr.data & 1) {
            oddTail.next = curr;
            oddTail = curr;
        }
        else {
            evenTail.next = curr;
            evenTail = curr;
        }
        curr = curr.next;
    }

    evenTail.next = odd.next;
    oddTail.next = null;

    return even.next;
}

let head: Node | null = null;
for (let i = 9; i >= 0; i--) {
    head = new Node(i + 1, head);
}

head = rearrangeEvenOdd(head);
printList(head);
```

**Output:** 2 —> 4 —> 6 —> 8 —> 10 —> 1 —> 3 —> 5 —> 7 —> 9 —> null

## 3\. Using Recursion

This is one of those excellent problems where the recursive solution code is much cleaner than the iterative code. The recursive implementation can be seen below in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public data: number = 0, public next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Recursive function to rearrange the list
function rearrange(head: Node | null, odd: Node, even: Node, oddRef: { value: Node }): void {
    // we have reached the end of the list
    if (head === null) {
        // null terminate the list
        odd.next = null;

        // join even and odd sublist
        even.next = oddRef.value.next;
        return;
    }

    // if the current node is odd
    if (head.data & 1) {
        odd.next = head;
        rearrange(head.next, head, even, oddRef);
    }

    // if the current node is even
    else {
        even.next = head;
        rearrange(head.next, odd, head, oddRef);
    }
}

// Rearrange a given linked list by separating odd nodes
// from even ones and maintaining their relative order.
function rearrangeEvenOdd(head: Node | null): Node | null {
    const odd = new Node();
    const even = new Node();

    rearrange(head, odd, even, { value: odd });
    return even.next;
}

// input keys
let head: Node | null = null;
for (let i = 9; i >= 0; i--) {
    head = new Node(i + 1, head);
}

head = rearrangeEvenOdd(head);
printList(head);
```

**Output:** 2 —> 4 —> 6 —> 8 —> 10 —> 1 —> 3 —> 5 —> 7 —> 9 —> null
