# Tree traversals

Traversal means visiting every node in a particular order. Preorder, inorder, and postorder are depth-first traversals (DFS). Level order is breadth-first traversal (BFS).

## DFS: depth-first search

DFS explores deeply along one branch before backtracking. It uses recursion or an explicit stack, following **LIFO: last in, first out**. Recursion uses the call stack.

Use this tree for the three DFS examples:

```text
        1
       / \
      2   3
     / \ / \
    4  5 8  9
      / \
     6   7
```

### Preorder: root, left, right

Process the root first: **PRE** means before the child calls.

Output: `1, 2, 4, 5, 6, 7, 3, 8, 9`

```js
function preorder(root) {
  if (root === null) return;
  console.log(root.val);
  preorder(root.left);
  preorder(root.right);
}
```

### Inorder: left, root, right

Process the root **IN** between the child calls.

Output: `4, 2, 6, 5, 7, 1, 8, 3, 9`

```js
function inorder(root) {
  if (root === null) return;
  inorder(root.left);
  console.log(root.val);
  inorder(root.right);
}
```

Inorder produces sorted values when the tree satisfies the **BST ordering rule**. An arbitrary binary tree does not have this guarantee.

### Postorder: left, right, root

Process the root last: **POST** means after the child calls.

Output: `4, 6, 7, 5, 2, 8, 9, 3, 1`

```js
function postorder(root) {
  if (root === null) return;
  postorder(root.left);
  postorder(root.right);
  console.log(root.val);
}
```

### The reusable DFS skeleton

Only the location of the processing step changes:

```js
function traverse(node) {
  if (node === null) return;

  // Process here for preorder.
  traverse(node.left);
  // Process here for inorder.
  traverse(node.right);
  // Process here for postorder.
}
```

Choose one processing location for the traversal you want. The three traversal functions above print values; they do not return an array.

## BFS: breadth-first search

BFS visits all nodes at the current level before moving to the next. It uses a queue, following **FIFO: first in, first out**.

```text
        A
       / \
      B   C
     / \   \
    D   E   F
```

| Traversal | Output |
| --- | --- |
| Preorder DFS | A, B, D, E, C, F |
| Inorder DFS | D, B, E, A, C, F |
| Postorder DFS | D, E, B, F, C, A |
| BFS | A, B, C, D, E, F |

### Level-order example

```text
        1
       / \
      2   3
     / \   \
    4   5   8
       / \ /
      6  7 9
```

Flat order: `1, 2, 3, 4, 5, 8, 6, 7, 9`

Grouped by level: `[[1], [2, 3], [4, 5, 8], [6, 7, 9]]`

### JavaScript implementation

This version returns values **grouped by level**. It processes each level in FIFO order and builds the next level, avoiding repeated removal from the front of a JavaScript array.

```js
function levelOrder(root) {
  if (root === null) return [];

  const levels = [];
  let currentLevel = [root];

  while (currentLevel.length > 0) {
    const values = [];
    const nextLevel = [];

    for (const node of currentLevel) {
      values.push(node.val);
      if (node.left !== null) nextLevel.push(node.left);
      if (node.right !== null) nextLevel.push(node.right);
    }

    levels.push(values);
    currentLevel = nextLevel;
  }

  return levels;
}
```

For a flat result like the original notes, use `levelOrder(root).flat()`; flattening adds O(n) time and output space.

The original `queue.shift()` version expresses BFS correctly, but repeated front removals can require moving array elements. Do not rely on it for an O(n) traversal-time guarantee. The level-array implementation above keeps the stated O(n) time bound.

## DFS versus BFS

| Aspect | DFS | BFS |
| --- | --- | --- |
| Exploration | Goes deep, then backtracks | Goes level by level |
| Structure | Stack or recursion | Queue / level frontier |
| Ordering rule | LIFO | FIFO |
| Traversals | Preorder, inorder, postorder | Level order |
| Typical use | Paths and combining subtree results | Depth groups and level-based questions |

Memory trick: **DFS = stack = depth; BFS = queue = level**.

## Zigzag level order

Alternate the output direction at each level:

```text
        A
       / \
      B   C
     / \ / \
    D  E F  G
```

| Level | Normal order | Zigzag order |
| --- | --- | --- |
| 0 | A | A |
| 1 | B, C | C, B |
| 2 | D, E, F, G | D, E, F, G |

Grouped result: `[["A"], ["C", "B"], ["D", "E", "F", "G"]]`

Flat result: `["A", "C", "B", "D", "E", "F", "G"]`

A simple approach is to run normal level-order traversal and reverse the values of alternate levels. Keep child exploration in its usual left-to-right order. Across all levels, reversing adds O(n) work.

## Complexity

For `n` nodes, height `h` measured in edges, and maximum level width `w`:

| Traversal | Time | Auxiliary space, excluding output |
| --- | --- | --- |
| Recursive DFS | O(n) | O(h + 1) call stack |
| BFS implementation above | O(n) | O(w) for current and next levels |

These bounds assume constant work per visited node. DFS stack space is O(log n) for balanced trees and O(n) for skewed trees. Returning all values adds O(n) output space. Deep recursion can exceed JavaScript's call-stack limit.

## Choosing a traversal

| What the problem needs | Useful starting point |
| --- | --- |
| Explore a path deeply | DFS |
| Work level by level | BFS |
| Read sorted BST values | Inorder |
| Obtain child results before computing the parent result | Postorder |
| Process the parent before children | Preorder |

See the [Tree DFS pattern](../../patterns/tree-dfs.md) for how to combine subtree answers.

## Practice prompts

- [ ] Implement all three DFS orders without looking at the examples
- [ ] Trace the call stack on a three-node tree
- [ ] Explain why BFS separates the current level from the next
- [ ] Implement zigzag output using level-order traversal
- [ ] Compare memory use on a wide tree and a skewed tree
