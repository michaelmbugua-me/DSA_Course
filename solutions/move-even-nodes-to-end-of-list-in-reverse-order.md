# Move even nodes to the end of the linked list in reverse order

> Source: https://www.techiedelight.com/move-even-nodes-to-end-of-list-in-reverse-order/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Rearrange a given linked list such that every even node will be moved to the end of the list in reverse order.

For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> null **Output:** 1 —> 3 —> 5 —> 7 —> 6 —> 4 —> 2 —> null

> 

The idea is to use the [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) function. The function takes a node from the front of the source and moves it to the destination’s front. Here, the source node will be even nodes in the given list, and the destination will be a new list. After we have moved every even node, append the new list, which now contains the even nodes in reverse order to the original list.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
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

// Function to rearrange the given list such that every even node will be
// moved to the end of the list in reverse order.
function rearrange(head: ListNode | null): void {

    // empty list
    if (head === null) {
        return;
    }

    // maintain two lists, odd and even
    let odd: ListNode | null = head;
    let even: ListNode | null = null;
    let prev: ListNode | null = null;

    // do for each odd node
    while (odd && odd.next) {

        // "move" next node (which will be even) to the front of the even list
        if (odd.next) {
            const newNode = odd.next;   // the front source node
            odd.next = odd.next.next;   // advance the source

            newNode.next = even;        // link the old dest off the new node
            even = newNode;             // move dest to point to the new node
        }

        // update `prev` and move to the next odd node
        prev = odd;
        odd = odd.next;
    }

    // append even list to odd list
    if (odd) {
        odd.next = even;
    } else if (prev) {
        prev.next = even;
    }
}

// construct the first linked list
let head: ListNode | null = null;
for (let i = 7; i >= 1; i--) {
    head = new ListNode(i, head);
}

printList('Before: ', head);

// rearrange the references to the given list
rearrange(head);
printList('After: ', head);
```

**Output:** Before: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL After: 1 —> 3 —> 5 —> 7 —> 6 —> 4 —> 2 —> NULL

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list. The auxiliary space required by the program is constant.

Also See:

> [Move the last node to the front of a linked list](https://www.techiedelight.com/move-last-node-to-front-linked-list/ "Move the last node to the front of a linked list")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Move the front node of a linked list in front of another list](https://www.techiedelight.com/move-front-node-given-list-front-another-list/ "Move the front node of a linked list in front of another list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
