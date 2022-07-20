import { v4 as uuid } from "uuid"

const parseTreeData = (data) => {
  return data.map((e, i) => {
    return {
      id: e._id,
      title: e.title,
      key: uuid(),
      children: subTeamFactory(e.subTeam),
    }
  })
}

const subTeamFactory = (subTeams) => {
  if (!!subTeams) {
    return subTeams.map((sub) => {
      return {
        id: sub._id,
        title: sub.title,
        children: subTeamFactory(sub.subTeam),
        key: uuid(),
      }
    })
  }
  return []
}
export {}
