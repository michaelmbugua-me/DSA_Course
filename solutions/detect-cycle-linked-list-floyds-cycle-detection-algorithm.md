# Detect cycle in a linked list (Floyd’s Cycle Detection Algorithm)

> Source: https://www.techiedelight.com/detect-cycle-linked-list-floyds-cycle-detection-algorithm/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

This post will detect cycles in a linked list using hashing and Floyd’s cycle detection algorithm.

For example, the following linked list has a cycle in it:

> 

## 1\. Using Hashing

A simple solution is to use [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the given list and insert each encountered node into a set. If the current node already presents in the set (i.e., it is seen before), that means a cycle is present in the list.

Following is the C++, Java, and Python program that demonstrates it:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(Node* &headRef, int data)
{
    // create a new linked list node from the heap
    Node* newNode = new Node;

    newNode->data = data;
    newNode->next = headRef;
    headRef = newNode;
}

// Function to detect a cycle in a linked list using hashing
bool detectCycle(Node* head)
{
    Node* curr = head;
    unordered_set<Node*> set;

    // traverse the list
    while (curr)
    {
        // return false if we already have seen this node before
        if (set.find(curr) != set.end()) {
            return true;
        }

        // insert the current node into the set
        set.insert(curr);

        // move to the next node
        curr = curr->next;
    }

    // we reach here if the list does not contain any cycle
    return false;
}

int main()
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys) / sizeof(keys[0]);

    Node* head = nullptr;
    for (int i = n - 1; i >= 0; i--) {
        push(head, keys[i]);
    }

    // insert cycle
    head->next->next->next->next->next = head->next->next;

    if (detectCycle(head)) {
        cout << "Cycle Found";
    }
    else {
        cout << "No Cycle Found";
    }

    return 0;
}
```

**Output:** Cycle Found

##

```java
import java.util.HashSet;
import java.util.Set;

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
    // Function to detect a cycle in a linked list using hashing
    public static boolean detectCycle(Node head)
    {
        Node curr = head;
        Set<Node> set = new HashSet<>();

        // traverse the list
        while (curr != null)
        {
            // return false if we already have seen this node before
            if (set.contains(curr)) {
                return true;
            }

            // insert the current node into the set
            set.add(curr);

            // move to the next node
            curr = curr.next;
        }

        // we reach here if the list does not contain any cycle
        return false;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {1, 2, 3, 4, 5};

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        // insert cycle
        head.next.next.next.next.next = head.next.next;

        if (detectCycle(head)) {
            System.out.println("Cycle Found");
        }
        else {
            System.out.println("No Cycle Found");
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

# Function to detect a cycle in a linked list using hashing
def detectCycle(head):

    curr = head
    s = set()

    # traverse the list
    while curr:

        # return false if we already have seen this node before
        if curr in s:
            return True

        # insert the current node into the set
        s.add(curr)

        # move to the next node
        curr = curr.next

    # we reach here if the list does not contain any cycle
    return False

if __name__ == '__main__':

    head = None
    for i in reversed(range(5)):
        head = Node(i + 1, head)

    # insert cycle
    head.next.next.next.next.next = head.next.next

    if detectCycle(head):
        print('Cycle Found')
    else:
        print('No Cycle Found')
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list. The auxiliary space required by the program is O(n).

## 2\. Floyd’s Cycle Detection Algorithm

Floyd’s cycle detection algorithm is a pointer algorithm that uses only two pointers, which move through the sequence at different speeds. The idea is to move the fast pointer twice as quickly as the slow pointer, and the distance between them increases by one at each step. If we both meet at some point, we have found a cycle in the list; otherwise, no cycle is present if the end of the list is reached. It is also called the “tortoise and the hare algorithm”.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_set>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(Node*& headRef, int data)
{
    // create a new linked list node from the heap
    Node* newNode = new Node;

    newNode->data = data;
    newNode->next = headRef;
    headRef = newNode;
}

// Function to detect a cycle in a linked list using
// Floyd’s cycle detection algorithm
bool detectCycle(Node* head)
{
    // take two pointers – `slow` and `fast`
    Node *slow = head, *fast = head;

    while (fast && fast->next)
    {
        // move slow by one pointer
        slow = slow->next;

        // move fast by two pointers
        fast = fast->next->next;

        // if they meet any node, the linked list contains a cycle
        if (slow == fast) {
            return true;
        }
    }

    // we reach here if the slow and fast pointer does not meet
    return false;
}

int main()
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys) / sizeof(keys[0]);

    Node* head = nullptr;
    for (int i = n - 1; i >= 0; i--) {
        push(head, keys[i]);
    }

    // insert cycle
    head->next->next->next->next->next = head->next->next;

    if (detectCycle(head)) {
        cout << "Cycle Found";
    }
    else {
        cout << "No Cycle Found";
    }

    return 0;
}
```

**Output:** Cycle Found

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
    // Function to detect a cycle in a linked list using
    // Floyd’s cycle detection algorithm
    public static boolean detectCycle(Node head)
    {
        // take two references – `slow` and `fast`
        Node slow = head, fast = head;

        while (fast != null && fast.next != null)
        {
            // move slow by one
            slow = slow.next;

            // move fast by two
            fast = fast.next.next;

            // if they meet any node, the linked list contains a cycle
            if (slow == fast) {
                return true;
            }
        }

        // we reach here if slow and fast do not meet
        return false;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5 };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        // insert cycle
        head.next.next.next.next.next = head.next.next;

        if (detectCycle(head)) {
            System.out.println("Cycle Found");
        }
        else {
            System.out.println("No Cycle Found");
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

# Function to detect a cycle in a linked list using
# Floyd’s cycle detection algorithm
def detectCycle(head):

    # take two references – `slow` and `fast`
    slow = fast = head

    while fast and fast.next:

        # move slow by one
        slow = slow.next

        # move fast by two
        fast = fast.next.next

        # if they meet any node, the linked list contains a cycle
        if slow == fast:
            return True

    # we reach here if slow and fast do not meet
    return False

if __name__ == '__main__':

    head = None
    for i in reversed(range(5)):
        head = Node(i + 1, head)

    # insert cycle
    head.next.next.next.next.next = head.next.next

    if detectCycle(head):
        print('Cycle Found')
    else:
        print('No Cycle Found')
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.
