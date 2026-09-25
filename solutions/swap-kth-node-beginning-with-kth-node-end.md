# Swap k’th node from beginning with k’th node from the end in a linked list

> Source: https://www.techiedelight.com/swap-kth-node-beginning-with-kth-node-end/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, swap the `k'th` node from the beginning with the `k'th` node from the end. The swapping should be done so that only links between the nodes are exchanged, and no data is swapped.

For example,

**Input:** Linked List: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> NULL k = 2 **Output:** 1 —> 7 —> 3 —> 4 —> 5 —> 6 —> 2 —> 8 —> NULL

> 

The idea is to traverse the linked list and find pointers to the `k'th` node from the beginning and the end. Then swap their pointers. This looks easy enough, but the code needs to handle several boundary cases while exchanging the links, such as both nodes being adjacent to each other, one node is a head node, or both nodes doesn’t exist (when `k` is more than the total number of nodes in a linked list).

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

// Function to print a given linked list
function printList(msg: string, head: ListNode | null): void {
    process.stdout.write(msg);
    let ptr = head;
    while (ptr) {
        process.stdout.write(ptr.val + ' —> ');
        ptr = ptr.next;
    }
    console.log('null');
}

// Function to swap the k'th node from the beginning with the
// k'th node from the end in a linked list
function swapNodes(head: ListNode | null, k: number): ListNode | null {
    let prev_x: ListNode | null = null;
    let prev_y: ListNode | null = head;

    // Find the k'th node from the beginning and store it in `x`.
    // Also, calculate the previous node of `x` and store it in `prev_x`.
    let curr = head;
    let i = 1;
    while (i < k && curr) {
        prev_x = curr;
        curr = curr.next;
        i++;
    }
    // If `k` is more than the total number of nodes, X and Y doesn't exist
    if (curr === null) {
        return null;
    }
    const x = curr;

    // Find the k'th node from the end and store it in `y`.
    // Also, calculate the previous node of `y` and store it in `prev_y`.
    let ptr = head;
    while (curr.next) {
        if (ptr === null) {
            return null;
        }
        prev_y = ptr;
        ptr = ptr.next;
        curr = curr.next;
    }
    const y = ptr;
    if (y === null) {
        return null;
    }

    // Y is next to X (X —> Y)
    if (x.next === y) {
        x.next = y.next;
        y.next = x;
        if (prev_x && prev_x !== x) {
            prev_x.next = y;
        } else {
            head = y;
        }
    }

    // X is next to Y (Y —> X)
    else if (y.next === x) {
        y.next = x.next;
        x.next = y;

        if (prev_y && prev_y !== y) {
            prev_y.next = x;
        } else {
            head = x;
        }
    }

    // X is the head node
    else if (x === head) {
        head = y;
        y.next = x.next;
        if (prev_y === null) {
            return null;
        }
        prev_y.next = x;
        x.next = null;
    }

    // Y is the head node
    else if (y === head) {
        head = x;
        x.next = y.next;
        if (prev_x === null) {
            return null;
        }
        prev_x.next = y;
        y.next = null;
    }

    // Otherwise
    else {
        if (prev_x === null || prev_y === null) {
            return null;
        }
        ptr = y.next;
        y.next = x.next;
        x.next = ptr;

        prev_x.next = y;
        prev_y.next = x;
    }

    return head;
}

const A = [1, 2, 3];

let head: ListNode | null = null;
for (let i = A.length - 1; i >= 0; i--) {
    head = new ListNode(A[i], head);
}

printList('Before : ', head);

const k = 3;
head = swapNodes(head, k);

printList(' After : ', head);
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Pairwise swap adjacent nodes of a linked list](https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/ "Pairwise swap adjacent nodes of a linked list")

> [Remove redundant nodes from a path formed by a linked list](https://www.techiedelight.com/remove-redundant-nodes-path-formed-linked-list/ "Remove redundant nodes from a path formed by a linked list")

> [Rearrange linked list in a specific manner](https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/ "Rearrange linked list in a specific manner")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 181

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
