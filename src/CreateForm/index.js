import { Button, Checkbox, Form, Input } from "antd"
import React, { useEffect, useState } from "react"
import { useMutation } from "@apollo/client"
import { CREATE_TEAM } from "../querys/team"
import { useDispatch, useSelector } from "react-redux"
import { getTeamList } from "../store/index"
import { v4 as uuidv4 } from "uuid"

const CreateForm = () => {
  const dispatch = useDispatch()
  const [createTeam, { data, error, loading }] = useMutation(CREATE_TEAM)
  const teamList = useSelector(getTeamList)

  useEffect(() => {
    if (!!data) {
      console.log({ data })
      const { createTeam } = data
      console.log({ update: teamList })
      dispatch({ type: "SET_TEAM_LIST", payload: [createTeam, ...teamList] })
    }
  }, [loading])

  const onFinish = (team) => {
    teamList.map((team) => console.log(team.key.split("-")))

    const rawKey = teamList.reduce(
      (acc, val) => {
        const [val1, val2] = val.key.split("-")

        if (acc.val1 <= val1) {
          return { ...acc, val1 }
        }
        if (acc.val2 <= val2) {
          return { ...acc, val2 }
        }
        return { val1, val2 }
      },
      { val1: 0, val2: 0 }
    )

    const newKey = `${
      rawKey.val2 === 9 ? rawKey.val1++ : rawKey.val1
    }-${rawKey.val2++}`
    console.log(newKey)
    createTeam({
      variables: {
        title: team.title,
        key: `${uuidv4()}`,
      },
    })
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo)
  }

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nom de l'équipe"
        name="title"
        rules={[
          {
            required: true,
            message: "équipe",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CreateForm
