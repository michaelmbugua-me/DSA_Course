# Reverse a Linked List – Recursive Solution | C, C++, Java, and Python

> Source: https://www.techiedelight.com/reverse-linked-list-part-2-recursive-solution/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

This post will reverse the singly linked list using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) in TypeScript.

For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> null **Output:** 5 —> 4 —> 3 —> 2 —> 1 —> null

> 

We have already discussed an iterative solution to reverse the linked list in the [previous post](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/). In this post, we will cover the recursive implementation of it.

Following is the simple recursive implementation that works by fixing `.next` pointers of the list’s nodes and finally the head pointer. Probably the hardest part is accepting the concept that the `reverse(&rest, head)` does reverse the rest. Then, there’s a trick to getting the one front node at the end of the list. We recommend making a drawing to see how the trick works.

```ts
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr: ListNode | null = head;
    while (ptr) {
        process.stdout.write(ptr.data + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Recursive function to reverse a given linked list. It reverses the
// given linked list by fixing the head pointer and then `.next`
// pointers of every node in reverse order
function reverse(head: ListNode | null, headRef: ListNode | null): ListNode | null {
    // empty list base case
    if (head === null) {
        return headRef;
    }

    const first = head;         // suppose first = [1, 2, 3]
    const rest = first.next;    // rest = [2, 3]

    // base case: list has only one node
    if (rest === null) {
        // fix the head pointer here
        headRef = first;
        return headRef;
    }

    // recursively reverse the smaller {2, 3} case
    // after: rest = [3, 2]
    headRef = reverse(rest, headRef);

    // put the first item at the end of the list
    rest.next = first;
    first.next = null;      // (tricky step — make a drawing)

    return headRef;
}

// Reverse a given linked list
function reverseList(head: ListNode | null): ListNode | null {
    return reverse(head, head);
}

// demo
let head: ListNode | null = null;
for (let i = 6; i > 0; i--) {
    head = new ListNode(i, head);
}

head = reverseList(head);
printList(head);
```

**Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

We can also solve this problem by passing only reference to the head pointer to the function, as demonstrated below:

```ts
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr: ListNode | null = head;
    while (ptr) {
        process.stdout.write(ptr.data + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Recursive function to reverse a linked list.
// It reverses the given linked list by fixing the head pointer and
// then `.next` pointers of every node in reverse order
function reverse(head: ListNode | null): ListNode | null {
    // empty list base case
    if (head === null) {
        return head;
    }

    const first = head;         // suppose first = [1, 2, 3]
    let rest = first.next;      // rest = [2, 3]

    // empty rest base case
    if (rest === null) {
        return head;
    }

    rest = reverse(rest);       // recursively reverse the smaller {2, 3} case
    // after: rest = [3, 2]

    first.next!.next = first;   // put the first item at the end of the list
    first.next = null;          // (tricky step — make a drawing)
    head = rest;                // fix the head pointer

    return head;
}

// demo
let head: ListNode | null = null;
for (let i = 6; i > 0; i--) {
    head = new ListNode(i, head);
}

head = reverse(head);
printList(head);
```

**Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

We can simplify the above code by passing previous node information to the function. Following is a simple recursive implementation of it in TypeScript:

```ts
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr: ListNode | null = head;
    while (ptr) {
        process.stdout.write(ptr.data + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Recursive function to reverse a given linked list. It reverses the
// given linked list by fixing the head pointer and then `.next`
// pointers of every node in reverse order
function reverse(curr: ListNode | null, prev: ListNode | null, headRef: { head: ListNode | null }): void {
    // base case: end of the list reached
    if (curr === null) {
        // fix head pointer
        headRef.head = prev;
        return;
    }

    // recur for the next node and pass the current node as a previous node
    reverse(curr.next, curr, headRef);

    // fix current node (nodes following it are already fixed)
    curr.next = prev;
}

// demo
const headRef = { head: null as ListNode | null };
for (let i = 6; i > 0; i--) {
    headRef.head = new ListNode(i, headRef.head);
}

reverse(headRef.head, null, headRef);

printList(headRef.head);
```

**Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null
