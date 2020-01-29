import React from 'react';
import { connect } from 'react-redux';
import {
  makeStyles
} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { setVerticesCount, setLevelsCount, setStore, setFunctions } from '../actions/appActions';
import Canvg from 'canvg';
import { Document as DocxDocument, Media as DocxMedia, Paragraph as DocxParagraph, Packer as DocxPacker } from 'docx'
import { Typography } from '@material-ui/core';

const drawerWidth = 650;
const useStyles = makeStyles({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginRight: drawerWidth
  },
  exportLabel: {
    marginLeft: '1em',
  },
  exportButton: {
    fontSize: '.7em',
    fontWeight: 'bold',
    marginLeft: '.3em',
  }
});

function NavBar(props) {
  const classes = useStyles();
  const {
    levelsCount,
    verticesCount,
    store,
    onVerticesCount,
    onLevelsCount,
    onNewStore,
    clearFunctions
  } = props;

  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function onDownload(){
    download(JSON.stringify(store), `tree-${new Date().toISOString()}.tree`, "text/json");
  }

  function onUpload() {
    const inp = document.createElement("INPUT");
    inp.type = "file";
    inp.id = "selectFiles";
    inp.innerHTML = "Import";
    inp.accept = ".tree";
    inp.style.display = 'none';
    document.body.appendChild(inp);
    document.body.appendChild(document.createElement("BR"));

    inp.click();
    inp.onchange = () => {
      const but = document.createElement("BUTTON");
      but.id = "import";
      but.innerHTML = "Import";
      but.style.display = 'none';
      document.body.appendChild(but);
      document.body.appendChild(document.createElement("BR"));

      but.onclick = function() {
        const files = inp.files;
        if (files.length <= 0) {
          return false;
        }
        
        const fr = new FileReader();
        
        fr.onload = function(e) {
          const result = JSON.parse(e.target.result);
          onNewStore(result);
        }
        
        fr.readAsText(files.item(0));
      };

      but.click();
    }
  }

  function onNew() {
    const vertices = parseInt(prompt('Liczba rozgałęzień:\nMinimum 2.', '3'));
    if (isNaN(vertices) || vertices <= 1) {
      alert('Niepoprawna liczba rozgałęzień.\nMinimum 2.');
      return;
    }
    const levels = parseInt(prompt('Liczba poziomów:\nMinimum 2.', '3'));
    if (isNaN(levels) || levels <= 1) {
      alert('Niepoprawna liczba poziomów.\nMinimum 2.');
      return;
    }

    clearFunctions();
    onVerticesCount(vertices);
    onLevelsCount(levels);
  }

  function createSvg() {
    const treeSvg = document.querySelector('#tree svg');
    return treeSvg.outerHTML
      .replace(/class="link"/ig, 'fill="transparent" stroke="black"')
      .replace(/<circle/ig, '<circle fill="white" stroke="black"')
      .replace(/class="graph-text"/ig, 'fill="black"');
  }

  function exportSvg() {
    download(createSvg(), "tree.svg", "text/svg");
  }

  function createPng() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const v = Canvg.fromString(ctx, createSvg());
    v.start();
    return canvas.toDataURL('image/png')
  }

  function exportPng() {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const v = Canvg.fromString(ctx, createSvg());
    v.start();
    canvas.toBlob((blob) => {
      download(blob, 'tree.png', 'image/png');
    });
  }

  async function exportPdf() {
    const png = createPng();
    /*eslint-disable */
    const doc = new PDFDocument();
    const stream = doc.pipe(blobStream());

    doc.image(png, {
      fit: [500, 700], // A4 paper size in points
      align: 'center',
      valign: 'center'
    });

    doc.end();
    stream.on('finish', () => {
      const blob = stream.toBlob('application/pdf');
      download(blob, 'tree.pdf', 'application/pdf');
    });
    /*eslint-enable */
  }

  function createResponsiveImage(doc, image, imageSize) {
    const { width, height } = imageSize
    let scale = 1;
    if (width > height) {
      const docWidth = 600;
      scale = width / docWidth;
    } else {
      const docHeight = 1000;
      scale = height / docHeight;
    }

    if (scale > 1) {
      return DocxMedia.addImage(doc, image, (width / scale), (height / scale));
    } else {
      return DocxMedia.addImage(doc, image, width, height);
    }
  }

  function treeSize() {
    return {
      width: levelsCount * 150,
      height: Math.pow(verticesCount, levelsCount - 1) * 45
    }
  }

  function exportDocx() {
    const png = createPng();
    const doc = new DocxDocument();
    const image = createResponsiveImage(doc, png, treeSize());
    doc.addSection({
      children: [new DocxParagraph(image)]
    })
    DocxPacker.toBlob(doc).then((blob) => {
      download(blob, 'tree.docx', 'file/docx')
    });
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
        <Button 
          color='inherit'
          onClick={onNew}
          style={{ alignSelf: 'right'}}>
          Nowy
        </Button>
        <Button 
          color='inherit'
          onClick = {onUpload}
          style = {{ alignSelf: 'right'}}>
          Otwórz 
        </Button>
        <Button 
          color='inherit'
          onClick={onDownload}
          style = {{ alignSelf: 'right'}}>
          Zapisz
        </Button>
        <Typography variant='button' className={classes.exportLabel}>
          Eksport:
        </Typography>
        <Button 
          color='inherit'
          onClick={exportSvg}
          variant='outlined'
          className={classes.exportButton}
          style={{ alignSelf: 'right' }}>
          SVG
        </Button>
        <Button 
          color='inherit'
          onClick={exportPng}
          variant='outlined'
          className={classes.exportButton}
          style={{ alignSelf: 'right' }}>
          PNG
        </Button>
        <Button 
          color='inherit'
          onClick={exportPdf}
          variant='outlined'
          className={classes.exportButton}
          style={{ alignSelf: 'right' }}
        >
          PDF
        </Button>
        <Button 
          color='inherit'
          onClick={exportDocx}
          variant='outlined'
          className={classes.exportButton}
          style={{ alignSelf: 'right' }}
        >
          DOCX
        </Button>
        <canvas style={{ display: 'none' }}></canvas>
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
    clearFunctions: () => {
      dispatch(setFunctions([]))
    },
    onNewStore: (store) => {
      dispatch(setStore(store));
    },
  };
}

const NavBarWithState = connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavBar)
export default NavBarWithState
