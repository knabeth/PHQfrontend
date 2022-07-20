export const getTeamList = (store) => store.teamList

const initialState = {
  teamList: [],
}

export const reducer = (store = initialState, action) => {
  switch (action.type) {
    case "SET_TEAM_LIST":
      return { ...store, teamList: action.payload }
    default:
      return store
  }
}
