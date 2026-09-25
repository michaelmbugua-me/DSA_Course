# Sort linked list containing 0’s, 1’s, and 2’s in a single traversal

> Source: https://www.techiedelight.com/sort-linked-list-containing-0s-1s-2s/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list containing `0's`, `1's`, and `2's`, sort the linked list by doing a single traversal of it.

For example,

**Input:** 0 —> 1 —> 2 —> 2 —> 1 —> 0 —> 0 —> 2 —> 0 —> 1 —> 1 —> 0 —> NULL **Output:** 0 —> 0 —> 0 —> 0 —> 0 —> 1 —> 1 —> 1 —> 1 —> 2 —> 2 —> 2 —> NULL

> 

A simple solution would be to count the total number of `0's`, `1's`, and `2's` present in the linked list, traverse the linked list, and put them back in the correct order. The problem with this approach is that we need to do two traversals of the list, which violates the problem constraints.

We can solve this problem in a single traversal of the list. The idea is to maintain three-pointers zeros, ones, and twos. Then, traverse the list from head to end and move each node to the corresponding list depending on its value. Finally, combine all three lists at the end and fix the head pointer.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
}

// Function to print a given linked list
function printList(head: Node | null): void {

    let ptr = head;
    while (ptr !== null) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }
    console.log('null');
}

// Function to sort linked list containing 0's, 1's, and 2's in a single traversal
function sortList(head: Node | null): Node | null {

    // base case
    if (head === null || head.next === null) {
        return head;
    }

    // maintain three dummy nodes
    const first = new Node();
    const second = new Node();
    const third = new Node();

    // maintain three references
    let zero: Node = first;
    let one: Node = second;
    let two: Node = third;

    // traverse the list
    let curr: Node | null = head;
    while (curr !== null) {
        if (curr.data === 0) {
            zero.next = curr;
            zero = zero.next;
        }
        else if (curr.data === 1) {
            one.next = curr;
            one = one.next;
        }
        else {
            two.next = curr;
            two = two.next;
        }
        curr = curr.next;
    }

    // combine lists containing 0's, 1's, and 2's
    zero.next = second.next !== null ? second.next : third.next;
    one.next = third.next;
    two.next = null;

    // change head and return
    return first.next;
}

// input keys
const keys = [1, 2, 0, 0, 1, 2, 1, 2, 1];

let head: Node | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new Node(keys[i], head);
}

head = sortList(head);
printList(head);
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

**Related Post:**

> [Sort an array of 0’s, 1’s, and 2’s (Dutch National Flag Problem)](https://techiedelight.com/sort-array-containing-0s-1s-2s-dutch-national-flag-problem/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
