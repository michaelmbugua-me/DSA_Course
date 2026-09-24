# Reverse every group of `k` nodes in a linked list

> Source: https://www.techiedelight.com/reverse-every-k-nodes-of-a-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, reverse every adjacent group of `k` nodes where `k` is a given positive integer.

For example,

**Input List:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> null For k = 3, **Output:** 3 —> 2 —> 1 —> 6 —> 5 —> 4 —> 8 —> 7 —> null For k = 2, **Output:** 2 —> 1 —> 4 —> 3 —> 6 —> 5 —> 8 —> 7 —> null For k = 1, **Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> null For k >= 8, **Output:** 8 —> 7 —> 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

> 

The idea is to consider every group of `k` nodes and [recursively reverse](https://techiedelight.com/reverse-linked-list-part-2-recursive-solution/) them one at a time. Special care has to be taken while linking reversed groups with each other.

The algorithm can be implemented as follows in C, Java, and Python:

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

// Iterative function to reverse first `k` nodes of a linked list
struct Node* reverseK(struct Node** current, int k)
{
    struct Node* prev = NULL;
    int count = 0;

    // iterate through the list and move/insert each node
    // in front of the result list (like a push of the node)
    while (*current && count++ < k)
    {
        // tricky: note the next node
        struct Node* next = (*current)->next;

        // move the current node onto the result
        (*current)->next = prev;

        // update the previous pointer to the current node
        prev = *current;

        // move to the next node in the list
        *current = next;
    }

    // return last processed node
    return prev;
}

// Function to reverse every group of `k` nodes in a given linked list
struct Node *reverseInGroups(struct Node *head, int k)
{
    // base case
    if (head == NULL) {
        return NULL;
    }

    // start with the current node
    struct Node* current = head;

    // reverse next `k` nodes
    struct Node* prev = reverseK(&current, k);

    // recur for remaining nodes
    head->next = reverseInGroups(current, k);

    // it is important to return the previous node (to link every group of `k` nodes)
    return prev;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >=0; i--) {
        push(&head, keys[i]);
    }

    head = reverseInGroups(head, 3);

    printList(head);

    return 0;
}
```

**Output:** 3 —> 2 —> 1 —> 6 —> 5 —> 4 —> 8 —> 7 —> NULL

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

    // Helper function to print linked list starting from the current node
    public void print()
    {
        Node ptr = this;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.next;
        }
        System.out.println("null");
    }
}

class Main
{
    // Function to reverse every group of `k` nodes in a given linked list
    public static Node reverseInGroups(Node head, int k)
    {
        // base case
        if (head == null) {
            return null;
        }

        // start with the current node
        Node current = head;

        // reverse next `k` nodes
        Node prev = null;
        int count = 0;

        // iterate through the list and move/insert each node
        // in front of the result list (like a push of the node)
        while (current != null && count++ < k)
        {
            // tricky: note the next node
            Node next = current.next;

            // move the current node onto the result
            current.next = prev;

            // update the previous pointer to the current node
            prev = current;

            // move to the next node in the list
            current = next;
        }

        // recur for remaining nodes
        head.next = reverseInGroups(current, k);

        // it is important to return the previous node
        // (to link every group of `k` nodes)
        return prev;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7, 8 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = reverseInGroups(head, 3);
        head.print();
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

    # Helper function to print linked list starting from the current node
    def print(self):

        ptr = self
        while ptr:
            print(ptr.data, end=' —> ')
            ptr = ptr.next

        print('None')

# Function to reverse every group of `k` nodes in a given linked list
def reverseInGroups(head, k):

    # base case
    if head is None:
        return None

    # start with the current node
    current = head

    # reverse next `k` nodes
    prev = None
    count = 0

    # iterate through the list and move/insert each node
    # in front of the result list (like a push of the node)
    while current and count < k:

        count = count + 1

        # tricky: note the next node
        next = current.next

        # move the current node onto the result
        current.next = prev

        # update the previous pointer to the current node
        prev = current

        # move to the next node in the list
        current = next

    # recur for remaining nodes
    head.next = reverseInGroups(current, k)

    # it is important to return the previous node (to link every group of `k` nodes)
    return prev

if __name__ == '__main__':

    head = None
    for i in reversed(range(8)):
        head = Node(i + 1, head)

    head = reverseInGroups(head, 3)
    head.print()
```

The above solution returns the head pointer from the function. Alternatively, we can pass a pointer (reference) to the head node to the `reverseInGroups()` function and avoid updating the head pointer insider the `main()` function.

Following is the C program that demonstrates it:

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

// Iterative function to reverse first `k` nodes of a linked list
struct Node* reverseK(struct Node** current, int k)
{
    struct Node* prev = NULL;
    int count = 0;

    // iterate through the list and move/insert each node
    // in front of the result list (like a push of the node)
    while (*current && count++ < k)
    {
        // tricky: note the next node
        struct Node* next = (*current)->next;

        // move the current node onto the result
        (*current)->next = prev;

        // update the previous pointer to the current node
        prev = *current;

        // move to the next node in the list
        *current = next;
    }

    // return last processed node
    return prev;
}

// Function to reverse every group of `k` nodes in a given linked list
// call function as reverseInGroups(&head, k)
void reverseInGroups(struct Node **head, int k)
{
    // base case
    if (*head == NULL) {
        return;
    }

    // start with the current node
    struct Node* current = *head;

    // reverse next `k` nodes
    struct Node* prev = reverseK(&current, k);

    // recur for remaining nodes
    reverseInGroups(&current, k);

    // fix head node
    (*head)->next = current;
    *head = prev;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >=0; i--) {
        push(&head, keys[i]);
    }

    reverseInGroups(&head, 3);

    printList(head);

    return 0;
}
```

The time complexity of the above solution is O(n), where `n` is the length of the linked list. The auxiliary space required by the program for the call stack is proportional to the lists’ length.

**Exercise:** Modify the solution to reverse every alternate group of `k` nodes.
