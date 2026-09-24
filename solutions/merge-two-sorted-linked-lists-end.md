# Merge two sorted linked lists from their end

> Source: https://www.techiedelight.com/merge-two-sorted-linked-lists-end/

Write a function that takes two lists, each of which is sorted in increasing order, and merges the two into one list, which is in decreasing order, and returns it. In other words, [merge](https://techiedelight.com/merge-given-sorted-linked-lists/) two sorted linked lists from their end.

For example, consider lists `a = {1, 3, 5}` and `b = {2, 6, 7, 10}`. Merging both lists should yield the list `{10, 7, 6, 5, 3, 2, 1}`.

> 

There are few cases to deal with – either `a` or `b` may be empty, during processing, either `a` or `b` may run out first, and finally, there’s the problem of starting the result list empty, and building it up while going through `a` and `b`.

We can easily solve this problem using the [moveNode()](https://techiedelight.com/move-front-node-given-list-front-another-list/) function as a helper, which takes the node from the front of the source and moves it to the front of the destination. The rest of the code remains similar to the [merge process](https://techiedelight.com/merge-sort-singly-linked-list/) of merge sort.

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

// Function takes the node from the front of the source and moves it
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

// Function to merge two sorted lists from the end
struct Node* reverseMerge(struct Node* a, struct Node* b)
{
    struct Node* result = NULL;

    while (a && b)
    {
        if (a->data < b->data) {
            moveNode(&result, &a);
        }
        else {
            moveNode(&result, &b);
        }
    }

    while (b) {
        moveNode(&result, &b);
    }

    while (a) {
        moveNode(&result, &a);
    }

    return result;
}

int main(void)
{
    struct Node *a = NULL, *b = NULL;

    for (int i = 6; i > 0; i = i - 2) {
        push(&a, i);
    }

    for (int i = 9; i >= 1; i = i - 2) {
        push(&b, i);
    }

    // print both lists
    printf("First List: ");
    printList(a);

    printf("Second List: ");
    printList(b);

    struct Node* head = reverseMerge(a, b);

    printf("\nAfter Merge: ");
    printList(head);

    return 0;
}
```

**Output:** First List: 2 —> 4 —> 6 —> NULL Second List: 1 —> 3 —> 5 —> 7 —> 9 —> NULL After Merge: 9 —> 7 —> 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> NULL

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

    // Function to merge two sorted lists from the end
    public static Node reverseMerge(Node a, Node b)
    {
        Node result = null;

        while (a != null && b != null)
        {
            if (a.data < b.data)
            {
                // take the node from the front of the list `a`, and move it
                // to the front of the result

                Node newNode = a;
                a = a.next;

                newNode.next = result;
                result = newNode;
            }
            else {

                // take the node from the front of the list `b`, and move it
                // to the front of the result

                Node newNode = b;
                b = b.next;

                newNode.next = result;
                result = newNode;
            }
        }

        while (b != null)
        {
            Node newNode = b;
            b = b.next;

            newNode.next = result;
            result = newNode;
        }

        while (a != null)
        {
            Node newNode = a;
            a = a.next;

            newNode.next = result;
            result = newNode;
        }

        return result;
    }

    public static void main(String[] args)
    {
        Node a = null, b = null;

        for (int i = 6; i > 0; i = i - 2) {
            a = new Node(i, a);
        }

        for (int i = 9; i >= 1; i = i - 2) {
            b = new Node(i, b);
        }

        // print both lists
        printList("First List: ", a);
        printList("Second List: ", b);

        Node head = reverseMerge(a, b);
        printList("After Merge: ", head);
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

# Function to merge two sorted lists from the end
def reverseMerge(a, b):

    result = None

    while a and b:
        if a.data < b.data:

            # take the node from the front of the list `a`, and move it
            # to the front of the result

            newNode = a
            a = a.next

            newNode.next = result
            result = newNode
        else:
            # take the node from the front of the list `b`, and move it
            # to the front of the result

            newNode = b
            b = b.next

            newNode.next = result
            result = newNode

    while b:
        newNode = b
        b = b.next

        newNode.next = result
        result = newNode

    while a:
        newNode = a
        a = a.next

        newNode.next = result
        result = newNode

    return result

if __name__ == '__main__':

    a = b = None

    for i in reversed(range(2, 8, 2)):
        a = Node(i, a)

    for i in reversed(range(1, 10, 2)):
        b = Node(i, b)

    # print both lists
    printList('First List: ', a)
    printList('Second List: ', b)

    head = reverseMerge(a, b)
    printList('After Merge: ', head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Merge two sorted linked lists into one](https://www.techiedelight.com/merge-given-sorted-linked-lists/ "Merge two sorted linked lists into one")

> [Merge alternate nodes of two linked lists into the first list](https://www.techiedelight.com/merge-alternate-nodes-two-linked-lists-first-list/ "Merge alternate nodes of two linked lists into the first list")

> [In-place merge two sorted linked lists without modifying links of the first list](https://www.techiedelight.com/in-place-merge-two-sorted-linked-lists/ "In-place merge two sorted linked lists without modifying links of the first list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.92/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
