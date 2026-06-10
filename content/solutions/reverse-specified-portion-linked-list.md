# Reverse specific portion of a linked list

> Source: https://www.techiedelight.com/reverse-specified-portion-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write an efficient algorithm to reverse the specified portion of a given linked list.

For example,

**Input:** Linked List: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> None start position = 2 end position = 5 **Output:** 1 —> 5 —> 4 —> 3 —> 2 —> 6 —> 7 —> None

> 

We can easily solve the problem iteratively by dividing the solution into three parts. To [reverse a list](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/) from position `m` to `n`, do the following:

  1. Skip the first `m` nodes.
  2. Reverse the sublist from position `m` to `n` using the same `previous-current-next` strategy used in the solution to [reverse a complete linked list](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/).
  3. Rearrange the pointers and return the head node.

This can be effectively implemented as the following in TypeScript:

```ts
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Utility function to print a linked list
function printList(msg: string, head: ListNode | null): void {
    process.stdout.write(msg + ': ');
    let ptr: ListNode | null = head;
    while (ptr) {
        process.stdout.write(ptr.data + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Iteratively reverse a linked list from position `m` to `n`
function reverse(head: ListNode | null, m: number, n: number): ListNode | null {
    // base case
    if (m > n) {
        return head;
    }

    let prev: ListNode | null = null;
    let curr: ListNode | null = head;

    // 1. Skip the first `m` nodes
    let i = 1;
    while (curr !== null && i < m) {
        prev = curr;
        curr = curr.next;
        i = i + 1;
    }

    // `prev` now points to (m-1)'th node
    // `curr` now points to m'th node

    const start = curr;
    let end: ListNode | null = null;

    // 2. Traverse and reverse the sublist from position `m` to `n`
    while (curr !== null && i <= n) {

        // Take note of the next node
        const next = curr.next;

        // move the current node onto the `end`
        curr.next = end;
        end = curr;

        // move to the next node
        curr = next;
        i = i + 1;
    }

    /*
        `start` points to the m'th node
        `end` now points to the n'th node
        `curr` now points to the (n+1)'th node
    */

    // 3. Fix the pointers and return the head node

    if (start) {
        start.next = curr;
        if (prev === null) {    // when m = 1, `prev` is null
            head = end;
        } else {
            prev.next = end;
        }
    }

    return head;
}

// demo
let head: ListNode | null = null;
for (let i = 6; i >= 0; i--) {
    head = new ListNode(i + 1, head);
}

const m = 2, n = 5;

printList('Original linked list', head);
head = reverse(head, m, n);
printList('Reversed linked list', head);
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

**Exercise** : Write recursive version of above solution.

Also See:

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Reverse every group of `k` nodes in a linked list](https://www.techiedelight.com/reverse-every-k-nodes-of-a-linked-list/ "Reverse every group of `k` nodes in a linked list")

> [Delete every `N` nodes in a linked list after skipping `M` nodes](https://www.techiedelight.com/delete-every-n-nodes-linked-list-skipping-m-nodes/ "Delete every `N` nodes in a linked list after skipping `M` nodes")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 211

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
