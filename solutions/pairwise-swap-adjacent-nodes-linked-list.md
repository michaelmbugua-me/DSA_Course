# Pairwise swap adjacent nodes of a linked list

> Source: https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, pairwise swap its adjacent nodes. The swapping of data is not allowed, only links should be changed.

For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> NULL **Output:** 2 —> 1 —> 4 —> 3 —> 6 —> 5 —> 8 —> 7 —> NULL

> 

The idea is to traverse the linked list, consider two nodes simultaneously, and swap their links. This looks simple enough but needs special attention while exchanging the links.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {

    process.stdout.write(msg);
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log('null');
}

// Function to pairwise swap adjacent nodes of a linked list
function rearrange(head: ListNode | null): ListNode | null {

    // if the list is empty or contains just one node
    if (head === null || head.next === null) {
        return head;
    }

    let curr: ListNode | null = head;
    let prev: ListNode | null = null;

    // consider two nodes at a time and swap their links
    while (curr !== null && curr.next !== null) {
        const temp: ListNode | null = curr.next;
        if (temp === null) {
            break;
        }
        curr.next = temp.next;
        temp.next = curr;

        if (prev === null) {
            head = temp;
        } else {
            prev.next = temp;
        }

        prev = curr;
        curr = curr.next;
    }

    return head;
}

let head: ListNode | null = null;
for (let i = 8; i >= 1; i--) {
    head = new ListNode(i, head);
}

printList('Before : ', head);
head = rearrange(head);
printList('After : ', head);
```

**Output:** Before: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> NULL After : 2 —> 1 —> 4 —> 3 —> 6 —> 5 —> 8 —> 7 —> NULL

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

We can also write a [recursive version](https://techiedelight.com/recursion-practice-problems-with-solutions/) of the above program. The idea remains the same, but here we pass the next pair information and the previous node through recursion.

```ts
// A Linked List Node
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {

    process.stdout.write(msg);
    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log('null');
}

// Function to pairwise swap adjacent nodes of a linked list
function rearrange(head: ListNode | null, prev: ListNode | null = null): ListNode | null {

    // base case: if the list is empty or contains just one node
    if (head === null || head.next === null) {
        return head;
    }

    const curr = head;
    const temp = curr.next!;
    curr.next = temp.next;
    temp.next = curr;

    if (prev === null) {
        head = temp;
    } else {
        prev.next = temp;
    }

    prev = curr;
    rearrange(curr.next, prev);

    return head;
}

let head: ListNode | null = null;
for (let i = 8; i >= 1; i--) {
    head = new ListNode(i, head);
}

printList('Before: ', head);
head = rearrange(head);
printList('After : ', head);
```
