# Rearrange linked list in increasing order (Sort linked list)

> Source: https://www.techiedelight.com/given-linked-list-change-sorted-order/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, write a function to rearrange its nodes to be sorted in increasing order.

> 

The idea is to use the [sortedInsert()](https://techiedelight.com/sorted-insert-in-linked-list/) function to sort a linked list. We start with an empty result list. Iterate through the source list and `sortedInsert()` each of its nodes into the result list. Be careful to note the `.next` field in each node before moving it into the result list.

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

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** head, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Function to insert a given node at its correct sorted position into a given
// list sorted in increasing order
void sortedInsert(struct Node** head, struct Node* newNode)
{
    struct Node dummy;
    struct Node* current = &dummy;
    dummy.next = *head;

    while (current->next != NULL && current->next->data < newNode->data) {
        current = current->next;
    }

    newNode->next = current->next;
    current->next = newNode;
    *head = dummy.next;
}

// Given a list, change it to be in sorted order (using `sortedInsert()`).
void insertSort(struct Node** head)
{
    struct Node* result = NULL;     // build the answer here
    struct Node* current = *head;   // iterate over the original list
    struct Node* next;

    while (current != NULL)
    {
        // tricky: note the next pointer before we change it
        next = current->next;

        sortedInsert(&result, current);
        current = next;
    }

    *head = result;
}

int main(void)
{
    // input keys
    int keys[] = {6, 3, 4, 8, 2, 9};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    insertSort(&head);

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 2 —> 3 —> 4 —> 6 —> 8 —> 9 —> NULL

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

    // Insert a given node at its correct sorted position into a given
    // list sorted in increasing order
    public static Node sortedInsert(Node head, Node newNode)
    {
        Node dummy = new Node();
        Node current = dummy;
        dummy.next = head;

        while (current.next != null && current.next.data < newNode.data) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;
        return dummy.next;
    }

    // Given a list, change it to be in sorted order (using `sortedInsert()`)
    public static Node insertSort(Node head)
    {
        Node result = null;     // build the answer here
        Node current = head;    // iterate over the original list
        Node next;

        while (current != null)
        {
            // tricky: note the next reference before we change it
            next = current.next;

            result = sortedInsert(result, current);
            current = next;
        }

        return result;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {6, 3, 4, 8, 2, 9};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = insertSort(head);

        // print linked list
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

# Function to insert a given node at its correct sorted position into a given
# list sorted in increasing order
def sortedInsert(head, newNode):

    dummy = Node()
    current = dummy
    dummy.next = head

    while current.next and current.next.data < newNode.data:
        current = current.next

    newNode.next = current.next
    current.next = newNode
    return dummy.next

# Given a list, change it to be in sorted order (using `sortedInsert()`).
def insertSort(head):

    result = None       # build the answer here
    current = head      # iterate over the original list

    while current:
        # tricky: note the next reference before we change it
        next = current.next

        result = sortedInsert(result, current)
        current = next

    return result

if __name__ == '__main__':

    # input keys
    keys = [6, 3, 4, 8, 2, 9]

    # points to the head node of the linked list
    head = None

    # construct a linked list
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    head = insertSort(head)

    # print linked list
    printList(head)
```

The time complexity of the above solution is O(n2), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space. Please refer below for the merge sort based algorithm to sort a linked list in O(n.log(n)) time.

**Also See:**

> [Merge sort algorithm for a singly linked list – C, Java, and Python](https://techiedelight.com/merge-sort-singly-linked-list/)

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.62/5. Vote count: 195

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
