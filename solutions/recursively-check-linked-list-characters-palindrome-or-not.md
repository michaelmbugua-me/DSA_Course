# Recursively check if the linked list of characters is palindrome or not

> Source: https://www.techiedelight.com/recursively-check-linked-list-characters-palindrome-or-not/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list of characters, recursively check if it is palindrome or not.

For example,

**Input:** A —> B —> C —> B —> A —> null **Output:** The linked list is a palindrome **Input:** A —> B —> C —> C —> B —> null **Output:** The linked list is not a palindrome

> 

The idea is to [recursively traverse](https://techiedelight.com/recursion-practice-problems-with-solutions/) until the end of the linked list and construct a string out of the nodes’ characters in visited order. Then as the recursion unfolds, build another string from the linked list nodes, but this time, the encountered order of processed nodes is the opposite, i.e., from the last node towards the head node. If both constructed strings are equal, we can say that the linked list is a palindrome.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
    val: string;
    next: ListNode | null = null;
    constructor(val: string, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Construct 's1' and 's2' out of the given linked list with consecutive
// list elements in the forward and backward direction
function construct(head: ListNode | null, s1: string, s2: string): [string, string] {
    // base case
    if (head === null) {
        return [s1, s2];
    }

    s1 += head.val;
    [s1, s2] = construct(head.next, s1, s2);
    s2 += head.val;

    return [s1, s2];
}

// Function to check if a given linked list of characters is a palindrome
function isPalindrome(head: ListNode | null): boolean {
    // construct string 's1' and 's2' with consecutive elements of the linked list
    // starting from the beginning and the end

    const [s1, s2] = construct(head, '', '');

    // check if the linked list is a palindrome
    return s1 === s2;
}

const head = new ListNode('A');
head.next = new ListNode('B');
head.next.next = new ListNode('C');
head.next.next.next = new ListNode('B');
head.next.next.next.next = new ListNode('A');

if (isPalindrome(head)) {
    console.log('Linked List is a palindrome.');
}
else {
    console.log('Linked List is not a palindrome.');
}
```

**Output:** Linked List is a palindrome.



We can even determine if a linked list is a palindrome or not without constructing a string out of characters. This can be done recursively by comparing the data at the first node with the last node, the data at the second node with the second last node, etc.

We can do this with the use of two head pointers as parameters to the recursive function. The idea is to recursively advance the second pointer until the end of the linked list is reached. When the recursion unfolds, compare the character pointed by the first pointer with that of the second pointer. If at any point the characters don’t match, the linked list cannot be a palindrome. To keep the left pointer in sync with the right pointer, advance the left pointer to the next node after each recursive call.

Following is a TypeScript implementation of the idea:

```ts
// A Linked List Node
class ListNode {
    val: string;
    next: ListNode | null = null;
    constructor(val: string, next: ListNode | null = null) {
        this.val = val;
        this.next = next;
    }
}

// Recursive function to check if a given linked list of characters is a palindrome
function isPalindrome(left: ListNode | null, right: ListNode | null): [boolean, ListNode | null] {
    // Base case
    if (right === null) {
        return [true, left];
    }

    // Return false on the first mismatch
    let val: boolean;
    [val, left] = isPalindrome(left, right.next);
    if (!val) {
        return [false, left];
    }

    if (left === null) {
        return [false, null];
    }

    // Copy the left child
    const prevLeft = left;

    // Advance the left child to the next node.
    // This change would reflect in the parent recursive calls.
    left = left.next;

    // For the linked list to be a palindrome, the character at the left
    // node should match with the character at the right node
    return [prevLeft.val === right.val, left];
}

const head = new ListNode('A');
head.next = new ListNode('B');
head.next.next = new ListNode('C');
head.next.next.next = new ListNode('B');
head.next.next.next.next = new ListNode('A');

let left: ListNode | null = head;
if (isPalindrome(left, head)[0]) {
    console.log('Linked List is a palindrome.');
}
else {
    console.log('Linked List is not a palindrome.');
}
```

**Output:** Linked List is a palindrome.



The time complexity of both above-discussed methods is O(n), where `n` is the length of the linked list. The auxiliary space required by the program for the call stack is proportional to the lists’ length.
