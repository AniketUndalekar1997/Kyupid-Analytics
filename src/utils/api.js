import axios from "axios";

const getAreasData = () => {
    return axios.get(`https://kyupid-api.vercel.app/api/areas`);
}

const getUsersData = () => {
    return axios.get(`https://kyupid-api.vercel.app/api/users`);
}

export { getAreasData, getUsersData }
