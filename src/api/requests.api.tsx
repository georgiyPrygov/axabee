import axios from "axios";

axios.defaults.baseURL = "https://api.spacex.land/graphql/";

const LAUNCHES = `
 {
    launches(limit: 10, sort: "mission_id",  order: "desc") {
      mission_name
      launch_date_utc
      mission_id
    }
  }
`;
const MISSIONS = `
query($id: ID!) {
    mission(id: $id) {
      id
      description
    }
  }
`;

export const fetchLaunches = async () => {
  const queryResult = await axios.post("", {
    query: LAUNCHES,
  });
  return queryResult.data.data.launches;
};

export const fetchMissions = async (id: string) => {
  const queryResult = await axios.post("", {
    query: MISSIONS,
    variables: {
      id,
    },
  });
  return queryResult.data.data.mission;
};
