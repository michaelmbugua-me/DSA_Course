# Remove redundant nodes from a path formed by a linked list

> Source: https://www.techiedelight.com/remove-redundant-nodes-path-formed-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Given a linked list that stores a path formed by cells of a matrix, remove the redundant nodes in that path. The path can be both vertical and horizontal, but never diagonal. To determine the complete path, we need the endpoints of all vertical and horizontal paths; middle nodes don’t provide any value and are therefore redundant. So, the resultant list should contain coordinates of only endpoints of all vertical and horizontal paths.

For example,

We should convert the above list into the following list:

> 

We can easily solve the problem by traversing the list and considering three nodes at a time. If a triplet is found with the same x–value or same y–value, then delete the middle node. If this is done for all adjacent triplets, we will get the desired list at the end.

This is demonstrated below in C, Java, and Python:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int x, y;
    struct Node* next;
};

// Helper function to insert a new node at the beginning of the linked list
void push(struct Node** headRef, int x, int y)
{
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->x = x;
    node->y = y;
    node->next = *headRef;

    *headRef = node;
}

// Function to remove redundant nodes from a path formed by a linked list
void removeNodes(struct Node **head)
{
    struct Node* curr = *head;

    while (curr && curr->next && curr->next->next)
    {
        struct Node* temp = curr->next->next;

        // check for a vertical triplet (triplet with the same x–value)
        if (curr->x == curr->next->x && curr->x == temp->x)
        {
            // delete the middle node
            free(curr->next);
            curr->next = temp;
        }

        // check for a horizontal triplet (triplet with the same y–value)
        else if (curr->y == curr->next->y && curr->y == temp->y)
        {
            // delete the middle node
            free(curr->next);
            curr->next = temp;
        }
        else {
            curr=curr->next;
        }
    }
}

// Helper function to print a given linked list
void printList(struct Node* head)
{
    struct Node* ptr = head;
    while (ptr)
    {
        printf("(%d, %d) —> ", ptr->x, ptr->y);
        ptr = ptr->next;
    }

    printf("NULL\n");
}

int main(void)
{
    // input coordinates
    int keys[][2] = { {0, 1}, {0, 5}, {0, 8}, {2, 8},
                    {5, 8}, {7, 8}, {7, 10}, {7, 12} };

    int n = sizeof(keys) / sizeof(keys[0]);

    struct Node* head = NULL;
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i][0], keys[i][1]);
    }

    removeNodes(&head);
    printList(head);

    return 0;
}
```

**Output:** (0, 1) —> (0, 8) —> (7, 8) —> (7, 12) —> NULL

##

```java
// A Linked List Node
class Node
{
    int x, y;
    Node next;

    Node(int x, int y, Node next)
    {
        this.x = x;
        this.y = y;
        this.next = next;
    }

    @Override
    public String toString() {
        return ("(" + x + ", " + y + ")");
    }
}

class Main
{
    // Function to remove redundant nodes from a path formed by a linked list
    public static Node removeNodes(Node head)
    {
        Node curr = head;

        while (curr != null && curr.next != null && curr.next.next != null)
        {
            Node temp = curr.next.next;

            // check for a vertical triplet (triplet with the same x–value)
            if (curr.x == curr.next.x && curr.x == temp.x)
            {
                // delete the middle node
                curr.next = temp;
            }

            // check for a horizontal triplet (triplet with the same y–value)
            else if (curr.y == curr.next.y && curr.y == temp.y)
            {
                // delete the middle node
                curr.next = temp;
            }
            else {
                curr = curr.next;
            }
        }

        return head;
    }

    // Helper function to print a given linked list
    public static void printList(Node head)
    {
        for (Node ptr = head; ptr != null; ptr = ptr.next) {
            System.out.print(ptr + " —> ");
        }
        System.out.println("null");
    }

    public static void main(String[] args)
    {
        // input coordinates
        int[][] keys = { {0, 1}, {0, 5}, {0, 8}, {2, 8},
                {5, 8}, {7, 8}, {7, 10}, {7, 12} };

        Node head = null;
        for (int i = keys.length - 1; i >= 0; i--) {
            head = new Node(keys[i][0], keys[i][1], head);
        }

        head = removeNodes(head);
        printList(head);
    }
}
```

##

```python3
# A Linked List Node
class Node:
    def __init__(self, x, y, next):
        self.x = x
        self.y = y
        self.next = next

    def __repr__(self):
        return str((self.x, self.y))

# Function to remove redundant nodes from a path formed by a linked list
def removeNodes(head):

    curr = head

    while curr and curr.next and curr.next.next:

        temp = curr.next.next

        # check for a vertical triplet (triplet with the same x–value)
        if curr.x == curr.next.x and curr.x == temp.x:
            # delete the middle node
            curr.next = temp

        # check for a horizontal triplet (triplet with the same y–value)
        elif curr.y == curr.next.y and curr.y == temp.y:
            # delete the middle node
            curr.next = temp
        else:
            curr = curr.next

    return head

# Helper function to print a given linked list
def printList(head):

    ptr = head
    while ptr:
        print(ptr, end=' —> ')
        ptr = ptr.next

    print('None')

if __name__ == '__main__':

    # input coordinates
    keys = [(0, 1), (0, 5), (0, 8), (2, 8), (5, 8), (7, 8), (7, 10), (7, 12)]

    head = None
    for x, y in reversed(keys):
        head = Node(x, y, head)

    head = removeNodes(head)
    printList(head)
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and doesn’t require any extra space.

Also See:

> [Delete every `N` nodes in a linked list after skipping `M` nodes](https://www.techiedelight.com/delete-every-n-nodes-linked-list-skipping-m-nodes/ "Delete every `N` nodes in a linked list after skipping `M` nodes")

> [Rearrange linked list so that it has alternating high and low values](https://www.techiedelight.com/rearrange-linked-list-alternating-high-low-values/ "Rearrange linked list so that it has alternating high and low values")

> [Pairwise swap adjacent nodes of a linked list](https://www.techiedelight.com/pairwise-swap-adjacent-nodes-linked-list/ "Pairwise swap adjacent nodes of a linked list")

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.87/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Medium](https://www.techiedelight.com/Tags/medium/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
