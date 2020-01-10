import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import { generateTree } from '../tree/generation';
import { FunctionSelectionState } from '../reducers/appReducer';
import { joinManyFunctions } from '../tree/modification';

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}))


function TreeView(props) {
  const classes = useStyles();
  const {
    functions,
    verticesCount,
    levelsCount
  } = props;

  function calcData() {
    // create base tree
    const tree = generateTree(levelsCount, verticesCount);
    // join all enabled modification functions to one
    const enabledFunctions = functions.filter((f) => f.selectionState !== FunctionSelectionState.DISABLED);
    const modificationFunction = joinManyFunctions(enabledFunctions);
    // modify tree
    // TODO
    // convert tree to graph data
    return treeToGraph(tree);
  }

  function treeToGraph(tree = [3, [1, 2]]) {
    const data = getChildren(tree);
    return data;
  }

  function getChildren(tree = [3, [1, 2]]) {
    const children = [];
    const name = `${tree[0]}`;

    if (Array.isArray(tree[1][1])) {
      for (let i = 1; i < tree.length; i++) {
        children.push(getChildren(tree[i]));
      }
    } else {
      for (let i = 0; i < tree[1].length; i++) {
        children.push({ name: `${tree[1][i]}` });
      }
    }

    return {
      name,
      children,
    };
  }

  return (
    <main className = {
      classes.content
    }>
      <div className = {
        classes.toolbar
      }/> 
      <Tree 
        // data={treeToGraph([15,[13,[3,[1,2]],[6,[4,5]]],[14,[9,[7,8]],[12,[10,11]]]])}
        data={calcData()}
        nodeRadius={15}
        nodeOffset={-2}
        width={levelsCount * verticesCount * 100}
        height={levelsCount * verticesCount * 300}
        margins={{
          bottom: 20,
          top: 20,
          right: 30,
          left: 30
        }}
        textProps={{
          className: 'graph-text'
        }}/>
    </main> 
  );
}
const mapStateToProps = (state) => {
  return {
    functions: state.functions,
    levelsCount: state.levelsCount,
    verticesCount: state.verticesCount,
  }
}

const TreeViewWithState = connect(
  mapStateToProps,
)(TreeView)
export default TreeViewWithState