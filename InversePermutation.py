# function to find inverse permutations
def inversePermutation(arr):
    size=len(arr)
    arr2 = [0] * (size) # To store element to index mappings
    # Inserting position at their respective element in second array
    for i in range(0, size):
        arr2[arr[i] - 1] = i + 1
    print(arr2)



arr = [1,3,5,2,4]
arr2=[2, 3, 4, 5, 1]
inversePermutation(arr)
inversePermutation(arr2)