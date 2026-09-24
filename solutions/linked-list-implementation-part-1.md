# Linked List Implementation in C

> Source: https://www.techiedelight.com/linked-list-implementation-part-1/

We have introduced the linked list data structure in the [previous post](https://techiedelight.com/introduction-linked-lists/) and discussed various types of linked lists. We have also covered the applications of linked list data structure and its pros and cons concerning arrays. This post will discuss various linked list implementation techniques in detail and construct a singly linked list in the C programming language.

Let’s start by discussing the structure of a linked list node. Each node of a linked list contains a single data element and a pointer to the next node in the list.

```
// A Linked List Node
struct Node
{
    int data;               // integer data
    struct Node* next;      // pointer to the next node
};
```

## Memory allocation of Linked List nodes

The nodes that will make up the list’s body are allocated in the heap memory. We can allocate dynamic memory in C using the `malloc()` or `calloc()` function. `malloc()` takes a single argument (the amount of memory to allocate in bytes). In contrast, `calloc()` needs two arguments (the total number of variables to allocate in memory and the size in bytes of a single variable). `malloc()` does not initialize the memory allocated, while `calloc()` guarantees that all bytes of the allocated memory block have been initialized to 0. To deallocate the allocated memory, we can use `free()`.

```
// Helper function in C to return new linked list node from the heap
struct Node* newNode(int data)
{
    // allocate a new node in a heap using `malloc()` and set its data
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;

    // set the `.next` pointer of the new node to point to null
    node->next = NULL;

    return node;
}
```

## Constructing Linked List

This section covers various methods to construct a linked list.

## 1\. Naive method

A naive solution is to construct individual linked list nodes first and rearrange their pointers later to build the list.

```
#include <stdio.h>
#include <stdlib.h>

// Data structure to store a linked list node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to return new linked list node from the heap
struct Node* newNode(int data)
{
    // allocate a new node in a heap and set its data
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;

    // `.next` pointer of the new node points to nothing
    node->next = NULL;

    return node;
}

// Naive function for linked list implementation containing three nodes
struct Node* constructList()
{
    // construct three linked list nodes
    struct Node* first = newNode(1);
    struct Node* second = newNode(2);
    struct Node* third = newNode(3);

    // rearrange the pointers to construct a list
    struct Node* head = first;
    first->next = second;
    second->next = third;

    // return a pointer to the first node in the list
    return head;
}

// Helper function to print a linked list
void printList(struct Node* head)
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("%d -> ", ptr->data);
        ptr = ptr->next;
    }

    printf("NULL");
}

int main(void)
{
    // `head` points to the first node (also known as a head node) of a linked list
    struct Node* head = constructList();

    // print linked list
    printList(head);

    return 0;
}
```

## 2\. Single Line

The above code can be rewritten in a single line by passing the next node as an argument to the `newNode()` function:

```
#include <stdio.h>
#include <stdlib.h>

// Data structure to store a linked list node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to return new linked list node from the heap
struct Node* newNode(int data, struct Node* nextNode)
{
    // allocate a new node in a heap and set its data
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node->next = nextNode;

    return node;
}

// Naive function for linked list implementation containing three nodes
struct Node* constructList()
{
    struct Node* head = newNode(1, newNode(2, newNode(3, NULL)));
    return head;
}

// Helper function to print a linked list
void printList(struct Node* head)
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("%d -> ", ptr->data);
        ptr = ptr->next;
    }

    printf("NULL");
}

int main(void)
{
    // `head` points to the first node (also known as a head node) of a linked list
    struct Node* head = constructList();

    // print linked list
    printList(head);

    return 0;
}
```

## 3\. Generic Method

The above-discussed methods will become a pain if the total number of nodes required is huge in the linked list. We can construct a linked list easily using iteration if the keys are given in the form of an array or any other data structure (using its iterator). Following is the implementation of the idea:

```
#include <stdio.h>
#include <stdlib.h>

// Data structure to store a linked list node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to return new linked list node from the heap
struct Node* newNode(int data, struct Node* nextNode)
{
    // allocate a new node in a heap and set its data
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node->next = nextNode;

    return node;
}

// Function for linked list implementation from a given set of keys
struct Node* constructList(int keys[], int n)
{
    struct Node *head = NULL, *node = NULL;

    // start from the end of the array
    for (int i = n - 1; i >= 0; i--)
    {
        node = newNode(keys[i], node);
        head = node;
    }

    return head;
}

// Helper function to print a linked list
void printList(struct Node* head)
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("%d -> ", ptr->data);
        ptr = ptr->next;
    }

    printf("NULL");
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // `head` points to the first node (also known as a head node) of a linked list
    struct Node* head = constructList(keys, n);

    // print linked list
    printList(head);

    return 0;
}
```

## 4\. Standard Solution

The standard function adds a single node to the head end of any list. This function is called `push()` since we are adding the link to the head end, making a list look a bit like a [stack](https://techiedelight.com/stack-implementation/). Alternately, it could be called `InsertAtFront()`.

Consider the following snippet:

```
#include <stdio.h>
#include <stdlib.h>

// Data Structure to store a linked list node
struct Node
{
    int data;
    struct Node* next;
};

void push(struct Node* head, int data)
{
    // allocate a new node in a heap and set its data
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;

    // set the `.next` pointer of the new node to point to the current
    // first node (head node) of the list.
    newNode->next = head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    head = newNode;             // No, this line does not work! (Why?)
}

// Function for linked list implementation from a given set of keys
struct Node* constructList(int keys[], int n)
{
    struct Node* head = NULL;

    // start from the end of the array
    for (int i = n - 1; i >= 0; i--) {
        push(head, keys[i]);    // try to push a key at front – doesn't work
    }

    return head;
}

// Helper function to print given linked list
void printList(struct Node* head)
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("%d -> ", ptr->data);
        ptr = ptr->next;
    }

    printf("NULL");
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // head points to first node (also called as head node) of linked list
    struct Node* head = constructList(keys, n);

    // print linked list
    printList(head);

    return 0;
}
```

The above code does not work as changes to local parameters are never reflected in the caller’s memory. The traditional method to allow a function to change its caller’s memory is to pass a pointer to the caller’s memory instead of a copy. So, in C, to change an int in the caller, pass an `int*` instead. In general, to change `X`, we pass `X*`. So, in this case, the value we want to change is `struct Node*`, so we pass a `struct Node**` instead, i.e., the type of the head pointer is “pointer to a struct node” and to change that pointer, we need to pass a pointer to it, which will be a “pointer to a pointer to a struct node”.

### Correct `push()` code:

```
/*
    push(): Takes a list and a data value, creates a new link with the given
    data and pushes it onto the list's front. Its head pointer does not pass
    in the list. Instead, the list is passed in as a "reference" pointer
    to the head pointer — this allows us to modify the caller's memory.

    The parameter has the word "ref" in it as a reminder that this is a "reference".
    (struct Node**) pointer to the head pointer instead of an ordinary
    (struct Node*) copy of the head pointer.
*/
void push(struct Node** headRef, int data)
{
    // allocate a new node in a heap and set its data
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode->next = *headRef;   // '*' to dereferences back to the real head

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    *headRef = newNode;
}

// Function for linked list implementation from a given set of keys
struct Node* constructList(int keys[], int n)
{
    struct Node* head = NULL;

    // start from the end of the array
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    return head;
}
```

## 5\. Make head pointer global

This approach is not recommended as [global variables](https://en.wikipedia.org/wiki/Global_variable) are usually considered bad practice precisely because of their non-locality: a global variable can potentially be modified from anywhere (unless they reside in protected memory or are otherwise, rendered read-only), and any part of the program may depend on it. Therefore, a global variable has unlimited potential for creating mutual dependencies, and adding mutual dependencies increases complexity. Global variables also make it challenging to integrate modules because others may use the same global names unless names are reserved by agreement or by naming convention.

```
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Global head pointer
struct Node* head = NULL;

// Takes a list and a data value, creates a new link with the given
// data and pushes it onto the list's front
void push(int data)
{
    // allocate a new node in a heap and set its data
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;

    // set the `.next` pointer of the new node to point to the current
    // head node of the list.
    newNode->next = head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    head = newNode;
}

// Function for linked list implementation from a given set of keys
void constructList(int keys[], int n)
{
    // start from the end of the array
    for (int i = n - 1; i >= 0; i--) {
        push(keys[i]);
    }
}

// Helper function to print the global linked list `head`
void printList()
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("%d -> ", ptr->data);
        ptr = ptr->next;
    }

    printf("NULL");
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // `head` points to the first node (also known as a head node) of a linked list
    constructList(keys, n);

    // print linked list
    printList();

    return 0;
}
```

## 6\. Return head from the `push()` function

```
#include <stdio.h>
#include <stdlib.h>

// Data structure to store a linked list node
struct Node
{
    int data;
    struct Node* next;
};

/*
    Takes a list and a data value, creates a new link with the given data
    and pushes it onto the list's front
*/
struct Node* push(struct Node* head, int data)
{
    // allocate a new node in a heap and set its data
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode->next = head;

    // return the new node, so it becomes the first node in the list
    return newNode;
}

// Function for linked list implementation from a given set of keys
struct Node* constructList(int keys[], int n)
{
    struct Node* head = NULL;

    // start from the end of the array
    for (int i = n - 1; i >= 0; i--) {
        head = push(head, keys[i]);        // update head here
    }

    return head;
}

// Helper function to print a linked list
void printList(struct Node* head)
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("%d -> ", ptr->data);
        ptr = ptr->next;
    }

    printf("NULL");
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // `head` points to the first node (also known as a head node) of a linked list
    struct Node* head = constructList(keys, n);

    // print linked list
    printList(head);

    return 0;
}
```

**Exercise:** Modify the `push()` function to add nodes to the _tail_ of the list.

(Hint – Locate the last node in the list, and then changing its `.next` field from `NULL` to point to the new node, or maintain a tail pointer along with a head pointer to perform insertion in constant time.)

**Continue Reading:**

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Also See:**

> [Linked List Implementation in C++](https://techiedelight.com/linked-list-implementation-cpp/)

> [Linked List Implementation in Java](https://techiedelight.com/linked-list-implementation-java/)

> [Linked List Implementation in Python](https://techiedelight.com/linked-list-implementation-python/)

**References:** <http://cslibrary.stanford.edu/103/LinkedListBasics.pdf>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 255

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [Must Know](https://www.techiedelight.com/Tags/Must-Know/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
