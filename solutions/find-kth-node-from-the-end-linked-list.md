# Find k’th node from the end of a linked list

> Source: https://www.techiedelight.com/find-kth-node-from-the-end-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list and a positive integer `k`, find the `k'th` node from the end of the list.

> 

## Iterative Solution

A simple solution is to calculate the total number of nodes `n` in the linked list first. Then, the `k'th` node from the end will be `(n-k+1)'th` node from the beginning.

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

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(struct Node** head, int data)
{
    // create a new linked list node from the heap
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Iterative function to return the k'th node from the end in a linked list
struct Node* findKthNode(struct Node* head, int k)
{
    int n = 0;
    struct Node* curr = head;

    // count the total number of nodes in the linked list
    while (curr)
    {
        curr = curr->next;
        n++;
    }

    // if the total number of nodes is more than or equal to `k`
    if (n >= k)
    {
        // return (n-k+1)'th node from the beginning
        curr = head;
        for (int i = 0; i < n - k; i++) {
            curr = curr->next;
        }
    }

    return curr;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    int k = 3;
    struct Node* node = findKthNode(head, k);

    if (node) {
        printf("k'th node from the end is %d", node->data);
    }

    return 0;
}
```

**Output:** k’th node from the end is 3

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
    // Iterative function to return the k'th node from the end in a linked list
    public static Node findKthNode(Node head, int k)
    {
        int n = 0;
        Node curr = head;

        // count the total number of nodes in the linked list
        while (curr != null)
        {
            curr = curr.next;
            n++;
        }

        // if the total number of nodes is more than or equal to `k`
        if (n >= k)
        {
            // return (n-k+1)'th node from the beginning
            curr = head;
            for (int i = 0; i < n - k; i++) {
                curr = curr.next;
            }
        }

        return curr;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        int k = 3;
        Node node = findKthNode(head, k);

        if (node != null) {
            System.out.println("k'th node from the end is " + node.data);
        }
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

# Iterative function to return the k'th node from the end in a linked list
def getKthFromEnd(head, k):

    n = 0
    curr = head

    # count the total number of nodes in the linked list
    while curr:
        curr = curr.next
        n = n + 1

    # if the total number of nodes is more than or equal to `k`
    if n >= k:
        # return (n-k+1)'th node from the beginning
        curr = head
        for i in range(n - k):
            curr = curr.next

    return curr

if __name__ == '__main__':

    head = None
    for i in reversed(range(5)):
        head = Node(i + 1, head)

    k = 3
    node = getKthFromEnd(head, k)

    if node:
        print('k\'th node from the end is', node.data)
```

The above solution does two traversals of the linked list. We can solve this problem in a single list traversal only. The idea is to start from the head node and move a pointer `k` nodes ahead in the given list. Then, take another pointer starting from the head node and run both pointers in parallel till the first pointer reaches the end of the list. Now, the second pointer will point to the `k'th` node from the end.

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

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(struct Node** head, int data)
{
    // create a new linked list node from the heap
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Iterative function to return the k'th node from the end in a linked list
struct Node* findKthNode(struct Node* head, int k)
{
    struct Node* curr = head;

    // move `k` nodes ahead in the linked list
    for (int i = 0; curr && i < k; i++) {
        curr = curr->next;
    }

    // return if `k` is more than the total number of nodes in the list
    if (curr == NULL) {
        return NULL;
    }

    // move the `head` and `curr` parallelly till `curr` reaches the end of the list
    while (curr)
    {
        head = head->next;
        curr = curr->next;
    }

    // `head` will now contain the k'th node from the end
    return head;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    int k = 3;
    struct Node* node = findKthNode(head, k);

    if (node) {
        printf("k'th node from the end is %d", node->data);
    }

    return 0;
}
```

**Output:** k’th node from the end is 3

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
    // Iterative function to return the k'th node from the end in a linked list
    public static Node findKthNode(Node head, int k)
    {
        Node curr = head;

        // move `k` nodes ahead in the linked list
        for (int i = 0; curr != null && i < k; i++) {
            curr = curr.next;

            // return if `k` is more than the total number of nodes in the list
            if (curr == null && i != k-1) {
                return null;
            }
        }

        // move the `head` and `curr` parallelly till `curr` reaches the list's end
        while (curr != null)
        {
            head = head.next;
            curr = curr.next;
        }

        // `head` will now contain the k'th node from the end
        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        int k = 3;
        Node node = findKthNode(head, k);

        if (node != null) {
            System.out.println("k'th node from the end is " + node.data);
        }
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

# Iterative function to return the k'th node from the end in a linked list
def findKthNode(head, k):

    curr = head

    # move `k` nodes ahead in the linked list
    for i in range(k):
        # return if `k` is more than the total number of nodes in the list
        if curr is None:
            return None
        curr = curr.next

    # move the `head` and `curr` parallelly till `curr` reaches the end of the list
    while curr:
        head = head.next
        curr = curr.next

    # `head` will now contain the k'th node from the end
    return head

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 3, 4, 5]

    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    k = 3
    node = findKthNode(head, k)

    if node:
        print('k\'th node from the end is', node.data)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

## Recursive Solution

This is a nice problem where the recursive solution code is much cleaner than the iterative code. You probably wouldn’t want to use the recursive version for production code because it will use stack space, which is proportional to the lists’ length.

The recursive implementation can be seen below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(struct Node** head, int data)
{
    // create a new linked list node from the heap
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Recursive function to return the k'th node from the end in a linked list
int findKthNode(struct Node* node, int k)
{
    // base case
    if (node == NULL) {
        return 0;
    }

    int count = findKthNode(node->next, k) + 1;

    if (count == k) {
        printf("k'th node from the end is %d", node->data);
    }

    return count;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    int k = 3;
    findKthNode(head, k);

    return 0;
}
```

**Output:** k’th node from the end is 3
