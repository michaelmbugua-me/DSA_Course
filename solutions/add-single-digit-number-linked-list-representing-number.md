# Add a single-digit number to a linked list representing a number

> Source: https://www.techiedelight.com/add-single-digit-number-linked-list-representing-number/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a single-digit number k and a singly linked list whose nodes stores digits of a non-negative number, add k to the linked list.

For example, consider the linked list `9 —> 9 —> 9 —> 3 —> NULL` which represents the number `9993`. Adding a single-digit number `7` to it should result in the linked list `1 —> 0 —> 0 —> 0 —> 0 —> NULL` which corresponds to the number `10000`.

> 

The idea is to solve this problem using the basic algorithm for the addition of two numbers. But since the given list is singly linked, we can’t iterate it in the backward direction. Therefore, to facilitate the addition, we can [reverse the list](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/).

We start by adding the given single-digit number to the digit at the first node in the reversed list. If the resultant sum is a 2-digit number, update the node with a single-digit sum and move the carry to the next node. This process is repeated while there is a carry. If we reach the last node and a carry exists, add a new node at the end of the linked list with carry as the value. Finally, reverse the list again to restore the original order.

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

// Helper function to create a new node of the linked list
struct Node* newNode(int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = NULL;

    return newNode;
}

// Helper function to print a given linked list
void printList(char *msg, struct Node* head)
{
    printf("%s", msg);
    while (head)
    {
        printf("%d —> ", head->data);
        head = head->next;
    }

    printf("NULL\n");
}

// Function to reverse a given linked list
void reverse(struct Node** head)
{
    struct Node* prev = NULL;
    struct Node* current = *head;
    struct Node* next;

    // traverse the list
    while (current)
    {
        // tricky: note the next node
        next = current->next;

        // fix the current node
        current->next = prev;

        // advance the two pointers
        prev = current;
        current = next;
    }

    // fix the head pointer to point to the new front
    *head = prev;
}

// Function to add a single-digit number to a singly linked list
// whose nodes represent digits of a number
void addDigit(struct Node** head, int digit)
{
    // empty list
    if (*head == NULL) {
        *head = newNode(digit);
        return;
    }

    // reverse the linked list
    reverse(head);

    // initialize carry with the given digit
    int carry = digit;

    // traverse the reversed list
    struct Node* curr = *head;
    while (carry)
    {
        // get a sum of the current node and carry
        int sum = curr->data + carry;

        // update value of the current node with the single-digit sum
        curr->data = sum % 10;

        // set carry for the next node
        carry = sum / 10;

        // break if the current node is the last
        if (curr->next == NULL) {
            break;
        }

        // move to the next node
        curr = curr->next;
    }

    // add a new node at the end of the linked list if there is any carry left
    if (carry) {
        curr->next = newNode(carry);
    }

    // reverse the list again to restore the original order
    reverse(head);
}

int main(void)
{
    struct Node* head = newNode(9);
    head->next = newNode(9);
    head->next->next = newNode(9);
    head->next->next->next = newNode(9);
    head->next->next->next->next = newNode(3);

    int digit = 7;

    printList("Original linked list: ", head);
    addDigit(&head, digit);
    printList("Resultant linked list: ", head);

    return 0;
}
```

**Output:** Original linked list: 9 —> 9 —> 9 —> 9 —> 3 —> NULL Resultant linked list: 1 —> 0 —> 0 —> 0 —> 0 —> 0 —> NULL

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next = null;

    Node(int data) {
        this.data = data;
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

    // Function to reverse a given linked list
    public static Node reverse(Node head)
    {
        Node prev = null;
        Node current = head;
        Node next;

        // traverse the list
        while (current != null)
        {
            // tricky: note the next node
            next = current.next;

            // fix the current node
            current.next = prev;

            // advance the two pointers
            prev = current;
            current = next;
        }

        // fix the head pointer to point to the new front
        head = prev;
        return head;
    }

    // Function to add a single-digit number to a singly linked list
    // whose nodes represent digits of a number
    public static Node addDigit(Node head, int digit)
    {
        // empty list
        if (head == null) {
            return new Node(digit);
        }

        // reverse the linked list
        head = reverse(head);

        // initialize carry with the given digit
        int carry = digit;

        // traverse the reversed list
        Node curr = head;
        while (carry > 0)
        {
            // get a sum of the current node and carry
            int sum = curr.data + carry;

            // update value of the current node with the single-digit sum
            curr.data = sum % 10;

            // set carry for the next node
            carry = sum / 10;

            // break if the current node is the last
            if (curr.next == null) {
                break;
            }

            // move to the next node
            curr = curr.next;
        }

        // add a new node at the end of the linked list if there is any carry left
        if (carry > 0) {
            curr.next = new Node(carry);
        }

        // reverse the list again to restore the original order
        head = reverse(head);
        return head;
    }

    public static void main(String[] args)
    {
        Node head = new Node(9);
        head.next = new Node(9);
        head.next.next = new Node(9);
        head.next.next.next = new Node(9);
        head.next.next.next.next = new Node(3);

        int digit = 7;

        printList("Original linked list: ", head);
        head = addDigit(head, digit);
        printList("Resultant linked list: ", head);
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

# Function to reverse a given linked list
def reverse(head):

    prev = None
    current = head

    # traverse the list
    while current:
        # tricky: note the next node
        next = current.next

        # fix the current node
        current.next = prev

        # advance the two pointers
        prev = current
        current = next

    # fix the head pointer to point to the front
    head = prev
    return head

# Function to add a single-digit number to a singly linked list
# whose nodes represent digits of a number
def addDigit(head, digit):

    # empty list
    if head is None:
        return Node(digit)

    # reverse the linked list
    head = reverse(head)

    # initialize carry with the given digit
    carry = digit

    # traverse the reversed list
    curr = head
    while carry > 0:

        # get a sum of the current node and carry
        total = curr.data + carry

        # update value of the current node with the single-digit sum
        curr.data = total % 10

        # set carry for the next node
        carry = total // 10

        # break if the current node is the last
        if curr.next is None:
            break

        # move to the next node
        curr = curr.next

    # add a new node at the end of the linked list if there is any carry left
    if carry > 0:
        curr.next = Node(carry)

    # reverse the list again to restore the original order
    head = reverse(head)
    return head

if __name__ == '__main__':

    head = Node(9)
    head.next = Node(9)
    head.next.next = Node(9)
    head.next.next.next = Node(9)
    head.next.next.next.next = Node(3)

    digit = 7

    printList('Original linked list: ', head)
    head = addDigit(head, digit)
    printList('Resultant linked list: ', head)
```

The time complexity of the above solution is linear, but the code performs several traversals of the linked list. We can avoid reversing the list by having [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) take care of processing the nodes in reverse order. The idea is to recursively reach the end of the linked list and pass the carry information to each parent node as the recursion unfolds.

This is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to push a new node at the beginning of the linked list
void push(struct Node** head, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;

    *head = newNode;
}

// Helper function to print a given linked list
void printList(char *msg, struct Node* head)
{
    printf("%s", msg);
    while (head)
    {
        printf("%d —> ", head->data);
        head = head->next;
    }

    printf("NULL\n");
}

// Recursive function to add a given digit to the linked list
// representing a number
int add(struct Node *head, int digit)
{
    // base case: end of the linked list is reached
    if (head == NULL) {
        return digit;
    }

    // stores the carry returned by the recursive call of the next node
    int carry = add(head->next, digit);

    // optimization: terminate the recursion if carry is 0 at any point
    if (carry == 0) {
        return 0;
    }

    // get the sum of the current node and the carry
    int sum = head->data + carry;

    head->data = sum % 10;  // update value of the current node
    return sum/10;          // return carry
}

// Function to add a single-digit number to a singly linked list
// whose nodes represent digits of a number
void addDigit(struct Node** head, int digit)
{
    // Add a given digit to the linked list using recursion
    int carry = add(*head, digit);

    // if there is any carry left, add a new node at the beginning of the list
    if (carry) {
        push(head, carry);
    }
}

int main(void)
{
    int number[] = { 9, 9, 9, 9, 3 };
    int n = sizeof(number)/ sizeof(int);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, number[i]);
    }

    int digit = 7;

    printList("Original linked list: ", head);
    addDigit(&head, digit);
    printList("Resultant linked list: ", head);

    return 0;
}
```

**Output:** Original linked list: 9 —> 9 —> 9 —> 9 —> 3 —> NULL Resultant linked list: 1 —> 0 —> 0 —> 0 —> 0 —> 0 —> NULL

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next = null;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Helper function to push a new node at the beginning of the linked list
    public static Node push(Node head, int data)
    {
        Node node = new Node(data);
        node.next = head;

        head = node;
        return head;
    }

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

    // Recursive function to add a given digit to the linked list representing
    // a number.
    public static int add(Node head, int digit)
    {
        // base case: end of the linked list is reached
        if (head == null) {
            return digit;
        }

        // stores the carry returned by the recursive call of the next node
        int carry = add(head.next, digit);

        // optimization: terminate the recursion if carry is 0 at any point
        if (carry == 0) {
            return 0;
        }

        // get the sum of the current node and the carry
        int sum = head.data + carry;

        head.data = sum % 10;   // update value of the current node
        return sum/10;          // return carry
    }

    // Function to add a single-digit number to a singly linked list
    // whose nodes represent digits of a number
    public static Node addDigit(Node head, int digit)
    {
        // Add a given digit to the linked list using recursion
        int carry = add(head, digit);

        // if there is any carry left, add a new node at the beginning of the list
        if (carry > 0) {
            head = push(head, carry);
        }

        return head;
    }

    public static void main(String[] args)
    {
        int[] number = { 9, 9, 9, 9, 3 };

        Node head = null;
        for (int i = number.length - 1; i >= 0; i--) {
            head = push(head, number[i]);
        }

        int digit = 7;

        printList("Original linked list: ", head);
        head = addDigit(head, digit);
        printList("Resultant linked list: ", head);
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

# Recursive function to add a given digit to the linked list representing
# a number.
def append(head, digit):

    # base case: end of the linked list is reached
    if head is None:
        return digit

    # stores the carry returned by the recursive call of the next node
    carry = append(head.next, digit)

    # optimization: terminate the recursion if carry is 0 at any point
    if carry == 0:
        return 0

    # get the sum of the current node and the carry
    total = head.data + carry

    head.data = total % 10    # update value of the current node
    return total // 10        # return carry

# Function to add a single-digit number to a singly linked list
# whose nodes represent digits of a number
def addDigit(head, digit):

    # Add given digit to the linked list using recursion
    carry = append(head, digit)

    # if there is any carry left, add a new node at the beginning of the list
    if carry > 0:
        head = Node(carry, head)

    return head

if __name__ == '__main__':

    number = [9, 9, 9, 9, 3]

    head = None
    for i in reversed(range(len(number))):
        head = Node(number[i], head)

    digit = 7

    printList('Original linked list: ', head)
    head = addDigit(head, digit)
    printList('Resultant linked list: ', head)
```
