# Construct a linked list by merging alternate nodes of two given lists

> Source: https://www.techiedelight.com/merge-alternate-nodes-two-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two linked lists, [merge](https://techiedelight.com/merge-given-sorted-linked-lists/) their nodes to make one list, taking nodes alternately between the two lists. If either list runs out, all the nodes should be taken from the other list.

For example, merging lists `{1, 2, 3}` and `{7, 13, 1}` should yield `{1, 7, 2, 13, 3, 1}`.

> 

The solution depends on being able to move nodes to the end of the list. Several techniques are available to solve this problem: dummy node, local reference, or [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/).

## 1\. Using Dummy Node

The strategy here uses a temporary dummy node as the start of the result list. The pointer `tail` always points to the last node in the result list, so appending new nodes is easy. The dummy node gives `tail` something to point to initially when the result list is empty. This dummy node is efficient since it is only temporary, and it is allocated in the stack. The loop proceeds, removing one node from either `a` or `b` and adding it to `tail`. When we are done, the result is in `dummy.next`.

Following is the C, Java, and Python implementation of the idea:

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
struct Node* shuffleMerge(struct Node* a, struct Node* b)
{
    struct Node dummy;
    struct Node* tail = &dummy;
    dummy.next = NULL;

    while (1)
    {
        // empty list cases
        if (a == NULL)
        {
            tail->next = b;
            break;
        }

        else if (b == NULL)
        {
            tail->next = a;
            break;
        }

        // common case: move two nodes to the tail
        else {
            tail->next = a;
            tail = a;
            a = a->next;

            tail->next = b;
            tail = b;
            b = b->next;
        }
    }

    return dummy.next;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node *a = NULL, *b = NULL;
    for (int i = n - 1; i >= 0; i = i - 2) {
        push(&a, keys[i]);
    }

    for (int i = n - 2; i >= 0; i = i - 2) {
        push(&b, keys[i]);
    }

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    struct Node* head = shuffleMerge(a, b);
    printf("After Merge: ");
    printList(head);

    return 0;
}
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL After Merge: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL

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
    public static Node shuffleMerge(Node a, Node b)
    {
        Node dummy = new Node();
        Node tail = dummy;

        while (true)
        {
            // empty list cases
            if (a == null)
            {
                tail.next = b;
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

        return dummy.next;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7 };

        Node a = null, b = null;
        for (int i = keys.length - 1; i >= 0; i = i - 2) {
            a = new Node(keys[i], a);
        }

        for (int i = keys.length - 2; i >= 0; i = i - 2) {
            b = new Node(keys[i], b);
        }

        // print both lists
        printList("First List: ", a);
        printList("Second List: ", b);

        Node head = shuffleMerge(a, b);
        printList("After Merge: ", head);
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

# Helper function to print a given linked list
def printList(msg, head):

    print(msg, end='')

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next

    print('None')

# Function to construct a linked list by merging alternate nodes of
# two given linked lists using a dummy node
def shuffleMerge(a, b):

    dummy = Node()
    tail = dummy

    while True:
        # empty list cases
        if a is None:
            tail.next = b
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

    return dummy.next

if __name__ == '__main__':

    a = b = None
    for i in reversed(range(1, 8, 2)):
        a = Node(i, a)

    for i in reversed(range(2, 7, 2)):
        b = Node(i, b)

    # print both lists
    printList('First List: ', a)
    printList('Second List: ', b)

    head = shuffleMerge(a, b)
    printList('After Merge: ', head)
```

## 2\. Using Dummy Node with `moveNode()` function

This method is logically the same as above, but it uses the [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) function as a helper. This approach is demonstrated below in C:

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

// Function takes the node from the front of the source and move it
// to the front of the destination
void moveNode(struct Node** destRef, struct Node** sourceRef)
{
    // if the source list empty, do nothing
    if (*sourceRef == NULL) {
        return;
    }

    struct Node* newNode = *sourceRef;  // the front source node
    *sourceRef = (*sourceRef)->next;    // advance the source pointer
    newNode->next = *destRef;           // link the old dest off the new node
    *destRef = newNode;                 // move dest to point to the new node
}

// Function to construct a linked list by merging alternate nodes of two
// given linked lists using dummy node and `moveNode()` as a helper
struct Node* shuffleMerge(struct Node* a, struct Node* b)
{
    struct Node dummy;
    struct Node* tail = &dummy;
    dummy.next = NULL;

    while (1)
    {
        if (a == NULL)
        {
            tail->next = b;
            break;
        }
        else if (b == NULL)
        {
            tail->next = a;
            break;
        }
        else {
            moveNode(&(tail->next), &a);
            tail = tail->next;

            moveNode(&(tail->next), &b);
            tail = tail->next;
        }
    }

    return dummy.next;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node *a = NULL, *b = NULL;
    for (int i = n - 1; i >= 0; i = i - 2) {
        push(&a, keys[i]);
    }

    for (int i = n - 2; i >= 0; i = i - 2) {
        push(&b, keys[i]);
    }

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    struct Node* head = shuffleMerge(a, b);
    printf("After Merge: ");
    printList(head);

    return 0;
}
```

## 3\. Using Local References

This solution is structurally very similar to the above, but avoids using a dummy node. Instead, it maintains a `struct node**` pointer, `lastPtrRef`, which always points to the last node of the result list. This solves the same case that the dummy node did – dealing with the result list when it is empty. When trying to build up a list at its tail, we can use either the dummy node or the `struct node**` “reference” strategy.

Following is the implementation in C based on the above idea:

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

// Function takes the node from the front of the source and move it
// to the front of the destination
void moveNode(struct Node** destRef, struct Node** sourceRef)
{
    // if the source list empty, do nothing
    if (*sourceRef == NULL) {
        return;
    }

    struct Node* newNode = *sourceRef;  // the front source node
    *sourceRef = (*sourceRef)->next;    // advance the source pointer
    newNode->next = *destRef;           // link the old dest off the new node
    *destRef = newNode;                 // move dest to point to the new node
}

// Function to construct a linked list by merging alternate nodes of two
// given linked lists using Local References and `moveNode()` as a helper
struct Node* shuffleMerge(struct Node* a, struct Node* b)
{
    struct Node* result = NULL;
    struct Node** lastPtrRef = &result;

    while (1)
    {
        if (a == NULL)
        {
            *lastPtrRef = b;
            break;
        }
        else if (b == NULL)
        {
            *lastPtrRef = a;
            break;
        }
        else {
            moveNode(lastPtrRef, &a);
            lastPtrRef = &((*lastPtrRef)->next);

            moveNode(lastPtrRef, &b);
            lastPtrRef = &((*lastPtrRef)->next);
        }
    }

    return result;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node *a = NULL, *b = NULL;
    for (int i = n - 1; i >= 0; i = i - 2) {
        push(&a, keys[i]);
    }

    for (int i = n - 2; i >= 0; i = i - 2) {
        push(&b, keys[i]);
    }

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    struct Node* head = shuffleMerge(a, b);
    printf("After Merge: ");
    printList(head);

    return 0;
}
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL After Merge: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL
