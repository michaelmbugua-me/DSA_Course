# Stack Implementation in C++

> Source: https://www.techiedelight.com/stack-implementation-in-cpp/

A stack is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure "Linear data structure") that serves as a container of objects that are inserted and removed according to the LIFO (Last–In, First–Out) rule.

The stack has three main operations: `push`, `pop`, and `peek`. We have discussed these operations in the previous post and covered [array](https://techiedelight.com/stack-implementation/) and [linked list implementation of stack data structure](https://techiedelight.com/stack-implementation-using-linked-list/) in C. In this article, C++ implementation of stack data structure is discussed using a class.

Following is the stack implementation in C++ which covers the following operations:

  1. push: Inserts a new element at the top of the stack, above its current top element.
  2. pop: Removes the top element on the stack, thereby decrementing its size by one.
  3. isEmpty: Returns true if the stack is empty, i.e., its size is zero; otherwise, it returns false.
  4. isFull: Returns true if the stack is full, i.e., its size has reached maximum allocated capacity; otherwise, it returns false.
  5. peek: Returns the top element present in the stack without modifying the stack.
  6. size: Returns the count of elements present in the stack.

> 

Stack Implementation using an array:

```
#include <iostream>
#include <cstdlib>
using namespace std;

// Define the default capacity of the stack
#define SIZE 10

// A class to represent a stack
class Stack
{
    int *arr;
    int top;
    int capacity;

public:
    Stack(int size = SIZE);         // constructor
    ~Stack();                       // destructor

    void push(int);
    int pop();
    int peek();

    int size();
    bool isEmpty();
    bool isFull();
};

// Constructor to initialize the stack
Stack::Stack(int size)
{
    arr = new int[size];
    capacity = size;
    top = -1;
}

// Destructor to free memory allocated to the stack
Stack::~Stack() {
    delete[] arr;
}

// Utility function to add an element `x` to the stack
void Stack::push(int x)
{
    if (isFull())
    {
        cout << "Overflow\nProgram Terminated\n";
        exit(EXIT_FAILURE);
    }

    cout << "Inserting " << x << endl;
    arr[++top] = x;
}

// Utility function to pop a top element from the stack
int Stack::pop()
{
    // check for stack underflow
    if (isEmpty())
    {
        cout << "Underflow\nProgram Terminated\n";
        exit(EXIT_FAILURE);
    }

    cout << "Removing " << peek() << endl;

    // decrease stack size by 1 and (optionally) return the popped element
    return arr[top--];
}

// Utility function to return the top element of the stack
int Stack::peek()
{
    if (!isEmpty()) {
        return arr[top];
    }
    else {
        exit(EXIT_FAILURE);
    }
}

// Utility function to return the size of the stack
int Stack::size() {
    return top + 1;
}

// Utility function to check if the stack is empty or not
bool Stack::isEmpty() {
    return top == -1;               // or return size() == 0;
}

// Utility function to check if the stack is full or not
bool Stack::isFull() {
    return top == capacity - 1;     // or return size() == capacity;
}

int main()
{
    Stack pt(3);

    pt.push(1);
    pt.push(2);

    pt.pop();
    pt.pop();

    pt.push(3);

    cout << "The top element is " << pt.peek() << endl;
    cout << "The stack size is " << pt.size() << endl;

    pt.pop();

    if (pt.isEmpty()) {
        cout << "The stack is empty\n";
    }
    else {
        cout << "The stack is not empty\n";
    }

    return 0;
}
```

**Output:** Inserting 1 Inserting 2 Removing 2 Removing 1 Inserting 3 The top element is 3 The stack size is 1 Removing 3 The stack is empty

The time complexity of all stack operations is constant, i.e., O(1).

Using STL:

Several of the C++ Standard Library container types have `push_back` and `pop_back` operations with LIFO semantics like [std::stack](https://cplusplus.com/reference/list/list/), [std::list](https://cplusplus.com/reference/stack/stack/).

```std::stack
#include <iostream>
#include <stack>
using namespace std;

// Stack implementation in C++ using `std::stack`
int main()
{
    stack<string> s;

    s.push("A");    // Insert `A` into the stack
    s.push("B");    // Insert `B` into the stack
    s.push("C");    // Insert `C` into the stack
    s.push("D");    // Insert `D` into the stack

    // returns the total number of elements present in the stack
    cout << "The stack size is " << s.size() << endl;

    // prints the top of the stack (`D`)
    cout << "The top element is " << s.top() << endl;

    s.pop();        // removing the top element (`D`)
    s.pop();        // removing the next top (`C`)

    cout << "The stack size is " << s.size() << endl;

    // check if the stack is empty
    if (s.empty()) {
        cout << "The stack is empty\n";
    }
    else {
        cout << "The stack is not empty\n";
    }

    return 0;
}
```

##

```std::list
#include <iostream>
#include <list>
using namespace std;

// Stack implementation in C++ using `std::list`
int main()
{
    list<string> s;

    s.push_front("A");        // Insert `A` into the stack
    s.push_front("B");        // Insert `B` into the stack
    s.push_front("C");        // Insert `C` into the stack
    s.push_front("D");        // Insert `D` into the stack

    // returns the total number of elements present in the stack
    cout << "The stack size is " << s.size() << endl;

    // prints the top of the stack (`D`)
    cout << "The top element is " << s.front() << endl;

    s.pop_front();          // removing the top element (`D`)
    s.pop_front();          // removing the next top (`C`)

    cout << "The stack size is " << s.size() << endl;

    // check if the stack is empty
    if (s.empty()) {
        cout << "The stack is empty\n";
    }
    else {
        cout << "The stack is not empty\n";
    }

    return 0;
}
```

**Output:** The top element is D The stack size is 2 The stack is not empty

**Also See:**

> [Stack Implementation in Java](https://techiedelight.com/stack-implementation-in-java/)

> [Stack Implementation in Python](https://techiedelight.com/stack-implementation-python/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.86/5. Vote count: 203

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
