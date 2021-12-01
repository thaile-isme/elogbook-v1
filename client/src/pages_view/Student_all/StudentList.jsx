import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { students } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { StudentContext } from '../../contexts/StudentContext'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect } from 'react'
// import Spinner from 'react-bootstrap/Spinner'
import addIcon from "../../assets/plus-circle-fill.svg"
import Button from 'react-bootstrap/Button'
// import Toast from 'react-bootstrap/Toast'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
// import Col from 'react-bootstrap/Col'
import ActionButtons from "./ActionButtons";

export default function StudentList() {
	// Contexts
	// const {
	// 	authState: {
	// 		user: { username }
	// 	}
	// } = useContext(AuthContext)

	// const {
	// 	studentState: { student, students, studentsLoading },
	// 	getStudents,
	// 	setShowAddStudentTable,
	// 	showToast: { show, message, type },
	// 	setShowToast
	// } = useContext(StudentContext)

	// useEffect(() => getStudents(), [])
  
  const [data, setData] = useState(students);
  

  const [single,setSingle]=useState(students)

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  const handleChoose = (id) => {
    setSingle(single.filter((item) => item.id === id));
  };

  const columns = [
    { field: "id", headerName: "ID"},
    { field: "username", headerName: "Username", width: 200 },
    { field: "name", headerName: "Fullname", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "class", headerName: "class", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          // <>
          //   <ActionButtons id={params.row.id}/>
          // </>
          <>
          <Link to={"/student/" + params.row.id}>
          {/* <Link to="/students/"> */}
          <button className="ListEdit" onClick={()=>handleChoose(params.row.id)}>Edit</button>
        </Link>
        <DeleteOutline
          className="ListDelete"
          onClick={() => handleDelete(params.row.id)}
          // onClick={()=>handleChoose(params.row.id)}
          />
          </>
        );
      },
    },
  ];
  return (
    <>
    <div className="userList">
      <DataGrid
        getRowId={(r)=>r.id}
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />   
    <div>
    <OverlayTrigger
					placement='left'
					overlay={<Tooltip>Add new student</Tooltip>}
				>
       <Link to={"/newstudent"}>
					<Button 
						className='btn-floating' style={{"z-index":-1}}
					>
						<img src={addIcon} alt='add-post' width='60' height='60' />
					</Button>
          </Link>
				</OverlayTrigger>
    </div>
    </div>
</>
  );
}