import React from 'react';
import { connect } from 'react-redux';
import {
  makeStyles
} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { setVerticesCount, setLevelsCount } from '../actions/appActions';

const drawerWidth = 650;
const useStyles = makeStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth
  },
});

function NavBar(props) {
  const classes = useStyles();
  const {
    verticesCount,
    levelsCount,
    store,
    onVerticesCount,
    onLevelsCount
  } = props;

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
    }

  function onDownload(jsonData){
    download(JSON.stringify(jsonData), "placeholder.json", "text/json");
  }

  function onUpload() {
    const inp = document.createElement("INPUT");
    inp.type = "file";
    inp.id = "selectFiles";
    inp.innerHTML = "Import";
    document.body.appendChild(inp);
    document.body.appendChild(document.createElement("BR"));

    const but = document.createElement("BUTTON");
    but.id = "import";
    but.innerHTML = "Import";
    document.body.appendChild(but);
    document.body.appendChild(document.createElement("BR"));

    const ta = document.createElement("TEXTAREA");
    ta.id = "result";
    document.body.appendChild(ta);
    document.body.appendChild(document.createElement("BR"));

    but.onclick = function() {
      var files = inp.files;
      console.log(files);
      if (files.length <= 0) {
        return false;
      }
      
      var fr = new FileReader();
      
      fr.onload = function(e) { 
      console.log(e);
        var result = JSON.parse(e.target.result);
        var formatted = JSON.stringify(result, null, 2);
        ta.value = formatted;
      }
      
      fr.readAsText(files.item(0));
    };
  }

  function onNew() {
    const vertices = parseInt(prompt('Liczba rozgałęzień: ', '3'));
    if (isNaN(vertices)) {
      alert('Niepoprawna liczba rozgałęzień');
      return;
    }
    const levels = prompt('Liczba poziomów', '3');
    if (isNaN(levels)) {
      alert('Niepoprawna liczba poziomów');
      return;
    }

    onVerticesCount(vertices);
    onLevelsCount(levels);
  }

  return (
    <AppBar position = 'fixed'
      className = {
        classes.appBar
      }
      elevation = {
        0
      }>
      <Toolbar>
        <Button color = 'inherit'
          onClick = {
            function (){
              onUpload({a: 123, b: "4 5 6"})
          }
        }
        style = {
          {
            alignSelf: 'right'
          }
        }>
          Otwórz 
        </Button>
        <Button color = 'inherit'
          onClick = {
            function (){
              onDownload({a: 123, b: "4 5 6"})
          }
        }
        style = {
          {
            alignSelf: 'right'
          }
        }>
          Zapisz
        </Button>
        <Button 
          color = 'inherit'
          onClick = {onNew}
          style = {
            {
              alignSelf: 'right'
            }
          }
        >
          Nowy
        </Button>
      </Toolbar>
    </AppBar>)
}

const mapStateToProps = (state) => {
  return {
    levelsCount: state.levelsCount,
    verticesCount: state.verticesCount,
    store: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onVerticesCount: (verticesCount) => {
      dispatch(setVerticesCount(verticesCount));
    },
    onLevelsCount: (levelsCount) => {
      dispatch(setLevelsCount(levelsCount));
    },
  };
}

const NavBarWithState = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar)
export default NavBarWithState
