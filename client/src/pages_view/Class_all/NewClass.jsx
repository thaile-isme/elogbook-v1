
import "./newUser.css";

import { useContext, useState } from 'react'
import { ClassContext } from '../../contexts/ClassContext'
import React from "react";


export default function newClass() {
	// Contexts
	const {
		showAddClassTable,
		setShowAddClassTable,
		addClass,
		setShowToast
	} = useContext(ClassContext)

	// State
	const [newClass, setNewClass] = useState({
		username: '',
		password: '',
		fullname: '',
		phone:"",
    school:"",
    id:"",
    role:"class"
	})
  
	const { username,password,fullname,phone,school,id} = newClass

	const onChangeNewClassForm = event =>
		setNewClass({ ...newClass, [event.target.name]: event.target.value })

	const closeDialog = () => {
		resetAddClassData()
	}

	const onSubmit = async event => {
		event.preventDefault()
		const { success, message } = await addClass(newClass)
		resetAddClassData()
		setShowToast({ show: true, message, type: success ? 'success' : 'danger' })
	}

	const resetAddClassData = () => {
		setNewClass({ username:"",password:"",fullname:"",phone:"",school:"",id:"" })
		setShowAddClassTable(false)
	}
  return (
    <div className="newUser">
      <h1 className="newUserTitle">New Class</h1>
      <form className="newUserForm" onSubmit={onSubmit}>
        <div className="newUserItem">
          <label>Username</label>
          <input 
                      type="text"
                      placeholder="Username"
                      name="username"
                      required
                      value={username}
                      onChange={onChangeNewClassForm} />
        </div>
        <div className="newUserItem">
          <label>Full Name</label>
          <input 
                                type="text"
                                placeholder="Nguyen Tan Thanh Giang"
                                name="fullname"
                                required
                                value={fullname}
                                onChange={onChangeNewClassForm} />
        </div>
        <div className="newUserItem">
          <label>Password</label>
          <input 
                                type="text"
                                placeholder="Password"
                                name="password"
                                required
                                value={password}
                                onChange={onChangeNewClassForm}/>
        </div>
        <div className="newUserItem">
          <label>Phone</label>
          <input 
                                type="text"
                                placeholder="0364002059"
                                name="phone"
                                required
                                value={phone}
                                onChange={onChangeNewClassForm} />
        </div>
        <div className="newUserItem">
          <label>School</label>
          <input 
                                type="text"
                                placeholder="TPMS"
                                name="school"
                                required
                                value={school}
                                onChange={onChangeNewClassForm} />
        </div>
        <div className="newUserItem">
          <label>ID</label>
          <input 
                                type="text"
                                placeholder="001"
                                name="id"
                                required
                                value={id}
                                onChange={onChangeNewClassForm} />
        </div>
        <div>
          
        </div>
        <button className="newUserButton">Create</button>
      </form>
      
    </div>
  );
}