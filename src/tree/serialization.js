export function treeToText(array)
{
  return "{\"tree\" : " + JSON.stringify(array) + "}"
}

export function textToTree(string)
{
  return JSON.parse(string)
}