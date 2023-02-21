import React, { useState, useEffect } from "react";
import StudentList from "./components/StudentList";
import "./App.css";
function App() {
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 设置loading为正在加载true
    setLoading(true);
    fetch("http://localhost:1337/api/students")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // 将加载到的数据设置到state中
        setStuData(data.data);

        // 数据加载完毕
        setLoading(false);
      })
      .catch(() => {});
  }, []);
  return (
    <div className="app">
      {!loading && <StudentList stus={stuData} />}
      {loading ? "数据正在加载中" : ""}
    </div>
  );
}

export default App;
