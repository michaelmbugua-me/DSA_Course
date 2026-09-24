# Static Linked List – C, Java, and Python

> Source: https://www.techiedelight.com/static-linked-list-c/

We have discussed the linked list data structure, which is dynamic in nature (the memory is allocated during the run time). Now the question that might be on a few people’s minds is – can a linked link be implemented statically as well? This post tries to answer this question.

The fundamental purpose of a pointer-based linked list is to provide dynamic expansion, but when your linked list does not need to have a dynamic size, we can use static storage for it. The automatic storage has the property that its lifetime ends when the block’s execution is declared terminated, so it is difficult to use it for long-lived data. Also, there’s typically a bound on the amount of such storage we can obtain, and past that memory, the overflow will happen. And there is no way to detect when we have exceeded that bound.

The following code in C, Java, and Python uses automatic storage to allocate nodes of the linked list:

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
    struct Node* temp = head;
    while (temp)
    {
        printf("%d —> ", temp->data);
        temp = temp->next;
    }
    printf("NULL");
}

int main(void)
{
    struct Node e = { 5, NULL };    // last node
    struct Node d = { 4, &e };
    struct Node c = { 3, &d };
    struct Node b = { 2, &c };
    struct Node a = { 1, &b };      // first node

    struct Node* head = &a;

    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> NULL

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

    public static void main(String[] args)
    {
        Node e = new Node(5, null);     // last node
        Node d = new Node(4, e);
        Node c = new Node(3, d);
        Node b = new Node(2, c);
        Node a = new Node(1, b);        // first node

        Node head = a;
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

if __name__ == '__main__':

    e = Node(5, None)   # last node
    d = Node(4, e)
    c = Node(3, d)
    b = Node(2, c)
    a = Node(1, b)      # first node

    head = a
    printList(head)
```

The above method will become a pain if the total number of nodes required is huge in the linked list. We can construct a linked list easily using iteration if the keys are given in the form of an array or any other data structure (using its iterator).

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
    struct Node* curr = head;
    while (curr)
    {
        printf("%d —> ", curr->data);
        curr = curr->next;
    }
    printf("NULL");
}

int main(void)
{
    int arr[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(arr) / sizeof(arr[0]);

    struct Node node[n];
    for (int i = 0; i < n; i++)
    {
        node[i].data = arr[i];
        node[i].next = NULL;

        if (i > 0) {
            node[i-1].next = &node[i];
        }
    }

    struct Node* head = node;

    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> NULL

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

    public static void main(String[] args)
    {
        int[] arr = { 1, 2, 3, 4, 5 };

        Node[] node = new Node[arr.length];
        for (int i = 0; i < arr.length; i++)
        {
            node[i] = new Node(arr[i], null);

            if (i > 0) {
                node[i - 1].next = node[i];
            }
        }

        Node head = node[0];
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

if __name__ == '__main__':

    A = [1, 2, 3, 4, 5]

    node = [None] * len(A)

    for i in range(len(A)):
        node[i] = Node(A[i], None)
        if i > 0:
            node[i - 1].next = node[i]

    head = node[0]
    printList(head)
```

These nodes’ lifetime is the scope they are declared in – they no longer exist when the scope ends. We can verify that by placing our code inside the block scope and accessing the nodes outside the block scope.

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
    struct Node* curr = head;
    while (curr)
    {
        printf("%d —> ", curr->data);
        curr = curr->next;
    }
    printf("NULL");
}

int main(void)
{
    int arr[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(arr)/sizeof(arr[0]);

    struct Node* root = NULL;
    { // Entering block scope
        struct Node node[n];
        for (int i = 0; i < n; i++)
        {
            node[i].data = arr[i];
            node[i].next = NULL;
            if (i > 0) {
                node[i-1].next = &node[i];
            }
        }
        root = node;
    } // Exiting block scope

    printList(root);

    return 0;
}
```

**Output:** Runtime Error
