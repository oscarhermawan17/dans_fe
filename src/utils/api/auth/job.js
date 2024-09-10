import { APIClient } from '../client';

export const getJobList = async (filtered = { description: '', location: '', fulltime: true, page: 1 }) => {
  try {
    let filterDescription = filtered.description ? `description=${filtered.description}&` : ''
    let filterLocation = filtered.location ? `location=${filtered.location}&` : ''
    let filterFullTime = filtered.fulltime === false ? `full_time=${filtered.fulltime}` : ''
    let query = `page=${filtered.page}&${filterDescription}${filterLocation}${filterFullTime}`
    
    const response = await APIClient.get(`/api/${import.meta.env.VITE_BE_API_VERSION}/job?${query}`);
    return response;
  } catch (err) {
    console.error(err);
    throw err;
  }
}