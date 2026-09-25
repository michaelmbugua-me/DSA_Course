# Find k’th node from the end of a linked list

> Source: https://www.techiedelight.com/find-kth-node-from-the-end-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list and a positive integer `k`, find the `k'th` node from the end of the list.

> 

## Iterative Solution

A simple solution is to calculate the total number of nodes `n` in the linked list first. Then, the `k'th` node from the end will be `(n-k+1)'th` node from the beginning.

Following is a TypeScript program that demonstrates it:

```ts
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Iterative function to return the k'th node from the end in a linked list
function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {

    let n = 0;
    let curr = head;

    // count the total number of nodes in the linked list
    while (curr) {
        curr = curr.next;
        n = n + 1;
    }

    // if the total number of nodes is more than or equal to `k`
    if (n >= k) {
        // return (n-k+1)'th node from the beginning
        curr = head;
        for (let i = 0; i < n - k; i++) {
            curr = curr.next;
        }
    }

    return curr;
}

let head: ListNode | null = null;
for (let i = 4; i >= 0; i--) {
    head = new ListNode(i + 1, head);
}

const k = 3;
const node = getKthFromEnd(head, k);

if (node) {
    console.log(`k'th node from the end is ${node.data}`);
}
```

**Output:** k’th node from the end is 3

The above solution does two traversals of the linked list. We can solve this problem in a single list traversal only. The idea is to start from the head node and move a pointer `k` nodes ahead in the given list. Then, take another pointer starting from the head node and run both pointers in parallel till the first pointer reaches the end of the list. Now, the second pointer will point to the `k'th` node from the end.

The algorithm can be implemented as follows in TypeScript:

```ts
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Iterative function to return the k'th node from the end in a linked list
function findKthNode(head: ListNode | null, k: number): ListNode | null {

    let curr = head;

    // move `k` nodes ahead in the linked list
    for (let i = 0; i < k; i++) {
        // return if `k` is more than the total number of nodes in the list
        if (curr === null) {
            return null;
        }
        curr = curr.next;
    }

    // move the `head` and `curr` parallelly till `curr` reaches the end of the list
    while (curr) {
        head = head.next;
        curr = curr.next;
    }

    // `head` will now contain the k'th node from the end
    return head;
}

// input keys
const keys = [1, 2, 3, 4, 5];

let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

const k = 3;
const node = findKthNode(head, k);

if (node) {
    console.log(`k'th node from the end is ${node.data}`);
}
```

**Output:** k’th node from the end is 3

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

## Recursive Solution

This is a nice problem where the recursive solution code is much cleaner than the iterative code. You probably wouldn’t want to use the recursive version for production code because it will use stack space, which is proportional to the lists’ length.

The recursive implementation can be seen below in TypeScript:

```ts
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Recursive function to return the k'th node from the end in a linked list
function findKthNode(node: ListNode | null, k: number): number {
    // base case
    if (node === null) {
        return 0;
    }

    let count = findKthNode(node.next, k) + 1;

    if (count === k) {
        console.log(`k'th node from the end is ${node.data}`);
    }

    return count;
}

// input keys
const keys = [1, 2, 3, 4, 5];

let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

const k = 3;
findKthNode(head, k);
```

**Output:** k’th node from the end is 3
