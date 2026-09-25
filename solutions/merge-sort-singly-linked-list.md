# Merge sort algorithm for a singly linked list – C, Java, and Python

> Source: https://www.techiedelight.com/merge-sort-singly-linked-list/

Given a linked list, sort it using the merge sort algorithm.

> 

[Merge sort](https://techiedelight.com/merge-sort/) is an efficient, general-purpose sorting algorithm that produces a stable sort, which means that the implementation preserves the input order of equal elements in the sorted output. It is a comparison sort, i.e., it can sort items of any type for which a _less-than_ relation is defined.

Merge sort is a [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) algorithm. Like all divide-and-conquer algorithms, the merge sort algorithm splits the list into two sublists. Then it recursively sorts each sublist and finally merges both sorted lists together to form the answer. The following solution uses the [frontBackSplit()](https://techiedelight.com/split-nodes-given-linked-list-front-back-halves/) and [sortedMerge()](https://techiedelight.com/merge-given-sorted-linked-lists/) method to solve this problem efficiently. We have already covered them in detail in previous posts.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(data: number, next: ListNode | null = null) {
        this.data = data;
        this.next = next;
    }
}

// Function to print a given linked list
function printList(head: ListNode | null): void {
    let str = '';
    let ptr = head;
    while (ptr) {
        str += `${ptr.data} —> `;
        ptr = ptr.next;
    }
    console.log(str + 'null');
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
function sortedMerge(a: ListNode | null, b: ListNode | null): ListNode | null {

    // base cases
    if (a === null) {
        return b;
    }
    else if (b === null) {
        return a;
    }

    // pick either `a` or `b`, and recur
    if (a.data <= b.data) {
        const result = a;
        result.next = sortedMerge(a.next, b);
        return result;
    }
    else {
        const result = b;
        result.next = sortedMerge(a, b.next);
        return result;
    }
}

/*
    Split the given list's nodes into front and back halves,
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow pointer strategy
*/
function frontBackSplit(source: ListNode | null): [ListNode | null, ListNode | null] {

    // if the length is less than 2, handle it separately
    if (source === null || source.next === null) {
        return [source, null];
    }

    let slow = source;
    let fast: ListNode | null = source.next;

    // advance `fast` two nodes, and advance `slow` one node
    while (fast) {

        fast = fast.next;
        if (fast) {
            if (slow.next === null) {
                break;
            }
            slow = slow.next;
            fast = fast.next;
        }
    }

    // `slow` is before the midpoint of the list, so split it in two
    // at that point.
    const ret: [ListNode | null, ListNode | null] = [source, slow.next];
    slow.next = null;

    return ret;
}

// Sort a given linked list using the merge sort algorithm
function mergesort(head: ListNode | null): ListNode | null {

    // base case — length 0 or 1
    if (head === null || head.next === null) {
        return head;
    }

    // split `head` into `a` and `b` sublists
    let [front, back] = frontBackSplit(head);

    // recursively sort the sublists
    front = mergesort(front);
    back = mergesort(back);

    // answer = merge the two sorted lists
    return sortedMerge(front, back);
}

// input keys
const keys = [8, 6, 4, 9, 3, 1];

let head: ListNode | null = null;
for (const key of keys) {
    head = new ListNode(key, head);
}

// sort the list
head = mergesort(head);

// print the sorted list
printList(head);
```

**Output:** 1 —> 3 —> 4 —> 6 —> 8 —> 9 —> NULL

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Using recursive stack space proportional to the length of a list is not recommended. However, in this case, recursion is okay as it uses stack space proportional to the log of the length of the list. For a 1000 node list, the recursion will only go about 10 levels deep. For a 2000 node list, it will go 11 levels deep. If we think about it, doubling the list’s size only increases the depth by 1.

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Also See:

> [Sort a doubly-linked list using merge sort](https://www.techiedelight.com/sort-doubly-linked-list-merge-sort/ "Sort a doubly-linked list using merge sort")

> [Flatten a Linked List](https://www.techiedelight.com/flatten-linked-list/ "Flatten a Linked List")

> [Merge two sorted linked lists from their end](https://www.techiedelight.com/merge-two-sorted-linked-lists-end/ "Merge two sorted linked lists from their end")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 201

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
