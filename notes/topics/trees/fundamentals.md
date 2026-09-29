# Tree fundamentals

## What is a tree?

A tree is a non-linear data structure used to represent hierarchical relationships. As a graph, it is connected and has no cycles. These notes focus on rooted trees, where one node is designated the root.

| Linear data structures | Non-linear data structures |
| --- | --- |
| Array, linked list, stack, queue | Tree, graph |

A familiar example is a file system:

```text
Root
|-- Documents
|   |-- Resume.pdf
|   `-- Notes.txt
|-- Pictures
`-- Downloads
```

Other examples include the HTML DOM, organization hierarchies, country/state/city hierarchies, database indexes, and decision trees.

## Basic terminology

```text
        1
       / \
      2   3
     / \
    4   5
```

| Term | Meaning | Example above |
| --- | --- | --- |
| Root | Node with no parent | 1 |
| Parent | Node directly above a child | Parent of 2 is 1; parent of 4 is 2 |
| Child | Node directly below its parent | Children of 1 are 2 and 3 |
| Siblings | Nodes with the same parent | 2 and 3; 4 and 5 |
| Leaf | Node with no children | 3, 4, 5 |
| Subtree | A node and all its descendants | 2 together with 4 and 5 |
| Level | Nodes at the same depth; root level is 0 here | Level 0: 1; level 1: 2, 3; level 2: 4, 5 |
| Depth | Number of edges from the root to a node | Depth(1) = 0; depth(2) = 1; depth(4) = 2 |
| Height | Number of edges on the longest downward path from a node to a leaf | Height(1) = 2; height(2) = 1; height(4) = 0 |

The height of the tree is the height of its root. Some sources start levels at 1; always check the convention.

## Height versus maximum depth

These notes measure **height in edges**: a leaf has height 0, and we assign an empty tree height -1.

Some problems define **maximum depth as the number of nodes** on the longest root-to-leaf path. Under that convention, an empty tree has maximum depth 0, a leaf has maximum depth 1, and the example above has maximum depth 3. See the [maximum-depth example](../../patterns/tree-dfs.md#example-maximum-depth).

## Important properties

A non-empty rooted tree:

- Has exactly one root.
- Contains nodes connected by edges and has no cycles.
- Gives every node except the root exactly one parent.
- Has exactly one simple path between any two nodes.
- Has exactly `n - 1` edges when it contains `n` nodes.

## Tree representation in JavaScript

A binary-tree node stores a value and references to up to two children:

```js
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);
root.left.left = new TreeNode(4);
root.left.right = new TreeNode(5);
```

This creates the five-node tree above. Expressions such as `root.val`, `root.left`, and `root.right` access object properties. An absent child is represented by `null`; check for it before accessing a node's properties.

## Complexity reminders

Let `n` be the number of nodes and `h` the height in edges.

- Visiting every node takes O(n) time if each visit does O(1) work.
- Recursive DFS uses O(h + 1) stack space: O(log n) for a balanced tree and O(n) for a skewed tree.
- BST search follows one branch at a time and takes O(h + 1) time. It is O(log n) only when height is logarithmic.

## Edge cases to remember

- Empty tree (`root === null`)
- A single node
- A chain of only left or only right children
- Repeated or negative values, where allowed

Next: [Types of trees](types-of-trees.md) and [traversals](traversals.md).
