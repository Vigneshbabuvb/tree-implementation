import { useState } from 'react';
import './App.css';
import TreeNode from './components/tree-node/TreeNode';

function App() {

  let rootNode = {
    id: uuidv4(),
    value: 'Root Node',
    parent: null,
    children: []
  }

  const [localNestedTree, setLocalNestedTree] = useState(rootNode);

  // Add node callback handler
  // @params:: id - ID of the node where the new child to be added
  const addNodeHandler = (id) => {
    const tempNestedTree = JSON.parse(JSON.stringify(localNestedTree));
    let targetNode = findNode(id, tempNestedTree);
    if(targetNode) {
      const length = targetNode.children.length + 1;
      const newNode = { id: uuidv4(), value: targetNode.value + ' - child ' + length, parent: id, children: [] }
      targetNode.children.push(newNode);
      setLocalNestedTree(tempNestedTree);
    }
  }

  // Edit node callback handler
  // @params:: id - ID of the node to be edited
  // newName - The new name value to be modified in targetNode
  const editNodeHandler = (id, newName) => {
    const tempNestedTree = JSON.parse(JSON.stringify(localNestedTree));
    let targetNode = findNode(id, tempNestedTree);
    if(targetNode) {
      // Update only if values are different
      if(targetNode.value !== newName) {
        targetNode.value = newName;
        setLocalNestedTree(tempNestedTree);
      }
    }
  }

  // Delete node callback handler
  // @params:: id - ID of the node to be deleted
  // parent - ID of the node's parent
  const deleteNodeHandler = (id, parent) => {
    if(parent !== null) {
      const tempNestedTree = JSON.parse(JSON.stringify(localNestedTree));
      let targetNode = findNode(parent, tempNestedTree);
      if(targetNode) {
        const targetNodeIndex = targetNode.children.findIndex((node) => node.id === id);
        targetNode.children.splice(targetNodeIndex , 1);
        setLocalNestedTree(tempNestedTree);
      }
    }
  }

  // Helper function to find target node
  // @params:: id - target node id to be found
  // treeNode - The tree datastructure where the targetNode is present
  const findNode = (id, treeNode) => {
    if(treeNode.id === id) {
      // Return if node matched
      return treeNode;
    } else if(treeNode.children.length > 0) {
      for(let node of treeNode.children) {
        // Recursively search tree
        const targetNode = findNode(id, node);
        if(targetNode) {
          return targetNode;
        }
      }
      return;
    }
    return;
  }

  // Helper function to generate random UUID for root key
  function uuidv4() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c==='x' ? r :((r&0x3)|0x8)).toString(16);
    });
    return uuid;
  }

  function renderChildTree(treeNodeCollection) {
    return (
      <div className='pl-3'>
        <ul className='border-start border-secondary border-1'>
        { treeNodeCollection.map(node => {
          return (
            <li className='pt-3 position-relative Tree-node-list-item' key={node.id}>
              <TreeNode 
                value={node.value} 
                id={node.id} 
                parent={node.parent} 
                onNodeAdd = {addNodeHandler}
                onNodeEdit = {editNodeHandler}
                onNodeDelete = {deleteNodeHandler}
                ></TreeNode>
              { node.children.length > 0 ? renderChildTree(node.children) : null }
            </li>
          );
        })
        }
        </ul>
      </div>
    )
  }

  return (
    <div className="App">
      <div className="header d-flex align-items-center">
        <div className="container">
          <h3 className='mb-0'>Tree Implementation</h3>
        </div>
      </div>
      <div className='content'>
        <TreeNode 
          value={localNestedTree.value} 
          id={localNestedTree.id} 
          parent={localNestedTree.parent}
          onNodeAdd = {addNodeHandler}
          onNodeEdit = {editNodeHandler}
          onNodeDelete = {deleteNodeHandler}
        ></TreeNode>
        {localNestedTree.children.length > 0 ? renderChildTree(localNestedTree.children) : null}
      </div>
    </div>
  );
}

export default App;
