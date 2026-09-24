# Sort a doubly-linked list using merge sort

> Source: https://www.techiedelight.com/sort-doubly-linked-list-merge-sort/

Given a doubly linked list, sort it using the merge sort algorithm.

> 

[Merge sort](https://techiedelight.com/merge-sort/) is an efficient sorting algorithm that uses the [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) technique to sort a sequence of items. It is stable in nature, which means that the original order of equal elements is preserved in the output.

In the [previous post](https://techiedelight.com/merge-sort-singly-linked-list/), we have discussed the merge sort algorithm on a singly linked list. The merge sort algorithm on the doubly linked list works similarly by splitting the list into two halves, sorting each sublist recursively, and finally merge both the sorted lists together to get a single sorted list.

The algorithm can be implemented as follows in C, Java, and Python:

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
void printDDL(struct Node* head)
{
    while (head != NULL)
    {
        printf("%d ⇔ ", head->data);
        head = head->next;
    }

    printf("NULL");
}

// Function to split nodes of the given doubly linked list into
// two halves using the fast/slow pointer strategy
void split(struct Node* head, struct Node** a, struct Node** b)
{
    struct Node* slow = head;
    struct Node* fast = head->next;

    // advance `fast` by two nodes, and advance `slow` by a single node
    while (fast != NULL)
    {
        fast = fast->next;
        if (fast != NULL)
        {
            slow = slow->next;
            fast = fast->next;
        }
    }

    *b = slow->next;
    slow->next = NULL;
}

// Recursive function to merge nodes of two sorted lists
// into a single sorted list
struct Node* merge(struct Node* a, struct Node* b)
{
    // base cases
    if (a == NULL) {
        return b;
    }

    if (b == NULL) {
        return a;
    }

    // pick either `a` or `b`, and recur
    if (a->data <= b->data)
    {
        a->next = merge(a->next, b);
        a->next->prev = a;
        a->prev = NULL;
        return a;
    }
    else {
        b->next = merge(a, b->next);
        b->next->prev = b;
        b->prev = NULL;
        return b;
    }
}

// Function to sort a doubly-linked list using merge sort algorithm
void mergesort(struct Node** head)
{
    // base case: 0 or 1 node
    if (*head == NULL || (*head)->next == NULL) {
        return;
    }

    // split head into `a` and `b` sublists
    struct Node* a = *head, *b = NULL;
    split(*head, &a, &b);

    // recursively sort the sublists
    mergesort(&a);
    mergesort(&b);

    // merge the two sorted lists
    *head = merge(a, b);
}

int main(void)
{
    int keys[] = { 6, 4, 8, 7, 9, 2, 1 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = 0; i < n; i++) {
        push(&head, keys[i]);
    }

    mergesort(&head);
    printDDL(head);

    return 0;
}
```

**Output:** 1 ⇔ 2 ⇔ 4 ⇔ 6 ⇔ 7 ⇔ 8 ⇔ 9 ⇔ NULL

##

```java
// A Doubly Linked List Node
class Node
{
    int data;
    Node next, prev;

    Node(int data) {
        this.data = data;
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

        // return new head node
        return node;
    }

    // Helper function to print nodes of a doubly linked list
    public static void printDDL(Node head)
    {
        while (head != null)
        {
            System.out.print(head.data + " ⇔ ");
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to split nodes of the given doubly linked list into
    // two halves using the fast/slow pointer strategy
    public static Node split(Node head)
    {
        Node slow = head;
        Node fast = head.next;

        // advance `fast` by two nodes, and advance `slow` by a single node
        while (fast != null)
        {
            fast = fast.next;
            if (fast != null)
            {
                slow = slow.next;
                fast = fast.next;
            }
        }

        return slow;
    }

    // Recursive function to merge nodes of two sorted lists
    // into a single sorted list
    public static Node merge(Node a, Node b)
    {
        // base cases
        if (a == null) {
            return b;
        }

        if (b == null) {
            return a;
        }

        // pick either `a` or `b`, and recur
        if (a.data <= b.data)
        {
            a.next = merge(a.next, b);
            a.next.prev = a;
            a.prev = null;
            return a;
        }
        else {
            b.next = merge(a, b.next);
            b.next.prev = b;
            b.prev = null;
            return b;
        }
    }

    // Function to sort a doubly-linked list using merge sort algorithm
    public static Node mergesort(Node head)
    {
        // base case: 0 or 1 node
        if (head == null || head.next == null) {
            return head;
        }

        // split head into `a` and `b` sublists
        Node a = head, b;

        Node slow = split(head);
        b = slow.next;
        slow.next = null;

        // recursively sort the sublists
        a = mergesort(a);
        b = mergesort(b);

        // merge the two sorted lists
        head = merge(a, b);
        return head;
    }

    public static void main(String[] args)
    {
        int[] keys = { 6, 4, 8, 7, 9, 2, 1 };

        Node head = null;
        for (int key: keys) {
            head = push(head, key);
        }

        head = mergesort(head);
        printDDL(head);
    }
}
```

##

```python3
# A Doubly Linked List Node
class Node:
    def __init__(self, data, next=None, prev=None):
        self.data = data
        self.next = next
        self.prev = prev

# Utility function to push a node at the beginning of the doubly linked list
def push(head, key):

    node = Node(key, head)

    # change `prev` of the existing head node to point to the new node
    if head:
        head.prev = node

    # return new head node
    return node

# Helper function to print nodes of a doubly linked list
def printDDL(head):

    while head:
        print(head.data, end=' ⇔ ')
        head = head.next
    print('None')

# Function to split nodes of the given doubly linked list into
# two halves using the fast/slow pointer strategy
def split(head):

    slow = head
    fast = head.next

    # advance `fast` by two nodes, and advance `slow` by a single node
    while fast:
        fast = fast.next
        if fast:
            slow = slow.next
            fast = fast.next

    return slow

# Recursive function to merge nodes of two sorted lists
# into a single sorted list
def merge(a, b):

    # base cases
    if a is None:
        return b

    if b is None:
        return a

    # pick either `a` or `b`, and recur
    if a.data <= b.data:
        a.next = merge(a.next, b)
        a.next.prev = a
        a.prev = None
        return a
    else:
        b.next = merge(a, b.next)
        b.next.prev = b
        b.prev = None
        return b

# Function to sort a doubly-linked list using merge sort algorithm
def mergesort(head):

    # base case: 0 or 1 node
    if head is None or head.next is None:
        return head

    # split head into `a` and `b` sublists
    a = head

    slow = split(head)
    b = slow.next
    slow.next = None

    # recursively sort the sublists
    a = mergesort(a)
    b = mergesort(b)

    # merge the two sorted lists
    head = merge(a, b)
    return head

if __name__ == '__main__':

    keys = [6, 4, 8, 7, 9, 2, 1]

    head = None
    for key in keys:
        head = push(head, key)

    head = mergesort(head)
    printDDL(head)
```

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Merge sort algorithm for a singly linked list – C, Java, and Python](https://www.techiedelight.com/merge-sort-singly-linked-list/ "Merge sort algorithm for a singly linked list – C, Java, and Python")

> [Rearrange linked list in a specific manner in linear time](https://www.techiedelight.com/rearrange-linked-list-specific-manner-linear-time/ "Rearrange linked list in a specific manner in linear time")

> [Merge two BSTs into a doubly-linked list in sorted order](https://www.techiedelight.com/merge-two-bsts-into-doubly-linked-list-sorted-order/ "Merge two BSTs into a doubly-linked list in sorted order")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.62/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
