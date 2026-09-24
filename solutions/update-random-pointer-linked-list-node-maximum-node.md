# Update random pointer for each linked list node to point to the maximum node

> Source: https://www.techiedelight.com/update-random-pointer-linked-list-node-maximum-node/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list with each node having an additional random pointer that points to any random node of the linked list or null, update the random pointer in each linked list node to point to a node with maximum value to its right.

> 

A naive solution would be to traverse the list, and for each encountered node, find the node with maximum value by traversing the remaining list again. The time complexity of this approach is O(n2), where `n` is the total number of nodes in the linked list.

If the given list was doubly linked, we could have easily updated the random pointers with maximum value node by traversing the list from the end. This would require only a single traversal of the linked list.

We can still solve this problem in linear time for a singly linked list. The idea is to [reverse the list first](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/), traverse the reversed list, and maintain a pointer that points to the node with the maximum value found so far. Then for each encountered node, update its random pointer to point to the maximum value node so far. Finally, restore the list’s original order (i.e., reverse it again).

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next, *random;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->next = this->random = nullptr;
    }
};

// Helper function to insert a new node at the beginning of the linked list
void push(Node* &head, int data)
{
    Node* newNode = new Node(data);
    newNode->next = head;
    head = newNode;
}

// Function to print a linked list with an extra random pointer
void printList(string msg, Node* head)
{
    cout << msg;
    while (head)
    {
        cout << head->data;

        if (head->random) {
            cout << "(" << head->random->data << ") —> ";
        }
        else {
            cout << "(X) —> ";
        }

        head = head->next;
    }

    cout << "X" << endl;
}

// Function to reverse a linked list by changing its `.next` pointers
// and its head pointer. It takes a reference to the head pointer.
void reverse(Node* &head)
{
    Node* prev = nullptr;       // the previous pointer
    Node* curr = head;          // the main pointer

    // traverse the list
    while (curr)
    {
        // tricky: note the next node
        Node* next = curr->next;

        curr->next = prev;      // fix the `curr` node

        // advance the two pointers
        prev = curr;
        curr = next;
    }

    // fix the head pointer to point to the new front
    head = prev;
}

// Function to update random pointer of each linked list node
// to point to a node with maximum value to their right
void setRandomNodes(Node* head)
{
    // Reverse the linked list
    reverse(head);

    // max points to the node with maximum value
    Node* max = head;
    head->random = nullptr;

    // start from the second node in the list
    Node* node = head->next;
    while (node)
    {
        // update random pointer of the current node to point to the
        // maximum value node so far
        node->random = max;

        // update max if the current node is greater
        if (max->data < node->data) {
            max = node;
        }

        // advance to the next node
        node = node->next;
    }

    // restore the linked list original order
    reverse(head);
}

int main()
{
    // input keys
    vector<int> keys = { 5, 10, 7, 9, 4, 3 };

    Node* head = nullptr;
    for (int i = keys.size() - 1; i >= 0; i--) {
        push(head, keys[i]);
    }

    printList("Original linked list: ", head);

    // assign random nodes
    setRandomNodes(head);

    printList("Final Linked List: ", head);

    return 0;
}
```

**Output:** Original linked list: 5(X) —> 10(X) —> 7(X) —> 9(X) —> 4(X) —> 3(X) —> X Final Linked List: 5(10) —> 10(9) —> 7(9) —> 9(4) —> 4(3) —> 3(X) —> X

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next, random;

    // Constructor
    Node(int data)
    {
        this.data = data;
        this.next = this.random = null;
    }
}

class Main
{
    // Helper function to insert a new node at the beginning of the linked list
    public static Node push(Node head, int data)
    {
        Node newNode = new Node(data);
        newNode.next = head;
        return newNode;
    }

    // Function to print a linked list with an extra random pointer
    public static void printList(String msg, Node head)
    {
        System.out.print(msg);
        while (head != null)
        {
            System.out.print(head.data);

            if (head.random != null) {
                System.out.print("(" + head.random.data + ") —> ");
            }
            else {
                System.out.print("(X) —> ");
            }
            head = head.next;
        }

        System.out.println("X");
    }

    // Function to reverse a linked list by changing its `.next` pointers
    // and its head pointer. It takes a reference to the head pointer.
    public static Node reverse(Node head)
    {
        Node prev = null;       // the previous pointer
        Node curr = head;       // the main pointer

        // traverse the list
        while (curr != null)
        {
            // tricky: note the next node
            Node next = curr.next;

            curr.next = prev;   // fix the `curr` node

            // advance the two pointers
            prev = curr;
            curr = next;
        }

        // fix the head pointer to point to the new front
        head = prev;
        return head;
    }

    // Function to update random pointer of each linked list node
    // to point to a node with maximum value to their right
    public static Node setRandomNodes(Node head)
    {
        // Reverse the linked list
        head = reverse(head);

        // max points to the node with maximum value
        Node max = head;
        head.random = null;

        // start from the second node in the list
        Node node = head.next;
        while (node != null)
        {
            // update random pointer of the current node to point to the
            // maximum node so far
            node.random = max;

            // update max if the current node is greater
            if (max.data < node.data) {
                max = node;
            }

            // advance to the next node
            node = node.next;
        }

        // restore the linked list original order
        head = reverse(head);
        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 5, 10, 7, 9, 4, 3 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = push(head, keys[i]);
        }

        printList("Original linked list: ", head);

        // assign random nodes
        setRandomNodes(head);

        printList("Final linked list: ", head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    # Constructor
    def __init__(self, data, next=None, random=None):
        self.data = data
        self.next = next
        self.random = random

# Function to print a linked list with a random pointer
def printList(msg, head):

    print(msg, end='')
    while head:
        print(head.data, end='')
        print(f'({head.random.data})' if head.random else '(X)', end=' —> ')
        head = head.next
    print('X')

# Function to reverse a linked list by changing its `.next` pointers
# and its head pointer.
def reverse(head):

    prev = None             # the previous pointer
    curr = head             # the main pointer

    # traverse the list
    while curr:
        # tricky: note the next node
        next = curr.next

        curr.next = prev    # fix the `curr` node

        # advance the two pointers
        prev = curr
        curr = next

    # fix the head pointer to point to the front
    head = prev
    return head

# Function to update random pointer of each linked list node
# to point to a node with maximum value to their right
def setRandomNodes(head):

    # Reverse the linked list
    head = reverse(head)

    # max points to the node with maximum value
    max = head
    head.random = None

    # start from the second node in the list
    node = head.next
    while node:

        # update random pointer of the current node to point to the
        # maximum node so far
        node.random = max

        # update max if the current node is greater
        if max.data < node.data:
            max = node

        # advance to the next node
        node = node.next

    # restore the linked list original order
    head = reverse(head)
    return head

if __name__ == '__main__':

    # input keys
    keys = [5, 10, 7, 9, 4, 3]

    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    printList('Original linked list: ', head)

    # assign random nodes
    setRandomNodes(head)

    printList('Final Linked List: ', head)
```

The time complexity of the above solution O(n2), and doesn’t require any extra space. But it requires three traversals of the linked list.

We can simplify the above code using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). The idea is to recursively call the next node of the linked list and update each node’s random pointer with the maximum value node found so far as the recursion unfolds. This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <string>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next, *random;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->next = this->random = nullptr;
    }
};

// Helper function to insert a new node at the beginning of the linked list
void push(Node* &head, int data)
{
    Node* newNode = new Node(data);
    newNode->next = head;
    head = newNode;
}

// Function to print a linked list with an extra random pointer
void printList(string msg, Node* head)
{
    cout << msg;
    while (head)
    {
        cout << head->data;

        if (head->random) {
            cout << "(" << head->random->data << ") —> ";
        }
        else {
            cout << "(X) —> ";
        }

        head = head->next;
    }

    cout << "X" << endl;
}

// Recursive function to update random pointer of each linked list node
// to point to a node with maximum value to their right
Node* setRandomNodes(Node* head)
{
    // base case 1: empty list
    if (head == nullptr) {
        return nullptr;
    }

    // base case 2: last node
    if (head->next == nullptr)
    {
        head->random = nullptr;
        return head;
    }

    // max points to the node with the maximum value found so far
    // to the right of the head node
    Node* max = setRandomNodes(head->next);

    // update random pointer of the current node to point to the
    // maximum node so far
    head->random = max;

    // update max if the current node is greater and returns it
    return (max->data > head->data) ? max: head;
}

int main()
{
    // input keys
    vector<int> keys = { 5, 10, 7, 9, 4, 3 };

    Node* head = nullptr;
    for (int i = keys.size() - 1; i >= 0; i--) {
        push(head, keys[i]);
    }

    printList("Original linked list: ", head);

    // assign random nodes
    setRandomNodes(head);

    printList("Final Linked List: ", head);

    return 0;
}
```

**Output:** Original linked list: 5(X) —> 10(X) —> 7(X) —> 9(X) —> 4(X) —> 3(X) —> X Final Linked List: 5(10) —> 10(9) —> 7(9) —> 9(4) —> 4(3) —> 3(X) —> X

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next, random;

    // Constructor
    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Helper function to insert a new node at the beginning of the linked list
    public static Node push(Node head, int data)
    {
        Node newNode = new Node(data);
        newNode.next = head;
        return newNode;
    }

    // Function to print a linked list with a random pointer
    public static void printList(String msg, Node head)
    {
        System.out.print(msg);
        while (head != null)
        {
            System.out.print(head.data);

            if (head.random != null) {
                System.out.print("(" + head.random.data + ") —> ");
            }
            else {
                System.out.print("(X) —> ");
            }
            head = head.next;
        }

        System.out.println("X");
    }

    // Recursive function to update random pointer of each linked list node
    // to point to a node with maximum value to their right
    public static Node setRandomNodes(Node head)
    {
        // base case 1: empty list
        if (head == null) {
            return null;
        }

        // base case 2: last node
        if (head.next == null)
        {
            head.random = null;
            return head;
        }

        // max points to the node with the maximum value found so far
        // to the right of the head node
        Node max = setRandomNodes(head.next);

        // update random pointer of the current node to point to the
        // maximum node so far
        head.random = max;

        // update max if the current node is greater and returns it
        return (max.data > head.data) ? max: head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 5, 10, 7, 9, 4, 3 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = push(head, keys[i]);
        }

        printList("Original linked list: ", head);

        // assign random nodes
        setRandomNodes(head);

        printList("Final linked list: ", head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data, next=None, random=None):
        self.data = data
        self.next = next
        self.random = random

# Function to print a linked list with a random pointer
def printList(msg, head):

    print(msg, end='')
    while head:
        print((head.data, head.random.data) if head.random else (head.data, 'X'),
            end=' —> ')
        head = head.next
    print('X')

# Recursive function to update random pointer of each linked list node
# to point to a node with maximum value to their right
def setRandomNodes(head):

    # base case 1: empty list
    if head is None:
        return None

    # base case 2: last node
    if head.next is None:
        head.random = None
        return head

    # max points to the node with the maximum value found so far
    # to the right of the head node
    max = setRandomNodes(head.next)

    # update random pointer of the current node to point to the
    # maximum node so far
    head.random = max

    # update max if the current node is greater and returns it
    return max if (max.data > head.data) else head

if __name__ == '__main__':

    # input keys
    keys = [5, 10, 7, 9, 4, 3]

    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    printList('Original List: ', head)

    # assign random nodes
    setRandomNodes(head)

    printList('Final List: ', head)
```
