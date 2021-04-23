# class

[toc]

传统方法中，JavaScript 通过构造函数实现类的概念，通过原型链实现继承。而在 ES6 中，我们终于迎来了 class。

TypeScript 除了实现了所有 ES6 中的类的功能以外，还添加了一些新的用法。

## 类的相关概念

- **类(Class)**：定义了一件事物的抽象特点，包含它的属性和方法
- **对象（Object）**：类的实例，通过 new 生成
- **面向对象（OOP）的三大特性**：封装、继承、多态
- **封装（Encapsulation）**：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
- **继承（Inheritance）**：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
- **多态（Polymorphism）**：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
- **存取器（getter & setter）**：用以改变属性的读取和赋值行为
- **修饰符（Modifiers）**：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
- **抽象类（Abstract Class）**：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
- **接口（Interfaces）**：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口

## TypeScript 中类的用法

TypeScript 中实现了所有 JavaScript 中的 class 用法，还添加了一些新的用法。

### 1. 创建类

创建类的方式同 JavaScript 中一样。

```ts
// 创建类
class Student{
    uname: string // 定义实例属性
    age: number // 定义实例属性
    foods: string = 'rice' // 定义实例属性并赋值
    static work = 'study' // 定义静态属性并赋值

 constructor (uname: string, age: number) {
  this.uname = uname
  this.age = age
  // 属性需要先定义后使用，没定义的不能使用
  // this.gender = 1 // 报错 Property 'gender' does not exist on type 'Student'.
 }

 // 实例方法
 intro () {
  console.log(`I am ${this.uname}, ${this.age} years old`)
 }

 // 静态方法
 static works () {
        // 静态方法只能访问静态属性
        console.log(`My work is ${this.work}`)

        // 访问实例属性会报错
        // console.log(this.uname) // Property 'uname' does not exist on type 'typeof Student'.
 }
}

// 使用类创建一个实例对象
let tom = new Student('tom', 20)
console.log(tom) // Student {foods: "rice", uname: "tom", age: 20}
console.log(tom.uname) // 'tom'
console.log(tom.age) // 20
tom.intro() // 'I am tom, 20 years old'
Student.works() // 'My work is study'
```

### 2. 访问修饰符 `public` `private` `protected`

- `public` 所有的属性和方法的默认修饰符，修饰的属性或方法是公有的，可以在任何地方被访问到。
- `private` 修饰的属性或方法是私有的，不能在声明它的类的外部访问
- `protected` 修饰的属性或方法是受保护的，它和 `private` 类似，区别是它在子类中也是允许被访问的

#### `private`

`private` 修饰的属性，在实例中和子类中访问都会报错：

```ts
class Student {
  private gender: number
  public constructor (gender: number) {
    this.gender = gender
  }
  intro () {
    // OK 在类自身中可以访问 private 属性
    console.log(this.gender)
  }
}

let tom = new Student(1)
// 实例中不能访问类中的 private 属性
// 报错 Property 'gender' is private and only accessible within class 'Student'.
console.log(tom.gender)
tom.intro() // 1 类中的 private 属性只能通过类自身中的方法去访问

// 子类中也不能访问父类中的 private 属性
class Boy extends Student {
  constructor (gender: number) {
    super(gender)

    // 报错 Property 'gender' is private and only accessible within class 'Student'.
    console.log(this.gender)
  }
  intro () {
    // 报错 Property 'gender' is private and only accessible within class 'Student'.
    console.log(this.gender)
  }
}
```

使用 `private` 修饰构造函数时，该类不允许被继承或者实例化：

```ts
class Student {
  private gender: number
  private constructor (gender: number) {
    this.gender = gender
  }
}

// 报错 Constructor of class 'Student' is private and only accessible within the class declaration.
let tom = new Student(1)

// 报错 Cannot extend a class 'Student'. Class constructor is marked as private.
class Boy extends Student {
  // ...
}

```

#### `protected`

`protected` 修饰的属性，在子类中可访问，实例中访问会报错。

```ts
class Student {
  protected gender: number
  public constructor (gender: number) {
    this.gender = gender
  }
}

let tom = new Student(1)
// 实例中不能访问类中的 private 属性
// 报错 Property 'gender' is protected and only accessible within class 'Student' and its subclasses.
console.log(tom.gender)

// 子类中也不能访问父类中的 private 属性
class Boy extends Student {
  constructor (gender: number) {
    super(gender)

    // OK 子类中可访问父类 protected 属性
    console.log(this.gender)
  }
  intro () {
    // OK 子类中可访问父类 protected 属性
    console.log(this.gender)
  }
}
```

使用 `protected` 修饰构造函数时，只允许被继承，不允许被实例化：

```ts
class Student {
  private gender: number
  protected constructor (gender: number) {
    this.gender = gender
  }
}

// protected 修饰的构造函数不允许被实例化
// 报错 Constructor of class 'Student' is protected and only accessible within the class declaration.
let tom = new Student(1)


// OK, protected 修饰的构造函数可以被继承
class Boy extends Student {
  // ...
}
```

#### 修饰符简写

修饰符可以使用在构造函数参数中，等同于类中定义该属性并接收该参数值，使代码更简洁。

```ts
class Student {
  constructor (protected gender: number, public uname: string, private age: number) {
  }
  intro () {
    console.log(`I am ${this.uname}, ${this.age} years old, gender: ${this.gender}`)
  }
}

let tom = new Student(1, 'Tom', 20)
console.log(tom) // Student {gender: 1, uname: "Tom", age: 20}
tom.intro() // 'I am Tom, 20 years old, gender: 1'
```

### 3. `readonly`

只读属性关键字，只允许出现在属性声明或索引签名中。

注意如果 `readonly` 和其他访问修饰符同时存在的话，需要写在其后面。

```ts
class Student {
  constructor (public readonly uname: string) {
  }
}

let tom = new Student('Tom')
console.log(tom)
tom.uname = 'tom1' // 报错 Cannot assign to 'uname' because it is a read-only property.
```

### 4. 抽象类 `abstract class`

- 用 `abstract` 关键字定义抽象类和抽象方法，可以包含访问修饰符。

    ```ts
    abstract class Student {
      constructor (public uname: string) {}
      protected abstract intro (): string
    }
    ```

- 抽象类是提供给其他类继承的基类，不能直接被实例化。

    ```ts
    abstract class Student {
      constructor (public uname: string) {}
    }

    // 报错 Cannot create an instance of an abstract class.
    let tom = new Student('Tom')
    ```

- 抽象类中的抽象方法不能有具体实现，必须在继承的类中实现。

    ```ts
    abstract class Student {
      constructor (public uname: string) {}
      abstract intro (): string // 定义抽象方法，子类必须实现此方法
    }

    // 报错
    // Non-abstract class 'Boy' does not implement inherited abstract member 'intro' from class 'Student'.
    // 子类没有实现父类定义的抽象方法
    class Boy extends Student {
      constructor (uname: string) {
        super(uname)
      }
    }

    // 实现父类定义的抽象方法，参数和返回值类型也需要满足。
    class Boy2 extends Student {
      constructor (uname: string) {
        super(uname)
      }
      intro () {
        return `I am ${this.uname}`
      }
    }
    ```

- `abstract` 定义的抽象方法只能放在抽象类之中

    ```ts
    class Student {
      constructor (public uname: string) {}
      // 报错
      // Abstract methods can only appear within an abstract class.
      protected abstract intro (): string
    }
    ```

### 类的类型

给类加上 TypeScript 的类型很简单，与接口类似：

```ts
class Student {
  constructor (public uname: string) {}
  intro () {
    return `I am ${this.uname}`
  }
}

// OK
let tom: Student = new Student('Tom')

// OK
let tom1: Student = {
  uname: 'tom',
  intro () {
    return `I am ${this.uname}`
  }
}

// Property 'intro' is missing in type '{ uname: string; }' but required in type 'Student'.
let tom2: Student = {
  uname: 'tom'
}

let tom3: Student = {
  uname: 'tom',
  // Object literal may only specify known properties, and 'age' does not exist in type 'Student'.
  age: 20,
  intro () {
    return `I am ${this.uname}`
  }
}

```

## 类与接口

接口（Interfaces）除了可以用于对「对象的形状（Shape）」进行描述。

还可以对类的一部分行为进行抽象。
