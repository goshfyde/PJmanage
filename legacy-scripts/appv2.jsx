import React from 'react';
import FolderStructure from './modules/FolderStructure.jsx';

function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}


let folderRoots = [{
  name: 'Projects',
  contents: [{name: 'pj1', key: 1},{name: 'pj2', key: 2},{name: 'pj3', key: 3}],
  selectStatus: 0,
  selectionMap: [],
  key: generateUUID()
},{
  name: 'Employees',
  contents: [{name: 'em1', key: 1},{name: 'em2', key: 2},{name: 'em3', key: 3},{name: 'em4', key: 4}],
  selectStatus: 0,
  selectionMap: [],
  key: generateUUID()
},{
  name: 'Contacts',
  contents: [{name: 'co1', key: 1},{name: 'co2', key: 2}],
  selectStatus: 0,
  selectionMap: [],
  key: generateUUID()
},{
  name: 'Archive',
  contents: [{name: 'ar1', key: 1},{name: 'ar2', key: 2},{name: 'ar3', key: 3},{name: 'ar4', key: 4},{name: 'ar5', key: 5}],
  selectStatus: 0,
  selectionMap: [],
  key: generateUUID()
}];

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      selected: null
    };
  }

  selectFolderRoot(event){
    if(event.target.getAttribute('class') === 'liSpan'){
      this.props.folderRoots.forEach((folder) => {//
        folder.selectStatus = 0;// CHOPPING BLOCK!!!!
      });//

      let reactId = event.target.parentNode.dataset.reactid;
      let objKey = reactId.substring(reactId.indexOf("$")+1);
      let selectedObj = this.props.folderRoots.find((folderRoot) => {
        if(folderRoot.key === objKey){//
          folderRoot.selectStatus = 1;// feature on chopping block!!!!
        }//
        return folderRoot.key === objKey;
      });

      this.setState({
        selected: selectedObj
      });
    }
  }

  componentDidUpdate(){
    //console.log(this.state.selected);
    //console.log(this.props.folderRoots);
  }

  render(){
    return(
      <div>
        <div className = 'col-xs-12'>
          <input id = 'folderSearch' type = 'text'></input>
        </div>
        <div id = 'folderHousing'>
          <div id = 'folderRoots' className = 'col-xs-3'>
            <ul onClick = {this.selectFolderRoot.bind(this)}>
              {
                this.props.folderRoots.map((folderRoot) => {
                  return <li key = {folderRoot.key}><span className = 'liSpan'>{folderRoot.name}</span></li>
                })
              }
            </ul>
          </div>
          <FolderStructure selectedRoot = {this.state.selected}/>
        </div>
      </div>
    );
  }
}

React.render(<App folderRoots = {folderRoots}/>, document.getElementById('app'));
