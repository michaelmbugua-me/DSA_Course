# Reverse a Linked List – Recursive Solution | C, C++, Java, and Python

> Source: https://www.techiedelight.com/reverse-linked-list-part-2-recursive-solution/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

This post will reverse the singly linked list using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) in C, C++, Java, and Python.

For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> null **Output:** 5 —> 4 —> 3 —> 2 —> 1 —> null

> 

We have already discussed an iterative solution to reverse the linked list in the [previous post](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/). In this post, we will cover the recursive implementation of it.

Following is the simple recursive implementation that works by fixing `.next` pointers of the list’s nodes and finally the head pointer. Probably the hardest part is accepting the concept that the `reverse(&rest, head)` does reverse the rest. Then, there’s a trick to getting the one front node at the end of the list. We recommend making a drawing to see how the trick works.

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

// Recursive function to reverse a given linked list. It reverses the
// given linked list by fixing the head pointer and then `.next`
// pointers of every node in reverse order
void recursiveReverse(struct Node* head, struct Node** headRef)
{
    struct Node* first;
    struct Node* rest;

    // empty list base case
    if (head == NULL) {
        return;
    }

    first = head;           // suppose first = {1, 2, 3}
    rest = first->next;     // rest = {2, 3}

    // base case: the list has only one node
    if (rest == NULL)
    {
        // fix the head pointer here
        *headRef = first;
        return;
    }

    // recursively reverse the smaller {2, 3} case
    // after: rest = {3, 2}
    recursiveReverse(rest, headRef);

    // put the first item at the end of the list
    rest->next = first;
    first->next = NULL;     // (tricky step — make a drawing)
}

// Reverse a given linked list. The function takes a pointer
// (reference) to the head pointer
void reverse(struct Node** head) {
    recursiveReverse(*head, head);
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

```cpp
#include <iostream>
#include <vector>
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

    cout << "nullptr" << endl;
}

// Helper function to insert a new node at the beginning of the linked list
void push(Node* &headRef, int data)
{
    Node* newNode = new Node();
    newNode->data = data;
    newNode->next = headRef;

    headRef = newNode;
}

// Recursive function to reverse a given linked list. It reverses the
// given linked list by fixing the head pointer and then `.next`
// pointers of every node in reverse order
void recursiveReverse(Node* head, Node* &headRef)
{
    Node* first;
    Node* rest;

    // empty list base case
    if (head == nullptr) {
        return;
    }

    first = head;           // suppose first = {1, 2, 3}
    rest = first->next;     // rest = {2, 3}

    // base case: the list has only one node
    if (rest == nullptr)
    {
        // fix the head pointer here
        headRef = first;
        return;
    }

    // recursively reverse the smaller {2, 3} case
    // after: rest = {3, 2}
    recursiveReverse(rest, headRef);

    // put the first item at the end of the list
    rest->next = first;
    first->next = nullptr;  // (tricky step — make a drawing)
}

// Reverse a given linked list. The function takes a pointer
// (reference) to the head pointer
void reverse(Node* &headRef) {
    recursiveReverse(headRef, headRef);
}

int main()
{
    // input keys
    vector<int> keys = { 1, 2, 3, 4, 5, 6 };

    Node* head = nullptr;
    for (int i = keys.size() - 1; i >=0; i--) {
        push(head, keys[i]);
    }

    reverse(head);
    printList(head);

    return 0;
}
```

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

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

    // Helper function to insert a new node at the beginning of the linked list
    public static Node push(Node head, int data)
    {
        Node node = new Node(data);
        node.next = head;
        return node;
    }

    // Recursive function to reverse a given linked list. It reverses the
    // given linked list by fixing the head pointer and then `.next`
    // pointers of every node in reverse order
    public static Node reverse(Node head, Node headRef)
    {
        Node first, rest;

        // empty list base case
        if (head == null) {
            return headRef;
        }

        first = head;           // suppose first = {1, 2, 3}
        rest = first.next;      // rest = {2, 3}

        // base case: the list has only one node
        if (rest == null)
        {
            // fix the head pointer here
            headRef = first;
            return headRef;
        }

        // recursively reverse the smaller {2, 3} case
        // after: rest = {3, 2}
        headRef = reverse(rest, headRef);

        // put the first item at the end of the list
        rest.next = first;
        first.next = null;      // (tricky step — make a drawing)

        return headRef;
    }

    // Reverse a given linked list. The function takes a reference to
    // the head node
    public static Node reverse(Node head) {
        return reverse(head, head);
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6 };

        Node head = null;
        for (int i = keys.length - 1; i >=0; i--) {
            head = push(head, keys[i]);
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
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

# Function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Recursive function to reverse a given linked list. It reverses the
# given linked list by fixing the head pointer and then `.next`
# pointers of every node in reverse order
def reverse(head, headRef):

    # empty list base case
    if head is None:
        return headRef

    first = head                # suppose first = [1, 2, 3]
    rest = first.next           # rest = [2, 3]

    # base case: list has only one node
    if rest is None:
        # fix the head pointer here
        headRef = first
        return headRef

    # recursively reverse the smaller {2, 3} case
    # after: rest = [3, 2]
    headRef = reverse(rest, headRef)

    # put the first item at the end of the list
    rest.next = first
    first.next = None       # (tricky step — make a drawing)

    return headRef

# Reverse a given linked list
def reverseList(head):
    return reverse(head, head)

if __name__ == '__main__':

    head = None
    for i in reversed(range(6)):
        head = Node(i + 1, head)

    head = reverseList(head)
    printList(head)
```

We can also solve this problem by passing only reference to the head pointer to the function, as demonstrated below:

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

// Recursive function to reverse a linked list. It reverses the given
// linked list by fixing the head pointer and then `.next` pointers
// of every node in reverse order.
void reverse(struct Node** head)
{
    struct Node* first;
    struct Node* rest;

    // empty list base case
    if (*head == NULL) {
        return;
    }

    first = *head;                  // suppose first = {1, 2, 3}
    rest = first->next;             // rest = {2, 3}

    // empty rest base case
    if (rest == NULL) {
        return;
    }

    reverse(&rest);                 // recursively reverse the smaller {2, 3} case
                                    // after: rest = {3, 2}

    first->next->next = first;      // put the first item at the end of the list
    first->next = NULL;             // (tricky step — make a drawing)
    *head = rest;                   // fix the head pointer
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

```cpp
#include <iostream>
#include <vector>
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

    cout << "nullptr" << endl;
}

// Helper function to insert a new node at the beginning of the linked list
void push(Node* &headRef, int data)
{
    Node* newNode = new Node();
    newNode->data = data;
    newNode->next = headRef;

    headRef = newNode;
}

// Recursive function to reverse a linked list. It reverses the given
// linked list by fixing the head pointer and then `.next` pointers
// of every node in reverse order.
// The function takes a reference to the head pointer
void reverse(Node* &headRef)
{
    Node* first;
    Node* rest;

    // empty list base case
    if (headRef == nullptr) {
        return;
    }

    first = headRef;        // suppose first = {1, 2, 3}
    rest = first->next;     // rest = {2, 3}

    // empty rest base case
    if (rest == nullptr) {
        return;
    }

    reverse(rest);  // recursively reverse the smaller {2, 3} case
                    // after: rest = {3, 2}

    first->next->next = first;  // put the first item at the end of the list
    first->next = nullptr;      // (tricky step — make a drawing)
    headRef = rest;             // fix the head pointer
}

int main()
{
    // input keys
    vector<int> keys = { 1, 2, 3, 4, 5, 6 };

    Node* head = nullptr;
    for (int i = keys.size() - 1; i >=0; i--) {
        push(head, keys[i]);
    }

    reverse(head);
    printList(head);

    return 0;
}
```

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Helper function to insert a new node at the beginning of the linked list
    public static Node push(Node head, int data)
    {
        Node node = new Node(data);
        node.next = head;
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

    // Recursive function to reverse a linked list.
    // It reverses the given linked list by fixing the head pointer and
    // then `.next` pointers of every node in reverse order
    public static Node reverse(Node head)
    {
        Node first, rest;

        // empty list base case
        if (head == null) {
            return head;
        }

        first = head;               // suppose first = {1, 2, 3}
        rest = first.next;          // rest = {2, 3}

        // empty rest base case
        if (rest == null) {
            return head;
        }

        rest = reverse(rest);       // recursively reverse the smaller {2, 3} case
        // after: rest = {3, 2}

        first.next.next = first;    // put the first item at the end of the list
        first.next = null;          // (tricky step — make a drawing)
        head = rest;                // fix the head pointer

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6 };

        Node head = null;
        for (int i = keys.length - 1; i >=0; i--) {
            head = push(head, keys[i]);
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
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

# Function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next

    print('None')

# Recursive function to reverse a linked list.
# It reverses the given linked list by fixing the head pointer and
# then `.next` pointers of every node in reverse order
def reverse(head):

    # empty list base case
    if head is None:
        return head

    first = head                # suppose first = [1, 2, 3]
    rest = first.next           # rest = [2, 3]

    # empty rest base case
    if rest is None:
        return head

    rest = reverse(rest)        # recursively reverse the smaller {2, 3} case
    # after: rest = [3, 2]

    first.next.next = first     # put the first item at the end of the list
    first.next = None           # (tricky step — make a drawing)
    head = rest                 # fix the head pointer

    return head

if __name__ == '__main__':

    head = None
    for i in reversed(range(6)):
        head = Node(i + 1, head)

    head = reverse(head)
    printList(head)
```

We can simplify the above code by passing previous node information to the function. Following is a simple recursive implementation of it in C, C++, Java, and Python:

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

// Recursive function to reverse a given linked list. It reverses the
// given linked list by fixing the head pointer and then `.next`
// pointers of every node in reverse order
void reverse(struct Node* curr, struct Node* prev, struct Node** head)
{
    // base case: end of the list reached
    if (curr == NULL)
    {
        // fix head pointer
        *head = prev;
        return;
    }

    // recur for the next node and pass the current node as a previous node
    reverse(curr->next, curr, head);

    // fix current node (nodes following it are already fixed)
    curr->next = prev;
}

// Reverse a given linked list. The function takes a pointer
// (reference) to the head pointer
void Reverse(struct Node** head) {
    reverse (*head, NULL, head);
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

    Reverse(&head);

    printList(head);

    return 0;
}
```

**Output:** 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> NULL
