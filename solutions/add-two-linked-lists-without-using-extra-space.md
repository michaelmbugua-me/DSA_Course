# Add two linked lists without using any extra space

> Source: https://www.techiedelight.com/add-two-linked-lists-without-using-extra-space/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list representation of two positive numbers, calculate and store their sum in a new list without extra space.

For example,

**Input:** X: 5 —> 7 —> 3 —> 4 —> null Y: 9 —> 4 —> 6 —> null **Output:** 6 —> 6 —> 8 —> 0 —> null (as 5734 + 946 = 6680)

> 

The idea is to [reverse both input lists](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/). The reversal is needed since the addition of two numbers is performed from right to left, but the traversal of the singly linked list is possible only from the beginning. After reversing, traverse both lists simultaneously and construct a new list with the sum of nodes from both lists. Special care needs to be taken when a sum is a 2-digit number (i.e., a carry exists) or any list runs out of elements. Note that we need to reverse the resultant list as well.

This approach is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to create a new node with the given data
struct Node* newNode(int data)
{
    // create a new linked list node from the heap
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->data = data;
    node->next = NULL;

    return node;
}

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(struct Node**headRef, int data)
{
    // create a new linked list node from the heap
    struct Node* node = newNode(data);
    node->next = *headRef;
    *headRef = node;
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

    printf("NULL\n");
}

// Iterate through the list and move/insert each node
// in front of the out list like `push()` of the node
void reverse(struct Node** headRef)
{
    struct Node* out = NULL;
    struct Node* current = *headRef;

    // traverse the list
    while (current)
    {
        // tricky: note the next node
        struct Node* next = current->next;

        // move the current node onto the out
        current->next = out;
        out = current;

        // process next node
        current = next;
    }

    // fix head pointer
    *headRef = out;
}

// Function to add two lists, `X` and `Y`
void add(struct Node* X, struct Node* Y, struct Node **head)
{
    // stores the last seen node
    struct Node* prevNode = NULL;

    // initialize carry with 0
    int carry = 0;

    // run till both lists are empty
    while (X || Y)
    {
        // sum is X's data + Y's data + carry (if any)
        int sum = 0;
        if (X) {
            sum += X->data;
        }
        if (Y) {
            sum += Y->data;
        }
        sum += carry;

        // if the sum of a 2–digit number, reduce it and update carry
        carry = sum / 10;
        sum = sum % 10;

        // create a new node with the calculated sum
        struct Node* node = newNode(sum);

        // if the output list is empty
        if (*head == NULL)
        {
            // update `prev` and `head` pointers to point to the new node
            prevNode = node;
            *head = node;
        }
        else {
            // add the new node to the output list
            prevNode->next = node;

            // update the previous node to point to the new node
            prevNode = node;
        }

        // advance `X` and `Y` for the next iteration of the loop
        if (X) {
            X = X->next;
        }

        if (Y) {
            Y = Y->next;
        }
    }

    if (carry != 0) {
        push(&(prevNode->next), carry);
    }
}

// Function to add two lists, `X` and `Y`
struct Node* addLists(struct Node* X, struct Node* Y)
{
    struct Node* out = NULL;

    // reverse `X` and `Y` to access elements from the end
    reverse(&X);
    reverse(&Y);

    add(X, Y, &out);
    reverse(&out);

    // optional: call reverse again on `X` and `Y`

    return out;
}

int main(void)
{
    int x = 5734;
    int y = 946;

    // construct list `X` (5 —> 7 —> 3 —> 4) from number `x`
    struct Node* X = NULL;
    while (x)
    {
        push(&X, x % 10);
        x = x/10;
    }

    // construct list `Y` (9 —> 4 —> 6) from number `y`
    struct Node* Y = NULL;
    while (y)
    {
        push(&Y, y % 10);
        y = y/10;
    }

    printList(addLists(X, Y));

    return 0;
}
```

**Output:** 6 —> 6 —> 8 —> 0 —> NULL

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

    // Iterate through the list and move/insert each node
    // in front of the out list like `push()` of the node
    public static Node reverse(Node head)
    {
        Node out = null;
        Node current = head;

        // traverse the list
        while (current != null)
        {
            // tricky: note the next node
            Node next = current.next;

            // move the current node onto the out
            current.next = out;
            out = current;

            // process next node
            current = next;
        }

        // fix head
        return out;
    }

    // Function to add two lists, `X` and `Y`
    public static Node add(Node X, Node Y)
    {
        Node head = null;

        // stores the last seen node
        Node prevNode = null;

        // initialize carry with 0
        int carry = 0;

        // run till both lists are empty
        while (X != null || Y != null)
        {
            // sum is X's data + Y's data + carry (if any)
            int sum = 0;
            if (X != null) {
                sum += X.data;
            }
            if (Y != null ) {
                sum += Y.data;
            }
            sum += carry;

            // if the sum of a 2–digit number, reduce it and update carry
            carry = sum / 10;
            sum = sum % 10;

            // create a new node with the calculated sum
            Node node = new Node(sum, null);

            // if the output list is empty
            if (head == null)
            {
                // update `prev` and `head` to point to the new node
                prevNode = node;
                head = node;
            }
            else {
                // add the new node to the output list
                prevNode.next = node;

                // update the previous node to point to the new node
                prevNode = node;
            }

            // advance `X` and `Y` for the next iteration of the loop
            if (X != null) {
                X = X.next;
            }

            if (Y != null) {
                Y = Y.next;
            }
        }

        if (carry != 0) {
            prevNode.next = new Node(carry, prevNode.next);
        }

        return head;
    }

    // Function to add two lists, `X` and `Y`
    public static Node addLists(Node X, Node Y)
    {
        // reverse `X` and `Y` to access elements from the end
        X = reverse(X);
        Y = reverse(Y);

        return reverse(add(X, Y));
    }

    public static void main(String[] args)
    {
        int x = 5734;
        int y = 946;

        // construct list `X` (5 —> 7 —> 3 —> 4) from number `x`
        Node X = null;
        while (x != 0)
        {
            X = new Node(x % 10, X);
            x = x/10;
        }

        // construct list `Y` (9 —> 4 —> 6) from number `y`
        Node Y = null;
        while (y != 0)
        {
            Y = new Node(y % 10, Y);
            y = y/10;
        }

        printList(addLists(X, Y));
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

# Iterate through the list and move/insert each node
# in front of the out list like `push()` of the node
def reverse(head):

    out = None
    current = head

    # traverse the list
    while current:
        # tricky: note the next node
        next = current.next

        # move the current node onto the out
        current.next = out
        out = current

        # process next node
        current = next

    # fix head
    return out

# Function to add two lists, `X` and `Y`
def append(X, Y):

    head = None

    # stores the last seen node
    prev = None

    # initialize carry with 0
    carry = 0

    # run till both lists are empty
    while X or Y:

        # sum is X's data + Y's data + carry (if any)
        total = 0
        if X:
            total += X.data
        if Y:
            total += Y.data

        total += carry

        # if the sum of a 2–digit number, reduce it and update carry
        carry = total // 10
        total = total % 10

        # create a new node with the calculated sum
        node = Node(total)

        # if the output list is empty
        if head is None:
            # update `prev` and `head` to point to the new node
            prev = node
            head = node
        else:
            # add the new node to the output list
            prev.next = node

            # update the previous node to point to the new node
            prev = node

        # advance `X` and `Y` for the next iteration of the loop
        X = X.next if X else X
        Y = Y.next if Y else Y

    if carry:
        prev.next = Node(carry, prev.next)

    return head

# Function to add two lists, `X` and `Y`
def addLists(X, Y):

    # reverse `X` and `Y` to access elements from the end
    X = reverse(X)
    Y = reverse(Y)

    return reverse(append(X, Y))

if __name__ == '__main__':

    x = 5734
    y = 946

    # construct list `X` (5 —> 7 —> 3 —> 4) from number `x`
    X = None
    while x:
        X = Node(x % 10, X)
        x = x // 10

    # construct list `Y` (9 —> 4 —> 6) from number `y`
    Y = None
    while y:
        Y = Node(y % 10, Y)
        y = y // 10

    printList(addLists(X, Y))
```

The time complexity of the above solution is O(m + n), where `m` and `n` are the total number of nodes in the first and second list, respectively. The auxiliary space required by the program is constant.

Also See:

> [Add a single-digit number to a linked list representing a number](https://www.techiedelight.com/add-single-digit-number-linked-list-representing-number/ "Add a single-digit number to a linked list representing a number")

> [Reverse every group of `k` nodes in a linked list](https://www.techiedelight.com/reverse-every-k-nodes-of-a-linked-list/ "Reverse every group of `k` nodes in a linked list")

> [Merge two sorted linked lists from their end](https://www.techiedelight.com/merge-two-sorted-linked-lists-end/ "Merge two sorted linked lists from their end")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 178

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
