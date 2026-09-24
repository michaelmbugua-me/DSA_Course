# Merge two sorted linked lists into one

> Source: https://www.techiedelight.com/merge-given-sorted-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write a function that takes two lists, each of which is sorted in increasing order, and merges the two into a single list in increasing order, and returns it.

For example, consider lists `a = {1, 3, 5, 7}` and `b = {2, 4, 6}`. Merging them should yield the list `{1, 2, 3, 4, 5, 6, 7}`.

> 

The problem can be solved either iteratively or recursively. There are many cases to deal with – either `a` or `b` may be empty during processing, either `a` or `b` can run out first, and finally, there’s the problem of starting the result list empty, and building it up while going through `a` and `b`.

## 1\. Using Dummy Nodes

The strategy here uses a temporary dummy node as the start of the result list. The pointer tail always points to the last node in the result list, so appending new nodes is easy. The dummy node gives the tail something to point to initially when the result list is empty. This dummy node is efficient since it is only temporary, and it is allocated in the stack. The loop proceeds, removing one node from either `a` or `b` and adding it at the tail. When we are done, the result is in `dummy.next`.

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

// Function takes the node from the front of the source and moves it
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

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
struct Node* sortedMerge(struct Node* a, struct Node* b)
{
    // a dummy first node to hang the result on
    struct Node dummy;
    dummy.next = NULL;

    // points to the last result node — so `tail->next` is the place
    // to add new nodes to the result.
    struct Node* tail = &dummy;

    while (1)
    {
        // if either list runs out, use the other list
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

        if (a->data <= b->data) {
            moveNode(&(tail->next), &a);
        }
        else {
            moveNode(&(tail->next), &b);
        }

        tail = tail->next;
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

    struct Node* head = sortedMerge(a, b);
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

    // Takes two lists sorted in increasing order and merge their nodes
    // to make one big sorted list, which is returned
    public static Node sortedMerge(Node a, Node b)
    {
        // a dummy first node to hang the result on
        Node dummy = new Node();

        // points to the last result node — so `tail.next` is the place
        // to add new nodes to the result.
        Node tail = dummy;

        while (true)
        {
            // if either list runs out, use the other list
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

            if (a.data <= b.data)
            {
                if (a != null)
                {
                    Node newNode = a;
                    a = a.next;

                    newNode.next = tail.next;
                    tail.next = newNode;
                }
            }
            else {
                if (b != null)
                {
                    Node newNode = b;
                    b = b.next;

                    newNode.next = tail.next;
                    tail.next = newNode;
                }
            }
            tail = tail.next;
        }

        return dummy.next;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7 };

        Node a = null, b = null;
        for (int i = keys.length - 1; i >= 0; i = i - 2) {
            a = a = new Node(keys[i], a);
        }

        for (int i = keys.length - 2; i >= 0; i = i - 2) {
            b = b = new Node(keys[i], b);
        }

        // print both lists
        printList("First List: ", a);
        printList("Second List: ", b);

        Node head = sortedMerge(a, b);
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

# Takes two lists sorted in increasing order and merge their nodes
# to make one big sorted list, which is returned
def sortedMerge(a, b):

    # a dummy first node to hang the result on
    dummy = Node()

    # points to the last result node — so `tail.next` is the place
    # to add new nodes to the result.
    tail = dummy

    while True:

        # if either list runs out, use the other list
        if a is None:
            tail.next = b
            break
        elif b is None:
            tail.next = a
            break

        if a.data <= b.data:
            if a:
                newNode = a                 # the front source node
                a = a.next                  # advance the source

                newNode.next = tail.next    # link the old dest off the new node
                tail.next = newNode         # move dest to point to the new node

        elif b:
                newNode = b                 # the front source node
                b = b.next                  # advance the source

                newNode.next = tail.next    # link the old dest off the new node
                tail.next = newNode         # move dest to point to the new node

        tail = tail.next

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

    head = sortedMerge(a, b)
    printList('After Merge: ', head)
```

## 2\. Using Local References

This solution is structurally very similar to the above, but it avoids using a dummy node. Instead, it maintains a `struct node**` pointer, `lastPtrRef`, which always points to the last pointer of the result list. This solves the same case that the dummy node did – dealing with the result list when it is empty. When trying to build up a list at its tail, use either the dummy node or the `struct node**` “reference” strategy.

This approach is demonstrated below in C:

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

// Function takes the node from the front of the source and moves it
// to the front of the destination
void moveNode(struct Node** destRef, struct Node** sourceRef)
{
    // if the source list empty, do nothing
    if (*sourceRef == NULL) {
        return;
    }

    struct Node* newNode = *sourceRef;      // the front source node
    *sourceRef = (*sourceRef)->next;        // advance the source pointer
    newNode->next = *destRef;               // link the old dest off the new node
    *destRef = newNode;                     // move dest to point to the new node
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
struct Node* sortedMerge(struct Node* a, struct Node* b)
{
    struct Node* result = NULL;
    struct Node** lastPtrRef = &result;     // point to the last result pointer

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

        if (a->data <= b->data) {
            moveNode(lastPtrRef, &a);
        }
        else {
            moveNode(lastPtrRef, &b);
        }

        // tricky: advance to point to the next `.next` field
        lastPtrRef = &((*lastPtrRef)->next);
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

    struct Node* head = sortedMerge(a, b);
    printf("After Merge: ");
    printList(head);

    return 0;
}
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL After Merge: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL

## 3\. Using Recursion

This is a nice problem where the recursive solution code is much cleaner than the iterative code. The recursive implementation can be seen below in C, Java, and Python:

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

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
struct Node* sortedMerge(struct Node* a, struct Node* b)
{
    // base cases
    if (a == NULL) {
        return b;
    }

    else if (b == NULL) {
        return a;
    }

    struct Node* result = NULL;

    // pick either `a` or `b`, and recur
    if (a->data <= b->data)
    {
        result = a;
        result->next = sortedMerge(a->next, b);
    }
    else {
        result = b;
        result->next = sortedMerge(a, b->next);
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

    struct Node* head = sortedMerge(a, b);
    printf("After Merge: ");
    printList(head);

    return 0;
}
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL After Merge: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL
