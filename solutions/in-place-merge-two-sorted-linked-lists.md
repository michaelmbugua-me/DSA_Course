# In-place merge two sorted linked lists without modifying links of the first list

> Source: https://www.techiedelight.com/in-place-merge-two-sorted-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two sorted linked lists, merge them without using extra space without modifying the links of the first list. The solution should preserve the sorted order of elements in both lists.

If `m` and `n` are the total number of nodes in the first and second list, then the first `m` smallest nodes in both lists combined should become part of the first list, and the remaining nodes should become part of the second list.

For example,

**Input:** First List: 2 —> 6 —> 9 —> 10 —> 15 —> NULL Second List: 1 —> 4 —> 5 —> 20 —> NULL **Output:** First List: 1 —> 2 —> 4 —> 5 —> 6 —> NULL Second List: 9 —> 10 —> 15 —> 20 —> NULL

> 

A simple solution would be to use the [merge procedure of the merge sort algorithm](https://techiedelight.com/merge-sort-singly-linked-list/) to merge both lists. After merging both lists, assign the first `m` smallest nodes to the first linked list and the remaining `n` nodes to the second linked list where `m` and `n` are the total number of elements in the first and second linked list, respectively. We can do this in O(m + n) time and constant space.

The above solution violates the problem constraints by modifying links of the first list. However, there is no restriction on swapping data between the linked list nodes. The idea is to compare each node of the first list with the head node of the second list and swap their data if the first list’s current node is greater than the head node of the second list. The first list remains sorted with this data exchange, but the second list’s sorted order might be disturbed. To fix it, pop the front node from the second list and insert it at its correct place into the sorted second list using the [sortedInsert()](https://techiedelight.com/sorted-insert-in-linked-list/) function.

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class ListNode {
    data: number;
    next: ListNode | null = null;
    constructor(data: number, next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {

    let out = msg;
    while (head) {
        out += `${head.data} —> `;
        head = head.next;
    }

    console.log(out + 'null');
}

// Function to exchange data of the given linked list nodes
function swapData(first: ListNode, second: ListNode): void {

    const data = first.data;
    first.data = second.data;
    second.data = data;
}

// Function to insert a given node at its correct sorted position into
// a given list sorted in increasing order
function sortedInsert(head: ListNode | null, newNode: ListNode): ListNode | null {

    // special case for the head end
    if (head === null || head.data >= newNode.data) {
        newNode.next = head;
        head = newNode;
        return head;
    }

    // Locate the node before the point of insertion
    let current = head;
    while (current.next !== null && current.next.data < newNode.data) {
        current = current.next;
    }

    newNode.next = current.next;
    current.next = newNode;

    return head;
}

// Function to in-place merge two sorted linked lists without
// modifying links of the first list.
function mergeLists(first: ListNode | null, second: ListNode | null): ListNode | null {

    // loop till either list runs out
    while (first !== null && second !== null) {

        // compare each element of the first list with the first element
        // of the second list
        if (first.data > second.data) {
            // exchange data if the current node of the first list has more value
            // than the first node of the second list
            swapData(first, second);

            // pop the front node from the second list
            const front = second;
            second = second.next;

            // insert the front node at its correct place into the second list
            second = sortedInsert(second, front);
        }

        // advance the first list to the next node
        first = first.next;
    }

    return second;
}

// construct the first list
const first = new ListNode(2);
first.next = new ListNode(6);
first.next.next = new ListNode(9);
first.next.next.next = new ListNode(10);
first.next.next.next.next = new ListNode(15);

// construct the second list
let second: ListNode | null = new ListNode(1);
second.next = new ListNode(4);
second.next!.next = new ListNode(5);
second.next!.next.next = new ListNode(20);

// print both lists before the merge
console.log('Before Merging:\n');
printList('First List: ', first);
printList('Second List: ', second);

// merge both lists
second = mergeLists(first, second);

// print both lists after merge
console.log('\n\nAfter Merging:\n');
printList('First List: ', first);
printList('Second List: ', second);
```

**Output:** **Before Merging:** First List: 2 —> 6 —> 9 —> 10 —> 15 —> NULL Second List: 1 —> 4 —> 5 —> 20 —> NULL **After Merging:** First List: 1 —> 2 —> 4 —> 5 —> 6 —> NULL Second List: 9 —> 10 —> 15 —> 20 —> NULL

The worst-case time complexity of the above solution is O(m.n), where `m` and `n` are the total number of nodes in the first and second list, respectively. The merging is done [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/), but we might end up traversing the complete second list for each node in the first list. This accounts for O(m.n) time complexity.

The best-case time complexity of the above solution is O(m). The best case happens when both lists are already merged in sorted order, and the `sortedInsert()` method is never called, which runs in O(n) time.

**Author:** Aditya Goel

Also See:

> [Merge two sorted linked lists from their end](https://www.techiedelight.com/merge-two-sorted-linked-lists-end/ "Merge two sorted linked lists from their end")

> [Merge alternate nodes of two linked lists into the first list](https://www.techiedelight.com/merge-alternate-nodes-two-linked-lists-first-list/ "Merge alternate nodes of two linked lists into the first list")

> [Merge two sorted linked lists into one](https://www.techiedelight.com/merge-given-sorted-linked-lists/ "Merge two sorted linked lists into one")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 155

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
