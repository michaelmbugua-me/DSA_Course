# Intersection of two sorted linked lists

> Source: https://www.techiedelight.com/intersection-two-given-sorted-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two lists sorted in increasing order, return a new list representing their intersection. The new list should be made with its own memory – the original lists should not be changed.

For example,

**Input:** First List: 1 —> 4 —> 7 —> 10 —> null Second List: 2 —> 4 —> 6 —> 8 —> 10 —> null **Output:** 4 —> 10 —> null

> 

The strategy is to advance up both lists and build the result list as we go. When the current point in both lists is the same, add a node to the result. Otherwise, advance whichever list is smaller. By exploiting the fact that both lists are sorted, we only traverse each list once.

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

// Compute a new sorted list representing the intersection
// of the two given sorted lists without using a dummy node
struct Node* sortedIntersect(struct Node* a, struct Node* b)
{
    struct Node* head = NULL;
    struct Node* tail = NULL;

    // once one or the other list runs out — we are done
    while (a != NULL && b != NULL)
    {
        if (a->data == b->data)
        {
            if (head == NULL)
            {
                push(&head, a->data);
                tail=head;
            }
            else {
                push(&tail->next, a->data);
                tail=tail->next;
            }

            a = a->next;
            b = b->next;
        }

        // advance the smaller list
        else if (a->data < b->data) {
            a = a->next;
        }
        else {
            b = b->next;
        }
    }
    return head;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* a = NULL;
    for (int i = n - 1; i >=0; i = i - 3) {
        push(&a, keys[i]);
    }

    struct Node* b = NULL;
    for (int i = n - 1; i >=0; i = i - 2) {
        push(&b, keys[i]);
    }

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    struct Node* head = sortedIntersect(a, b);

    printf("\nAfter Intersection: ");
    printList(head);

    return 0;
}
```

**Output:** First List: 1 —> 4 —> 7 —> 10 —> NULL Second List: 2 —> 4 —> 6 —> 8 —> 10 —> NULL After Intersection: 4 —> 10 —> NULL

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

    // Compute a new sorted list representing the intersection
    // of the two given sorted lists without using a dummy node
    public static Node sortedIntersect(Node a, Node b)
    {
        Node head = null, tail = null;

        // once one or the other list runs out — we are done
        while (a != null && b != null)
        {
            if (a.data == b.data)
            {
                if (head == null) {
                    tail = head = new Node(a.data, head);
                }
                else {
                    tail = tail.next = new Node(a.data, tail.next);
                }

                a = a.next;
                b = b.next;
            }

            // advance the smaller list
            else if (a.data < b.data) {
                a = a.next;
            }
            else {
                b = b.next;
            }
        }
        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Node a = null;
        for (int i = keys.length - 1; i >= 0; i = i - 3) {
            a = new Node(keys[i], a);
        }

        Node b = null;
        for (int i = keys.length - 1; i >= 0; i = i - 2) {
            b = new Node(keys[i], b);
        }

        // print both lists
        printList("First List: ", a);
        printList("Second List: ", b);

        Node head = sortedIntersect(a, b);
        printList("After Intersection: ", head);
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

# Compute a new sorted list representing the intersection
# of the two given sorted lists without using a dummy node
def sortedIntersect(a, b):

    head = tail = None

    # once one or the other list runs out — we are done
    while a and b:

        if a.data == b.data:
            if head is None:
                head = Node(a.data, head)
                tail = head
            else:
                tail.next = Node(a.data, tail.next)
                tail = tail.next

            a = a.next
            b = b.next

        # advance the smaller list
        elif a.data < b.data:
            a = a.next
        else:
            b = b.next

    return head

if __name__ == '__main__':

    a = None
    for i in reversed(range(1, 11, 3)):
        a = Node(i, a)

    b = None
    for i in reversed(range(2, 11, 2)):
        b = Node(i, b)

    # print both lists
    printList('First List: ', a)
    printList('Second List: ', b)

    head = sortedIntersect(a, b)
    printList('After Intersection: ', head)
```

To build up the result list, we can also use both the dummy node and local reference strategy. These solutions are implementated below:

## 1\. Using Dummy Node

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

// Compute a new sorted list representing the intersection
// of the two given sorted lists. This solution uses the temporary
// dummy to build up the result list.
struct Node* sortedIntersect(struct Node* a, struct Node* b)
{
    struct Node dummy;
    struct Node* tail = &dummy;
    dummy.next = NULL;

    // once one or the other list runs out — we are done
    while (a != NULL && b != NULL)
    {
        if (a->data == b->data)
        {
            push((&tail->next), a->data);
            tail = tail->next;
            a = a->next;
            b = b->next;
        }
        // advance the smaller list
        else if (a->data < b->data) {
            a = a->next;
        }
        else {
            b = b->next;
        }
    }
    return dummy.next;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* a = NULL;
    for (int i = n - 1; i >=0; i = i - 3) {
        push(&a, keys[i]);
    }

    struct Node* b = NULL;
    for (int i = n - 1; i >=0; i = i - 2) {
        push(&b, keys[i]);
    }

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    struct Node* head = sortedIntersect(a, b);

    printf("\nAfter Intersection: ");
    printList(head);

    return 0;
}
```

**Output:** First List: 1 —> 4 —> 7 —> 10 —> NULL Second List: 2 —> 4 —> 6 —> 8 —> 10 —> NULL After Intersection: 4 —> 10 —> NULL

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

    Node() {};
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

    // Compute a new sorted list representing the intersection
    // of the two given sorted lists. This solution uses the temporary
    // dummy to build up the result list.
    public static Node sortedIntersect(Node a, Node b)
    {
        Node dummy = new Node();
        Node tail = dummy;

        // once one or the other list runs out — we are done
        while (a != null && b != null)
        {
            if (a.data == b.data)
            {
                tail = tail.next = new Node(a.data, tail.next);
                a = a.next;
                b = b.next;
            }
            // advance the smaller list
            else if (a.data < b.data) {
                a = a.next;
            }
            else {
                b = b.next;
            }
        }
        return dummy.next;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Node a = null;
        for (int i = keys.length - 1; i >= 0; i = i - 3) {
            a = new Node(keys[i], a);
        }

        Node b = null;
        for (int i = keys.length - 1; i >= 0; i = i - 2) {
            b = new Node(keys[i], b);
        }

        // print both lists
        printList("First List: ", a);
        printList("Second List: ", b);

        Node head = sortedIntersect(a, b);
        printList("After Intersection: ", head);
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

# Compute a new sorted list representing the intersection
# of the two given sorted lists. This solution uses the temporary
# dummy to build up the result list.
def sortedIntersect(a, b):

    dummy = Node()
    tail = dummy

    # once one or the other list runs out — we are done
    while a and b:

        if a.data == b.data:
            tail.next = Node(a.data, tail.next)
            tail = tail.next
            a = a.next
            b = b.next

        # advance the smaller list
        elif a.data < b.data:
            a = a.next
        else:
            b = b.next

    return dummy.next

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    a = None
    for i in reversed(range(0, len(keys), 3)):
        a = Node(keys[i], a)

    b = None
    for i in reversed(range(1, len(keys), 2)):
        b = Node(keys[i], b)

    # print both lists
    printList('First List: ', a)
    printList('Second List: ', b)

    head = sortedIntersect(a, b)
    printList('After Intersection: ', head)
```

## 2\. Using Local References

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

// Compute a new sorted list representing the intersection of the
// two given sorted lists. This solution uses the local reference
struct Node* sortedIntersect(struct Node* a, struct Node* b)
{
    struct Node* result = NULL;
    struct Node** lastPtrRef = &result;

    // advance comparing the first nodes in both lists.
    // When one or the other list runs out, we are done.
    while (a != NULL && b != NULL)
    {
        // found a node for the intersection
        if (a->data == b->data)
        {
            push(lastPtrRef, a->data);
            lastPtrRef = &((*lastPtrRef)->next);
            a = a->next;
            b = b->next;
        }
        // advance the smaller list
        else if (a->data < b->data) {
            a = a->next;
        }
        else {
            b = b->next;
        }
    }

    return result;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* a = NULL;
    for (int i = n - 1; i >=0; i = i - 3) {
        push(&a, keys[i]);
    }

    struct Node* b = NULL;
    for (int i = n - 1; i >=0; i = i - 2) {
        push(&b, keys[i]);
    }

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    struct Node* head = sortedIntersect(a, b);

    printf("\nAfter Intersection: ");
    printList(head);

    return 0;
}
```

**Output:** First List: 1 —> 4 —> 7 —> 10 —> NULL Second List: 2 —> 4 —> 6 —> 8 —> 10 —> NULL After Intersection: 4 —> 10 —> NULL
