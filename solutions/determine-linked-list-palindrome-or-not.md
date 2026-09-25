# Determine whether a linked list is palindrome or not

> Source: https://www.techiedelight.com/determine-linked-list-palindrome-or-not/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a singly linked list of integers, determine whether the linked list is a palindrome.

For example,

**Input:** 1 —> 2 —> 3 —> 2 —> 1 —> null **Output:** Linked list is a palindrome **Input:** 1 —> 2 —> 3 —> 3 —> 1 —> null **Output:** Linked list is not a palindrome

> 

The idea is to traverse the linked list and push all encountered elements into a [stack](https://techiedelight.com/stack-implementation/). Then traverse the linked list again, and for each node, pop the top element from the stack and compare it with the node’s data. If a mismatch happens for any node, we can say that the linked list is not a palindrome.

The algorithm can be implemented as follows in TypeScript:

```ts
// A Linked List Node
class ListNode {
  data: number;
  next: ListNode | null;

  constructor(data: number, next: ListNode | null = null) {
    this.data = data;
    this.next = next;
  }
}

// Function to determine whether a given linked list is a palindrome
function isPalindrome(head: ListNode | null): boolean {
  // construct an empty stack
  const s: number[] = [];

  // push all elements of the linked list into the stack
  let node = head;
  while (node !== null) {
    s.push(node.data);
    node = node.next;
  }

  // traverse the linked list again
  node = head;
  while (node !== null) {
    // pop the top element from the stack
    const top = s.pop();
    if (top === undefined) {
      return false;
    }

    // compare the popped element with the current node's data
    // return false if mismatch happens
    if (top !== node.data) {
      return false;
    }

    // advance to the next node
    node = node.next;
  }

  // we reach here only when the linked list is a palindrome
  return true;
}

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(2);
head.next.next.next.next = new ListNode(1);

if (isPalindrome(head)) {
  console.log("Linked List is a palindrome.");
} else {
  console.log("Linked List is not a palindrome.");
}
```

**Output:** Linked List is a palindrome.

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list. The auxiliary space required by the solution is O(n) for the stack container.

We can determine whether a linked list is a palindrome in linear time and with constant space. The idea is to [split the given list into two halves](https://techiedelight.com/split-nodes-given-linked-list-front-back-halves/) and [reverse the second half](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/). Then traverse both lists simultaneously and compare their data. If a mismatch happens for any node, we can say that the linked list is not a palindrome.

The implementation can be seen below in TypeScript. Since the solution modifies the given list, we need to restore the original linked list. We can do this by simply linking the first half with the second half.

```ts
// A Linked List Node
class ListNode {
  data: number;
  next: ListNode | null;

  constructor(data: number, next: ListNode | null = null) {
    this.data = data;
    this.next = next;
  }
}

// Function to split nodes of a given linked list into two halves using the
// fast/slow pointer strategy. It returns a pointer to the tail of the first half
function frontBackSplit(head: ListNode): ListNode {
  let slow = head;
  let fast: ListNode | null = head.next;

  // advance `fast` by two nodes, and advance `slow` by a single node
  while (fast !== null) {
    fast = fast.next;
    if (fast) {
      const nextSlow = slow.next;
      if (nextSlow === null) {
        break;
      }
      slow = nextSlow;
      fast = fast.next;
    }
  }

  return slow;
}

// Reverses a given linked list by changing its `.next` pointers and
// its head pointer
function reverse(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null;      // the previous pointer
  let current = head;                    // the main pointer

  // traverse the list
  while (current !== null) {
    // tricky: note the next node
    const next: ListNode | null = current.next;

    current.next = prev;    // fix the current node

    // advance the two pointers
    prev = current;
    current = next;
  }

  // fix the head pointer to point to the new front
  head = prev;
  return head;
}

// Function to determine whether a given linked list is a palindrome
function isPalindrome(head: ListNode | null): boolean {
  // if the length is less than 2, handle separately
  if (head === null || head.next === null) {
    return true;
  }

  let a: ListNode | null = head;

  // split the linked list into two halves (if the total number of nodes
  // is odd, the extra node will go in the first list)
  const aTail = frontBackSplit(head);

  // `aTail` is before the midpoint in the list, so split it in two
  // at that point.
  let b: ListNode | null = aTail.next;
  aTail.next = null;

  // reverse second half
  b = reverse(b);
  const bHead = b;

  // traverse both lists simultaneously and compare their data
  while (a !== null && b !== null) {
    // return false at first data mismatch
    if (a.data !== b.data) {
      return false;
    }

    // advance both lists to the next nodes
    a = a.next;
    b = b.next;
  }

  // restore the second half
  const restored = reverse(bHead);

  // restore the original linked list before returning by
  // linking the first half with the second half
  aTail.next = restored;

  // we reach here only when the linked list is a palindrome
  return true;
}

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(2);
head.next.next.next.next = new ListNode(1);

if (isPalindrome(head)) {
  console.log("Linked list is a palindrome.");
} else {
  console.log("Linked list is not a palindrome.");
}
```

**Output:** Linked List is a palindrome.

We can avoid modification of the original list (even temporarily) with the power of [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). Following is the simple TypeScript recursive implementation that works by recursing till the end of the list and checking each node of the linked list for palindrome as the recursion unfolds:

```ts
// A Linked List Node
class ListNode {
  data: number;
  next: ListNode | null;

  constructor(data: number, next: ListNode | null = null) {
    this.data = data;
    this.next = next;
  }
}

// Function to determine whether a given linked list is a palindrome
function isPalindromeRecurse(curr: ListNode | null, headRef: { node: ListNode | null }): boolean {
  // base case: end of the list reached
  if (curr === null) {
    return true;
  }

  // advance all the way till the end of the list and
  // return false in case of any conflict
  if (!isPalindromeRecurse(curr.next, headRef)) {
    return false;
  }

  // check vs. "mirror" when "coming back" from recursion
  const mirror = headRef.node;
  if (mirror === null) {
    return false;
  }
  if (curr.data !== mirror.data) {
    return false;
  }

  // advance "mirror" by one step for every single step "taken back" in the recursion
  headRef.node = mirror.next;
  return true;
}

// Determine if a given linked list is a palindrome or not.
// The function takes a reference to the head node of the list.
function isPalindrome(head: ListNode | null): boolean {
  return isPalindromeRecurse(head, { node: head });
}

const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);
head.next.next.next = new ListNode(2);
head.next.next.next.next = new ListNode(1);

if (isPalindrome(head)) {
  console.log("Linked List is a palindrome.");
} else {
  console.log("Linked List is not a palindrome.");
}
```

**Output:** Linked list is a palindrome.
