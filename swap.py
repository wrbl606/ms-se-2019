

# function that counts the level on which the branch lies.
def count_n(a, n=0):
    if (type([]) == type(a)):
        # This is actually counting the levels to the leaves, rather than to the trunk of the tree.
        n += 1
        n = count_n(a[-1], n)
    return (n)


# function for swapping to branches
def swap(branch1, branch2):
    # making sure both branches are on the same level. If they weren't, the operation would not make mathematical sense.
    if (count_n(branch1) != count_n(branch2)):
        print('\nBranches are not on the same level. Cannot swap.\n')
        return (branch1, branch2)
    return (branch2, branch1)

def swap2(tree, list1, list2):
    if (list1[:-1] != list2[:-1]):
        print("Different parents! Cannot swap.")
        return
    if list1[0] == list2[0]:
        swap2(tree[list1[0]], list1[1:], list2[1:])
    else:
        a, b = list1[-1], list2[-1]
        tree[a], tree[b] = tree[b], tree[a]
        return tree
