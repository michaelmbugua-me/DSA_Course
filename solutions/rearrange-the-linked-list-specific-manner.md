# Rearrange linked list in a specific manner

> Source: https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, split it into two lists where each list contains alternating elements from the original list and then finally join them back together.

For example,

**Input :** 1 —> 2 —> 3 —> 4 —> 5 —> null **Output:** 1 —> 3 —> 5 —> 2 —> 4 —> null

> 

To split the given list into two, we can use temporary dummy header nodes for both lists as they are being built. Each sublist has a “tail” pointer that points to its current last node – that way, new nodes can be appended at the end of each list easily. The dummy nodes give the tail pointers something to point to initially. The dummy nodes are efficient in this case because they are temporary and allocated in the stack. Finally, after both lists are formed, we join them by rearranging their pointers and fixing the head node.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public val: number, public next: ListNode | null = null) {}
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

// Function to rearrange the linked list in a specific manner
function rearrange(head: ListNode | null): void {
    // empty list or one node
    if (head === null || head.next === null) {
        return;
    }

    // create two dummy nodes
    const dummyFirst = new ListNode(0);
    const dummySecond = new ListNode(0);

    // tail pointer for the first and second list
    let first: ListNode = dummyFirst;
    let second: ListNode = dummySecond;

    let curr: ListNode | null = head;

    // iterate through the list and process two nodes at a time
    while (curr !== null) {
        // move the current node to the first list
        first.next = curr;
        first = first.next as ListNode;

        // move the next node to the second list
        if (curr.next !== null) {
            second.next = curr.next;
            second = second.next as ListNode;
            curr = curr.next;
        }
        curr = curr.next;
    }

    // combine the first list with the second list
    first.next = dummySecond.next;
    second.next = null;
}

// input keys
const keys = [1, 2, 3, 4, 5];

let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

rearrange(head);
printList(head);
```

**Output:** 1 —> 3 —> 5 —> 2 —> 4 —> null

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Rearrange a linked list by separating odd nodes from even ones](https://www.techiedelight.com/rearrange-linked-list-separating-odd-nodes-even/ "Rearrange a linked list by separating odd nodes from even ones")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Rearrange linked list in a specific manner in linear time](https://www.techiedelight.com/rearrange-linked-list-specific-manner-linear-time/ "Rearrange linked list in a specific manner in linear time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
