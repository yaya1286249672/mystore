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
$sql4 = "select * from users where username = '$un' and userpass = '$ps'";
$res4 = $conn->query($sql4);

if($res4->num_rows == 1){
    echo '{"login":true,"msg":"登录成功"}';
}else{
    echo '{"login":false,"msg":"登录失败"}';
}