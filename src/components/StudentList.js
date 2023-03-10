import React from "react";
import Student from "./Student";
import StudentForm from "./StudentForm";
import "./StudentList.css";

export default function StudentList(props) {
  return (
    <table>
      <caption>学生列表</caption>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>年龄</th>
          <th>地址</th>
          <th>操作</th>
        </tr>
      </thead>

      <tbody>
        {props.stus.map((stu) => (
          <Student key={stu.id} stu={stu.attributes} stuId={stu.id} />
        ))}
      </tbody>

      <tfoot>
        <StudentForm />
      </tfoot>
    </table>
  );
}
