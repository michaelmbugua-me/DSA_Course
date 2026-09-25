# Flatten a Linked List

> Source: https://www.techiedelight.com/flatten-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list that can grow in both horizontal and vertical directions (right and down), flatten it into a sorted singly linked list provided that each horizontal and vertical list is already sorted.

The given linked list is similar to the standard linked list, except that it has one extra field _down_ , which points to a vertical list. Assume that the vertical list doesn’t have any horizontal list attached to it.

For example, consider the following list:

We should convert it into:

`1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> NULL`

We can divide this problem into two parts:

  1. Flattening: In this step, flatten the list either horizontally using the next pointers or vertically using the down pointers.
  2. Sorting: In this step, sort the flattened list using the [merge sort algorithm](https://techiedelight.com/merge-sort-singly-linked-list/).

This is demonstrated below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null, public down: ListNode | null = null) {}
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
const sortedMerge = (a: ListNode | null, b: ListNode | null): ListNode | null => {
    if (a === null) {
        return b;
    }

    else if (b === null) {
        return a;
    }

    // pick either `a` or `b`, and recur
    if (a.data <= b.data) {
        const result = a;
        result.down = sortedMerge(a.down, b);
        return result;
    }

    else {
        const result = b;
        result.down = sortedMerge(a, b.down);
        return result;
    }
};

/*
    Split the given list's nodes into front and back halves.
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow reference strategy.
*/
const frontBackSplit = (source: ListNode | null): [ListNode | null, ListNode | null] => {
    // if the length is less than 2, handle it separately
    if (source === null || source.down === null) {
        return [source, null];
    }

    let slow: ListNode = source;
    let fast: ListNode | null = source.down;

    // advance `fast` two nodes, and advance `slow` one node
    while (fast) {
        fast = fast.down;
        if (fast) {
            slow = slow.down!;
            fast = fast.down;
        }
    }

    // `slow` is before the midpoint of the list, so split it in two
    // at that point.
    const [front, back] = [source, slow.down];
    slow.down = null;

    return [front, back];
};

// Sort a given linked list using the merge sort algorithm
const mergesort = (head: ListNode | null): ListNode | null => {
    // base case — length 0 or 1
    if (head === null || head.down === null) {
        return head;
    }

    // split `head` into `a` and `b` sublists
    let [front, back] = frontBackSplit(head);

    // recursively sort the sublists
    front = mergesort(front);
    back = mergesort(back);

    // answer = merge the two sorted lists
    return sortedMerge(front, back);
};

// Helper function to print a given linked list
const printList = (head: ListNode | null): void => {
    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.down;
    }
    console.log(out + 'None');
};

// Iterative function to flatten and sort a given list
const flatten = (head: ListNode | null): void => {
    let curr = head;
    while (curr) {
        let temp = curr;
        while (temp.down) {
            temp = temp.down;
        }
        temp.down = curr.next;
        curr = curr.next;
    }
};

// Helper function to build a linked list from elements of a given list
const createVerticalList = (head: ListNode | null, keys: number[]): ListNode | null => {
    for (const key of keys) {
        head = new ListNode(key, null, head);
    }
    return head;
};

const first = [8, 6, 4, 1];
const second = [7, 3, 2];
const third = [9, 5];
const fourth = [12, 11, 10];

let head = createVerticalList(null, first);
head!.next = createVerticalList(head!.next, second);
head!.next!.next = createVerticalList(head!.next!.next, third);
head!.next!.next!.next = createVerticalList(head!.next!.next!.next, fourth);

// flatten the list
flatten(head);

// sort the list
mergesort(head);

// print the flattened and sorted linked list
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> NULL

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the linked list, and the auxiliary space required is O(n) for the merge sort algorithm.

The above solution first flattens the list and then sort it. We can combine both these steps into one step, i.e., sorting the list while flattening it. We can do this by calling the [sortedMerge()](https://techiedelight.com/merge-given-sorted-linked-lists/) routine of the merge sort algorithm, as demonstrated below in TypeScript:

```ts
// A Linked List Node
class ListNode {
    constructor(public data: number, public next: ListNode | null = null, public down: ListNode | null = null) {}
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
const sortedMerge = (a: ListNode | null, b: ListNode | null): ListNode | null => {
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
        result.down = sortedMerge(a.down, b);
        return result;
    }

    else {
        const result = b;
        result.down = sortedMerge(a, b.down);
        return result;
    }
};

// Helper function to print a given linked list
const printList = (head: ListNode | null): void => {
    let ptr = head;
    let out = '';
    while (ptr) {
        out += `${ptr.data} —> `;
        ptr = ptr.down;
    }
    console.log(out + 'None');
};

// Recursive function to flatten and sort a given list
const flatten = (head: ListNode | null): ListNode | null => {
    // base case: an empty list
    if (head === null) {
        return head;
    }

    // Merge this list with the list on the right side
    const sorted = sortedMerge(head, flatten(head.next));

    // set next link to null after flattening
    head.next = null;

    return sorted;
};

// Helper function to build a linked list from elements of a given list
const createVerticalList = (head: ListNode | null, keys: number[]): ListNode | null => {
    for (const key of keys) {
        head = new ListNode(key, null, head);
    }
    return head;
};

const first = [8, 6, 4, 1];
const second = [7, 3, 2];
const third = [9, 5];
const fourth = [12, 11, 10];

let head = createVerticalList(null, first);
head!.next = createVerticalList(head!.next, second);
head!.next!.next = createVerticalList(head!.next!.next, third);
head!.next!.next!.next = createVerticalList(head!.next!.next!.next, fourth);

// flatten and sort the list
flatten(head);

// print the flattened and sorted linked list
printList(head);
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> NULL

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the linked list, and the auxiliary space required is O(n) for the merge sort algorithm.
