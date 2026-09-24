# Move the last node to the front of a linked list

> Source: https://www.techiedelight.com/move-last-node-to-front-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, move its last node to the front.

For example, list `{1, 2, 3, 4}` should be changed to `{4, 1, 2, 3}`.

> 

The idea is to make the linked list circular and then break the chain before the last node after making its head to point to the last node. Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(struct Node** head, int data)
{
    // create a new linked list node from the heap
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
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

// Function to move the last node to the front of a given linked list
void rearrange(struct Node** head)
{
    // proceed only when the list is valid
    if (!*head || !(*head)->next) {
        return;
    }

    struct Node* ptr = *head;

    // move to the second last node
    while (ptr->next->next) {
        ptr = ptr->next;
    }

    // transform the list into a circular list
    ptr->next->next = *head;

    // Fix the head pointer
    *head = ptr->next;

    // break the chain
    ptr->next= NULL;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4 };
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    rearrange(&head);
    printList(head);

    return 0;
}
```

**Output:** 4 —> 1 —> 2 —> 3 —> NULL

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

    // Function to move the last node to the front of a given linked list
    public static Node rearrange(Node head)
    {
        // proceed only when the list is valid
        if (head == null || head.next == null) {
            return head;
        }

        Node ptr = head;

        // move to the second last node
        while (ptr.next.next != null) {
            ptr = ptr.next;
        }

        // transform the list into a circular list
        ptr.next.next = head;

        // Fix head
        head = ptr.next;

        // break the chain
        ptr.next= null;

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = rearrange(head);

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

# Function to move the last node to the front of a given linked list
def rearrange(head):

    # proceed only when the list is valid
    if head is None or head.next is None:
        return head

    ptr = head

    # move to the second last node
    while ptr.next.next:
        ptr = ptr.next

    # transform the list into a circular list
    ptr.next.next = head

    head = ptr.next        # Fix head
    ptr.next = None        # break the chain
    return head

if __name__ == '__main__':

    # 1 —> 2 —> 3 —> 4 —> None
    head = None
    for i in reversed(range(4)):
        head = Node(i + 1, head)

    head = rearrange(head)
    printList(head)
```

We can solve this problem recursively as well. Following is its simple recursive implementation in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(struct Node** head, int data)
{
    // create a new linked list node from the heap
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
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

// Recursive function to move the last node to the front of a given linked list
void rearrange(struct Node** head, struct Node* prev, struct Node* curr)
{
    // if the current node is the last
    if (curr->next == NULL)
    {
        // make its next point to the first node
        curr->next = *head;

        // set its previous node to point to null
        prev->next = NULL;

        // change head pointer
        *head = curr;

        return;
    }

    rearrange(head, curr, curr->next);
}

// Function to move the last node to the front of a given linked list
void Rearrange(struct Node** root)
{
    // if the list contains at least two nodes
    if (*root && (*root)->next) {
        rearrange(root, NULL, *root);
    }
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4 };
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    Rearrange(&head);

    printList(head);

    return 0;
}
```

**Output:** 4 —> 1 —> 2 —> 3 —> NULL

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

    // Recursive function to move the last node to the front of a given linked list
    public static Node rearrange(Node head, Node prev, Node curr)
    {
        // if the current node is the last
        if (curr.next == null)
        {
            // make its next point to the first node
            curr.next = head;

            // set its previous node to point to null
            prev.next = null;

            // return current reference (new head)
            return curr;
        }

        return rearrange(head, curr, curr.next);
    }

    // Function to move the last node to the front of a linked list
    public static Node rearrange(Node head)
    {
        // if the list contains at least two nodes
        if (head != null && head.next != null) {
            head = rearrange(head, null, head);
        }

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = rearrange(head);

        printList(head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data, next):
        self.data = data
        self.next = next

# Helper function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Recursive function to move the last node to the front of a given linked list
def rearrange(head, prev, curr):

    # if the current node is the last
    if curr.next is None:
        # make its next point to the first node
        curr.next = head

        # set its previous node to point to None
        prev.next = None

        # return current reference (new head)
        return curr

    return rearrange(head, curr, curr.next)

# Function to move the last node to the front of a given linked list
def rearrangeList(head):

    # if the list contains at least two nodes
    if head and head.next:
        head = rearrange(head, None, head)

    return head

if __name__ == '__main__':

    head = None
    for i in reversed(range(4)):
        head = Node(i + 1, head)

    head = rearrangeList(head)
    printList(head)
```

The time complexity of both above-discussed methods is O(n), where `n` is the length of the linked list. The iterative version doesn’t require any extra space, whereas the recursive version use stack space proportional to the lists’ length.
