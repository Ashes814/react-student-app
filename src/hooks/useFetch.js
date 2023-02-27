/* 
    React中的钩子,只能在函数组件或自定义钩子中调用
        当我们需要将React中钩子函数提取到一个公共区域时,就可以使用自定义钩子(封装)

    自定义钩子其实就是一个普通函数,只是它的名字需要use开头
*/
import React, { useCallback, useEffect, useState } from "react";

// reqObj
/*
    {
        url,
        method,
        body
    }

    cb 回调函数:请求发送成功后执行

*/
export default function useFetch(reqObj, cb) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback((body) => {
    // 设置loading为正在加载true
    setLoading(true);
    fetch(reqObj.url, {
      method: reqObj.method || "get",
      headers: { "Content-type": "application/json" },
      body:
        !reqObj.method || reqObj.method.toLowerCase() === "get"
          ? null
          : JSON.stringify({ data: body }),
    })
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
        setData(data.data);
        cb && cb();

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

  return {
    loading,
    error,
    data,
    fetchData,
  };
}
