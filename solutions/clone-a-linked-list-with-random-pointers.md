# Clone a linked list with random pointer

> Source: https://www.techiedelight.com/clone-a-linked-list-with-random-pointers/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write an efficient code to clone a linked list with each node containing an additional random pointer. The random pointer can point to any random node of the linked list or null.

> 

## 1\. Linear time solution using extra space

To clone a linked list with random pointers, maintain a [hash table](https://techiedelight.com/hashing-in-data-structure/) for storing the mappings from a linked list node to its clone. We create a new node with the same data for each node in the original linked list and recursively set its next pointers. We also create a mapping from the original node to the duplicate node in the hash table. Finally, traverse the original linked list again and update the duplicate nodes’ random pointers using the hash table.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// A linked list node with a random pointer
struct Node
{
    int data;
    Node* next;
    Node* random;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->next = nullptr;
        this->random = nullptr;
    }
};

// Recursive function to print a linked list
void traverse(Node* head)
{
    if (head == nullptr)
    {
        cout << "null" << endl;
        return;
    }

    // print current node data and random pointer data
    if (head->random) {
        cout << head->data << "(" << head->random->data << ") —> ";
    }
    else {
        cout << head->data << "(" << "X" << ") —> ";
    }

    // recur for the next node
    traverse(head->next);
}

// Recursive function to copy random pointers from the original linked list
// into the cloned linked list using the map
void updateRandomPointers(Node* head, unordered_map<Node*, Node*> &map)
{
    // base case
    if (map[head] == nullptr) {
        return;
    }

    // update the random pointer of the cloned node
    map[head]->random = map[head->random];

    // recur for the next node
    updateRandomPointers(head->next, map);
}

// Recursive function to clone the data and next pointer for each node
// of the linked list into a given map
Node* cloneLinkedList(Node* head, unordered_map<Node*, Node*> &map)
{
    // base case
    if (head == nullptr) {
        return nullptr;
    }

    // clone all fields of the head node except the random pointer

    // create a new node with the same data as the head node
    map[head] = new Node(head->data);

    // clone the next node
    map[head]->next = cloneLinkedList(head->next, map);

    // return cloned head node
    return map[head];
}

// Function to clone a linked list having random pointers
Node* cloneLinkedList(Node* head)
{
    // Create a map to store mappings from a node to its clone
    unordered_map<Node*, Node*> map;

    // clone data and next pointer for each node of the original
    // linked list and put references into the map
    cloneLinkedList(head, map);

    // update random pointers from the original linked list in the map
    updateRandomPointers(head, map);

    // return the cloned head node
    return map[head];
}

int main()
{
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(4);
    head->next->next->next->next = new Node(5);

    head->random = head->next->next->next;
    head->next->next->random = head->next;

    cout << "Original Linked List:\n";
    traverse(head);

    Node* clone = cloneLinkedList(head);

    cout << "\nCloned Linked List:\n";
    traverse(clone);

    return 0;
}
```

##

```java
import java.util.HashMap;
import java.util.Map;

// A linked list node with a random pointer
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
    // Recursive function to print a linked list
    public static void traverse(Node head)
    {
        if (head == null)
        {
            System.out.println("null");
            return;
        }

        // print current node data and random pointer data
        if (head.random != null) {
            System.out.print(head.data + "(" + head.random.data + ") —> ");
        }
        else {
            System.out.print(head.data + "(" + "X" + ") —> ");
        }

        // recur for the next node
        traverse(head.next);
    }

    // Recursive function to copy random pointers from the original linked list
    // into the cloned linked list using the map
    public static void updateRandomPointers(Node head, Map<Node, Node> map)
    {
        // base case
        if (map.get(head) == null) {
            return;
        }

        // update the random pointer of the cloned node
        map.get(head).random = map.get(head.random);

        // recur for the next node
        updateRandomPointers(head.next, map);
    }

    // Recursive function to clone the data and next pointer for each node
    // of the linked list into a given map
    public static Node cloneLinkedList(Node head, Map<Node, Node> map)
    {
        // base case
        if (head == null) {
            return null;
        }

        // clone all fields of the head node except the random pointer

        // create a new node with the same data as the head node
        map.put(head, new Node(head.data));

        // clone the next node
        map.get(head).next = cloneLinkedList(head.next, map);

        // return cloned head node
        return map.get(head);
    }

    // Function to clone a linked list having random pointers
    public static Node cloneLinkedList(Node head)
    {
        // create a map to store mappings from a node to its clone
        Map<Node, Node> map = new HashMap<>();

        // clone data and next pointer for each node of the original
        // linked list and put references into the map
        cloneLinkedList(head, map);

        // update random pointers from the original linked list in the map
        updateRandomPointers(head, map);

        // return the cloned head node
        return map.get(head);
    }

    public static void main(String[] args)
    {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);
        head.next.next.next.next = new Node(5);

        head.random = head.next.next.next;
        head.next.next.random = head.next;

        System.out.println("Original Linked List:");
        traverse(head);

        Node clone = cloneLinkedList(head);

        System.out.println("\nCloned Linked List:");
        traverse(clone);
    }
}
```

##

```python3
# A linked list node with a random pointer
class Node:
    # Constructor
    def __init__(self, data, next=None, random=None):
        self.data = data
        self.next = next
        self.random = random

# Recursive function to print a linked list
def traverse(head):

    if head is None:
        print('null')
        return

    # print current node data and random pointer data
    print(head.data, end='')
    print(f'({head.random.data})' if head.random else '(X)', end=' —> ')

    # recur for the next node
    traverse(head.next)

# Recursive function to copy random pointers from the original linked list
# into the cloned linked list using the dictionary
def updateRandomPointers(head, d):

    # base case
    if d.get(head) is None:
        return

    # update the random pointer of the cloned node
    d.get(head).random = d.get(head.random)

    # recur for the next node
    updateRandomPointers(head.next, d)

# Recursive function to clone the data and next pointer for each node
# of the linked list into a given dictionary
def cloneLinkedList(head, d):

    # base case
    if head is None:
        return None

    # clone all fields of the head node except the random pointer

    # create a new node with the same data as the head node
    d[head] = Node(head.data)

    # clone the next node
    d.get(head).next = cloneLinkedList(head.next, d)

    # return cloned head node
    return d.get(head)

# Function to clone a linked list having random pointers
def cloneList(head):

    # create a dictionary to store mappings from a node to its clone
    d = {}

    # clone data and next pointer for each node of the original
    # linked list and put references into the dictionary
    cloneLinkedList(head, d)

    # update random pointers from the original linked list in the dictionary
    updateRandomPointers(head, d)

    # return the cloned head node
    return d[head]

if __name__ == '__main__':

    head = Node(1)
    head.next = Node(2)
    head.next.next = Node(3)
    head.next.next.next = Node(4)
    head.next.next.next.next = Node(5)

    head.random = head.next.next.next
    head.next.next.random = head.next

    print('Original Linked List:')
    traverse(head)

    clone = cloneList(head)

    print('\nCloned Linked List:')
    traverse(clone)
```

**Output:** Original linked list: 1(4) —> 2(X) —> 3(2) —> 4(X) —> 5(X) —> null Cloned linked list: 1(4) —> 2(X) —> 3(2) —> 4(X) —> 5(X) —> null

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and requires O(n) extra space for the map and call stack.

## 2\. Linear time solution using constant space

A hash table is used in the previous approach, which accounts for the O(n) space complexity. We can improve the space complexity to constant if we find a space-efficient way to track the new nodes. We can do this by linking the new nodes with their original nodes in the linked list itself.

The idea is to create a duplicate of each linked list node and associate each duplicate node with the original node’s next child. Then iterate the modified list and update the random pointers of the new nodes. Finally, extract the duplicate nodes from the modified list, hence restoring the original linked list.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;

// A linked list node with a random pointer
struct Node
{
    int data;
    Node* next;
    Node* random;

    // Constructor
    Node(int data)
    {
        this->data = data;
        this->next = nullptr;
        this->random = nullptr;
    }

    Node() {}
};

// Recursive function to print a linked list
void traverse(Node* head)
{
    // traverse the linked list
    while (head != nullptr)
    {
        // print current node data and random pointer data
        if (head->random) {
            cout << head->data << "(" << head->random->data << ") —> ";
        }
        else {
            cout << head->data << "(" << "X" << ") —> ";
        }

        // advance to the next node
        head = head->next;
    }

    cout << "null" << endl;
}

// Function to clone a linked list having random pointers
Node* cloneLinkedList(Node* head)
{
    /* 1. Create a duplicate of each node of the original linked list */

    // traverse the original linked list
    Node* curr = head;
    while (curr != nullptr)
    {
        // take a pointer to the next node in the original list
        Node* next = curr->next;

        // duplicate each node of the linked list
        Node* dup = new Node(curr->data);

        // associate each duplicate node with the next child of the original node
        curr->next = dup;
        dup->next = next;

        // advance to the next node in the original list
        curr = next;
    }

    /* 2. Update the random pointers of the duplicated nodes */

    // traverse the modified list
    curr = head;
    while (curr != nullptr)
    {
        // if a random pointer for the original node exists, set it for the clone
        if (curr->random != nullptr) {
            (curr->next)->random = (curr->random)->next;
        }

        // advance to the next node in the original list
        curr = (curr->next)->next;
    }

    /* 3. Extract the duplicate nodes from the modified list */

    // construct a dummy node whose next pointer points to the head
    // of the cloned linked list
    Node dummy;

    // maintain a tail node for the clone
    Node* tail = &dummy;

    // traverse the modified list
    curr = head;
    while (curr != nullptr)
    {
        // take a pointer to the next node in the original list
        Node* next = curr->next->next;

        // extract the duplicate
        Node* dup = curr->next;
        tail->next = dup;
        tail = dup;

        // restore the original linked list
        curr->next = next;

        // advance to the next node in the original list
        curr = next;
    }

    // return head node of the cloned list
    return dummy.next;
}

int main()
{
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(4);
    head->next->next->next->next = new Node(5);

    head->random = head->next->next->next;
    head->next->next->random = head->next;

    cout << "Original linked list:\n";
    traverse(head);

    Node* clone = cloneLinkedList(head);

    cout << "\nCloned linked list:\n";
    traverse(clone);

    return 0;
}
```

##

```java
// A linked list node with a random pointer
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
    // Recursive function to print a linked list
    public static void traverse(Node head)
    {
        // traverse the linked list
        while (head != null)
        {
            // print current node data and random pointer data
            if (head.random != null) {
                System.out.print(head.data + "(" + head.random.data + ") —> ");
            }
            else {
                System.out.print(head.data + "(" + "X" + ") —> ");
            }

            // advance to the next node
            head = head.next;
        }

        System.out.println("null");
    }

    // Function to clone a linked list having random pointers
    public static Node cloneLinkedList(Node head)
    {
        /* 1. Create a duplicate of each node of the original linked list */

        // traverse the original linked list
        Node curr = head;
        while (curr != null)
        {
            // take a pointer to the next node in the original list
            Node next = curr.next;

            // duplicate each node of the linked list
            Node dup = new Node(curr.data);

            // associate each duplicate node with the next child of the original node
            curr.next = dup;
            dup.next = next;

            // advance to the next node in the original list
            curr = next;
        }

        /* 2. Update the random pointers of the duplicated nodes */

        // traverse the modified list
        curr = head;
        while (curr != null)
        {
            // if a random pointer for the original node exists, set it for the clone
            if (curr.random != null) {
                (curr.next).random = (curr.random).next;
            }

            // advance to the next node in the original list
            curr = (curr.next).next;
        }

        /* 3. Extract the duplicate nodes from the modified list */

        // construct a dummy node whose next pointer points to the head
        // of the cloned linked list
        Node dummy = new Node(-1);

        // maintain a tail node for the clone
        Node tail = dummy;

        // traverse the modified list
        curr = head;
        while (curr != null)
        {
            // take a pointer to the next node in the original list
            Node next = curr.next.next;

            // extract the duplicate
            Node dup = curr.next;
            tail.next = dup;
            tail = dup;

            // restore the original linked list
            curr.next = next;

            // advance to the next node in the original list
            curr = next;
        }

        // return head node of the cloned list
        return dummy.next;
    }

    public static void main(String[] args)
    {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(4);
        head.next.next.next.next = new Node(5);

        head.random = head.next.next.next;
        head.next.next.random = head.next;

        System.out.print("Original linked list:\n");
        traverse(head);

        Node clone = cloneLinkedList(head);

        System.out.print("\nCloned linked list:\n");
        traverse(clone);
    }
}
```

##

```python3
# A linked list node with a random pointer
class Node:
    # Constructor
    def __init__(self, data, next=None, random=None):
        self.data = data
        self.next = next
        self.random = random

# Recursive function to print a linked list
def traverse(head):

    # traverse the linked list
    while head:

        # print current node data and random pointer data
        if head.random:
            print(head.data, f'({head.random.data})', end=' —> ')
        else:
            print(head.data, '(X)', end=' —> ')

        # advance to the next node
        head = head.next

    print('null')

# Function to clone a linked list having random pointers
def cloneLinkedList(head):

    ## 1. Create a duplicate of each node of the original linked list

    # traverse the original linked list
    curr = head
    while curr:
        # take a pointer to the next node in the original list
        next = curr.next

        # duplicate each node of the linked list
        dup = Node(curr.data)

        # associate each duplicate node with the next child of the original node
        curr.next = dup
        dup.next = next

        # advance to the next node in the original list
        curr = next

    ## 2. Update the random pointers of the duplicated nodes

    # traverse the modified list
    curr = head
    while curr:

        # if a random pointer for the original node exists, set it for the clone
        if curr.random:
            curr.next.random = curr.random.next

        # advance to the next node in the original list
        curr = curr.next.next

    ## 3. Extract the duplicate nodes from the modified list

    # construct a dummy node whose next pointer points to the head
    # of the cloned linked list
    dummy = Node(-1)

    # maintain a tail node for the clone
    tail = dummy

    # traverse the modified list
    curr = head
    while curr:
        # take a pointer to the next node in the original list
        next = curr.next.next

        # extract the duplicate
        dup = curr.next
        tail.next = dup
        tail = dup

        # restore the original linked list
        curr.next = next

        # advance to the next node in the original list
        curr = next

    # return head node of the cloned list
    return dummy.next

if __name__ == '__main__':

    head = Node(1)
    head.next = Node(2)
    head.next.next = Node(3)
    head.next.next.next = Node(4)
    head.next.next.next.next = Node(5)

    head.random = head.next.next.next
    head.next.next.random = head.next

    print('Original linked list:')
    traverse(head)

    clone = cloneLinkedList(head)

    print('\nCloned linked list:')
    traverse(clone)
```

**Output:** Original linked list: 1(4) —> 2(X) —> 3(2) —> 4(X) —> 5(X) —> null Cloned linked list: 1(4) —> 2(X) —> 3(2) —> 4(X) —> 5(X) —> null
