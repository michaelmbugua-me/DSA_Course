# Reverse every alternate group of `k` nodes in a linked list

> Source: https://www.techiedelight.com/reverse-alternate-group-k-nodes-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, reverse every alternate group of `k` nodes where `k` is a given positive integer.

For example,

**Input List:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null For k = 2, **Output List:** 2 —> 1 —> 3 —> 4 —> 6 —> 5 —> 7 —> 8 —> 10 —> 9 —> null For k = 3, **Output List:** 3 —> 2 —> 1 —> 4 —> 5 —> 6 —> 9 —> 8 —> 7 —> 10 —> null For k = 1, **Output List:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> null For k >= 10, **Output List:** 10 —> 9 —> 8 —> 7 —> 6 —> 5 —> 4 —> 3 —> 2 —> 1 —> null

> 

## 1\. Iterative Solution

The idea is to traverse the linked list and consider every group of `2×k` nodes at a time. In a single iteration of the loop, [reverse the first `k` nodes](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/) and skip the next `k` nodes. Special care has to be taken while linking reversed groups with the rest of the list.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->next = nullptr;
    }
};

// Helper function to allocate the new node in a heap and
// insert it at the beginning of the linked list
void push(Node* &headRef, int data)
{
    Node* node = new Node(data);
    node->next = headRef;
    headRef = node;
}

// Helper function to print a given linked list
void printList(string msg, Node* head)
{
    cout << msg << ": ";
    while (head)
    {
        cout << head->data << " —> ";
        head = head->next;
    }

    cout << "nullptr" << endl;
}

// Function to reverse first `k` nodes in a linked list.
// Note that the linked list pointer is passed by reference.
// The function returns the new front node (or last node in the original sublist)
Node* reverse(Node*& curr, int k)
{
    // maintain a `prev` pointer
    Node* prev = nullptr;

    // traverse the list and reverse first `k` nodes
    while (curr && k--)
    {
        // tricky: note the next node
        Node* next = curr->next;

        // fix the `curr` node
        curr->next = prev;

        // advance the two pointers
        prev = curr;
        curr = next;
    }

    // return node at the front
    return prev;
}

// Function to skip `k` nodes in a given linked list.
// Note that the linked list pointer is passed by reference.
Node* skipKNodes(Node*& curr, int k)
{
    Node* prev = nullptr;

    while (curr && k--)
    {
        prev = curr;
        curr = curr->next;
    }

    return prev;
}

// Recursive function to reverse every alternate group of `k` nodes
// in a linked list
Node* reverseAlternatingKNodes(Node* head, int k)
{
    Node* prev = nullptr;
    Node* curr = head;

    // traverse the whole list
    while (curr)
    {
        // curr would be the last node in the reversed sublist
        Node* lastNode = curr;

        // reverse next `k` nodes and get their head
        Node* frontNode = reverse(curr, k);

        // update head pointer after first `reverse()` call
        if (!prev) {
            head = frontNode;
        }
        // for subsequent calls to `reverse()`, link the reversed sublist
        // with the rest of the list
        else {
            prev->next = frontNode;
        }

        // link the last node with the current node
        lastNode->next = curr;

        // skip next `k` nodes
        prev = skipKNodes(curr, k);
    }

    // return head node
    return head;
}

int main()
{
    // construct a singly linked list
    Node* head = nullptr;

    // construct a singly linked list
    int n = 10;
    while (n) {
        push(head, n--);
    }

    int k = 2;

    printList("Original linked list ", head);
    head = reverseAlternatingKNodes(head, k);
    printList("Resultant linked list", head);

    return 0;
}
```

**Output:** Original linked list: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> nullptr Resultant linked list: 2 —> 1 —> 3 —> 4 —> 6 —> 5 —> 7 —> 8 —> 10 —> 9 —> nullptr

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    // Constructor
    Node(int data)
    {
        this.data = data;
        this.next = null;
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
        head = node;
        return head;
    }

    // Helper function to print a given linked list
    public static void printList(String msg, Node head)
    {
        System.out.print(msg + ": ");
        while (head != null)
        {
            System.out.print(head.data + " —> ");
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to reverse first `k` nodes in a linked list.
    // Note that the linked list is passed by reference using `NodeWrapper` class.
    // The function returns the new front node (or last node in the original sublist)
    public static Node reverse(NodeWrapper curr, int k)
    {
        // maintain a `prev` pointer
        Node prev = null;

        // traverse the list and reverse first `k` nodes
        while (curr.node != null && k-- > 0)
        {
            // tricky: note the next node
            Node next = curr.node.next;

            // fix the `curr` node
            curr.node.next = prev;

            // advance the two pointers
            prev = curr.node;
            curr.node = next;
        }

        // return node at the front
        return prev;
    }

    // Function to skip `k` nodes in a given linked list. Note that the
    // linked list is passed by reference using `NodeWrapper` class.
    public static Node skipKNodes(NodeWrapper curr, int k)
    {
        Node prev = null;

        while (curr.node != null && k-- > 0)
        {
            prev = curr.node;
            curr.node = curr.node.next;
        }

        return prev;
    }

    // Recursive function to reverse every alternate group of `k` nodes
    // in a linked list
    public static Node reverseAlternatingKNodes(Node head, int k)
    {
        Node prev = null;

        // Wrap current node, so its reference can be changed inside the
        // `reverse()` and `skipKNodes()` method
        NodeWrapper curr = new NodeWrapper(head);

        // traverse the whole list
        while (curr.node != null)
        {
            // curr would be the last node in the reversed sublist
            Node lastNode = curr.node;

            // reverse next `k` nodes and get their head
            Node frontNode = reverse(curr, k);

            // update head pointer after first `reverse()` call
            if (prev == null) {
                head = frontNode;
            }
            // for subsequent calls to `reverse()`, link the reversed sublist
            // with the rest of the list
            else {
                prev.next = frontNode;
            }

            // link the last node with the current node
            lastNode.next = curr.node;

            // skip next `k` nodes
            prev = skipKNodes(curr, k);
        }

        // return head node
        return head;
    }

    public static void main(String[] args)
    {
        // construct a singly linked list
        Node head = null;

        // construct a singly linked list
        int n = 10;
        while (n > 0) {
            head = push(head, n--);
        }

        int k = 2;

        printList("Original linked list ", head);
        head = reverseAlternatingKNodes(head, k);
        printList("Resultant linked list", head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    # Constructor
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

# Helper function to print a given linked list
def printList(msg, head):

    print(msg + ': ', end='')
    while head:
        print(head.data, end=' —> ')
        head = head.next

    print('None')

# Function to reverse a first `k` nodes in a linked list.
# The function returns the new front node (or last node in the original sublist)
def reverse(curr, k):

    # maintain a `prev` pointer
    prev = None

    # traverse the list and reverse first `k` nodes
    while curr and k > 0:
        k = k - 1

        # tricky: note the next node
        next = curr.next

        # fix the `curr` node
        curr.next = prev

        # advance the two pointers
        prev = curr
        curr = next

    # return node at the front
    return prev, curr

# Function to skip `k` nodes in a given linked list.
def skipKNodes(curr, k):

    prev = None
    while curr and k > 0:
        k = k - 1
        prev = curr
        curr = curr.next

    return prev, curr

# Recursive function to reverse every alternate group of `k` nodes
# in a linked list
def reverseAlternatingKNodes(head, k):

    prev = None
    curr = head

    # traverse the whole list
    while curr:

        # curr would be the last node in the reversed sublist
        last = curr

        # reverse next `k` nodes and get their head
        front, curr = reverse(curr, k)

        # update head pointer after first `reverse()` call
        if prev is None:
            head = front

        # for subsequent calls to `reverse()`, link the reversed sublist
        # with the rest of the list
        else:
            prev.next = front

        # link the last node with the current node
        last.next = curr

        # skip next `k` nodes
        prev, curr = skipKNodes(curr, k)

    # return head node
    return head

if __name__ == '__main__':

    # construct a singly linked list
    head = None
    for i in reversed(range(10)):
        head = Node(i + 1, head)

    k = 2

    printList('Original linked list ', head)
    head = reverseAlternatingKNodes(head, k)
    printList('Resultant linked list', head)
```

The time complexity of the above iterative solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

## 2\. Recursive Solution

The recursive solution is similar to the iterative solution where we reverse the first `k` nodes and skip the next `k` nodes. But here, recursively call for the rest of the list.

The recursive implementation can be seen below in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;

    // Constructor
    Node(int data) {
        this->data = data;
    }
};

// Helper function to allocate the new node in a heap and
// insert it at the beginning of the linked list
void push(Node* &headRef, int data)
{
    Node* node = new Node(data);
    node->next = headRef;
    headRef = node;
}

// Helper function to print a given linked list
void printList(string msg, Node* head)
{
    cout << msg << ": ";
    while (head)
    {
        cout << head->data << " —> ";
        head = head->next;
    }

    cout << "nullptr" << endl;
}

// Function to reverse first `k` nodes in a linked list.
// Note that the linked list pointer is passed by reference.
// The function returns the new front node (or last node in the original sublist)
Node* reverse(Node* &curr, int k)
{
    // maintain a `prev` pointer
    Node* prev = nullptr;

    // traverse the list and reverse first `k` nodes
    while (curr && k--)
    {
        // tricky: note the next node
        Node* next = curr->next;

        // fix the `curr` node
        curr->next = prev;

        // advance the two pointers
        prev = curr;
        curr = next;
    }

    // return node at the front
    return prev;
}

// Function to skip `k` nodes in a given linked list.
// Note that the linked list pointer is passed by reference.
void skipKNodes(Node* &curr, int k)
{
    while (curr && k--) {
        curr = curr->next;
    }
}

// Recursive function to reverse every alternate group of `k` nodes
// in a linked list
Node* reverseAlternatingKNodes(Node* head, int k)
{
    // base case
    if (head == nullptr) {
        return nullptr;
    }

    Node* originalHead = head;

    // reverse first `k` nodes
    Node* curr = head;
    head = reverse(curr, k);

    // link original head node with the current node ((k+1)'th node)
    originalHead->next = curr;

    // skip next `k-1` nodes
    skipKNodes(curr, k - 1);

    // recur for the remaining list and link it to the current node
    if (curr) {
        curr->next = reverseAlternatingKNodes(curr->next, k);
    }

    // return head node
    return head;
}

int main()
{
    // construct a singly linked list
    Node* head = nullptr;

    int n = 10;
    while (n) {
        push(head, n--);
    }

    int k = 2;

    printList("Original linked list ", head);
    head = reverseAlternatingKNodes(head, k);
    printList("Resultant linked list", head);

    return 0;
}
```

**Output:** Original linked list: 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> nullptr Resultant linked list: 2 —> 1 —> 3 —> 4 —> 6 —> 5 —> 7 —> 8 —> 10 —> 9 —> nullptr

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    // Constructor
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

    // Helper function to allocate the new node in a heap and
    // insert it at the beginning of the linked list
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
        System.out.print(msg + ": ");
        while (head != null)
        {
            System.out.print(head.data + " —> ");
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to reverse first `k` nodes in a linked list.
    // Note that the linked list is passed by reference using `NodeWrapper` class.
    // The function returns the new front node (or last node in the original sublist)
    public static Node reverse(NodeWrapper curr, int k)
    {
        // maintain a `prev` pointer
        Node prev = null;

        // traverse the list and reverse first `k` nodes
        while (curr.node != null && k-- > 0)
        {
            // tricky: note the next node
            Node next = curr.node.next;

            // fix the `curr` node
            curr.node.next = prev;

            // advance the two pointers
            prev = curr.node;
            curr.node = next;
        }

        // return node at the front
        return prev;
    }

    // Function to skip `k` nodes in a given linked list.
    public static Node skipKNodes(Node curr, int k)
    {
        while (curr != null && k-- > 0) {
            curr = curr.next;
        }
        return curr;
    }

    // Recursive function to reverse every alternate group of `k` nodes
    // in a linked list
    public static Node reverseAlternatingKNodes(Node head, int k)
    {
        // base case
        if (head == null) {
            return null;
        }

        Node originalHead = head;

        // wrap current node, so its reference can be changed inside the
        // `reverse()` method
        NodeWrapper curr = new NodeWrapper(head);

        // reverse first `k` nodes
        head = reverse(curr, k);
        Node current = curr.node;

        // link original head node with the current node ((k+1)'th node)
        originalHead.next = current;

        // skip next `k-1` nodes
        current = skipKNodes(current, k - 1);

        // recur for the remaining list and link it to the current node
        if (current != null) {
            current.next = reverseAlternatingKNodes(current.next, k);
        }

        // return head node
        return head;
    }

    public static void main(String[] args)
    {
        // construct a singly linked list
        Node head = null;

        int n = 10;
        while (n > 0) {
            head = push(head, n--);
        }

        int k = 2;

        printList("Original linked list ", head);
        head = reverseAlternatingKNodes(head, k);
        printList("Resultant linked list", head);
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

    print(msg + ': ', end='')
    while head:
        print(head.data, end=' —> ')
        head = head.next

    print('None')

# Function to reverse a first `k` nodes in a linked list.
# The function returns the front node (or last node in the original sublist)
def reverse(curr, k):

    # maintain a `prev` pointer
    prev = None

    # traverse the list and reverse first `k` nodes
    while curr and k > 0:
        # tricky: note the next node
        next = curr.next

        # fix the `curr` node
        curr.next = prev

        # advance the two pointers
        prev = curr
        curr = next

        k = k - 1

    # return node at the front
    return prev, curr

# Function to skip `k` nodes in a given linked list.
def skipKNodes(curr, k):

    while curr and k > 0:
        curr = curr.next
        k = k - 1

    return curr

# Recursive function to reverse every alternate group of `k` nodes
# in a linked list
def reverseAlternatingKNodes(head, k):

    # base case
    if head is None:
        return None

    originalHead = head

    # reverse first `k` nodes
    head, curr = reverse(head, k)

    # link the original head node with the current node ((k+1)'th node)
    originalHead.next = curr

    # skip next `k-1` nodes
    curr = skipKNodes(curr, k - 1)

    # recur for the remaining list and link it to the current node
    if curr:
        curr.next = reverseAlternatingKNodes(curr.next, k)

    # return head node
    return head

if __name__ == '__main__':

    # construct a singly linked list
    head = None
    for i in reversed(range(10)):
        head = Node(i + 1, head)

    k = 2

    printList('Original linked list ', head)
    head = reverseAlternatingKNodes(head, k)
    printList('Resultant linked list', head)
```

The time complexity of the above recursive solution is O(n), where `n` is the length of the linked list. The auxiliary space required by the program for the call stack is proportional to the lists’ length.

**Related Post:**

> [Reverse every group of `k` nodes in a linked list](https://techiedelight.com/reverse-every-k-nodes-of-a-linked-list/)
