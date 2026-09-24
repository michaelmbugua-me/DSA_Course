# Sort linked list containing 0’s, 1’s, and 2’s in a single traversal

> Source: https://www.techiedelight.com/sort-linked-list-containing-0s-1s-2s/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list containing `0's`, `1's`, and `2's`, sort the linked list by doing a single traversal of it.

For example,

**Input:** 0 —> 1 —> 2 —> 2 —> 1 —> 0 —> 0 —> 2 —> 0 —> 1 —> 1 —> 0 —> NULL **Output:** 0 —> 0 —> 0 —> 0 —> 0 —> 1 —> 1 —> 1 —> 1 —> 2 —> 2 —> 2 —> NULL

> 

A simple solution would be to count the total number of `0's`, `1's`, and `2's` present in the linked list, traverse the linked list, and put them back in the correct order. The problem with this approach is that we need to do two traversals of the list, which violates the problem constraints.

We can solve this problem in a single traversal of the list. The idea is to maintain three-pointers zeros, ones, and twos. Then, traverse the list from head to end and move each node to the corresponding list depending on its value. Finally, combine all three lists at the end and fix the head pointer.

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

// Function to sort linked list containing 0's, 1's, and 2's
// in a single traversal
void sortList(struct Node** head)
{
    // base case
    if (*head == NULL || (*head)->next == NULL) {
        return;
    }

    // maintain three dummy nodes
    struct Node dummyZero, dummyOne, dummyTwo;
    dummyZero.next = dummyOne.next = dummyTwo.next = NULL;

    // maintain three pointers
    struct Node* zero = &dummyZero, *one = &dummyOne, *two = &dummyTwo;
    struct Node* curr = *head;

    // traverse the list
    while (curr != NULL)
    {
        if (curr->data == 0)
        {
            zero->next = curr;
            zero = zero->next;
        }
        else if (curr->data == 1)
        {
            one->next = curr;
            one = one->next;
        }
        else {
            two->next = curr;
            two = two->next;
        }
        curr = curr->next;
    }

    // combine lists containing 0's, 1's, and 2's
    zero->next = (dummyOne.next)? (dummyOne.next): (dummyTwo.next);
    one->next = dummyTwo.next;
    two->next = NULL;

    // change head
    *head = dummyZero.next;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 0, 0, 1, 2, 1, 2, 1 };
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    sortList(&head);
    printList(head);

    return 0;
}
```

**Output:** 0 —> 0 —> 1 —> 1 —> 1 —> 1 —> 2 —> 2 —> 2 —> NULL

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

    // Function to sort linked list containing 0's, 1's, and 2's in a single traversal
    public static Node sortList(Node head)
    {
        // base case
        if (head == null || head.next == null) {
            return head;
        }

        // maintain three dummy nodes
        Node first = new Node(), second = new Node(), third = new Node();

        // maintain three references
        Node zero = first, one = second, two = third;

        // traverse the list
        Node curr = head;
        while (curr != null)
        {
            if (curr.data == 0)
            {
                zero.next = curr;
                zero = zero.next;
            }
            else if (curr.data == 1)
            {
                one.next = curr;
                one = one.next;
            }
            else {
                two.next = curr;
                two = two.next;
            }
            curr = curr.next;
        }

        // combine lists containing 0's, 1's, and 2's
        zero.next = (second.next != null)? (second.next): (third.next);
        one.next = third.next;
        two.next = null;

        // change head
        return first.next;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 0, 0, 1, 2, 1, 2, 1 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = sortList(head);
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

# Function to sort linked list containing 0's, 1's, and 2's in a single traversal
def sortList(head):

    # base case
    if head is None or head.next is None:
        return head

    # maintain three dummy nodes
    first = Node()
    second = Node()
    third = Node()

    # maintain three references
    zero = first
    one = second
    two = third

    # traverse the list
    curr = head
    while curr:
        if curr.data == 0:
            zero.next = curr
            zero = zero.next
        elif curr.data == 1:
            one.next = curr
            one = one.next
        else:
            two.next = curr
            two = two.next
        curr = curr.next

    # combine lists containing 0's, 1's, and 2's
    zero.next = second.next if second.next else third.next
    one.next = third.next
    two.next = None

    # change head and return
    return first.next

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 0, 0, 1, 2, 1, 2, 1]

    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    head = sortList(head)
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

**Related Post:**

> [Sort an array of 0’s, 1’s, and 2’s (Dutch National Flag Problem)](https://techiedelight.com/sort-array-containing-0s-1s-2s-dutch-national-flag-problem/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 157

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
