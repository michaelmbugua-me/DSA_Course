# Reverse every alternate group of `k` nodes in a linked list

> Source: https://www.techiedelight.com/reverse-alternate-group-k-nodes-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, reverse every alternate group of `k` nodes where `k` is a given positive integer.

For example,

**Input List:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null For k = 2, **Output List:** 2 —> 1 —> 3 —> 4 —> 6 —> 5 —> 7 —> 8 —> 10 —> 9 —> null For k = 3, **Output List:** 3 —> 2 —> 1 —> 4 —> 5 —> 6 —> 9 —> 8 —> 7 —> 10 —> null For k = 1, **Output List:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null For k >= 10, **Output List:** 10 —> 9 —> 8 —> 7 —> 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

> 

## 1\. Iterative Solution

The idea is to traverse the linked list and consider every group of `2×k` nodes at a time. In a single iteration of the loop, [reverse the first `k` nodes](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/) and skip the next `k` nodes. Special care has to be taken while linking reversed groups with the rest of the list.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    val: number;
    next: ListNode | null = null;
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    console.log(msg + ': ');
    while (head) {
        console.log(head.val + ' —> ');
        head = head.next;
    }
    console.log('null');
}

// Function to reverse a first `k` nodes in a linked list.
// The function returns the new front node (or last node in the original sublist)
function reverse(curr: ListNode | null, k: number): [ListNode | null, ListNode | null] {
    // maintain a `prev` pointer
    let prev: ListNode | null = null;

    // traverse the list and reverse first `k` nodes
    while (curr && k > 0) {
        k = k - 1;

        // tricky: note the next node
        const next = curr.next;

        // fix the `curr` node
        curr.next = prev;

        // advance the two pointers
        prev = curr;
        curr = next;
    }

    // return node at the front
    return [prev, curr];
}

// Function to skip `k` nodes in a given linked list.
function skipKNodes(curr: ListNode | null, k: number): [ListNode | null, ListNode | null] {
    let prev: ListNode | null = null;
    while (curr && k > 0) {
        k = k - 1;
        prev = curr;
        curr = curr.next;
    }

    return [prev, curr];
}

// Recursive function to reverse every alternate group of `k` nodes
// in a linked list
function reverseAlternatingKNodes(head: ListNode | null, k: number): ListNode | null {
    let prev: ListNode | null = null;
    let curr: ListNode | null = head;

    // traverse the whole list
    while (curr) {
        // curr would be the last node in the reversed sublist
        const last = curr;

        // reverse next `k` nodes and get their head
        let front: ListNode | null;
        [front, curr] = reverse(curr, k);

        // update head pointer after first `reverse()` call
        if (prev === null) {
            head = front;
        }
        // for subsequent calls to `reverse()`, link the reversed sublist
        // with the rest of the list
        else if (prev !== null) {
            prev.next = front;
        }

        // link the last node with the current node
        last.next = curr;

        // skip next `k` nodes
        [prev, curr] = skipKNodes(curr, k);
    }

    // return head node
    return head;
}

// construct a singly linked list
let head: ListNode | null = null;
for (let i = 9; i >= 0; i--) {
    head = new ListNode(i + 1, head);
}

const k = 2;

printList('Original linked list ', head);
head = reverseAlternatingKNodes(head, k);
printList('Resultant linked list', head);
```

**Output:** Original linked list: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> nullptr Resultant linked list: 2 —> 1 —> 3 —> 4 —> 6 —> 5 —> 7 —> 8 —> 10 —> 9 —> nullptr



The time complexity of the above iterative solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

## 2\. Recursive Solution

The recursive solution is similar to the iterative solution where we reverse the first `k` nodes and skip the next `k` nodes. But here, recursively call for the rest of the list.

The recursive implementation can be seen below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    val: number;
    next: ListNode | null = null;
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    console.log(msg + ': ');
    while (head) {
        console.log(head.val + ' —> ');
        head = head.next;
    }
    console.log('null');
}

// Function to reverse a first `k` nodes in a linked list.
// The function returns the front node (or last node in the original sublist)
function reverse(curr: ListNode | null, k: number): [ListNode | null, ListNode | null] {
    // maintain a `prev` pointer
    let prev: ListNode | null = null;

    // traverse the list and reverse first `k` nodes
    while (curr && k > 0) {
        // tricky: note the next node
        const next = curr.next;

        // fix the `curr` node
        curr.next = prev;

        // advance the two pointers
        prev = curr;
        curr = next;

        k = k - 1;
    }

    // return node at the front
    return [prev, curr];
}

// Function to skip `k` nodes in a given linked list.
function skipKNodes(curr: ListNode | null, k: number): ListNode | null {
    while (curr && k > 0) {
        curr = curr.next;
        k = k - 1;
    }

    return curr;
}

// Recursive function to reverse every alternate group of `k` nodes
// in a linked list
function reverseAlternatingKNodes(head: ListNode | null, k: number): ListNode | null {
    // base case
    if (head === null) {
        return null;
    }

    const originalHead: ListNode = head;

    // reverse first `k` nodes
    let curr: ListNode | null;
    [head, curr] = reverse(head, k);

    // link the original head node with the current node ((k+1)'th node)
    originalHead.next = curr;

    // skip next `k-1` nodes
    curr = skipKNodes(curr, k - 1);

    // recur for the remaining list and link it to the current node
    if (curr) {
        curr.next = reverseAlternatingKNodes(curr.next, k);
    }

    // return head node
    return head;
}

// construct a singly linked list
let head: ListNode | null = null;
for (let i = 9; i >= 0; i--) {
    head = new ListNode(i + 1, head);
}

const k = 2;

printList('Original linked list ', head);
head = reverseAlternatingKNodes(head, k);
printList('Resultant linked list', head);
```

**Output:** Original linked list: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> nullptr Resultant linked list: 2 —> 1 —> 3 —> 4 —> 6 —> 5 —> 7 —> 8 —> 10 —> 9 —> nullptr



The time complexity of the above recursive solution is O(n), where `n` is the length of the linked list. The auxiliary space required by the program for the call stack is proportional to the lists’ length.

**Related Post:**

> [Reverse every group of `k` nodes in a linked list](https://techiedelight.com/reverse-every-k-nodes-of-a-linked-list/)
