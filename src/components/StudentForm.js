import React, { useState, useCallback, useContext } from "react";
import StuContext from "../store/StuContext";
import "./StudentForm.css";

export default function StudentForm() {
  const [inputData, setInputData] = useState({
    name: "猪八戒",
    gender: "男",
    age: 18,
    address: "高老庄",
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
          <button onClick={submitHandler}>添加</button>
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
