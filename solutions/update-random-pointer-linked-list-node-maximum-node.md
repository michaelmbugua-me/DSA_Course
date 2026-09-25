# Update random pointer for each linked list node to point to the maximum node

> Source: https://www.techiedelight.com/update-random-pointer-linked-list-node-maximum-node/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list with each node having an additional random pointer that points to any random node of the linked list or null, update the random pointer in each linked list node to point to a node with maximum value to its right.

> 

A naive solution would be to traverse the list, and for each encountered node, find the node with maximum value by traversing the remaining list again. The time complexity of this approach is O(n2), where `n` is the total number of nodes in the linked list.

If the given list was doubly linked, we could have easily updated the random pointers with maximum value node by traversing the list from the end. This would require only a single traversal of the linked list.

We can still solve this problem in linear time for a singly linked list. The idea is to [reverse the list first](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/), traverse the reversed list, and maintain a pointer that points to the node with the maximum value found so far. Then for each encountered node, update its random pointer to point to the maximum value node so far. Finally, restore the list’s original order (i.e., reverse it again).

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class Node {
    random: Node | null = null;

    constructor(public data: number, public next: Node | null = null) {}
}

// Function to print a linked list with a random pointer
function printList(msg: string, head: Node | null): void {
    process.stdout.write(msg);
    while (head) {
        process.stdout.write(String(head.data));
        process.stdout.write((head.random ? `(${head.random.data})` : '(X)') + ' —> ');
        head = head.next;
    }
    console.log('X');
}

// Function to reverse a linked list by changing its `.next` pointers
// and its head pointer.
function reverse(head: Node | null): Node | null {
    let prev: Node | null = null;   // the previous pointer
    let curr = head;                // the main pointer

    // traverse the list
    while (curr) {
        // tricky: note the next node
        const next = curr.next;

        curr.next = prev;   // fix the `curr` node

        // advance the two pointers
        prev = curr;
        curr = next;
    }

    // fix the head pointer to point to the front
    return prev;
}

// Function to update random pointer of each linked list node
// to point to a node with maximum value to their right
function setRandomNodes(head: Node | null): Node | null {
    // Reverse the linked list
    head = reverse(head);

    // max points to the node with maximum value
    let max = head;
    head.random = null;

    // start from the second node in the list
    let node = head.next;
    while (node) {
        // update random pointer of the current node to point to the
        // maximum node so far
        node.random = max;

        // update max if the current node is greater
        if (max.data < node.data) {
            max = node;
        }

        // advance to the next node
        node = node.next;
    }

    // restore the linked list original order
    return reverse(head);
}

// input keys
const keys = [5, 10, 7, 9, 4, 3];

let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

printList('Original linked list: ', head);

// assign random nodes
setRandomNodes(head);

printList('Final Linked List: ', head);
```

The time complexity of the above solution O(n2), and doesn’t require any extra space. But it requires three traversals of the linked list.

We can simplify the above code using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to recursively call the next node of the linked list and update each node’s random pointer with the maximum value node found so far as the recursion unfolds. This is demonstrated below in TypeScript:

```ts
// A Linked List Node
class Node {
    random: Node | null = null;

    constructor(public data: number, public next: Node | null = null) {}
}

// Function to print a linked list with a random pointer
function printList(msg: string, head: Node | null): void {
    process.stdout.write(msg);
    while (head) {
        process.stdout.write(String(head.data));
        process.stdout.write((head.random ? `(${head.random.data})` : '(X)') + ' —> ');
        head = head.next;
    }
    console.log('X');
}

// Recursive function to update random pointer of each linked list node
// to point to a node with maximum value to their right
function setRandomNodes(head: Node | null): Node | null {
    // base case 1: empty list
    if (head === null) {
        return null;
    }

    // base case 2: last node
    if (head.next === null) {
        head.random = null;
        return head;
    }

    // max points to the node with the maximum value found so far
    // to the right of the head node
    const max = setRandomNodes(head.next);

    // update random pointer of the current node to point to the
    // maximum node so far
    head.random = max;

    // update max if the current node is greater and returns it
    return max.data > head.data ? max : head;
}

// input keys
const keys = [5, 10, 7, 9, 4, 3];

let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

printList('Original List: ', head);

// assign random nodes
setRandomNodes(head);

printList('Final List: ', head);
```
