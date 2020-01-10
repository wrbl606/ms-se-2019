import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';
import { generateTree } from '../tree/generation';
import { FunctionSelectionState } from '../reducers/appReducer';
import { joinManyFunctions, treeToGraph } from '../tree/modification';

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
    console.log(JSON.stringify(tree))
    // join all enabled modification functions to one
    const enabledFunctions = functions.filter((f) => f.selectionState !== FunctionSelectionState.DISABLED);
    const modificationFunction = joinManyFunctions(enabledFunctions);
    // modify tree
    // TODO
    // convert tree to graph data
    console.log(JSON.stringify(treeToGraph(tree), null, 2));
    return treeToGraph(tree);
  }

  return (
    <main className = {
      classes.content
    }>
      <div className = {
        classes.toolbar
      }/> 
      <Tree 
        data={calcData()}
        nodeRadius={15}
        nodeOffset={-2}
        width={levelsCount * 150}
        height={Math.pow(verticesCount, levelsCount - 1) * 45}
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