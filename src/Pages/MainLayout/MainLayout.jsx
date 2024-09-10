import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { getJobList } from "../../utils/api/auth"

import useAuth from '../../hooks/useAuth/useAuth';

function MainLayout() {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)


  const [listJob, setListJob] = useState([])
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [fulltime, setFulltime] = useState(true)

  const { logout } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    try {
      getJobList()
        .then((response) => {
          if(response.status === 200) {
            setListJob(response.data.jobs)
            setCurrentPage(response.data.currentPage)
            setTotalPages(response.data.totalPages)
          }
        })
      
    } catch (err) {
      console.log(err)
    }
  }, [])

  const handleLogout = () => {
    logout();
    navigate("/login")
  }

  const onSubmit = (e) => {
    e.preventDefault()
    try {
      getJobList({ description, location, fulltime})
        .then((response) => {
          if(response.status === 200) {
            setListJob(response.data.jobs)
            setCurrentPage(response.data.currentPage)
            setTotalPages(response.data.totalPages)
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  const onChangePagination = (e, page) => {
    getJobList({ description, location, fulltime, page })
      .then((response) => {
        if(response.status === 200) {
          setListJob(response.data.jobs)
          setCurrentPage(response.data.currentPage)
          setTotalPages(response.data.totalPages)
        }
      })
  }

  const goToJobDetail = (e, idJob) => {
    e.preventDefault()
    navigate(`/jobdetail/${idJob}`)
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 2, bgcolor: '#2196f3', display: 'flex', justifyContent: 'space-between', }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Github Jobs</Typography>
        <Button sx={{ color: 'white' }} variant="text" onClick={handleLogout}>Log Out</Button>
      </Box>

      <form>
        <Box sx={{ padding: 2, fontSize: 30, color: 'white', display: 'grid', gridTemplateColumns: '35% 35% 130px auto', gap: '25px' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="description"
            label="Job Description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <FormControlLabel sx={{ color: 'black' }} control={<Checkbox checked={fulltime} onChange={() => setFulltime(prev => !prev)} />} label="Full Time" />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type="submit" variant="contained" onClick={onSubmit} sx={{ height: '50px', width: '100%' }}>Search</Button>
          </Box>
        </Box>
      </form>
      
      <Box sx={{ padding: 1, bgcolor: 'gray', color: 'black' }}>
        <Box sx={{ padding: 1, bgcolor: 'white', color: 'black' }}>
          <Typography variant="h4" sx={{ margin: '20px 0px'}}>Job List</Typography>

          {listJob.map(job => {
            return (
              <Box key={job.id} sx={{ 
                padding: '15px 0',
                bgcolor: 'white',
                fontSize: 30,
                color:'black',
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: 'solid 2px black'
              }}>
                <Box>
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    <a style={{ textDecoration: 'none', color: 'black'}} href="/" 
                    onClick={(e) => goToJobDetail(e, job.id)}>
                      {job.title}</a>
                  </Typography>
                  <Typography variant="body2">{job.company} - <strong>{job.type}</strong></Typography>
                </Box>
                <Box>
                  <Typography variant="body1" align="right">{job.location}</Typography>
                  <Typography variant="body2" align="right">1 Day ago</Typography>
                </Box>
              </Box>
            )
          })} 
        </Box>
        <Box sx={{ display: 'flex', placeContent: 'flex-end'}}><Pagination count={totalPages} page={currentPage} onChange={onChangePagination} /></Box>
      </Box>
    </Container>

  )
}

export default MainLayout
