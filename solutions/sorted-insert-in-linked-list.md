# Insert a node to its correct sorted position in a sorted linked list

> Source: https://www.techiedelight.com/sorted-insert-in-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a sorted list in increasing order and a single node, insert the node into the list’s correct sorted position. The function should take an existing node and rearranges pointers to insert it into the list.

For example,

> 

There are many possible solutions to this problem. The basic strategy is to iterate down the list looking for the place to insert the new node. That could be the end of the list or a point just before a larger node than the new node. The three solutions presented handle the “head end” case in different ways.

## 1\. Naive Approach

The naive implementation can be seen below in C, Java, and Python:

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
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Helper function to return a new node of the linked list
struct Node* newNode(int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Function to insert a given node at its correct sorted position into
// a given list sorted in increasing order
void sortedInsert(struct Node** head, struct Node* newNode)
{
    // special case for the head end
    if (*head == NULL || (*head)->data >= newNode->data)
    {
        newNode->next = *head;
        *head = newNode;
        return;
    }

    // locate the node before the point of insertion
    struct Node* current = *head;
    while (current->next != NULL && current->next->data < newNode->data) {
        current = current->next;
    }

    newNode->next = current->next;
    current->next = newNode;
}

int main(void)
{
    // input keys
    int keys[] = {2, 4, 6, 8};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    sortedInsert(&head, newNode(5));
    sortedInsert(&head, newNode(9));
    sortedInsert(&head, newNode(1));

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 4 —> 5 —> 6 —> 8 —> 9 —> NULL

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

    Node(int data) {
        this.data = data;
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

    // Function to insert a given node at its correct sorted position into
    // a given list sorted in increasing order
    public static Node sortedInsert(Node head, Node newNode)
    {
        // special case for the head end
        if (head == null || head.data >= newNode.data)
        {
            newNode.next = head;
            head = newNode;
            return head;
        }

        // locate the node before the point of insertion
        Node current = head;
        while (current.next != null && current.next.data < newNode.data) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {2, 4, 6, 8};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = sortedInsert(head, new Node(5));
        head = sortedInsert(head, new Node(9));
        head = sortedInsert(head, new Node(1));

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

# Function to insert a given node at its correct sorted position into
# a given list sorted in increasing order
def sortedInsert(head, newNode):

    # special case for the head end
    if head is None or head.data >= newNode.data:
        newNode.next = head
        head = newNode
        return head

    # Locate the node before the poof insertion
    current = head
    while current.next and current.next.data < newNode.data:
        current = current.next

    newNode.next = current.next
    current.next = newNode

    return head

if __name__ == '__main__':

    # input keys
    keys = [2, 4, 6, 8]

    # points to the head node of the linked list
    head = None

    # construct a linked list
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    head = sortedInsert(head, Node(5))
    head = sortedInsert(head, Node(9))
    head = sortedInsert(head, Node(1))

    # print linked list
    printList(head)
```

## 2\. Using Dummy Node

Another strategy is to use a temporary dummy node to take care of the first node case – the dummy node nothing but temporarily the first node in the list. Following is the C, Java, and Python program that demonstrates it:

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
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Helper function to return a new node of the linked list
struct Node* newNode(int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Function to insert a given node at its correct sorted position into a given
// list sorted in increasing order
void sortedInsert(struct Node** head, struct Node* newNode)
{
    struct Node dummy;
    struct Node* current = &dummy;
    dummy.next = *head;

    while (current->next != NULL && current->next->data < newNode->data) {
        current = current->next;
    }

    newNode->next = current->next;
    current->next = newNode;
    *head = dummy.next;
}

int main(void)
{
    // input keys
    int keys[] = {2, 4, 6, 8};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    sortedInsert(&head, newNode(5));
    sortedInsert(&head, newNode(9));
    sortedInsert(&head, newNode(1));

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 4 —> 5 —> 6 —> 8 —> 9 —> NULL

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

    Node(int data) {
        this.data = data;
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

    // Function to insert a given node at its correct sorted position into a given
    // list sorted in increasing order
    public static Node sortedInsert(Node head, Node newNode)
    {
        Node dummy = new Node();
        Node current = dummy;
        dummy.next = head;

        while (current.next != null && current.next.data < newNode.data) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;
        return dummy.next;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {2, 4, 6, 8};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = sortedInsert(head, new Node(5));
        head = sortedInsert(head, new Node(9));
        head = sortedInsert(head, new Node(1));

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

# Function to insert a given node at its correct sorted position into a given
# list sorted in increasing order
def sortedInsert(head, newNode):

    dummy = Node()
    current = dummy
    dummy.next = head

    while current.next and current.next.data < newNode.data:
        current = current.next

    newNode.next = current.next
    current.next = newNode
    return dummy.next

if __name__ == '__main__':

    # input keys
    keys = [2, 4, 6, 8]

    # points to the head node of the linked list
    head = None

    # construct a linked list
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    head = sortedInsert(head, Node(5))
    head = sortedInsert(head, Node(9))
    head = sortedInsert(head, Node(1))

    # print linked list
    printList(head)
```

## 3\. Using Local references

Finally, we can use also use local references to insert a node into the list’s correct sorted position. The implementation can be seen below in C:

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
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Helper function to return a new node of the linked list
struct Node* newNode(int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;
    return newNode;
}

// Function to insert a given node at its correct sorted position into a given
// list sorted in increasing order
void sortedInsert(struct Node** head, struct Node* newNode)
{
    struct Node** currentRef = head;
    while (*currentRef != NULL && (*currentRef)->data < newNode->data) {
        currentRef = &((*currentRef)->next);
    }

    newNode->next = *currentRef;
    *currentRef = newNode;
}

int main(void)
{
    // input keys
    int keys[] = {2, 4, 6, 8};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    sortedInsert(&head, newNode(5));
    sortedInsert(&head, newNode(9));
    sortedInsert(&head, newNode(1));

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 4 —> 5 —> 6 —> 8 —> 9 —> NULL
