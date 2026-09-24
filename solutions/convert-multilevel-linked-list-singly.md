# Convert a multilevel linked list to a singly linked list

> Source: https://www.techiedelight.com/convert-multilevel-linked-list-singly/

Given a multilevel linked list, convert it into a [singly linked list](https://techiedelight.com/introduction-linked-lists/) so that all nodes of the first level appear first, followed by all nodes of the second level, and so on.

The multilevel linked list is similar to the simple linked list, except that it has one extra field that points to that node’s child. The child may point to a separate list altogether, which may have children of its own.

For example, consider the following multilevel linked list:

We should convert it into list `1—>2—>3—>4—>5—>6—>7—>8—>9—>10—>11—>12—>null`.

The idea is to use the [queue data structure](https://techiedelight.com/queue-implementation-cpp/) to solve this problem. We start by traversing the list horizontally from the head node using the next pointer, and whenever a node with a child is found, insert the child node into a queue. If the end of the list is reached, dequeue the front node, set it as the next node of the last encountered node, and repeat the entire process till the queue becomes empty.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node *next, *child;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(Node* &headRef, int data)
{
    Node* newNode = new Node;

    newNode->data = data;
    newNode->next = headRef;
    newNode->child = nullptr;
    headRef = newNode;
}

// Helper function to create a linked list with elements of a given vector
Node* createHorizontalList(vector<int> const &input)
{
    Node* head = nullptr;
    for (int i = input.size() - 1; i >= 0; i--) {
        push(head, input[i]);
    }

    return head;
}

// Function to convert a multilevel linked list into a singly linked list
void convertList(Node* const head)
{
    Node* curr = head;
    queue<Node*> q;

    // process all nodes
    while (curr)
    {
        // last node is reached
        if (curr->next == nullptr)
        {
            // dequeue the front node and set it as the next node of the current node
            curr->next = q.front();
            q.pop();
        }

        // if the current node has a child
        if (curr->child) {
            q.push(curr->child);
        }

        // advance the current node
        curr = curr->next;
    }
}

// Helper function to print a given linked list
void printList(Node* const head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->data << " —> ";
        ptr = ptr->next;
    }

    cout << "nullptr" << endl;
}

int main()
{
    // create a multilevel linked list
    Node* head = createHorizontalList({1, 2, 3, 4, 5});
    head->child = createHorizontalList({6, 7});
    head->next->next->child = createHorizontalList({8, 9});
    head->child->next->child = createHorizontalList({10, 11});
    head->child->next->child->child = createHorizontalList({12});

    convertList(head);
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> NULL

##

```java
import java.util.ArrayDeque;
import java.util.Queue;

// A Linked List Node
class Node
{
    int data;
    Node next, child;

    Node(int data, Node next, Node child)
    {
        this.data = data;
        this.next = next;
        this.child = child;
    }
}

class Main
{
    // Function to convert a multilevel linked list into a singly linked list
    public static Node convertList(Node head)
    {
        Node curr = head;
        Queue<Node> q = new ArrayDeque<>();

        // process all nodes
        while (curr != null)
        {
            // last node is reached
            if (curr.next == null)
            {
                // dequeue the front node and set it as the next node
                // of the current node
                curr.next = q.poll();
            }

            // if the current node has a child
            if (curr.child != null) {
                q.add(curr.child);
            }

            // advance the current node
            curr = curr.next;
        }

        return head;
    }

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

    // Helper function to create a linked list with elements of a given list
    public static Node createHorizontalList(int[] input)
    {
        Node head = null;
        for (int i = input.length - 1; i >= 0; i--) {
            head = new Node(input[i], head, null);
        }
        return head;
    }

    public static void main(String[] args)
    {
        // create a multilevel linked list
        Node head = createHorizontalList(new int[] {1, 2, 3, 4, 5});
        head.child = createHorizontalList(new int[] {6, 7});
        head.next.next.child = createHorizontalList(new int[] {8, 9});
        head.child.next.child = createHorizontalList(new int[] {10, 11});
        head.child.next.child.child = createHorizontalList(new int[] {12});

        convertList(head);
        printList(head);
    }
}
```

##

```python3
from collections import deque

# A Linked List Node
class Node:
    def __init__(self, data, next, child):
        self.data = data
        self.next = next
        self.child = child

# Function to convert a multilevel linked list into a singly linked list
def convertList(head):

    curr = head
    q = deque()

    # process all nodes
    while curr:

        # last node is reached
        # dequeue the front node and set it as the next node of the current node
        if curr.next is None and len(q) > 0:
            curr.next = q.popleft()

        # if the current node has a child
        if curr.child:
            q.append(curr.child)

        # advance the current node
        curr = curr.next

    return head

# Helper function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, '—> ', end='')
        ptr = ptr.next
    print('None')

# Helper function to create a linked list with elements of a given input
def createHorizontalList(input):

    head = None
    for i in reversed(range(len(input))):
        head = Node(input[i], head, None)

    return head

if __name__ == '__main__':

    # create a multilevel linked list
    head = createHorizontalList([1, 2, 3, 4, 5])
    head.child = createHorizontalList([6, 7])
    head.next.next.child = createHorizontalList([8, 9])
    head.child.next.child = createHorizontalList([10, 11])
    head.child.next.child.child = createHorizontalList([12])

    convertList(head)
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the multilevel linked list, and doesn’t require any extra space.

The above solution requires O(n) extra space for the queue data structure. We can also solve this problem with constant space. The idea is to maintain a tail pointer that always points at the end of the current list. Like the previous approach, start by traversing the list horizontally using the next pointer. Whenever we encounter a child node, append it at the end of the list and update the tail to the last node of the child node. Repeat this process until the end of the list is reached.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <queue>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node *next, *child;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(Node* &headRef, int data)
{
    Node* newNode = new Node;

    newNode->data = data;
    newNode->next = headRef;
    newNode->child = nullptr;
    headRef = newNode;
}

// Helper function to create a linked list with elements of a given vector
Node* createHorizontalList(vector<int> const &input)
{
    Node* head = nullptr;
    for (int i = input.size() - 1; i >= 0; i--) {
        push(head, input[i]);
    }

    return head;
}

// Function to find the last node of a linked list
Node *findTail(Node* head)
{
    Node* tail = head;
    while (tail && tail->next) {
        tail = tail->next;
    }

    return tail;
}

// Function to convert a multilevel linked list into a singly linked list
void convertList(Node* const head)
{
    // find the tail node of the head node
    Node* tail = findTail(head);

    // start from the head node
    Node* curr = head;

    // process all nodes
    while (curr)
    {
        // if the current node has a child
        if (curr->child)
        {
            // set the child node as the next node of the tail node
            tail->next = curr->child;

            // update the tail to the last node of the child node
            tail = findTail(curr->child);
        }

        // advance current node
        curr = curr->next;
    }
}

// Helper function to print a given linked list
void printList(Node* const head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->data << " —> ";
        ptr = ptr->next;
    }

    cout << "nullptr" << endl;
}

int main()
{
    // create a multilevel linked list
    Node* head = createHorizontalList({1, 2, 3, 4, 5});
    head->child = createHorizontalList({6, 7});
    head->next->next->child = createHorizontalList({8, 9});
    head->child->next->child = createHorizontalList({10, 11});
    head->child->next->child->child = createHorizontalList({12});

    convertList(head);
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> 11 —> 12 —> nullptr

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next, child;

    Node(int data, Node next, Node child)
    {
        this.data = data;
        this.next = next;
        this.child = child;
    }
}

class Main
{
    // Function to find the last node of a linked list
    public static Node findTail(Node head)
    {
        Node tail = head;
        while (tail != null && tail.next != null) {
            tail = tail.next;
        }
        return tail;
    }

    // Function to convert a multilevel linked list into a singly linked list
    public static Node convertList(Node head)
    {
        // find the tail node of the head node
        Node tail = findTail(head);

        // start from the head node
        Node curr = head;

        // process all nodes
        while (curr != null)
        {
            // if the current node has a child
            if (curr.child != null)
            {
                // set the child node as the next node of the tail node
                tail.next = curr.child;

                // update the tail to the last node of the child node
                tail = findTail(curr.child);
            }

            // advance current node
            curr = curr.next;
        }

        return head;
    }

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

    // Helper function to create a linked list with elements of a given array
    public static Node createHorizontalList(int[] input)
    {
        Node head = null;
        for (int i = input.length - 1; i >= 0; i--) {
            head = new Node(input[i], head, null);
        }
        return head;
    }

    public static void main(String[] args)
    {
        // create a multilevel linked list
        Node head = createHorizontalList(new int[] {1, 2, 3, 4, 5});
        head.child = createHorizontalList(new int[] {6, 7});
        head.next.next.child = createHorizontalList(new int[] {8, 9});
        head.child.next.child = createHorizontalList(new int[] {10, 11});
        head.child.next.child.child = createHorizontalList(new int[] {12});

        convertList(head);
        printList(head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, data, next, child):
        self.data = data
        self.next = next
        self.child = child

# Function to find the last node of a linked list
def findTail(head):

    tail = head
    while tail and tail.next:
        tail = tail.next

    return tail

# Function to convert a multilevel linked list into a singly linked list
def convertList(head):

    # find the tail node of the head node
    tail = findTail(head)

    # start from the head node
    curr = head

    # process all nodes
    while curr:

        # if the current node has a child
        if curr.child:
            # set the child node as the next node of the tail node
            tail.next = curr.child

            # update the tail to the last node of the child node
            tail = findTail(curr.child)

        # advance current node
        curr = curr.next

    return head

# Function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next

    print('None')

# Function to create a linked list with elements of a given input
def createHorizontalList(input):

    head = None
    for i in reversed(input):
        head = Node(i, head, None)

    return head

if __name__ == '__main__':

    # create a multilevel linked list
    head = createHorizontalList([1, 2, 3, 4, 5])
    head.child = createHorizontalList([6, 7])
    head.next.next.child = createHorizontalList([8, 9])
    head.child.next.child = createHorizontalList([10, 11])
    head.child.next.child.child = createHorizontalList([12])

    convertList(head)
    printList(head)
```
