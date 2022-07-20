import { gql, useMutation } from "@apollo/client"

export const CREATE_TEAM = gql`
  mutation CreateTeam($key: String!, $title: String!) {
    createTeam(Team: { key: $key, title: $title }) {
      title
      key
      children {
        _id
        title
        key
      }
    }
  }
`

export const GET_ALL_TEAMS = gql`
  {
    getAllTeam {
      _id
      title
      key
      children {
        title
        key
        children {
          title
          key
          children {
            title
            key
            children {
              title
              key
              children {
                title
                key
              }
            }
          }
        }
      }
    }
  }
`
