export function treeToText(array)
{
  const tJSON = {
    jsTree: ["tree", array],
    jsonTree: JSON.stringify(["tree", array])
  }

  return tJSON
}

export function textToTree(string)
{
  const tJSON = {
    jsTree: string,
    jsonTree: JSON.parse(string)
  }
  return tJSON
}