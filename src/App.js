import React, { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import "./App.css";
function App() {
  const [stuData, setStuData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/api/students")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // 将加载到的数据设置到state中
        setStuData(data.data);
      })
      .catch(() => {});
  });
  return (
    <div className="app">
      <StudentList stus={stuData} />
    </div>
  );
}

export default App;
