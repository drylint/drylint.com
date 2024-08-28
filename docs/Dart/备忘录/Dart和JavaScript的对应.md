# Dart和JavaScript的对应

## 数组相关

| 功能                           | Dart 方法                        | JavaScript 方法                 |
|--------------------------------|----------------------------------|---------------------------------|
| **创建数组**                   | `List arr = [1, 2, 3];`          | `let arr = [1, 2, 3];`          |
| **获取数组长度**               | `arr.length`                     | `arr.length`                    |
| **添加元素到数组末尾**         | `arr.add(4);`                    | `arr.push(4);`                  |
| **在指定位置插入元素**         | `arr.insert(index, element);`    | `arr.splice(index, 0, element);`|
| **删除数组末尾元素**           | `arr.removeLast();`              | `arr.pop();`                    |
| **删除指定位置的元素**         | `arr.removeAt(index);`           | `arr.splice(index, 1);`         |
| **删除指定元素**               | `arr.remove(element);`           | `arr.splice(arr.indexOf(element), 1);` |
| **合并数组**                   | `arr1.addAll(arr2);`             | `arr1.concat(arr2);`            |
| **查找元素索引**               | `arr.indexOf(element);`          | `arr.indexOf(element);`         |
| **检查元素是否存在**           | `arr.contains(element);`         | `arr.includes(element);`        |
| **反转数组**                   | `arr.reversed.toList();`         | `arr.reverse();`                |
| **排序数组**                   | `arr.sort();`                    | `arr.sort();`                   |
| **移除所有元素**               | `arr.clear();`                   | `arr.length = 0;`               |
| **遍历数组**                   | `arr.forEach((element) {...});`  | `arr.forEach(element => {...});`|
| **获取数组的子数组**           | `arr.sublist(start, end);`       | `arr.slice(start, end);`        |
| **筛选数组**                   | `arr.where((e) => condition).toList();` | `arr.filter(element => condition);` |
| **映射数组**                   | `arr.map((e) => newElement).toList();` | `arr.map(element => newElement);` |
| **按条件查找第一个元素**       | `arr.firstWhere((e) => condition);` | `arr.find(element => condition);` |
| **按条件查找最后一个元素**     | `arr.lastWhere((e) => condition);`  | `arr.findLast(element => condition);` |
| **按条件查找第一个元素索引**   | `arr.indexWhere((e) => condition);` | `arr.findIndex(element => condition);` |
| **检查所有元素是否符合条件**   | `arr.every((e) => condition);`   | `arr.every(element => condition);` |
| **检查是否存在符合条件的元素** | `arr.any((e) => condition);`     | `arr.some(element => condition);` |
| **获取第一个元素**             | `arr.first`                      | `arr[0]`                        |
| **获取最后一个元素**           | `arr.last`                       | `arr[arr.length - 1]`           |
| **减少数组长度**               | `arr.length = newLength;`        | `arr.length = newLength;`       |
| **合并数组到新数组**           | `List.of(arr1 + arr2)`           | `arr1.concat(arr2);`            |
| **检查数组是否为空**           | `arr.isEmpty`                    | `arr.length === 0`              |
| **展开数组**                   | `[...]arr`                       | `...arr`                        |
| **数组的迭代器**               | `arr.iterator`                   | `arr.entries()`                 |
| **获取随机元素**               | `arr[Random().nextInt(arr.length)]` | `arr[Math.floor(Math.random() * arr.length)]` |
| **生成重复元素的数组**         | `List.filled(length, element)`   | `Array(length).fill(element)`   |
| **在数组前面添加元素**         | `arr.insertAll(0, [element]);`   | `arr.unshift(element);`         |
| **减少数组容量**               | `arr.length = newLength;`        | `arr.length = newLength;`       |
