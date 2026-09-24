# Linked List Implementation in C++

> Source: https://www.techiedelight.com/linked-list-implementation-cpp/

This post provides an overview of some available techniques to implement a linked list in C++ programming language.

We know that each node of a linked list contains a single data field and a pointer to the next node in the list.

```
// A Linked List Node
class Node
{
  public:
    int key;        // data field
    Node* next;     // pointer to the next node
};
```

The nodes of the linked list are allocated in the heap memory. We can use the new operator in C++ for dynamic memory allocation and the `delete` operator to deallocate the allocated memory.

```
// Utility function to return new linked list node from the heap
Node* newNode(int key)
{
    // allocate the new node in a heap using the new operator and set its data
    Node* node = new Node;
    node->key = key;

    // set the `.next` pointer of the new node to point to null
    node->next = nullptr;

    return node;
}
```

> 

There are several methods to construct a singly linked list. Each is covered in detail below:

## 1\. Naive method

A simple solution would be to allocate memory for all individual nodes of the linked list, set their data, and rearrange their pointers to build the complete list.

```
#include <iostream>
using namespace std;

// A Linked List Node
class Node
{
  public:
    int key;        // data field
    Node* next;     // pointer to the next node
};

// Utility function to return new linked list node from the heap
Node* newNode(int key)
{
    // allocate a new node in a heap and set its data
    Node* node = new Node;
    node->key = key;

    // `.next` pointer of the new node points to nothing
    node->next = nullptr;

    return node;
}

// Function for linked list implementation containing three nodes
Node* constructList()
{
    // construct three linked list nodes
    Node* first = newNode(1);
    Node* second = newNode(2);
    Node* third = newNode(3);

    // rearrange the pointers to construct a list
    Node* head = first;
    first->next = second;
    second->next = third;

    // return a pointer to the first node in the list
    return head;
}

// Helper function to print a linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->key << " -> ";
        ptr = ptr->next;
    }

    cout << "nullptr";
}

int main()
{
    // `head` points to the first node (also known as a head node) of a linked list
    Node *head = constructList();

    // print linked list
    printList(head);

    return 0;
}
```

## 2\. Single Line

We can write the above code in a single line by passing the next node as an argument to the `newNode()` function:

```
#include <iostream>
using namespace std;

// A Linked List Node
class Node
{
  public:
    int key;        // data field
    Node* next;     // pointer to the next node
};

// Utility function to return new linked list node from the heap
Node* newNode(int key, Node* next)
{
    // allocate a new node in a heap and set its data
    Node* node = new Node;
    node->key = key;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node->next = next;

    return node;
}

// Function for linked list implementation containing three nodes
Node* constructList()
{
    Node* head = newNode(1, newNode(2, newNode(3, nullptr)));
    return head;
}

// Helper function to print a linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->key << " -> ";
        ptr = ptr->next;
    }

    cout << "nullptr";
}

int main()
{
    // `head` points to the first node (also known as a head node) of a linked list
    Node *head = constructList();

    // print linked list
    printList(head);

    return 0;
}
```

## 3\. Generic Method

Both above methods are not practical when the total number of nodes increases in the linked list. If the keys are given in any container, such as an array, vector, or set, we can easily construct a linked list by traversing the container, as shown below:

```
#include <iostream>
#include <vector>
using namespace std;

// A Linked List Node
class Node
{
  public:
    int key;        // data field
    Node* next;     // pointer to the next node
};

// Utility function to return new linked list node from the heap
Node* newNode(int key, Node* next)
{
    // allocate a new node in a heap and set its data
    Node* node = new Node;
    node->key = key;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node->next = next;

    return node;
}

// Function for linked list implementation from a given set of keys
Node* constructList(vector<int> const &keys)
{
    Node* head, *node = nullptr;

    // start from the end of the array
    for (int i = keys.size() - 1; i >= 0; i--)
    {
        node = newNode(keys[i], node);
        head = node;
    }

    return head;
}

// Helper function to print a linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->key << " -> ";
        ptr = ptr->next;
    }

    cout << "nullptr";
}

int main()
{
    // input keys (in reverse order)
    vector<int> keys = { 4, 3, 2, 1 };

    // construct linked list
    Node *head = constructList(keys);

    // print linked list
    printList(head);

    return 0;
}
```

## 4\. Standard Solution

The standard solution adds a single node to the head end of any list. This function is called `push()` since we are adding the link to the head end, making a list look a bit like a [stack](https://techiedelight.com/stack-implementation/).

We know that C++ has its built-in _& argument_ feature to implement reference parameters. If we append an `&` to the type of parameter, the compiler will automatically make the parameter operate by reference without disturbing the argument’s type.

```
#include <iostream>
#include <vector>
using namespace std;

// A Linked List Node
class Node
{
  public:
    int key;        // data field
    Node* next;     // pointer to the next node
};

/*
    push() in C++ — we just add `&` to the right-hand side of the head
    parameter type, and the compiler makes that parameter work by reference.
    So, this code changes the caller's memory, but no extra uses of `*` are
    necessary — we access "head" directly, and the compiler makes that
    change reference back to the caller.
*/
void push(Node* &headRef, int key)
{
    // allocate a new node in a heap and set its data
    Node* node = new Node;
    node->key = key;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.

    // no extra use of `*` necessary on the head — the compiler
    // takes care of it behind the scenes
    node->next = headRef;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    headRef = node;
}

// Function for linked list implementation from a given set of keys
Node* constructList(vector<int> const &keys)
{
    Node* head = nullptr;

    // start from the end of the array
    for (int i = keys.size() - 1; i >= 0; i--)
    {
        // Note that no extra use `&` necessary — the compiler takes
        // care of it here too. These calls are changing the head.

        push(head, keys[i]);
    }

    return head;
}

// Helper function to print a linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->key << " -> ";
        ptr = ptr->next;
    }

    cout << "nullptr";
}

int main()
{
    // input keys (in reverse order)
    vector<int> keys = { 4, 3, 2, 1 };

    // construct linked list
    Node *head = constructList(keys);

    // print linked list
    printList(head);

    return 0;
}
```

## 5\. Make head pointer global

We can construct a linked list by making the head pointer global, but this approach is not recommended since [global variables](https://en.wikipedia.org/wiki/Global_variable) are usually considered bad practice.

```
#include <iostream>
#include <vector>
using namespace std;

// A Linked List Node
class Node
{
  public:
    int key;
    Node* next;
};

// Global head pointer
Node* head = nullptr;

// Takes a list and a data value, creates a new link with the given
// data and pushes it onto the list's front.
void push(int key)
{
    // allocate a new node in a heap and set its data
    Node* node = new Node;
    node->key = key;

    // set the `.next` pointer of the new node to point to the current
    // head node of the list.
    node->next = head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    head = node;
}

// Function for linked list implementation from a given set of keys
void constructList(vector<int> const &keys)
{
    // start from the end of the array
    for (int i = keys.size() - 1; i >= 0; i--) {
        push(keys[i]);
    }
}

// Helper function to print the global linked list `head`
void printList()
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->key << " -> ";
        ptr = ptr->next;
    }

    cout << "nullptr";
}

int main()
{
    // input keys (in reverse order)
    vector<int> keys = { 4, 3, 2, 1 };

    // construct linked list
    constructList(keys);

    // print linked list
    printList();

    return 0;
}
```

## 6\. Return head from the `push()` function

Another common approach many programmers follow is to return the head node from the `push()` function and update the head in the caller. This is demonstrated below:

```
#include <iostream>
#include <vector>
using namespace std;

// A Linked List Node
class Node
{
  public:
    int key;        // data field
    Node* next;     // pointer to the next node
};

/*
    Takes a list and a data value, creates a new link with the given data
    and pushes it onto the list's front.
*/
Node* push(Node* head, int key)
{
    // allocate a new node in a heap and set its data
    Node* node = new Node;
    node->key = key;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    node->next = head;

    // return the new node, so it becomes the first node in the list
    return node;
}

// Function for linked list implementation from a given set of keys
Node* constructList(vector<int> const &keys)
{
    Node* head = nullptr;

    // start from the end of the array
    for (int i = keys.size() - 1; i >= 0; i--) {
        head = push(head, keys[i]);        // update head here
    }

    return head;
}

// Helper function to print a linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->key << " -> ";
        ptr = ptr->next;
    }

    cout << "nullptr";
}

int main()
{
    // input keys (in reverse order)
    vector<int> keys = { 4, 3, 2, 1 };

    // construct linked list
    Node *head = constructList(keys);

    // print linked list
    printList(head);

    return 0;
}
```

**Continue Reading:**

> [Linked List – Insertion at Tail | C, Java, and Python Implementation](https://techiedelight.com/linked-list-implementation-part-2/)

**Also See:**

> [Linked List Implementation in C](https://techiedelight.com/linked-list-implementation-part-1/)

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

Average rating 4.84/5. Vote count: 267

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
