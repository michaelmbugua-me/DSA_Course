# Rearrange linked list so that it has alternating high and low values

> Source: https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list of integers, rearrange it such that every second node of the linked list is greater than its left and right nodes. In other words, rearrange the linked list node in alternating high-low.

Assume no duplicate nodes are present in the linked list. Several lists might satisfy the constraints; we need to print any one of them. For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 **Output:** 1 —> 3 —> 2 —> 5 —> 4 —> 7 —> 6 **Input:** 9 —> 6 —> 8 —> 3 —> 7 **Output:** 6 —> 9 —> 3 —> 8 —> 7 **Input:** 6 —> 9 —> 2 —> 5 —> 1 —> 4 **Output:** 6 —> 9 —> 2 —> 5 —> 1 —> 4

> 

The idea is to start from the second node in the linked list and advance two nodes in each iteration of the loop. If the previous node is greater than the current node, swap their values. Similarly, if the next node is greater than the current node, exchange both values. At the end of the loop, we will get the desired linked list that satisfies the given constraints.

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null = null;
    constructor(data: number, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Function to print a given linked list
function printList(head: Node | null): void {

    let ptr: Node | null = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log('null');
}

// Rearrange the linked list so that it has alternating high, low values
function rearrange(head: Node | null): Node | null {

    // empty list
    if (head === null) {
        return null;
    }

    let prev: Node | null = head;
    let curr: Node | null = head.next;

    // start from the second node
    while (curr) {

        // if the previous node is greater than the current node, swap their values
        if (prev !== null && prev.data > curr.data) {
            const temp = prev.data;
            prev.data = curr.data;
            curr.data = temp;
        }

        // if the next node is greater than the current node, swap their values
        const next = curr.next;
        if (next !== null && next.data > curr.data) {
            const temp = next.data;
            next.data = curr.data;
            curr.data = temp;
        }

        // update `prev` and `curr` node
        prev = next;

        if (next === null) {
            break;
        }

        curr = next.next;
    }

    return head;
}

// input keys
const keys = [1, 2, 3, 4, 5, 6, 7, 8, 6];

let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

head = rearrange(head);
printList(head);
```

**Output:** 1 —> 3 —> 2 —> 5 —> 4 —> 7 —> 6 —> 8 —> 6 —> null

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Pairwise swap adjacent nodes of a linked list](https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/ "Pairwise swap adjacent nodes of a linked list")

> [Move the last node to the front of a linked list](https://www.techiedelight.com/move-last-node-to-front-linked-list/ "Move the last node to the front of a linked list")

> [Rearrange linked list in a specific manner](https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/ "Rearrange linked list in a specific manner")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 184

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
