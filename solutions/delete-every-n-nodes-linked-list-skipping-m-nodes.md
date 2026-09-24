# Delete every `N` nodes in a linked list after skipping `M` nodes

> Source: https://www.techiedelight.com/delete-every-n-nodes-linked-list-skipping-m-nodes/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list and two positive integers, `m` and `n`, delete every `n` nodes after skipping `m` nodes.

For example, consider the following list:

1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null If m = 1, n = 3 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null 1 —> 5 —> 9 —> null If m = 2, n = 2 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null 1 —> 2 —> 5 —> 6 —> 9 —> 10 —> null

> 

The idea is to traverse the given list, skip the first `m` nodes, delete the next `n` nodes, and recur for the remaining nodes. The solution is simple, but we need to ensure that all boundary conditions are handled properly in the code.

The implementation can be seen below in C, Java, and Python:

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

// Recursive function to delete every `n` nodes in a linked list after
// skipping `m` nodes
void deleteNodes(struct Node *head, int m, int n)
{
    // base case
    if (head == NULL || head->next == NULL) {
        return;
    }

    struct Node *prev = NULL, *next = NULL;
    struct Node* curr = head;

    // skip `m` nodes
    for (int i = 1; curr && i <= m; i++)
    {
        prev = curr;
        curr = curr->next;
    }

    // delete next `n` nodes
    for (int i = 1; curr && i <= n; i++)
    {
        next = curr->next;
        free(curr);
        curr = next;
    }

    // link remaining nodes with the last node
    prev->next = curr;

    // recur for remaining nodes
    deleteNodes(curr, m, n);
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    deleteNodes(head, 1, 3);
    printList(head);

    return 0;
}
```

**Output:** 1 —> 5 —> 9 —> NULL

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

    // Recursive function to delete every `n` nodes in a linked list after
    // skipping `m` nodes
    public static Node deleteNodes(Node head, int m, int n)
    {
        // base case
        if (head == null || head.next == null) {
            return head;
        }

        Node prev = null, next;
        Node curr = head;

        // skip `m` nodes
        for (int i = 1; curr != null && i <= m; i++)
        {
            prev = curr;
            curr = curr.next;
        }

        // delete next `n` nodes
        for (int i = 1; curr != null && i <= n; i++)
        {
            next = curr.next;
            curr = next;
        }

        // link remaining nodes with the last node
        prev.next = curr;

        // recur for remaining nodes
        deleteNodes(curr, m, n);

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

        head = deleteNodes(head, 1, 3);
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

# Recursive function to delete every `n` nodes in a linked list after
# skipping `m` nodes
def deleteNodes(head, m, n):

    # base case
    if head is None or head.next is None:
        return head

    prev = None
    curr = head

    # skip `m` nodes
    for i in range(1, m + 1):
        prev = curr
        curr = curr.next

        # return if we have reached end of the list
        if not curr:
            return head

    # delete next `n` nodes
    for i in range(1, n + 1):
        if curr:
            next = curr.next
            curr = next

    # link remaining nodes with the last node
    prev.next = curr

    # recur for remaining nodes
    deleteNodes(curr, m, n)

    return head

if __name__ == '__main__':

    head = None
    for i in reversed(range(10)):
        head = Node(i + 1, head)

    head = deleteNodes(head, 1, 3)
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Pairwise swap adjacent nodes of a linked list](https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/ "Pairwise swap adjacent nodes of a linked list")

> [Remove redundant nodes from a path formed by a linked list](https://www.techiedelight.com/remove-redundant-nodes-path-formed-linked-list/ "Remove redundant nodes from a path formed by a linked list")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.78/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
