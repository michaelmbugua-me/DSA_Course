# Remove duplicates from a sorted linked list

> Source: https://www.techiedelight.com/remove-duplicates-sorted-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list sorted in increasing order, write a function that removes duplicate nodes from it by traversing the list only once.

For example, the list `{1, 2, 2, 2, 3, 4, 4, 5}` should be converted into the list `{1, 2, 3, 4, 5}`.

> 

Since the list is sorted, we can proceed down the list and compare adjacent nodes. When adjacent nodes are the same, remove the second one. There’s a tricky case where the node after the next node needs to be noted before the deletion.

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

// Remove duplicates from a sorted list
void removeDuplicates(struct Node* head)
{
    // do nothing if the list is empty
    if (head == NULL) {
        return;
    }

    struct Node* current = head;

    // compare the current node with the next node
    while (current->next != NULL)
    {
        if (current->data == current->next->data)
        {
            struct Node* nextNext = current->next->next;
            free(current->next);
            current->next = nextNext;
        }
        else {
            current = current->next;    // only advance if no deletion
        }
    }
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 2, 2, 3, 4, 4, 5};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    removeDuplicates(head);

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> NULL

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

    // Remove duplicates from a sorted list
    public static Node removeDuplicates(Node head)
    {
        // do nothing if the list is empty
        if (head == null) {
            return null;
        }

        Node current = head;

        // compare the current node with the next node
        while (current.next != null)
        {
            if (current.data == current.next.data)
            {
                Node nextNext = current.next.next;
                current.next = nextNext;
            }
            else {
                current = current.next;    // only advance if no deletion
            }
        }

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {1, 2, 2, 2, 3, 4, 4, 5};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = removeDuplicates(head);

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

# Remove duplicates from a sorted list
def removeDuplicates(head):

    # do nothing if the list is empty
    if head is None:
        return None

    current = head

    # compare the current node with the next node
    while current.next:
        if current.data == current.next.data:
            nextNext = current.next.next
            current.next = nextNext
        else:
            current = current.next        # only advance if no deletion

    return head

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 2, 2, 3, 4, 4, 5]

    # construct a linked list
    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    head = removeDuplicates(head)

    # print linked list
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Also See:

> [Remove duplicates from a linked list in a single traversal](https://www.techiedelight.com/remove-duplicates-linked-list/ "Remove duplicates from a linked list in a single traversal")

> [Insert a node to its correct sorted position in a sorted linked list](https://www.techiedelight.com/sorted-insert-in-linked-list/ "Insert a node to its correct sorted position in a sorted linked list")

> [Rearrange linked list in increasing order (Sort linked list)](https://www.techiedelight.com/given-linked-list-change-sorted-order/ "Rearrange linked list in increasing order \(Sort linked list\)")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 155

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
