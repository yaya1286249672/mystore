<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/3/31
 * Time: 14:04
 */


/**
 * Created by PhpStorm.
 * 主要负责用户登录业务的处理
 * 1.获取表单提交的账号+密码【POST】
 * 2.定义SQL语句，发送SQL语句查询数据库
 * 3.判断是否查询到结果，并根据结果返回给前端处理结果{"login":"", "msg":""}
 */
$un = $_POST["uname"];
$ps = $_POST["psw"];
$conn = new mysqli("localhost","root","root","myshop",3308);
$sql = "select * from users";
$res = $conn -> query($sql);
$sql5 = "select * from users where username = '$un'";
$res5 = $conn->query($sql5);

if($res5->num_rows == 1){
    echo '{"regist":false,"msg":"用户名重复"}';
}else{
    $sql5 = "insert into users(username, userpass) values('$un','$ps')";
    $res5= $conn->query($sql5);
    if($res5 === true) {
        echo "数据插入成功";
    } else {
        echo "数据插入失败";
    }
}