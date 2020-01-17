import React from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core'
import Tree from 'react-tree-graph'
import 'react-tree-graph/dist/style.css'
import { generateTree } from '../tree/generation'
import { FunctionSelectionState } from '../reducers/appReducer'
import { setTreeGenerationError } from '../actions/appActions'
import { joinManyFunctions, treeToGraph, findIndex } from '../tree/modification'
import { newSwap } from '../tree/swap'

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  }
}))

function TreeView (props) {
  const classes = useStyles()
  const {
    functions,
    verticesCount,
    levelsCount,
    onTreeGenerationError
  } = props

  function calcData () {
    // create base tree
    let tree = generateTree(levelsCount, verticesCount)
    onTreeGenerationError('')
    // join all enabled modification functions to one
    const enabledFunctions = functions.filter((f) => f.selectionState !== FunctionSelectionState.DISABLED)
    if (enabledFunctions.length < 1) {
      return treeToGraph(tree)
    }
    const modificationFunction = joinManyFunctions(enabledFunctions)
    // modify tree
    for (const level of Object.keys(modificationFunction.levels)) {
      const levelFunction = modificationFunction.levels[level].filter((element) => element !== '')
      if (levelFunction.length < 2) {
        // no changes to make
        continue
      }
      for (let i = 0; i < levelFunction.length - 1; i++) {
        const labelFrom = levelFunction[i]
        const labelTo = levelFunction[i + 1]

        if (labelFrom === labelTo) {
          continue
        }

        const labelFromAddress = findIndex(labelFrom, tree)
        const labelToAddress = findIndex(labelTo, tree)
        if (!labelFromAddress) {
          onTreeGenerationError(`${labelFrom} was not found`)
          continue
        }
        if (!labelToAddress) {
          onTreeGenerationError(`${labelTo} was not found`)
          continue
        }
        try {
          tree = newSwap(tree, labelFromAddress, labelToAddress)
        } catch (e) {
          // onTreeGenerationError(`Error while switching ${labelFrom} and ${labelTo} on level ${level}: ${e}`)
          continue
        }
      }
    }
    // convert tree to graph data
    return treeToGraph(tree)
  }

  return (
    <main className={
      classes.content
    }>
      <div className={
        classes.toolbar
      } />
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
        }} />
    </main>
  )
}
const mapStateToProps = (state) => {
  return {
    functions: state.functions,
    levelsCount: state.levelsCount,
    verticesCount: state.verticesCount
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTreeGenerationError: (error) => {
      dispatch(setTreeGenerationError(error))
    }
  }
}

const TreeViewWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(TreeView)
export default TreeViewWithState
