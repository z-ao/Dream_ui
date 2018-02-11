## 通知框
### 使用
引入当前目录的index.js文件,   
执行Vue.use(Notification)后,   
组件会绑定Vue原型的$notify属性上,   
直接调用$notify方法传入对应的参数即可.  
### 参数
**传入一个对象，通过对象的属性而自定义通知框** 
  
|属性名    |      含义        | 类型   | 默认值  | 选项 |
| ------- |:---------------:|:------:|:------:|:----|
|title    |    提示框标题     | String |        | 可选 | 
|content  |    提示框内容     | String |        | 可选 |
|type     |    类型          | String |        |[success, warning, info, error]|
|duration |    延时关闭时间   | Number | 4500   | 可选 |
|AutoGone |    自动消失      | String  | true   | 可选 |
|position |    出现的位置    | String  |top-left| 可选 |
|click    |   点击提示框事件  |function|  null  | 可选 |
|gone     |  提示框消失回调事件 |function| null   | 可选 |

### 静态方法
#### clear
在$notify属性的clear方法用于清除所有提示框.   
***param***   
cb {function} 清除的回调

### 制作思路
这组件是通过在VUE的原型上绑定方法,    
调用这方法生成的组件.

这个方法整体流程是   

1. 通过Vue扩展构造器生成通知框的构造函数NotificationConstructor.
2. 它依靠三个外部的变量(instance=>提示框,InstanceArr=>提示框集合,tag=>提示框标记).   
3. 首先遍历提示框集合,计算当前生成提示框的位置高度.
4. 处理用户传入的数据,并实例通知框的构造函数.
5. 在实例中得到DOM对象,并插入body里.
6. 将实例放入通知框集合里.   

通知框关闭的流程

通过通知框的标记,在通知框集合中清楚当前通知框.
遍历通知框集合,重置每个通知框的高度.

<p><strong style="color: red;">注意</strong></p>
因为vue是单页面的应用,   
但从当前路由跳转到另外一个路由,   
在用户理解是跳页面的,   
所以,在路由跳转时,在清除当前路由的所有提示框.   
给window绑定hashchange事件,用于清除通知框.