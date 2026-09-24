# Rearrange linked list so that it has alternating high and low values

> Source: https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list of integers, rearrange it such that every second node of the linked list is greater than its left and right nodes. In other words, rearrange the linked list node in alternating high-low.

Assume no duplicate nodes are present in the linked list. Several lists might satisfy the constraints; we need to print any one of them. For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 **Output:** 1 —> 3 —> 2 —> 5 —> 4 —> 7 —> 6 **Input:** 9 —> 6 —> 8 —> 3 —> 7 **Output:** 6 —> 9 —> 3 —> 8 —> 7 **Input:** 6 —> 9 —> 2 —> 5 —> 1 —> 4 **Output:** 6 —> 9 —> 2 —> 5 —> 1 —> 4

> 

The idea is to start from the second node in the linked list and advance two nodes in each iteration of the loop. If the previous node is greater than the current node, swap their values. Similarly, if the next node is greater than the current node, exchange both values. At the end of the loop, we will get the desired linked list that satisfies the given constraints.

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

// Helper function to return new linked list node from the heap
struct Node* newNode(int key, struct Node *ptr)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = key;
    node->next = ptr;

    return node;
}

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

void swap(struct Node *first, struct Node *second)
{
    int temp = first->data;
    first->data = second->data;
    second->data = temp;
}

// Rearrange the linked list so that it has alternating high, low values
void rearrange(struct Node *head)
{
    // empty list
    if (head == NULL) {
        return;
    }

    struct Node* prev = head;
    struct Node* curr = head->next;

    // start from the second node
    while (curr)
    {
        // if the previous node is greater than the current node, swap their values
        if (prev->data > curr->data) {
            swap(prev, curr);
        }

        // if the next node is greater than the current node, swap their values
        if (curr->next && curr->next->data > curr->data) {
            swap(curr->next, curr);
        }

        // update `prev` and `curr` node
        prev = curr->next;

        if (!curr->next) {
            break;
        }

        curr = curr->next->next;
    }
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6, 7, 8, 6 };
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    rearrange(head);
    printList(head);

    return 0;
}
```

**Output:** 1 —> 3 —> 2 —> 5 —> 4 —> 7 —> 6 —> 8 —> 6 —> NULL

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

    // Rearrange the linked list so that it has alternating high, low values
    public static Node rearrange(Node head)
    {
        // empty list
        if (head == null) {
            return null;
        }

        Node prev = head;
        Node curr = head.next;

        // start from the second node
        while (curr != null)
        {
            // if the previous node is greater than the current node,
            // swap their values
            if (prev.data > curr.data)
            {
                int temp = prev.data;
                prev.data = curr.data;
                curr.data = temp;
            }

            // if the next node is greater than the current node,
            // swap their values
            if (curr.next != null && curr.next.data > curr.data)
            {
                int temp = curr.next.data;
                curr.next.data = curr.data;
                curr.data = temp;
            }

            // update `prev` and `curr` node
            prev = curr.next;

            if (curr.next == null) {
                break;
            }

            curr = curr.next.next;
        }

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6, 7, 8, 6 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = rearrange(head);
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

# Rearrange the linked list so that it has alternating high, low values
def rearrange(head):

    # empty list
    if head is None:
        return None

    prev = head
    curr = head.next

    # start from the second node
    while curr:

        # if the previous node is greater than the current node, swap their values
        if prev.data > curr.data:
            temp = prev.data
            prev.data = curr.data
            curr.data = temp

        # if the next node is greater than the current node, swap their values
        if curr.next and curr.next.data > curr.data:
            temp = curr.next.data
            curr.next.data = curr.data
            curr.data = temp

        # update `prev` and `curr` node
        prev = curr.next

        if curr.next is None:
            break

        curr = curr.next.next

    return head

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 3, 4, 5, 6, 7, 8, 6]

    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    head = rearrange(head)
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Pairwise swap adjacent nodes of a linked list](https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/ "Pairwise swap adjacent nodes of a linked list")

> [Move the last node to the front of a linked list](https://www.techiedelight.com/move-last-node-to-front-linked-list/ "Move the last node to the front of a linked list")

> [Rearrange linked list in a specific manner](https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/ "Rearrange linked list in a specific manner")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.71/5. Vote count: 184

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
