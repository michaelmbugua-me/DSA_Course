# Merge alternate nodes of two linked lists into the first list

> Source: https://www.techiedelight.com/merge-alternate-nodes-two-linked-lists-first-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two linked lists, [merge](https://techiedelight.com/merge-given-sorted-linked-lists/) their nodes into the first list by taking nodes alternately between the two lists. If the first list runs out, the remaining nodes of the second list should not be moved.

For example, consider lists `{1, 2, 3}` and `{4, 5, 6, 7, 8}`. Merging them should result in `{1, 4, 2, 5, 3, 6}` and `{7, 8}`, respectively.

> 

The solution depends on being able to move nodes to the end of a list. Many techniques are available to solve this problem: dummy node, local reference, or [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/).

## 1\. Using Dummy Node

The strategy here uses a temporary dummy node as the start of the result list. The pointer tail always points to the last node in the result list, so appending new nodes is easy. The dummy node gives the tail something to point to initially when the result list is empty. This dummy node is efficient since it is only temporary, and it is allocated in the stack. The loop proceeds, removing one node from either `a` or `b` and adding it to the tail. When we are done, set `a` to `dummy.next`.

This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to print a given linked list
void printList(struct Node* head)
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("%d —> ", ptr->data);
        ptr = ptr->next;
    }

    printf("NULL\n");
}

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** head, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;

    *head = newNode;
}

// Function to construct a linked list by merging alternate nodes of
// two given linked lists using a dummy node
void merge(struct Node** a, struct Node** b)
{
    struct Node dummy;
    struct Node* tail = &dummy;
    dummy.next = NULL;

    while (1)
    {
        // empty list cases
        if (*a == NULL)
        {
            tail->next = NULL;      // Note
            break;
        }

        else if (*b == NULL)
        {
            tail->next = *a;
            break;
        }

        // common case: move two nodes to the tail
        else {
            tail->next = *a;
            tail = *a;
            *a = (*a)->next;

            tail->next = *b;
            tail = *b;
            *b = (*b)->next;
        }
    }

    *a = dummy.next;
}

int main(void)
{
    struct Node *a = NULL, *b = NULL;

    // construct the first list
    for (int i = 3; i >= 0; i--) {
        push(&a, i);
    }

    // construct the second list
    for (int i = 10; i >= 4; i--) {
        push(&b, i);
    }

    // print both lists
    printf("First List: "); printList(a);
    printf("Second List: "); printList(b);

    merge(&a, &b);

    printf("\nAfter Merge: \n\n");

    printf("First List: "); printList(a);
    printf("Second List: "); printList(b);

    return 0;
}
```

**Output:** First List: 0 —> 1 —> 2 —> 3 —> NULL Second List: 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> NULL After Merge: First List: 0 —> 4 —> 1 —> 5 —> 2 —> 6 —> 3 —> 7 —> NULL Second List: 8 —> 9 —> 10 —> NULL

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    Node(int data, Node next)
    {
        this.data = data;
        this.next = next;
    }

    Node() {}
}

class Main
{
    // Helper function to print a given linked list
    public static void printList(String msg, Node head)
    {
        System.out.print(msg);

        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.next;
        }

        System.out.println("null");
    }

    // Function to construct a linked list by merging alternate nodes of
    // two given linked lists using a dummy node
    public static Node[] merge(Node a, Node b)
    {
        Node dummy = new Node();
        Node tail = dummy;

        while (true)
        {
            // empty list cases
            if (a == null)
            {
                tail.next = null;   // Note
                break;
            }
            else if (b == null)
            {
                tail.next = a;
                break;
            }
            // common case: move two nodes to the tail
            else {
                tail.next = a;
                tail = a;
                a = a.next;

                tail.next = b;
                tail = b;
                b = b.next;
            }
        }

        a = dummy.next;
        return new Node[] { a, b };
    }

    public static void main(String[] args)
    {
        Node a = null, b = null;

        // construct the first list
        for (int i = 3; i >= 0; i--) {
            a = new Node(i, a);
        }

        // construct the second list
        for (int i = 10; i >= 4; i--) {
            b = new Node(i, b);
        }

        // print both lists
        printList("First List: ", a);
        printList("Second List: ", b);

        Node[] arr = merge(a, b);
        a = arr[0];
        b = arr[1];

        System.out.println("\nAfter Merge: \n");

        printList("First List: ", a);
        printList("Second List: ", b);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next

# Function to print a given linked list
def printList(msg, head):

    print(msg, end='')
    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Function to construct a linked list by merging alternate nodes of
# two given linked lists using a dummy node
def merge(a, b):

    dummy = Node()
    tail = dummy

    while True:
        # empty list cases
        if a is None:
            tail.next = None    # Note
            break
        elif b is None:
            tail.next = a
            break
        # common case: move two nodes to the tail
        else:
            tail.next = a
            tail = a
            a = a.next

            tail.next = b
            tail = b
            b = b.next

    a = dummy.next
    return a, b

if __name__ == '__main__':

    a = b = None

    # construct the first list
    for i in reversed(range(4)):
        a = Node(i, a)

    # construct the second list
    for i in reversed(range(4, 11)):
        b = Node(i, b)

    # print both lists
    printList('First List: ', a)
    printList('Second List: ', b)

    a, b = merge(a, b)
    print('\nAfter Merge:')

    printList('First List: ', a)
    printList('Second List: ', b)
```

## 2\. Using Local References

This method uses a local reference to get rid of the dummy nodes entirely. Instead of using a dummy node, it maintains a `struct node**` pointer, `lastPtrRef`, which always points to the last pointer of the result list. This solves the same case that the dummy node did – dealing with the result list when it is empty. When trying to build up a list at its tail, either use the dummy node or the `struct node**` “reference” strategy. It uses [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) function as a helper.

Following is the C++ implementation of the idea:

```cpp
#include <iostream>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;
};

// Helper function to print a given linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->data << " —> ";
        ptr = ptr->next;
    }

    cout << "null\n";
}

// Helper function to insert a new node in the beginning of the linked list
void push(Node** headRef, int data)
{
    Node* newNode = new Node();
    newNode->data = data;
    newNode->next = *headRef;

    *headRef = newNode;
}

// Function takes the node from the front of the source and moves it
// to the front of the destination
void moveNode(Node** destRef, Node** sourceRef)
{
    // if the source list empty, do nothing
    if (*sourceRef == nullptr) {
        return;
    }

    Node* newNode = *sourceRef;         // the front source node
    *sourceRef = (*sourceRef)->next;    // advance the source pointer
    newNode->next = *destRef;           // link the old dest off the new node
    *destRef = newNode;                 // move dest to point to the new node
}

// Function to construct a linked list by merging alternate nodes of two
// given linked lists using Local References and `moveNode()` as a helper
void merge(Node* &a, Node* &b)
{
    Node* result = nullptr;
    Node** lastPtrRef = &result;

    while (1)
    {
        if (a == nullptr)
        {
            *lastPtrRef = nullptr;      // Note
            break;
        }
        else if (b == nullptr)
        {
            *lastPtrRef = a;
            break;
        }
        else
        {
            moveNode(lastPtrRef, &a);
            lastPtrRef = &((*lastPtrRef)->next);

            moveNode(lastPtrRef, &b);
            lastPtrRef = &((*lastPtrRef)->next);
        }
    }

    a = result;
}

int main()
{
    Node *a = nullptr, *b = nullptr;

    // construct the first list
    for (int i = 3; i >= 0; i--) {
        push(&a, i);
    }

    // construct the second list
    for (int i = 10; i >= 4; i--) {
        push(&b, i);
    }

    // print both lists
    cout << "First List - "; printList(a);
    cout << "Second List - "; printList(b);

    merge(a, b);

    cout << "\nAfter Merge:\n\n";

    cout << "First List - "; printList(a);
    cout << "Second List - "; printList(b);

    return 0;
}
```

## 3\. Recursive

The recursive solution is the most compact of all but is probably not appropriate for production code since it uses stack space proportionate to the lists’ lengths. The algorithm can be implemented as follows in C++:

```cpp
#include <iostream>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;
};

// Helper function to print a given linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->data << " —> ";
        ptr = ptr->next;
    }

    cout << "null\n";
}

// Helper function to insert a new node in the beginning of the linked list
void push(Node** headRef, int data)
{
    Node* newNode = new Node();
    newNode->data = data;
    newNode->next = *headRef;

    *headRef = newNode;
}

// Recursive function to construct a linked list by merging alternate
// nodes of two given linked lists
void merge(Node *a, Node* &b)
{
    // base case
    if (a == nullptr || b == nullptr) {
        return;
    }

    // take backup of next of `a`
    Node *a_next = a->next;

    // rearrange pointers
    a->next = b;
    b = b->next;
    a->next->next = a_next;

    merge(a_next, b);
}

// main method
int main()
{
    Node *a = nullptr, *b = nullptr;

    // construct the first list
    for (int i = 3; i >= 0; i--) {
        push(&a, i);
    }

    // construct the second list
    for (int i = 10; i >= 4; i--) {
        push(&b, i);
    }

    // print both lists
    cout << "First List - "; printList(a);
    cout << "Second List - "; printList(b);

    merge(a, b);

    cout << "\nAfter Merge:\n\n";

    cout << "First List - "; printList(a);
    cout << "Second List - "; printList(b);

    return 0;
}
```
