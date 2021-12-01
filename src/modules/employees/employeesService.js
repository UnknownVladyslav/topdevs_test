import axios from "axios";

const urlPrefix = 'http://topdevsprojects.org:8081';

export const employeesService = {
    getEmployees() {
        return axios.get(`${urlPrefix}/tasks/users`).then(({data, status}) => ({data, status}));
    }
}