# Split a linked list into two lists where each list contains alternating elements from it

> Source: https://www.techiedelight.com/split-linked-list-into-two-lists-list-containing-alternating-elements/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list of integers, split it into two lists containing alternating elements from the original list.

For example, if the original list is `{1, 2, 3, 4, 5}`, then one sublist should be `{1, 3, 5}` and the other should be `{2, 4}`. The elements in the output lists may be in any order. i.e., the sublists can be `{5, 3, 1}` and `{4, 2}` for input list `{1, 2, 3, 4, 5}`.

> 

## 1\. Using `moveNode()` function

The simplest approach iterates over the source list and use [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) to pull nodes off the source and alternately put them on `a` and `b`. The only strange part is that the nodes will be in the reverse order in the source list.

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

// Function takes the node from the front of the source and moves it
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

/*
    Given the source list, split its nodes into two shorter lists.
    If we number the elements 0, 1, 2, then all the even elements
    should go in the first list and all the odd elements in the second.
    The elements in the new lists may be in any order.
*/
void alternatingSplit(struct Node* source, struct Node** aRef, struct Node** bRef)
{
    // Split the nodes into `a` and `b` lists
    struct Node* a = NULL;
    struct Node* b = NULL;

    struct Node* current = source;

    while (current != NULL)
    {
        moveNode(&a, &current);         // Move a node to `a`

        if (current != NULL) {
            moveNode(&b, &current);     // Move a node to `b`
        }
    }

    *aRef = a;
    *bRef = b;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7 };
    int n = sizeof(keys)/sizeof(keys[0]);

    // construct the first linked list
    struct Node* head = NULL;
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    struct Node *a = NULL, *b = NULL;
    alternatingSplit(head, &a, &b);

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    return 0;
}
```

**Output:** First List: 7 —> 5 —> 3 —> 1 —> NULL Second List: 6 —> 4 —> 2 —> NULL

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
        Given the source list, split its nodes into two shorter lists.
        If we number the elements 0, 1, 2, … then all the even elements
        should go in the first list and all the odd elements in the second.
        The elements in the new lists may be in any order.
    */
    public static Node[] alternatingSplit(Node source)
    {
        // Split the nodes into `a` and `b` lists
        Node a = null;
        Node b = null;
        Node current = source;

        while (current != null)
        {
            // Move a node to `a`

            Node newNode = current;         // the front source node
            current = current.next;         // advance the source

            newNode.next = a;               // link the old dest off the new node
            a = newNode;                    // move dest to point to the new node

            if (current != null)
            {
                // Move a node to `b`

                newNode = current;          // the front source node
                current = current.next;     // advance the source

                newNode.next = b;           // link the old dest off the new node
                b = newNode;                // move dest to point to the new node
            }
        }

        return new Node[] { a, b };
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7 };

        // construct the first linked list
        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        Node[] nodes = alternatingSplit(head);

        // print both lists
        printList("First List: ", nodes[0]);
        printList("Second List: ", nodes[1]);
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

'''
    Given the source list, split its nodes into two shorter lists.
    If we number the elements 0, 1, 2, then all the even elements
    should go in the first list and all the odd elements in the second.
    The elements in the lists may be in any order.
'''

def alternatingSplit(source):

    # Split the nodes into `a` and `b` lists
    a = None
    b = None
    current = source

    while current:

        # Move a node to `a`

        newNode = current           # the front source node
        current = current.next      # advance the source

        newNode.next = a            # link the old dest off the new node
        a = newNode                 # move dest to point to the new node

        if current:
            # Move a node to `b`

            newNode = current       # the front source node
            current = current.next  # advance the source

            newNode.next = b        # link the old dest off the new node
            b = newNode             # move dest to point to the new node

    return a, b

if __name__ == '__main__':

    # construct the first linked list
    head = None
    for i in reversed(range(7)):
        head = Node(i + 1, head)

    first, second = alternatingSplit(head)

    # print both lists
    printList('First List: ', first)
    printList('Second List: ', second)
```

## 2\. Using Dummy Nodes

Here is an alternative approach that builds the sublists in the same order as the source list. The code uses temporary dummy header nodes for the `a` and `b` lists as they are being built. Each sublist has a “tail” pointer that points to its current last node – that way, new nodes can be appended at the end of each list easily. The dummy nodes give the tail pointers something to point to initially. The dummy nodes are efficient in this case because they are temporary and allocated in the stack.

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

// Function takes the node from the front of the source and moves it
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

/*
    Given the source list, split its nodes into two shorter lists.
    If we number the elements 0, 1, 2, then all the even elements
    should go in the first list and all the odd elements in the second.
    The elements in the new lists may be in any order.
*/
void alternatingSplit(struct Node* source, struct Node** aRef,
                    struct Node** bRef)
{
    struct Node aDummy;
    struct Node* aTail = &aDummy;               // points to the last node in `a`
    aDummy.next = NULL;

    struct Node bDummy;
    struct Node* bTail = &bDummy;               // points to the last node in `b`
    bDummy.next = NULL;

    struct Node* current = source;

    while (current != NULL)
    {
        moveNode(&(aTail->next), &current);     // add at `a` tail
        aTail = aTail->next;                    // advance the `a` tail
        if (current != NULL)
        {
            moveNode(&(bTail->next), &current);
            bTail = bTail->next;
        }
    }
    *aRef = aDummy.next;
    *bRef = bDummy.next;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7 };
    int n = sizeof(keys)/sizeof(keys[0]);

    // construct the first linked list
    struct Node* head = NULL;
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    struct Node *a = NULL, *b = NULL;
    alternatingSplit(head, &a, &b);

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    return 0;
}
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL

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
        Given the source list, split its nodes into two shorter lists.
        If we number the elements 0, 1, 2, … then all the even elements
        should go in the first list and all the odd elements in the second.
        The elements in the new lists may be in any order.
    */
    public static Node[] alternatingSplit(Node source)
    {
        Node aDummy = new Node();
        Node aTail = aDummy;            // points to the last node in `a`
        aDummy.next = null;

        Node bDummy = new Node();
        Node bTail = bDummy;            // points to the last node in `b`
        bDummy.next = null;

        Node current = source;

        while (current != null)
        {
            // add at `a` tail

            Node newNode = current;
            current = current.next;

            newNode.next = aTail.next;
            aTail.next = newNode;

            aTail = aTail.next;         // advance the `a` tail
            if (current != null)
            {
                // add at `b` tail

                newNode = current;
                current = current.next;

                newNode.next = bTail.next;
                bTail.next = newNode;

                bTail = bTail.next;     // advance the `b` tail
            }
        }

        return new Node[] { aDummy.next, bDummy.next };
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7 };

        // construct the first linked list
        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        Node[] nodes = alternatingSplit(head);

        // print both lists
        printList("First List: ", nodes[0]);
        printList("Second List: ", nodes[1]);
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
    Given the source list, split its nodes into two shorter lists.
    If we number the elements 0, 1, 2, then all the even elements
    should go in the first list and all the odd elements in the second.
    The elements in the lists may be in any order.
'''
def alternatingSplit(source):

    aDummy = Node()
    aTail = aDummy              # points to the last node in `a`
    aDummy.next = None

    bDummy = Node()
    bTail = bDummy              # points to the last node in `b`
    bDummy.next = None

    current = source

    while current:

        # add at `a` tail
        newNode = current
        current = current.next

        newNode.next = aTail.next
        aTail.next = newNode

        aTail = aTail.next      # advance the `a` tail
        if current:

            # add at `b` tail
            newNode = current
            current = current.next

            newNode.next = bTail.next
            bTail.next = newNode

            bTail = bTail.next  # advance the `b` tail

    return aDummy.next, bDummy.next

if __name__ == '__main__':

    # construct the first linked list
    head = None
    for i in reversed(range(1, 8)):
        head = Node(i, head)

    first, second = alternatingSplit(head)

    # print both lists
    printList('First List: ', first)
    printList('Second List: ', second)
```

## 3\. Using Recursion

We can easily solve this problem by [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) as well. The recursive implementation can be seen below in C, Java, and Python:

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

// Recursive function to split a given linked list into two lists where
// each list containing alternating elements from the original list.
// The solution maintains the same order as the source list
void alternatingSplit(struct Node* odd, struct Node* even)
{
    if (odd == NULL || even == NULL) {
        return;
    }

    if (odd->next) {
        odd->next = odd->next->next;
    }

    if (even->next) {
        even->next = even->next->next;
    }

    alternatingSplit(odd->next, even->next);
}

/*
    Given the source list, split its nodes into two shorter lists.
    If we number the elements 0, 1, 2, then all the even elements
    should go in the first list and all the odd elements in the second.
    The elements in the new lists may be in any order.
*/
void split(struct Node* source, struct Node** aRef, struct Node** bRef)
{
    if (!source) {
        return;
    }

    *aRef = source;
    *bRef = source->next;
    alternatingSplit(*aRef, *bRef);
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7 };
    int n = sizeof(keys)/sizeof(keys[0]);

    // construct the first linked list
    struct Node* head = NULL;
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    struct Node *a = NULL, *b = NULL;
    split(head, &a, &b);

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    return 0;
}
```

**Output:** First List: 1 —> 3 —> 5 —> 7 —> NULL Second List: 2 —> 4 —> 6 —> NULL
