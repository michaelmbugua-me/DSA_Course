# Check if a linked list is palindrome or not

> Source: https://www.techiedelight.com/check-if-linked-list-is-palindrome/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, check if it is a palindrome or not.

> 

A simple solution would be to create a clone of the linked list, [reverse it](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/), and check if both linked lists are equal or not. This approach requires three traversals of the linked list and requires extra space for storing duplicates.

A better solution is to use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to reach the end of the linked list by recursion and then compare if the last node has the same value as the first node and the second previous node has the same value as the second node, and so on using the call stack and a pointer at the beginning of the linked list.

Following is the C, Java, and Python implementation of the idea:

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

// Recursive function to check if the linked list is a palindrome or not
int checkPalindrome(struct Node** left, struct Node* right)
{
    // base case
    if (right == NULL) {
        return 1;
    }

    int result = checkPalindrome(left, right->next) && ((*left)->data == right->data);
    (*left) = (*left)->next;

    return result;
}

// Function to check if the linked list is a palindrome or not
int checkPalin(struct Node* head) {
    return checkPalindrome(&head, head);
}

int main(void)
{
    // input keys
    int keys[] = { 1, 3, 5, 3, 1};
    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    if (checkPalin(head)) {
        printf("The linked list is a palindrome");
    }
    else {
        printf("The linked list is not a palindrome");
    }

    return 0;
}
```

**Output:** The linked list is a palindrome

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
    // Wrapper over `Node` class
    static class NodeWrapper
    {
        public Node node;

        NodeWrapper(Node node) {
            this.node = node;
        }
    }

    // Helper function to insert a new node at the beginning of the linked list
    public static Node push(Node head, int data)
    {
        Node node = new Node(data);
        node.next = head;
        return node;    // return node, which would be the new head
    }

    // Recursive function to check if the linked list is a palindrome or not
    public static boolean checkPalindrome(NodeWrapper left, Node right)
    {
        // base case
        if (right == null) {
            return true;
        }

        boolean result = checkPalindrome(left, right.next) &&
                            (left.node.data == right.data);
        left.node = left.node.next;

        return result;
    }

    // Function to check if the linked list is a palindrome or not
    public static boolean checkPalin(Node head)
    {
        // Wrap the `head` node, so its reference can be changed inside the
        // `checkPalindrome()`
        return checkPalindrome(new NodeWrapper(head), head);
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {1, 3, 5, 3, 1};

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = push(head, keys[i]);
        }

        if (checkPalin(head)) {
            System.out.println("The linked list is a palindrome");
        }
        else {
            System.out.println("The linked list is not a palindrome");
        }
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

# Recursive function to check if the linked list is a palindrome or not
def checkPalindrome(left, right):

    # base case
    if right is None:
        return True, left

    val, left = checkPalindrome(left, right.next)

    result = val and (left.data == right.data)
    left = left.next

    return result, left

# Function to check if the linked list is a palindrome or not
def checkPalin(head):
    return checkPalindrome(head, head)[0]

if __name__ == '__main__':

    # input keys
    keys = [1, 3, 5, 3, 1]

    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    if checkPalin(head):
        print('The linked list is a palindrome')
    else:
        print('The linked list is not a palindrome')
```

The time complexity of the above solution is O(n), where `n` is the length of the linked list. The auxiliary space required by the program for the call stack is proportional to the lists’ length.

We can solve this problem in constant space and linear time by dividing the problem into three subproblems:

  * Divide the list into two equal parts.
  * Reverse the second half.
  * Check if the first and second half is similar. If the linked list contains an odd number of nodes, then ignore the middle element.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;
};

// Helper function to insert a new node at the beginning of the linked list
void push(Node* &head, int data)
{
    Node* node = new Node();
    node->data = data;
    node->next = head;

    head = node;
}

// Iterative function to reverse nodes of a linked list
void reverse(Node* &head)
{
    Node* result = nullptr;
    Node* current = head;

    // Iterate through the list and move/insert each node
    // in front of the result list (like a push of the node)
    while (current != nullptr)
    {
        // tricky: note the next node
        Node* next = current->next;

        // move the current node onto the result
        current->next = result;
        result = current;

        // process next node
        current = next;
    }

    // fix head pointer
    head = result;
}

// Recursive function to check if two linked lists are equal or not
bool compare(Node* a, Node* b)
{
    // see if both lists are empty
    if (a == nullptr && b == nullptr) {
        return true;
    }

    return a && b && (a->data == b->data) && compare(a->next, b->next);
}

// Function to split the linked list into two equal parts and return the
// pointer to the second half
Node* findMiddle(Node* head, bool &odd)
{
    Node *prev = nullptr;
    Node *slow = head, *fast = head;

    // find the middle pointer
    while (fast && fast->next)
    {
        prev = slow;
        slow = slow->next;
        fast = fast->next->next;
    }

    // for odd nodes, `fast` still points to the last node
    if (fast) {
        odd = true;
    }

    // make next of previous node null
    prev->next = nullptr;

    // return middle node
    return slow;
}

// Function to check if the linked list is a palindrome or not
bool checkPalindrome(Node* head)
{
    // base case
    if (head == nullptr || head->next == nullptr) {
        return true;
    }

    // flag to indicate if the total number of nodes in the linked list is
    // odd or not. It will be passed by reference to `findMiddle()`
    bool odd = false;

    // find the second half of the linked list
    Node* mid = findMiddle(head, odd);

    // if the total number of nodes is odd, advance mid
    if (odd) {
        mid = mid->next;
    }

    // reverse the second half
    reverse(mid);

    // compare the first and second half
    return compare(head, mid);
}

int main()
{
    // input keys
    vector<int> keys = { 1, 2, 3, 2, 1};

    Node* head = nullptr;
    for (int i = keys.size() - 1; i >= 0; i--) {
        push(head, keys[i]);
    }

    if (checkPalindrome(head)) {
        cout << "The linked list is a palindrome";
    }
    else {
        cout << "The linked list is not a palindrome";
    }

    return 0;
}
```

**Output:** The linked list is a palindrome

##

```java
import java.util.concurrent.atomic.AtomicBoolean;

// A Linked List Node
class Node
{
    int data;
    Node next;
}

class Main
{
    // Helper function to insert a new node at the beginning of the linked list
    public static Node push(Node head, int data)
    {
        Node node = new Node();
        node.data = data;
        node.next = head;

        return node;
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
        head = result;
        return head;
    }

    // Recursive function to check if two linked lists are equal or not
    public static boolean compare(Node a, Node b)
    {
        // see if both lists are empty
        if (a == null && b == null) {
            return true;
        }

        return a != null && b != null &&
            (a.data == b.data) &&
            compare(a.next, b.next);
    }

    // Function to split the linked list into two equal parts and return the
    // pointer to the second half
    public static Node findMiddle(Node head, AtomicBoolean odd)
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

        // for odd nodes, `fast` still points to the last node
        if (fast != null) {
            odd.set(true);
        }

        // make next of previous node null
        prev.next = null;

        // return middle node
        return slow;
    }

    // Function to check if the linked list is a palindrome or not
    public static boolean checkPalindrome(Node head)
    {
        // base case
        if (head == null || head.next == null) {
            return true;
        }

        // maintain a flag to indicate if the total number of nodes in the
        // linked list is odd or not. It will be passed by reference to
        //`findMiddle()` using the `AtomicBoolean` class.
        AtomicBoolean odd = new AtomicBoolean(false);

        // find the second half of the linked list
        Node mid = findMiddle(head, odd);

        // if the total number of nodes is odd, advance mid
        if (odd.get()) {
            mid = mid.next;
        }

        // reverse the second half
        mid = reverse(mid);

        // compare the first and second half
        return compare(head, mid);
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 2, 1 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = push(head, keys[i]);
        }

        if (checkPalindrome(head)) {
            System.out.println("The linked list is a palindrome");
        }
        else {
            System.out.println("The linked list is not a palindrome");
        }
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

# Iterative function to reverse nodes of a linked list
def reverse(head):

    result = None
    current = head

    # Iterate through the list and move/insert each node
    # in front of the result list (like a push of the node)
    while current:

        # tricky: note the next node
        nextNode = current.next

        # move the current node onto the result
        current.next = result
        result = current

        # process next node
        current = nextNode

    # fix head pointer
    head = result
    return head

# Recursive function to check if two linked lists are equal or not
def compare(a, b):

    # see if both lists are empty
    if a is None and b is None:
        return True

    return a and b and (a.data == b.data) and compare(a.next, b.next)

# Function to split the linked list into two equal parts and return the
# pointer to the second half
def findMiddle(head, odd):

    prev = None
    slow = head
    fast = head

    # find the middle pointer
    while fast and fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next

    # for odd nodes, `fast` still points to the last node
    if fast:
        odd = True

    # make next of previous node None
    prev.next = None

    # return middle node
    return slow, odd

# Function to check if the linked list is a palindrome or not
def checkPalindrome(head):

    # base case
    if head is None or head.next is None:
        return True

    # flag to indicate if the total number of nodes in the linked list is
    # odd or not.
    odd = False

    # find the second half of the linked list
    mid, odd = findMiddle(head, odd)

    # if the total number of nodes is odd, advance mid
    if odd:
        mid = mid.next

    # reverse the second half
    mid = reverse(mid)

    # compare the first and second half
    return compare(head, mid)

if __name__ == '__main__':

    # input keys
    keys = [1, 2, 3, 2, 1]

    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    if checkPalindrome(head):
        print('The linked list is a palindrome')
    else:
        print('The linked list is not a palindrome')
```
