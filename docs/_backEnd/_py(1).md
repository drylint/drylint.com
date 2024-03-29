```

Python相关链接
 官网
  https://www.python.org/
 python手册：
  https://docs.python.org/3.6/tutorial/index.html
  https://docs.python.org/3.6/library/index.html
 基于pyhon的优秀的项目：
  https://github.com/vinta/awesome-python
 手册:
  https://docs.python.org/3.6/tutorial/index.html
 mySql-connector:
  https://dev.mysql.com/doc/connector-python/en/connector-python-example-cursor-transaction.html
 django的优秀资源集合：
  https://www.djangoproject.com/
  https://github.com/haiiiiiyun/awesome-django-cn
  https://github.com/wsvincent/awesome-django
 django支持的数据类型:
  https://docs.djangoproject.com/en/2.1/ref/models/fields/
 django做查询：
  https://docs.djangoproject.com/en/2.1/topics/db/queries/
 scotch.io 大量的优质的优秀项目
  https://scotch.io/tutorials/building-a-weather-app-in-django
 django的竞品项目:flask
  https://scotch.io/tutorials/build-a-crud-web-app-with-python-and-flask-part-one

Python常见错误信息；
 NameError: name 'score' is not defined #变量未定义/已被释放
 TypeError: can't multiply sequence by non-int of type 'str' #字符串不能做算术运算
 TypeError：must be str,not int #字符串和数字不能拼接，没有隐式转换
 TypeError: 'tuple' object does not support item assignment #tuple不支持修改元素
 ValueError: incomplete format
 SyntaxError: invalid syntax
 SyntaxError: EOL while scanning string literal #字符串首尾引号错误
 IndentationError: unexpected indent  #缩进错误
 IndexError: list index out of range  #访问下标超出list的范围
 KeyError: 'ages' 操作字典时key写错了

目标：
  ①熟练掌握python基本语法、常见的标准库的使用、面向对象、异常处理
  ②第三方的库django:ORM、模板语法、基本用法。。
  ③采用python和django框架编写出后台的api

一、概述
 1. python：是一门编程语言，用来实现：
  ①Web Development:
   Django, Pyramid, Bottle, Tornado, Flask, web2py
  ②GUI Development:
   tkInter, PyGObject, PyQt, PySide, Kivy, wxPython
  ③Scientific and Numeric:
   SciPy, Pandas, IPython
  ④Software Development:
   Buildbot, Trac, Roundup
  ⑤System Administration:
   Ansible, Salt, OpenStack

 2. 优势能力：
  跨平台
  类库非常丰富
  可扩展
  语法简洁
  开源


 3. 版本:
  python2.* --> 遗产
  python3.* --> 现在和未来

 4. 搭建python的环境：
  https://www.python.org/downloads/windows/


二、python准备工作
 1. 基本规则
  格式: 文件名.py
  行注释： #行注释内容
  块注释：
   """
    块注释
    内部是可以换行的
   """
  缩进：不要随便写，一般是用在控制流
  输出：
   print()
  输入：
   input()
   input("请输入:")
  运行py脚本:
   命令行: py/python/python3(mac) 文件名.py  运行脚本
   命令行: py --> enter --> 代码... --> enter... --> quit()/exit()退出运行
  在解析模式查看帮助信息：
   py
   help('keywords')
   hel('print')
  查看变量的数据类型：
   type(score)
  关键词：
   False def if raise None del import return True elif in try
   and  else is while as  except lambda with assert finally nonlocal
   yield break for not class from or continue global pass

 2. 变量
  #定义变量并赋值
   score = 80
  #释放变量
   del score  
  #释放后再次访问
   print(age)  #NameError: name 'age' is not defined
  #输出的时候，字符串不同类型不能使用拼接输出，可使用占位符输出变量
  A. print('My name is %s, I am %s years old'%(uname,age))
  B. print('%(uname)s ....'%{uname:'Tom Jerry'})
  C. print('{uname} ....{age}'.format(uname='Tom',age=20))

  
三、python数据类型  
 1. 基本数据类型
  (1)数值  int float
   age = 20
   print(age,type(age)) #20 <class 'int'> 整数
   price = 19.99
   print(price,type(price)) #19.99 <class 'float'> 浮点数
  (2)bool
   isTrue = True
   print(isTrue,type(isTrue)) #True <class 'bool'> 布尔型
  (3)complex
   mySignal = 3+2j
   print(mySignal,type(mySignal)) #(3+2j) <class 'complex'> 复数型
  (4)字符串 str
   ① 单引号、双引号、三引号，三引号内部可换行，可自由使用单双引号
   ② + 拼接
   ③ * 重复输出
    myName = 'Tom'
    print(myName,type(myName)) #Tom <class 'str'>
    addr = "成都"
    print(addr,type(addr)) #成都 <class 'str'>
    article = '''
     这是一篇文章
     可以换行的
    '''
    print(article,type(article)) # <class 'str'>
    print('Hello world' * 3)  #Hello worldHello worldHello world
     #相当于print('Hello world' + 'Hello world' + 'Hello world')
    print('Hello world' + 3)  #报错

   练习:
   步骤1：定义两个变量，一个单价，一个数量
   步骤2：输出总价格是多少
    price = input('单价：')
    count = input('数量: ')
    #total = price * count #TypeError: can't multiply sequence by non-int of type 'str'#字符串不能做算术运算
    total = int(price) * int(count)
    #print('总价是:'+ total) #TypeError：must be str,not int #字符串和数字不能拼接，没有隐式转换
    print('总价是:%d'%total)
    print('总价是:'+ str(total))
    print('单价：%d, 数量：%d, 总价为：%d' %(int(price),int(count),total))
  (5)数据类型之间的转换
   int(x [,base]) 将x转换为一个整数
   float(x ) 将x转换到一个浮点数
   complex(real [,imag]) 创建一个复数
   str(x) 将对象x转换为字符串
   repr(x) 将对象x转换为表达式字符串
   eval(str) 用来计算在字符串中的有效Python表达式,并返回一个对象
   tuple(s) 将序列s转换为一个元组
   list(s) 将序列s转换为一个列表
   chr(x) 将一个整数转换为一个字符
   unichr(x) 将一个整数转换为Unicode字符
   ord(x) 将一个字符转换为它的整数值
   hex(x) 将一个整数转换为一个十六进制字符串
   oct(x) 将一个整数转换为一个八进制字符串
  (6)数学函数
   abs(x)  返回数字的绝对值，如abs(-10) 返回 10
   ceil(x)  返回数字的上入整数，如math.ceil(4.1) 返回 5
   cmp(x, y) 如果 x < y 返回 -1, 如果 x == y 返回 0, 如果 x > y 返回 1
   exp(x)  返回e的x次幂(ex),如math.exp(1) 返回2.718281828459045
   fabs(x)  返回数字的绝对值，如math.fabs(-10) 返回10.0
   floor(x) 返回数字的下舍整数，如math.floor(4.9)返回 4
   log(x)  如math.log(math.e)返回1.0,math.log(100,10)返回2.0
   log10(x) 返回以10为基数的x的对数，如math.log10(100)返回 2.0
   max(x1, x2,...)  返回给定参数的最大值，参数可以为序列。
   min(x1, x2,...)  返回给定参数的最小值，参数可以为序列。
   modf(x)  返回x的整数部分与小数部分，两部分的数值符号与x相同，整数部分以浮点型表示。
   pow(x, y) x**y 运算后的值。
   round(x [,n]) 返回浮点数x的四舍五入值，如给出n值，则代表舍入到小数点后的位数。
   sqrt(x)  返回数字x的平方根，数字可以为负数，返回类型为实数，如math.sqrt(4)返回 2+0j
 2. list 列表(有序序列)
  (1)列表操作
   A. 定义
    myList = [100,200,300,400]
    print(myList,type(myList)) #[100, 200, 300, 400] <class 'list'>
   B. 获取
    print(myList[2])  #300, 下标为正数，从左往右0开始
    print(myList[-1]) #400, 下标为负数，从右往左-1开始
    #print(myList[4]) #IndexError: list index out of range
    #冒号获取指定元素
     nums=[1, 3, 5, 7, 8, 13, 20]
     #从下标为2的元素切割到下标为5的元素，但不包含下标为5的元素'''
      print(nums[2:5])
     #从下标为1切割到最后一个元素'''
      print(nums[1:])
     #从最开始的元素一直切割到倒数第3个元素，但不包含倒数第三个元素'''
      print(nums[:-3])
     #返回所有元素'''
      print(nums[:])
   C. 修改
    myList[2] = 301
    print('修改后的数组', myList) #修改后的数组 [100, 200, 301, 400]
    print('修改后的值是:%d' %myList[2]) #修改后的值是:301
   D. 删除
    del myList[0]
    myList.pop()
   E. 列表脚本操作符
    列表对+和*的操作符与字符串相似。+号用于组合列表，*号用于重复列表，例如：
    print len([1, 2, 3]) #3
    print [1, 2, 3] + [4, 5, 6] #[1, 2, 3, 4, 5, 6]
    print ['Hi!'] * 4 #['Hi!', 'Hi!', 'Hi!', 'Hi!']
    print 3 in [1, 2, 3] #True
    for x in [1, 2, 3]: print x, #1 2 3
  (2)列表常用API
   len(xxList)   得到列表的长度
   max/min(xxList) 获取最大值/最小值
   xx.insert(index,newValue) 指定的位置添加元素，index为0插入到开头
   xx.append(newValue) 尾部追加
   xx.pop(index) 删除指定下标的元素，不写下标默认删除最后一个
   xx.sort()  升序排序  xx.sort(reverse=True) 降序排序
   xx.reverse() 翻转列表
   xx.count(elem) 统计某个元素在列表中出现的次数
   xx.extend(seq) 在列表末尾一次性追加另一个序列中的多个值(用新列表扩展原来的列表)
   xx.index(obj) 从列表中找出某个值第一个匹配项的索引位置，索引从0开始
   xx.remove(obj) 移除列表中某个值的第一个匹配项
   myList = [1,2,3]
   #获取长度
    print(myList,len(myList))
   #指定位置添加
    myList.insert(0,5)
    print(myList)
   #尾部添加
    myList.append(4)
    print(myList)
    myList.insert(len(myList),0)
    print(myList)
   #删除
    myList.pop()
    print(myList)
   #排序
   scoreList = [60,30,80,75,45]
   scoreList.sort()  #升序
   print(scoreList) #[30, 45, 60, 75, 80]
   scoreList.sort(reverse=True)  #降序
   print(scoreList) #[30, 45, 60, 75, 80]
   nameList = ['Tom','Jerry','Bob','Kan']
   nameList.sort()
   print(nameList) #['Bob', 'Jerry', 'Kan', 'Tom']
   list1 = [1,3,4,8,6,5]
   #翻转
   list1.reverse()
   print(list1) #[5, 6, 8, 4, 3, 1]

 3. tuple 元祖
  tuple的数据不可修改，只有一个数据时也需加一个逗号
  元组中的元素值是不允许修改的，但我们可以对元组进行连接组合，例如:
  tup3 = tup1 + tup2
  #两种定义方式
   myTuple = (100,200,300,400)
   myTuple = tuple([100,200,300，400])
   print(myTuple,type(myTuple)) #(100, 200, 300, 400) <class 'tuple'>
   print(myTuple[0], myTuple[-1]) #100 400
   #myTuple[0] = 101 #TypeError: 'tuple' object does not support item assignment #元祖数据无法修改
  #只有一个值的元祖
   myTuple2 = (10)
   print(myTuple2,type(myTuple2)) #10 <class 'int'> 一个值的会变成整数
   myTuple3 = (10,)
   print(myTuple3,type(myTuple3)) #(10,) <class 'tuple'> 加一个逗号即可识别为tuple型
  #删除元祖
   del tup
  #元祖API
   cmp(tuple1, tuple2) 比较两个元组元素。
   len(tuple) 计算元组元素个数。
   max(tuple) 返回元组中元素最大值。
   min(tuple) 返回元组中元素最小值。
   tuple(seq) 将列表转换为元组。
  #元祖运算符
   与字符串一样，元组之间可以使用+号和*号进行运算。这就意味着他们可以组合和复制，运算后会生成一个新的元组。

 4. dict 字典
  (1)dict基本操作
   由若干个键值对构成，查找和插入的速度很快，占用的内存比较大
    #xxdict = {name:'Tom', 'age':20} #NameError: name 'name' is not defined
    xxDict = {'name':'Tom', 'age':20}
    print(xxDict,type(xxDict)) #{'name': 'Tom', 'age': 20} <class 'dict'>
   #添加(不存在的key即为添加)
    xxDict['key1'] = myValue
   #删除
    xxDict.pop('key1')
    del xxdict['name'] # 删除键是'name'的条目
    xxdict.clear() # 清空词典所有条目
    del xxdict  # 删除词典
   #修改(存在的key即为修改)
    xxDict['key1'] = newValue
   #获取
    xxDict.get('key1')
    xxDict['key1']
   #读操作
    #print(xxDict.name) #AttributeError: 'dict' object has no attribute 'name'
    #print(xxDict['name1']) #KeyError: 'name1'
    print(xxDict['name'])  #Tom
    print(xxDict.get('name')) #Tom
    print(xxDict.get('name1')) #none
   #写操作
    xxDict['name'] = 'Jerry'
    print(xxDict['name'])  #Jerry
    xxDict.get('name') = 'Bob' #SyntaxError: can't assign to function call 函数调用不能被赋值
    print(xxDict.get('name')) #Tom
    print(xxDict.get('name1')) #none
  (2)dict的API
   cmp(dict1, dict2) 比较两个字典元素。
   len(dict) 计算字典元素个数，即键的总数。
   str(dict) 输出字典可打印的字符串表示。
   type(variable) 返回输入的变量类型，如果变量是字典就返回字典类型。
   radiansdict.clear() 删除字典内所有元素
   radiansdict.copy() 返回一个字典的浅复制
   radiansdict.fromkeys() 创建一个新字典，以序列seq中元素做字典的键，val为字典所有键对应的初始值
   radiansdict.get(key, default=None) 返回指定键的值，如果值不在字典中返回default值
   radiansdict.has_key(key) 如果键在字典dict里返回true，否则返回false
   radiansdict.items() 以列表返回可遍历的(键, 值) 元组数组
   radiansdict.keys() 以列表返回一个字典所有的键
   radiansdict.setdefault(key, default=None) 和get()类似, 但如果键不已经存在于字典中，将会添加键并将值设为default
   radiansdict.update(dict2) 把字典dict2的键/值对更新到dict里
   radiansdict.values() 以列表返回字典中的所有值
 5. set (没有重复)
   set存储不会重复的多个数据构成的无序集合
   mySet = set([100,200,300,400,300,200])
   print (mySet,type(mySet)) #{200, 100, 400, 300} <class 'set'> #自动去除重复数据，无序
   #添加
    mySet.add(newValue)
   #移除
   mySet.remove(value)


   练习：创建一个demo10_lianxi.py
    步骤1：准备一个由3个字符串所构成的数组
    步骤2：打印数组中下标为2的元素
    步骤3：获取用户输入的用户名和密码，保存在一个字典中
    步骤4：打印字典中所存储的用户名
 6. 日期和时间
  首先引入模块
  import time, datetime
  (1)获取时间
   nowTime = time.time() #1547555909.9550362
   localtime = time.localtime(nowTime)
   print(localtime) # time.struct_time(tm_year=2019, tm_mon=1, tm_mday=15, tm_hour=20, tm_min=18, tm_sec=20, tm_wday=1, tm_yday=15, tm_isdst=0)
    tm_year=2019,  年
    tm_mon=1,    月0-12
    tm_mday=15,   日1-31
    tm_hour=20,   时0-23
    tm_min=18,   分0-59
    tm_sec=20,   0-61(60或61是闰秒)
    tm_wday=1,   周几 0-6
    tm_yday=15,   年的第多少天 0-366
    tm_isdst=0   是否为夏令时 -1,0,1
  (2)获取格式化的时间
   # 最简单的获取可读的时间模式
   print(time.asctime(localtime)) #Tue Jan 15 20:25:19 2019
   # 首选：print time.strftime('%Y-%m-%d %H:%M:%S')
   print(time.strftime('%Y-%m-%d %H:%M:%S')) #2019-01-15 20:25:19
   # 其次：print datetime.datetime.strftime(datetime.datetime.now(), '%Y-%m-%d %H:%M:%S')
   print(datetime.datetime.strftime(datetime.datetime.now(), '%Y-%m-%d %H:%M:%S')) #2019-01-15 20:25:19
   # 最后：print(str(datetime.datetime.now())[:19])
   print(str(datetime.datetime.now())[:19])  # 2019-01-15 20:25:19
  (3)字符串转换为日期
   expire_time = "2013-05-21 09:50:35"
   d = datetime.datetime.strptime(expire_time,"%Y-%m-%d %H:%M:%S")
   print (d) #2013-05-21 09:50:35

  (4)获取日期差
   oneday = datetime.timedelta(days=1)
   #今天，2014-03-21
   today = datetime.date.today()
   #昨天，2014-03-20
   yesterday = datetime.date.today() - oneday
   #明天，2014-03-22
   tomorrow = datetime.date.today() + oneday
   #获取今天零点的时间，2014-03-21 00:00:00
   today_zero_time = datetime.datetime.strftime(today, '%Y-%m-%d %H:%M:%S')
   #0:00:00.001000
   print (datetime.timedelta(milliseconds=1)) #1毫秒
   #0:00:01
   print (datetime.timedelta(seconds=1)) #1秒
   #0:01:00
   print (datetime.timedelta(minutes=1)) #1分钟
   #1:00:00
   print (datetime.timedelta(hours=1)) #1小时
   #1 day, 0:00:00
   print (datetime.timedelta(days=1)) #1天
   #7 days, 0:00:00
   print (datetime.timedelta(weeks=1))
  (5)获取时间差
   #1 day, 0:00:00
   oneday = datetime.timedelta(days=1)
   #今天，2014-03-21 16:07:23.943000
   today_time = datetime.datetime.now()
   #昨天，2014-03-20 16:07:23.943000
   yesterday_time = datetime.datetime.now() - oneday
   #明天，2014-03-22 16:07:23.943000
   tomorrow_time = datetime.datetime.now() + oneday
   #注意时间是浮点数，带毫秒。
   #格式化今天、昨天、明天：
   print (datetime.datetime.strftime(today_time, '%Y-%m-%d %H:%M:%S'))
   print (datetime.datetime.strftime(yesterday_time, '%Y-%m-%d %H:%M:%S'))
   print (datetime.datetime.strftime(tomorrow_time, '%Y-%m-%d %H:%M:%S'))
  (6)获取上个月最后一天
   last_month_last_day = datetime.date(datetime.date.today().year,datetime.date.today().month,1)-datetime.timedelta(1)
   print(last_month_last_day) #2018-12-31

  (7)字符串日期格式化为秒数，返回浮点类型
   expire_time = "2018-01-15 20:50:35"
   d = datetime.datetime.strptime(expire_time,"%Y-%m-%d %H:%M:%S")
   time_sec_float = time.mktime(d.timetuple())
   print (time_sec_float) #1516020635.0

  (8)日期格式化为秒数，返回浮点类型：
   d = datetime.date.today()
   time_sec_float = time.mktime(d.timetuple())
   print (time_sec_float) #1547481600.0

  (9)秒数转字符串
   time_sec = time.time()
   print (time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time_sec))) #2019-01-15 20:37:27

四、Python内置函数
 1. range()
  函数可创建一个整数列表，一般用在 for 循环中
  range([start, ]stop[, step])
   start: 计数从 start 开始。不写默认是从 0 开始。例如range（5）等价于range（0， 5）
   stop: 计数到 stop 结束，但不包括 stop。例如：range（0， 5） 是[0, 1, 2, 3, 4]没有5
   step：步长，默认为1。例如：range（0， 5） 等价于 range(0, 5, 1)
   range(4) 0 1 2 3
   range(3,8) 3,4,5,6,7
   range(0,6,2) 0 2 4
 2. chr(unicode)
  根据unicode码转换成为对应字符，unicode码可为十进制或十六进制
   print(chr(20123)) # 些
   print(chr(0x4e00)) # 一
 3. input('请输入:')
  接受一个标准输入数据，返回为 输入的值，string 类型
  Python 2.x版本中
   raw_input() 将所有输入作为字符串看待，返回字符串类型。
   而input() 在对待纯数字输入时具有自己的特性，它返回所输入的数字的类型（ int, float ）
  Python3.x 中
  raw_input() 和 input() 进行了整合，去除了 raw_input( )，仅保留了input( )函数，
  其接收任意任性输入，将所有输入默认为字符串处理，并返回字符串类型。
 4. int()
 5. str()
 6. print()
 7. tuple()
 8. bool()
 9. len()
 10. len()
 11. range()
 12. type()
 13. float()
 14. list()
 15. max()
 16. min()
 17. reverse()
 18. complex()
 19. help()
 20. dict()

  abs() divmod() input() open() staticmethod()
  all() enumerate() int() ord() str()
  any() eval() isinstance() pow() sum()
  basestring() execfile() issubclass() print() super()
  bin() file() iter() property() tuple()
  bool() filter() len() range() type()
  bytearray() float() list() raw_input() unichr()
  callable() format() locals() reduce() unicode()
  chr() frozenset() long() reload() vars()
  classmethod() getattr() map() repr() xrange()
  cmp() globals() max() reverse() zip()
  compile() hasattr() memoryview() round() __import__()
  complex() hash() min() set()
  delattr() help() next() setattr()
  dict() hex() object() slice()
  dir() id() oct() sorted() exec 内置表达式

五、Python模块
 1. 内置模块
  (1)random模块
   import random
   print(random.random()) #生成0~1的随机数
   print(random.choice([1,3,5,2,4,6])) #随机选择列表中的一个值
   print(random.randint(1,10)) #整数1-10(包括10),随机取一个值
   print(random.randrange(1, 10)) ## 整数1-10(不包括10),随机取一个值
   #生成随机验证码
    import random
    checkcode = ''
    for i in range(6):
      current = random.randrange(0, 6)
      if current != i and current+1 != i:
        temp = chr(random.randint(65, 90))
        # 65-90是A-Z
      elif current+1 == i:
        temp = chr(random.randint(97, 122))
        # 97-122是a-z
      else:
        temp = random.randint(0, 9)
      checkcode += str(temp)
    print(checkcode)
    # 一共6位验证码,
    # 第一位有1/6几率是数字,其它都是大写字母
    # 第二到第六位,都是有1/6几率是小写字母,1/6几率是数字,其它都是大写字母
  (2)date模块
   # datetime模块
    import datetime
    print(datetime.datetime)  # <class 'datetime.datetime'>
    print(datetime.datetime.now())  # 2019-01-18 10:41:38.144124
    day1 = datetime.datetime(2008,3,22) #2008-03-22 00:00:00
   # datetime.timedelta([days[, seconds[, microseconds[, milliseconds[, minutes[, hours[, weeks]]]]]]])
    myDuration = datetime.timedelta(weeks = 2 , days = 3, hours = 5, minutes = 12, seconds = 23)
    print(day1) #2008-03-22 00:00:00
    print(myDuration) # 17 days, 5:12:23
    print(day1+myDuration) # 2008-04-08 05:12:23
   # 时间可以进行加减运算，比如获取当前时间之前的3天5小时18分24秒
    datetime.datetime.now() - datetime.timedelta(days = 3, hours = 5, minutes = 18, seconds = 24)
  (3)time模块
   # time模块
    import time
    print(time.time()) #时间戳 类似于1547778908.475174
    print(time.strftime("%y/%m/%d %H:%M:%S")) # 19/01/18 10:35:08
  (4)os模块
   import os
   print(os.path.abspath('.')) # 当前绝对路径 C:\xampp\htdocs\WA\20_Python\day04
   print(os.path.abspath('..')) # 当前路径的上级的绝对路径 C:\xampp\htdocs\WA\20_Python\day04
   print(os.path.exists('C:\\xampp\\htdocs\\WA\\20_Python\\day04')) # True \要用\\表示
  (5)sys模块
  (6)shutil 模块
  (7)logging 模块
  (8)re模块
  (9)math模块
   import math
   print(math.fabs(10-17)) #7.0 取绝对值
   print(math.fabs(17-10)) #7.0 取绝对值
   print(math.ceil(19.01)) #20  向上取整
   print(math.floor(19.99)) #19 向下取整
  (10)json模块
   import json
   json.dumps() 转换为json格式的字符串
   json.loads() 将json的字符串转为其它的数据类型

六、异常处理
  异常并不是错误，只要未处理错误没有解决，程序还是会崩溃
  (1)异常的处理：
   try：
    do sth
   except:(也可以写except xxError:)
    错误处理
   finally:
    执行最终要执行的代码

  (2)捕获多个错误的处理：
   A. 方式1：单独捕获错误单独处理
    try:
     ...
    except Error1 as e:  # e就保存错误提示信息
     print(e)
     ...

    except Error2:
     ...
   B. 方式2：分组捕获错误，一次性处理
    try:
     ...
    except (Error1,Error2,...):
     ...
   C. 方式3：捕获所有类型错误
    try:
     ...
    except Exception:
     ...
  3. 手工触发错误 raise
   try:
    raise(ValueError('自定义消息'))
   except ValueError as msg:
    # msg就是触发错误时，所传来的自定义消息
    print(msg)
  练习:
   ①定义一个列表，访问列表中不存在的索引，捕获错误
    myList =[1, 2, 3]
    try:
     print(myList[3])
    except Exception as msg:
     print(msg) # list index out of range
   ②定义一个字符串，一个整数，做一个拼接运算，捕获错误，提示‘不允许将整数和字符串进行拼接’
    className = '班级'
    classNo = 1
    # print(className + classNo) #TypeError: must be str, not int
    try:
     print(className + classNo)
    except TypeError as errMsg:
     print(errMsg) # must be str, not int
七、运算符
 1. 算术运算
  +  -  *  /  %
  m//n 商下取整 m除n的商取整
  m**n 取m的n次方
  print(10/2)  # 5.0 即使整除也是浮点数
  print(10/3)  # 3.3333333333333335
  print(10%3)  # 1
  print(10//3) # 3 商下取整
  print(10**3)  # 1000  取10的三次方
  print(10+True) # 11 True/False在内存中按照1/0存储
 2. 关系运算
   > >=
   < <=
   == !=
   支持数字之间、字符串之间、数组之间、元组之间相互比较
   数字、字符串、列表、元祖之间都是从第一个下标的值开始依次比较unicode码
   None不支持和任何的数据对比
  练习
   ① 提示用户分别输入语文成绩、数学成绩、英语成绩
   ② 计算平均值
   ③ 将平均值和80比较 True/False

 3. 赋值运算
   [num1,num2,num3] = [1,2,3]
    =
   +=
   -+
   *=
   /=
   %=
   不支持：自增、自减！！！

 4. 逻辑运算
  and  逻辑与
  or  逻辑或
  not  逻辑取反
 5. 三目运算符
  '条件为True的值' if 条件表达式 else '条件为false的值'

 6. 位运算
  & 按位与  
  |  按位或  
  ~  按位取反
  ^  按位异或
  <<  按位左移
  >>  按位右移

  练习
  ①获取用户输入的年份
  ②判断 是否是闰年
   符合以下条件任何一个：
   条件1：能整除4且不能整除100
   条件2：能整除400

 7. 身份运算 in id is
   a in b / a not in b 判断一个数据是否在数组或者元组中
   id(a) 得到一个变量在python所分配的地址
   a is b 判断前后变量的id是否一致

   值类型:数字、字符串...  两个变量只要声明的值相等，id就相等
   引用类型: list\tuple\dict.. 两个变量声明的值相等，id也不相等

八、控制流
  通过冒号和缩进表示相应代码块
 1. if判断
  (1)单条件判断
   if expression:
    ...
    ...
   else:
    ...
    ...
  (2)多重条件判断:
   if expression1:
    print('')
   elif expression2:
    print('')
   elif expression3:
    print('')
    ...
   else:
    print()

  
 2. 循环
   A. 循环取出元素
    for item in xxList: #item就是遍历的序列中的临时变量
     ...
   B. 循环取出下标
    for index in range(len(xxList)):
     ....
   练习：
    ① 实现一个for循环，循环5次，在for循环中 获取用户输入的成绩
    ② 将获取到的成绩，计算平均值
    ③ 平均值大于80，输出'优秀'；否则输出'一般'

 3. 循环的控制
   continue / break
   while 条件:
    ...
    if 条件:
     continue
    if 条件:
     break

  练习，猜一个0~100之间的随机数
   random1 = random.choice(range(100))
   inputVal = 0
   while inputVal != random1:
    inputVal = int(input('猜一个数'))
    print('猜对了' if inputVal == random1 else '大了' if inputVal > random1 else '小了' )

九、方法
 1. 创建方法:
  def add(num1,num2):
   result = num1+num2
   return result

 2. 调用方法：
   add(10,20)
   注意：实参要和形参数量保持一致
 3. 参数传递：
  (1) 参数类型
   # 基本类型：值传递，修改参数，原始数据不受影响 number/string/tuple
   # 引用类型：地址传递，修改参数，原始数据也会变化 list/set/dict

   练习:求一个数的阶乘的函数
   # 函数: 使用递归实现阶乘
    def jie1(a):
     if(a == 1):
      return 1
     return (a * jie1(a-1))
    print(jie1(4))

  (2)关键字参数(可自定义参数顺序):
   myFunc(arg2=10,arg1=20)
   myFunc(10,arg2=20)
   #myFunc(arg1=10,20) ##SyntaxError: positional argument follows keyword argument
   #关键字参数不能放在实际参数的前边

  (3)可变长参数(相当于剩余参数)：
   可变长参数接收的是除实际参数以外的剩余参数
   A. *args中的args保存参数为tuple类型
    def myFunc(*args):
     #args是一个元组类型
    myFunc()
    myFunc(1,2)
   B. **args的args保存数据为dict类型
    def fun3(**args):
     print(args)
    # fun3(1,3,5) # TypeError: fun3() takes 0 positional arguments but 3 were given
    fun3(a=1,b=3,c=5) # {'a': 1, 'b': 3, 'c': 5}

  (4)默认值参数(指定形参的默认值)：
   指定了默认值的参数，有传入值就使用传入值，否则就使用默认值。
   注意事项：有默认值参数必须要放在普通参数的后边，否则会提示语法错误
    不能写 #def myFunc(arg1=20,arg2) # 默认值参数必须定义在后面
    def myFunc(arg1,arg2=20):
     pass
    myFunc(10)
    myFunc(10,30)

   练习:#封装一个indexOf函数
    def indexOf( li, val, startsi = 0 ):
     for i in range(startsi,len(li)):
      if li[i] == val :
       return i
     return -1
    print(indexOf([1,3,5,7,9],5,0))

   练习: demo40_lianxi.py
   ①创建一个方法，传入n个整数，输出其中的最大值和最小值
    def func (*args):
     print ('最大值', max(args))
     print ('最小值', min(args))
    func(1,5,9,5,4,8,6,3,7)
   ②创建一个支持3个参数函数,可以调用多次(通过关键字参数，调整参数的顺序)；方法中打印参数内容即可

十、作用域、闭包
 1. LEGB
  L —— Local(function)；函数内的名字空间
  E —— Enclosing function locals；外部嵌套函数的名字空间(例如closure)
  G —— Global(module)；函数定义所在模块（文件）的名字空间
  B —— Builtin(Python)；Python内置模块的名字空间
  变量使用的优先级:
   局部变量 > 嵌套函数外层变量 > 当前模块的全局 > Python内置变量
  (1)全局：
   可被重用，但容易被污染
  (2)局部：不会被污染，但不可重用
   要在局部读取全局变量，可直接使用
   要在局部改变全局变量的值, 需要先用global xx 引入全局变量
    count = 0 #定义全局变量
    def fun1():
     count = 3 #定义局部变量, 不是修改全局变量的值
     count2 = 5#定义局部变量，函数外部无法访问
     print('函数内的count = %d'%count)
    print('count = %d'%count) # 0
    fun1() # 3
    print('count = %d'%count) # 0
    # print('count2 = %d'%count2) # NameError: name 'count2' is not defined

    # 函数内部修改全局变量
    a = 5
    def fun2() :
     global a # 函数内修改全局变量需要用global 引入
     a = 3
     print(a)
    print(a) # 5
    fun2() # 3
    print(a) # 3
  (3)嵌套函(闭包)
   重用变量，又保护变量不被篡改-->闭包
   要在内层函数修改外层函数的变量，需要先用 nonlocal xx 引入外层变量
   闭包基本原理：
   ①外层函数在调用，创建外层函数作用域对象
   ②内层函数在创建时，通过自己__closure__属性 引用外层作用域对象
   在外层函数执行之后，无法释放，形成一个闭包的结果(变量依然保留在内存中，可重用)

   注意事项：
   ①在函数内部的作用范围内，如果读全局变量没问题！如果要修改某一个全局变量的数据，得必须通过global将此变量引入到函数内部
   ②在嵌套函数的内部，如果要修改外层函数中的变量，得通过nonlocal引入到嵌套的内部

    # 嵌套函数 闭包
    def sum1(a):
     print('sum1执行了')
     def add1(b):
      return a + b
     return add1
    funcAdd = sum1(10)
    print(funcAdd(5))

    # 闭包2
    def outer () :
     count = 0
     def inner () :
      # count = 13 内部不定义count变量,就会到外层函数找, 内部定义了，就不会引用外层变量,外层则会释放
      print('inner count is %d'%count)
     return inner
    fun1 = outer()
    fun1() # 0

    #闭包3
    def outer2 () :
     count = 0
     def inner2 () :
      nonlocal count # 需要修改外层函数的值，需要用nonlocal引入外层变量
      count += 1
      print('inne2 count is %d'%count)
     return inner2
    fun2 = outer2()
    fun2() # 1
    fun2() # 2
    fun2() # 3
    def len():
     print('这是自定义的len()')
    len() # 这是自定义的len(), 自定义的函数会覆盖内置函数

   练习：
    def chatroom () :
     userList = [1,3,5]
     def enter (uname) :
      nonlocal userList
      userList.insert(0,uname)
      return userList
     return enter
    getU = chatroom()
    print(getU('Tom'))
    print(getU('Jerry'))
    print(getU('Bob'))

 2. lambda函数 (匿名函数)
  一个语法，三个特性，四个用法，一个争论
  (1)语法
   lambda argument_list: expression
   lambda 参数列表 : 单行表达式
    lambda是Python预留的关键字，argument_list和expression由用户自定义
    表达式中出现的参数需要在argument_list中有定义，并且表达式只能是单行的
    不能写return, 程序默认return 冒号后的表达式的值
    lamda a,b : a+b
  例如：
   def fun1() :
    print('fun1被调用了')
   a = 5
   b = 7
   test = lambda a,b : a + b
   fun1() # fun1被调用了
   print(test(a,b)) # 12
  (2)特性
   A. lambda函数是匿名的：匿名函数，lambda函数没有名字。
   B. lambda函数有输入和输出：输入参数列表argument_list，输出表达式expression计算得到的值。
   C. lambda函数一般功能简单：单行expression决定了lambda函数不可能完成复杂的逻辑，只能完成非常简单的功能。
  (3)用法
   A. 将lambda函数赋值给一个变量，通过这个变量间接调用该lambda函数
   B. 将lambda函数赋值给其他函数，从而将其他函数用该lambda函数替换。
   C. 将lambda函数作为其他函数的返回值，返回给调用者。可用于闭包中。
   D. 将lambda函数作为参数传递给其他函数
    部分Python内置函数接收函数作为参数。典型的此类内置函数有这些。
    filter函数。此时lambda函数用于指定过滤列表元素的条件。例如filter(lambda x: x % 3 == 0, [1, 2, 3])指定将列表[1,2,3]中能够被3整除的元素过滤出来，其结果是[3]。
    sorted函数。此时lambda函数用于指定对列表中所有元素进行排序的准则。例如sorted([1, 2, 3, 4, 5, 6, 7, 8, 9], key=lambda x: abs(5-x))将列表[1, 2, 3, 4, 5, 6, 7, 8, 9]按照元素与5距离从小到大进行排序，其结果是[5, 4, 6, 3, 7, 2, 8, 1, 9]。
    map函数。此时lambda函数用于指定对列表中每一个元素的共同操作。例如map(lambda x: x+1, [1, 2,3])将列表[1, 2, 3]中的元素分别加1，其结果[2, 3, 4]。
    reduce函数。此时lambda函数用于指定列表中两两相邻元素的结合条件。例如reduce(lambda a, b: '{}, {}'.format(a, b), [1, 2, 3, 4, 5, 6, 7, 8, 9])将列表 [1, 2, 3, 4, 5, 6, 7, 8, 9]中的元素从左往右两两以逗号分隔的字符的形式依次结合起来，其结果是'1, 2, 3, 4, 5, 6, 7, 8, 9'。
    另外，部分Python库函数也接收函数作为参数，例如gevent的spawn函数。此时，lambda函数也能够作为参数传入。

 3. 装饰器函数
  装饰器的强大在于 在不修改原有业务逻辑的情况下 对代码进行扩展：
  比如权限校验、用户认证、日志处理、性能测试。。。，最大限度的对代码进行复用
  (1)例1：在调用add/subtract函数时，先经过装饰器函数log的处理
    # 封装一个装饰器函数
    def log(func) :
     def myFunc (a, b) :
      nonlocal func
      print('被调用的方法是: ',func.__name__)
      func(a,b)
     return myFunc

    #调用装饰器函数装饰add函数, add函数在执行时会先经过装饰器函数的操作
    @log()
    def add (a,b) :
     print (a + b)

    #调用装饰器函数装饰subtract函数,subtract函数在执行时会经过装饰器函数的操作
    @log
    def subtract (a,b) :
     print (a - b)
    add (7,3)
    subtract (7,3)
  (2)例2：在调用addToCart/modifyUserInfo函数时，先经过装饰器函数的验证
    import random
    def checkLogin (fun) :
     def mycheck () :
      nonlocal fun
      if random.randint(1,10) < 5 :
       print('验证成功，可执行...')
       fun()
      else:
       print('验证失败，无法执行...')
     return mycheck

    @checkLogin
    def addToCart () :
     print('添加成功')
    @checkLogin
    def modifyUserInfo () :
     print('修改成功')
    addToCart()
    modifyUserInfo()


十一、模块与包
 1. 模块
  每一个py文件就是一个模块
  (1)模块化：
    方便团队协作
    提高了代码的复用率
    方便对业务进行拆分、维护、开发
  (2)导出模块
   无须手动导出，每个文件就是一个模块，自动导出
   当另一个模块使用模糊引入时，当前模块可限制能够被模糊引入的数据列表
   __all__ = ['login','',...] # []中的数据才能够被*模糊引入
  (3)引入模块：
   A. 仅引入
    import demo01_module
    demo01_module.xx
   B. 引入并起别名
    import demo01_module as m1
    m1.xx
   C. 引入一个某块中的某方法/变量...
    from demo01_module import func1
    func1()
   D. 模糊引入
    from demo01_module import *
    func1()
    练习:
 2. 包 package
  一个文件夹就是一个package，在此文件夹中可以创建多个py文件
  包是由多个模块构成的，是对多个模块的一个封装
  (1)调用同级目录(包)下的模块：
   和之前引入模块语法一致(需要在引入的模块名前 加上包的名字)
    # 方式一:
    # import utils.myFile
    # utils.myFile.openFile()

    # 方式二:
    # import utils.myFile as xxFile
    # xxFile.openFile()

    # # 方式三:
    # from utils.myHTTP import sendRQ
    # sendRQ()

    # #方式四:
    # from utils.myHTTP import *
    # sendRQ()

    # 方式五:(此方式需要在文件夹(包)下增加__init__.py, 并写入__all__=['',''])
    from utils import *
    myFile.openFile()
    myHTTP.sendRQ()
   (2)调用父级其他目录(包)下的模块
    其他目录下已有__init__.py 并配置好之后
    当前模块要引入需先回到上层再引入，需要调用python的sys模块实现
     A目录下有a.py，且有__init__.py 并配置__all__=['','',...]
     B目录下有b.py
     在b.py中要引入A目录中的a.py模块：
     import sys
     sys.path.append('..') # 用append()方法进行追加，..表示回到上一级目录中去，括号中也可写绝对路径
     from A import a
     这里就可以使用a中的数据了
    【解释】b.py回到上一级就是B这个目录了，对于B来说，和A就是同级目录，
        A下面已经创建了__init__.py文件，已经是个模块可以用来引入，
        这个时候from A  import a 就可以顺利调用

十二、面向对象编程
  封装、继承、多态
 1. 封装
  将现实问题中 有共同特征的实例，把共同特征封装在类中(创建一个类)
  (1)创建一个类:
   class Student:
    name = 'Tom';
    age = 20;
    def intro(self):
     print('...')
  (2)实例化一个类：
   m1 = Student()
   m1.intro()
  (3)注意
   ①构造函数
    def __init__(self):
   ②私有内部成员,不可以被实例化之后的对象直接调用
    __score = 90 #访问m1.__age 会报错
  

 2. 继承
   在创建一个类时，指定基类(父类)，此类就会拥有父类中的属性和方法
   子类不重写 __init__，实例化子类时，会自动调用父类定义的 __init__。
   如果重写了__init__ 时，实例化子类，就不会调用父类已经定义的 __init__
   如果重写了__init__ 时，要继承父类的构造方法，可以使用 super 关键字：
   super(子类，self).__init__(参数1，参数2，....)
   //另一种写法
   父类名称.__init__(self,参数1，参数2，...)
    # 类的继承
    class Person :
     classNo = 5
     def __init__ (self, uid, uname) :
      self.uid = uid
      self.uname = uname
     def getClassNo (self) : #方法中接收self的话就表示定义的实例方法
      return self.classNo
     def staticFun () : #方法中不接收self的话就表示定义的静态方法
      print('我是静态方法')
    #继承上一个类
    class Student(Person) :
     grade = '一年级'
     def __init__ (self,uid,uname,phone) :
      self.phone = phone
      # super(Student,self).__init__(uid,uname)  #继承父类型的__init__()方式1
      Person.__init__ (self,uid, uname) #继承父类型的__init__()方式2

    tom = Student(1001,'Tom','134...')
    print(tom.grade) # 一年级
    print(tom.classNo) # 5
    print(tom.uid) # 1001
    Person.staticFun() # 我是静态方法
    Student.staticFun() # 我是静态方法

 3. 多态
   python的多态 同一个函数，在不同的情况下 会有多个状态；在python中主要是通过方法的重写来实现的

    (:- 17:35)
   练习:demo56_lianxi.py
   ①创建两个类，Car SUV
   ②Car类在实例化，传递一个参数brand;定义一个方法drive:汽车正在行驶
   ③SUV类继承自Car，复写drive:汽车正在快速行驶

十三、python标准库的使用
 1. time/datetime
  (1)time
   import time
   print(time.time()) #时间戳 类似于1547778908.475174

   print(time.strftime("%y/%m/%d %H:%M:%S")) # 19/01/18 10:35:08
  (2)datetime

 2. math
十四、操作数据库 mysql-connector
 1.安装
  pip install mysql-connector
  回顾:node+mysql
   npm i mysql
   mysql = require('mysql')
   mysql.createConnection()
 2. 连接数据库执行sql语句:
  (1)引入
    import mysql.connector as c
  (2)连接指定的数据库服务器
    myConnection = c.connect(host="localhost",user="root",passwd="",database="xz")
    print(myConnection) # <mysql.connector.connection.MySQLConnection object at 0x031121D0> 表示连接成功
  (3)创建游标对象
    # myCursor = myConnection.cursor() # 查出的数据是多个tuple构成的list
    myCursor = myConnection.cursor( dictionary = True) # 查出的数据是多个dict构成的list
  (4)执行sql语句，处理结果
    sql = 'sql语句'
     #sql = 'INSERT INTO 表名 VALUES(%s,%s,%s)' # 全部参数都用%s占位
    myCursor.execute(sql,params=(val1,val2,val3)) #执行sql
     #params是tuple或list, 只有一个参数时tuple类型要加逗号
     #params = (5,) 或 params = [5] 或 (5,) 或 [5]
    result = myCursor.fetchall()   #获取查询到的结果保存在result中
    myCursor.lastrowid        #最后的自增主键的值
    myCursor.rowcount         #修改了几行
    # 当执行修改数据库数据的语句时，一定要commit才能生效
    myConnection.commit() # 如果执行需要修改数据库中的数据，一定要调用myConnection.commit()。
  (5)执行结束
   myCursor.close()  # 数据库操作完成之后将游标对象释放
   myCo.close()  # 将数据库连接关闭
  3. python借助于mysql-connector来完成连接池的操作：
  (1)引入连接池模块
   import mysql.connector.pooling as pooling
  (2)创建连接池
    connectConfig = {
     "host":"localhost",
     "user":"root",
     "passwd":"",
     "database":"xz"
    }
    pool = pooling.MySQLConnectionPool(pool_size=10, **config)
    # 从连接池得到一个连接
     myConn = pool.get_connection()
     myCursor = myConn.cursor(dictionary = True)
     sql = 'select * from xz_user where uid < %s'
     params = [5]
     myCursor.execute(sql,params)
     result = myCursor.fetchall()
     print(result)
     做数据库修改时依然要执行myConn.commit() 才能提交修改
 4. cursor 游标对象
  cursor用来执行命令的方法:
  cursor.callproc(self, procname, args):用来执行存储过程,接收的参数为存储过程名和参数列表,返回值为受影响的行数
  cursor.execute(self, query, args):执行单条sql语句,接收的参数为sql语句本身和使用的参数列表,返回值为受影响的行数
  cursor.executemany(self, query, args):执行单挑sql语句,但是重复执行参数列表里的参数,返回值为受影响的行数
  cursor.nextset(self):移动到下一个结果集
  cursor.cursor用来接收返回值的方法:
  cursor.fetchall(self):接收全部的返回结果行.
  cursor.fetchmany(self, size=None):接收size条返回结果行.如果size的值大于返回的结果行的数量,则会返回cursor.arraysize条数据.
  cursor.fetchone(self):返回一条结果行.
  cursor.scroll(self, value, mode='relative'):移动指针到某一行.如果mode='relative',则表示从当前所在行移动value条,如果mode='absolute',则表示从结果集的第一 行移动value条.

十五、Django
 准备
  django-admin startproject mysite
  django-admin startapp demo01
  py manage.py runserver

  数据库：
  py manage.py makemigrations
  py manage.py migrate
  
  创建一个超级管理用户:
  py manage.py createsuperuser

 1、概述
  django是一个基于python的框架，05年发布，早期可以用做新闻门户；
  提供了强大的后台管理系统，实现网站的前后端的所有东西
  从模板、ORM、Session、用户认证、路由系统都是内置的，甚至划分了app的概念
   (1)利用django实现:
   ①project和app的使用
   ②命令的基本用法
   ③实现后台api
    get/post
    携带的参数
    返回
   ④路由系统
   ⑤ORM
   ⑥模板语法
  (2)优缺点：
   ①免费的开源框架 有非常棒的文档
   ②功能强大，集成了ORM\模板\路由..
   ③强大的后台管理
   缺点：耦合度太高

  一些使用django的项目:
  Disqus Instagram Knight Foundation MacArthur Foundation Mozilla National Geographic Open Knowledge Foundation Pinterest Open Stack
  
  符合MVT:
  Models:
   模型层 Django 提供了一个抽象的模型 ("models") 层，为了构建和操纵你的Web应用的数据。

  View:
   Django 具有 “视图” 的概念，负责处理用户的请求并返回响应。

  Template:
   模板层提供了一个对设计者友好的语法 用于渲染向用户呈现的信息
  
 2、开始使用
  (1)安装
   pip install django
   一个django的项目就是一个project；而django可以包含多个模块，将模块称之为app

   #创建一个django的工程:
    django-admin startproject mysite

    在当前目录下创建一个文件夹mysite,这个文件夹又包含一个文件夹mysite、一个文件manage.py

  (2)启动当前的项目:
   py manage.py runserver
   测试:
   localhost:8000
   localhost:8000/admin

  (3)admin
   admin需要登录，需要创建一个管理员用户

   py manage.py makemigrations # make迁移
   py manage.py migrate # 迁移
   py manage.py createsuperuser #设置用户名，邮箱，和密码，注意：设置密码时，是不显示的

  (4)在一个project中创建一个app:
   py manage.py startapp demo01
  
 3. django服务器中为每个app配置路由
   (1)设置视图: 在app中 定义视图
   # demo01/views.py
    from django.shortcuts import render
    from django.http import HttpResponse

    # 定义路由处理函数，访问设置的路由就会触发这个函数，函数有一个参数默认会接收请求数据
    def handleIndex(request):
     return HttpResponse("hello world")
    def handleDetail(request):
     return HttpResponse('这是详情页')

  (2)设置二级路由: 在app中 配置路由系统
   # 在demo01这个文件夹中 新建urls.py
    from django.urls import path
    from . import views  # 必须写 from . 表示从当前路径引入views

    urlpatterns = [
     path("",views.handleIndex),
     path("detail",views.handleDetail)
    ]

  (3)设置一级路由: 在project 给app设置一个路由地址
   # 在mysite/urls.py 中
    from django.urls import path,include

    urlpatterns = [
     path('demo01/',include("demo01.urls"))
    ]
  
  练习:
  在当前的project，创建一个新的app：demo02
  希望路由可以被访问:
   http://localhost:8000/demo02/ 返回：这是demo02的首页
   http://localhost:8000/demo02/list 返回：这是demo02的列表页面


 4、路由接收get请求以及参数处理
  请求地址: http://localhost:8000/demo03/login?uname=tom
  在demo03/views设置路由处理函数:

   def userlogin(req) :
    print(req.GET)  # <QueryDict: {'uname': ['tom']}> get请求参数全部存放在【req.GET(查询字典)】中
    uname = req.GET['uname']
    return HttpResponse('%s登录成功'%uname)

 5. json模块(Python内置模块)
  用于从服务器响应json格式的数据给客户端使用
  (1)尝试响应json格式数据
   def userRegister(req) :
    res = {'uname':'Tom', 'upwd':'123456'}
    return HttpResponse(res) # 但客户端接收到的是 unameupwd,只有key没有value
  
  (2)正确发送json格式数据
   import json
   # json格式数据
   def userRegister(req) :
    res = {'uname':'Tom', 'upwd':'123456'}
    return HttpResponse(json.dumps(res)) # 客户端接收到 {"uname": "Tom", "upwd": "123456"}
  (3)Compact encoding:
   print(json.dumps({"c": 0, "b": 0, "a": 0}, sort_keys=True)) # {"a": 0, "b": 0, "c": 0}
   json.dumps([1, 2, 3, {'4': 5, '6': 7}], separators=(',', ':')) # '[1,2,3,{"4":5,"6":7}]'
   print(json.dumps({'4': 5, '6': 7}, sort_keys=True, indent=4)) 排序+缩进
  (4)Decoding JSON:
   json.loads('["foo", {"bar":["baz", null, 1.0, 2]}]')
   ['foo', {'bar': ['baz', None, 1.0, 2]}]
   >>> json.loads('"\\"foo\\bar"')
   '"foo\x08ar'

 5. ORM(重点)
  (0)概述
   Django默认的数据库为SQLite3
   Object Relational Mapping # (普通)对象关系映射
   不用直接编写sql，直接调用对象中的一些方法，这些方法经过映射，转换为sql完成CRUD的操作
   在计算机领域中android,java,php都有对ORM的实现
   py manage.py createsuperuser 创建管理员，设置密码时不会显示，正常写
   python manage.py makemigrations 命令，创建模型类迁移，针对模型类models.py中有新建的class类
    Migrations for 'store':
    store\migrations\0001_initial.py
     - Create model Product
    执行后，Django 在app的 migrations\ 目录下生成了一个 0001_initial.py文件，这个文件
    是 Django 用来记录我们对模型做了哪些修改的文件。比如我们在 models.py 文件里
    创建了 n 个模型类，Django 把这些变化记录在了 0001_initial.py里。
    此时还只是告诉了 Django 我们做了哪些改变，
    为了让 Django 真正地为我们创建数据库表，接下来又执行了：
   python manage.py migrate 命令，应用迁移
    Django 通过检测应用中 migrations\ 目录下的文件，得知我们对数据库做了哪些操作，
    然后它把这些操作翻译成数据库操作语言，从而把这些操作作用于真正的数据库。


  (1) 创建一个app:demo03并先将路由系统配置好，并注册app到INSTALLED_APPS
   以后每创建一个app都要到这里注册
  A. py manage.py startapp demo03 #创建一个新的app
  B. 在项目配置目录下的settings.py 中追加注册
   INSTALLED_APPS = [
   ......
   'demo03'
   ]
  (2) 创建一个模型类(表)  
   属性=models.字段类型(选项)
  在 demo03/models.py 中
   from django.db import models
   class ProductItem(models.Model) :  #继承models.Model
    pname = models.CharField(max_length = 100)
    pinfo = models.CharField(max_length = 100)
    objects = models.Manager() # 固定写法，不写也会正常运行, 只是使用ProductItem.objects的时候语法检查会报错。
    ...
   # models中的字段类型(类似于sql中的列类型指定)
    models.CharField(max_length=255)
    models.TextField()
    models.DateField()
    models.IntegerField()
    DecimalField(max_digits = 10, decimal_places =2) #前者总位数，后者小数位数
    FloatField
    models.ManyToManyField()
    models.ForeignKey()
  
  (3) 注册模型类
   # 在 demo03/admin.py 中
   将创建的模型类注册到admin的site (然后到后台的admin中即可对模型进行管理)
    from django.contrib import admin
    from .models import ProductItem
    admin.site.register(ProductItem)
  (4)在demo03/views.py中创建路由方法
   from . import models
   from .models import ProductItem
   import json

   # 添加一个商品
   def handleAdd (req) :
    title = req.GET['title']
    content = req.GET['content']
    item = ProductItem()  # 模型类的实例化
    item.pname = title  # 模型类的赋值
    item.pinfo = content
    # 前三行可以简写为 item = ProductItem(pname = title, pinfo = content)
    item.save()
    return HttpResponse('这是添加操作')
   # 查看商品的列表并返回给客户端
   def handleList(req):
    result = ProductItem.objects.values() # 结果是queryset而不是list类型
    myList = list(result) # 将查询结果转为list类型
    print(myList)
    return HttpResponse(myList)

   # 查看id为1的商品数据并返回给客户端
   def handleDetaills(req):
    item = ProductItem.objects.get(id = 1)
    #为了方便item做json序列化，需要做以下设置
    myDict = item.__dict__
    myDict.pop('_state')
    return HttpResponse(json.dumps(myDict))

  C. 生成表结构 映射到真实的数据库(模型类的激活)
   py manage.py makemigrations
    #makemigrations 命令，Django 会检测你对模型文件的修改
    (在这种情况下，你已经取得了新的)，并且把修改的部分储存为一次 迁移
   py manage.py migrate
    #这个 migrate 命令检查 INSTALLED_APPS 设置，为其中的每个应用创建需要的数据表

    检查：localhost:8000/admin 登陆后查看后台管理系统有没有添加额外的的表结构

  (5)使用模型类，完成数据库的CRUD
   插入:
    p = ProductItem(title="商品1",detail="这是商品1的详情")
    p.save()
   获取所有的行：
    result = ProductItem.objects.all()

  (6)ORM所支持的常见操作：
  增
   方式1：
   product = ProductItem(brand='bmw',price=30)
   product.save()
   方式2:
   product = ProductItem()
   product.brand = 'bmw'
   product.price = 30
   product.save()
  删:
   result = ProductItem.objects.get(brand='bmw')
   result.delete()
  改
   product = ProductItem.objects.get(brand=request.GET['brand'])
   product.price = request.GET['price']
   product.save()
  查
   ProductItem.objects.get(fname = 'Tom')
   ProductItem.objects.all()
   ProductItem.objects.values('列名如fname') # .values('uname')

  (7)json的处理:
    import json
    json.dumps() 转换为json格式的字符串(json序列化)
    json.loads() 将json的字符串转为其它的数据类型
   views.py的路由方法中
    id = req.GET['id']
    result = Friend.objects.get(id = id) #根据id获取到数据无法直接完成json序列化

    myData = result.__dict__  #取出dict类型的数据
    print(mydata) #{'_state': <django.db.models.base.ModelState object at 0x0468FA70>, 'id': 1, 'fname': 'tom', 'fage': 23}
    mydata.pop('_state')  #第一项不需要，先去除
    print(mydata) #去除第一项后的结果{'id': 1, 'fname': 'tom', 'fage': 23}可以进行json序列化返回到客户端了
    data = json.dumps(mydata) #将dict进行json序列化后再返回客户端
    print(type(data)) #<class 'str'>json序列化之后数据就变成字符串了
    return HttpResponse(data) #序列化后页面返回{"id": 1, "fname": "tom", "fage": 23}而不是 'idfnamefage'
  处理技巧:
   在当前的project，输入py manage.py shell进入到django项目的命令解析模式，在shell中输入py语句 执行对应的代码
   比如:
    from product.models import ProductItem
    ProductItem.objects.all()
    product = ProductItem(brand='honda',price=20)
    product.save()

  练习:
  ①在当前的sina的project中，完成一个news的app的创建和注册
  ②创建路由系统
   localhost:8000/news/add?content=新闻内容&title=新闻标题 保存起来 返回'添加成功'
   localhost:8000/news/list 获取新闻标题列表，以json的格式返回

  ③完成ORM的处理
   创建一个模型类NewsItem,包含两个属性content\title 都是字符串
   注册到admin
   激活

  (8)[可选]将默认的SQLite更换为MySQL
   A. 注释默认的SQLite3配置：
    项目settings.py中
    DATABASES = {
      'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
      }
    }
   B. 添加MySQL配置(配置你自己的mysql库前提是你已经有能够供自己使用的MySQL库了)
    DATABASES = {
      'default': {
        'ENGINE': 'django.db.backends.mysql', #固定配置
        'HOST': '127.0.0.1',#mysql地址
        'PORT': '3306',#端口号
        'NAME': 'guest',#库名（组名）
        'USER': 'root',#用户
        'PASSWORD': '123456',#密码
        'OPTIONS': {'init_command': "SET sql_mode='STRICT_TRANS_TABLES'", },
      }
    }
   C. 迁移数据库
    为了让 Django 完成翻译，使用我们在modele.py已经创建好的这些数据库表，
    我们请出我的工程管理助手 manage.py。激活虚拟环境，切换到 manage.py 文件
    所在的目录下，分别运行 python manage.py makemigrations和 python manage.py migrate命令
   D. 如果你使用的是mysql会生成0001_auto_20180507_2145.py
    如果你需要在mysql和SQLite3之间切换你需要重新执行python manage.py makemigrations和
    python manage.py migrate命令，而且你原来库中的数据不会转移
    (执行完上面两个命令只会在新的数据库中创建modele.py中的表)。

 6. 模板语法(重要)
  Django是自带template模块，可以通过HttpResponse返回一个模板内容，可以是html...
  (1)基本步骤
   A. 创建模板
    在当前app目录下创建templates目录，再在templates目录中创建一个子目录存放html
     store/templates/store/index.html
   B. 在views.py文件中
    from django.shortcuts import render
    from django.http import HttpResponse
    from django.template import loader  # 引入模板加载工具

    def handleIndex(req) :
     tpl = loader.get_template('store/index.html') #使用模板加载工具
     return HttpResponse(tpl.render()) # 渲染加载出来的模板到页面
   C. 配置路由系统调用路由方法即可访问
    http://127.0.0.1:8000/store/index
    会将index.html 的内容渲染到页面
   D. 动态传参、接收
    # 在路由方法中
     id = req.GET['id']
     tpl.render({'id':id}) #render中的数据必须是dict类型,字典key必须用引号包裹
    # 在模板html中插入数据
     这是id为{{id}}的商品
  
   练习:
   在当前的news的app中，创建一个路由all,返回给h2(显示当前NewsItem所有的数据的个数)
   ①创建一个views的方法
   ②配置路由
   ③创建模板文件 all.html
   ④加载模板，并传值
  
  (2)django模板引擎所支持的模板语法
   {{}}
   {{}}之中不支持表达式，比如{{data[0]}},{{item + 1}}...
  
   A. 数据循环渲染:
    {% for story in story_list %}
     <h2>{{story}}</h2>
     {{forloop.counter}} #循环中的特殊属性：下标计数器，从1开始每次+1
     {{forloop.counter0}}#循环中的特殊属性：下标计数器，从0开始每次+1
     {{forloop.first}}  #循环中的特殊属性：当前循环是否是第一个元素，True/False
     {{forloop.last}}  #循环中的特殊属性：当前循环是否是最后一个元素，True/False
    {% endfor %}
   B. 数据条件判断:
    {% if score > 60 %}
     <h2>成绩及格</h2>
    {% else %}
     <h2>成绩不及格</h2>
    {% endif %}
   C. 综合写法
    <ul>
     {% for item in data %}
      <li>forloop.counter0：{{forloop.counter0}}</li>
      <li>forloop.counter：{{forloop.counter}}</li>
      <li>forloop.first：{{forloop.first}}</li>
      <li>forloop.last：{{forloop.last}}</li>
      {%  if item >= 100 %}
       <li>{{ item }}</li>
      {% elif item >= 200%}
       <li>{{ item }}</li>
      {% else %}
       <li>{{ item }}</li>
      {% endif%}
      <li>--------------------------</li>
     {% endfor %}
    </ul>

  综合练习:
   ①完成一个app的创建和注册:product
   ②完成模型类的创建、注册、激活
   Product
    title/price/pid
    ③创建视图并配置路由
   (数据的添加：py manage.py shell)
   localhost:8000/product/list
   返回一个html文件， 文件中有一个无序列表，列表项显示商品的标题
  考察的细节：
  ①路由系统的搭建 V (views)
   创建视图 配置路由
  ②模型数据的准备 M (models)
   创建模型类、注册到admin、激活
   通过模型类来实现CRUD
  ③模板 T(templates)
   模板的创建、载入、渲染、语法

 7. Django跨域处理：
  (1)跨域处理:
   A. 安装django跨域工具
    pip install django-cors-headers
   B. 注册到INSTALLED_APPS、MIDDLEWARE
    找到settings.py中的INSTALLED_APPS添加'corsheaders':
     INSTALLED_APPS = (
       ...
       'corsheaders',
       ...
     )
    找到settings.py中的MIDDLWARE的数组添加:
     MIDDLEWARE = [
       'corsheaders.middleware.CorsMiddleware', #将此行添加到数组的最前面
       ...
       ...
     ]

   C. 在MIDDLWARE数组后，设置白名单以及允许cookie
    CORS_ORIGIN_WHITELIST = (
      '127.0.0.1:8080',
      'localhost:8080',
      ...
    )
    CORS_ALLOW_CREDENTIALS = True  # 允许携带cookie
   配置好之后客户端即可发送get请求了
  (2)post请求中的参数
   A. 关闭CSRF(post请求会被forbidden)
    在settings.py 中的MIDDLEWARE中
    注释/去除掉这一行代码: 'django.middleware.csrf.CsrfViewMiddleware'后即可发送post请求
   B. 接收POST请求时的参数
    myData = req.body.decode("utf-8")
    # 实现一个json的反序列化
    myDic = json.loads(myData)
   路由方法:
    def handleLogin (req) :
     # print(req.body)  # b'{"uname":"Tom"}' 是一个字节码，需要解码
     userStr = req.body.decode('utf-8')  # {"uname":"Tom"} 解码后其实还是一个json字符串
     userDict = json.loads(userStr)  # json反序列化，将json字符串转为dict字典
     uname = userDict.get('uname')
     return HttpResponse('%s登录成功'%uname)
十六、Django综合练习
 1. 创建一个新的工程
   (1)创建一个新的工程 xuezi
   django-admin startproject xuezi //创建工程项目xuezi
   cd xuezi //进入xuezi目录
 2. 完成一个app的创建和注册 store
   py manage.py startapp store
  settings.py中 注册
   INSTALLED_APPS = [
     ......,
     'store'
   ]
 3. 设置管理员，并完成模型类 Product 的创建、激活、注册到admin
  py manage.py createsuperuser 创建管理员
  (1)创建模型类
   包含两个属性: title  price
   在app的models.py中
    from django.db import models
    class Product(models.Model):
     title = models.CharField(max_length = 100)
     price = models.DecimalField(max_digits = 10, decimal_places = 2)
     objects = models.Manager()
  (2)注册模型类
   在app的admin.py中
    from django.contrib import admin
    from .models import Product
    # Register your models here.
    admin.site.register(Product)

  (3)迁移数据库：创建模型类并应用
   python manage.py makemigrations //创建迁移
   python manage.py migrate //应用迁移
   完成之后用管理员账号登录admin页面可查看已经添加到数据库
 4. 配置跨域请求及允许post请求
  (1)跨域请求
   A. 安装跨域模块
    pip install django-cors-headers
   B. 注册到INSTALLED_APPS、MIDDLEWARE
    #找到settings.py中的INSTALLED_APPS添加'corsheaders':
     INSTALLED_APPS = (
       ...
       'corsheaders',
       ...
     )
    #找到settings.py中的MIDDLWARE的数组在开头添加:
     MIDDLEWARE = [
       'corsheaders.middleware.CorsMiddleware', #将此行添加到数组的最前面
       ...
       ...
     ]
   C. 在MIDDLWARE数组后，设置白名单以及允许cookie
    CORS_ORIGIN_WHITELIST = (
      '127.0.0.1:8080',
      'localhost:8080',
      ...
    )
    CORS_ALLOW_CREDENTIALS = True  # 允许携带cookie
   D. 配置好之后客户端即可发送get请求了
 5. 在app的views.py中创建几个api
   (1)接口1：store/add
   post {title:"",price:""}
   接收post请求中的参数，插入到数据库，返回json格式字符串{"code":1,"msg":"添加成功"}
  
   (2)接口2：store/del
   get /store/del?id=1
   接收get请求中的参数，从数据库中将此数据删除
   返回json格式字符串{"code":1,"msg":"删除成功"}

   (3)接口3：store/modify
   post {id:1,price:30}
   接收post请求中的参数，查询指定id的商品，修改价格
   返回json格式字符串{"code":1,"msg":"修改成功"}

   (4)接口4：store/list
   get
   获取所有的商品数组，返回json格式的数据
   {"code":1,"list":**}
   #views.py中:
    from django.shortcuts import render
    from django.http import HttpResponse
    from .models import Product
    import json
    # Create your views here.

    # 添加商品
    def addProduct(req):
     reqStr = req.body.decode("utf-8")
     print(reqStr)
     reqDict = json.loads(reqStr)
     print(reqDict)
     title = reqDict.get('title')
     price = float(reqDict.get('price'))
     print(type(price))
     item = Product(title = title, price = price)
     item.save()
     res = json.dumps({'code':1, 'msg':'添加成功'})
     return HttpResponse(res)

    #删除商品
    def delProduct(req):
     id = req.GET['id']
     result = Product.objects.get(id = id)
     result.delete()
     res = json.dumps({'code':1, 'msg':'删除%s号商品成功'%id})
     return HttpResponse(res)

    #修改商品
    def modifyProduct(req):
     reqStr = req.body.decode('utf-8')
     reqDict = json.loads(reqStr)
     id = int(reqDict.get('id'))
     price = float(reqDict.get('price'))
     result = Product.objects.get(id = id)
     result.price = price
     result.save()
     res = json.dumps({'code':1, 'msg':'修改%s号商品成功'%id})
     return HttpResponse(res)

    #查询商品列表
    def getProductsList(req):
     result = Product.objects.values()
     result = list(result)
     print(type(result))
     res = json.dumps({'code':1,'list':result})
     return HttpResponse(res)

    # 查看单个商品数据并返回给客户端
    def handleDetaills(req):
     item = ProductItem.objects.get(id = 1)  #Product object (1)
     #为了方便item做json序列化，需要做以下设置
     myDict = item.__dict__
     myDict.pop('_state')
     return HttpResponse(json.dumps(myDict))

 5. 配置路由系统
  (1)在app目录下新建urls.py配置路由和路由方法
   from django.urls import path
   from . import views
   urlpatterns = [
    path('/add', views.addProduct),
    path('/del', views.delProduct),
    path('/modify', views.modifyProduct),
    path('/list', views.getProductsList),
   ]

  (2)在项目配置的urls中
   from django.contrib import admin
   from django.urls import path,include
   urlpatterns = [
     path('admin/', admin.site.urls),
     path('store', include('store.urls'))
   ]

九、项目课
 1. 概述
  (1)目标：重构净美仕官网项目，实现一个前后端分离的项目
  http://www.codeboy.com/mfresh 预览项目
  http://www.codeboy.com/mfresh/mfresh.zip 下载源码
  
  (2)技术分析
   之前的架构:
    php+原生的前端技术

   新的技术架构：
    web服务器---django内置的http
    数据库服务器--django内置sql服务器
    后台的api--django内置的路由系统以及ORM
    前端页面---vue+vuex
 9.1 分析
 分析当前的项目构成:
 前端:首页、登录、注册、关于、产品、新闻、购物车

 后台api:
  购物车、新闻、商品、用户

 9.2 重构后台API(使用django)

 9.2.1 创建一个django的工程
  django-admin startproject mfresh

 9.2.2 在此工程中创建4个app(:-16:40)
  py manage.py startapp **
  cart/user/product/news
  (要记得将app注册到INSTALLED_APPS)

 9.2.3 路由系统的搭建
  ①创建视图 views.py
  ②配置二级路由地址(app内部) urls.py
  ③配置一级路由地址(project) urls.py
  user:
    check_name?uname=zhangsan
    register?uname=zhangsan&upwd=12345
    login?uname=zhangsan&upwd=123456
  cart:
   add?cid=1&userid=1
   delete?cid=1
   update?cid=1&pid=1&count=1
   list?cid=1
  product:
   list
   detail？pid=1
  news：
   list
   detail?id=1

 9.2.4 完成app内部模型类的创建、注册、激活
  模型类的创建：models.py
  注册:admin.py
  激活：
    py manage.py makemigrations
     py manage.py migrate

  py manage.py createsuperuser
  
  cart:
   CartItem :cid/userId
   CartItemDetail:cartId/pid/count
  product:
   ProductItem:pid/title/price
  news：
   NewsItem:title/content
  user:
   User:uname/upwd

 9.2.5 ORM
  完成user模块中的3个api的具体要求：
   {"code":1,"msg":""}

  register?uname=zhangsan&upwd=12345
   保存
   check_name?uname=zhangsan
   查询指定的用户名是否存在
  login?uname=zhangsan&upwd=123456
   登录

  完成News模块中的api的处理:
   list
   detail?id=1
   ①自己手工到admin后台管理系统初始化5条数据
   ②实现list，获取所有的数据，json返回
   ③实现detail，获取指定id对应的详情，json返回

  (:- 11:40)
  完成Product模块中的api的处理:
   在Product模块中手工添加5条数据
   product:
   list
   detail?pid=1


 9.3 使用Vue重构前端页面
 准备工作:
 下载vue_template.rar到指定的目录C:\xampp\htdocs\framework\6_django\mfresh_frontend，解压缩到当前文件夹，用vscode打开这个工程

 npm i //安装vue模板项目需要的依赖的包

 npm start //启动开发服务器

 回顾:
  ①vue中组件的创建、使用
  SFC single file component 单文件组件系统
  **.vue
  组件：可被反复使用的，带有特定功能的模板内容

  组件的创建:
   ①.vue
   ②Vue.component("",{
    components:{}
   })
  组件的调用:
   ①路由地址
   ②嵌套调用


  ②vue中基本语法
  指令、过滤器、属性、插件
  vue官方提供了两个核心插件:vueRouter/vuex

  自定义插件的创建和使用
   MyPlugin = {
    install:function(vue){
     //在此插件的内部，封装组件、过滤器、指令。。。
    }
   }

   Vue.use(MyPlugin)


  ③vue中组件间内部通信
   props down
    <son myTitle=""></son>
    son:
     {
      props:['myTitle']//this.myTitle
     }

   events up
    handleEvent(msg){}
    <son @myEvent="handleEvent"></son>
    this.$emit(myEvent,123)

   bus:基于事件的机制
   main.js
    Vue.prototype.$bus = new Vue()
    this.$bus.$on('myEvent',(msg)=>{})
    this.$bus.$emit('myEvent',123)


  ④vue中网络通信
  axios
   安装:
   npm i axios
   引入，使用
   import Axios from 'axios'

   Axios.get/post().then((response)=>{
    //response.data
   })

  ⑤vue-router(路由系统)
   基本配置
    创建组件
    创建容器 <router-view></router-view>
    配置路由词典
     [
      {path:'',component:**},
      {}
     ]
    配置路由器
     new Router({
      routes:[]
     })
    调用路由器
     new Vue({
      router:**
     })
   跳转
   this.$router.push()/go()/back()..
   传参
   配置接收方的路由地址
    /detail --> /detail/:id
   传参
    this.$router.push('/detail/10')
   接收参数
    this.$route.params.id
   嵌套:
   A需要嵌套B、C
   步骤1：给A组件的模板指定一个容器
   步骤2：给A组件设置子路由 children
   守卫：
    全局守卫
     router.beforeEach((to,from,next)=>{
      next()//放行
      next(false)//禁止访问
     })

    路由独享守卫
    {
     path:'',
     component:**,
     beforeEnter:(to,from,next)=>{

     }
    }
  

   练习: (:- 16:45)
   步骤1：在当前的vue项目中，创建两个组件 Demo06List/Demo06Detail.vue
   步骤2：在Demo06List组件，挂载完，向服务器发请求http://jsonplaceholder.typicode.com/todos；将请求到的数据保存，渲染在无需列表，列表项显示一个标题(title)和复选框(completed)
   步骤3：点击列表项的标题，跳转到Demo06Detail,同时将id传递，接收到id直接打印在终端
  
  ⑥vuex
  为什么需要Vuex?
   中大型Vue项目 组件间通讯会变得非常复杂，简化通讯任务，使用vuex
  
  Vuex如何解决问题？
   Vuex借助于状态来集中式管理数据，读写操作都要经过vuex
  
  准备工作:
   npm i vuex
   import Vuex from 'vuex'
   Vue.use(Vuex)//this.$store

  核心概念：
   state:
    //state是负责来初始化数据的
     state:{
      id:0,
      list:[1,2,3,4,5]
     },
   getters:
    //getters是负责在state原始数据基础之上，派生新的数据
    getters:{
     getOddList(state){
      return [2,4]
     }
    },
   mutations:
     //mutations是负责来定义修改数据的方法，认为类似事件绑定 this.$store.commit('getList',12)
     mutations:{
      modifyList(state){
       var num  = Math.floor(Math.random()*100)
       state.list.push(num)
      },
      getList(state,list){
       state.list = list
      }
     },
   actions:
   需要异步的来修改数据，异步操作写在action，数据操作还要靠触发mutation来实现 this.$store.dispatch("myInit")
    actions:{
      myInit(context){
       //异步操作
       setTimeout(()=>{
        var myList = ["商品1","商品2","商品3"]
        //保存在state:应该通过触发mutation来实现
        context.commit("getList",myList)
       },3000)
      }
     }
   modules:
    const moduleA = {
     state: { ... },
     mutations: { ... },
     actions: { ... },
     getters: { ... }
    }

    const moduleB = {
     state: { ... },
     mutations: { ... },
     actions: { ... }
    }

    const store = new Vuex.Store({
     modules: {
      a: moduleA,
      b: moduleB
     }
    })

    store.state.a // -> moduleA 的状态
    store.state.b // -> moduleB 的状态




```
