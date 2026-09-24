# Pop operation in a linked list – C, Java, and Python

> Source: https://www.techiedelight.com/pop-operation-in-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write a `pop()` function that is the inverse of [push()](https://techiedelight.com/linked-list-implementation-part-1/). The `pop()` function takes a non-empty list, deletes the head node, and returns the head node’s data.

> 

The `pop()` operation is a bit tricky as it needs to unlink the front node from the list and deallocate it with a call to `free()`. The `pop()` function needs to use a reference parameter like `push()` so that it can change the caller’s head pointer. So, we extract the data from the head node, delete the node, advance the head pointer to point at the next node in line.

Following is the C, Java, and Python program that demonstrates it. The C code uses a reference parameter since it changes the head pointer.

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
    // allocate a new node in a heap and set its data
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;

    // set the `.next` pointer of the new node to point to the current
    // first node of the list.
    newNode->next = *head;

    // change the head pointer to point to the new node, so it is
    // now the first node in the list.
    *head = newNode;
}

// The opposite of `push()`. Takes a non-empty list, removes the front
// node, and returns the data in that node.
int pop(struct Node** headRef)
{
    // underflow condition
    if (*headRef == NULL) {
        return -1;
    }

    struct Node* head = *headRef;
    int result = head->data;        // pull out data before the node is deleted

    (*headRef) = (*headRef)->next;  // unlink the head node for the caller
                                    // Note the `*` — uses a reference-pointer
                                    // just like `push()` and `deleteList()`.

    free(head);             // free the head node

    return result;          // don't forget to return the data from the link
}

int main(void)
{
    // input keys
    int keys[] = {1, 2, 3, 4};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    int i = pop(&head);
    printf("The popped node is %d\n", i);

    // print remaining linked list
    printList(head);

    return 0;
}
```

**Output:** The popped node is 1 2 —> 3 —> 4 —> NULL

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

    // The opposite of `push()`. Takes a non-empty list, removes the front
    // node, and prints the data in that node.
    public static Node pop(Node headRef)
    {
        // underflow condition
        if (headRef == null) {
            return null;
        }

        int result = headRef.data;  // pull out data before the node is deleted
        headRef = headRef.next;     // unlink the head node for the caller

        System.out.println("The popped node is " + result);

        return headRef;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {1, 2, 3, 4};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        head = pop(head);

        // print remaining linked list
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

# The opposite of `push()`. Takes a non-empty list, removes the front
# node, and prints the data in that node.
def pop(headRef):

    # underflow condition
    if headRef is None:
        return None

    result = headRef.data       # pull out data before the node is deleted
    headRef = headRef.next      # unlink the head node for the caller

    print('The popped node is', result)

    return headRef

if __name__ == '__main__':

    # points to the head node of the linked list
    head = None

    # construct a linked list
    for i in reversed(range(1, 5)):
        head = Node(i, head)

    head = pop(head)

    # print remaining linked list
    printList(head)
```

The time complexity of the pop operation is O(1).

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Also See:

> [Reverse a Linked List – Recursive Solution | C, C++, Java, and Python](https://www.techiedelight.com/reverse-linked-list-part-2-recursive-solution/ "Reverse a Linked List – Recursive Solution | C, C++, Java, and Python")

> [Reverse a linked List – Iterative Solution | C, Java, and Python](https://www.techiedelight.com/reverse-linked-list-part-1-iterative-solution/ "Reverse a linked List – Iterative Solution | C, Java, and Python")

> [Rearrange linked list in a specific manner](https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/ "Rearrange linked list in a specific manner")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.8/5. Vote count: 169

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
