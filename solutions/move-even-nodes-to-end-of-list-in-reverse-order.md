# Move even nodes to the end of the linked list in reverse order

> Source: https://www.techiedelight.com/move-even-nodes-to-end-of-list-in-reverse-order/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Rearrange a given linked list such that every even node will be moved to the end of the list in reverse order.

For example,

**Input:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> null **Output:** 1 —> 3 —> 5 —> 7 —> 6 —> 4 —> 2 —> null

> 

The idea is to use the [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) function. The function takes a node from the front of the source and moves it to the destination’s front. Here, the source node will be even nodes in the given list, and the destination will be a new list. After we have moved every even node, append the new list, which now contains the even nodes in reverse order to the original list.

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

// Function takes the node from the front of source `sourceRef` and moves it
// to the front of destination `destRef`
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

// Function to rearrange the given list such that every even node will be
// moved to the end of the list in reverse order. Note that the head is not passed
// by reference, as the first node will remain in the same place.
void rearrange(struct Node* head)
{
    // empty list
    if (head == NULL) {
        return;
    }

    // maintain two lists, odd and even
    struct Node* odd = head;
    struct Node *even = NULL, *prev = NULL;

    // do for each odd node
    while (odd && odd->next)
    {
        // "move" next node (which will be even) to the front of the even list
        moveNode(&even, &(odd->next));

        // update `prev` and move to the next odd node
        prev = odd;
        odd = odd->next;
    }

    // append even list to odd list
    if (odd) {
        odd->next = even;
    }
    else {
        prev->next = even;
    }
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

    printf("Before: ");
    printList(head);

    // rearrange the pointers of a given list
    rearrange(head);

    printf("After: ");
    printList(head);

    return 0;
}
```

**Output:** Before: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> NULL After: 1 —> 3 —> 5 —> 7 —> 6 —> 4 —> 2 —> NULL

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

    // Function to rearrange the given list such that every even node will be
    // moved to the end of the list in reverse order.
    public static void rearrange(Node head)
    {
        // empty list
        if (head == null) {
            return;
        }

        // maintain two lists, odd and even
        Node odd = head;
        Node even = null, prev = null;

        // do for each odd node
        while (odd != null && odd.next != null)
        {
            // "move" next node (which will be even)
            // to the front of even list
            if (odd.next != null)
            {
                Node newNode = odd.next;
                odd.next = odd.next.next;

                newNode.next = even;
                even = newNode;
            }

            // update `prev` and move to the next odd node
            prev = odd;
            odd = odd.next;
        }

        // append even list to odd list
        if (odd != null) {
            odd.next = even;
        }
        else {
            prev.next = even;
        }
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

        printList("Before: ", head);

        // rearrange the references to the given list
        rearrange(head);

        printList("After: ", head);
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

    print(msg, end = '')
    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Function to rearrange the given list such that every even node will be
# moved to the end of the list in reverse order.
def rearrange(head):

    # empty list
    if head is None:
        return

    # maintain two lists, odd and even
    odd = head
    even = prev = None

    # do for each odd node
    while odd and odd.next:

        # "move" next node (which will be even) to the front of the even list
        if odd.next:
            newNode = odd.next          # the front source node
            odd.next = odd.next.next    # advance the source

            newNode.next = even         # link the old dest off the new node
            even = newNode              # move dest to point to the new node

        # update `prev` and move to the next odd node
        prev = odd
        odd = odd.next

    # append even list to odd list
    if odd:
        odd.next = even
    else:
        prev.next = even

if __name__ == '__main__':

    # construct the first linked list
    head = None
    for i in reversed(range(7)):
        head = Node(i + 1, head)

    printList('Before: ', head)

    # rearrange the references to the given list
    rearrange(head)
    printList('After: ', head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list. The auxiliary space required by the program is constant.

Also See:

> [Move the last node to the front of a linked list](https://www.techiedelight.com/move-last-node-to-front-linked-list/ "Move the last node to the front of a linked list")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Move the front node of a linked list in front of another list](https://www.techiedelight.com/move-front-node-given-list-front-another-list/ "Move the front node of a linked list in front of another list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 148

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
