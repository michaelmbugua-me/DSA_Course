# Detect cycle in a linked list (Floyd’s Cycle Detection Algorithm)

> Source: https://www.techiedelight.com/detect-cycle-linked-list-floyds-cycle-detection-algorithm/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

This post will detect cycles in a linked list using hashing and Floyd’s cycle detection algorithm.

For example, the following linked list has a cycle in it:

> 

## 1\. Using Hashing

A simple solution is to use [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the given list and insert each encountered node into a set. If the current node already presents in the set (i.e., it is seen before), that means a cycle is present in the list.

Following is the TypeScript program that demonstrates it:

```ts
// A Linked List Node
class ListNode {
  constructor(public data: number, public next: ListNode | null = null) {}
}

// Function to detect a cycle in a linked list using hashing
function detectCycle(head: ListNode | null): boolean {
  let curr = head;
  const seen = new Set<ListNode>();

  // traverse the list
  while (curr !== null) {
    // return false if we already have seen this node before
    if (seen.has(curr)) {
      return true;
    }

    // insert the current node into the set
    seen.add(curr);

    // move to the next node
    curr = curr.next;
  }

  // we reach here if the list does not contain any cycle
  return false;
}

let head: ListNode | null = null;
for (let i = 5; i >= 1; i--) {
  head = new ListNode(i, head);
}

// insert cycle
head!.next!.next!.next!.next!.next = head!.next!.next;

if (detectCycle(head)) {
  console.log("Cycle Found");
} else {
  console.log("No Cycle Found");
}
```

**Output:** Cycle Found

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list. The auxiliary space required by the program is O(n).

## 2\. Floyd’s Cycle Detection Algorithm

Floyd’s cycle detection algorithm is a pointer algorithm that uses only two pointers, which move through the sequence at different speeds. The idea is to move the fast pointer twice as quickly as the slow pointer, and the distance between them increases by one at each step. If we both meet at some point, we have found a cycle in the list; otherwise, no cycle is present if the end of the list is reached. It is also called the “tortoise and the hare algorithm”.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
  constructor(public data: number, public next: ListNode | null = null) {}
}

// Function to detect a cycle in a linked list using
// Floyd’s cycle detection algorithm
function detectCycle(head: ListNode | null): boolean {
  // take two references – `slow` and `fast`
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (fast !== null && fast.next !== null) {
    // move slow by one
    slow = slow!.next;

    // move fast by two
    fast = fast.next.next;

    // if they meet any node, the linked list contains a cycle
    if (slow === fast) {
      return true;
    }
  }

  // we reach here if slow and fast do not meet
  return false;
}

let head: ListNode | null = null;
for (let i = 5; i >= 1; i--) {
  head = new ListNode(i, head);
}

// insert cycle
head!.next!.next!.next!.next!.next = head!.next!.next;

if (detectCycle(head)) {
  console.log("Cycle Found");
} else {
  console.log("No Cycle Found");
}
```

**Output:** Cycle Found

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.
