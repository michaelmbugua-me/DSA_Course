# Rearrange linked list in a specific manner in linear time

> Source: https://www.techiedelight.com/rearrange-linked-list-specific-manner-linear-time/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, rearrange its nodes such that alternate positions are filled with nodes starting from the beginning and end of the list. in linear time and constant space.

For example,

**Input :** 1 —> 2 —> 3 —> 4 —> 5 —> 6 **Output:** 1 —> 6 —> 2 —> 5 —> 3 —> 4 **Input :** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 **Output:** 1 —> 7 —> 2 —> 6 —> 3 —> 5 —> 4

> 

We can easily solve this problem by dividing it into three subproblems:

  * Divide the list into two equal parts.
  * Reverse the second half.
  * Merge the second half into the first half at alternate positions. Use of extra space is not allowed (Not allowed to create additional nodes), i.e., insertion must be done [in-place](https://techiedelight.com/in-place-vs-out-of-place-algorithms/).

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
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->next = *head;

    *head = node;
}

// Iterative function to reverse nodes of a linked list
void reverse(struct Node** head)
{
    struct Node* result = NULL;
    struct Node* current = *head;

    // Iterate through the list and move/insert each node
    // in front of the result list (like a push of the node)
    while (current != NULL)
    {
        // tricky: note the next node
        struct Node* next = current->next;

        // move the current node onto the result
        current->next = result;
        result = current;

        // process next node
        current = next;
    }

    // fix head pointer
    *head = result;
}

// Recursive function to construct a linked list by merging
// alternate nodes of two given linked lists
struct Node* shuffleMerge(struct Node* a, struct Node* b)
{
    // see if either list is empty
    if (a == NULL) {
        return b;
    }

    if (b == NULL) {
        return a;
    }

    // it turns out to be convenient to do the recursive call first;
    // otherwise, `a->next` and `b->next` need temporary storage

    struct Node* recur = shuffleMerge(a->next, b->next);

    struct Node* result = a;    // one node from `a`
    a->next = b;                // one from `b`
    b->next = recur;            // then the `rest`

    return result;
}

// Function to split the linked list into two equal parts and return the
// pointer to the second half
struct Node* findMiddle(struct Node* head)
{
    struct Node *prev = NULL;
    struct Node *slow = head, *fast = head;

    // find the middle pointer
    while (fast && fast->next)
    {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }

    // for odd nodes, fix middle
    if (fast && fast->next == NULL)
    {
        prev = slow;
        slow = slow->next;
    }

    // make next of previous node null
    prev->next = NULL;

    // return middle node
    return slow;
}

// Function to rearrange given linked list in a specific way
void rearrange(struct Node* head)
{
    // base case
    if (head == NULL) {
        return;
    }

    // find the second half of the linked list
    struct Node* mid = findMiddle(head);

    // reverse the second half
    reverse(&mid);

    // merge first and second half
    shuffleMerge(head, mid);
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5, 6 };
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

**Output:** 1 —> 6 —> 2 —> 5 —> 3 —> 4 —> NULL

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

    // Iterative function to reverse nodes of a linked list
    public static Node reverse(Node head)
    {
        Node result = null;
        Node current = head;

        // Iterate through the list and move/insert each node
        // in front of the result list (like a push of the node)
        while (current != null)
        {
            // tricky: note the next node
            Node next = current.next;

            // move the current node onto the result
            current.next = result;
            result = current;

            // process next node
            current = next;
        }

        // fix head pointer
        return result;
    }

    // Recursive function to construct a linked list by merging
    // alternate nodes of two given linked lists
    public static Node shuffleMerge(Node a, Node b)
    {
        // see if either list is empty
        if (a == null) {
            return b;
        }

        if (b == null) {
            return a;
        }

        // it turns out to be convenient to do the recursive call first;
        // otherwise, `a.next` and `b.next` need temporary storage

        Node recur = shuffleMerge(a.next, b.next);

        Node result = a;        // one node from `a`
        a.next = b;             // one from `b`
        b.next = recur;         // then the `rest`

        return result;
    }

    // Function to split the linked list into two equal parts and return the
    // pointer to the second half
    public static Node findMiddle(Node head)
    {
        Node prev = null;
        Node slow = head, fast = head;

        // find the middle pointer
        while (fast != null && fast.next != null)
        {
            prev = slow;
            slow = slow.next;
            fast = fast.next.next;
        }

        // for odd nodes, fix middle
        if (fast != null && fast.next == null)
        {
            prev = slow;
            slow = slow.next;
        }

        // make next of previous node null
        prev.next = null;

        // return middle node
        return slow;
    }

    // Function to rearrange given linked list in a specific way
    public static void rearrange(Node head)
    {
        // base case
        if (head == null) {
            return;
        }

        // find the second half of the linked list
        Node mid = findMiddle(head);

        // reverse the second half
        mid = reverse(mid);

        // merge first and second half
        shuffleMerge(head, mid);
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5, 6 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        rearrange(head);
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

# Iterative function to reverse nodes of a linked list
def reverse(head):

    result = None
    current = head

    # Iterate through the list and move/insert each node
    # in front of the result list (like a push of the node)
    while current:
        # tricky: note the next node
        next = current.next

        # move the current node onto the result
        current.next = result
        result = current

        # process next node
        current = next

    # fix head pointer
    return result

# Recursive function to construct a linked list by merging
# alternate nodes of two given linked lists
def shuffleMerge(a, b):

    # see if either list is empty
    if a is None:
        return b

    if b is None:
        return a

    # it turns out to be convenient to do the recursive call first;
    # otherwise, `a.next` and `b.next` need temporary storage

    recur = shuffleMerge(a.next, b.next)

    result = a          # one node from `a`
    a.next = b          # one from `b`
    b.next = recur      # then the `rest`

    return result

# Function to split the linked list into two equal parts and return the
# pointer to the second half
def findMiddle(head):

    prev = None
    slow = fast = head

    # find the middle pointer
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next

    # for odd nodes, fix middle
    if fast and fast.next is None:
        prev = slow
        slow = slow.next

    # make next of previous node None
    prev.next = None

    # return middle node
    return slow

# Function to rearrange given linked list in a specific way
def rearrange(head):

    # base case
    if head is None:
        return

    # find the second half of the linked list
    mid = findMiddle(head)

    # reverse the second half
    mid = reverse(mid)

    # merge first and second half
    shuffleMerge(head, mid)

if __name__ == '__main__':

    head = None
    for i in reversed(range(6)):
        head = Node(i + 1, head)

    rearrange(head)
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Split nodes of a linked list into the front and back halves](https://www.techiedelight.com/split-nodes-given-linked-list-front-back-halves/ "Split nodes of a linked list into the front and back halves")

> [Rearrange linked list in a specific manner](https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/ "Rearrange linked list in a specific manner")

> [Check if a linked list is palindrome or not](https://www.techiedelight.com/check-if-linked-list-is-palindrome/ "Check if a linked list is palindrome or not")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.91/5. Vote count: 143

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
