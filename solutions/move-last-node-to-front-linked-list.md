# Move the last node to the front of a linked list

> Source: https://www.techiedelight.com/move-last-node-to-front-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, move its last node to the front.

For example, list `{1, 2, 3, 4}` should be changed to `{4, 1, 2, 3}`.

> 

The idea is to make the linked list circular and then break the chain before the last node after making its head to point to the last node. Following is the TypeScript program that demonstrates it:

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

// Function to move the last node to the front of a given linked list
function rearrange(head: ListNode | null): ListNode | null {

    // proceed only when the list is valid
    if (head === null || head.next === null) {
        return head;
    }

    let ptr = head;

    // move to the second last node
    while (ptr.next!.next) {
        ptr = ptr.next!;
    }

    // transform the list into a circular list
    ptr.next!.next = head;

    head = ptr.next;    // Fix head
    ptr.next = null;    // break the chain
    return head;
}

// 1 —> 2 —> 3 —> 4 —> null
let head: ListNode | null = null;
for (let i = 4; i >= 1; i--) {
    head = new ListNode(i, head);
}

head = rearrange(head);
printList(head);
```

**Output:** 4 —> 1 —> 2 —> 3 —> NULL

We can solve this problem recursively as well. Following is its simple recursive implementation in TypeScript:

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

// Recursive function to move the last node to the front of a given linked list
function rearrange(head: ListNode | null, prev: ListNode, curr: ListNode): ListNode {

    // if the current node is the last
    if (curr.next === null) {
        // make its next point to the first node
        curr.next = head;

        // set its previous node to point to null
        prev.next = null;

        // return current reference (new head)
        return curr;
    }

    return rearrange(head, curr, curr.next);
}

// Function to move the last node to the front of a given linked list
function rearrangeList(head: ListNode | null): ListNode | null {

    // if the list contains at least two nodes
    if (head && head.next) {
        head = rearrange(head, head, head);
    }

    return head;
}

let head: ListNode | null = null;
for (let i = 4; i >= 1; i--) {
    head = new ListNode(i, head);
}

head = rearrangeList(head);
printList(head);
```

The time complexity of both above-discussed methods is O(n), where `n` is the length of the linked list. The iterative version doesn’t require any extra space, whereas the recursive version use stack space proportional to the lists’ length.
