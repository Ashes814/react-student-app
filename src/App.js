import React, { useState, useEffect, useCallback } from "react";
import StudentList from "./components/StudentList";
import StuContext from "./store/StuContext";
import "./App.css";
import useFetch from "./hooks/useFetch";
function App() {
  const {
    loading,
    data: stuData,
    error,
    fetchData,
  } = useFetch({ url: "http://localhost:1337/api/students" });

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
