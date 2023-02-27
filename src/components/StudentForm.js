import React, { useState, useCallback, useContext } from "react";
import useFetch from "../hooks/useFetch";
import StuContext from "../store/StuContext";
import "./StudentForm.css";

export default function StudentForm(props) {
  const [inputData, setInputData] = useState({
    name: props.stu ? props.stu.name : "只因",
    gender: props.stu ? props.stu.gender : "男",
    age: props.stu ? props.stu.age : 8848,
    address: props.stu ? props.stu.address : "高老庄",
  });

  const ctx = useContext(StuContext);

  const {
    loading,
    error,
    fetchData: updateStudent,
  } = useFetch(
    {
      url: props.stuId
        ? `http://localhost:1337/api/students/${props.stuId}`
        : "http://localhost:1337/api/students",
      method: props.stuId ? "put" : "post",
      body: inputData,
    },
    ctx.fetchData
  );

  const nameChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, name: e.target.value }));
  };
  const ageChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, age: +e.target.value }));
  };
  const genderChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, gender: e.target.value }));
  };
  const addressChangeHandler = (e) => {
    setInputData((prevState) => ({ ...prevState, address: e.target.value }));
  };

  const submitHandler = () => {
    updateStudent(inputData);
  };

  const updateHandler = () => {
    updateStudent(inputData);
  };
  return (
    <>
      <tr className="student-form">
        <td>
          <input
            type="text"
            onChange={nameChangeHandler}
            value={inputData.name}
          />
        </td>
        <td>
          <select onChange={genderChangeHandler} value={inputData.gender}>
            <option value="男">男</option>
            <option value="女">女</option>
          </select>
        </td>
        <td>
          <input
            type="text"
            onChange={ageChangeHandler}
            value={inputData.age}
          />
        </td>
        <td>
          <input
            type="text"
            onChange={addressChangeHandler}
            value={inputData.address}
          />
        </td>
        <td>
          {props.stu ? (
            <>
              <button onClick={() => props.onCancel()}>取消修改</button>{" "}
              <button onClick={() => updateHandler()}>确认修改</button>
            </>
          ) : (
            <button onClick={submitHandler}>添加</button>
          )}
        </td>
      </tr>

      {loading ? (
        <tr>
          <td colSpan={5}>添加中...</td>
        </tr>
      ) : (
        ""
      )}
      {error ? (
        <tr colSpan={5}>
          <td colSpan={5}>添加失败!</td>
        </tr>
      ) : (
        ""
      )}
    </>
  );
}
