# Split nodes of a linked list into the front and back halves

> Source: https://www.techiedelight.com/split-nodes-given-linked-list-front-back-halves/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, split it into two sublists – one for the front half and one for the back half. If the total number of elements in the list is odd, the extra element should go in the front list.

For example, list `{2, 3, 5, 7, 11}` should yield the two lists `{2, 3, 5}` and `{7, 11}`.

> 

## 1\. Naive Solution

Probably the simplest strategy is to compute the length of the list, then use a for loop to hop over the right number of nodes to find the last node of the front half, and then cut the list at that point.

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

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** head, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Return the total number of nodes in a list
int findLength(struct Node* head)
{
    int count = 0;
    struct Node* current = head;
    while (current != NULL)
    {
        count++;
        current=current->next;
    }
    return count;
}

/*
    Split the given list's nodes into front and back halves
    and return the two lists using the reference parameters.
    If the length is odd, the extra node should go in the front list.
*/
void frontBackSplit(struct Node* source, struct Node** frontRef, struct Node** backRef)
{
    int len = findLength(source);
    if (len < 2)
    {
        *frontRef = source;
        *backRef = NULL;
        return;
    }

    struct Node* current = source;

    int hopCount = (len - 1) / 2;        // (figured these with a few drawings)
    for (int i = 0; i < hopCount; i++) {
        current = current->next;
    }

    // Now cut at current
    *frontRef = source;
    *backRef = current->next;
    current->next = NULL;
}

int main(void)
{
    // input keys
    int keys[] = {6, 3, 4, 8, 2, 9};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    struct Node *a = NULL, *b = NULL;
    frontBackSplit(head, &a, &b);

    // print linked list
    printf("Front List: ");
    printList(a);

    printf("\nBack List: ");
    printList(b);

    return 0;
}
```

**Output:** Front List: 6 —> 3 —> 4 —> NULL Back List: 8 —> 2 —> 9 —> NULL

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

    // Return the total number of nodes in a list
    public static int findLength(Node head)
    {
        int count = 0;
        Node ptr = head;
        while (ptr != null)
        {
            count++;
            ptr = ptr.next;
        }
        return count;
    }

    /*
        Split the given list's nodes into front and back halves,
        and return the two lists using an array.
        If the length is odd, the extra node should go in the front list.
    */
    public static Node[] frontBackSplit(Node source)
    {
        Node frontRef, backRef;

        int len = findLength(source);
        if (len < 2)
        {
            frontRef = source;
            backRef = null;
            return new Node[] { frontRef, backRef };
        }

        Node current = source;

        int hopCount = (len - 1) / 2;    // (figured these with a few drawings)
        for (int i = 0; i < hopCount; i++) {
            current = current.next;
        }

        // Now cut at current
        frontRef = source;
        backRef = current.next;
        current.next = null;

        return new Node[] { frontRef, backRef };
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {6, 3, 4, 8, 2, 9};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        Node[] nodes = frontBackSplit(head);

        // print linked list
        printList("Front List: ", nodes[0]);
        printList("Back List: ", nodes[1]);
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
def printList(msg, head):

    print(msg, end='')
    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Return the total number of nodes in a list
def findLength(head):

    count = 0
    ptr = head
    while ptr:
        count = count + 1
        ptr = ptr.next
    return count

'''
    Split the given list's nodes into front and back halves,
    and return the two lists using a list.
    If the length is odd, the extra node should go in the front list.
'''
def frontBackSplit(source):

    length = findLength(source)
    if length < 2:

        frontRef = source
        backRef = None
        return frontRef, backRef

    current = source

    hopCount = (length - 1) // 2    # figured these with a few drawings
    for i in range(hopCount):
        current = current.next

    # Now cut at current
    frontRef = source
    backRef = current.next
    current.next = None

    return frontRef, backRef

if __name__ == '__main__':

    # input keys
    keys = [6, 3, 4, 8, 2, 9]

    # points to the head node of the linked list
    head = None

    # construct a linked list
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    first, second = frontBackSplit(head)

    # print linked list
    printList('Front List: ', first)
    printList('Back List: ', second)
```

## 2\. Fast/Slow Pointer Strategy

There is a tricky technique that uses two pointers to traverse the list. A “slow” pointer advances one node simultaneously, while the “fast” pointer goes two nodes at a time. When the fast pointer reaches the end, the slow pointer will be about halfway. For either strategy, care is required to split the list at the right point.

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

/*
    Split the given list's nodes into front and back halves
    and return the two lists using the reference parameters.
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow pointer strategy
*/
void frontBackSplit(struct Node* source, struct Node** frontRef,
                    struct Node** backRef)
{
    // if the length is less than 2, handle it separately
    if (source == NULL || source->next == NULL)
    {
        *frontRef = source;
        *backRef = NULL;
        return;
    }

    struct Node* slow = source;
    struct Node* fast = source->next;

    // advance `fast` two nodes and `slow` by one node
    while (fast != NULL)
    {
        fast = fast->next;
        if (fast != NULL)
        {
            slow = slow->next;
            fast = fast->next;
        }
    }

    // `slow` is before the midpoint in the list, so split it in two
    // at that point.
    *frontRef = source;
    *backRef = slow->next;
    slow->next = NULL;
}

int main(void)
{
    // input keys
    int keys[] = {6, 3, 4, 8, 2, 9};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    struct Node *a = NULL, *b = NULL;
    frontBackSplit(head, &a, &b);

    // print linked list
    printf("Front List: ");
    printList(a);

    printf("\nBack List: ");
    printList(b);

    return 0;
}
```

**Output:** Front List: 6 —> 3 —> 4 —> NULL Back List: 8 —> 2 —> 9 —> NULL

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

    /*
        Split the given list's nodes into front and back halves,
        and return the two lists using an array.
        If the length is odd, the extra node should go in the front list.
        It uses the fast/slow reference strategy
    */
    public static Node[] frontBackSplit(Node source)
    {
        Node frontRef, backRef;
        // if the length is less than 2, handle it separately
        if (source == null || source.next == null)
        {
            frontRef = source;
            backRef = null;
            return new Node[] { frontRef, backRef };
        }

        Node slow = source;
        Node fast = source.next;

        // advance `fast` two nodes and `slow` by one node
        while (fast != null)
        {
            fast = fast.next;
            if (fast != null)
            {
                slow = slow.next;
                fast = fast.next;
            }
        }

        // `slow` is before the midpoint in the list, so split it in two
        // at that point.
        frontRef = source;
        backRef = slow.next;
        slow.next = null;

        return new Node[] { frontRef, backRef };
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {6, 3, 4, 8, 2, 9};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        Node[] nodes = frontBackSplit(head);

        // print linked list
        printList("Front List: ", nodes[0]);
        printList("Back List: ", nodes[1]);
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

'''
    Split the given list's nodes into front and back halves,
    and return the two lists using a list.
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow reference strategy.
'''
def frontBackSplit(source):

    # if the length is less than 2, handle it separately
    if source is None or source.next is None:
        frontRef = source
        backRef = None
        return frontRef, backRef

    slow = source
    fast = source.next

    # advance `fast` two nodes and `slow` by one node
    while fast:
        fast = fast.next
        if fast:
            slow = slow.next
            fast = fast.next

    # `slow` is before the midpoint of the list, so split it in two
    # at that point.
    frontRef = source
    backRef = slow.next
    slow.next = None

    return frontRef, backRef

if __name__ == '__main__':

    # input keys
    keys = [6, 3, 4, 8, 2, 9]

    # points to the head node of the linked list
    head = None

    # construct a linked list
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    first, second = frontBackSplit(head)

    # print linked list
    printList('Front List: ', first)
    printList('Back List: ', second)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>
