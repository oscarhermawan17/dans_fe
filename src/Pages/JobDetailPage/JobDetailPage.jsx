import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { getJobDetail } from "../../utils/api/auth"

import useAuth from '../../hooks/useAuth/useAuth';

function JobDetailPage() {
  const [jobDetail, setJobDetail] = useState(null)
  const { logout } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    try {
      getJobDetail(id)
        .then((response) => {
          if(response.status === 200) {
            console.log(response.data)
            setJobDetail(response.data.jobDetail)
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

  return (
    <Container maxWidth="lg">
      <Box sx={{ padding: 2, bgcolor: '#2196f3', display: 'flex', justifyContent: 'space-between', }}>
        <Typography variant="h4" sx={{ color: 'white' }}>Github Jobs</Typography>
        <Button sx={{ color: 'white' }} variant="text" onClick={handleLogout}>Log Out</Button>
      </Box>
      
      {jobDetail === null ? "Loading..." : 
        <Box sx={{ padding: 1, bgcolor: 'gray', color: 'black' }}>
          <Box sx={{ padding: 1, bgcolor: 'white',color: 'black' }}>
            <Typography variant="h4" sx={{ margin: '20px 0px'}}>{jobDetail.title}</Typography>
            
            <Box sx={{ display: 'grid', gridTemplateColumns: '70% auto', gap: '20px'}}>
              <Box dangerouslySetInnerHTML={{ __html: jobDetail.description }}></Box>
              <Box sx={{ padding: 1 }}>
                <Box sx={{ background: '#F5EBFF', padding: 1 }}>
                  <Box sx={{ borderBottom: '2px solid gray', padding: 1}}>
                    <Typography variant="body" sx={{ margin: '20px 0px'}}>How to Apply</Typography>
                  </Box>
                  <Box dangerouslySetInnerHTML={{ __html: jobDetail.how_to_apply }}></Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>  
      }
    </Container>

  )
}

export default JobDetailPage
