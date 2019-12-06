export function treeToText(array)
{
  var tJSON = {
    jsTree: Array,
    jsonTree: JSON
  }

  tJSON.jsTree = ["tree", array]
  tJSON.jsonTree = JSON.stringify(tJSON.jsTree)
  return tJSON
}

export function textToTree(string)
{
  var tJSON = {
    jsTree: Array,
    jsonTree: JSON
  }
  tJSON.jsonTree = string
  tJSON.jsTree = JSON.parse(string)
  return tJSON
}