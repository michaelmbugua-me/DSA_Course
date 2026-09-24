# Clone a Linked List

> Source: https://www.techiedelight.com/clone-given-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write a function that takes a singly linked list and returns a complete copy of that list.

> 

## 1\. Naive Approach

The idea is to iterate over the original list in the usual way and maintain two pointers to keep track of the new list: one head pointer and one tail pointer, which always points to the last node of the new list. The first node is done as a special case, and then the tail pointer is used in the standard way for the others.

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

// Function takes a linked list and returns its complete copy
struct Node* copyList(struct Node* head)
{
    struct Node* current = head;    // used to iterate over the original list
    struct Node* newList = NULL;    // head of the new list
    struct Node* tail = NULL;       // point to the last node in a new list

    while (current != NULL)
    {
        // special case for the first new node
        if (newList == NULL)
        {
            newList = (struct Node*)malloc(sizeof(struct Node));
            newList->data = current->data;
            newList->next = NULL;
            tail = newList;
        }
        else {
            tail->next = (struct Node*)malloc(sizeof(struct Node));
            tail = tail->next;
            tail->data = current->data;
            tail->next = NULL;
        }
        current = current->next;
    }

    return newList;
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    // copy linked list
    struct Node* dup = copyList(head);

    // print duplicate linked list
    printList(dup);

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

    Node() {}
}

class Main
{
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

    // Function takes a linked list and returns its complete copy
    public static Node copyList(Node head)
    {
        Node current = head;    // used to iterate over the original list
        Node newList = null;    // head of the new list
        Node tail = null;       // point to the last node in a new list

        while (current != null)
        {
            // special case for the first new node
            if (newList == null)
            {
                newList = new Node(current.data, null);
                tail = newList;
            }
            else {
                tail.next = new Node();
                tail = tail.next;
                tail.data = current.data;
                tail.next = null;
            }
            current = current.next;
        }

        return newList;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {1, 2, 3, 4};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        // copy linked list
        Node copy = copyList(head);

        // print duplicate linked list
        printList(copy);
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

# Function takes a linked list and returns its complete copy
def copyList(head):

    current = head      # used to iterate over the original list
    newList = None      # head of the new list
    tail = None         # point to the last node in a new list

    while current:
        # special case for the first new node
        if newList is None:
            newList = Node(current.data, None)
            tail = newList
        else:
            tail.next = Node()
            tail = tail.next
            tail.data = current.data
            tail.next = None
        current = current.next

    return newList

if __name__ == '__main__':

    # construct a linked list
    head = None
    for i in reversed(range(4)):
        head = Node(i + 1, head)

    # copy linked list
    copy = copyList(head)

    # print duplicate linked list
    printList(copy)
```

## 2\. Using `push()` function

The above implementation is a little unsatisfying because the 3–step link-in is repeated – once for the first node and once for all the other nodes. The following C, Java, and Python implementation uses [push()](https://techiedelight.com/linked-list-implementation-part-1/) to allocate and insert the new nodes and avoid repeating that code.

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

// Function takes a linked list and returns a complete copy of that
// list using a dummy node using the `push()` function
struct Node* copyList(struct Node* head)
{
    struct Node* current = head;    // used to iterate over the original list
    struct Node* newList = NULL;    // head of the new list
    struct Node* tail = NULL;       // point to the last node in a new list

    while (current != NULL)
    {
        // special case for the first new node
        if (newList == NULL)
        {
            push(&newList, current->data);
            tail = newList;
        }
        else {
            push(&(tail->next), current->data);        // add each node at the tail
            tail = tail->next;        // advance the tail to the new last node
        }
        current = current->next;
    }

    return newList;
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    // copy linked list
    struct Node* dup = copyList(head);

    // print duplicate linked list
    printList(dup);

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

    // Function takes a linked list and returns a complete copy of that
    // list using a dummy node using the `push()` function
    public static Node copyList(Node head)
    {
        Node current = head;    // used to iterate over the original list
        Node newList = null;    // head of the new list
        Node tail = null;       // point to the last node in a new list

        while (current != null)
        {
            // special case for the first new node
            if (newList == null)
            {
                newList = new Node(current.data, newList);
                tail = newList;
            }
            else {
                // add each node at the tail
                tail.next = new Node(current.data, tail.next);

                // advance the tail to the new last node
                tail = tail.next;
            }
            current = current.next;
        }

        return newList;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {1, 2, 3, 4};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        // copy linked list
        Node dup = copyList(head);

        // print duplicate linked list
        printList(dup);
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

# Function takes a linked list and returns a complete copy of that
# list using a dummy node using the `push()` function
def copyList(head):

    current = head      # used to iterate over the original list
    newList = None      # head of the list
    tail = None         # point to the last node in a new list

    while current:

        # special case for the first node
        if newList is None:
            newList = Node(current.data, newList)
            tail = newList
        else:
            tail.next = Node(current.data, tail.next)    # add each node at the tail
            tail = tail.next    # advance the tail to the new last node
        current = current.next

    return newList

if __name__ == '__main__':

    # construct a linked list
    head = None
    for i in reversed(range(4)):
        head = Node(i + 1, head)

    # copy linked list
    dup = copyList(head)

    # print duplicate linked list
    printList(dup)
```

## 3\. Using Dummy Node

Another strategy is to use a temporary dummy node to take care of the first node case. The dummy node is temporarily the first node in the list, and the tail pointer starts off pointing to it. All nodes are added off the tail pointer.

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

// Function takes a linked list and returns a complete copy of that
// list using a dummy node
struct Node* copyList(struct Node* head)
{
    struct Node* current = head;    // used to iterate over the original list
    struct Node* tail;              // point to the last node in the new list
    struct Node dummy;              // build the new list of this dummy node

    dummy.next = NULL;

    tail = &dummy;                  // start the tail pointing at the dummy

    while (current != NULL)
    {
        push(&(tail->next), current->data);        // add each node at the tail
        tail = tail->next;          // advance the tail to the new last node
        current = current->next;
    }
    return dummy.next;
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    // copy linked list
    struct Node* dup = copyList(head);

    // print duplicate linked list
    printList(dup);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> NULL
