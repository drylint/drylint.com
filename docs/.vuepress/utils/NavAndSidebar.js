const fs = require('fs')
const path = require('path')
const glob = require('glob')

// 获取 docs 绝对路径
const docsPath = path.join(process.cwd(), 'docs')

// 正常的文件或目录正则，不以 _ 或 . 开头即视为正常
const normalReg = /^[^._]/iu

// 合法的 markdown 文件
const normalMarkdownReg = /^[^._].*\.md$/iu

// 目录下的会渲染成 index.html 的 .md 文件名
const indexMarkdown = /^(?:index|README)\.md$/iu

// 判断一个文件是否是正常的 markdown 文件
const isMarkdown = path => normalMarkdownReg.test(path)

// 根据一个目录的绝对路径，判断该目录下正常的 markdown 文件的数量
const getNormalMarkdownCount = (abDirPath, deepth = -1) => {
  let patternDeepth = ''
  if (Number.isFinite(deepth) && deepth >= 0) {
    for (let index = 0; index < deepth; index++) {
      patternDeepth += '/*'
    }
  } else if (!deepth || deepth < 0) {
    patternDeepth = '/**'
  }
  const pattern = `${abDirPath}${patternDeepth}/[^._]*.md`
  const result = glob.sync(pattern)
  return result.length
}

// 侧边栏，多个侧边栏使用对象类型
const sidebar = {
  // '/': 'auto',
}

// 导航栏，数组类型
let nav = [
  { text: '首页', link: '/', target: '_self', rel: '' },
]

const recursiveHandler = (abPath, prefixPath = '', dirName = 'docs') => {
  const nav = []

  // 获取当前遍历的目录深度，用于控制生成导航栏深度
  // 因为导航栏下拉列表深度不应该超过 2 级
  // 也就是导航栏不应该包含 docs 目录下大于 2 级深度的目录
  const currentDirNestDepth = prefixPath.replace(/[^/]/iug, '').length

  // 获取路径下所有文件和目录
  let children = fs.readdirSync(abPath)

  // 过滤排除不符合规则的目录和文件
  children = children.filter(child => {
    // child 的绝对路径
    const childAbPath = `${abPath}/${child}`
    // 如果不是正常的文件或目录（以 _ 或 . 开头），直接返回 false
    if (!normalReg.test(child)) {
      return false
    }

    // 获取 child 的状态
    const childStat = fs.statSync(childAbPath)

    // 如果当前 child 是文件
    if (childStat.isFile()) {
      // 如果深度为 0，并且 child 匹配 indexMarkdown ，不保留
      // 因为已经手动添加了导航菜单 【首页】
      if (currentDirNestDepth <= 0 && indexMarkdown.test(child)) {
        return false
      }
      // 如果是正常的 markdown 文件，保留
      if (isMarkdown(child)) {
        return true
      }
      return false
    }

    // 如果当前 child 是目录
    if (childStat.isDirectory()) {
      // 如果 child 目录下子孙目录内有正常的 markdown 文件，则保留此 child 目录
      if (getNormalMarkdownCount(childAbPath)) {
        return true
      }
    }
    return false
  })

  // 对 children 进行排序，文件在前，目录在后
  // 这样，遍历生成的导航栏就是页面在前，下拉列表在后排列
  children = children.sort((a, b) => {
    const isDirA = fs.statSync(`${abPath}/${a}`).isDirectory()
    const isDirB = fs.statSync(`${abPath}/${b}`).isDirectory()
    return isDirA - isDirB
  })

  // console.log('参与遍历的 children', abPath, children)
  // 遍历 children
  children.forEach(child => {
    // child 的绝对路径
    const childAbPath = `${abPath}/${child}`
    // 获取 child 的状态
    const childStat = fs.statSync(childAbPath)

    // 如果 child 是文件
    if (childStat.isFile()) {
      // 获取 .md 文件不包括扩展名的【文件名】，比如 test.md 的文件名 test
      const childFileName = child.slice(0, -3)

      // 如果当前文件的深度为 0 1 2 时 ，都作为导航栏的嵌套项
      if (currentDirNestDepth <= 2) {
        // 当前文件的页面访问路径
        const currentUrlPath = `${prefixPath}/${indexMarkdown.test(child) ? '' : childFileName}`
        const linkItem = {
          text: childFileName,
          link: currentUrlPath,
          target: '_self',
          rel: '',
        }
        nav.push(linkItem)
        return
      }

      // 否则（文件的深度大于 2 ），不再渲染到导航栏，而是渲染到侧边栏
      const sidebarChild = /^index|README$/.test(childFileName) ? '' : childFileName
      // 侧边栏接受的最大深度为 4，大于 4 直接忽略
      if (currentDirNestDepth > 4) {
        return
      }
      if (currentDirNestDepth === 4) {
        const prevLevelPath = prefixPath.match(/(?<prevPath>\/.*\/)(?<groupName>[^/]*)$/)
        if (prevLevelPath) {
          const { prevPath, groupName } = prevLevelPath.groups
          const group = sidebar[prevPath].find(item => item.title === groupName)
          const sidebarChildPath = `${groupName}/${sidebarChild}`
          if (group) {
            group.children.push(sidebarChildPath)
          } else {
            sidebar[prevPath].push({
              title: groupName,
              children: [sidebarChildPath],
            })
          }
        }
        return
      }
      if (currentDirNestDepth === 3) {
        // 如果 侧边栏的 key 不存在，则添加为一个空数组
        if (!sidebar[`${prefixPath}/`]) {
          sidebar[`${prefixPath}/`] = [{
            title: dirName,
            children: [],
          }]
        }
        sidebar[`${prefixPath}/`][0].children.push(sidebarChild)
        return
      }
      return
    }

    // 如果当前 child 是目录
    if (childStat.isDirectory()) {
      // 当前的跳转路径
      const currentUrlPath = `${prefixPath}/${child}`
      const nestedSelectOptions = recursiveHandler(childAbPath, currentUrlPath, child)
      // 如果当前目录深度小于等于 2 ，也就是未超过导航栏最大深度
      if (currentDirNestDepth < 2) {
        // 组合成当前导航栏菜单项
        const nestedSelectItem = {
          // 当深度为 0 时，text 是下拉标题，深度为 1 时， text 是下拉框中的分组名
          text: child,
          // 下拉选项
          items: nestedSelectOptions,
        }
        nav.push(nestedSelectItem)
        return
      }

      // 当前目录深度大于等于 2，将目录名作为导航下拉选的一个点击项
      // 子页面全部作为点击此标签后的页面的侧边栏展示
      if (currentDirNestDepth >= 2) {
        // 读取这个深度大于 2 的目录
        let children = fs.readdirSync(childAbPath)
        // 过滤，只保留正常的 .md 文件，更深的目录将被排除
        children = children.filter(isMarkdown)
        // 获取所有文件不包括后缀名的数组
        const fileNameList = children.map(child => child.slice(0, -3))

        // 判断子目录中有没有 README.md / index.md
        const hasIndexFile = children.some(child => indexMarkdown.test(child))

        // 根据当前目录有没有首页，来生成点击跳转的链接是首页，还是目录下的第一个文件生成的 html
        const linkURL = `${currentUrlPath}/${hasIndexFile ? '' : fileNameList[0]}`

        // 为当前深度大于 2 的目录生成一个导航下拉选项，点击跳转到目录首页或第一个页面
        const linkItem = { text: `▶ ${child}`, link: linkURL, target: '_self', rel: '' }

        // 将生成的下拉选项加入导航
        nav.push(linkItem)
        // // 生成当前目录下的页面在侧边栏的链接
        // const sideBarChildren = fileNameList.map(item => {
        //   if (/^index|README$/.test(item)) {
        //     return ''
        //   }
        //   return item
        // })
        // sidebar[`${currentUrlPath}/`] = [{
        //   // 分组名称
        //   title: child,
        //   // 该分组是否允许折叠起来
        //   collapsable: false,
        //   // 分组下的页面
        //   children: sideBarChildren,
        // }]
      }
    }
  })
  return nav
}

const createdNav = recursiveHandler(docsPath)

nav = nav.concat(createdNav)
sidebar['/'] = 'auto'
module.exports = {
  nav,
  sidebar,
}
