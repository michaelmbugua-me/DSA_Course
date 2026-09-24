# Rearrange linked list in a specific manner

> Source: https://www.techiedelight.com/rearrange-the-linked-list-specific-manner/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list, split it into two lists where each list contains alternating elements from the original list and then finally join them back together.

For example,

**Input :** 1 —> 2 —> 3 —> 4 —> 5 —> null **Output:** 1 —> 3 —> 5 —> 2 —> 4 —> null

> 

To split the given list into two, we can use temporary dummy header nodes for both lists as they are being built. Each sublist has a “tail” pointer that points to its current last node – that way, new nodes can be appended at the end of each list easily. The dummy nodes give the tail pointers something to point to initially. The dummy nodes are efficient in this case because they are temporary and allocated in the stack. Finally, after both lists are formed, we join them by rearranging their pointers and fixing the head node.

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

// Helper function to print a given linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->data << " —> ";
        ptr = ptr->next;
    }

    cout << "null\n";
}

// Helper function to insert a new node at the beginning of the linked list
void push(Node** headRef, int data)
{
    Node* newNode = new Node();
    newNode->data = data;
    newNode->next = *headRef;

    *headRef = newNode;
}

// Function to rearrange the linked list in a specific manner
void rearrange(Node* head)
{
    // empty list or one node
    if (head == nullptr || head->next == nullptr) {
        return;
    }

    // create two dummy nodes
    Node dummyFirst, dummySecond;

    // tail pointer for the first and second list
    Node* first = &dummyFirst, *second = &dummySecond;

    Node* curr = head;

    // iterate through the list and process two nodes at a time
    while (curr != nullptr)
    {
        // move the current node to the first list
        first->next = curr;
        first = first->next;

        // move the next node to the second list
        if (curr->next != nullptr)
        {
            second->next = curr->next;
            second = second->next;
            curr = curr->next;
        }
        curr = curr->next;
    }

    // combine the first list with the second list
    first->next = dummySecond.next;
    second->next = nullptr;
}

int main()
{
    // input keys
    vector<int> keys = { 1, 2, 3, 4, 5 };

    Node* head = nullptr;
    for (int i = keys.size() - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    rearrange(head);
    printList(head);

    return 0;
}
```

**Output:** 1 —> 3 —> 5 —> 2 —> 4 —> null

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    public Node(int data, Node next)
    {
        this.data = data;
        this.next = next;
    }

    public Node() {}
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

    // Function to rearrange the linked list in a specific manner
    public static void rearrange(Node head)
    {
        // empty list or one node
        if (head == null || head.next == null) {
            return;
        }

        // create two dummy nodes
        Node dummyFirst = new Node();
        Node dummySecond = new Node();

        // tail pointer for the first and second list
        Node first = dummyFirst;
        Node second = dummySecond;

        Node curr = head;

        // iterate through the list and process two nodes at a time
        while (curr != null)
        {
            // move the current node to the first list
            first.next = curr;
            first = first.next;

            // move the next node to the second list
            if (curr.next != null)
            {
                second.next = curr.next;
                second = second.next;
                curr = curr.next;
            }
            curr = curr.next;
        }

        // combine the first list with the second list
        first.next = dummySecond.next;
        second.next = null;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = { 1, 2, 3, 4, 5 };

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

# Helper function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr.data, end=' —> ')
        ptr = ptr.next
    print('None')

# Function to rearrange the linked list in a specific manner
def rearrange(head):

    # empty list or one node
    if head is None or head.next is None:
        return

    # create two dummy nodes
    dummyFirst = Node()
    dummySecond = Node()

    # tail pointer for the first and second list
    first = dummyFirst
    second = dummySecond

    curr = head

    # iterate through the list and process two nodes at a time
    while curr:

        # move the current node to the first list
        first.next = curr
        first = first.next

        # move the next node to the second list
        if curr.next:
            second.next = curr.next
            second = second.next
            curr = curr.next

        curr = curr.next

    # combine the first list with the second list
    first.next = dummySecond.next
    second.next = None

if __name__ == '__main__':

    head = None
    for i in reversed(range(5)):
        head = Node(i + 1, head)

    rearrange(head)
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Rearrange a linked list by separating odd nodes from even ones](https://www.techiedelight.com/rearrange-linked-list-separating-odd-nodes-even/ "Rearrange a linked list by separating odd nodes from even ones")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Rearrange linked list in a specific manner in linear time](https://www.techiedelight.com/rearrange-linked-list-specific-manner-linear-time/ "Rearrange linked list in a specific manner in linear time")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.89/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
