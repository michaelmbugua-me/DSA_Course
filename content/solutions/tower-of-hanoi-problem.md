# Tower of Hanoi Problem

> Source: https://www.techiedelight.com/tower-of-hanoi-problem/

[Programming Puzzles](https://www.techiedelight.com/Category/Programming-Puzzles/)

The Tower of Hanoi is a mathematical puzzle consisting of three rods and `n` disks of different sizes which can slide onto any rod.

The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top, making a conical shape. The objective of the puzzle is to move the entire stack to another rod, obeying the following simple rules:

  * Only one disk can be moved at a time.
  * Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack, i.e., a disk can only be moved if it is the uppermost disk on a stack.
  * No disk may be placed on top of a smaller disk.

The minimum number of moves required to solve a Tower of Hanoi puzzle is `2n-1`, where `n` is the total number of disks.

[](https://commons.wikimedia.org/w/index.php?curid=228623)

An animated solution of the Tower of Hanoi puzzle for `n = 4` can be seen [here](https://en.wikipedia.org/wiki/File:Tower_of_Hanoi_4.gif#/media/File:Tower_of_Hanoi_4.gif). Following are the steps that were taken by the proposed solution:

  * Move disk 1 from 1 to 2
  * Move disk 2 from 1 to 3
  * Move disk 1 from 2 to 3
  * Move disk 3 from 1 to 2
  * Move disk 1 from 3 to 1
  * Move disk 2 from 3 to 2
  * Move disk 1 from 1 to 2
  * Move disk 4 from 1 to 3
  * Move disk 1 from 2 to 3
  * Move disk 2 from 2 to 1
  * Move disk 1 from 3 to 1
  * Move disk 3 from 2 to 3
  * Move disk 1 from 1 to 2
  * Move disk 2 from 1 to 3
  * Move disk 1 from 2 to 3

> 

We can easily solve the Tower of Hanoi problem using [recursion](https://techiedelight.com/recursion-practice-problems-with-solutions/). A key to solving this puzzle is recognizing that we can solve it by breaking the problem down into a collection of smaller problems and further breaking those problems down into even smaller problems until a solution is reached.

To move `n` discs from pole 1 to pole 3:

  * Move `n-1` discs from 1 to 2. This leaves disc `n` alone on pole 1.
  * Move disc `n` from 1 to 3.
  * Move `n-1` discs from 2 to 3, so they sit on disc `n`.

The algorithm can be implemented as follows in TypeScript:

```ts
function move(disks: number, source = 1, auxiliary = 2, target = 3): void {
    if (disks > 0) {
        // move `n-1` discs from source to auxiliary using the target
        // as an intermediate pole
        move(disks - 1, source, target, auxiliary);

        // move one disc from source to target
        console.log(`Move disk ${disks} from ${source} —> ${target}`);

        // move `n-1` discs from auxiliary to target using the source
        // as an intermediate pole
        move(disks - 1, auxiliary, source, target);
    }
}

// Tower of Hanoi Problem
const n = 3;
move(n);
```

**Output:** Move disk 1 from 1 —> 3 Move disk 2 from 1 —> 2 Move disk 1 from 3 —> 2 Move disk 3 from 1 —> 3 Move disk 1 from 2 —> 1 Move disk 2 from 2 —> 3 Move disk 1 from 1 —> 3

The time complexity of the above solution is O(2n), where `n` is the total number of disks. If `n = 64` and one disk is moved per second, then using the smallest number of moves available will take `264-1` seconds, or roughly `585` billion years to finish the game.

**References:** <https://en.wikipedia.org/wiki/Tower_of_Hanoi>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.79/5. Vote count: 164

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Medium](https://www.techiedelight.com/Tags/medium/), [Recursive](https://www.techiedelight.com/Tags/Recursion/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
