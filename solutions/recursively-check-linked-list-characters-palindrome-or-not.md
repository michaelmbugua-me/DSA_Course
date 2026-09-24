# Recursively check if the linked list of characters is palindrome or not

> Source: https://www.techiedelight.com/recursively-check-linked-list-characters-palindrome-or-not/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list of characters, recursively check if it is palindrome or not.

For example,

**Input:** A —> B —> C —> B —> A —> null **Output:** The linked list is a palindrome **Input:** A —> B —> C —> C —> B —> null **Output:** The linked list is not a palindrome

> 

The idea is to [recursively traverse](https://techiedelight.com/recursion-practice-problems-with-solutions/) until the end of the linked list and construct a string out of the nodes’ characters in visited order. Then as the recursion unfolds, build another string from the linked list nodes, but this time, the encountered order of processed nodes is the opposite, i.e., from the last node towards the head node. If both constructed strings are equal, we can say that the linked list is a palindrome.

The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
using namespace std;

// A Linked List Node
struct Node
{
    char data;
    Node* next;

    Node(char ch)
    {
        this->data = ch;
        this->next = nullptr;
    }
};

// Construct 's1' and 's2' out of the given linked list with consecutive
// list elements in the forward and backward direction
void construct(Node* &head, string &s1, string &s2)
{
    // base case
    if (head == nullptr) {
        return;
    }

    s1 += head->data;
    construct(head->next, s1, s2);
    s2 += head->data;
}

// Function to check if a given linked list of characters is a palindrome
bool isPalindrome(Node* head)
{
    // construct string 's1' and 's2' with consecutive elements of the linked list
    // starting from the beginning and the end
    string s1, s2;
    construct(head, s1, s2);

    // check if the linked list is a palindrome
    return s1 == s2;
}

int main()
{
    Node* head = new Node('A');
    head->next = new Node('B');
    head->next->next = new Node('C');
    head->next->next->next = new Node('B');
    head->next->next->next->next = new Node('A');

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
    char data;
    Node next;

    Node(char ch)
    {
        this.data = ch;
        this.next = null;
    }
}

class Main
{
    // Construct 's1' and 's2' out of the given linked list with consecutive
    // list elements in the forward and backward direction
    public static void construct(Node head, StringBuilder s1, StringBuilder s2)
    {
        // base case
        if (head == null) {
            return;
        }

        s1.append(head.data);
        construct(head.next, s1, s2);
        s2.append(head.data);
    }

    // Function to check if a given linked list of characters is a palindrome
    public static boolean isPalindrome(Node head)
    {
        // construct string 's1' and 's2' with consecutive elements of the linked list
        // starting from the beginning and the end

        StringBuilder s1 = new StringBuilder(), s2 = new StringBuilder();
        construct(head, s1, s2);

        // check if the linked list is a palindrome
        return s1.toString().equals(s2.toString());
    }

    public static void main(String[] args)
    {
        Node head = new Node('A');
        head.next = new Node('B');
        head.next.next = new Node('C');
        head.next.next.next = new Node('B');
        head.next.next.next.next = new Node('A');

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
# A Linked List Node
class Node:
    def __init__(self, ch):
        self.data = ch
        self.next = None

# Construct 's1' and 's2' out of the given linked list with consecutive
# list elements in the forward and backward direction
def construct(head, s1='', s2=''):

    # base case
    if head is None:
        return s1, s2

    s1 += head.data
    s1, s2 = construct(head.next, s1, s2)
    s2 += head.data

    return s1, s2

# Function to check if a given linked list of characters is a palindrome
def isPalindrome(head):

    # construct string 's1' and 's2' with consecutive elements of the linked list
    # starting from the beginning and the end

    (s1, s2) = construct(head)

    # check if the linked list is a palindrome
    return s1 == s2

if __name__ == '__main__':

    head = Node('A')
    head.next = Node('B')
    head.next.next = Node('C')
    head.next.next.next = Node('B')
    head.next.next.next.next = Node('A')

    if isPalindrome(head):
        print('Linked List is a palindrome.')
    else:
        print('Linked List is not a palindrome.')
```

We can even determine if a linked list is a palindrome or not without constructing a string out of characters. This can be done recursively by comparing the data at the first node with the last node, the data at the second node with the second last node, etc.

We can do this with the use of two head pointers as parameters to the recursive function. The idea is to recursively advance the second pointer until the end of the linked list is reached. When the recursion unfolds, compare the character pointed by the first pointer with that of the second pointer. If at any point the characters don’t match, the linked list cannot be a palindrome. To keep the left pointer in sync with the right pointer, advance the left pointer to the next node after each recursive call.

Following is the C++, Java, and Python implementation of the idea:

```cpp
#include <iostream>
using namespace std;

// A Linked List Node
struct Node
{
    char data;
    Node* next;

    Node(char ch)
    {
        this->data = ch;
        this->next = nullptr;
    }
};

// Recursive function to check if a given linked list of characters is
// a palindrome. Note that the left pointer is passed by reference, and
// the right pointer is just a copy.
bool isPalindrome(Node*& left, Node* right)
{
    // Base case
    if (right == nullptr) {
        return true;
    }

    // Return false on the first mismatch
    if (!isPalindrome(left, right->next)) {
        return false;
    }

    // Copy the left pointer
    Node* prevLeft = left;

    // Advance the left pointer to the next node.
    // This change would reflect in the parent recursive calls.
    left = left->next;

    // For the linked list to be a palindrome, the character at the left
    // node should match with the character at the right node
    return (prevLeft->data == right->data);
}

int main()
{
    Node* head = new Node('A');
    head->next = new Node('B');
    head->next->next = new Node('C');
    head->next->next->next = new Node('B');
    head->next->next->next->next = new Node('A');

    if (isPalindrome(head, head)) {
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
    char data;
    Node next;

    Node(char ch)
    {
        this.data = ch;
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

    // Recursive function to check if a given linked list of characters is a palindrome
    public static boolean isPalindrome(NodeWrapper left, Node right)
    {
        // Base case
        if (right == null) {
            return true;
        }

        // Return false on the first mismatch
        if (!isPalindrome(left, right.next)) {
            return false;
        }

        // Copy the left child
        Node prev_left = left.node;

        // Advance the left child to the next node.
        // This change would reflect in the parent recursive calls.
        left.node = left.node.next;

        // For the linked list to be a palindrome, the character at the left
        // node should match with the character at the right node
        return (prev_left.data == right.data);
    }

    public static void main(String[] args)
    {
        Node head = new Node('A');
        head.next = new Node('B');
        head.next.next = new Node('C');
        head.next.next.next = new Node('B');
        head.next.next.next.next = new Node('A');

        // Wrap node, so its reference can be changed inside `isPalindrome()`
        NodeWrapper left = new NodeWrapper(head);

        if (isPalindrome(left, head)) {
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
# A Linked List Node
class Node:
    def __init__(self, data=None, next=None):
        self.data = data
        self.next = next

# Recursive function to check if a given linked list of characters is a palindrome
def isPalindrome(left, right):

    # Base case
    if right is None:
        return True, left

    # Return false on the first mismatch
    val, left = isPalindrome(left, right.next)
    if not val:
        return False, left

    # Copy the left child
    prev_left = left

    # Advance the left child to the next node.
    # This change would reflect in the parent recursive calls.
    left = left.next

    # For the linked list to be a palindrome, the character at the left
    # node should match with the character at the right node
    return prev_left.data == right.data, left

if __name__ == '__main__':

    head = Node('A')
    head.next = Node('B')
    head.next.next = Node('C')
    head.next.next.next = Node('B')
    head.next.next.next.next = Node('A')

    left = head
    if isPalindrome(left, head)[0]:
        print('Linked List is a palindrome.')
    else:
        print('Linked List is not a palindrome.')
```

The time complexity of both above-discussed methods is O(n), where `n` is the length of the linked list. The auxiliary space required by the program for the call stack is proportional to the lists’ length.
