# Pairwise swap adjacent nodes of a linked list

> Source: https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, pairwise swap its adjacent nodes. The swapping of data is not allowed, only links should be changed.

For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> NULL **Output:** 2 —> 1 —> 4 —> 3 —> 6 —> 5 —> 8 —> 7 —> NULL

> 

The idea is to traverse the linked list, consider two nodes simultaneously, and swap their links. This looks simple enough but needs special attention while exchanging the links.

The algorithm can be implemented as follows in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node *next;
};

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** headRef, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = *headRef;
    *headRef = newNode;
}

// Helper function to print the linked list
void printList(char *msg, struct Node *node)
{
    printf("%s: ", msg);
    while (node)
    {
        printf("%d —> ", node->data);
        node = node->next;
    }
    printf("NULL\n");
}

// Function to pairwise swap adjacent nodes of a linked list
void rearrange(struct Node **headRef)
{
    // if the list is empty or contains just one node
    if (*headRef == NULL || (*headRef)->next == NULL) {
        return;
    }

    struct Node* curr = *headRef, *prev = NULL;

    // consider two nodes at a time and swap their links
    while (curr != NULL && curr->next != NULL)
    {
        struct Node* temp = curr->next;
        curr->next = temp->next;
        temp->next = curr;

        if (prev == NULL) {
            *headRef = temp;
        }
        else {
            prev->next = temp;
        }

        prev = curr;
        curr = curr->next;
    }
}

int main(void)
{
    int arr[] = { 1, 2, 3, 4, 5, 6, 7, 8 };
    unsigned n = sizeof(arr)/sizeof(arr[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, arr[i]);
    }

    printList("Before", head);
    rearrange(&head);
    printList("After ", head);

    return 0;
}
```

**Output:** Before: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> NULL After : 2 —> 1 —> 4 —> 3 —> 6 —> 5 —> 8 —> 7 —> NULL

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

    // Function to pairwise swap adjacent nodes of a linked list
    public static Node rearrange(Node head)
    {
        // if the list is empty or contains just one node
        if (head == null || head.next == null) {
            return head;
        }

        Node curr = head, prev = null;

        // consider two nodes at a time and swap their links
        while (curr != null && curr.next != null)
        {
            Node temp = curr.next;
            curr.next = temp.next;
            temp.next = curr;

            if (prev == null) {
                head = temp;
            }
            else {
                prev.next = temp;
            }

            prev = curr;
            curr = curr.next;
        }

        return head;
    }

    public static void main(String[] args)
    {
        int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8 };

        Node head = null;
        for (int i = arr.length - 1; i >= 0; i--) {
            head = new Node(arr[i], head);
        }

        printList("Before : ", head);
        head = rearrange(head);
        printList("After : ", head);
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

# Function to pairwise swap adjacent nodes of a linked list
def rearrange(head):

    # if the list is empty or contains just one node
    if head is None or head.next is None:
        return head

    curr = head
    prev = None

    # consider two nodes at a time and swap their links
    while curr and curr.next:

        temp = curr.next
        curr.next = temp.next
        temp.next = curr

        if prev is None:
            head = temp
        else:
            prev.next = temp

        prev = curr
        curr = curr.next

    return head

if __name__ == '__main__':

    head = None
    for i in reversed(range(8)):
        head = Node(i + 1, head)

    printList('Before : ', head)
    head = rearrange(head)
    printList('After : ', head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

We can also write a [recursive version](https://techiedelight.com/recursion-practice-problems-with-solutions/) of the above program. The idea remains the same, but here we pass the next pair information and the previous node through recursion.

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node *next;
};

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** headRef, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = *headRef;
    *headRef = newNode;
}

// Helper function to print the linked list
void printList(char *msg, struct Node *node)
{
    printf("%s: ", msg);
    while (node)
    {
        printf("%d —> ", node->data);
        node = node->next;
    }
    printf("NULL\n");
}

// Function to pairwise swap adjacent nodes of a linked list
void rearrange(struct Node **head, struct Node *prev)
{
    // base case: if the list is empty or contains just one node
    if (*head == NULL || (*head)->next == NULL) {
        return;
    }

    struct Node* curr = *head;
    struct Node* temp = curr->next;
    curr->next = temp->next;
    temp->next = curr;

    if (prev == NULL) {
        *head = temp;
    }
    else {
        prev->next = temp;
    }

    prev = curr;
    rearrange(&(curr->next), prev);
}

// The wrapper function to call `rearrange()`
void _rearrange(struct Node **head) {
    rearrange(head, NULL);
}

int main(void)
{
    int arr[] = { 1, 2, 3, 4, 5, 6, 7, 8 };
    unsigned n = sizeof(arr)/sizeof(arr[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, arr[i]);
    }

    printList("Before", head);
    _rearrange(&head);
    printList("After ", head);

    return 0;
}
```

**Output:** Before: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> NULL After : 2 —> 1 —> 4 —> 3 —> 6 —> 5 —> 8 —> 7 —> NULL

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

    // Function to pairwise swap adjacent nodes of a linked list
    public static Node rearrange(Node head, Node prev)
    {
        // base case: if the list is empty or contains just one node
        if (head == null || head.next == null) {
            return head;
        }

        Node curr = head;
        Node temp = curr.next;
        curr.next = temp.next;
        temp.next = curr;

        if (prev == null) {
            head = temp;
        }
        else {
            prev.next = temp;
        }

        prev = curr;
        rearrange(curr.next, prev);

        return head;
    }

    // The wrapper function to call `rearrange()`
    public static Node rearrange(Node head) {
        return rearrange(head, null);
    }

    public static void main(String[] args)
    {
        int[] arr = { 1, 2, 3, 4, 5, 6, 7, 8 };

        Node head = null;
        for (int i = arr.length - 1; i >= 0; i--) {
            head = new Node(arr[i], head);
        }

        printList("Before : ", head);
        head = rearrange(head);
        printList("After : ", head);
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

# Function to pairwise swap adjacent nodes of a linked list
def rearrange(head, prev=None):

    # base case: if the list is empty or contains just one node
    if head is None or head.next is None:
        return head

    curr = head
    temp = curr.next
    curr.next = temp.next
    temp.next = curr

    if prev is None:
        head = temp
    else:
        prev.next = temp

    prev = curr
    rearrange(curr.next, prev)

    return head

if __name__ == '__main__':

    head = None
    for i in reversed(range(8)):
        head = Node(i + 1, head)

    printList('Before: ', head)
    head = rearrange(head)
    printList('After : ', head)
```
