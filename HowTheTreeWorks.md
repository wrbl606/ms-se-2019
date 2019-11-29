# Tree generation and swapping operation

## 1. _swap_ function
  takes three arguments: the tree in which we want to conduct the swapping operation, the first node (as list of arguments, which are this node's coordinates) and the second node (just like the first one) (You always swap just two branches, swapping of more elements can always be divided into combination of swapping just two elements at the time)
  
    1. if the nodes are the same  - don't change the tree. Just return it. Skip the rest of the function.
    2. if both nodes passed as arguments have *different* parents:
        1. print "Different parents! Cannot swap." to screen
        2. return tree
        3. skip rest of the function
        
       (now comes the tricky part - recursion)
    3. if the first coordinate is the same for both nodes
        swap(tree[first_node[first coordinate]], first_node[enter the "first node's tree" at first coordinate], second_node[enter the "second node's tree" at first coordinate])
    else:
        1. a = first_node[second_to_last_coordinate] 
        2. b = second_node[second_to_last_coordinate]
        3. tree[a], tree[b] = tree[b], tree[a] (this is an actual swap of the nodes)
        4. return tree, end function

## 2. How many nodes are on _n_-th level
  number of _vertices_ deriving from each _node_ (except for the final leaves, for obvious reasons) raised to the _n_-th level's power  

## 3. How many nodes are there in total in the tree?
  Sum the number of nodes on each level using the function from previous point.

## 4. Tree generation
on input:
  - _n_ - number of levels;
  - _p_ - number of vertices deriving from each node (except for the final leaves, for obvious reasons)
  
  ### optimizing trivial cases
    if _n_ < 1 or _p_ < 1:
        print bad input data information to the screen at exit the function. There is no point in generating such a tree, obviously.
  
    if _n_ is equal to 1:
        Return a single _node_ with value 1, as it is the only node in the tree, fo it will always have the value of 1.
    
  ### Actual generation
    1. Creating two empty arrays: 
    - arr = [] - for holding all _nodes_ that haven't been appended to the _tree_ yet
    - tree = [] - the tree itself, pretty self-explanatory 
    2. Initiating an array of all nodes in the tree
    for i in range(totalNodes(n, p), 0, -1):
        arr.append(i)

    3. generating a layer of _leafs_ and their _parents_, by picking them up from the array from point _1._, and appending it to a tree
      1. temp = [] (temporary array that will come in handy)
      
      2. (loop iterating on the range from 0 to the number of nodes on the last level, the leaf level)
      for i in range(0, nodesOnLvl(n-1, p)):
      3. (append the temporary array with a node from the array holding all the nodes, remove that node from the array holding all the nodes.)
          temp.append(arr.pop()) 
      4. (if the number of nodes in the temporary array corresponds with _p_ (which is number of vertices deriving from each node) append those nodes to the tree and append a value next to that group of nodes - this will be their _parent_. So, to put it in layman's terms - if there are enough nodes to form a child - do so and attach a father to them)
          if ((i+1) % p == 0 and i != 0):
              tree.append([arr.pop(), temp])
              temp = [] (clearing the temporary array)

              
    4. generating higher _branches_ of the _tree_
    l = n-2 (because we've already created the first two layers in the leaf-parent generation explained above)
    for j in range(l, 0, -1): (iterating down)
        temp2 = [] (another temporary array that will come in handy)
        for i in range(0, nodesOnLvl(j, p)):
            temp2.append(tree[i])
            if ((i+1) % p == 0 and i != 0):
                temp.append([arr.pop(), temp2])
                temp2 = []
        if(nodesOnLvl(j, p) != 0):
            tree = temp
        temp = []
        (pretty self explanatory after explaining the leaf-parent generation)

    5. return tree[0]
