# Haba

## 1. _swap_ function
  takes three arguments: the tree in which we want to conduct the swapping operation, the first node (as list of arguments, which are this node's coordinates) and the second node (just like the first one) (You always swap just two branches, swapping of more elements can always be divided into combination of swapping just two elements at the time)
  
    1. if the nodes are the same  - don't change the tree. Just return it. Skip the rest of the function.
    2. if both nodes passed as arguments have *different* parents:
        1. print "Different parents! Cannot swap." to screen
        2. return tree
        3. skip rest of the function
        
    (now comes the tricky part - recursion)
    if the first coordinate is the same for both nodes
        swap(tree[first_node[first coordinate]], first_node[enter the "first node's tree" at first coordinate], second_node[enter the "second node's tree" at first coordinate])
    else:
        a = first_node[second_to_last_coordinate] 
        b = second_node[second_to_last_coordinate]
        tree[a], tree[b] = tree[b], tree[a] (this is an actual swap of the nodes)
        return tree
