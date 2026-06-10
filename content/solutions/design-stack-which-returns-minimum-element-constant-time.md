# Design a stack that returns the minimum element in constant time

> Source: https://www.techiedelight.com/design-stack-which-returns-minimum-element-constant-time/

[Stack](https://www.techiedelight.com/Category/Stack/)

Design a [stack](https://techiedelight.com/stack-implementation/) to support an additional operation that returns the minimum element from the stack in constant time. The stack should continue supporting all other operations like push, pop, top, size, empty, etc., with no degradation in these operations’ performance.

> 

The first solution that appears in mind is to have a member variable in a stack to keep track of the minimum number. Unfortunately, this won’t work as we can’t get the next minimum number after the minimum one is popped.

The correct approach uses two stacks – the main stack to store the actual stack elements and an auxiliary stack to store the required elements needed to determine the minimum number in constant time. This implementation requires few changes in push and pop operations:

1\. Push operation

The idea is to push the new element into the main stack and push it into the auxiliary stack only if the stack is empty or the new element is less than or equal to the current top element of the auxiliary stack.

2\. Pop operation

For pop operation, remove the top element from the main stack and remove it from the auxiliary stack only if it is equal to the current minimum element, i.e., a top element of both the main stack and the auxiliary stack is the same. After the minimum number is popped, the next minimum number appears on the top of the auxiliary stack.

3\. Min operation

The top of the auxiliary stack always returns the minimum number since we are pushing the minimum number into the auxiliary stack and removing the minimum number from the auxiliary stack only if it is removed from the main stack.

The following table demonstrates the above operations:

The implementation can be seen below in TypeScript:

```ts
class MinStack {
  // main stack to store elements
  private s: number[] = [];
  // auxiliary stack to store minimum elements
  private aux: number[] = [];

  // Inserts a given element on top of the stack
  push(val: number): void {
    // push the given element into the main stack
    this.s.push(val);

    // if the auxiliary stack is empty, push the given element into it
    if (this.aux.length === 0) {
      this.aux.push(val);
    } else {
      // push the given element into the auxiliary stack
      // if it is less than or equal to the current minimum
      if (this.aux[this.aux.length - 1] >= val) {
        this.aux.push(val);
      }
    }
  }

  // Removes the top element from the stack and returns it
  pop(): number {
    if (this.isEmpty()) {
      console.log("Stack underflow");
      process.exit(-1);
    }

    // remove the top element from the main stack
    const top = this.s.pop()!;

    // remove the top element from the auxiliary stack
    // only if it is minimum
    if (top === this.aux[this.aux.length - 1]) {
      this.aux.pop();
    }

    // return the removed element
    return top;
  }

  // Returns the top element of the stack
  top(): number {
    return this.s[this.s.length - 1];
  }

  // Returns the total number of elements in the stack
  size(): number {
    return this.s.length;
  }

  // Returns true if the stack is empty; false otherwise
  isEmpty(): boolean {
    return this.s.length === 0;
  }

  // Returns the minimum element from the stack in constant time
  getMin(): number {
    if (this.aux.length === 0) {
      console.log("Stack underflow");
      process.exit(-1);
    }
    return this.aux[this.aux.length - 1];
  }
}

const s = new MinStack();

s.push(6);
console.log(s.getMin());        // prints 6

s.push(7);
console.log(s.getMin());        // prints 6

s.push(8);
console.log(s.getMin());        // prints 6

s.push(5);
console.log(s.getMin());        // prints 5

s.push(3);
console.log(s.getMin());        // prints 3

console.log(s.pop());           // prints 3
console.log(s.getMin());        // prints 5

s.push(10);
console.log(s.getMin());        // prints 5

console.log(s.pop());           // prints 10
console.log(s.getMin());        // prints 5

console.log(s.pop());           // prints 5
console.log(s.getMin());        // prints 6
```

**Continue Reading:**

> [Design a stack that returns a minimum element without using an auxiliary stack](https://techiedelight.com/design-a-stack-which-returns-minimum-element-without-using-auxiliary-stack/)

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.63/5. Vote count: 168

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Hard](https://www.techiedelight.com/Tags/hard/), [LIFO](https://www.techiedelight.com/Tags/LIFO/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
