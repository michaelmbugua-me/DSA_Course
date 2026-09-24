# Efficiently merge `k` sorted linked lists

> Source: https://www.techiedelight.com/efficiently-merge-k-sorted-linked-lists/

Given `k` sorted linked lists, merge them into a single list in increasing order.

In the previous post, we have discussed how to [merge two sorted linked lists](https://techiedelight.com/merge-given-sorted-linked-lists/) into one list. This post will merge `k` sorted linked lists into a single list efficiently.

For example,

**Input:** k = 3 List 1: 1 —> 5 —> 7 —> NULL List 2: 2 —> 3 —> 6 —> 9 —> NULL List 3: 4 —> 8 —> 10 —> NULL **Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> NULL

> 

## 1\. Naive Approach

A simple solution would be to connect all linked lists into one list (order doesn’t matter). Then use the [merge sort algorithm for the linked list](https://techiedelight.com/merge-sort-singly-linked-list/) to [sort the list](https://techiedelight.com/sort-vector-cpp/) in ascending order. The worst-case time complexity of this approach will be O(n.log(n)), where `n` is the total number of nodes present in all lists. Also, this approach does not take advantage of the fact that each list is already sorted.

## 2\. Using Min Heap

We can easily solve this problem in O(n.log(k)) time by using a [min-heap](https://techiedelight.com/introduction-priority-queues-using-binary-heaps/#Heap). The idea is to construct a min-heap of size `k` and insert each list’s first node into it. Then pop the root node (having minimum value) from the heap and insert the next node from the “same” list as the popped node. We repeat this process until the heap is exhausted.

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
    Node *next;

    Node(int data)
    {
        this->data = data;
        this->next = nullptr;
    }
};

// Comparison object to be used to order the min-heap
struct comp
{
    bool operator()(const Node *lhs, const Node *rhs) const {
        return lhs->data > rhs->data;
    }
};

// Utility function to print contents of a linked list
void printList(Node* node)
{
    while (node != nullptr)
    {
        cout << node->data << " —> ";
        node = node->next;
    }
    cout << "nullptr";
}

// The main function to merge given `k` sorted linked lists.
// It takes array `lists` of size `k` and generates the sorted output
Node *mergeKLists(vector<Node*> const &lists)
{
    // create an empty min-heap
    priority_queue<Node*, vector<Node*>, comp> pq;

    // push the first node of each list into the min-heap
    for (Node* list: lists) {
        pq.push(list);
    }

    // take two pointers, head and tail, where the head points to the first node
    // of the output list and tail points to its last node
    Node *head = nullptr, *last = nullptr;

    // run till min-heap is empty
    while (!pq.empty())
    {
        // extract the minimum node from the min-heap
        Node* min = pq.top();
        pq.pop();

        // add the minimum node to the output list
        if (head == nullptr) {
            head = last = min;
        }
        else {
            last->next = min;
            last = min;
        }

        // take the next node from the "same" list and insert it into the min-heap
        if (min->next != nullptr) {
            pq.push(min->next);
        }
    }

    // return head node of the merged list
    return head;
}

int main()
{
    int k = 3;    // total number of linked lists

    // an array to store the head nodes of the linked lists
    vector<Node*> lists(k);

    lists[0] = new Node(1);
    lists[0]->next = new Node(5);
    lists[0]->next->next = new Node(7);

    lists[1] = new Node(2);
    lists[1]->next = new Node(3);
    lists[1]->next->next = new Node(6);
    lists[1]->next->next->next = new Node(9);

    lists[2] = new Node(4);
    lists[2]->next = new Node(8);
    lists[2]->next->next = new Node(10);

    // Merge all lists into one
    Node* head = mergeKLists(lists);
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> nullptr

##

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;

// A Linked List Node
class Node
{
    int data;
    Node next;

    public Node(int data)
    {
        this.data = data;
        this.next = null;
    }
}

class Main
{
    // Utility function to print contents of a linked list
    public static void printList(Node node)
    {
        while (node != null)
        {
            System.out.print(node.data + " —> ");
            node = node.next;
        }
        System.out.print("null");
    }

    // The main function to merge given `k` sorted linked lists.
    // It takes array `lists` of size `k` and generates the sorted output
    public static Node mergeKLists(Node[] lists)
    {
        // create an empty min-heap using a comparison object for ordering the min-heap
        PriorityQueue<Node> pq;
        pq = new PriorityQueue<>(Comparator.comparingInt(a -> ((Node) a).data));

        // push the first node of each list into the min-heap
        pq.addAll(Arrays.asList(lists).subList(0, lists.length));

        // take two pointers, head and tail, where the head points to the first node
        // of the output list and tail points to its last node
        Node head = null, last = null;

        // run till min-heap is empty
        while (!pq.isEmpty())
        {
            // extract the minimum node from the min-heap
            Node min = pq.poll();

            // add the minimum node to the output list
            if (head == null) {
                head = last = min;
            }
            else {
                last.next = min;
                last = min;
            }

            // take the next node from the "same" list and insert it into the min-heap
            if (min.next != null) {
                pq.add(min.next);
            }
        }

        // return head node of the merged list
        return head;
    }

    public static void main(String[] s)
    {
        int k = 3;    // total number of linked lists

        // an array to store the head nodes of the linked lists
        Node[] lists = new Node[k];

        lists[0] = new Node(1);
        lists[0].next = new Node(5);
        lists[0].next.next = new Node(7);

        lists[1] = new Node(2);
        lists[1].next = new Node(3);
        lists[1].next.next = new Node(6);
        lists[1].next.next.next = new Node(9);

        lists[2] = new Node(4);
        lists[2].next = new Node(8);
        lists[2].next.next = new Node(10);

        // Merge all lists into one
        Node head = mergeKLists(lists);
        printList(head);
    }
}
```

##

```python3
import heapq
from heapq import heappop, heappush

# A Linked List Node
class Node:
    def __init__(self, data, next=None):
        self.data = data
        self.next = next

    # Override the `__lt__()` function to make `Node` class work with min-heap
    def __lt__(self, other):
        return self.data < other.data

# Utility function to print contents of a linked list
def printList(node):
    while node:
        print(node.data, end=' —> ')
        node = node.next

    print('None')

# The main function to merge given `k` sorted linked lists.
# It takes a list of lists `list` of size `k` and generates the sorted output
def mergeKLists(lists):

    # create a min-heap using the first node of each list
    pq = [x for x in lists]
    heapq.heapify(pq)

    # take two pointers, head and tail, where the head points to the first node
    # of the output list and tail points to its last node
    head = last = None

    # run till min-heap is empty
    while pq:

        # extract the minimum node from the min-heap
        min = heappop(pq)

        # add the minimum node to the output list
        if head is None:
            head = min
            last = min
        else:
            last.next = min
            last = min

        # take the next node from the "same" list and insert it into the min-heap
        if min.next:
            heappush(pq, min.next)

    # return head node of the merged list
    return head

if __name__ == '__main__':

    # total number of linked lists
    k = 3

    # a list to store the head nodes of the linked lists
    lists = [None] * k

    lists[0] = Node(1)
    lists[0].next = Node(5)
    lists[0].next.next = Node(7)

    lists[1] = Node(2)
    lists[1].next = Node(3)
    lists[1].next.next = Node(6)
    lists[1].next.next.next = Node(9)

    lists[2] = Node(4)
    lists[2].next = Node(8)
    lists[2].next.next = Node(10)

    # Merge all lists into one
    head = mergeKLists(lists)
    printList(head)
```

The heap has size `k` at any point, and we pop and push exactly `n` times, where `n` is the total number of nodes. Since each pop/push operation takes O(log(k)) time, the overall time complexity of this solution is O(n.log(k)).

## 3\. Using Divide and Conquer

The above approach reduces the time complexity to O(n.log(k)) but takes O(k) extra space for the heap. We can solve this problem in constant space using [Divide and Conquer](https://techiedelight.com/divide-and-conquer-interview-questions/).

We already know that [two linked lists can be merged](https://techiedelight.com/merge-given-sorted-linked-lists/) in O(n) time and O(1) space (For arrays, O(n) space is required). The idea is to pair up `k` lists and merge each pair in linear time using the O(1) space. After the first cycle, `K/2` lists are left each of size `2×N`. After the second cycle, `K/4` lists are left each of size `4×N` and so on. Repeat the procedure until we have only one list left.

This is demonstrated below in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
using namespace std;

// A Linked List Node
struct Node
{
    int data;
    Node *next;

    Node(int data)
    {
        this->data = data;
        this->next = nullptr;
    }
};

// Utility function to print contents of a linked list
void printList(Node* node)
{
    while (node != nullptr)
    {
        cout << node->data << " —> ";
        node = node->next;
    }
    cout << "nullptr";
}

// Takes two lists sorted in increasing order and merge their nodes
// to make one big sorted list returned
Node *sortedMerge(Node* a, Node* b)
{
    // base cases
    if (a == nullptr) {
        return b;
    }

    else if (b == nullptr) {
        return a;
    }

    Node *result;

    // pick either `a` or `b`, and recur
    if (a->data <= b->data)
    {
        result = a;
        result->next = sortedMerge(a->next, b);
    }
    else {
        result = b;
        result->next = sortedMerge(a, b->next);
    }

    return result;
}

// The main function to merge given `k` sorted linked lists.
// It takes array `lists` of size `k` and generates the sorted output
Node *mergeKLists(vector<Node*> lists)
{
    int k = lists.size();

    // base case
    if (k == 0) {
        return nullptr;
    }

    int last = k - 1;

    // repeat until only one list is left
    while (last != 0)
    {
        int i = 0, j = last;

        // `(i, j)` forms a pair
        while (i < j)
        {
            // merge list `j` with `i`
            lists[i] = sortedMerge(lists[i], lists[j]);

            // consider the next pair
            i++, j--;

            // if all pairs are merged, update last
            if (i >= j) {
                last = j;
            }
        }
    }

    return lists[0];
}

int main()
{
    int k = 3;    // total number of linked lists

    // an array to store the head nodes of the linked lists
    vector<Node*> lists(k);

    lists[0] = new Node(1);
    lists[0]->next = new Node(5);
    lists[0]->next->next = new Node(7);

    lists[1] = new Node(2);
    lists[1]->next = new Node(3);
    lists[1]->next->next = new Node(6);
    lists[1]->next->next->next = new Node(9);

    lists[2] = new Node(4);
    lists[2]->next = new Node(8);
    lists[2]->next->next = new Node(10);

    // Merge all lists into one
    Node* head = mergeKLists(lists);
    printList(head);

    return 0;
}
```

**Output:** 1 —> 2 —> 3 —> 4 —> 5 —> 6 —> 7 —> 8 —> 9 —> 10 —> nullptr

##

```java
// A Linked List Node
class Node
{
    int data;
    Node next;

    public Node(int data)
    {
        this.data = data;
        this.next = null;
    }
}

class Main
{
    // Utility function to print contents of a linked list
    public static void printList(Node node)
    {
        while (node != null)
        {
            System.out.print(node.data + " —> ");
            node = node.next;
        }
        System.out.print("null");
    }

    // Takes two lists sorted in increasing order and merges their nodes
    // to make one big sorted list returned
    public static Node sortedMerge(Node a, Node b)
    {
        // base cases
        if (a == null) {
            return b;
        }
        else if (b == null) {
            return a;
        }

        Node result;

        // pick either `a` or `b`, and recur
        if (a.data <= b.data)
        {
            result = a;
            result.next = sortedMerge(a.next, b);
        }
        else {
            result = b;
            result.next = sortedMerge(a, b.next);
        }

        return result;
    }

    // The main function to merge given `k` sorted linked lists.
    // It takes array `lists` of size `k` and generates the sorted output
    public static Node mergeKLists(Node[] lists)
    {
        // base case
        if (lists == null || lists.length == 0) {
            return null;
        }

        int last = lists.length - 1;

        // repeat until only one list is left
        while (last != 0)
        {
            int i = 0, j = last;

            // `(i, j)` forms a pair
            while (i < j)
            {
                // merge list `j` with `i`
                lists[i] = sortedMerge(lists[i], lists[j]);

                // consider the next pair
                i++;
                j--;

                // if all pairs are merged, update last
                if (i >= j) {
                    last = j;
                }
            }
        }

        return lists[0];
    }

    public static void main(String[] s)
    {
        int k = 3;    // total number of linked lists

        // an array to store the head nodes of the linked lists
        Node[] lists = new Node[k];

        lists[0] = new Node(1);
        lists[0].next = new Node(5);
        lists[0].next.next = new Node(7);

        lists[1] = new Node(2);
        lists[1].next = new Node(3);
        lists[1].next.next = new Node(6);
        lists[1].next.next.next = new Node(9);

        lists[2] = new Node(4);
        lists[2].next = new Node(8);
        lists[2].next.next = new Node(10);

        // Merge all lists into one
        Node head = mergeKLists(lists);

        printList(head);
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

# Utility function to print contents of a linked list
def printList(node):

    while node:
        print(node.data, end=' —> ')
        node = node.next
    print('None')

# Takes two lists sorted in increasing order and merges their nodes
# to make one big sorted list returned
def sortedMerge(a, b):

    # base cases
    if a is None:
        return b
    elif b is None:
        return a

    # pick either `a` or `b`, and recur
    if a.data <= b.data:
        result = a
        result.next = sortedMerge(a.next, b)
    else:
        result = b
        result.next = sortedMerge(a, b.next)

    return result

# The main function to merge given `k` sorted linked lists.
# It takes a list of lists `lists[0…k)` and generates the sorted output
def mergeKLists(lists):

    # base case
    if not lists:
        return None

    last = len(lists) - 1

    # repeat until only one list is left
    while last:
        (i, j) = (0, last)

        # `(i, j)` forms a pair
        while i < j:
            # merge list `j` with `i`
            lists[i] = sortedMerge(lists[i], lists[j])

            # consider the next pair
            i = i + 1
            j = j - 1

            # if all pairs are merged, update last
            if i >= j:
                last = j

    return lists[0]

if __name__ == '__main__':

    k = 3    # total number of linked lists

    # a list to store the head nodes of the linked lists
    lists = [Node] * k

    lists[0] = Node(1)
    lists[0].next = Node(5)
    lists[0].next.next = Node(7)

    lists[1] = Node(2)
    lists[1].next = Node(3)
    lists[1].next.next = Node(6)
    lists[1].next.next.next = Node(9)

    lists[2] = Node(4)
    lists[2].next = Node(8)
    lists[2].next.next = Node(10)

    # Merge all lists into one
    head = mergeKLists(lists)
    printList(head)
```

The time complexity of the above solution is O(n.log(k)) as the outer while loop in function `mergeKLists()` runs O(log(k)) times, and every time we are processing `n` nodes.

**Author:** Aditya Goel
