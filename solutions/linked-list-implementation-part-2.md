# Linked List – Insertion at Tail | C, Java, and Python Implementation

> Source: https://www.techiedelight.com/linked-list-implementation-part-2/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

In the previous two posts ([here](https://techiedelight.com/introduction-linked-lists/) and [here](https://techiedelight.com/linked-list-implementation-part-1/)), we have introduced linked list data structure and discussed various types of linked lists. We also covered in great detail the various methods to construct a linked list that inserts every new node onto the list’s front. This post will discuss various methods to implement a linked list by inserting it at the tail of the singly linked list.

> 

A simple solution would be to locate the last node in the list and then change its `.next` field from `NULL` to point the new node. This is just a particular case of the general rule: _to insert or delete a node inside a list, we need a pointer to the node just before that position to change its`.next` field._ Many list problems include the subproblem of advancing a pointer to the node before the point of insertion or deletion. The one exception is if the node is first in the list – in that case, we must change the head pointer.

Consider below the `appendNode()` function, which is like `push()`, except it adds the new node at the tail end of the list instead of the head. If the list is empty, it uses the reference pointer to change the head pointer. Otherwise, it uses a loop to locate the last node in the list. This version does not use `push()`, but builds the new node directly.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to return new linked list node from the heap
struct Node* newNode(int key)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = key;
    node->next = NULL;

    return node;
}

// Helper function to print a given linked list
void printList(struct Node* head)
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("%d —> ", ptr->data);
        ptr = ptr->next;
    }

    printf("NULL");
}

// Function to add a new node at the tail end of the list instead of its head
struct Node* appendNode(struct Node** head, int key)
{
    struct Node* current = *head;
    struct Node* node = newNode(key);

    // special case for length 0
    if (current == NULL) {
        *head = node;
    }
    else {
        // locate the last node
        while (current->next != NULL) {
            current = current->next;
        }

        current->next = node;
    }
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    for (int i = 0; i < n; i++) {
        appendNode(&head, keys[i]);
    }

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL

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
}

class Main
{
    // Helper function to return new linked list node from the heap
    public static Node newNode(int key)
    {
        Node node = new Node(key, null);
        return node;
    }

    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.next;
        }

        System.out.println("null");
    }

    // Function to add a new node at the tail end of the list instead of its head
    public static Node appendNode(Node head, int key)
    {
        Node current = head;
        Node node = newNode(key);

        // special case for length 0
        if (current == null) {
            head = node;
        }
        else {
            // locate the last node
            while (current.next != null) {
                current = current.next;
            }
            current.next = node;
        }

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {1, 2, 3, 4};

        // points to the head node of the linked list
        Node head = null;
        for (int key: keys) {
            head = appendNode(head, key);
        }

        // print linked list
        printList(head);
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
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next

    print('None')

# Function to add a node at the tail end of the list instead of its head
def appendNode(head, key):

    current = head
    node = Node(key)

    # special case for length 0
    if current is None:
        head = node

    else:
        # locate the last node
        while current.next:
            current = current.next
        current.next = node

    return head

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 3, 4]

    # points to the head node of the linked list
    head = None
    for key in keys:
        head = appendNode(head, key)

    # print linked list
    printList(head)
```

The following version is very similar to the above code but relies on `push()` to build the new node. Understanding this version requires a real understanding of reference pointers.

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

    printf("NULL");
}

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** head, int data)
{
    // allocate a new node in a heap and set its data
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode->next = *head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    *head = newNode;
}

// Function to add a new node at the tail end of the list instead
// of its head
struct Node* appendNode(struct Node** head, int key)
{
    struct Node* current = *head;

    // special case for the empty list
    if (current == NULL) {
        push(head, key);
    }
    else {
        // locate the last node
        while (current->next != NULL) {
            current = current->next;
        }

        // Build the node after the last node
        push(&(current->next), key);
    }
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    for (int i = 0; i < n; i++) {
        appendNode(&head, keys[i]);
    }

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;
}

class Main
{
    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        for (Node ptr = head; ptr != null; ptr = ptr.next) {
            System.out.print(ptr.data + " —> ");
        }
        System.out.println("null");
    }

    // Helper function to insert a new node at the beginning of the linked list
    public static Node push(int data, Node head)
    {
        // allocate a new node in a heap and set its data
        Node newNode = new Node();
        newNode.data = data;

        // set the next field of the new node to point to the current
        // first node of the list.
        newNode.next = head;

        // return the head to point to the new node, so it is
        // now the first node in the list.

        return newNode;
    }

    // Function to add a new node at the tail end of the list instead
    // of its head
    public static Node appendNode(Node head, int key)
    {
        Node current = head;

        // special case for the empty list
        if (head == null) {
            head = push(key, null);
        }
        else {
            // locate the last node
            while (current.next != null) {
                current = current.next;
            }

            // Build the node after the last node
            current.next = push(key, null);
        }

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {1, 2, 3, 4};

        // points to the head node of the linked list
        Node head = null;

        for (int key: keys) {
            head = appendNode(head, key);
        }

        // print linked list
        printList(head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    next = None

    # Constructor
    def __init__(self, data):
        self.data = data

# Function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Function to insert a node at the beginning of the linked list
def push(head, data):

    # allocate a new node in a heap and set its data
    newNode = Node(data)

    # set the next field of the node to point to the current
    # first node of the list.
    newNode.next = head

    # return the head to point to the node, so it is
    # now the first node in the list.

    return newNode

# Function to add a node at the tail end of the list instead
# of its head
def appendNode(head, key):

    current = head

    # special case for the empty list
    if current is None:
        head = push(head, key)

    else:
        # locate the last node
        while current.next:
            current = current.next

        # Build the node after the last node
        current.next = push(current.next, key)

    return head

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 3, 4]

    # points to the head node of the linked list
    head = None
    for key in keys:
        head = appendNode(head, key)

    # print linked list
    printList(head)
```

The time complexity in the above solution would be linear for each insertion as we are traversing the whole list till the very end. An efficient approach is maintaining a tail pointer and a head pointer to perform insertion in constant time. There are two standard ways to do it:

## 1\. Build using Dummy Node

The idea is to use a temporary dummy node at the head of the list during computation. The trick is that every node appears to be added after the `.next` field of a node with the dummy. That way, the code for the first node is the same as for the other nodes. The tail pointer plays the same role as in the previous example. It now also handles the first node (avoids making dummy a permanent part of the list).

Following is the C, Java, and Python program that demonstrates it:

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

    printf("NULL");
}

/*
    Takes a list and a data value, creates a new link with the given data and
    pushes it onto the list's front. The head node is passed by reference.
*/
void push(struct Node** head, int data)
{
    // allocate a new node in a heap and set its data
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode->next = *head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    *head = newNode;
}

// Function to implement a linked list from a given set of keys
// using a dummy node
struct Node* constructList(int keys[], int n)
{
    struct Node dummy;              // dummy node is temporarily the first node
    struct Node* tail = &dummy;     // start the tail at the dummy

    // Build the list on `dummy->next` (aka `tail->next`)
    dummy.next = NULL;

    for (int i = 0; i < n; i++)
    {
        push(&(tail->next), keys[i]);
        tail = tail->next;
    }

    // The real result list is now in `dummy.next`
    // dummy.next == {key[0], key[1], key[2], key[3]};
    return (dummy.next);
}

int main()
{
    // input keys
    int keys[] = { 1, 2, 3, 4 };
    int n = sizeof(keys) / sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = constructList(keys, n);

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL
