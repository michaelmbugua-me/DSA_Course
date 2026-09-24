# Flatten a Linked List

> Source: https://www.techiedelight.com/flatten-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list that can grow in both horizontal and vertical directions (right and down), flatten it into a sorted singly linked list provided that each horizontal and vertical list is already sorted.

The given linked list is similar to the standard linked list, except that it has one extra field _down_ , which points to a vertical list. Assume that the vertical list doesn’t have any horizontal list attached to it.

For example, consider the following list:

We should convert it into:

`1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> NULL`

We can divide this problem into two parts:

  1. Flattening: In this step, flatten the list either horizontally using the next pointers or vertically using the down pointers.
  2. Sorting: In this step, sort the flattened list using the [merge sort algorithm](https://techiedelight.com/merge-sort-singly-linked-list/).

This is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// MACRO to calculate the number of elements in an array
#define SIZE(arr) (sizeof(arr)/sizeof(arr[0]))

// A Linked List Node
struct Node
{
    int data;
    struct Node *next;
    struct Node *down;
};

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** headRef, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = NULL;
    newNode->down = *headRef;
    *headRef = newNode;
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
struct Node* sortedMerge(struct Node* a, struct Node* b)
{
    // base cases
    if (a == NULL) {
        return b;
    }

    else if (b == NULL) {
        return a;
    }

    struct Node* result = NULL;

    // pick either `a` or `b`, and recur
    if (a->data <= b->data)
    {
        result = a;
        result->down = sortedMerge(a->down, b);
    }
    else {
        result = b;
        result->down = sortedMerge(a, b->down);
    }

    return result;
}

/*
    Split the given list's nodes into front and back halves,
    and return the two lists using the reference parameters.
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow pointer strategy
*/
void frontBackSplit(struct Node* source, struct Node** frontRef,
                    struct Node** backRef)
{
    // if the length is less than 2, handle it separately
    if (source == NULL || source->down == NULL)
    {
        *frontRef = source;
        *backRef = NULL;
        return;
    }

    struct Node* slow = source;
    struct Node* fast = source->down;

    // advance `fast` two nodes, and advance `slow` one node
    while (fast != NULL)
    {
        fast = fast->down;
        if (fast != NULL)
        {
            slow = slow->down;
            fast = fast->down;
        }
    }

    // `slow` is before the midpoint in the list, so split it in two
    // at that point.
    *frontRef = source;
    *backRef = slow->down;
    slow->down = NULL;
}

// Sort a given linked list using the merge sort algorithm
void mergesort(struct Node** headRef)
{
    // base case — length 0 or 1
    if (*headRef == NULL || (*headRef)->down == NULL) {
        return;
    }

    struct Node *a, *b;

    // split `head` into `a` and `b` sublists
    frontBackSplit(*headRef, &a, &b);

    // recursively sort the sublists
    mergesort(&a);
    mergesort(&b);

    // answer = merge the two sorted lists
    *headRef = sortedMerge(a, b);

    // set next link to NULL after merging
    (*headRef)->next = NULL;
}

// Helper function to print the flattened linked list
void printList(struct Node *node)
{
    while (node)
    {
        printf("%d —> ", node->data);
        node = node->down;
    }
    printf("NULL");
}

// Iterative function to flatten and sort a given list
void flatten (struct Node* head)
{
    struct Node* curr = head;

    while (curr != NULL)
    {
        struct Node* temp = curr;
        while (temp->down != NULL) {
            temp = temp->down;
        }
        temp->down = curr->next;
        curr = curr->next;
    }
}

// Helper function to create a linked list with elements of a given vector
void createVerticalList(struct Node **head, int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        push(head, arr[i]);
    }
}

int main(void)
{
    struct Node* head = NULL;

    int arr1[] = { 8, 6, 4, 1 };
    int arr2[] = { 7, 3, 2 };
    int arr3[] = { 9, 5 };
    int arr4[] = { 12, 11, 10 };

    createVerticalList(&(head), arr1, SIZE(arr1));
    createVerticalList(&(head->next), arr2, SIZE(arr2));
    createVerticalList(&(head->next->next), arr3, SIZE(arr3));
    createVerticalList(&(head->next->next->next), arr4, SIZE(arr4));

    // flatten the list
    flatten(head);

    // sort the list
    mergesort(&head);

    // print the flattened and sorted linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> NULL

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;
    Node down;
}

class Main
{
    // Helper function to insert a new node at the beginning of a vertical linked list
    public static Node push(Node head, int data)
    {
        Node newNode = new Node();

        newNode.data = data;
        newNode.next = null;
        newNode.down = head;

        return newNode;
    }

    // Takes two lists sorted in increasing order and merge their nodes
    // to make one big sorted list, which is returned
    public static Node sortedMerge(Node a, Node b)
    {
        if (a == null) {
            return b;
        }
        else if (b == null) {
            return a;
        }

        Node result;

        // pick either `a` or `b`, and recur
        if (a.data <= b.data)
        {
            result = a;
            result.down = sortedMerge(a.down, b);
        }
        else {
            result = b;
            result.down = sortedMerge(a, b.down);
        }

        return result;
    }

    /*
        Split the given list's nodes into front and back halves.
        If the length is odd, the extra node should go in the front list.
        It uses the fast/slow reference strategy
    */

    public static Node[] frontBackSplit(Node source)
    {
        // if the length is less than 2, handle it separately
        if (source == null || source.down == null) {
            return new Node[]{ source, null };
        }

        Node slow = source;
        Node fast = source.down;

        // advance `fast` two nodes, and advance `slow` one node
        while (fast != null)
        {
            fast = fast.down;
            if (fast != null)
            {
                slow = slow.down;
                fast = fast.down;
            }
        }

        // `slow` is before the midpoint in the list, so split it in two
        // at that point.
        Node[] arr = new Node[]{ source, slow.down };
        slow.down = null;

        return arr;
    }

    // Sort a given linked list using the merge sort algorithm
    public static Node mergesort(Node head)
    {
        // base case — length 0 or 1
        if (head == null || head.down == null) {
            return head;
        }

        // split `head` into `a` and `b` sublists
        Node[] arr = frontBackSplit(head);
        Node front = arr[0];
        Node back = arr[1];

        // recursively sort the sublists
        front = mergesort(front);
        back = mergesort(back);

        // answer = merge the two sorted lists
        return sortedMerge(front, back);
    }

    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.down;
        }

        System.out.println("null");
    }

    // Iterative function to flatten and sort a given list
    public static void flatten (Node head)
    {
        Node curr = head;

        while (curr != null)
        {
            Node temp = curr;
            while (temp.down != null) {
                temp = temp.down;
            }
            temp.down = curr.next;
            curr = curr.next;
        }
    }

    // Helper function to create a linked list with elements of a given array
    public static Node createVerticalList(Node head, int[] arr)
    {
        for (int key: arr) {
            head = push(head, key);
        }
        return head;
    }

    public static void main(String[] args)
    {
        Node head = null;

        int[] arr1 = { 8, 6, 4, 1 };
        int[] arr2 = { 7, 3, 2 };
        int[] arr3 = { 9, 5 };
        int[] arr4 = { 12, 11, 10 };

        head = createVerticalList(head, arr1);
        head.next = createVerticalList(head.next, arr2);
        head.next.next = createVerticalList(head.next.next, arr3);
        head.next.next.next = createVerticalList(head.next.next.next, arr4);

        // flatten the list
        flatten(head);

        // sort the list
        mergesort(head);

        // print the flattened and sorted linked list
        printList(head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data, next=None, down=None):
        self.data = data
        self.next = next
        self.down = down

# Takes two lists sorted in increasing order and merge their nodes
# to make one big sorted list, which is returned
def sortedMerge(a, b):

    if a is None:
        return b

    elif b is None:
        return a

    # pick either `a` or `b`, and recur
    if a.data <= b.data:

        result = a
        result.down = sortedMerge(a.down, b)

    else:

        result = b
        result.down = sortedMerge(a, b.down)

    return result

'''
    Split the given list's nodes into front and back halves.
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow reference strategy.
'''

def frontBackSplit(source):

    # if the length is less than 2, handle it separately
    if source is None or source.down is None:
        return source, None

    (slow, fast) = (source, source.down)

    # advance `fast` two nodes, and advance `slow` one node
    while fast:
        fast = fast.down
        if fast:
            slow = slow.down
            fast = fast.down

    # `slow` is before the midpoint of the list, so split it in two
    # at that point.
    A = (source, slow.down)
    slow.down = None

    return A

# Sort a given linked list using the merge sort algorithm
def mergesort(head):

    # base case — length 0 or 1
    if head is None or head.down is None:
        return head

    # split `head` into `a` and `b` sublists
    front, back = frontBackSplit(head)

    # recursively sort the sublists
    front = mergesort(front)
    back = mergesort(back)

    # answer = merge the two sorted lists
    return sortedMerge(front, back)

# Helper function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.down
    print('None')

# Iterative function to flatten and sort a given list
def flatten(head):

    curr = head
    while curr:
        temp = curr
        while temp.down:
            temp = temp.down
        temp.down = curr.next
        curr = curr.next

# Helper function to build a linked list from elements of a given list
def createVerticalList(head, keys):

    for key in keys:
        head = Node(key, None, head)
    return head

if __name__ == '__main__':

    first = [8, 6, 4, 1]
    second = [7, 3, 2]
    third = [9, 5]
    fourth = [12, 11, 10]

    head = createVerticalList(None, first)
    head.next = createVerticalList(head.next, second)
    head.next.next = createVerticalList(head.next.next, third)
    head.next.next.next = createVerticalList(head.next.next.next, fourth)

    # flatten the list
    flatten(head)

    # sort the list
    mergesort(head)

    # print the flattened and sorted linked list
    printList(head)
```

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the linked list, and the auxiliary space required is O(n) for the merge sort algorithm.

The above solution first flattens the list and then sort it. We can combine both these steps into one step, i.e., sorting the list while flattening it. We can do this by calling the [sortedMerge()](https://techiedelight.com/merge-given-sorted-linked-lists/) routine of the merge sort algorithm, as demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// MACRO to calculate the number of elements in an array
#define SIZE(arr) (sizeof(arr)/sizeof(arr[0]))

// A Linked List Node
struct Node
{
    int data;
    struct Node *next;
    struct Node *down;
};

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** headRef, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = NULL;
    newNode->down = *headRef;
    *headRef = newNode;
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
struct Node* sortedMerge(struct Node* a, struct Node* b)
{
    // base cases
    if (a == NULL) {
        return b;
    }

    else if (b == NULL) {
        return a;
    }

    struct Node* result = NULL;

    // pick either `a` or `b`, and recur
    if (a->data <= b->data)
    {
        result = a;
        result->down = sortedMerge(a->down, b);
    }
    else {
        result = b;
        result->down = sortedMerge(a, b->down);
    }

    return result;
}

// Recursive function to flatten and sort a given list
struct Node* flatten(struct Node* head)
{
    // base case: an empty list
    if (head == NULL) {
        return head;
    }

    // Merge this list with the list on the right side
    struct Node* sorted = sortedMerge(head, flatten(head->next));

    // set next link to NULL after flattening
    head->next = NULL;

    return sorted;
}

// Helper function to print the flattened linked list
void printList(struct Node *node)
{
    while (node)
    {
        printf("%d —> ", node->data);
        node = node->down;
    }
    printf("NULL");
}

// Helper function to create a linked list with elements of a given vector
void createVerticalList(struct Node **head, int arr[], int n)
{
    for (int i = 0; i < n; i++) {
        push(head, arr[i]);
    }
}

int main(void)
{
    struct Node* head = NULL;

    int arr1[] = { 8, 6, 4, 1 };
    int arr2[] = { 7, 3, 2 };
    int arr3[] = { 9, 5 };
    int arr4[] = { 12, 11, 10 };

    createVerticalList(&(head), arr1, SIZE(arr1));
    createVerticalList(&(head->next), arr2, SIZE(arr2));
    createVerticalList(&(head->next->next), arr3, SIZE(arr3));
    createVerticalList(&(head->next->next->next), arr4, SIZE(arr4));

    // flatten the list
    flatten(head);

    // print the flattened linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> NULL

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;
    Node down;
}

class Main
{
    // Helper function to insert a new node at the beginning of a vertical linked list
    public static Node push(Node head, int data)
    {
        Node newNode = new Node();

        newNode.data = data;
        newNode.next = null;
        newNode.down = head;

        return newNode;
    }

    // Takes two lists sorted in increasing order and merge their nodes
    // to make one big sorted list, which is returned
    public static Node sortedMerge(Node a, Node b)
    {
        // base cases
        if (a == null) {
            return b;
        }
        else if (b == null) {
            return a;
        }

        Node result;

        // pick either `a` or `b`, and recur
        if (a.data <= b.data)
        {
            result = a;
            result.down = sortedMerge(a.down, b);
        }
        else {
            result = b;
            result.down = sortedMerge(a, b.down);
        }

        return result;
    }

    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        Node ptr = head;
        while (ptr != null)
        {
            System.out.print(ptr.data + " —> ");
            ptr = ptr.down;
        }

        System.out.println("null");
    }

    // Recursive function to flatten and sort a given list
    public static Node flatten(Node head)
    {
        // base case: an empty list
        if (head == null) {
            return head;
        }

        // Merge this list with the list on the right side
        Node sorted = sortedMerge(head, flatten(head.next));

        // set next link to null after flattening
        head.next = null;

        return sorted;
    }

    // Helper function to create a linked list with elements of a given array
    public static Node createVerticalList(Node head, int[] arr)
    {
        for (int key: arr) {
            head = push(head, key);
        }
        return head;
    }

    public static void main(String[] args)
    {
        Node head = null;

        int[] arr1 = { 8, 6, 4, 1 };
        int[] arr2 = { 7, 3, 2 };
        int[] arr3 = { 9, 5 };
        int[] arr4 = { 12, 11, 10 };

        head = createVerticalList(head, arr1);
        head.next = createVerticalList(head.next, arr2);
        head.next.next = createVerticalList(head.next.next, arr3);
        head.next.next.next = createVerticalList(head.next.next.next, arr4);

        // flatten and sort the list
        flatten(head);

        // print the flattened and sorted linked list
        printList(head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data, next=None, down=None):
        self.data = data
        self.next = next
        self.down = down

# Takes two lists sorted in increasing order and merge their nodes
# to make one big sorted list, which is returned
def sortedMerge(a, b):

    # base cases
    if a is None:
        return b

    elif b is None:
        return a

    # pick either `a` or `b`, and recur
    if a.data <= b.data:
        result = a
        result.down = sortedMerge(a.down, b)

    else:
        result = b
        result.down = sortedMerge(a, b.down)

    return result

# Helper function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.down

    print('None')

# Recursive function to flatten and sort a given list
def flatten(head):

    # base case: an empty list
    if head is None:
        return head

    # Merge this list with the list on the right side
    sorted = sortedMerge(head, flatten(head.next))

    # set next link to None after flattening
    head.next = None

    return sorted

# Helper function to build a linked list from elements of a given list
def createVerticalList(head, keys):

    for key in keys:
        head = Node(key, None, head)
    return head

if __name__ == '__main__':

    first = [8, 6, 4, 1]
    second = [7, 3, 2]
    third = [9, 5]
    fourth = [12, 11, 10]

    head = createVerticalList(None, first)
    head.next = createVerticalList(head.next, second)
    head.next.next = createVerticalList(head.next.next, third)
    head.next.next.next = createVerticalList(head.next.next.next, fourth)

    # flatten and sort the list
    flatten(head)

    # print the flattened and sorted linked list
    printList(head)
```
