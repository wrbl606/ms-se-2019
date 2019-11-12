def swap2(tree, list1, list2):
    t = tree
    t1 = t
    t2 = t
    if (list1[:-1] != list2[:-1]):
        print("Different parents3")
        return tree
    for args1 in list1:
        t1 = t1[args1]
    print(t1)
    for args2 in list2:
        t2 = t2[args2]
    print(t2)
    # But how to swap branches?

    return t
