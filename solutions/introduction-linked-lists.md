# Introduction to Linked Lists

> Source: https://www.techiedelight.com/introduction-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

A linked list is a linear data structure consisting of a group of nodes where each node point to the next node through a pointer. Each node is composed of data and a reference (in other words, a link) to the next node in the sequence.

Linked lists are among the simplest and most common data structures. The principal benefits of a linked list over a conventional array are:

  * The list elements can easily be inserted or removed without reallocation or reorganization of the entire structure because the data items need not be stored contiguously in memory. Simultaneously, an array has to be declared in the source code before compiling and running the program.
  * Linked lists allow the insertion and removal of nodes at any point in the list. They can do so with a constant number of operations if the link to the previous node is maintained during the list traversal.

On the other hand, simple linked lists by themselves do not allow random access to the data or any form of efficient indexing. Thus, many basic operations – such as obtaining the last node of the list, finding a node containing a given data, or locating the place where a new node should be inserted – may require sequential scanning of most or all of the list elements.

## Common Types of Linked Lists

## 1\. Singly Linked List

Singly linked lists contain nodes with a data field and a `next` field, which points to the next node in a line of nodes. The operations that can be performed on singly linked lists include insertion, deletion, and traversal.

## 2\. Doubly Linked List

In a doubly-linked list, each node contains, besides the next-node link, a second link field pointing to the `prev` node in the sequence.

An [XOR-linking technique](https://techiedelight.com/xor-linked-list-overview-implementation-c-cpp/) allows a doubly-linked list to be implemented using a single link field in each node.

## 3\. Circular Linked list

In the last node of a list, the link field often contains a null reference, a special value is used to indicate the lack of further nodes. In a circular doubly linked list, the “tail” is linked back to the “head”. The major advantage of circularly linked lists is their ability to traverse the full list beginning at any given node.

## Applications of Linked Lists

Linked lists are a dynamic data structure, which can grow and be pruned, allocating, and deallocating memory while the program is running.

  * Dynamic data structures such as [stacks](https://techiedelight.com/stack-implementation/) and [queues](https://techiedelight.com/circular-queue-implementation-c/) can be implemented using a linked list and several other common abstract data types, including lists and associative arrays.
  * Many modern operating systems use doubly linked lists to maintain references to active processes, threads, and other dynamic objects.
  * A [hash table](https://techiedelight.com/hashing-in-data-structure/) may use linked lists to store the chains of items that hash to the same position in the hash table.
  * A [binary tree](https://techiedelight.com/binary-tree-interview-questions/) can be seen as a type of linked list where the elements are themselves linked lists of the same nature. The result is that each node may include a reference to the first node of one or two other linked lists, which, together with their contents, form the subtrees below that node.

Note: Unless explicitly mentioned, a singly linked list will be referred to by a list or linked list throughout our website.

**Also See:**

> [Linked List Implementation in C](https://techiedelight.com/linked-list-implementation-part-1/)

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Source:** <https://en.wikipedia.org/wiki/Linked_list>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 293

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
