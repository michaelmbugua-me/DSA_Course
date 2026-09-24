# Swap k’th node from beginning with k’th node from the end in a linked list

> Source: https://www.techiedelight.com/swap-kth-node-beginning-with-kth-node-end/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, swap the `k'th` node from the beginning with the `k'th` node from the end. The swapping should be done so that only links between the nodes are exchanged, and no data is swapped.

For example,

**Input:** Linked List: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> NULL k = 2 **Output:** 1 —> 7 —> 3 —> 4 —> 5 —> 6 —> 2 —> 8 —> NULL

> 

The idea is to traverse the linked list and find pointers to the `k'th` node from the beginning and the end. Then swap their pointers. This looks easy enough, but the code needs to handle several boundary cases while exchanging the links, such as both nodes being adjacent to each other, one node is a head node, or both nodes doesn’t exist (when `k` is more than the total number of nodes in a linked list).

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

// Function to swap the k'th node from the beginning with the
// k'th node from the end in a linked list
void swapNodes(struct Node **headRef, int k)
{
    struct Node *x, *y, *prev_x = NULL, *prev_y = *headRef;

    // Find the k'th node from the beginning and store it in `x`.
    // Also, calculate the previous node of `x` and store it in `prev_x`.
    struct Node* curr = *headRef;
    for (int i = 1; i < k && curr; i++)
    {
        prev_x = curr;
        curr = curr->next;
    }
    x = curr;

    // If `k` is more than the total number of nodes, X and Y doesn't exist
    if (curr == NULL) {
        return;
    }

    // Find the k'th node from the end and store it in `y`.
    // Also, calculate the previous node of `y` and store it in `prev_y`.
    struct Node* ptr = *headRef;
    while (curr->next)
    {
        prev_y = ptr;
        ptr = ptr->next;
        curr = curr->next;
    }
    y = ptr;

    // Y is next to X (X —> Y)
    if (x->next == y)
    {
        x->next = y->next;
        y->next = x;

        if (prev_x != NULL && prev_x != x) {
            prev_x->next = y;
        } else {
            *headRef = y;
        }
    }

    // X is next to Y (Y —> X)
    else if (y->next == x)
    {
        y->next = x->next;
        x->next = y;

        if (prev_y != NULL && prev_y != y) {
            prev_y->next = x;
        } else {
            *headRef = x;
        }
    }

    // X is the head node
    else if (x == *headRef)
    {
        *headRef = y;
        y->next = x->next;
        prev_y->next = x;
        x->next = NULL;
    }

    // Y is the head node
    else if (y == *headRef)
    {
        *headRef = x;
        x->next = y->next;
        prev_x->next = y;
        y->next = NULL;
    }

    // Otherwise
    else {
        ptr = y->next;
        y->next = x->next;
        x->next = ptr;

        prev_x->next = y;
        prev_y->next = x;
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

    int k = 2;
    swapNodes(&head, k);

    printList("After ", head);

    return 0;
}
```

**Output:** Before: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> NULL After : 1 —> 7 —> 3 —> 4 —> 5 —> 6 —> 2 —> 8 —> NULL

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

    // Function to swap the k'th node from the beginning with the
    // k'th node from the end in a linked list
    public static Node swapNodes(Node head, int k)
    {
        Node x, y, prev_x = null, prev_y = head;

        // Find the k'th node from the beginning and store it in `x`.
        // Also, calculate the previous node of `x` and store it in `prev_x`.
        Node curr = head;
        for (int i = 1; i < k && curr != null; i++)
        {
            prev_x = curr;
            curr = curr.next;
        }
        x = curr;

        // If `k` is more than the total number of nodes, X and Y doesn't exist
        if (curr == null) {
            return null;
        }

        // Find the k'th node from the end and store it in `y`.
        // Also, calculate the previous node of `y` and store it in `prev_y`.
        Node ptr = head;
        while (curr.next != null)
        {
            prev_y = ptr;
            ptr = ptr.next;
            curr = curr.next;
        }
        y = ptr;

        // Y is next to X (X —> Y)
        if (x.next == y)
        {
            x.next = y.next;
            y.next = x;

            if (prev_x != null && prev_x != x) {
                prev_x.next = y;
            } else {
                head = y;
            }
        }

        // X is next to Y (Y —> X)
        else if (y.next == x)
        {
            y.next = x.next;
            x.next = y;

            if (prev_y != null && prev_y != y) {
                prev_y.next = x;
            } else {
                head = x;
            }
        }

        // X is the head node
        else if (x == head)
        {
            head = y;
            y.next = x.next;
            prev_y.next = x;
            x.next = null;
        }

        // Y is the head node
        else if (y == head)
        {
            head = x;
            x.next = y.next;
            prev_x.next = y;
            y.next = null;
        }

        // Otherwise
        else {
            ptr = y.next;
            y.next = x.next;
            x.next = ptr;

            prev_x.next = y;
            prev_y.next = x;
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

        int k = 2;
        head = swapNodes(head, k);

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

# Function to print a given linked list
def printList(msg, head):

    print(msg, end='')
    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Function to swap the k'th node from the beginning with the
# k'th node from the end in a linked list
def swapNodes(head, k):

    prev_x = None
    prev_y = head

    # Find the k'th node from the beginning and store it in `x`.
    # Also, calculate the previous node of `x` and store it in `prev_x`.
    curr = head
    i = 1
    while i < k and curr:
        prev_x = curr
        curr = curr.next
        i = i + 1
    x = curr

    # If `k` is more than the total number of nodes, X and Y doesn't exist
    if curr is None:
        return None

    # Find the k'th node from the end and store it in `y`.
    # Also, calculate the previous node of `y` and store it in `prev_y`.
    ptr = head
    while curr.next:
        prev_y = ptr
        ptr = ptr.next
        curr = curr.next
    y = ptr

    # Y is next to X (X —> Y)
    if x.next == y:
        x.next = y.next
        y.next = x
        if prev_x and prev_x != x:
            prev_x.next = y
        else:
            head = y

    # X is next to Y (Y —> X)
    elif y.next == x:
        y.next = x.next
        x.next = y

        if prev_y and prev_y != y:
            prev_y.next = x
        else:
            head = x

    # X is the head node
    elif x == head:
        head = y
        y.next = x.next
        prev_y.next = x
        x.next = None

    # Y is the head node
    elif y == head:
        head = x
        x.next = y.next
        prev_x.next = y
        y.next = None

    # Otherwise
    else:
        ptr = y.next
        y.next = x.next
        x.next = ptr

        prev_x.next = y
        prev_y.next = x

    return head

if __name__ == '__main__':

    A = [1, 2, 3]

    head = None
    for i in reversed(range(len(A))):
        head = Node(A[i], head)

    printList('Before : ', head)

    k = 3
    head = swapNodes(head, k)

    printList(' After : ', head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Pairwise swap adjacent nodes of a linked list](https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/ "Pairwise swap adjacent nodes of a linked list")

> [Remove redundant nodes from a path formed by a linked list](https://www.techiedelight.com/remove-redundant-nodes-path-formed-linked-list/ "Remove redundant nodes from a path formed by a linked list")

> [Rearrange linked list in a specific manner](https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/ "Rearrange linked list in a specific manner")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 181

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
