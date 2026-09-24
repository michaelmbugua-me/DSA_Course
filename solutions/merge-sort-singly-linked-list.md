# Merge sort algorithm for a singly linked list – C, Java, and Python

> Source: https://www.techiedelight.com/merge-sort-singly-linked-list/

Given a linked list, sort it using the merge sort algorithm.

> 

[Merge sort](https://techiedelight.com/merge-sort/) is an efficient, general-purpose sorting algorithm that produces a stable sort, which means that the implementation preserves the input order of equal elements in the sorted output. It is a comparison sort, i.e., it can sort items of any type for which a _less-than_ relation is defined.

Merge sort is a [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/) algorithm. Like all divide-and-conquer algorithms, the merge sort algorithm splits the list into two sublists. Then it recursively sorts each sublist and finally merges both sorted lists together to form the answer. The following solution uses the [frontBackSplit()](https://techiedelight.com/split-nodes-given-linked-list-front-back-halves/) and [sortedMerge()](https://techiedelight.com/merge-given-sorted-linked-lists/) method to solve this problem efficiently. We have already covered them in detail in previous posts.

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

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list, which is returned
struct Node* sortedMerge(struct Node* a, struct Node* b)
{
    // base cases
    if (a == NULL) {
        return b;
    }

    else if (b == NULL) {
        return a;
    }

    struct Node* result = NULL;

    // pick either `a` or `b`, and recur
    if (a->data <= b->data)
    {
        result = a;
        result->next = sortedMerge(a->next, b);
    }
    else {
        result = b;
        result->next = sortedMerge(a, b->next);
    }

    return result;
}

/*
    Split the given list's nodes into front and back halves
    and return the two lists using the reference parameters.
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow pointer strategy
*/
void frontBackSplit(struct Node* source, struct Node** frontRef,
                    struct Node** backRef)
{
    // if the length is less than 2, handle it separately
    if (source == NULL || source->next == NULL)
    {
        *frontRef = source;
        *backRef = NULL;
        return;
    }

    struct Node* slow = source;
    struct Node* fast = source->next;

    // advance `fast` two nodes, and advance `slow` one node
    while (fast != NULL)
    {
        fast = fast->next;
        if (fast != NULL)
        {
            slow = slow->next;
            fast = fast->next;
        }
    }

    // `slow` is before the midpoint in the list, so split it in two
    // at that point.
    *frontRef = source;
    *backRef = slow->next;
    slow->next = NULL;
}

// Sort a given linked list using the merge sort algorithm
void mergesort(struct Node** head)
{
    // base case — length 0 or 1
    if (*head == NULL || (*head)->next == NULL) {
        return;
    }

    struct Node* a;
    struct Node* b;

    // split `head` into `a` and `b` sublists
    frontBackSplit(*head, &a, &b);

    // recursively sort the sublists
    mergesort(&a);
    mergesort(&b);

    // answer = merge the two sorted lists
    *head = sortedMerge(a, b);
}

int main(void)
{
    // input keys
    int keys[] = { 6, 8, 4, 3, 1, 9 };
    int n = sizeof(keys)/sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = 0; i < n; i++) {
        push(&head, keys[i]);
    }

    // sort the list
    mergesort(&head);

    // print the sorted list
    printList(head);

    return 0;
}
```

**Output:** 1 —> 3 —> 4 —> 6 —> 8 —> 9 —> NULL

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

    // Takes two lists sorted in increasing order and merge their nodes
    // to make one big sorted list, which is returned
    public static Node sortedMerge(Node a, Node b)
    {
        // base cases
        if (a == null) {
            return b;
        }
        else if (b == null) {
            return a;
        }

        Node result;

        // pick either `a` or `b`, and recur
        if (a.data <= b.data)
        {
            result = a;
            result.next = sortedMerge(a.next, b);
        }
        else {
            result = b;
            result.next = sortedMerge(a, b.next);
        }

        return result;
    }

    /*
        Split the given list's nodes into front and back halves,
        If the length is odd, the extra node should go in the front list.
        It uses the fast/slow pointer strategy
    */
    public static Node[] frontBackSplit(Node source)
    {
        // if the length is less than 2, handle it separately
        if (source == null || source.next == null) {
            return new Node[]{ source, null };
        }

        Node slow = source;
        Node fast = source.next;

        // advance `fast` two nodes, and advance `slow` one node
        while (fast != null)
        {
            fast = fast.next;
            if (fast != null)
            {
                slow = slow.next;
                fast = fast.next;
            }
        }

        // `slow` is before the midpoint in the list, so split it in two
        // at that point.
        Node[] arr = new Node[]{ source, slow.next };
        slow.next = null;

        return arr;
    }

    // Sort a given linked list using the merge sort algorithm
    public static Node mergesort(Node head)
    {
        // base case — length 0 or 1
        if (head == null || head.next == null) {
            return head;
        }

        // split `head` into `a` and `b` sublists
        Node[] arr = frontBackSplit(head);
        Node front = arr[0];
        Node back = arr[1];

        // recursively sort the sublists
        front = mergesort(front);
        back = mergesort(back);

        // answer = merge the two sorted lists
        return sortedMerge(front, back);
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 8, 6, 4, 9, 3, 1 };

        Node head = null;
        for (int key: keys) {
            head = new Node(key, head);
        }

        // sort the list
        head = mergesort(head);

        // print the sorted list
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

# Takes two lists sorted in increasing order and merge their nodes
# to make one big sorted list, which is returned
def sortedMerge(a, b):

    # base cases
    if a is None:
        return b
    elif b is None:
        return a

    # pick either `a` or `b`, and recur
    if a.data <= b.data:
        result = a
        result.next = sortedMerge(a.next, b)
    else:
        result = b
        result.next = sortedMerge(a, b.next)

    return result

'''
    Split the given list's nodes into front and back halves,
    If the length is odd, the extra node should go in the front list.
    It uses the fast/slow pointer strategy
'''

def frontBackSplit(source):

    # if the length is less than 2, handle it separately
    if source is None or source.next is None:
        return source, None

    (slow, fast) = (source, source.next)

    # advance `fast` two nodes, and advance `slow` one node
    while fast:

        fast = fast.next
        if fast:
            slow = slow.next
            fast = fast.next

    # `slow` is before the midpoint of the list, so split it in two
    # at that point.
    ret = (source, slow.next)
    slow.next = None

    return ret

# Sort a given linked list using the merge sort algorithm
def mergesort(head):

    # base case — length 0 or 1
    if head is None or head.next is None:
        return head

    # split `head` into `a` and `b` sublists
    front, back = frontBackSplit(head)

    # recursively sort the sublists
    front = mergesort(front)
    back = mergesort(back)

    # answer = merge the two sorted lists
    return sortedMerge(front, back)

if __name__ == '__main__':

    # input keys
    keys = [8, 6, 4, 9, 3, 1]

    head = None
    for key in keys:
        head = Node(key, head)

    # sort the list
    head = mergesort(head)

    # print the sorted list
    printList(head)
```

The time complexity of the above solution is O(n.log(n)), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Using recursive stack space proportional to the length of a list is not recommended. However, in this case, recursion is okay as it uses stack space proportional to the log of the length of the list. For a 1000 node list, the recursion will only go about 10 levels deep. For a 2000 node list, it will go 11 levels deep. If we think about it, doubling the list’s size only increases the depth by 1.

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>

Also See:

> [Sort a doubly-linked list using merge sort](https://www.techiedelight.com/sort-doubly-linked-list-merge-sort/ "Sort a doubly-linked list using merge sort")

> [Flatten a Linked List](https://www.techiedelight.com/flatten-linked-list/ "Flatten a Linked List")

> [Merge two sorted linked lists from their end](https://www.techiedelight.com/merge-two-sorted-linked-lists-end/ "Merge two sorted linked lists from their end")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.84/5. Vote count: 201

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Hard](https://www.techiedelight.com/Tags/hard/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
