# Flatten a multilevel linked list

> Source: https://www.techiedelight.com/flatten-multilevel-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a list that can grow in both horizontal and vertical directions (`right` and `down`), flatten it into a singly linked list. The conversion should be in such a way that the `down` node should be processed before the `next` node for any node.

A multilevel list is similar to the standard linked list except it has an extra field, `down`, which points to a vertical list. The vertical list can have a horizontal list attached to it and vice versa.

For example, consider the following linked list:

The flattened list would be:

`1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> null`

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to flatten a multilevel list. The idea is to recursively flatten the given linked list by recursively flattening the `down` list first, followed by the `next` list. The flattened `down` list for a node is linked to the `next` pointer of that node, while the flattened `next` list for a node is linked to the `next` pointer of the last seen node.

The algorithm can be implemented as follows in TypeScript:

```ts
// Data structure to represent a special linked list node with an
// additional `down` pointer
class ListNode {
    constructor(public data: number, public down: ListNode | null = null, public next: ListNode | null = null) {}
}

// Utility function to print a list with `down` and `next` pointers
const printOriginalList = (head: ListNode | null): void => {
    if (head === null) {
        return;
    }

    console.log(head.data, '');

    if (head.down) {
        console.log('[', '');
        printOriginalList(head.down);
        console.log(']', '');
    }

    printOriginalList(head.next);
};

// Utility function to print a linked list
const printFlattenedList = (head: ListNode | null): void => {
    let out = '';
    while (head) {
        out += `${head.data} —> `;
        head = head.next;
    }
    console.log(out + 'null');
};

// Recursive function to flatten a multilevel linked list
const flattenList = (head: ListNode | null): ListNode | null => {
    // base case
    if (head === null) {
        return null;
    }

    // keep track of the next pointer
    const next = head.next;

    // process the down list first
    head.next = flattenList(head.down);

    // go to the last node
    let tail = head;
    while (tail.next) {
        tail = tail.next;
    }

    // process the next list after the down list
    tail.next = flattenList(next);

    // return head node
    return head;
};

// create individual nodes and link them together later
const one = new ListNode(1);
const two = new ListNode(2);
const three = new ListNode(3);
const four = new ListNode(4);
const five = new ListNode(5);
const six = new ListNode(6);
const seven = new ListNode(7);
const eight = new ListNode(8);
const nine = new ListNode(9);
const ten = new ListNode(10);
const eleven = new ListNode(11);
const twelve = new ListNode(12);
const thirteen = new ListNode(13);
const fourteen = new ListNode(14);
const fifteen = new ListNode(15);

// set head node
let head: ListNode | null = one;

// set next pointers
one.next = four;
four.next = fourteen;
fourteen.next = fifteen;
five.next = nine;
nine.next = ten;
seven.next = eight;
eleven.next = thirteen;

// set down pointers
one.down = two;
two.down = three;
four.down = five;
five.down = six;
six.down = seven;
ten.down = eleven;
eleven.down = twelve;

console.log('The original list is:');
printOriginalList(head);

head = flattenList(head);
console.log('\n\nThe flattened list is:');
printFlattenedList(head);
```

**Output:** The original list is : 1 [ 2 [ 3 ]] 4 [ 5 [ 6 [ 7 8 ]] 9 10 [ 11 [ 12 ] 13 ]] 14 15 The flattened list is : 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> null

The time complexity of the above solution is O(n) and requires O(n) space for the call stack. We can further optimize the code by maintaining a tail pointer as we move along. This approach is demonstrated [here](https://techiedelight.com/compiler/?run=AMbHsO).

Also See:

> [Flatten a Linked List](https://www.techiedelight.com/flatten-linked-list/ "Flatten a Linked List")

> [Convert a multilevel linked list to a singly linked list](https://www.techiedelight.com/convert-multilevel-linked-list-singly/ "Convert a multilevel linked list to a singly linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
