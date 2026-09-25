# Intersection of two sorted linked lists

> Source: https://www.techiedelight.com/intersection-two-given-sorted-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two lists sorted in increasing order, return a new list representing their intersection. The new list should be made with its own memory – the original lists should not be changed.

For example,

**Input:** First List: 1 —> 4 —> 7 —> 10 —> null Second List: 2 —> 4 —> 6 —> 8 —> 10 —> null **Output:** 4 —> 10 —> null

> 

The strategy is to advance up both lists and build the result list as we go. When the current point in both lists is the same, add a node to the result. Otherwise, advance whichever list is smaller. By exploiting the fact that both lists are sorted, we only traverse each list once.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public val: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {

    process.stdout.write(msg);
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(ptr.val + ' —> ');
        ptr = ptr.next;
    }

    console.log('null');
}

// Compute a new sorted list representing the intersection
// of the two given sorted lists without using a dummy node
function sortedIntersect(a: ListNode | null, b: ListNode | null): ListNode | null {

    let head: ListNode | null = null;
    let tail: ListNode | null = null;

    // once one or the other list runs out — we are done
    while (a !== null && b !== null) {

        if (a.val === b.val) {
            if (head === null) {
                head = new ListNode(a.val, head);
                tail = head;
            } else {
                tail.next = new ListNode(a.val, tail.next);
                tail = tail.next;
            }

            a = a.next;
            b = b.next;
        }

        // advance the smaller list
        else if (a.val < b.val) {
            a = a.next;
        } else {
            b = b.next;
        }
    }

    return head;
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let a: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i = i - 3) {
    a = new ListNode(keys[i], a);
}

let b: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i = i - 2) {
    b = new ListNode(keys[i], b);
}

// print both lists
printList('First List: ', a);
printList('Second List: ', b);

const head = sortedIntersect(a, b);
printList('After Intersection: ', head);
```

**Output:** First List: 1 —> 4 —> 7 —> 10 —> NULL Second List: 2 —> 4 —> 6 —> 8 —> 10 —> NULL After Intersection: 4 —> 10 —> NULL

To build up the result list, we can also use both the dummy node and local reference strategy. These solutions are implementated below:

## 1\. Using Dummy Node

```ts
// A Linked List Node
class ListNode {
    constructor(public val: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {

    process.stdout.write(msg);
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(ptr.val + ' —> ');
        ptr = ptr.next;
    }

    console.log('null');
}

// Compute a new sorted list representing the intersection
// of the two given sorted lists. This solution uses the temporary
// dummy to build up the result list.
function sortedIntersect(a: ListNode | null, b: ListNode | null): ListNode | null {

    const dummy = new ListNode(0);
    let tail = dummy;

    // once one or the other list runs out — we are done
    while (a !== null && b !== null) {

        if (a.val === b.val) {
            tail = tail.next = new ListNode(a.val, tail.next);
            a = a.next;
            b = b.next;
        }
        // advance the smaller list
        else if (a.val < b.val) {
            a = a.next;
        } else {
            b = b.next;
        }
    }

    return dummy.next;
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let a: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i = i - 3) {
    a = new ListNode(keys[i], a);
}

let b: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i = i - 2) {
    b = new ListNode(keys[i], b);
}

// print both lists
printList('First List: ', a);
printList('Second List: ', b);

const head = sortedIntersect(a, b);
printList('After Intersection: ', head);
```

**Output:** First List: 1 —> 4 —> 7 —> 10 —> NULL Second List: 2 —> 4 —> 6 —> 8 —> 10 —> NULL After Intersection: 4 —> 10 —> NULL

## 2\. Using Local References

```ts
// A Linked List Node
class ListNode {
    constructor(public val: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {

    process.stdout.write(msg);
    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(ptr.val + ' —> ');
        ptr = ptr.next;
    }

    console.log('null');
}

// Compute a new sorted list representing the intersection of the
// two given sorted lists. This solution uses the local reference
function sortedIntersect(a: ListNode | null, b: ListNode | null): ListNode | null {

    let result: ListNode | null = null;

    // the local reference tracks the slot where the next node is attached:
    // either the result head or the last node's `next` field
    // (emulates C's pointer-to-pointer `lastPtrRef`)
    let lastPtrRef: { parent: ListNode | null } = { parent: null };

    // advance comparing the first nodes in both lists.
    // When one or the other list runs out, we are done.
    while (a !== null && b !== null) {

        // found a node for the intersection
        if (a.val === b.val) {
            const node = new ListNode(a.val, null);
            if (lastPtrRef.parent === null) {
                result = node;                  // attach at the head slot
            } else {
                lastPtrRef.parent.next = node;  // attach after the last node
            }
            lastPtrRef.parent = node;           // advance the local reference
            a = a.next;
            b = b.next;
        }
        // advance the smaller list
        else if (a.val < b.val) {
            a = a.next;
        } else {
            b = b.next;
        }
    }

    return result;
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

let a: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i = i - 3) {
    a = new ListNode(keys[i], a);
}

let b: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i = i - 2) {
    b = new ListNode(keys[i], b);
}

// print both lists
printList('First List: ', a);
printList('Second List: ', b);

const head = sortedIntersect(a, b);
printList('After Intersection: ', head);
```
