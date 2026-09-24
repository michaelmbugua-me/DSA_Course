# Remove duplicates from a linked list in a single traversal

> Source: https://www.techiedelight.com/remove-duplicates-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given an unsorted linked list, delete duplicate nodes from it by traversing the list only once.

For example,

**Input:** 5 —> 3 —> 4 —> 2 —> 5 —> 4 —> 1 —> 3 —> null **Output:** 5 —> 3 —> 4 —> 2 —> 1 —> null

> 

A simple solution would be to consider every distinct pair of nodes in the list and check if they have the same data or not. If their data matches, we delete the latter node. The time complexity of this solution is O(n2), where `n` is the total number of nodes in the linked list.

We can perform better by using [hashing](https://techiedelight.com/hashing-in-data-structure/). The idea is to traverse the given list and insert each encountered node into a set. If the current node already presents in the set (i.e., it is seen before), ignore it and move to the next element. In the end, all duplicated nodes is removed from the list.

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

// Helper function to print a given linked list
void printList(Node* head)
{
    Node* ptr = head;
    while (ptr)
    {
        cout << ptr->data << " —> ";
        ptr = ptr->next;
    }

    cout << "nullptr";
}

// Helper function to insert a new node at the beginning of the linked list
void push(Node** headRef, int data)
{
    Node* newNode = new Node();

    newNode->data = data;
    newNode->next = *headRef;
    *headRef = newNode;
}

// Function to remove duplicates from a sorted list
void removeDuplicates(Node* head)
{
    Node* previous = nullptr;
    Node* current = head;

    // take an empty set to store linked list nodes for future reference
    unordered_set<int> set;

    // do till the linked list is empty
    while (current != nullptr)
    {
        // if the current node is seen before, ignore it
        if (set.find(current->data) != set.end()) {
            previous->next = current->next;
        }
        else {
            // insert the current node into the set and proceed to the next node
            set.insert(current->data);
            previous = current;
        }
        current = previous->next;
    }
}

int main()
{
    // input keys
    int keys[] = {5, 3, 4, 2, 5, 4, 1, 3};
    int n = sizeof(keys)/sizeof(keys[0]);

    // points to the head node of the linked list
    Node* head = nullptr;

    // construct a linked list
    for (int i = n-1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    removeDuplicates(head);

    // print linked list
    printList(head);

    return 0;
}
```

**Output:** 5 —> 3 —> 4 —> 2 —> 1 —> nullptr

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

    // Function to remove duplicates from a sorted list
    public static Node removeDuplicates(Node head)
    {
        Node previous = null;
        Node current = head;

        // take an empty set to store linked list nodes for future reference
        Set<Integer> set = new HashSet<>();

        // do till the linked list is empty
        while (current != null)
        {
            // if the current node is seen before, ignore it
            if (set.contains(current.data)) {
                previous.next = current.next;
            }
            else {
                // insert the current node into the set and proceed to the next node
                set.add(current.data);
                previous = current;
            }
            current = previous.next;
        }

        return head;
    }

    public static void main(String[] args)
    {
        // input keys
        int[] keys = {5, 3, 4, 2, 5, 4, 1, 3};

        // points to the head node of the linked list
        Node head = null;

        // construct a linked list
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i], head);
        }

        removeDuplicates(head);

        // print linked list
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

# Function to remove duplicates from a sorted list
def removeDuplicates(head):

    previous = None
    current = head

    # take an empty set to store linked list nodes for future reference
    s = set()

    # do till the linked list is empty
    while current:

        # if the current node is seen before, ignore it
        if current.data in s:
            previous.next = current.next

        # insert the current node into the set and proceed to the next node
        else:
            s.add(current.data)
            previous = current

        current = previous.next

    return head

if __name__ == '__main__':

    # input keys
    keys = [5, 3, 4, 2, 5, 4, 1, 3]

    # construct a linked list
    head = None
    for i in reversed(range(len(keys))):
        head = Node(keys[i], head)

    removeDuplicates(head)

    # print linked list
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list. The auxiliary space required by the program is O(n).

Also See:

> [Remove duplicates from a sorted linked list](https://www.techiedelight.com/remove-duplicates-sorted-linked-list/ "Remove duplicates from a sorted linked list")

> [Sort linked list containing 0’s, 1’s, and 2’s in a single traversal](https://www.techiedelight.com/sort-linked-list-containing-0s-1s-2s/ "Sort linked list containing 0’s, 1’s, and 2’s in a single traversal")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.83/5. Vote count: 153

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Easy](https://www.techiedelight.com/Tags/easy/), [Hashing](https://www.techiedelight.com/Tags/Hashing/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
