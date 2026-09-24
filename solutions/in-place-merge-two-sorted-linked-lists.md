# In-place merge two sorted linked lists without modifying links of the first list

> Source: https://www.techiedelight.com/in-place-merge-two-sorted-linked-lists/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given two sorted linked lists, merge them without using extra space without modifying the links of the first list. The solution should preserve the sorted order of elements in both lists.

If `m` and `n` are the total number of nodes in the first and second list, then the first `m` smallest nodes in both lists combined should become part of the first list, and the remaining nodes should become part of the second list.

For example,

**Input:** First List: 2 —> 6 —> 9 —> 10 —> 15 —> NULL Second List: 1 —> 4 —> 5 —> 20 —> NULL **Output:** First List: 1 —> 2 —> 4 —> 5 —> 6 —> NULL Second List: 9 —> 10 —> 15 —> 20 —> NULL

> 

A simple solution would be to use the [merge procedure of the merge sort algorithm](https://techiedelight.com/merge-sort-singly-linked-list/) to merge both lists. After merging both lists, assign the first `m` smallest nodes to the first linked list and the remaining `n` nodes to the second linked list where `m` and `n` are the total number of elements in the first and second linked list, respectively. We can do this in O(m + n) time and constant space.

The above solution violates the problem constraints by modifying links of the first list. However, there is no restriction on swapping data between the linked list nodes. The idea is to compare each node of the first list with the head node of the second list and swap their data if the first list’s current node is greater than the head node of the second list. The first list remains sorted with this data exchange, but the second list’s sorted order might be disturbed. To fix it, pop the front node from the second list and insert it at its correct place into the sorted second list using the [sortedInsert()](https://techiedelight.com/sorted-insert-in-linked-list/) function.

Following is the C, Java, and Python implementation of the idea:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node *next;
};

// Helper function to create a new node of the linked list
struct Node *newNode(int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;

    return newNode;
}

// Helper function to print a given linked list
void printList(char *msg, struct Node *head)
{
    printf("%s", msg);
    while (head)
    {
        printf("%2d —> ", head->data);
        head = head->next;
    }

    printf("NULL\n");
}

// Function to insert a given node at its correct sorted position into
// a given list sorted in increasing order
void sortedInsert(struct Node** head, struct Node *newNode)
{
    // special case for the head end
    if (*head == NULL || (*head)->data >= newNode->data)
    {
        newNode->next = *head;
        *head = newNode;
        return;
    }

    // locate the node before the point of insertion
    struct Node* current = *head;
    while (current->next != NULL && current->next->data < newNode->data) {
        current = current->next;
    }

    newNode->next = current->next;
    current->next = newNode;
}

// Function to exchange data of the given linked list nodes
void swapData(struct Node *first, struct Node *second)
{
    int data = first->data;
    first->data = second->data;
    second->data = data;
}

// Function to in-place merge two sorted linked lists without
// modifying links of the first list.
// Note that the second list is a "reference" pointer to the head node,
// whereas the first list is just a copy of the head node.

void mergeLists(struct Node *first, struct Node** second)
{
    // loop till either list runs out
    while (first && *second)
    {
        // compare each element of the first list with the first element
        // of the second list
        if (first->data > (*second)->data)
        {
            // exchange data if the current node of the first list has more value
            // than the first node of the second list
            swapData(first, *second);

            // pop the front node from the second list
            struct Node* front = *second;
            *second = (*second)->next;

            // insert the front node at its correct place into the second list
            sortedInsert(second, front);
        }

        // advance the first list to the next node
        first = first->next;
    }
}

int main(void)
{
    // construct the first list
    struct Node* first = newNode(2);
    first->next = newNode(6);
    first->next->next = newNode(9);
    first->next->next->next = newNode(10);
    first->next->next->next->next = newNode(15);

    // construct the second list
    struct Node* second = newNode(1);
    second->next = newNode(4);
    second->next->next = newNode(5);
    second->next->next->next = newNode(20);

    // print both lists before the merge
    printf("Before Merging:\n\n");
    printList("First List: ", first);
    printList("Second List: ", second);

    // merge both lists
    mergeLists(first, &second);

    // print both lists after merge
    printf("\n\nAfter Merging:\n\n");
    printList("First List: ", first);
    printList("Second List: ", second);

    return 0;
}
```

**Output:** **Before Merging:** First List: 2 —> 6 —> 9 —> 10 —> 15 —> NULL Second List: 1 —> 4 —> 5 —> 20 —> NULL **After Merging:** First List: 1 —> 2 —> 4 —> 5 —> 6 —> NULL Second List: 9 —> 10 —> 15 —> 20 —> NULL

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    Node(int data)
    {
        this.data = data;
        this.next = null;
    }
}

class Main
{
    // Helper function to print a given linked list
    public static void printList(String msg, Node head)
    {
        System.out.print(msg);
        while (head != null)
        {
            System.out.print(head.data + " —> ");
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to exchange data of the given linked list nodes
    public static void swapData(Node first, Node second)
    {
        int data = first.data;
        first.data = second.data;
        second.data = data;
    }

    // Function to insert a given node at its correct sorted position into
    // a given list sorted in increasing order
    public static Node sortedInsert(Node head, Node newNode)
    {
        // special case for the head end
        if (head == null || (head).data >= newNode.data)
        {
            newNode.next = head;
            head = newNode;
            return head;
        }

        // locate the node before the point of insertion
        Node current = head;
        while (current.next != null && current.next.data < newNode.data) {
            current = current.next;
        }

        newNode.next = current.next;
        current.next = newNode;

        return head;
    }

    // Function to in-place merge two sorted linked lists without
    // modifying links of the first list.
    public static Node mergeLists(Node first, Node second)
    {
        // loop till either list runs out
        while (first != null && second != null)
        {
            // compare each element of the first list with the first element
            // of the second list
            if (first.data > second.data)
            {
                // exchange data if the current node of the first list has more value
                // than the first node of the second list
                swapData(first, second);

                // pop the front node from the second list
                Node front = second;
                second = (second).next;

                // insert the front node at its correct place into the second list
                second = sortedInsert(second, front);
            }

            // advance the first list to the next node
            first = first.next;
        }

        return second;
    }

    public static void main(String[] args)
    {
        // construct the first list
        Node first = new Node(2);
        first.next = new Node(6);
        first.next.next = new Node(9);
        first.next.next.next = new Node(10);
        first.next.next.next.next = new Node(15);

        // construct the second list
        Node second = new Node(1);
        second.next = new Node(4);
        second.next.next = new Node(5);
        second.next.next.next = new Node(20);

        // print both lists before the merge
        System.out.print("Before Merging:\n\n");
        printList("First List: ", first);
        printList("Second List: ", second);

        // merge both lists
        second = mergeLists(first, second);

        // print both lists after merge
        System.out.print("\n\nAfter Merging:\n\n");
        printList("First List: ", first);
        printList("Second List: ", second);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

# Helper function to print a given linked list
def printList(msg, head):

    print(msg, end='')
    while head:
        print(head.data, end=' —> ')
        head = head.next

    print('None')

# Function to exchange data of the given linked list nodes
def swapData(first, second):

    data = first.data
    first.data = second.data
    second.data = data

# Function to insert a given node at its correct sorted position into
# a given list sorted in increasing order
def sortedInsert(head, newnode):

    # special case for the head end
    if head is None or head.data >= newnode.data:
        newnode.next = head
        head = newnode
        return head

    # Locate the node before the poof insertion
    current = head
    while current.next and current.next.data < newnode.data:
        current = current.next

    newnode.next = current.next
    current.next = newnode

    return head

# Function to in-place merge two sorted linked lists without
# modifying links of the first list.
def mergeLists(first, second):

    # loop till either list runs out
    while first and second:

        # compare each element of the first list with the first element
        # of the second list
        if first.data > second.data:
            # exchange data if the current node of the first list has more value
            # than the first node of the second list
            swapData(first, second)

            # pop the front node from the second list
            front = second
            second = second.next

            # insert the front node at its correct place into the second list
            second = sortedInsert(second, front)

        # advance the first list to the next node
        first = first.next

    return second

if __name__ == '__main__':

    # construct the first list
    first = Node(2)
    first.next = Node(6)
    first.next.next = Node(9)
    first.next.next.next = Node(10)
    first.next.next.next.next = Node(15)

    # construct the second list
    second = Node(1)
    second.next = Node(4)
    second.next.next = Node(5)
    second.next.next.next = Node(20)

    # print both lists before the merge
    print('Before Merging:\n')
    printList('First List: ', first)
    printList('Second List: ', second)

    # merge both lists
    second = mergeLists(first, second)

    # print both lists after merge
    print('\n\nAfter Merging:\n')
    printList('First List: ', first)
    printList('Second List: ', second)
```

The worst-case time complexity of the above solution is O(m.n), where `m` and `n` are the total number of nodes in the first and second list, respectively. The merging is done [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/), but we might end up traversing the complete second list for each node in the first list. This accounts for O(m.n) time complexity.

The best-case time complexity of the above solution is O(m). The best case happens when both lists are already merged in sorted order, and the `sortedInsert()` method is never called, which runs in O(n) time.

**Author:** Aditya Goel

Also See:

> [Merge two sorted linked lists from their end](https://www.techiedelight.com/merge-two-sorted-linked-lists-end/ "Merge two sorted linked lists from their end")

> [Merge alternate nodes of two linked lists into the first list](https://www.techiedelight.com/merge-alternate-nodes-two-linked-lists-first-list/ "Merge alternate nodes of two linked lists into the first list")

> [Merge two sorted linked lists into one](https://www.techiedelight.com/merge-given-sorted-linked-lists/ "Merge two sorted linked lists into one")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.93/5. Vote count: 155

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
