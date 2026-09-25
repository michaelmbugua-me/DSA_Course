# Add a single-digit number to a linked list representing a number

> Source: https://www.techiedelight.com/add-single-digit-number-linked-list-representing-number/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a single-digit number k and a singly linked list whose nodes stores digits of a non-negative number, add k to the linked list.

For example, consider the linked list `9 —> 9 —> 9 —> 3 —> NULL` which represents the number `9993`. Adding a single-digit number `7` to it should result in the linked list `1 —> 0 —> 0 —> 0 —> 0 —> NULL` which corresponds to the number `10000`.

> 

The idea is to solve this problem using the basic algorithm for the addition of two numbers. But since the given list is singly linked, we can’t iterate it in the backward direction. Therefore, to facilitate the addition, we can [reverse the list](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/).

We start by adding the given single-digit number to the digit at the first node in the reversed list. If the resultant sum is a 2-digit number, update the node with a single-digit sum and move the carry to the next node. This process is repeated while there is a carry. If we reach the last node and a carry exists, add a new node at the end of the linked list with carry as the value. Finally, reverse the list again to restore the original order.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {

    let out = msg;
    while (head) {
        out += `${head.data} —> `;
        head = head.next;
    }
    console.log(`${out}null`);
}

// Function to reverse a given linked list
function reverse(head: ListNode | null): ListNode | null {

    let prev: ListNode | null = null;
    let current = head;

    // traverse the list
    while (current) {
        // tricky: note the next node
        const next = current.next;

        // fix the current node
        current.next = prev;

        // advance the two pointers
        prev = current;
        current = next;
    }

    // fix the head pointer to point to the front
    return prev;
}

// Function to add a single-digit number to a singly linked list
// whose nodes represent digits of a number
function addDigit(head: ListNode | null, digit: number): ListNode | null {

    // empty list
    if (head === null) {
        return new ListNode(digit);
    }

    // reverse the linked list
    head = reverse(head);

    // initialize carry with the given digit
    let carry = digit;

    // traverse the reversed list
    let curr = head;
    while (carry > 0) {

        // get a sum of the current node and carry
        const total = curr.data + carry;

        // update value of the current node with the single-digit sum
        curr.data = total % 10;

        // set carry for the next node
        carry = Math.floor(total / 10);

        // break if the current node is the last
        if (curr.next === null) {
            break;
        }

        // move to the next node
        curr = curr.next;
    }

    // add a new node at the end of the linked list if there is any carry left
    if (carry > 0) {
        curr.next = new ListNode(carry);
    }

    // reverse the list again to restore the original order
    head = reverse(head);
    return head;
}

let head = new ListNode(9);
head.next = new ListNode(9);
head.next.next = new ListNode(9);
head.next.next.next = new ListNode(9);
head.next.next.next.next = new ListNode(3);

const digit = 7;

printList('Original linked list: ', head);
head = addDigit(head, digit);
printList('Resultant linked list: ', head);
```

**Output:** Original linked list: 9 —> 9 —> 9 —> 9 —> 3 —> NULL Resultant linked list: 1 —> 0 —> 0 —> 0 —> 0 —> 0 —> NULL

The time complexity of the above solution is linear, but the code performs several traversals of the linked list. We can avoid reversing the list by having [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) take care of processing the nodes in reverse order. The idea is to recursively reach the end of the linked list and pass the carry information to each parent node as the recursion unfolds.

This is demonstrated below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null) {}
}

// Helper function to print a given linked list
function printList(msg: string, head: ListNode | null): void {

    let out = msg;
    while (head) {
        out += `${head.data} —> `;
        head = head.next;
    }
    console.log(`${out}null`);
}

// Recursive function to add a given digit to the linked list representing
// a number.
function append(head: ListNode | null, digit: number): number {

    // base case: end of the linked list is reached
    if (head === null) {
        return digit;
    }

    // stores the carry returned by the recursive call of the next node
    const carry = append(head.next, digit);

    // optimization: terminate the recursion if carry is 0 at any point
    if (carry === 0) {
        return 0;
    }

    // get the sum of the current node and the carry
    const total = head.data + carry;

    head.data = total % 10;     // update value of the current node
    return Math.floor(total / 10);      // return carry
}

// Function to add a single-digit number to a singly linked list
// whose nodes represent digits of a number
function addDigit(head: ListNode | null, digit: number): ListNode | null {

    // Add given digit to the linked list using recursion
    const carry = append(head, digit);

    // if there is any carry left, add a new node at the beginning of the list
    if (carry > 0) {
        head = new ListNode(carry, head);
    }

    return head;
}

const number = [9, 9, 9, 9, 3];

let head: ListNode | null = null;
for (let i = number.length - 1; i >= 0; i--) {
    head = new ListNode(number[i], head);
}

const digit = 7;

printList('Original linked list: ', head);
head = addDigit(head, digit);
printList('Resultant linked list: ', head);
```

**Output:** Original linked list: 9 —> 9 —> 9 —> 9 —> 3 —> NULL Resultant linked list: 1 —> 0 —> 0 —> 0 —> 0 —> 0 —> NULL
