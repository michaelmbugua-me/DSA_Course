# Rearrange a linked list by separating odd nodes from even ones

> Source: https://www.techiedelight.com/rearrange-linked-list-separating-odd-nodes-even/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, rearrange it by separating odd nodes from even ones. All even nodes should come before all odd nodes in the output list, and the relative order of even and odd nodes should be maintained.

For example, consider list `{1, 2, 3, 4, 5, 6, 7}`. Rearranging it should yield `{2, 4, 6, 1, 3, 5, 7}`.

> 

## 1\. Using Iteration

The problem can be solved either iteratively or recursively. Following is the simple iterative implementation in C, Java, and Python that does not use a dummy node:

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

// Rearrange a given linked list by separating odd nodes
// from even ones and maintaining their relative order.
// This approach does not use any dummy node.
void rearrangeEvenOdd(struct Node** head)
{
    struct Node *odd = NULL, *oddTail = NULL;
    struct Node *even = NULL, *evenTail = NULL;

    struct Node* curr = *head;

    while (curr != NULL)
    {
        if (curr->data & 1)        // current node is odd
        {
            // handle head for the first odd node
            if (odd == NULL) {
                odd = oddTail = curr;
            }
            else {
                oddTail->next = curr;
                oddTail = oddTail->next;
            }
        }
        else    // current node is even
        {
            // handle head for the first even node
            if (even == NULL) {
                even = evenTail = curr;
            }
            else {
                evenTail->next = curr;
                evenTail = curr;
            }
        }
        curr = curr->next;
    }

    // if the list contains at least one even node
    if (even)
    {
        *head = even;
        evenTail->next = odd;
    }
    // special case – list contains all odd nodes
    else {
        *head = odd;
    }

    // NULL to terminate the list; otherwise, it will go into an infinite loop
    if (oddTail) {
        oddTail->next = NULL;
    }
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >=0; i--) {
        push(&head, keys[i]);
    }

    rearrangeEvenOdd(&head);
    printList(head);

    return 0;
}
```

**Output:** 2 —> 4 —> 6 —> 8 —> 10 —> 1 —> 3 —> 5 —> 7 —> 9 —> NULL

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

    // Rearrange a given linked list by separating odd nodes
    // from even ones and maintaining their relative order.
    // This approach does not use any dummy node.
    public static Node rearrangeEvenOdd(Node head)
    {
        Node odd = null, oddTail = null;
        Node even = null, evenTail = null;
        Node curr = head;

        while (curr != null)
        {
            if ((curr.data & 1) != 0)        // current node is odd
            {
                // handle head for the first odd node
                if (odd == null) {
                    odd = oddTail = curr;
                }
                else {
                    oddTail.next = curr;
                    oddTail = oddTail.next;
                }
            }
            else    // current node is even
            {
                // handle head for the first even node
                if (even == null) {
                    even = evenTail = curr;
                }
                else {
                    evenTail.next = curr;
                    evenTail = curr;
                }
            }
            curr = curr.next;
        }

        // if the list contains at least one even node
        if (even != null)
        {
            head = even;
            evenTail.next = odd;
        }
        // special case – list contains all odd nodes
        else {
            head = odd;
        }

        // null to terminate the list; otherwise, it will go into an infinite loop
        if (oddTail != null) {
            oddTail.next = null;
        }

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = rearrangeEvenOdd(head);
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

# Rearrange a given linked list by separating odd nodes from even ones and
# maintaining their relative order. This approach does not use any dummy node.
def rearrangeEvenOdd(head):

    odd = None
    oddTail = None

    even = None
    evenTail = None

    curr = head
    while curr:
        # current node is odd
        if curr.data & 1:
            # handle head for the first odd node
            if odd is None:
                odd = oddTail = curr
            else:
                oddTail.next = curr
                oddTail = oddTail.next

        # current node is even
        else:
            # handle head for the first even node
            if even is None:
                even = evenTail = curr
            else:
                evenTail.next = curr
                evenTail = curr

        curr = curr.next

    # if the list contains at least one even node
    if even:
        head = even
        evenTail.next = odd
    # special case – list contains all odd nodes
    else:
        head = odd

    # None to terminate the list; otherwise, it will go into an infinite loop
    if oddTail:
        oddTail.next = None

    return head

if __name__ == '__main__':

    # 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> None
    head = None
    for i in reversed(range(10)):
        head = Node(i + 1, head)

    head = rearrangeEvenOdd(head)
    printList(head)
```

## 2\. Using Dummy Nodes

We can simplify the above code by using two temporary dummy nodes as the odd and even list and maintaining two pointers that always point to the last node in individual lists, so appending new nodes is easy. The dummy node gives the tail something to point to initially when the result list is empty. This dummy node is efficient since it is only temporary, and it is allocated in the stack. The loop proceeds, removing nodes from the original list and adding it at the tail of the even or odd list. When we are done, rearrange the pointers so that all odd nodes follow all even nodes.

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

// Rearrange a given linked list by separating odd nodes
// from even ones and maintaining their relative order.
// This approach uses a dummy node
void rearrangeEvenOdd(struct Node** head)
{
    struct Node odd, even;
    struct Node* oddTail = &odd, *evenTail = &even;

    struct Node* curr = *head;

    while (curr)
    {
        if (curr->data & 1)
        {
            oddTail->next = curr;
            oddTail = oddTail->next;
        }
        else {
            evenTail->next = curr;
            evenTail = curr;
        }
        curr = curr->next;
    }

    evenTail->next = odd.next;
    oddTail->next = NULL;
    *head = even.next;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >=0; i--) {
        push(&head, keys[i]);
    }

    rearrangeEvenOdd(&head);

    printList(head);

    return 0;
}
```

**Output:** 2 —> 4 —> 6 —> 8 —> 10 —> 1 —> 3 —> 5 —> 7 —> 9 —> NULL

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

    // Rearrange a given linked list by separating odd nodes
    // from even ones and maintaining their relative order.
    // This approach uses a dummy node
    public static Node rearrangeEvenOdd(Node head)
    {
        Node odd = new Node(), even = new Node();
        Node oddTail = odd, evenTail = even;

        Node curr = head;

        while (curr != null)
        {
            if ((curr.data & 1) != 0)
            {
                oddTail.next = curr;
                oddTail = oddTail.next;
            }
            else {
                evenTail.next = curr;
                evenTail = curr;
            }
            curr = curr.next;
        }

        evenTail.next = odd.next;
        oddTail.next = null;
        return even.next;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = rearrangeEvenOdd(head);
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

# Rearrange a given linked list by separating odd nodes from even ones and
# maintaining their relative order. This approach uses a dummy node
def rearrangeEvenOdd(head):

    odd = Node()
    even = Node()

    oddTail = odd
    evenTail = even

    curr = head

    while curr:
        if curr.data & 1:
            oddTail.next = curr
            oddTail = oddTail.next
        else:
            evenTail.next = curr
            evenTail = curr
        curr = curr.next

    evenTail.next = odd.next
    oddTail.next = None

    return even.next

if __name__ == '__main__':

    head = None
    for i in reversed(range(10)):
        head = Node(i + 1, head)

    head = rearrangeEvenOdd(head)
    printList(head)
```

## 3\. Using Recursion

This is one of those excellent problems where the recursive solution code is much cleaner than the iterative code. The recursive implementation can be seen below in C, Java, and Python:

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

// Recursive function to rearrange the list
void rearrange(struct Node* head, struct Node* odd, struct Node* even,
                struct Node** oddRef)
{
    // we have reached the end of the list
    if (head == NULL)
    {
        // null terminate the list
        odd->next = NULL;

        // join even and odd sublist
        even->next = (*oddRef)->next;
        return;
    }

    // if the current node is odd
    if (head->data & 1)
    {
        odd->next = head;
        rearrange(head->next, head, even, oddRef);
    }

    // if the current node is even
    else {
        even->next = head;
        rearrange(head->next, odd, head, oddRef);
    }
}

// Rearrange a given linked list by separating odd nodes
// from even ones and maintaining their relative order.
void rearrangeEvenOdd(struct Node** head)
{
    struct Node* odd = (struct Node*)malloc(sizeof(struct Node));
    struct Node* even = (struct Node*)malloc(sizeof(struct Node));

    rearrange(*head, odd, even, &odd);
    *head = even->next;

    free(odd);
    free(even);
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >=0; i--) {
        push(&head, keys[i]);
    }

    rearrangeEvenOdd(&head);
    printList(head);

    return 0;
}
```

**Output:** 2 —> 4 —> 6 —> 8 —> 10 —> 1 —> 3 —> 5 —> 7 —> 9 —> NULL
