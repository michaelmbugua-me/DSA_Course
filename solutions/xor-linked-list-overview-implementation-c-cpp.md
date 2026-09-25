# XOR Linked List – Overview and Implementation in C/C++

> Source: https://www.techiedelight.com/xor-linked-list-overview-implementation-c-cpp/

This post will discuss the XOR linked list, which is used to reduce memory requirements of doubly-linked lists using a bitwise XOR operator.

We know that each node of a doubly-linked list requires _two_ pointer fields to store its previous and next node’s addresses. On the other hand, each node of the XOR linked list requires only a _single_ pointer field, which doesn’t store the actual memory addresses but stores the bitwise XOR of address for its previous and next node.

To illustrate, let’s consider the following doubly linked list:

Here the _link_ field for an equivalent XOR linked list stores the following values:

link(A) = NULL ^ addr(B) // bitwise XOR of NULL with address of node B link(B) = addr(A) ^ addr(C) // bitwise XOR between the address of node A and C link(C) = addr(B) ^ addr(D) // bitwise XOR between the address of node B and D link(D) = addr(C) ^ NULL // bitwise XOR of the address of node A with NULL

How this helps?

We know that XOR has the following properties:

X^X = 0 X^0 = X X^Y = Y^X

We can easily traverse the XOR linked list in either direction using the above properties:

1\. Traversing the list from left to right:

Since we are traversing the list from left to right, say we store the previous node’s address in some variable. As the previous node information is available, we can get the next node’s address by _XOR_ ing the value in the link field with the previous node’s address.

For example, suppose we are at node `C`, we can get the address of node `D`, as shown below.

addr(B) ^ link(C) = addr(B) ^ (addr(B) ^ addr(D)) = 0 ^ addr(D) = addr(D)

The XOR operation cancels `addr(B)` appearing twice in the equation, and all we are left with is the `addr(D)`. Similarly, to get the address of the first node A in the list, we can XOR the value in the link field with `NULL`.

NULL ^ link(A) = NULL ^ (NULL ^ addr(B)) = 0 ^ addr(B) = addr(B)

2\. Traversing the list from right to left:

Following a similar logic, to get the address of the last node `D` in the list, XOR the `D's` link field value with `NULL`:

NULL ^ link(D) = NULL ^ (addr(C) ^ NULL) = 0 ^ addr(C) = addr(C)

For any middle node, say node `C`, we can get the address of the previous node `B` as follows.

addr(D) ^ link(C) = addr(D) ^ (addr(B) ^ addr(D)) = 0 ^ addr(B) = addr(B)

Consider the following program, which constructs an XOR linked list and traverses it in a forward direction using bitwise XOR operator properties. To traverse the complete list, maintain three-pointers `prev`, `curr`, and `next` to store the current node address, the previous node address, and the next node address, respectively. Each iteration of the loop moves these pointers one position forward or backward depending upon which direction we are traversing the list.

The implementation can be seen below in TypeScript. Since JavaScript has no pointer-to-integer casts, each node is given a unique numeric id and the link field stores the XOR of the previous and next node ids, which mimics the C/C++ pointer-XOR behavior:

```ts
// Data structure to store a XOR linked list node
class Node {
    static idCounter = 0;

    id = ++Node.idCounter;   // unique numeric id, acting as the node "address"
    link = 0;                // XOR of the previous and next node ids

    data: number;
    constructor(data: number) {}
}

// Registry mapping node ids to nodes (stands in for C/C++ memory addresses)
const registry = new Map<number, Node>();

// Helper function to return the node obtained by XOR-ing the id of `x`
// and the given link value (0 stands in for a null address)
function XOR(x: Node | null, link: number): Node | null {
    const id = (x ? x.id : 0) ^ link;
    return registry.get(id) ?? null;
}

// Helper function to traverse the list in a forward direction
function traverse(head: Node | null): void {
    let curr = head;
    let prev: Node | null = null;
    let next: Node | null;

    while (curr !== null) {
        process.stdout.write(curr.data + ' —> ');

        // `next` node would be xor of the address of the previous node
        // and current node link
        next = XOR(prev, curr.link);

        // update `prev` and `curr` pointers for the next iteration of the loop
        prev = curr;
        curr = next;
    }

    process.stdout.write('null');
}

// Helper function to insert a node at the beginning of the XOR linked list
function push(headRef: Node | null, data: number): Node {
    // allocate a new list node and set its data
    const newNode = new Node(data);
    registry.set(newNode.id, newNode);

    // The link field of the new node is the id of the current head
    // (XOR of the current head id and null/0), since a new node is
    // being inserted at the beginning
    newNode.link = headRef ? headRef.id : 0;

    // update link value of the current head node if the linked list is not empty
    if (headRef) {
        // `headRef.link` is XOR of null (0) and id of the next node.
        // To get the id of the next node, XOR it with the new node's id
        headRef.link = newNode.id ^ headRef.link;
    }

    // return the new head
    return newNode;
}

// input keys
const keys = [1, 2, 3, 4, 5];

let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = push(head, keys[i]);
}

traverse(head);
```

Drawbacks of XOR linked list:

An XOR linked list is similar to a doubly-linked list but not completely equivalent to a doubly-linked list. There are several disadvantages of an XOR linked list over a doubly-linked list, which is discussed below:

  1. A doubly-linked list is easy to code and maintain, but it is a little complex for an XOR linked list.
  2. XOR linked list is not supported by several languages such as Java, where conversion between pointers and integers is undefined.
  3. If a pointer to an existing middle node in an XOR linked list is provided, we can’t delete that node from the list or insert a new node before or after it. On the other hand, this can be done easily with a doubly-linked list.

**References:** [XOR linked list – Wikipedia](https://en.wikipedia.org/wiki/XOR_linked_list)

Also See:

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Delete every `N` nodes in a linked list after skipping `M` nodes](https://www.techiedelight.com/delete-every-n-nodes-linked-list-skipping-m-nodes/ "Delete every `N` nodes in a linked list after skipping `M` nodes")

> [Reverse a doubly linked list](https://www.techiedelight.com/reverse-doubly-linked-list/ "Reverse a doubly linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 268

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
