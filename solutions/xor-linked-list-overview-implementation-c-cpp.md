# XOR Linked List – Overview and Implementation in C/C++

> Source: https://www.techiedelight.com/xor-linked-list-overview-implementation-c-cpp/

This post will discuss the XOR linked list, which is used to reduce memory requirements of doubly-linked lists using a bitwise XOR operator.

We know that each node of a doubly-linked list requires _two_ pointer fields to store its previous and next node’s addresses. On the other hand, each node of the XOR linked list requires only a _single_ pointer field, which doesn’t store the actual memory addresses but stores the bitwise XOR of address for its previous and next node.

To illustrate, let’s consider the following doubly linked list:

Here the _link_ field for an equivalent XOR linked list stores the following values:

link(A) = NULL ^ addr(B) // bitwise XOR of NULL with address of node B link(B) = addr(A) ^ addr(C) // bitwise XOR between the address of node A and C link(C) = addr(B) ^ addr(D) // bitwise XOR between the address of node B and D link(D) = addr(C) ^ NULL // bitwise XOR of the address of node A with NULL

How this helps?

We know that XOR has the following properties:

X^X = 0 X^0 = X X^Y = Y^X

We can easily traverse the XOR linked list in either direction using the above properties:

1\. Traversing the list from left to right:

Since we are traversing the list from left to right, say we store the previous node’s address in some variable. As the previous node information is available, we can get the next node’s address by _XOR_ ing the value in the link field with the previous node’s address.

For example, suppose we are at node `C`, we can get the address of node `D`, as shown below.

addr(B) ^ link(C) = addr(B) ^ (addr(B) ^ addr(D)) = 0 ^ addr(D) = addr(D)

The XOR operation cancels `addr(B)` appearing twice in the equation, and all we are left with is the `addr(D)`. Similarly, to get the address of the first node A in the list, we can XOR the value in the link field with `NULL`.

NULL ^ link(A) = NULL ^ (NULL ^ addr(B)) = 0 ^ addr(B) = addr(B)

2\. Traversing the list from right to left:

Following a similar logic, to get the address of the last node `D` in the list, XOR the `D's` link field value with `NULL`:

NULL ^ link(D) = NULL ^ (addr(C) ^ NULL) = 0 ^ addr(C) = addr(C)

For any middle node, say node `C`, we can get the address of the previous node `B` as follows.

addr(D) ^ link(C) = addr(D) ^ (addr(B) ^ addr(D)) = 0 ^ addr(B) = addr(B)

Consider the following program, which constructs an XOR linked list and traverses it in a forward direction using bitwise XOR operator properties. To traverse the complete list, maintain three-pointers `prev`, `curr`, and `next` to store the current node address, the previous node address, and the next node address, respectively. Each iteration of the loop moves these pointers one position forward or backward depending upon which direction we are traversing the list.

The implementation can be seen below in C and C++:

```c
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>

// Data structure to store a XOR linked list node
struct Node
{
    int data;
    struct Node* link;
};

// Helper function to return XOR of `x` and `y`
struct Node* XOR(struct Node *x, struct Node *y) {
    return (struct Node*)((uintptr_t)(x) ^ (uintptr_t)(y));
}

// Helper function to traverse the list in a forward direction
void traverse(struct Node *head)
{
    struct Node* curr = head;
    struct Node* prev = NULL;
    struct Node *next;

    while (curr != NULL)
    {
        printf("%d —> ", curr->data);

        // `next` node would be xor of the address of the previous node
        // and current node link
        next = XOR(prev, curr->link);

        // update `prev` and `curr` pointers for the next iteration of the loop
        prev = curr;
        curr = next;
    }

    printf("NULL");
}

// Helper function to insert a node at the beginning of the XOR linked list
void push(struct Node **head, int data)
{
    // allocate a new list node and set its data
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;

    // The link field of the new node is XOR of the current head and `NULL`
    // since a new node is being inserted at the beginning
    newNode->link = XOR(*head, NULL);

    // update link value of the current head node if the linked list is not empty
    if (*head)
    {
        // *(head)->link is XOR of `NULL` and address of the next node.
        // To get the address of the next node, XOR it with `NULL`
        (*head)->link = XOR(newNode, XOR((*head)->link, NULL));
    }

    // update the head pointer
    *head = newNode;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >=0; i--) {
        push(&head, keys[i]);
    }

    traverse(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> NULL

##

```cpp
#include <iostream>
#include <vector>
#include <cstdint>
using namespace std;

// Data structure to store a XOR linked list node
struct Node
{
    int data;
    Node* link;
};

// Helper function to return XOR of `x` and `y`
Node* XOR(Node* x, Node* y) {
    return (Node*)((uintptr_t)(x) ^ (uintptr_t)(y));
}

// Helper function to traverse the list in a forward direction
void traverse(Node* head)
{
    Node* curr = head;
    Node* prev = nullptr;
    Node *next;

    while (curr != nullptr)
    {
        cout << curr->data << " —> ";

        // `next` node would be xor of the address of the previous node
        // and current node link
        next = XOR(prev, curr->link);

        // update `prev` and `curr` pointers for the next iteration of the loop
        prev = curr;
        curr = next;
    }

    cout << "nullptr";
}

// Helper function to insert a node at the beginning of the XOR linked list
void push(Node* &headRef, int data)
{
    // allocate a new list node and set its data
    Node* newNode = new Node();
    newNode->data = data;

    // The link field of the new node is XOR of the current head and nullptr
    // since a new node is being inserted at the beginning
    newNode->link = XOR(headRef, nullptr);

    // update link value of the current head node if the linked list is not empty
    if (headRef)
    {
        // `headRef->link` is XOR of null and address of the next node.
        // To get the address of the next node, XOR it with nullptr
        headRef->link = XOR(newNode, XOR(headRef->link, nullptr));
    }

    // update the head pointer
    headRef = newNode;
}

int main()
{
    // input keys
    vector<int> keys = { 1, 2, 3, 4, 5 };

    Node* head = nullptr;
    for (int i = keys.size() - 1; i >=0; i--) {
        push(head, keys[i]);
    }

    traverse(head);

    return 0;
}
```

Drawbacks of XOR linked list:

An XOR linked list is similar to a doubly-linked list but not completely equivalent to a doubly-linked list. There are several disadvantages of an XOR linked list over a doubly-linked list, which is discussed below:

  1. A doubly-linked list is easy to code and maintain, but it is a little complex for an XOR linked list.
  2. XOR linked list is not supported by several languages such as Java, where conversion between pointers and integers is undefined.
  3. If a pointer to an existing middle node in an XOR linked list is provided, we can’t delete that node from the list or insert a new node before or after it. On the other hand, this can be done easily with a doubly-linked list.

**References:** [XOR linked list – Wikipedia](https://en.wikipedia.org/wiki/XOR_linked_list)

Also See:

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Delete every `N` nodes in a linked list after skipping `M` nodes](https://www.techiedelight.com/delete-every-n-nodes-linked-list-skipping-m-nodes/ "Delete every `N` nodes in a linked list after skipping `M` nodes")

> [Reverse a doubly linked list](https://www.techiedelight.com/reverse-doubly-linked-list/ "Reverse a doubly linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 268

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
