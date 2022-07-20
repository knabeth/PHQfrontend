import { Tree } from "antd"
import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { gql, useQuery } from "@apollo/client"
import { GET_ALL_TEAMS, GET_TEAM_BY_ID } from "../../querys/team"
import { getTeamList } from "../../store"

const defaultData = [
  { title: "team1", key: "team1" },
  { title: "team2", key: "team2" },
  { title: "team3", key: "team3" },
]

const CustomTree = () => {
  const dispatch = useDispatch()
  const { data, error, loading } = useQuery(GET_ALL_TEAMS)
  const [gData, setGData] = useState(defaultData)

  useEffect(() => {
    if (!loading && !error) {
      const { getAllTeam: teams } = data
      dispatch({ type: "SET_TEAM_LIST", payload: teams })
      setGData(teams)
    }
  }, [loading])
  const [expandedKeys] = useState(["0-0", "0-0-0", "0-0-0-0"])

  const onDragEnter = (info) => {
    console.log(info) // expandedKeys 需要受控时设置
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

    const data = [...gData] // Find dragObject

    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [] // where to insert 示例添加到头部，可以是随意位置

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

  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
    />
  )
}
export default CustomTree
