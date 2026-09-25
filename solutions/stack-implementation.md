# Stack Implementation in C

> Source: https://www.techiedelight.com/stack-implementation/

A stack is a [linear data structure](https://en.wikipedia.org/wiki/Linear_data_structure "Linear data structure") that serves as a collection of elements, with three main operations.

  * Push operation, which adds an element to the stack.
  * Pop operation, which removes the most recently added element that was not yet removed, and
  * Peek operation, which returns the top element without modifying the stack.

The `push` and `pop` operations occur only at one end of the structure, referred to as the `top` of the stack. The order in which elements come off a stack gives rise to its alternative name, LIFO (for Last–In, First–Out).

Following is a simple representation of a stack with `push` and `pop` operations:

[](https://commons.wikimedia.org/wiki/File%3ALifo_stack.png "By Maxtremus \(Own work\) \[CC0\], via Wikimedia Commons")

A stack may be implemented to have a bounded capacity. If the stack is full and does not contain enough space for `push` operation, then the stack is considered in an overflow state.

Stack Implementation using an array:

A (bounded) stack can be easily implemented using an array. The first element of the stack (i.e., bottom-most element) is stored at the `0'th` index in the array (assuming zero-based indexing). The second element will be stored at index `1` and so on… We also maintain a variable `top` to keep track of the stack’s size by recording the total number of items pushed so far. It points to a location in the array where the next element is to be inserted. Thus, the stack itself can be effectively implemented as a 3–element structure:

**structure stack:** maxsize : integer top : integer items : array of item

The stack can be implemented as follows in TypeScript:

```ts
// Data structure to represent a stack
class Stack {
    maxsize: number;    // define max capacity of the stack
    top: number;
    items: number[];

    // Utility function to initialize the stack
    constructor(capacity: number) {
        this.maxsize = capacity;
        this.top = -1;
        this.items = new Array<number>(capacity);
    }

    // Utility function to return the size of the stack
    size(): number {
        return this.top + 1;
    }

    // Utility function to check if the stack is empty or not
    isEmpty(): boolean {
        return this.top === -1;                   // or return this.size() === 0;
    }

    // Utility function to check if the stack is full or not
    isFull(): boolean {
        return this.top === this.maxsize - 1;      // or return this.size() === this.maxsize;
    }

    // Utility function to add an element `x` to the stack
    push(x: number): void {
        // check if the stack is already full. Then inserting an element would
        // lead to stack overflow
        if (this.isFull()) {
            console.log("Overflow\nProgram Terminated\n");
            process.exit(-1);
        }

        console.log(`Inserting ${x}`);

        // add an element and increment the top's index
        this.items[++this.top] = x;
    }

    // Utility function to return the top element of the stack
    peek(): number {
        // check for an empty stack
        if (!this.isEmpty()) {
            return this.items[this.top];
        }
        else {
            process.exit(-1);
        }
    }

    // Utility function to pop a top element from the stack
    pop(): number {
        // check for stack underflow
        if (this.isEmpty()) {
            console.log("Underflow\nProgram Terminated\n");
            process.exit(-1);
        }

        console.log(`Removing ${this.peek()}`);

        // decrement stack size by 1 and (optionally) return the popped element
        return this.items[this.top--];
    }
}

// create a stack of capacity 5
const pt = new Stack(5);

pt.push(1);
pt.push(2);
pt.push(3);

console.log(`The top element is ${pt.peek()}`);
console.log(`The stack size is ${pt.size()}`);

pt.pop();
pt.pop();
pt.pop();

if (pt.isEmpty()) {
    console.log("The stack is empty");
}
else {
    console.log("The stack is not empty");
}
```

**Output:** Inserting 1 Inserting 2 Inserting 3 The top element is 3 The stack size is 3 Removing 3 Removing 2 Removing 1 The stack is empty

The time complexity of `push()`, `pop()`, `peek()`, `isEmpty()`, `isFull()` and `size()` operations is O(1).

It is possible to implement a stack that can grow or shrink as much as needed using a dynamic array. The stack’s size is simply the size of the dynamic array, which is a very efficient implementation of a stack since adding items to or removing items from the end of a dynamic array requires amortized O(1) time.

Applications of a stack:

  1. Expression evaluation (conversions between the prefix, postfix, or infix notations).
  2. Syntax parsing by compilers.
  3. Backtracking Algorithms (game playing, finding paths, exhaustive searching).
  4. Recursive functions call, i.e., [call stack](https://en.wikipedia.org/wiki/Call_stack).
  5. An “undo” operation in text editors.
  6. Browser back button and many more…

**Read More:**

> [Stack Implementation using a Linked List – C, Java, and Python](https://techiedelight.com/stack-implementation-using-linked-list/)

> [Stack Implementation in C++](https://techiedelight.com/stack-implementation-in-cpp/)

> [Stack Implementation in Java](https://techiedelight.com/stack-implementation-in-java/)

> [Stack Implementation in Python](https://techiedelight.com/stack-implementation-python/)

**References:** <https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.72/5. Vote count: 118

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Beginner](https://www.techiedelight.com/Tags/Beginner/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
