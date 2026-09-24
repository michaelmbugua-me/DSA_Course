# Reverse a linked List – Iterative Solution | C, Java, and Python

> Source: https://www.techiedelight.com/reverse-linked-list-part-1-iterative-solution/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

In this post, we will see how to reverse the singly linked list iteratively without using recursion.

For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> null **Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

> 

The idea is to use three-pointers: `next`, `current`, `previous` and move them down the list. Here, `current` is the main pointer running down the list, `next` leads it, and `previous` trails it. For each step, reverse the current pointer and then advance all three to get the next node.

This `previous-current-next` strategy can be implemented as follows in C, Java, and Python:

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

// Reverses a given linked list by changing its `.next` pointers and
// its head pointer. Takes a pointer (reference) to the head pointer
void reverse(struct Node** head)
{
    struct Node* previous = NULL;   // the previous pointer
    struct Node* current = *head;   // the main pointer

    // traverse the list
    while (current != NULL)
    {
        // tricky: note the next node
        struct Node* next = current->next;

        current->next = previous;    // fix the current node

        // advance the two pointers
        previous = current;
        current = next;
    }

    // fix the head pointer to point to the new front
    *head = previous;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >=0; i--) {
        push(&head, keys[i]);
    }

    reverse(&head);

    printList(head);

    return 0;
}
```

**Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> NULL

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

    // Reverses a given linked list by changing its `.next` fields and
    // its head.
    public static Node reverse(Node head)
    {
        Node previous = null;
        Node current = head;

        // traverse the list
        while (current != null)
        {
            // tricky: note the next node
            Node next = current.next;

            current.next = previous;    // fix the current node

            previous = current;
            current = next;
        }

        // fix the head to point to the new front
        return previous;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = reverse(head);
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

# Function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Reverses a given linked list by changing its `.next` fields and
# its head.
def reverse(head):

    previous = None
    current = head

    # traverse the list
    while current:

        # tricky: note the next node
        next = current.next

        current.next = previous        # fix the current node

        previous = current
        current = next

    # fix the head to point to the new front
    return previous

if __name__ == '__main__':

    head = None
    for i in reversed(range(6)):
        head = Node(i + 1, head)

    head = reverse(head)
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space. Here’s another variation of the above solution that uses [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) to do the work.

The implementation can be seen below in C:

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

// Iterate through the list and move each node to the front of the
// result list like `push()` of the node. It uses `moveNode()`.
void reverse(struct Node** head)
{
    struct Node* result = NULL;
    struct Node* current = *head;

    while (current != NULL) {
        moveNode(&result, &current);
    }

    *head = result;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >=0; i--) {
        push(&head, keys[i]);
    }

    reverse(&head);

    printList(head);

    return 0;
}
```

**Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> NULL

**Also see:**

> [Reverse a Linked List – Recursive Solution | C, C++, Java, and Python](https://techiedelight.com/reverse-linked-list-part-2-recursive-solution/)

> [Reverse specified portion of a linked list](https://techiedelight.com/reverse-specified-portion-linked-list/)

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>
