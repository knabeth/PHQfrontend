export const getTeamList = (store) => store.teamList

const initialState = {
  teamList: [],
}

export const reducer = (store = initialState, action) => {
  switch (action.type) {
    case "SET_TEAM_LIST":
      return { ...store, teamList: action.payload }
    case "UPDATE_TEAM_LIST":
      const updatedList = store.teamList.map((t) => {
        return {
          ...t,
          subTeam: t.subTeam.map((sub) =>
            sub.id === action.payload.id ? action.payload : sub
          ),
        }
      })

      return { ...store, teamList: updatedList }
    default:
      return store
  }
}
