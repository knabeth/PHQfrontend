import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import CustomTree from "./components/Tree"
import { GET_ALL_TEAMS, GET_MAIN_TEAMS } from "../querys/team"
import { useMutation, useQuery } from "@apollo/client"
import { getTeamList } from "../store"
import CreateForm from "../CreateForm/index"

const TreeContainer = () => {
  return (
    <>
      <CustomTree />
      <>
        <CreateForm />
        {/* DEPLACER ELEM */}
      </>
    </>
  )
}

export default TreeContainer
