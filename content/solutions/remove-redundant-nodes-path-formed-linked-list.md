# Remove redundant nodes from a path formed by a linked list

> Source: https://www.techiedelight.com/remove-redundant-nodes-path-formed-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list that stores a path formed by cells of a matrix, remove the redundant nodes in that path. The path can be both vertical and horizontal, but never diagonal. To determine the complete path, we need the endpoints of all vertical and horizontal paths; middle nodes don’t provide any value and are therefore redundant. So, the resultant list should contain coordinates of only endpoints of all vertical and horizontal paths.

For example,

We should convert the above list into the following list:

> 

We can easily solve the problem by traversing the list and considering three nodes at a time. If a triplet is found with the same x–value or same y–value, then delete the middle node. If this is done for all adjacent triplets, we will get the desired list at the end.

This is demonstrated below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    x: number;
    y: number;
    next: ListNode | null = null;
    constructor(x: number, y: number, next: ListNode | null = null) {
        this.x = x;
        this.y = y;
        this.next = next;
    }

    toString(): string {
        return `(${this.x}, ${this.y})`;
    }
}

// Function to remove redundant nodes from a path formed by a linked list
function removeNodes(head: ListNode | null): ListNode | null {
    let curr: ListNode | null = head;

    while (curr !== null && curr.next !== null && curr.next.next !== null) {
        const temp: ListNode = curr.next.next;

        // check for a vertical triplet (triplet with the same x–value)
        if (curr.x === curr.next.x && curr.x === temp.x) {
            // delete the middle node
            curr.next = temp;
        }
        // check for a horizontal triplet (triplet with the same y–value)
        else if (curr.y === curr.next.y && curr.y === temp.y) {
            // delete the middle node
            curr.next = temp;
        }
        else {
            curr = curr.next;
        }
    }

    return head;
}

// Helper function to print a given linked list
function printList(head: ListNode | null): void {
    let ptr: ListNode | null = head;
    while (ptr) {
        console.log(ptr + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// input coordinates
const keys = [[0, 1], [0, 5], [0, 8], [2, 8], [5, 8], [7, 8], [7, 10], [7, 12]];

let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i][0], keys[i][1], head);
}

head = removeNodes(head);
printList(head);
```

**Output:** (0, 1) —> (0, 8) —> (7, 8) —> (7, 12) —> NULL



The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Delete every `N` nodes in a linked list after skipping `M` nodes](https://www.techiedelight.com/delete-every-n-nodes-linked-list-skipping-m-nodes/ "Delete every `N` nodes in a linked list after skipping `M` nodes")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Pairwise swap adjacent nodes of a linked list](https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/ "Pairwise swap adjacent nodes of a linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
