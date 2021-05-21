[browserslist 官方 github](https://github.com/browserslist/browserslist)

[根据关键词查看包含的browserslist](https://browserl.ist/)

> 比如：输入 ` > 0.2% ` 可查询占有率大于 0.2% 的浏览器

```js
查询条件列表
你可以用如下查询条件来限定浏览器和 node 的版本范围（大小写不敏感）：

> 5%: 基于全球使用率统计而选择的浏览器版本范围。>=,<,<=同样适用。
> 5% in US : 同上，只是使用地区变为美国。支持两个字母的国家码来指定地区。
> 5% in alt-AS : 同上，只是使用地区变为亚洲所有国家。这里列举了所有的地区码。
> 5% in my stats : 使用定制的浏览器统计数据。
cover 99.5% : 使用率总和为99.5%的浏览器版本，前提是浏览器提供了使用覆盖率。
cover 99.5% in US : 同上，只是限制了地域，支持两个字母的国家码。
cover 99.5% in my stats :使用定制的浏览器统计数据。
maintained node versions :所有还被 node 基金会维护的 node 版本。
node 10 and node 10.4 : 最新的 node 10.x.x 或者10.4.x 版本。
current node :当前被 browserslist 使用的 node 版本。
extends browserslist-config-mycompany :来自browserslist-config-mycompany包的查询设置
ie 6-8 : 选择一个浏览器的版本范围。
Firefox > 20 : 版本高于20的所有火狐浏览器版本。>=,<,<=同样适用。
ios 7 :ios 7自带的浏览器。
Firefox ESR :最新的火狐 ESR（长期支持版） 版本的浏览器。
unreleased versions or unreleased Chrome versions : alpha 和 beta 版本。
last 2 major versions or last 2 ios major versions :最近的两个发行版，包括所有的次版本号和补丁版本号变更的浏览器版本。
since 2015 or last 2 years :自某个时间以来更新的版本（也可以写的更具体since 2015-03或者since 2015-03-10）
dead :通过last 2 versions筛选的浏览器版本中，全球使用率低于0.5%并且官方声明不在维护或者事实上已经两年没有再更新的版本。目前符合条件的有 IE10,IE_Mob 10,BlackBerry 10,BlackBerry 7,OperaMobile 12.1。
last 2 versions :每个浏览器最近的两个版本。
last 2 Chrome versions :chrome 浏览器最近的两个版本。
defaults :默认配置> 0.5%, last 2 versions, Firefox ESR, not dead。
not ie <= 8 : 浏览器范围的取反。

可以添加not在任何查询条件前面，表示取反

```

```js
您可以通过查询指定浏览器和Node.js版本（不区分大小写）：

> 5%：全球使用情况统计选择的浏览器版本。 >=，<也<=工作。
> 5% in US：使用美国使用情况统计。它接受两个字母的国家/地区代码。
> 5% in alt-AS：使用亚洲地区使用情况统计。可在以下位置找到所有地区代码的列表caniuse-lite/data/regions。
> 5% in my stats：使用自定义使用数据。
cover 99.5%：提供覆盖的最流行的浏览器。
cover 99.5% in US：与上述相同，使用双字母国家代码。
cover 99.5% in my stats：使用自定义使用数据。
maintained node versions：所有Node.js版本，仍由 Node.js Foundation 维护。
node 10和node 10.4：选择最新的Node.js 10.x.x 或10.4.x发布。
current node：Browserslist目前使用的Node.js版本。
extends browserslist-config-mycompany：从browserslist-config-mycompanynpm包中获取查询 。
ie 6-8：选择包含范围的版本。
Firefox > 20：Firefox的版本比20更新 >=，<并且也可以<=工作。
iOS 7：iOS浏览器版本7直接。
Firefox ESR：最新的[Firefox ESR]版本。
unreleased versions或unreleased Chrome versions：alpha和beta版本。
last 2 major versions或last 2 iOS major versions：最近2个主要版本的所有次要/补丁版本。
since 2015或last 2 years：自2015年以来发布的所有版本（也since 2015-03和since 2015-03-10）。
dead：来自last 2 version查询的浏览器，但全球使用统计数据少于0.5％，且24个月内没有官方支持或更新。现在是IE 10，IE_Mob 10，BlackBerry 10， BlackBerry 7，和OperaMobile 12.1。
last 2 versions：每个浏览器的最后两个版本。
last 2 Chrome versions：Chrome浏览器的最后两个版本。
defaults：Browserslist的默认浏览器（> 0.5%, last 2 versions, Firefox ESR, not dead）。
not ie <= 8：排除先前查询选择的浏览器。

您可以添加not到任何查询。

```
