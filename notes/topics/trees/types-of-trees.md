# Types of trees

## General tree

A node can have any number of children.

```text
        A
      / | \
     B  C  D
       / \
      E   F
```

## Binary tree

Every node has at most two children, called the **left child** and **right child**. A node can have 0, 1, or 2 children.

```text
        1
       / \
      2   3
     / \
    4   5
```

## Binary search tree (BST)

A BST is a binary tree with an ordering property. For distinct values, at **every node**:

```text
all values in left subtree < node value < all values in right subtree
```

```text
        8
       / \
      4   12
     / \  / \
    2  6 10 14
```

The rule applies to entire subtrees, not only immediate children. If duplicates are allowed, their placement depends on the chosen convention.

A binary tree specifies the maximum number of children; a BST adds ordering. A binary tree is not necessarily sorted or balanced. Inorder traversal of a BST yields sorted values.

## Complete binary tree

Every level is completely filled except possibly the last, and the last level is filled from left to right.

Complete:

```text
        1
       / \
      2   3
     / \  /
    4  5 6
```

Not complete, because positions on the left are missing while positions to their right are occupied:

```text
        1
       / \
      2   3
       \   \
        5   7
```

## Full binary tree

Every node has either **0 or 2 children**. No node has exactly one child.

```text
        1
       / \
      2   3
         / \
        6   7
```

Nodes 1 and 3 each have two children. Nodes 2, 6, and 7 have none. This tree is full, but is not complete.

## Perfect binary tree

Every internal node has two children, and all leaves are at the same level. Equivalently, it is full with all leaves at the same level.

```text
          1
        /   \
       2     3
      / \   / \
     4   5 6   7
```

For a non-empty perfect binary tree of height `h` measured in edges:

```text
Total nodes = 2^(h + 1) - 1
```

For example, height 2 gives `2^3 - 1 = 7` nodes. A perfect binary tree is both full and complete.

## Height-balanced binary tree

For the balance definition used here, **at every node**, the heights of its left and right subtrees differ by at most 1:

```text
abs(height(left) - height(right)) <= 1
```

```text
        1
       / \
      2   3
     / \
    4   5
```

This tree is height-balanced. Checking only the root is insufficient: the condition must hold throughout the tree.

This condition keeps height O(log n), making operations that follow a single root-to-leaf path efficient. A traversal that visits every node still takes O(n). Other tree structures may use different balance rules.

## Quick comparison

| Type | Key rule |
| --- | --- |
| General | Any number of children |
| Binary | At most two children |
| BST | Binary plus subtree ordering |
| Complete | All levels filled except possibly the last; last fills left to right |
| Full | Every node has 0 or 2 children |
| Perfect | Full with all leaves at the same level |
| Height-balanced | Child heights differ by at most 1 at every node |

These properties can overlap; they are not mutually exclusive.

Back to [Trees](README.md).
