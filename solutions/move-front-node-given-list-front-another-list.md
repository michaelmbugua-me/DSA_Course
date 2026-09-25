# Move the front node of a linked list in front of another list

> Source: https://www.techiedelight.com/move-front-node-given-list-front-another-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two linked lists, move front node of the second list in front of the first list.

For example,

**Input:** First List: 1 —> 2 —> 3 —> null Second List: 6 —> 4 —> 2 —> null **Output:** First List: 6 —> 1 —> 2 —> 3 —> null Second List: 4 —> 2 —> null

> 

This is a variant on [push()](https://techiedelight.com/linked-list-implementation-part-1/). Instead of creating a new node and pushing it onto the given list, it takes two lists, removes the front node from the second list, and moves it to the front of the first. This turns out to be a handy utility function to have for several later problems.

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

// construct the first linked list
let a: ListNode | null = null;
for (let i = 3; i >= 1; i--) {
    a = new ListNode(i, a);
}

// construct the second linked list
let b: ListNode | null = null;
for (let i = 1; i <= 3; i++) {
    b = new ListNode(2 * i, b);
}

if (b) {

    // take the node from the front of list `b` and move it
    // to the front of the list `a`

    const newNode = b;   // the front source node
    b = b.next;          // advance the source

    newNode.next = a;    // link the old dest off the new node
    a = newNode;         // move dest to point to the new node
}

// print both lists
printList('First List: ', a);
printList('Second List: ', b);
```

**Output:** First List: 6 —> 1 —> 2 —> 3 —> NULL Second List: 4 —> 2 —> NULL

The time complexity of the above solution is O(1).

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Also See:

> [Move the last node to the front of a linked list](https://www.techiedelight.com/move-last-node-to-front-linked-list/ "Move the last node to the front of a linked list")

> [Move even nodes to the end of the linked list in reverse order](https://www.techiedelight.com/move-even-nodes-to-end-of-list-in-reverse-order/ "Move even nodes to the end of the linked list in reverse order")

> [Merge two sorted linked lists from their end](https://www.techiedelight.com/merge-two-sorted-linked-lists-end/ "Merge two sorted linked lists from their end")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 145

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
