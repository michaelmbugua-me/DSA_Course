# Reverse a doubly linked list

> Source: https://www.techiedelight.com/reverse-doubly-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

In this post, we will see how to reverse a doubly linked list using iteration and recursion.

> 

## 1\. Iterative Solution

The idea is simple – Traverse the list and swap `next` and `prev` pointers for each node. Finally, update `head` pointer to point to the last node.

Following is the C, Java, and Python program that demonstrates it:

```c
#include <stdio.h>
#include <stdlib.h>

// A Doubly Linked List Node
struct Node
{
    int data;
    struct Node *next, *prev;
};

// Utility function to push a node at the beginning of the doubly linked list
void push(struct Node** headRef, int key)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = key;
    node->prev = NULL;
    node->next = *headRef;

    // change `prev` of the existing head node to point to the new node
    if (*headRef != NULL) {
        (*headRef)->prev = node;
    }

    // update head pointer
    *headRef = node;
}

// Helper function to print nodes of a doubly linked list
void printDDL(char* msg, struct Node* head)
{
    printf("%s: ", msg);
    while (head != NULL)
    {
        printf("%d —> ", head->data);
        head = head->next;
    }

    printf("NULL\n");
}

// Function to swap `next` and `prev` pointers of the given node
void swap(struct Node* node)
{
    struct Node* prev = node->prev;
    node->prev = node->next;
    node->next = prev;
}

// Function to reverse a doubly-linked list
void reverseDDL(struct Node** headRef)
{
    struct Node* prev = NULL;
    struct Node* curr = *headRef;

    // traverse the list
    while (curr != NULL)
    {
        // swap `next` and `prev` pointers for the current node
        swap(curr);

        // update the previous node before moving to the next node
        prev = curr;

        // move to the next node in the doubly linked list
        // (advance using `prev` pointer since `next` and `prev` pointers were swapped)
        curr = curr->prev;
    }

    // update head pointer to the last node
    if (prev != NULL) {
        *headRef = prev;
    }
}

int main(void)
{
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = 0; i < n; i++) {
        push(&head, keys[i]);
    }

    printDDL("Original list", head);
    reverseDDL(&head);
    printDDL("Reversed list", head);

    return 0;
}
```

**Output:** Original list: 5 —> 4 —> 3 —> 2 —> 1 —> NULL Reversed list: 1 —> 2 —> 3 —> 4 —> 5 —> NULL

##

```java
// A Doubly Linked List Node
class Node
{
    int data;
    Node next, prev;
}

class Main
{
    // Utility function to push a node at the beginning of the doubly linked list
    public static Node push(Node head, int key)
    {
        Node node = new Node();
        node.data = key;
        node.prev = null;
        node.next = head;

        // change `prev` of the existing head node to point to the new node
        if (head != null) {
            head.prev = node;
        }

        // update head pointer and return
        head = node;
        return head;
    }

    // Helper function to print nodes of a doubly linked list
    public static void printDDL(String msg, Node head)
    {
        System.out.print(msg);
        while (head != null)
        {
            System.out.print(head.data + " —> ");
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to swap `next` and `prev` pointers of the given node
    public static void swap(Node node)
    {
        Node prev = node.prev;
        node.prev = node.next;
        node.next = prev;
    }

    // Function to reverse a doubly-linked list
    public static Node reverseDDL(Node head)
    {
        Node prev = null;
        Node curr = head;

        // traverse the list
        while (curr != null)
        {
            // swap `next` and `prev` pointers for the current node
            swap(curr);

            // update the previous node before moving to the next node
            prev = curr;

            // move to the next node in the doubly linked list (advance using
            // `prev` pointer since `next` and `prev` pointers were swapped)
            curr = curr.prev;
        }

        // update head pointer to the last node
        if (prev != null) {
            head = prev;
        }

        return head;
    }

    public static void main(String[] args)
    {
        int[] keys = { 1, 2, 3, 4, 5 };

        Node head = null;
        for (int key: keys) {
            head = push(head, key);
        }

        printDDL("Original list: ", head);
        head = reverseDDL(head);
        printDDL("Reversed list: ", head);
    }
}
```

##

```python3
# A Doubly Linked List Node
class Node:
    # Constructor
    def __init__(self, data=None, prev=None, next=None):
        self.data = data
        self.prev = prev
        self.next = next

# Utility function to push a node at the beginning of the doubly linked list
def push(head, data):

    node = Node(data, None, head)

    # change `prev` of the existing head node to point to the new node
    if head:
        head.prev = node

    # update head pointer and return
    head = node
    return head

# Helper function to print nodes of a doubly linked list
def printDDL(msg, head):

    print(msg, end='')
    while head:
        print(head.data, end=' —> ')
        head = head.next

    print('None')

# Function to swap `next` and `prev` pointers of the given node
def swap(node):

    prev = node.prev
    node.prev = node.next
    node.next = prev

# Function to reverse a doubly-linked list
def reverseDDL(head):

    prev = None
    curr = head

    # traverse the list
    while curr:
        # swap `next` and `prev` pointers for the current node
        swap(curr)

        # update the previous node before moving to the next node
        prev = curr

        # move to the next node in the doubly linked list
        # (advance using `prev` pointer since `next` and `prev` pointers were swapped)
        curr = curr.prev

    # update head pointer to the last node
    if prev:
        head = prev

    return head

if __name__ == '__main__':

    head = None
    for key in range(1, 6):
        head = push(head, key)

    printDDL('Original A: ', head)
    head = reverseDDL(head)
    printDDL('Reversed A: ', head)
```

## 2\. Recursive Solution

We can also solve this problem recursively by passing current node information in the [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) itself. This is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Doubly Linked List Node
struct Node
{
    int data;
    struct Node *next, *prev;
};

// Utility function to push a node at the beginning of the doubly linked list
void push(struct Node** headRef, int key)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = key;
    node->prev = NULL;
    node->next = *headRef;

    // change `prev` of the existing head node to point to the new node
    if (*headRef != NULL)
        (*headRef)->prev = node;

    // update head pointer
    *headRef = node;
}

// Helper function to print nodes of a doubly linked list
void printDDL(char* msg, struct Node* head)
{
    printf("%s: ", msg);
    while (head != NULL)
    {
        printf("%d —> ", head->data);
        head = head->next;
    }

    printf("NULL\n");
}

// Function to swap `next` and `prev` pointers of the given node
void swap(struct Node* node)
{
    struct Node* prev = node->prev;
    node->prev = node->next;
    node->next = prev;
}

// Recursive function to reverse a doubly-linked list
void reverse(struct Node** headRef, struct Node* curr)
{
    // last node
    if (curr->next == NULL)
    {
        // swap `next` and `prev` pointers for the current node
        swap(curr);

        // update head
        *headRef = curr;
        return;
    }

    // swap `next` and `prev` pointers for the current node
    swap(curr);

    // recur with the next node
    reverse(headRef, curr->prev);
}

// Function to reverse a doubly-linked list
void reverseDDL(struct Node** headRef)
{
    // base case
    if (*headRef == NULL) {
        return;
    }

    // stores the previous node and the current node
    struct Node* curr = *headRef;

    // pass current and previous node information in the recursion itself
    reverse(headRef, curr);
}

int main(void)
{
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = 0; i < n; i++) {
        push(&head, keys[i]);
    }

    printDDL("Original list", head);
    reverseDDL(&head);
    printDDL("Reversed list", head);

    return 0;
}
```

**Output:** Original list: 5 —> 4 —> 3 —> 2 —> 1 —> NULL Reversed list: 1 —> 2 —> 3 —> 4 —> 5 —> NULL

##

```java
// A Doubly Linked List Node
class Node
{
    int data;
    Node next, prev;

    public Node(int data)
    {
        this.data = data;
        this.next = this.prev = null;
    }
}

class Main
{
    // Utility function to push a node at the beginning of the doubly linked list
    public static Node push(Node head, int key)
    {
        Node node = new Node(key);
        node.next = head;

        // change `prev` of the existing head node to point to the new node
        if (head != null) {
            head.prev = node;
        }

        // update head and return
        head = node;
        return head;
    }

    // Helper function to print nodes of a doubly linked list
    public static void printDDL(String msg, Node head)
    {
        System.out.print(msg);
        while (head != null)
        {
            System.out.printf("%d —> ", head.data);
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to swap `next` and `prev` pointers of the given node
    public static void swap(Node node)
    {
        Node prev = node.prev;
        node.prev = node.next;
        node.next = prev;
    }

    // Recursive function to reverse a doubly-linked list
    public static Node reverse(Node head, Node curr)
    {
        // last node
        if (curr.next == null)
        {
            // swap `next` and `prev` pointers for the current node
            swap(curr);

            // update head
            head = curr;
            return head;
        }

        // swap `next` and `prev` pointers for the current node
        swap(curr);

        // recur with the next node
        head = reverse(head, curr.prev);
        return head;
    }

    // Function to reverse a doubly-linked list
    public static Node reverseDDL(Node head)
    {
        // base case
        if (head == null) {
            return head;
        }

        // stores the previous node and the current node
        Node curr = head;

        // pass current and previous node information in the recursion itself
        head = reverse(head, curr);
        return head;
    }

    public static void main(String[] args)
    {
        int[] keys = { 1, 2, 3, 4, 5 };

        Node head = null;
        for (int key: keys) {
            head = push(head, key);
        }

        printDDL("Original list: ", head);
        head = reverseDDL(head);
        printDDL("Reversed list: ", head);
    }
}
```

##

```python3
# A Doubly Linked List Node
class Node:
    next = prev = None

    def __init__(self, data):
        self.data = data

# Utility function to push a node at the beginning of the doubly linked list
def push(head, key):

    node = Node(key)
    node.next = head

    # change `prev` of the existing head node to point to the new node
    if head:
        head.prev = node

    # update head and return
    head = node
    return head

# Helper function to print nodes of a doubly linked list
def printDDL(msg, head):

    print(msg, end='')
    while head:
        print(head.data, end=' —> ')
        head = head.next
    print('None')

# Function to swap `next` and `prev` pointers of the given node
def swap(node):

    prev = node.prev
    node.prev = node.next
    node.next = prev

# Recursive function to reverse a doubly-linked list
def reverse(head, curr):

    # last node
    if curr.next is None:

        # swap `next` and `prev` pointers for the current node
        swap(curr)

        # update head
        head = curr
        return head

    # swap `next` and `prev` pointers for the current node
    swap(curr)

    # recur with the next node
    head = reverse(head, curr.prev)
    return head

# Function to reverse a doubly-linked list
def reverseDDL(head):

    # base case
    if not head:
        return head

    # stores the previous node and the current node
    curr = head

    # pass current and previous node information in the recursion itself
    head = reverse(head, curr)
    return head

if __name__ == '__main__':

    head = None
    for key in range(1, 6):
        head = push(head, key)

    printDDL('Original List: ', head)
    head = reverseDDL(head)
    printDDL('Reversed List: ', head)
```

The time complexity of both above-discussed methods is O(n), where `n` is the length of the linked list. The iterative version doesn’t require any extra space, whereas the recursive version use stack space proportional to the lists’ length.
