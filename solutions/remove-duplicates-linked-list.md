# Remove duplicates from a linked list in a single traversal

> Source: https://www.techiedelight.com/remove-duplicates-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given an unsorted linked list, delete duplicate nodes from it by traversing the list only once.

For example,

**Input:** 5 —> 3 —> 4 —> 2 —> 5 —> 4 —> 1 —> 3 —> null **Output:** 5 —> 3 —> 4 —> 2 —> 1 —> null

> 

A simple solution would be to consider every distinct pair of nodes in the list and check if they have the same data or not. If their data matches, we delete the latter node. The time complexity of this solution is O(n2), where `n` is the total number of nodes in the linked list.

We can perform better by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the given list and insert each encountered node into a set. If the current node already presents in the set (i.e., it is seen before), ignore it and move to the next element. In the end, all duplicated nodes is removed from the list.

Following is a TypeScript program that demonstrates it:

```ts
// A Linked List Node
class ListNode {
    val: number;
    next: ListNode | null = null;
    constructor(val: number, next: ListNode | null = null) {}
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

// Function to remove duplicates from a sorted list
function removeDuplicates(head: ListNode | null): void {
    let previous: ListNode | null = null;
    let current: ListNode | null = head;

    // take an empty set to store linked list nodes for future reference
    const s = new Set<number>();

    // do till the linked list is empty
    while (current !== null) {
        // if the current node is seen before, ignore it
        if (s.has(current.val)) {
            (previous as ListNode).next = current.next;
        }
        // insert the current node into the set and proceed to the next node
        else {
            s.add(current.val);
            previous = current;
        }

        current = (previous as ListNode).next;
    }
}

// input keys
const keys = [5, 3, 4, 2, 5, 4, 1, 3];

// construct a linked list
let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

removeDuplicates(head);

// print linked list
printList(head);
```

**Output:** 5 —> 3 —> 4 —> 2 —> 1 —> nullptr



The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list. The auxiliary space required by the program is O(n).

Also See:

> [Remove duplicates from a sorted linked list](https://www.techiedelight.com/remove-duplicates-sorted-linked-list/ "Remove duplicates from a sorted linked list")

> [Sort linked list containing 0’s, 1’s, and 2’s in a single traversal](https://www.techiedelight.com/sort-linked-list-containing-0s-1s-2s/ "Sort linked list containing 0’s, 1’s, and 2’s in a single traversal")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 153

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
