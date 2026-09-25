# Delete every `N` nodes in a linked list after skipping `M` nodes

> Source: https://www.techiedelight.com/delete-every-n-nodes-linked-list-skipping-m-nodes/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list and two positive integers, `m` and `n`, delete every `n` nodes after skipping `m` nodes.

For example, consider the following list:

1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null If m = 1, n = 3 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null 1 —> 5 —> 9 —> null If m = 2, n = 2 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null 1 —> 2 —> 5 —> 6 —> 9 —> 10 —> null

> 

The idea is to traverse the given list, skip the first `m` nodes, delete the next `n` nodes, and recur for the remaining nodes. The solution is simple, but we need to ensure that all boundary conditions are handled properly in the code.

The implementation can be seen below in TypeScript:

```ts
// A Linked List Node
class Node {
    constructor(public data: number, public next: Node | null = null) {}
}

// Helper function to print a given linked list
function printList(head: Node | null): void {
    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(out + 'None');
}

// Recursive function to delete every `n` nodes in a linked list after
// skipping `m` nodes
function deleteNodes(head: Node | null, m: number, n: number): Node | null {
    // base case
    if (head === null || head.next === null) {
        return head;
    }

    let prev: Node | null = null;
    let curr: Node | null = head;

    // skip `m` nodes
    for (let i = 1; i <= m; i++) {
        prev = curr;
        curr = curr!.next;

        // return if we have reached end of the list
        if (!curr) {
            return head;
        }
    }

    // delete next `n` nodes
    for (let i = 1; i <= n; i++) {
        if (curr) {
            const next = curr.next;
            curr = next;
        }
    }

    // link remaining nodes with the last node
    prev!.next = curr;

    // recur for remaining nodes
    deleteNodes(curr, m, n);

    return head;
}

let head: Node | null = null;
for (let i = 9; i >= 0; i--) {
    head = new Node(i + 1, head);
}

head = deleteNodes(head, 1, 3);
printList(head);
```

**Output:** 1 —> 5 —> 9 —> NULL

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Pairwise swap adjacent nodes of a linked list](https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/ "Pairwise swap adjacent nodes of a linked list")

> [Remove redundant nodes from a path formed by a linked list](https://www.techiedelight.com/remove-redundant-nodes-path-formed-linked-list/ "Remove redundant nodes from a path formed by a linked list")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
