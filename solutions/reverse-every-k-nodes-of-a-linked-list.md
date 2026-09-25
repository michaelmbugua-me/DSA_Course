# Reverse every group of `k` nodes in a linked list

> Source: https://www.techiedelight.com/reverse-every-k-nodes-of-a-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, reverse every adjacent group of `k` nodes where `k` is a given positive integer.

For example,

**Input List:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> null For k = 3, **Output:** 3 —> 2 —> 1 —> 6 —> 5 —> 4 —> 8 —> 7 —> null For k = 2, **Output:** 2 —> 1 —> 4 —> 3 —> 6 —> 5 —> 8 —> 7 —> null For k = 1, **Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> null For k >= 8, **Output:** 8 —> 7 —> 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

> 

The idea is to consider every group of `k` nodes and [recursively reverse](https://techiedelight.com/reverse-linked-list-part-2-recursive-solution/) them one at a time. Special care has to be taken while linking reversed groups with each other.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }

    // Helper function to print linked list starting from the current node
    print(): void {
        let ptr: ListNode | null = this;
        while (ptr) {
            console.log(ptr.val + ' —> ');
            ptr = ptr.next;
        }
        console.log('null');
    }
}

// Function to reverse every group of `k` nodes in a given linked list
function reverseInGroups(head: ListNode | null, k: number): ListNode | null {
    // base case
    if (head === null) {
        return null;
    }

    // start with the current node
    let current: ListNode | null = head;

    // reverse next `k` nodes
    let prev: ListNode | null = null;
    let count = 0;

    // iterate through the list and move/insert each node
    // in front of the result list (like a push of the node)
    while (current && count < k) {
        count = count + 1;

        // tricky: note the next node
        const next: ListNode | null = current.next;

        // move the current node onto the result
        current.next = prev;

        // update the previous pointer to the current node
        prev = current;

        // move to the next node in the list
        current = next;
    }

    // recur for remaining nodes
    head.next = reverseInGroups(current, k);

    // it is important to return the previous node (to link every group of `k` nodes)
    return prev;
}

let head: ListNode | null = null;
for (let i = 7; i >= 0; i--) {
    head = new ListNode(i + 1, head);
}

head = reverseInGroups(head, 3);
if (head !== null) {
    head.print();
}
```

**Output:** 3 —> 2 —> 1 —> 6 —> 5 —> 4 —> 8 —> 7 —> NULL



The above solution returns the head pointer from the function. Alternatively, we can pass a pointer (reference) to the head node to the `reverseInGroups()` function and avoid updating the head pointer insider the `main()` function.

Following is a TypeScript program that demonstrates it:

```ts
// A Linked List Node
class ListNode {
    val: number;
    next: ListNode | null;

    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr: ListNode | null = head;
    while (ptr) {
        console.log(ptr.val + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Iterative function to reverse first `k` nodes of a linked list
function reverseK(current: ListNode | null, k: number): [ListNode | null, ListNode | null] {
    let prev: ListNode | null = null;
    let count = 0;

    // iterate through the list and move/insert each node
    // in front of the result list (like a push of the node)
    while (current && count++ < k) {
        // tricky: note the next node
        const next: ListNode | null = current.next;

        // move the current node onto the result
        current.next = prev;

        // update the previous pointer to the current node
        prev = current;

        // move to the next node in the list
        current = next;
    }

    // return last processed node
    return [prev, current];
}

// Function to reverse every group of `k` nodes in a given linked list
// call function as head = reverseInGroups(head, k)
function reverseInGroups(head: ListNode | null, k: number): ListNode | null {
    // base case
    if (head === null) {
        return null;
    }

    // start with the current node
    let current: ListNode | null = head;

    // reverse next `k` nodes
    let prev: ListNode | null;
    [prev, current] = reverseK(current, k);

    // recur for remaining nodes
    current = reverseInGroups(current, k);

    // fix head node
    head.next = current;
    return prev;
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7, 8];

let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

head = reverseInGroups(head, 3);

printList(head);
```

The time complexity of the above solution is O(n), where `n` is the length of the linked list. The auxiliary space required by the program for the call stack is proportional to the lists’ length.

**Exercise:** Modify the solution to reverse every alternate group of `k` nodes.
