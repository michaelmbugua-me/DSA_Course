# Remove duplicates from a sorted linked list

> Source: https://www.techiedelight.com/remove-duplicates-sorted-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list sorted in increasing order, write a function that removes duplicate nodes from it by traversing the list only once.

For example, the list `{1, 2, 2, 2, 3, 4, 4, 5}` should be converted into the list `{1, 2, 3, 4, 5}`.

> 

Since the list is sorted, we can proceed down the list and compare adjacent nodes. When adjacent nodes are the same, remove the second one. There’s a tricky case where the node after the next node needs to be noted before the deletion.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    val: number;
    next: ListNode | null = null;
    constructor(val: number, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr: ListNode | null = head;
    while (ptr) {
        console.log(ptr.val + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Remove duplicates from a sorted list
function removeDuplicates(head: ListNode | null): ListNode | null {
    // do nothing if the list is empty
    if (head === null) {
        return null;
    }

    let current: ListNode = head;

    // compare the current node with the next node
    while (current.next !== null) {
        if (current.val === current.next.val) {
            current.next = current.next.next;
        }
        else {
            current = current.next;    // only advance if no deletion
        }
    }

    return head;
}

// input keys
const keys = [1, 2, 2, 2, 3, 4, 4, 5];

// construct a linked list
let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

head = removeDuplicates(head);

// print linked list
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> NULL



The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Also See:

> [Remove duplicates from a linked list in a single traversal](https://www.techiedelight.com/remove-duplicates-linked-list/ "Remove duplicates from a linked list in a single traversal")

> [Insert a node to its correct sorted position in a sorted linked list](https://www.techiedelight.com/sorted-insert-in-linked-list/ "Insert a node to its correct sorted position in a sorted linked list")

> [Rearrange linked list in increasing order (Sort linked list)](https://www.techiedelight.com/given-linked-list-change-sorted-order/ "Rearrange linked list in increasing order \(Sort linked list\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 155

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
