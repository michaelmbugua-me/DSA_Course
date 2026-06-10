# Merge two sorted linked lists from their end

> Source: https://www.techiedelight.com/merge-two-sorted-linked-lists-end/

Write a function that takes two lists, each of which is sorted in increasing order, and merges the two into one list, which is in decreasing order, and returns it. In other words, [merge](https://techiedelight.com/merge-given-sorted-linked-lists/) two sorted linked lists from their end.

For example, consider lists `a = {1, 3, 5}` and `b = {2, 6, 7, 10}`. Merging both lists should yield the list `{10, 7, 6, 5, 3, 2, 1}`.

> 

There are few cases to deal with – either `a` or `b` may be empty, during processing, either `a` or `b` may run out first, and finally, there’s the problem of starting the result list empty, and building it up while going through `a` and `b`.

We can easily solve this problem using the [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) function as a helper, which takes the node from the front of the source and moves it to the front of the destination. The rest of the code remains similar to the [merge process](https://techiedelight.com/merge-sort-singly-linked-list/) of merge sort.

Following is a TypeScript implementation of the idea:

```ts
class Node {
  data: number;
  next: Node | null = null;
  constructor(data: number, next: Node | null = null) {
    this.data = data;
    this.next = next;
  }
}

// Helper function to print a given linked list
function printList(msg: string, head: Node | null): void {
  process.stdout.write(msg);
  let ptr = head;
  while (ptr) {
    process.stdout.write(ptr.data + ' —> ');
    ptr = ptr.next;
  }
  console.log('null');
}

// Function to merge two sorted lists from the end
function reverseMerge(a: Node | null, b: Node | null): Node | null {
  let result: Node | null = null;

  while (a && b) {
    let newNode: Node;
    if (a.data < b.data) {
      // take the node from the front of the list `a`, and move it
      // to the front of the result
      newNode = a;
      a = a.next;
    } else {
      // take the node from the front of the list `b`, and move it
      // to the front of the result
      newNode = b;
      b = b.next;
    }

    newNode.next = result;
    result = newNode;
  }

  while (b) {
    const newNode = b;
    b = b.next;
    newNode.next = result;
    result = newNode;
  }

  while (a) {
    const newNode = a;
    a = a.next;
    newNode.next = result;
    result = newNode;
  }

  return result;
}

let a: Node | null = null;
let b: Node | null = null;

for (let i = 6; i > 0; i -= 2) {
  a = new Node(i, a);
}

for (let i = 9; i >= 1; i -= 2) {
  b = new Node(i, b);
}

// print both lists
printList('First List: ', a);
printList('Second List: ', b);

const head = reverseMerge(a, b);
printList('After Merge: ', head);
```

**Output:** First List: 2 —> 4 —> 6 —> NULL Second List: 1 —> 3 —> 5 —> 7 —> 9 —> NULL After Merge: 9 —> 7 —> 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> NULL

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Merge two sorted linked lists into one](https://www.techiedelight.com/merge-given-sorted-linked-lists/ "Merge two sorted linked lists into one")

> [Merge alternate nodes of two linked lists into the first list](https://www.techiedelight.com/merge-alternate-nodes-two-linked-lists-first-list/ "Merge alternate nodes of two linked lists into the first list")

> [In-place merge two sorted linked lists without modifying links of the first list](https://www.techiedelight.com/in-place-merge-two-sorted-linked-lists/ "In-place merge two sorted linked lists without modifying links of the first list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
