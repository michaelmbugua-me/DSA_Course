# Rearrange linked list in a specific manner in linear time

> Source: https://www.techiedelight.com/rearrange-linked-list-specific-manner-linear-time/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, rearrange its nodes such that alternate positions are filled with nodes starting from the beginning and end of the list. in linear time and constant space.

For example,

**Input :** 1 —> 2 —> 3 —> 4 —> 5 —> 6 **Output:** 1 —> 6 —> 2 —> 5 —> 3 —> 4 **Input :** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 **Output:** 1 —> 7 —> 2 —> 6 —> 3 —> 5 —> 4

> 

We can easily solve this problem by dividing it into three subproblems:

  * Divide the list into two equal parts.
  * Reverse the second half.
  * Merge the second half into the first half at alternate positions. Use of extra space is not allowed (Not allowed to create additional nodes), i.e., insertion must be done [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/).

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class Node {
    data: number;
    next: Node | null = null;
    constructor(data: number, next: Node | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Function to print a given linked list
function printList(head: Node | null): void {

    let ptr = head;
    while (ptr) {
        process.stdout.write(`${ptr.data} —> `);
        ptr = ptr.next;
    }

    console.log('null');
}

// Iterative function to reverse nodes of a linked list
function reverse(head: Node | null): Node | null {

    let result: Node | null = null;
    let current = head;

    // Iterate through the list and move/insert each node
    // in front of the result list (like a push of the node)
    while (current) {
        // tricky: note the next node
        const next = current.next;

        // move the current node onto the result
        current.next = result;
        result = current;

        // process next node
        current = next;
    }

    // fix head pointer
    return result;
}

// Recursive function to construct a linked list by merging
// alternate nodes of two given linked lists
function shuffleMerge(a: Node | null, b: Node | null): Node | null {

    // see if either list is empty
    if (a === null) {
        return b;
    }

    if (b === null) {
        return a;
    }

    // it turns out to be convenient to do the recursive call first;
    // otherwise, `a.next` and `b.next` need temporary storage

    const recur = shuffleMerge(a.next, b.next);

    const result = a;       // one node from `a`
    a.next = b;             // one from `b`
    b.next = recur;         // then the `rest`

    return result;
}

// Function to split the linked list into two equal parts and return the
// pointer to the second half
function findMiddle(head: Node | null): Node | null {

    let prev: Node | null = null;
    let slow: Node | null = head;
    let fast: Node | null = head;

    // find the middle pointer
    while (fast && fast.next) {
        prev = slow;
        if (slow === null) {
            return null;
        }
        slow = slow.next;
        fast = fast.next.next;
    }

    // for odd nodes, fix middle
    if (fast && fast.next === null) {
        prev = slow;
        if (slow === null) {
            return null;
        }
        slow = slow.next;
    }

    if (prev === null) {
        return null;
    }

    // make next of previous node null
    prev.next = null;

    // return middle node
    return slow;
}

// Function to rearrange given linked list in a specific way
function rearrange(head: Node | null): void {

    // base case
    if (head === null) {
        return;
    }

    // find the second half of the linked list
    let mid = findMiddle(head);

    // reverse the second half
    mid = reverse(mid);

    // merge first and second half
    shuffleMerge(head, mid);
}

let head: Node | null = null;
for (let i = 5; i >= 0; i--) {
    head = new Node(i + 1, head);
}

rearrange(head);
printList(head);
```

**Output:** 1 —> 6 —> 2 —> 5 —> 3 —> 4 —> null

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Split nodes of a linked list into the front and back halves](https://www.techiedelight.com/split-nodes-given-linked-list-front-back-halves/ "Split nodes of a linked list into the front and back halves")

> [Rearrange linked list in a specific manner](https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/ "Rearrange linked list in a specific manner")

> [Check if a linked list is palindrome or not](https://www.techiedelight.com/check-if-linked-list-is-palindrome/ "Check if a linked list is palindrome or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 143

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
