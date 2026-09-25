# Box Stacking Problem

> Source: https://www.techiedelight.com/box-stacking-problem/

Given a set of rectangular 3D boxes (cuboids), create a stack of boxes as tall as possible and return the maximum height of the stacked boxes.

A box can be placed on top of another box only if the dimensions of the 2D base of the lower box is each “strictly” larger than of the 2D base of the higher box. Note that “multiple” instances of the same box can be used, such that a box can be rotated to use any of its sides as the base, and the solution does not have to include the every box to achieve maximum height.

Consider the following boxes where each box has dimensions `L × W × H`:

(4 × 2 × 5) (3 × 1 × 6) (3 × 2 × 1) (6 × 3 × 8)

The valid rotations (length more than the width) of the boxes are:

(4 × 2 × 5), (5 × 4 × 2), (5 × 2 × 4) (3 × 1 × 6), (6 × 3 × 1), (6 × 1 × 3) (3 × 2 × 1), (3 × 1 × 2), (2 × 1 × 3) (6 × 3 × 8), (8 × 6 × 3), (8 × 3 × 6)

The maximum height possible is 22, which can be obtained by arranging the boxes in the following order:

(3 × 1 × 6) (4 × 2 × 5) (6 × 3 × 8) (8 × 6 × 3)

Note that `(3 × 2 × 1)` box is not included to achieve the maximum height.

> 

The idea is to use [dynamic programming](https://techiedelight.com/introduction-dynamic-programming/) to solve this problem. We start by generating all rotations of each box. For simplicity, we can easily enforce the constraint that a box’s width is never more than the length. After generating all rotations, [sort the boxes](https://techiedelight.com/sort-vector-custom-objects-cpp/) in descending order of area and then apply the [LIS algorithm](https://techiedelight.com/longest-increasing-subsequence-using-dynamic-programming/) to get the maximum height. Let `L(i)` store the maximum possible height when the `i'th` box is on the top. Then the recurrence is:

L(i) = height(i) + max(L(j) | j < i and block i can be put on top of block j)

Finally, the maximum height is the maximum value in `L[]`. The algorithm can be implemented as follows in TypeScript:

```ts
// A class to store a box (L × W × H)
class Box {
    // constraint: width is never more than length
    length: number;
    width: number;
    height: number;

    constructor(length: number, width: number, height: number) {
        this.length = length;
        this.width = width;
        this.height = height;
    }
}

// Function to generate rotations of all the boxes
function createAllRotations(boxes: Box[]): Box[] {

    // stores all rotations of each box
    const rotations: Box[] = [];

    // do for each box
    for (const box of boxes) {

        // push the original box: L × W × H
        rotations.push(box);

        // push the first rotation: max(L, H) × min(L, H) × W
        rotations.push(new Box(Math.max(box.length, box.height),
                    Math.min(box.length, box.height), box.width));

        // push the second rotation: max(W, H) × min(W, H) × L
        rotations.push(new Box(Math.max(box.width, box.height),
                    Math.min(box.width, box.height), box.length));
    }

    return rotations;
}

// Create a stack of boxes that is as tall as possible
function findMaxHeight(boxes: Box[]): number {

    // base case
    if (!boxes.length) {
        return 0;
    }

    // generate rotations of each box
    const rotations = createAllRotations(boxes);

    // sort the boxes in descending order of base area (L × W)
    rotations.sort((x, y) => y.length * y.width - x.length * x.width);

    // max_height[i] store the maximum possible height when the i'th box is on the top
    const max_height: number[] = new Array(rotations.length).fill(0);

    // fill `max_height` in a bottom-up manner
    for (let i = 0; i < rotations.length; i++) {
        for (let j = 0; j < i; j++) {
            // dimensions of the lower box are each strictly larger than those
            // of the higher box
            if (rotations[i].length < rotations[j].length &&
                    rotations[i].width < rotations[j].width) {
                max_height[i] = Math.max(max_height[i], max_height[j]);
            }
        }

        max_height[i] += rotations[i].height;
    }

    // return the maximum value in max_height[]
    return Math.max(...max_height);
}

// input boxes
const boxes = [new Box(4, 2, 5), new Box(3, 1, 6), new Box(3, 2, 1), new Box(6, 3, 8)];

console.log(`The maximum height is ${findMaxHeight(boxes)}`);
```

**Output:** The maximum height is 22

The time complexity of the above solution is O(n2) and requires O(n) extra space, where `n` is the total number of boxes.

**Problem source:** <https://people.computing.clemson.edu/~bcdean/dp_practice/>

Rate this post

  * __
  * __
  * __
  * __
  * __

Submit Rating

Average rating 4.69/5. Vote count: 278

No votes so far! Be the first to rate this post.

We are sorry that this post was not useful for you!

Tell us how we can improve this post?

Submit Feedback

Tagged [Algorithm](https://www.techiedelight.com/Tags/Algorithm/), [Bottom-up](https://www.techiedelight.com/Tags/Tabulation/), [Hard](https://www.techiedelight.com/Tags/hard/)

**Thanks for reading.**

To share your code in the comments, please use our [online compiler](https://techiedelight.com/compiler/) that supports C, C++, Java, Python, JavaScript, C#, PHP, and many more popular programming languages.

**Like us? Refer us to your friends and support our growth. Happy coding** :)
