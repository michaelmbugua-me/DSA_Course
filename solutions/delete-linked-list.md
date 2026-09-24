# Delete a linked list in C/C++

> Source: https://www.techiedelight.com/delete-linked-list/

[Linked List](https://www.techiedelight.com/Category/Linked-List/)

Write a function that takes a linked list, deallocates all of its memory, and sets its head pointer to NULL (the empty list).

The idea is to iterate through the list and delete each node encountered. There is a slight complication inside the loop since we need to extract the `.next` pointer before deleting the node since it will be technically unavailable after the delete.

The algorithm can be implemented as follows in C and C++:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(struct Node** head, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));
    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Iterative function to delete a linked list
void deleteList(struct Node** head)
{
    struct Node* prev = *head;

    while (*head)
    {
        *head = (*head)->next;

        printf("Deleting %d\n", prev->data);
        free(prev);
        prev = *head;
    }
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys) / sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    deleteList(&head);

    if (head == NULL) {
        printf("List deleted");
    }

    return 0;
}
```

**Output:** Deleting 1 Deleting 2 Deleting 3 Deleting 4 Deleting 5 List deleted

##

```cpp
#include <iostream>
#include <vector>
using namespace std;

// A Linked List Node
class Node
{
  public:
    int data;                // data field
    Node* next = nullptr;     // pointer to the next node

    Node() {}
    Node(int data): data(data) {}
    Node(int data, Node *next): data(data), next(next) {}
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(Node* &head, int data)
{
    Node* newNode = new Node(data);
    newNode->next = head;
    head = newNode;
}

// Iterative function to delete a linked list
void deleteList(Node* &head)
{
    Node* prev = head;

    while (head)
    {
        head = head->next;

        cout << "Deleting " << prev->data << endl;
        delete(prev);
        prev = head;
    }
}

int main()
{
    // input keys
    vector<int> keys = { 1, 2, 3, 4, 5 };
    int n = keys.size();

    // points to the head node of the linked list
    Node* head = nullptr;

    // construct a linked list
    for (int i = n - 1; i >= 0; i--) {
        push(head, keys[i]);
    }

    deleteList(head);

    if (head == nullptr) {
        cout << "List deleted";
    }

    return 0;
}
```

We can easily convert the above iterative version into a recursive one. Following is the simple recursive implementation in C and C++:

```c
#include <stdio.h>
#include <stdlib.h>

// A Linked List Node
struct Node
{
    int data;
    struct Node* next;
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(struct Node** head, int data)
{
    struct Node* newNode = (struct Node*)malloc(sizeof(struct Node));

    newNode->data = data;
    newNode->next = *head;
    *head = newNode;
}

// Recursive function to delete a linked list
void deleteList(struct Node** head)
{
    if (*head == NULL) {
        return;
    }

    if ((*head)->next) {
        deleteList(&((*head)->next));
    }

    printf("Deleting %d\n", (*head)->data);
    free(*head);

    *head = NULL;
}

int main(void)
{
    // input keys
    int keys[] = { 1, 2, 3, 4, 5 };
    int n = sizeof(keys) / sizeof(keys[0]);

    // points to the head node of the linked list
    struct Node* head = NULL;

    // construct a linked list
    for (int i = n - 1; i >= 0; i--) {
        push(&head, keys[i]);
    }

    deleteList(&head);

    if (head == NULL) {
        printf("List deleted");
    }

    return 0;
}
```

**Output:** Deleting 5 Deleting 4 Deleting 3 Deleting 2 Deleting 1 List deleted

##

```cpp
#include <iostream>
#include <vector>
using namespace std;

// A Linked List Node
class Node
{
  public:
    int data;                // data field
    Node* next = nullptr;     // pointer to the next node

    Node() {}
    Node(int data): data(data) {}
    Node(int data, Node *next): data(data), next(next) {}
};

// Helper function to create a new node with the given data and
// pushes it onto the list's front
void push(Node* &head, int data)
{
    Node* newNode = new Node(data);
    newNode->next = head;
    head = newNode;
}

// Recursive function to delete a linked list
void deleteList(Node* &head)
{
    if (head == nullptr) {
        return;
    }

    if (head->next) {
        deleteList(head->next);
    }

    cout << "Deleting " << head->data << endl;
    delete(head);

    head = nullptr;
}

int main()
{
    // input keys
    vector<int> keys = { 1, 2, 3, 4, 5 };
    int n = keys.size();

    // points to the head node of the linked list
    Node* head = nullptr;

    // construct a linked list
    for (int i = n - 1; i >= 0; i--) {
        push(head, keys[i]);
    }

    deleteList(head);

    if (head == nullptr) {
        cout << "List deleted";
    }

    return 0;
}
```

The time complexity of the above solution is O(n), where `n` is the total number of nodes in the linked list, and requires extra space for the call stack.

**Source:** <http://cslibrary.stanford.edu/105/LinkedListProblems.pdf>
