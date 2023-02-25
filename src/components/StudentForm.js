import React, { useState, useCallback, useContext } from "react";
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 创建一个添加学生的方法
  const addStudent = useCallback(async (newStu) => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`http://localhost:1337/api/students`, {
        method: "post",
        body: JSON.stringify({ data: newStu }),
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("添加失败!");
      }

      ctx.fetchData();
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStudent = useCallback(async (id, newStu) => {
    try {
      setError(null);
      setLoading(true);
      const res = await fetch(`http://localhost:1337/api/students/${id}`, {
        method: "put",
        body: JSON.stringify({ data: newStu }),
        headers: { "Content-type": "application/json" },
      });

      if (!res.ok) {
        throw new Error("修改失败!");
      }

      ctx.fetchData();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, []);

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
    addStudent(inputData);
  };

  const updateHandler = () => {
    updateStudent(props.stuId, inputData);
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
