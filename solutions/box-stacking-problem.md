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

Finally, the maximum height is the maximum value in `L[]`. The algorithm can be implemented as follows in C++, Java, and Python:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Data structure to store a box (L × W × H)
struct Box
{
    // enforce constraint: width is never more than length
    int length, width, height;
};

// Function to generate rotations of all the boxes
vector<Box> createAllRotations(vector<Box> const &boxes)
{
    // stores all rotations of each box
    vector<Box> rotations;

    // do for each box
    for (const Box &box: boxes)
    {
        // push the original box: L × W × H
        rotations.push_back(box);

        // push the first rotation: max(L, H) × min(L, H) × W
        rotations.push_back({ max(box.length, box.height),
                        min(box.length, box.height),
                        box.width });

        // push the second rotation: max(W, H) × min(W, H) × L
        rotations.push_back({ max(box.width, box.height),
                        min(box.width, box.height),
                        box.length });
    }

    return rotations;
}

// Create a stack of boxes that is as tall as possible
int findMaxHeight(vector<Box> const &boxes)
{
    // base case
    if (boxes.size() == 0) {
        return 0;
    }

    // generate rotations of each box
    vector<Box> rotations = createAllRotations(boxes);

    // sort the boxes in descending order of base area (L × W)
    sort(rotations.begin(),
        rotations.end(),
        [](const Box &x, const Box &y) {
            return x.length * x.width > y.length * y.width;
        });

    // max_height[i] stores the maximum possible height when the i'th box
    // is on the top
    vector<int> max_height(rotations.size());

    // fill `max_height[]` in a bottom-up manner
    for (int i = 0; i < rotations.size(); i++)
    {
        for (int j = 0; j < i; j++)
        {
            // dimensions of the lower box are each strictly larger than those
            // of the higher box
            if (rotations[i].length < rotations[j].length &&
                    rotations[i].width < rotations[j].width) {
                max_height[i] = max(max_height[i], max_height[j]);
            }
        }

        max_height[i] += rotations[i].height;
    }

    // return the maximum value in max_height[]
    return *max_element(max_height.begin(), max_height.end());
}

int main()
{
    // input boxes
    vector<Box> boxes {
        { 4, 2, 5 },
        { 3, 1, 6 },
        { 3, 2, 1 },
        { 6, 3, 8 }
    };

    cout << "The maximum height is " << findMaxHeight(boxes) << endl;

    return 0;
}
```

**Output:** The maximum height is 22

##

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

// A class to store a box (L × W × H)
class Box
{
    // constraint: width is never more than length
    int length, width, height;

    private Box(int length, int width, int height) {
        this.length = length;
        this.width = width;
        this.height = height;
    }

    public static Box of(int a, int b, int c) {
        return new Box(a, b, c);
    }
}

class Main
{
    // Function to generate rotations of all the boxes
    public static List<Box> createAllRotations(List<Box> boxes)
    {
        // stores all rotations of each box
        List<Box> rotations = new ArrayList<>();

        // do for each box
        for (Box box: boxes)
        {
            // push the original box: L × W × H
            rotations.add(box);

            // push the first rotation: max(L, H) × min(L, H) × W
            rotations.add(Box.of(Math.max(box.length, box.height),
                                Math.min(box.length, box.height),
                                box.width));

            // push the second rotation: max(W, H) × Math.min(W, H) × L
            rotations.add(Box.of(Math.max(box.width, box.height),
                                Math.min(box.width, box.height),
                                box.length));
        }

        return rotations;
    }

    // Create a stack of boxes that is as tall as possible
    public static int findMaxHeight(List<Box> boxes)
    {
        // base case
        if (boxes == null || boxes.size() == 0) {
            return 0;
        }

        // generate rotations of each box
        List<Box> rotations = createAllRotations(boxes);

        // sort the boxes in descending order of base area (L × W)
        Collections.sort(rotations, (x, y) -> (y.length * y.width -
                                x.length * x.width));

        // max_height[i] store the maximum possible height when the i'th box
        // is on the top
        int[] max_height = new int[rotations.size()];

        // fill `max_height[]` in a bottom-up manner
        for (int i = 0; i < rotations.size(); i++)
        {
            for (int j = 0; j < i; j++)
            {
                // dimensions of the lower box are each strictly larger than those
                // of the higher box
                if (rotations.get(i).length < rotations.get(j).length &&
                            rotations.get(i).width < rotations.get(j).width) {
                    max_height[i] = Math.max(max_height[i], max_height[j]);
                }
            }

            max_height[i] += rotations.get(i).height;
        }

        // return the maximum value in max_height[]
        return Arrays.stream(max_height).max().getAsInt();
    }

    public static void main(String[] args)
    {
        // input boxes
        List<Box> boxes = Arrays.asList(Box.of(4, 2, 5), Box.of(3, 1, 6),
                                        Box.of(3, 2, 1), Box.of(6, 3, 8));

        System.out.println("The maximum height is " + findMaxHeight(boxes));
    }
}
```

##

```python3
# A class to store a box (L × W × H)
class Box:
    def __init__(self, length, width, height):

        # constraint: width is never more than length
        self.length = length
        self.width = width
        self.height = height

# Function to generate rotations of all the boxes
def createAllRotations(boxes):

    # stores all rotations of each box
    rotations = []

    # do for each box
    for box in boxes:

        # push the original box: L × W × H
        rotations.append(box)

        # push the first rotation: max(L, H) × min(L, H) × W
        rotations.append(Box(max(box.length, box.height),
                    min(box.length, box.height), box.width))

        # push the second rotation: max(W, H) × min(W, H) × L
        rotations.append(Box(max(box.width, box.height),
                    min(box.width, box.height), box.length))

    return rotations

# Create a stack of boxes that is as tall as possible
def findMaxHeight(boxes):

    # base case
    if not boxes:
        return 0

    # generate rotations of each box
    rotations = createAllRotations(boxes)

    # sort the boxes in descending order of base area (L × W)
    rotations.sort(key=lambda x: x.length * x.width, reverse=True)

    # max_height[i] store the maximum possible height when the i'th box is on the top
    max_height = [0] * len(rotations)

    # fill `max_height` in a bottom-up manner
    for i in range(len(rotations)):
        for j in range(i):
            # dimensions of the lower box are each strictly larger than those
            # of the higher box
            if (rotations[i].length < rotations[j].length and
                    rotations[i].width < rotations[j].width):
                max_height[i] = max(max_height[i], max_height[j])

        max_height[i] += rotations[i].height

    # return the maximum value in max_height[]
    return max(max_height)

if __name__ == '__main__':

    # input boxes
    boxes = [Box(4, 2, 5), Box(3, 1, 6), Box(3, 2, 1), Box(6, 3, 8)]

    print('The maximum height is', findMaxHeight(boxes))
```

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
