const onDragEnter = (info) => {
  console.log(info)
}

const onDrop = (info) => {
  console.log(info)
  const dropKey = info.node.key
  const dragKey = info.dragNode.key
  const dropPos = info.node.pos.split("-")
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

  const loop = (data, key, callback) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].key === key) {
        return callback(data[i], i, data)
      }

      if (data[i].children) {
        loop(data[i].children, key, callback)
      }
    }
  }

  const data = [...gData]

  let dragObj
  loop(data, dragKey, (item, index, arr) => {
    console.log(arr)
    arr.splice(index, 1)
    dragObj = item
  })

  if (!info.dropToGap) {
    loop(data, dropKey, (item) => {
      item.children = item.children || []

      item.children.unshift(dragObj)
    })
  } else if (
    (info.node.props.children || []).length > 0 && // Has children
    info.node.props.expanded && // Is expanded
    dropPosition === 1 // On the bottom gap
  ) {
    loop(data, dropKey, (item) => {
      item.children = item.children || [] // where to insert 示例添加到头部，可以是随意位置

      item.children.unshift(dragObj) // in previous version, we use item.children.push(dragObj) to insert the
      // item to the tail of the children
    })
  } else {
    let ar = []
    let i
    loop(data, dropKey, (_item, index, arr) => {
      ar = arr
      i = index
    })

    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj)
    } else {
      ar.splice(i + 1, 0, dragObj)
    }
  }

  setGData(data)
  console.log({ data })
}

export { onDragEnter, onDrop }
