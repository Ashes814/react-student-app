import React, { useState, Fragment, useContext } from "react";
import useFetch from "../hooks/useFetch";
import StuContext from "../store/StuContext";
import StudentForm from "./StudentForm";

const Student = (props) => {
  // {stu:{name, age, gender, address}} = props
  const [isEdit, setIsEdit] = useState(false);

  const ctx = useContext(StuContext);

  const {
    loading: deleting,
    error,
    fetchData: deleteStu,
  } = useFetch(
    {
      url: `http://localhost:1337/api/students/${props.stuId}`,
      method: "delete",
    },
    ctx.fetchData
  );

  const deleteHandler = () => {
    deleteStu();
  };

  const cancelEdit = () => {
    setIsEdit(false);
  };

  // console.log(setIsEdit);
  return (
    <Fragment>
      {!isEdit ? (
        <tr>
          <td>{props.stu.name}</td>
          <td>{props.stu.gender}</td>
          <td>{props.stu.age}</td>
          <td>{props.stu.address}</td>
          <td>
            <button onClick={deleteHandler}>删除</button>
            <button
              onClick={() => {
                setIsEdit(true);
              }}
            >
              修改
            </button>
          </td>
        </tr>
      ) : (
        <StudentForm
          stu={props.stu}
          stuId={props.stuId}
          onCancel={cancelEdit}
        />
      )}

      {deleting && (
        <tr>
          <td colSpan={5}>数据正在删除</td>
        </tr>
      )}
      {error && (
        <tr>
          <td colSpan={5}>删除失败</td>
        </tr>
      )}
    </Fragment>
  );
};

export default Student;
