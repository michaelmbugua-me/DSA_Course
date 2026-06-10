# Check if a linked list is palindrome or not

> Source: https://www.techiedelight.com/check-if-linked-list-is-palindrome/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, check if it is a palindrome or not.

> 

A simple solution would be to create a clone of the linked list, [reverse it](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/), and check if both linked lists are equal or not. This approach requires three traversals of the linked list and requires extra space for storing duplicates.

A better solution is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to reach the end of the linked list by recursion and then compare if the last node has the same value as the first node and the second previous node has the same value as the second node, and so on using the call stack and a pointer at the beginning of the linked list.

Following is a TypeScript implementation of the idea:

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

// Recursive function to check if the linked list is a palindrome or not
const checkPalindrome = (left: ListNode | null, right: ListNode | null): [boolean, ListNode | null] => {

    // base case
    if (right === null) {
        return [true, left];
    }

    const [val, newLeft] = checkPalindrome(left, right.next);

    const result = val && newLeft !== null && newLeft.data === right.data;
    const nextLeft = newLeft ? newLeft.next : null;

    return [result, nextLeft];
};

// Function to check if the linked list is a palindrome or not
const checkPalin = (head: ListNode | null): boolean => checkPalindrome(head, head)[0];

// demo

// input keys
const keys = [1, 3, 5, 3, 1];

let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

if (checkPalin(head)) {
    console.log('The linked list is a palindrome');
} else {
    console.log('The linked list is not a palindrome');
}
```

The time complexity of the above solution is O(n), where `n` is the length of the linked list. The auxiliary space required by the program for the call stack is proportional to the lists’ length.

We can solve this problem in constant space and linear time by dividing the problem into three subproblems:

  * Divide the list into two equal parts.
  * Reverse the second half.
  * Check if the first and second half is similar. If the linked list contains an odd number of nodes, then ignore the middle element.

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

// Iterative function to reverse nodes of a linked list
const reverse = (head: ListNode | null): ListNode | null => {

    let result: ListNode | null = null;
    let current = head;

    // Iterate through the list and move/insert each node
    // in front of the result list (like a push of the node)
    while (current !== null) {

        // tricky: note the next node
        const nextNode = current.next;

        // move the current node onto the result
        current.next = result;
        result = current;

        // process next node
        current = nextNode;
    }

    // fix head pointer
    return result;
};

// Recursive function to check if two linked lists are equal or not
const compare = (a: ListNode | null, b: ListNode | null): boolean => {

    // see if both lists are empty
    if (a === null && b === null) {
        return true;
    }

    return a !== null && b !== null && a.data === b.data && compare(a.next, b.next);
};

// Function to split the linked list into two equal parts and return the
// pointer to the second half
const findMiddle = (head: ListNode, odd: { value: boolean }): ListNode | null => {

    let prev: ListNode | null = null;
    let slow: ListNode | null = head;
    let fast: ListNode | null = head;

    // find the middle pointer
    while (fast !== null && fast.next !== null) {
        if (slow === null) {
            return null;
        }
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    // for odd nodes, `fast` still points to the last node
    if (fast !== null) {
        odd.value = true;
    }

    // make next of previous node null
    if (prev === null || slow === null) {
        return null;
    }
    prev.next = null;

    // return middle node
    return slow;
};

// Function to check if the linked list is a palindrome or not
const checkPalindrome = (head: ListNode | null): boolean => {

    // base case
    if (head === null || head.next === null) {
        return true;
    }

    // flag to indicate if the total number of nodes in the linked list is
    // odd or not.
    const odd = { value: false };

    // find the second half of the linked list
    let mid = findMiddle(head, odd);
    if (mid === null) {
        return false;
    }

    // if the total number of nodes is odd, advance mid
    if (odd.value) {
        mid = mid.next;
        if (mid === null) {
            return false;
        }
    }

    // reverse the second half
    mid = reverse(mid);

    // compare the first and second half
    return compare(head, mid);
};

// demo

// input keys
const keys = [1, 2, 3, 2, 1];

let head: ListNode | null = null;
for (let i = keys.length - 1; i >= 0; i--) {
    head = new ListNode(keys[i], head);
}

if (checkPalindrome(head)) {
    console.log('The linked list is a palindrome');
} else {
    console.log('The linked list is not a palindrome');
}
```
