# Flatten a multilevel linked list

> Source: https://www.techiedelight.com/flatten-multilevel-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a list that can grow in both horizontal and vertical directions (`right` and `down`), flatten it into a singly linked list. The conversion should be in such a way that the `down` node should be processed before the `next` node for any node.

A multilevel list is similar to the standard linked list except it has an extra field, `down`, which points to a vertical list. The vertical list can have a horizontal list attached to it and vice versa.

For example, consider the following linked list:

The flattened list would be:

`1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> null`

We can use [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/) to flatten a multilevel list. The idea is to recursively flatten the given linked list by recursively flattening the `down` list first, followed by the `next` list. The flattened `down` list for a node is linked to the `next` pointer of that node, while the flattened `next` list for a node is linked to the `next` pointer of the last seen node.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// Data structure to represent a special linked list node with
// an additional `down` pointer
struct Node
{
    int data;
    Node* next;
    Node* down;

    Node(int data)
    {
        this->data = data;
        this->next = this->down = nullptr;
    }
};

// Utility function to print a list with `down` and `next` pointers
void printOriginalList(Node* head)
{
    if (head == nullptr) {
        return;
    }

    cout << ' ' << head->data << ' ';

    if (head->down)
    {
        cout << "[";
        printOriginalList(head->down);
        cout << "]";
    }

    printOriginalList(head->next);
}

// Utility function to print a linked list
void printFlatenedList(Node* head)
{
    while (head)
    {
        cout << head->data << " -> ";
        head = head->next;
    }

    cout << "null" << '\n';
}

// Recursive function to flatten a multilevel linked list
Node* flattenList(Node* head)
{
    // base case
    if (head == nullptr) {
        return nullptr;
    }

    // keep track of the next pointer
    Node* next = head->next;

    // process the down list first
    head->next = flattenList(head->down);

    // go to the last node
    Node* tail = head;
    while (tail->next) {
        tail = tail->next;
    }

    // process the next list after the down list
    tail->next = flattenList(next);

    // return head node
    return head;
}

int main()
{
    // create individual nodes and link them together later
    Node* one = new Node(1);
    Node* two = new Node(2);
    Node* three = new Node(3);
    Node* four = new Node(4);
    Node* five = new Node(5);
    Node* six = new Node(6);
    Node* seven = new Node(7);
    Node* eight = new Node(8);
    Node* nine = new Node(9);
    Node* ten = new Node(10);
    Node* eleven = new Node(11);
    Node* twelve = new Node(12);
    Node* thirteen = new Node(13);
    Node* fourteen = new Node(14);
    Node* fifteen = new Node(15);

    // set head node
    Node* head = one;

    // set next pointers
    one->next = four;
    four->next = fourteen;
    fourteen->next = fifteen;
    five->next = nine;
    nine->next = ten;
    seven->next = eight;
    eleven->next = thirteen;

    // set down pointers
    one->down = two;
    two->down = three;
    four->down = five;
    five->down = six;
    six->down = seven;
    ten->down = eleven;
    eleven->down = twelve;

    cout << "The original list is :" << '\n';
    printOriginalList(head);

    head = flattenList(head);
    cout << "\n\nThe flattened list is :" << '\n';
    printFlatenedList(head);

    return 0;
}
```

##

```java
// Data structure to represent a special linked list node with an
// additional `down` pointer
class Node
{
    int data;
    Node next;
    Node down;

    Node(int data) {
        this.data = data;
    }
}

class Main
{
    // Utility function to print a list with `down` and `next` pointers
    public static void printOriginalList(Node head)
    {
        if (head == null) {
            return;
        }

        System.out.print(" " + head.data + " ");

        if (head.down != null)
        {
            System.out.print("[");
            printOriginalList(head.down);
            System.out.print("]");
        }

        printOriginalList(head.next);
    }

    // Utility function to print a linked list
    public static void printFlattenedList(Node head)
    {
        while (head != null)
        {
            System.out.print(head.data + " -> ");
            head = head.next;
        }
        System.out.println("null");
    }

    // Recursive function to flatten a multilevel linked list
    public static Node flattenList(Node head)
    {
        // base case
        if (head == null) {
            return null;
        }

        // keep track of the next pointer
        Node next = head.next;

        // process the down list first
        head.next = flattenList(head.down);

        // go to the last node
        Node tail = head;
        while (tail.next != null) {
            tail = tail.next;
        }

        // process the next list after the down list
        tail.next = flattenList(next);

        // return head node
        return head;
    }

    public static void main(String[] args)
    {
        // create individual nodes and link them together later
        Node one = new Node(1);
        Node two = new Node(2);
        Node three = new Node(3);
        Node four = new Node(4);
        Node five = new Node(5);
        Node six = new Node(6);
        Node seven = new Node(7);
        Node eight = new Node(8);
        Node nine = new Node(9);
        Node ten = new Node(10);
        Node eleven = new Node(11);
        Node twelve = new Node(12);
        Node thirteen = new Node(13);
        Node fourteen = new Node(14);
        Node fifteen = new Node(15);

        // set head node
        Node head = one;

        // set next pointers
        one.next = four;
        four.next = fourteen;
        fourteen.next = fifteen;
        five.next = nine;
        nine.next = ten;
        seven.next = eight;
        eleven.next = thirteen;

        // set down pointers
        one.down = two;
        two.down = three;
        four.down = five;
        five.down = six;
        six.down = seven;
        ten.down = eleven;
        eleven.down = twelve;

        System.out.println("The original list is :");
        printOriginalList(head);

        head = flattenList(head);
        System.out.println("\n\nThe flattened list is :");
        printFlattenedList(head);
    }
}
```

##

```python3
# Data structure to represent a special linked list node with an
# additional `down` pointer
class Node(object):
    def __init__(self, data=None, down=None, next=None):
        self.data = data
        self.down = down
        self.next = next

# Utility function to print a list with `down` and `next` pointers
def printOriginalList(head):

    if head is None:
        return

    print(head.data, end=' ')

    if head.down:
        print('[', end=' ')
        printOriginalList(head.down)
        print(']', end=' ')

    printOriginalList(head.next)

# Utility function to print a linked list
def printFlattenedList(head):

    while head:
        print(head.data, end=' —> ')
        head = head.next
    print('null')

# Recursive function to flatten a multilevel linked list
def flattenList(head):

    # base case
    if head is None:
        return None

    # keep track of the next pointer
    next = head.next

    # process the down list first
    head.next = flattenList(head.down)

    # go to the last node
    tail = head
    while tail.next:
        tail = tail.next

    # process the next list after the down list
    tail.next = flattenList(next)

    # return head node
    return head

if __name__ == '__main__':

    # create individual nodes and link them together later
    one = Node(1)
    two = Node(2)
    three = Node(3)
    four = Node(4)
    five = Node(5)
    six = Node(6)
    seven = Node(7)
    eight = Node(8)
    nine = Node(9)
    ten = Node(10)
    eleven = Node(11)
    twelve = Node(12)
    thirteen = Node(13)
    fourteen = Node(14)
    fifteen = Node(15)

    # set head node
    head = one

    # set next pointers
    one.next = four
    four.next = fourteen
    fourteen.next = fifteen
    five.next = nine
    nine.next = ten
    seven.next = eight
    eleven.next = thirteen

    # set down pointers
    one.down = two
    two.down = three
    four.down = five
    five.down = six
    six.down = seven
    ten.down = eleven
    eleven.down = twelve

    print('The original list is:')
    printOriginalList(head)

    head = flattenList(head)
    print('\n\nThe flattened list is:')
    printFlattenedList(head)
```

**Output:** The original list is : 1 [ 2 [ 3 ]] 4 [ 5 [ 6 [ 7 8 ]] 9 10 [ 11 [ 12 ] 13 ]] 14 15 The flattened list is : 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> 9 -> 10 -> 11 -> 12 -> 13 -> 14 -> 15 -> null

The time complexity of the above solution is O(n) and requires O(n) space for the call stack. We can further optimize the code by maintaining a tail pointer as we move along. This approach is demonstrated [here](https://techiedelight.com/compiler/?run=AMbHsO).

Also See:

> [Flatten a Linked List](https://www.techiedelight.com/flatten-linked-list/ "Flatten a Linked List")

> [Convert a multilevel linked list to a singly linked list](https://www.techiedelight.com/convert-multilevel-linked-list-singly/ "Convert a multilevel linked list to a singly linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.81/5. Vote count: 170

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
