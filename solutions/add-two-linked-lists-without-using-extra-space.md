# Add two linked lists without using any extra space

> Source: https://www.techiedelight.com/add-two-linked-lists-without-using-extra-space/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list representation of two positive numbers, calculate and store their sum in a new list without extra space.

For example,

**Input:** X: 5 —> 7 —> 3 —> 4 —> null Y: 9 —> 4 —> 6 —> null **Output:** 6 —> 6 —> 8 —> 0 —> null (as 5734 + 946 = 6680)

> 

The idea is to [reverse both input lists](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/). The reversal is needed since the addition of two numbers is performed from right to left, but the traversal of the singly linked list is possible only from the beginning. After reversing, traverse both lists simultaneously and construct a new list with the sum of nodes from both lists. Special care needs to be taken when a sum is a 2-digit number (i.e., a carry exists) or any list runs out of elements. Note that we need to reverse the resultant list as well.

This approach is demonstrated below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(data: number, next: ListNode | null = null) {}
}

// Function to print a given linked list
function printList(head: ListNode | null): void {

    let out = '';
    let ptr = head;
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(`${out}null`);
}

// Iterate through the list and move/insert each node
// in front of the out list like `push()` of the node
function reverse(head: ListNode | null): ListNode | null {

    let out: ListNode | null = null;
    let current = head;

    // traverse the list
    while (current) {
        // tricky: note the next node
        const next = current.next;

        // move the current node onto the out
        current.next = out;
        out = current;

        // process next node
        current = next;
    }

    // fix head
    return out;
}

// Function to add two lists, `X` and `Y`
function append(X: ListNode | null, Y: ListNode | null): ListNode | null {

    let head: ListNode | null = null;

    // stores the last seen node
    let prev: ListNode | null = null;

    // initialize carry with 0
    let carry = 0;

    // run till both lists are empty
    while (X || Y) {

        // sum is X's data + Y's data + carry (if any)
        let total = 0;
        if (X) {
            total += X.data;
        }
        if (Y) {
            total += Y.data;
        }

        total += carry;

        // if the sum of a 2–digit number, reduce it and update carry
        carry = Math.floor(total / 10);
        total = total % 10;

        // create a new node with the calculated sum
        const node = new ListNode(total);

        // if the output list is empty
        if (head === null) {
            // update `prev` and `head` to point to the new node
            prev = node;
            head = node;
        } else {
            // add the new node to the output list
            prev!.next = node;

            // update the previous node to point to the new node
            prev = node;
        }

        // advance `X` and `Y` for the next iteration of the loop
        X = X ? X.next : X;
        Y = Y ? Y.next : Y;
    }

    if (carry) {
        prev!.next = new ListNode(carry, prev!.next);
    }

    return head;
}

// Function to add two lists, `X` and `Y`
function addLists(X: ListNode | null, Y: ListNode | null): ListNode | null {

    // reverse `X` and `Y` to access elements from the end
    X = reverse(X);
    Y = reverse(Y);

    return reverse(append(X, Y));
}

let x = 5734;
let y = 946;

// construct list `X` (5 —> 7 —> 3 —> 4) from number `x`
let X: ListNode | null = null;
while (x) {
    X = new ListNode(x % 10, X);
    x = Math.floor(x / 10);
}

// construct list `Y` (9 —> 4 —> 6) from number `y`
let Y: ListNode | null = null;
while (y) {
    Y = new ListNode(y % 10, Y);
    y = Math.floor(y / 10);
}

printList(addLists(X, Y));
```

**Output:** 6 —> 6 —> 8 —> 0 —> NULL

The time complexity of the above solution is O(m + n), where `m` and `n` are the total number of nodes in the first and second list, respectively. The auxiliary space required by the program is constant.

Also See:

> [Add a single-digit number to a linked list representing a number](https://www.techiedelight.com/add-single-digit-number-linked-list-representing-number/ "Add a single-digit number to a linked list representing a number")

> [Reverse every group of `k` nodes in a linked list](https://www.techiedelight.com/reverse-every-k-nodes-of-a-linked-list/ "Reverse every group of `k` nodes in a linked list")

> [Merge two sorted linked lists from their end](https://www.techiedelight.com/merge-two-sorted-linked-lists-end/ "Merge two sorted linked lists from their end")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
