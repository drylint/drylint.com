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
const indexMarkdownReg = /^(?:index|README)\.md$/iu

// 判断一个文件名是否是正常的 markdown 文件
const isMarkdown = path => normalMarkdownReg.test(path)

// 判断一个文件名是否是 index 文件，也就是 index.md 或 readme.md
const isIndexMarkdown = path => indexMarkdownReg.test(path)

// 根据一个目录的绝对路径，判断目录下有没有 index.md 或 README.md
const hasIndexMarkdownFile = abPath => glob.sync(`${abPath}/@(README|readme|index).md`).length > 0

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

const getNormalSortedChildren = abPath => {
  // 获取路径下所有文件和目录
  let children = fs.readdirSync(abPath)

  // 过滤排除不符合规则的目录和文件
  children = children.filter(child => {
    // 不管是文件还是目录，只要是以 _ 或 . 开头，直接返回 false 将其抛弃
    if (!normalReg.test(child)) {
      return false
    }

    // child 的绝对路径
    const childAbPath = `${abPath}/${child}`
    // 获取 child 的状态
    const childStat = fs.statSync(childAbPath)

    // 如果当前 child 是文件
    if (childStat.isFile()) {
      // 如果是正常的 markdown 文件，保留，否则返回 false 将其抛弃
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
      return false
    }
    return false
  })

  // 对 children 进行排序，文件在前，目录在后
  // 这样，遍历生成的导航栏就是页面在前，下拉列表在后排列
  children = children.sort((a, b) => {
    // 如果是 index.md 或 readme.md，需要排在最前面
    const isDirA = isIndexMarkdown(a) ? -1 : fs.statSync(`${abPath}/${a}`).isDirectory()
    const isDirB = fs.statSync(`${abPath}/${b}`).isDirectory()
    return isDirA - isDirB
  })
  return children
}

// 侧边栏，多个侧边栏使用对象类型
const sidebar = {}

// 导航栏，数组类型
let nav = [
  // { text: '首页', link: '/', target: '_self', rel: '' },
]

const recursiveHandler = (abPath, prefixUrl = '', isSideBar = false) => {

  // 获取过滤后且已排序的 children
  const children = getNormalSortedChildren(abPath)

  // console.log('参与遍历的 children', abPath, children)

  // 本次运行生成的当前层级的导航栏
  const nav = []
  // 遍历 children
  children.forEach(child => {
    // child 的绝对路径
    const childAbPath = `${abPath}/${child}`
    // 获取 child 的状态
    const childStat = fs.statSync(childAbPath)

    // 如果 child 是文件
    if (childStat.isFile()) {
      // 获取 .md 文件不包括扩展名的【文件名】，比如 test.md 的文件名 test
      const childFileName = isIndexMarkdown(child) ? '首页' : child.slice(0, -3)
      const sidebarChildName = isIndexMarkdown(child) ? '' : child.slice(0, -3)
      if (isSideBar === true) {
        const parentName = abPath.split('/').slice(-1)[0]
        const group = sidebar[prefixUrl].find(item => item.title === parentName)
        group.children.push(sidebarChildName)
        return
      }
      const navListItem = {
        text: childFileName,
        link: `${prefixUrl}/${isIndexMarkdown(child) ? '' : childFileName}`,
        target: '_self',
        rel: '',
      }
      nav.push(navListItem)
      return
    }

    // 如果当前 child 是目录
    if (childStat.isDirectory()) {
      if (isSideBar === true) {
        return
      }
      // 如果目录下有 index.md 或 readme.md ，目录名作为导航栏链接，
      // 并且目录下所有 .md 文件将会作为侧边栏页面
      if (hasIndexMarkdownFile(childAbPath)) {
        const currentUrl = `${prefixUrl}/${child}/`
        // 生成导航栏链接
        const navListItem = {
          text: child,
          link: currentUrl,
          target: '_self',
          rel: '',
        }
        nav.push(navListItem)
        // 生成此导航栏链接页面的侧边栏
        const sideBarGroup = {
          title: child,
          sidebarDepth: 2,
          collapsable: false,
          children: [],
        }
        sidebar[currentUrl] = [sideBarGroup]
        recursiveHandler(childAbPath, currentUrl, true)
        return
      }
      // 递归传递的新前缀路径
      const newPrefixPath = `${prefixUrl}/${child}`
      const nestedSelectOptions = recursiveHandler(childAbPath, newPrefixPath)
      // 组合成当前导航栏嵌套菜单
      const navListNestedItem = {
        text: child,
        items: nestedSelectOptions,
      }
      nav.push(navListNestedItem)
    }
  })
  return nav
}

const createdNav = recursiveHandler(docsPath)

nav = nav.concat(createdNav)
sidebar['/'] = 'auto'
console.log('导航栏', JSON.stringify(nav, null, 2))
console.log('侧边栏', JSON.stringify(sidebar, null, 2))
module.exports = {
  nav,
  sidebar,
}
