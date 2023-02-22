import React, { useState, useEffect, useCallback } from "react";
import StudentList from "./components/StudentList";
import StuContext from "./store/StuContext";
import "./App.css";
function App() {
  const [stuData, setStuData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    // 设置loading为正在加载true
    setLoading(true);
    fetch("http://localhost:1337/api/students")
      .then((res) => {
        // 判断响应是否正常返回
        if (res.ok) {
          return res.json();
        }

        // 代码运行到此处,说明没有成功加载到数据
        setLoading(false);

        throw new Error("数据加载失败!!");
      })
      .then((data) => {
        // 将加载到的数据设置到state中
        setStuData(data.data);

        // 数据加载完毕
        setLoading(false);
      })
      .catch((e) => {
        // catch 一执行,说明上述代码执行出错
        setLoading(false);

        // 设置一个错误状态
        setError(e.message);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const loadDataHandler = () => {
    fetchData();
  };

  return (
    <StuContext.Provider value={{ fetchData }}>
      <div className="app">
        <button onClick={loadDataHandler}>加载数据</button>
        {!loading && !error && <StudentList stus={stuData} />}
        {loading ? "数据正在加载中" : ""}
        {error && <p>error</p>}
      </div>
    </StuContext.Provider>
  );
}

export default App;
