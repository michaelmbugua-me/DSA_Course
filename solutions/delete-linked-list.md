# Delete a linked list in C/C++

> Source: https://www.techiedelight.com/delete-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write a function that takes a linked list, deallocates all of its memory, and sets its head pointer to NULL (the empty list).

The idea is to iterate through the list and delete each node encountered. There is a slight complication inside the loop since we need to extract the `.next` pointer before deleting the node since it will be technically unavailable after the delete.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
  constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to create a new node with the given data and
// pushes it onto the list's front
function push(head: ListNode | null, data: number): ListNode {
  const newNode = new ListNode(data);
  newNode.next = head;
  return newNode;
}

// Iterative function to delete a linked list
function deleteList(head: ListNode | null): ListNode | null {
  let prev = head;

  while (head !== null) {
    head = head.next;

    console.log(`Deleting ${prev!.data}`);
    // garbage collection handles deallocation in JS/TS
    prev = head;
  }

  return null;
}

// input keys
const keys = [1, 2, 3, 4, 5];

// points to the head node of the linked list
let head: ListNode | null = null;

// construct a linked list
for (let i = keys.length - 1; i >= 0; i--) {
  head = push(head, keys[i]);
}

head = deleteList(head);

if (head === null) {
  console.log("List deleted");
}
```

**Output:** Deleting 1 Deleting 2 Deleting 3 Deleting 4 Deleting 5 List deleted

We can easily convert the above iterative version into a recursive one. Following is the simple recursive implementation in TypeScript:

```ts
// A Linked List Node
class ListNode {
  constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to create a new node with the given data and
// pushes it onto the list's front
function push(head: ListNode | null, data: number): ListNode {
  const newNode = new ListNode(data);
  newNode.next = head;
  return newNode;
}

// Recursive function to delete a linked list
function deleteList(head: ListNode | null): ListNode | null {
  if (head === null) {
    return null;
  }

  if (head.next) {
    head.next = deleteList(head.next);
  }

  console.log(`Deleting ${head.data}`);
  // garbage collection handles deallocation in JS/TS

  return null;
}

// input keys
const keys = [1, 2, 3, 4, 5];

// points to the head node of the linked list
let head: ListNode | null = null;

// construct a linked list
for (let i = keys.length - 1; i >= 0; i--) {
  head = push(head, keys[i]);
}

head = deleteList(head);

if (head === null) {
  console.log("List deleted");
}
```

**Output:** Deleting 5 Deleting 4 Deleting 3 Deleting 2 Deleting 1 List deleted

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and requires extra space for the call stack.

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>
