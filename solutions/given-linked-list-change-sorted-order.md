# Rearrange linked list in increasing order (Sort linked list)

> Source: https://www.techiedelight.com/given-linked-list-change-sorted-order/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, write a function to rearrange its nodes to be sorted in increasing order.

> 

The idea is to use the [sortedInsert()](https://techiedelight.com/sorted-insert-in-linked-list/) function to sort a linked list. We start with an empty result list. Iterate through the source list and `sortedInsert()` each of its nodes into the result list. Be careful to note the `.next` field in each node before moving it into the result list.

Following is a TypeScript program that demonstrates it:

```ts
// A Linked List Node
class ListNode {
    data: number = 0;
    next: ListNode | null = null;
    constructor(data: number = 0, next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {

    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.next;
    }

    console.log(out + 'null');
}

// Function to insert a given node at its correct sorted position into a given
// list sorted in increasing order
function sortedInsert(head: ListNode | null, newNode: ListNode): ListNode {

    const dummy = new ListNode();
    let current = dummy;
    dummy.next = head;

    while (current.next && current.next.data < newNode.data) {
        current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;
    return dummy.next;
}

// Given a list, change it to be in sorted order (using `sortedInsert()`).
function insertSort(head: ListNode | null): ListNode | null {

    let result: ListNode | null = null;       // build the answer here
    let current = head;      // iterate over the original list

    while (current) {
        // tricky: note the next reference before we change it
        const next = current.next;

        result = sortedInsert(result, current);
        current = next;
    }

    return result;
}

// input keys
const keys = [6, 3, 4, 8, 2, 9];

// points to the head node of the linked list
let head: ListNode | null = null;

// construct a linked list
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

head = insertSort(head);

// print linked list
printList(head);
```

**Output:** 2 —> 3 —> 4 —> 6 —> 8 —> 9 —> NULL

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space. Please refer below for the merge sort based algorithm to sort a linked list in O(n.log(n)) time.

**Also See:**

> [Merge sort algorithm for a singly linked list – C, Java, and Python](https://techiedelight.com/merge-sort-singly-linked-list/)

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.62/5. Vote count: 195

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
