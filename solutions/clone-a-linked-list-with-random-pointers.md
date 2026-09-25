# Clone a linked list with random pointer

> Source: https://www.techiedelight.com/clone-a-linked-list-with-random-pointers/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write an efficient code to clone a linked list with each node containing an additional random pointer. The random pointer can point to any random node of the linked list or null.

> 

## 1\. Linear time solution using extra space

To clone a linked list with random pointers, maintain a [hash table](https://techiedelight.com/hashing-in-data-structure/) for storing the mappings from a linked list node to its clone. We create a new node with the same data for each node in the original linked list and recursively set its next pointers. We also create a mapping from the original node to the duplicate node in the hash table. Finally, traverse the original linked list again and update the duplicate nodes’ random pointers using the hash table.

This is demonstrated below in TypeScript:

```ts
// A linked list node with a random pointer
class Node {
    constructor(public data: number, public next: Node | null = null, public random: Node | null = null) {}
}

// Recursive function to print a linked list
function traverse(head: Node | null): string {
    if (head === null) {
        return 'null';
    }

    // print current node data and random pointer data
    const randomData = head.random ? head.random.data : 'X';

    // recur for the next node
    return `${head.data}(${randomData}) —> ` + traverse(head.next);
}

// Recursive function to copy random pointers from the original linked list
// into the cloned linked list using the map
function updateRandomPointers(head: Node | null, map: Map<Node, Node>): void {
    // base case
    if (head === null || !map.has(head)) {
        return;
    }

    // update the random pointer of the cloned node
    map.get(head)!.random = head.random ? (map.get(head.random) ?? null) : null;

    // recur for the next node
    updateRandomPointers(head.next, map);
}

// Recursive function to clone the data and next pointer for each node
// of the linked list into a given map
function cloneLinkedList(head: Node | null, map: Map<Node, Node>): Node | null {
    // base case
    if (head === null) {
        return null;
    }

    // clone all fields of the head node except the random pointer

    // create a new node with the same data as the head node
    map.set(head, new Node(head.data));

    // clone the next node
    map.get(head)!.next = cloneLinkedList(head.next, map);

    // return cloned head node
    return map.get(head)!;
}

// Function to clone a linked list having random pointers
function cloneList(head: Node | null): Node | null {
    // create a map to store mappings from a node to its clone
    const map = new Map<Node, Node>();

    // clone data and next pointer for each node of the original
    // linked list and put references into the map
    cloneLinkedList(head, map);

    // update random pointers from the original linked list in the map
    updateRandomPointers(head, map);

    // return the cloned head node
    return map.get(head)!;
}

// construct the linked list 1 —> 2 —> 3 —> 4 —> 5
const head = new Node(1,
    new Node(2,
        new Node(3,
            new Node(4, new Node(5)))));

head.random = head.next!.next!.next!;
head.next!.next!.random = head.next!;

console.log('Original Linked List:');
console.log(traverse(head));

const clone = cloneList(head);

console.log('\nCloned Linked List:');
console.log(traverse(clone));
```



**Output:** Original linked list: 1(4) —> 2(X) —> 3(2) —> 4(X) —> 5(X) —> null Cloned linked list: 1(4) —> 2(X) —> 3(2) —> 4(X) —> 5(X) —> null

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and requires O(n) extra space for the map and call stack.

## 2\. Linear time solution using constant space

A hash table is used in the previous approach, which accounts for the O(n) space complexity. We can improve the space complexity to constant if we find a space-efficient way to track the new nodes. We can do this by linking the new nodes with their original nodes in the linked list itself.

The idea is to create a duplicate of each linked list node and associate each duplicate node with the original node’s next child. Then iterate the modified list and update the random pointers of the new nodes. Finally, extract the duplicate nodes from the modified list, hence restoring the original linked list.

Following is a TypeScript implementation of the idea:

```ts
// A linked list node with a random pointer
class Node {
    constructor(public data: number, public next: Node | null = null, public random: Node | null = null) {}
}

// Function to print a linked list
function traverse(head: Node | null): void {
    // traverse the linked list
    let out = '';
    while (head !== null) {
        // print current node data and random pointer data
        out += `${head.data}(${head.random ? head.random.data : 'X'}) —> `;

        // advance to the next node
        head = head.next;
    }

    console.log(out + 'null');
}

// Function to clone a linked list having random pointers
function cloneLinkedList(head: Node | null): Node | null {
    /* 1. Create a duplicate of each node of the original linked list */

    // traverse the original linked list
    let curr = head;
    while (curr !== null) {
        // take a pointer to the next node in the original list
        const next = curr.next;

        // duplicate each node of the linked list
        const dup = new Node(curr.data);

        // associate each duplicate node with the next child of the original node
        curr.next = dup;
        dup.next = next;

        // advance to the next node in the original list
        curr = next;
    }

    /* 2. Update the random pointers of the duplicated nodes */

    // traverse the modified list
    curr = head;
    while (curr !== null) {
        // if a random pointer for the original node exists, set it for the clone
        if (curr.random !== null) {
            curr.next!.random = curr.random.next;
        }

        // advance to the next node in the original list
        curr = curr.next!.next;
    }

    /* 3. Extract the duplicate nodes from the modified list */

    // construct a dummy node whose next pointer points to the head
    // of the cloned linked list
    const dummy = new Node(-1);

    // maintain a tail node for the clone
    let tail = dummy;

    // traverse the modified list
    curr = head;
    while (curr !== null) {
        // take a pointer to the next node in the original list
        const next = curr.next!.next;

        // extract the duplicate
        const dup = curr.next;
        tail.next = dup;
        tail = dup!;

        // restore the original linked list
        curr.next = next;

        // advance to the next node in the original list
        curr = next;
    }

    // return head node of the cloned list
    return dummy.next;
}

// construct the linked list 1 —> 2 —> 3 —> 4 —> 5
const head = new Node(1,
    new Node(2,
        new Node(3,
            new Node(4, new Node(5)))));

head.random = head.next!.next!.next!;
head.next!.next!.random = head.next!;

console.log('Original linked list:');
traverse(head);

const clone = cloneLinkedList(head);

console.log('\nCloned linked list:');
traverse(clone);
```



**Output:** Original linked list: 1(4) —> 2(X) —> 3(2) —> 4(X) —> 5(X) —> null Cloned linked list: 1(4) —> 2(X) —> 3(2) —> 4(X) —> 5(X) —> null
