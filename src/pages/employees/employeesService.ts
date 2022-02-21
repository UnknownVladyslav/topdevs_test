import { IEmployee } from 'types/types';
import axios from 'axios';

const urlPrefix = 'http://topdevsprojects.org:8081';

export const employeesService = {
  getEmployees() {
    return axios.get<IEmployee[]>(`${urlPrefix}/tasks/users`).then(({ data, status }) => ({ data, status }));
  },
};
