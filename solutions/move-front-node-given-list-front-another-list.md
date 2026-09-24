# Move the front node of a linked list in front of another list

> Source: https://www.techiedelight.com/move-front-node-given-list-front-another-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two linked lists, move front node of the second list in front of the first list.

For example,

**Input:** First List: 1 —> 2 —> 3 —> null Second List: 6 —> 4 —> 2 —> null **Output:** First List: 6 —> 1 —> 2 —> 3 —> null Second List: 4 —> 2 —> null

> 

This is a variant on [push()](https://techiedelight.com/linked-list-implementation-part-1/). Instead of creating a new node and pushing it onto the given list, it takes two lists, removes the front node from the second list, and moves it to the front of the first. This turns out to be a handy utility function to have for several later problems.

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

// Function takes the node from the front of the source and move it
// to the front of the destination
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

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3 };
    int n = sizeof(keys)/sizeof(keys[0]);

    // construct the first linked list
    struct Node* a = NULL;
    for (int i = n-1; i >= 0; i--) {
        push(&a, keys[i]);
    }

    // construct the second linked list
    struct Node* b = NULL;
    for (int i = 0; i < n; i++) {
        push(&b, 2*keys[i]);
    }

    // move the front node of the list `b` to the front of the list `a`
    moveNode(&a, &b);

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    return 0;
}
```

**Output:** First List: 6 —> 1 —> 2 —> 3 —> NULL Second List: 4 —> 2 —> NULL

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

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3 };

        // construct the first linked list
        Node a = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            a = new Node(keys[i], a);
        }

        // construct a second linked list
        Node b = null;
        for (int i = 0; i < keys.length; i++) {
            b = new Node(2 * keys[i], b);
        }

        if (b != null)
        {
            // take the node from the front of list `b`, and move it
            // to the front of the list `a`

            Node newNode = b;   // the front source node
            b = b.next;         // advance the source

            newNode.next = a;   // link the old dest off the new node
            a = newNode;        // move dest to point to the new node
        }

        // print both lists
        printList("First List: ", a);
        printList("Second List: ", b);
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

if __name__ == '__main__':

    # construct the first linked list
    a = None
    for i in reversed(range(3)):
        a = Node(i + 1, a)

    # construct the second linked list
    b = None
    for i in range(3):
        b = Node(2 * (i + 1), b)

    if b:

        # take the node from the front of list `b` and move it
        # to the front of the list `a`

        newNode = b         # the front source node
        b = b.next          # advance the source

        newNode.next = a    # link the old dest off the new node
        a = newNode         # move dest to point to the new node

    # print both lists
    printList('First List: ', a)
    printList('Second List: ', b)
```

The time complexity of the above solution is O(1).

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Also See:

> [Move the last node to the front of a linked list](https://www.techiedelight.com/move-last-node-to-front-linked-list/ "Move the last node to the front of a linked list")

> [Move even nodes to the end of the linked list in reverse order](https://www.techiedelight.com/move-even-nodes-to-end-of-list-in-reverse-order/ "Move even nodes to the end of the linked list in reverse order")

> [Merge two sorted linked lists from their end](https://www.techiedelight.com/merge-two-sorted-linked-lists-end/ "Merge two sorted linked lists from their end")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 145

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
