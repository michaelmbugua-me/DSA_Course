# Determine whether a linked list is palindrome or not

> Source: https://www.techiedelight.com/determine-linked-list-palindrome-or-not/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a singly linked list of integers, determine whether the linked list is a palindrome.

For example,

**Input:** 1 —> 2 —> 3 —> 2 —> 1 —> null **Output:** Linked list is a palindrome **Input:** 1 —> 2 —> 3 —> 3 —> 1 —> null **Output:** Linked list is not a palindrome

> 

The idea is to traverse the linked list and push all encountered elements into a [stack](https://techiedelight.com/stack-implementation/). Then traverse the linked list again, and for each node, pop the top element from the stack and compare it with the node’s data. If a mismatch happens for any node, we can say that the linked list is not a palindrome.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <stack>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;

    Node(int i)
    {
        this->data = i;
        this->next = nullptr;
    }
};

// Function to determine whether a given linked list is a palindrome
bool isPalindrome(Node* head)
{
    // construct an empty stack
    stack<int> s;

    // push all elements of the linked list into the stack
    Node* node = head;
    while (node)
    {
        s.push(node->data);
        node = node->next;
    }

    // traverse the linked list again
    node = head;
    while (node)
    {
        // pop the top element from the stack
        int top = s.top();
        s.pop();

        // compare the popped element with the current node's data
        // return false if mismatch happens
        if (top != node->data) {
            return false;
        }

        // advance to the next node
        node = node->next;
    }

    // we reach here only when the linked list is a palindrome
    return true;
}

int main()
{
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(2);
    head->next->next->next->next = new Node(1);

    if (isPalindrome(head)) {
        cout << "Linked List is a palindrome.";
    }
    else {
        cout << "Linked List is not a palindrome.";
    }

    return 0;
}
```

**Output:** Linked List is a palindrome.

##

```java
import java.util.Stack;

// A Linked List Node
class Node
{
    int data;
    Node next;

    Node(int i)
    {
        this.data = i;
        this.next = null;
    }
}

class Main
{
    // Function to determine whether a given linked list is a palindrome
    public static boolean isPalindrome(Node head)
    {
        // construct an empty stack
        Stack<Integer> s = new Stack<>();

        // push all elements of the linked list into the stack
        Node node = head;
        while (node != null)
        {
            s.push(node.data);
            node = node.next;
        }

        // traverse the linked list again
        node = head;
        while (node != null)
        {
            // pop the top element from the stack
            int top = s.pop();

            // compare the popped element with the current node's data
            // return false if mismatch happens
            if (top != node.data) {
                return false;
            }

            // advance to the next node
            node = node.next;
        }

        // we reach here only when the linked list is a palindrome
        return true;
    }

    public static void main(String[] args)
    {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(2);
        head.next.next.next.next = new Node(1);

        if (isPalindrome(head)) {
            System.out.println("Linked List is a palindrome.");
        }
        else {
            System.out.println("Linked List is not a palindrome.");
        }
    }
}
```

##

```python3
from collections import deque

# A Linked List Node
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Function to determine whether a given linked list is a palindrome
def isPalindrome(head):

    # construct an empty stack
    s = deque()

    # push all elements of the linked list into the stack
    node = head
    while node:
        s.append(node.data)
        node = node.next

    # traverse the linked list again
    node = head
    while node:

        # pop the top element from the stack
        top = s.pop()

        # compare the popped element with the current node's data
        # return false if mismatch happens
        if top != node.data:
            return False

        # advance to the next node
        node = node.next

    # we reach here only when the linked list is a palindrome
    return True

if __name__ == '__main__':

    head = Node(1)
    head.next = Node(2)
    head.next.next = Node(3)
    head.next.next.next = Node(2)
    head.next.next.next.next = Node(1)

    if isPalindrome(head):
        print('Linked List is a palindrome.')
    else:
        print('Linked List is not a palindrome.')
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list. The auxiliary space required by the solution is O(n) for the stack container.

We can determine whether a linked list is a palindrome in linear time and with constant space. The idea is to [split the given list into two halves](https://techiedelight.com/split-nodes-given-linked-list-front-back-halves/) and [reverse the second half](https://techiedelight.com/reverse-linked-list-part-1-iterative-solution/). Then traverse both lists simultaneously and compare their data. If a mismatch happens for any node, we can say that the linked list is not a palindrome.

The implementation can be seen below in C++, Java, and Python. Since the solution modifies the given list, we need to restore the original linked list. We can do this by simply linking the first half with the second half.

```cpp
#include <iostream>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node* next;

    // Constructor
    Node(int i)
    {
        this->data = i;
        this->next = nullptr;
    }
};

// Function to split nodes of a given linked list into two halves using the
// fast/slow pointer strategy. It returns a pointer to the tail of the first half
Node* frontBackSplit(Node* head, Node* &a, Node* &b)
{
    Node* slow = head;
    Node* fast = head->next;

    // advance `fast` by two nodes, and advance `slow` by a single node
    while (fast)
    {
        fast = fast->next;
        if (fast)
        {
            slow = slow->next;
            fast = fast->next;
        }
    }

    // `slow` is before the midpoint in the list, so split it in two
    // at that point.
    a = head;
    b = slow->next;
    slow->next = nullptr;

    return slow;
}

// Reverses a given linked list by changing its `.next` pointers and
// its head pointer. Takes a pointer (reference) to the head pointer.
void reverse(Node* &head)
{
    Node* prev = nullptr;        // the previous pointer
    Node* current = head;        // the main pointer

    // traverse the list
    while (current)
    {
        // tricky: note the next node
        Node* next = current->next;

        current->next = prev;    // fix the current node

        // advance the two pointers
        prev = current;
        current = next;
    }

    // fix the head pointer to point to the new front
    head = prev;
}

// Function to determine whether a given linked list is a palindrome
bool isPalindrome(Node* head)
{
    // if the length is less than 2, handle separately
    if (head == nullptr || head->next == nullptr) {
        return true;
    }

    Node *a, *b, *aTail, *bHead;

    // split the linked list into two halves (if the total number of nodes is odd,
    // the extra node will go in the first list)
    aTail = frontBackSplit(head, a, b);

    // reverse second half
    reverse(b);
    bHead = b;

    // traverse both lists simultaneously and compare their data
    while (a && b)
    {
        // return false at first data mismatch
        if (a->data != b->data) {
            return false;
        }

        // advance both lists to the next nodes
        a = a->next;
        b = b->next;
    }

    // restore the second half
    reverse(bHead);

    // restore the original linked list before returning by
    // linking the first half with the second half
    aTail->next = bHead;

    // we reach here only when the linked list is a palindrome
    return true;
}

int main()
{
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(2);
    head->next->next->next->next = new Node(1);

    if (isPalindrome(head)) {
        cout << "Linked List is a palindrome.";
    }
    else {
        cout << "Linked List is not a palindrome.";
    }

    return 0;
}
```

**Output:** Linked List is a palindrome.

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    // Constructor
    Node(int i)
    {
        this.data = i;
        this.next = null;
    }
}

class Main
{
    // Function to split nodes of a given linked list into two halves using the
    // fast/slow pointer strategy. It returns a pointer to the tail of the first half
    public static Node frontBackSplit(Node head)
    {
        Node slow = head;
        Node fast = head.next;

        // advance `fast` by two nodes, and advance `slow` by a single node
        while (fast != null)
        {
            fast = fast.next;
            if (fast != null)
            {
                slow = slow.next;
                fast = fast.next;
            }
        }

        return slow;
    }

    // Reverses a given linked list by changing its `.next` pointers and
    // its head pointer
    public static Node reverse(Node head)
    {
        Node prev = null;           // the previous pointer
        Node current = head;        // the main pointer

        // traverse the list
        while (current != null)
        {
            // tricky: note the next node
            Node next = current.next;

            current.next = prev;    // fix the current node

            // advance the two pointers
            prev = current;
            current = next;
        }

        // fix the head pointer to point to the new front
        head = prev;
        return head;
    }

    // Function to determine whether a given linked list is a palindrome
    public static boolean isPalindrome(Node head)
    {
        // if the length is less than 2, handle separately
        if (head == null || head.next == null) {
            return true;
        }

        Node a = head, b, aTail, bHead;

        // split the linked list into two halves (if the total number of nodes
        // is odd, the extra node will go in the first list)
        aTail = frontBackSplit(head);

        // `aTail` is before the midpoint in the list, so split it in two
        // at that point.
        b = aTail.next;
        aTail.next = null;

        // reverse second half
        b = reverse(b);
        bHead = b;

        // traverse both lists simultaneously and compare their data
        while (a != null && b != null)
        {
            // return false at first data mismatch
            if (a.data != b.data) {
                return false;
            }

            // advance both lists to the next nodes
            a = a.next;
            b = b.next;
        }

        // restore the second half
        bHead = reverse(bHead);

        // restore the original linked list before returning by
        // linking the first half with the second half
        aTail.next = bHead;

        // we reach here only when the linked list is a palindrome
        return true;
    }

    public static void main(String[] args)
    {
        Node head = new Node(1);
        head.next = new Node(2);
        head.next.next = new Node(3);
        head.next.next.next = new Node(2);
        head.next.next.next.next = new Node(1);

        if (isPalindrome(head)) {
            System.out.println("Linked list is a palindrome.");
        }
        else {
            System.out.println("Linked list is not a palindrome.");
        }
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

# Function to split nodes of a given linked list into two halves using the
# fast/slow pointer strategy. It returns a pointer to the tail of the first half
def frontBackSplit(head):

    slow = head
    fast = head.next

    # advance `fast` by two nodes, and advance `slow` by a single node
    while fast:
        fast = fast.next
        if fast:
            slow = slow.next
            fast = fast.next

    return slow

# Reverses a given linked list by changing its `.next` pointers and
# its head pointer
def reverse(head):

    prev = None                 # the previous pointer
    current = head              # the main pointer

    # traverse the list
    while current:
        # tricky: note the next node
        next = current.next

        current.next = prev     # fix the current node

        # advance the two pointers
        prev = current
        current = next

    # fix the head pointer to point to the new front
    head = prev
    return head

# Function to determine whether a given linked list is a palindrome
def isPalindrome(head):

    # if the length is less than 2, handle separately
    if head is None or head.next is None:
        return True

    a = head

    # split the linked list into two halves (if the total number of nodes is odd,
    # the extra node will go in the first list)
    aTail = frontBackSplit(head)

    # `aTail` is before the midpoint of the list, so split it in two
    # at that point.
    b = aTail.next
    aTail.next = None

    # reverse second half
    b = reverse(b)
    bHead = b

    # traverse both lists simultaneously and compare their data
    while a and b:

        # return false at first data mismatch
        if a.data is not b.data:
            return False

        # advance both lists to the next nodes
        a = a.next
        b = b.next

    # restore the second half
    bHead = reverse(bHead)

    # restore the original linked list before returning by
    # linking the first half with the second half
    aTail.next = bHead

    # we reach here only when the linked list is a palindrome
    return True

if __name__ == '__main__':

    head = Node(1)
    head.next = Node(2)
    head.next.next = Node(3)
    head.next.next.next = Node(2)
    head.next.next.next.next = Node(1)

    if isPalindrome(head):
        print('Linked list is a palindrome')
    else:
        print('Linked list is not a palindrome')
```

We can avoid modification of the original list (even temporarily) with the power of [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). Following is the simple C++, Java, and Python recursive implementation that works by recursing till the end of the list and checking each node of the linked list for palindrome as the recursion unfolds:

```cpp
#include <iostream>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node *next;

    // Constructor
    Node(int i)
    {
        this->data = i;
        this->next = nullptr;
    }
};

// Function to determine whether a given linked list is a palindrome
bool isPalindrome(Node* curr, Node* &headRef)
{
    // base case: end of the list reached
    if (curr == nullptr) {
        return true;
    }

    // advance all the way till the end of the list and
    // return false in case of any conflict
    if (!isPalindrome(curr->next, headRef)) {
        return false;
    }

    // check vs. "mirror" when "coming back" from recursion
    if (curr->data != headRef->data) {
        return false;
    }

    // advance "mirror" by one step for every single step "taken back" in the recursion
    headRef = headRef->next;
    return true;
}

// Determine if a given linked list is a palindrome or not.
// The function takes a pointer to the head node of the list.
bool isPalindrome(Node* head) {
    return isPalindrome(head, head);
}

int main()
{
    Node* head = new Node(1);
    head->next = new Node(2);
    head->next->next = new Node(3);
    head->next->next->next = new Node(2);
    head->next->next->next->next = new Node(1);

    if (isPalindrome(head)) {
        cout << "Linked List is a palindrome.";
    }
    else {
        cout << "Linked List is not a palindrome.";
    }

    return 0;
}
```

**Output:** Linked list is a palindrome.
