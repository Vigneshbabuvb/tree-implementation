import { Fragment, useState } from 'react';
import './TreeNode.css';

function TreeNode({value, parent, id, onNodeAdd, onNodeEdit, onNodeDelete}) {
  const [isEditStateOn, setIsEditStateOn] = useState(false);
  const [treeNodeName, setTreeNodeName] = useState({ name: value, isValid: true});

  // Callback function for adding a node
  // @params:: id - The target node ID where the new child to be added
  const addNodeCallback = (id) => {
    onNodeAdd.call(this, id);
  }

  // Callback function for adding a node
  // @params:: id - The target node ID to be deleted
  // parent - The ID of the target node's parent
  const deleteNodeCallback = (id, parent) => {
    onNodeDelete.call(this, id, parent);
  }

  // Form submit handler for node name modify form
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if(treeNodeName.isValid) {
      setIsEditStateOn(false);
      onNodeEdit.call(this, id, treeNodeName.name);
    }
  }

  // Input change handler for input field modify in node name modify form
  const inputChangeHandler = (event) => {
    let isFieldValid = true;
    if(event.target.value === '') {
      isFieldValid = false;
    }
    setTreeNodeName({ name: event.target.value, isValid: isFieldValid });
  }

  // Cancel click handler. When entered field name is empty revert to previous state
  const cancelClickHandler = () => {
    if(!treeNodeName.isFieldValid){
      setTreeNodeName({ name: value, isValid: true });
    }
    setIsEditStateOn(false)  
  }

  const renderInputField = () => {
    return (
      <form className='d-flex align-items-center grid-gap-10' onSubmit={formSubmitHandler}>
        <input type="text" name="treenodevalue" className={`form-control ${treeNodeName.isValid ? ``: `is-invalid`}`} onChange={inputChangeHandler} value={treeNodeName.name}></input>    
        <div className='d-flex align-items-center grid-gap-10'>
          <button type="submit" className="btn btn-sm btn-success"><i className='fa fa-check'></i></button>
          <button type="button" onClick={cancelClickHandler} className='btn btn-sm btn-danger'><i className='fa fa-times'></i></button>
        </div>
      </form>
    )
  }

  return (
    <div className="Tree-node">
      { isEditStateOn ? renderInputField() : ( 
        <Fragment>
          <div className="Tree-node-name">{value}</div>
          <div className="Tree-node-action-btns">
            <button className='btn btn-sm btn-success' onClick={addNodeCallback.bind(this, id)} type="button"><i className='fa fa-plus'></i></button>
            <button className='btn btn-sm btn-secondary' onClick={() => setIsEditStateOn(true)} type="button"><i className='fa fa-pencil'></i></button>
            <button className='btn btn-sm btn-danger' onClick={deleteNodeCallback.bind(this, id, parent)} type="button"><i className='fa fa-trash'></i></button>
          </div>
        </Fragment>
      ) }
    </div>
  )
}

export default TreeNode;