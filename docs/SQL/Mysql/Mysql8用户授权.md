MySql8有新的安全要求，不能像之前的版本那样一次性创建用户并授权需要先创建用户，再进行授权操作
创建新用户：
create user 'username'@'host' identified by 'password';

其中username为自定义的用户名；host为登录域名，host为'%'时表示为 任意IP，为localhost时表示本机，或者填写指定的IP地址；paasword为密码

为用户授权：
```sql
grant all privileges on *.* to 'username'@'%' with grant option;
```
其中*.*第一个*表示所有数据库，第二个*表示所有数据表，如果不想授权全部那就把对应的*写成相应数据库或者数据表；username为指定的用户；%为该用户登录的域名

授权之后刷新权限：
```sql
flush privileges;
```

撤销授权
```sql
#收回权限(不包含赋权权限)
REVOKE ALL PRIVILEGES ON *.* FROM user_name;
REVOKE ALL PRIVILEGES ON user_name.* FROM user_name;
#收回赋权权限
REVOKE GRANT OPTION ON *.* FROM user_name;
```

操作完后重新刷新权限

```sql
flush privileges;
```