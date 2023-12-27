import { Box, Button, Card, CircularProgress, Grid, Pagination } from '@mui/material';
import React, { useEffect,useState } from 'react';
import Axios from 'axios'; 
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';


const Cards = ({searchParameter,sort}) => {
  
  
  let baseURL=`https://newsapi.org/v2/everything?q=${searchParameter}&apiKey=ffcf14d23c8e42b2ae4a6a87a1d3f2cb`
  const [data,setData]=useState([]);
  const[isLoading,setIsLoading]=useState(true);
  const [page, setPage] = useState(1);
  const [cnt, setCnt] = useState(0);

  const btnProps = {
    ':hover': {
      bgcolor: '#03b6fc', // theme.palette.primary.main
      color: 'white',
    },
    color: 'Black',
    borderColor:'black',
    fontFamily:"Georgia, serif",
    fontWeight:'bold'
  }

  async function getData(baseURL){
    let url=baseURL;
      if(sort){
        url+='&sortBy=popularity';
      }
       try{
        setIsLoading(true);
        const res=await Axios.get(url);
        const start = (page - 1) * 9;
        const end = (page) * 9;
        setCnt(res.data.articles.length);
        console.log(res.data.articles);
        setData(res.data.articles.slice(start,end));
       setIsLoading(false);
       }
       catch(error){
        console.log(error.message);
       }
       
  }

  useEffect( ()=>{
     getData(baseURL);
     console.log(data)
  },[searchParameter,page,sort]);



  return (
   
      <>
    {isLoading?<Box sx={{mt:4,mb:4,display: 'flex',alignItems:'center', justifyContent: 'center'}}>
     <CircularProgress />
   </Box>:
   <Grid container spacing={2} sx={{ml:8,mt:2}}>
      
      { data.length===0?<> <Typography sx={{textAlign:'center'}}> No Results Are Found </Typography> 
      <Typography sx={{textAlign:'center',fontFamily:"Georgia, serif"}}>Please Search for different topic </Typography>
      </>
      : <>{data.map((item) => {
        const {author,url,urlToImage,title,publishedAt,description}=item;
        console.log(author);
        return (
          
          <Grid item lg={4} md={6} sm={6} xs={12}>
    <Card sx={{ maxWidth: 350,border:1,elevation:1,height:505,fontFamily:"Georgia, serif"}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[1000],width:50,height:50 }} aria-label="recipe">
           <img src={(author===null)?`https://ui-avatars.com/api/?background=random&$name=John}` :`https://ui-avatars.com/api/?background=random&name=${author.split(" ")[0]}}`} alt="" />
          </Avatar>
        }
        sx={{fontFamily:"Georgia, serif",fontWeight:'bolder'}}
        title={title}
        subheader={publishedAt.split("T")[0]}
      />
      <CardMedia
        component="img"
        height="194"
        image={urlToImage}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" sx={{fontFamily:"Georgia, serif",fontWeight:'bold'}}>
          {description.slice(0,200)}
        </Typography>
        <Box  sx={{textAlign:'center',my:2}}>
        <Button sx={btnProps} variant='outlined' href={url} target='_blank'  >
        View Full Article
        </Button>
        </Box>
      </CardContent>
    </Card>
    </Grid>
    
  );
     })}</>}
     </Grid>}
     <Pagination
     sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}
     count={Math.ceil(cnt /9)}
     color="secondary"
     size='large'
     onChange={(e, value) => setPage(value)}
   />
    </>
  );
 
 
 
 
 
 
 
 
  // return (
  //   <>
  //       <Card sx={{ maxWidth: 345 }}>
  //     <CardActionArea>
  //       <CardMedia
  //         component="img"
  //         height="140"
  //         image='${imageURL}'
  //         alt="green iguana"
  //       />
  //       <CardContent>
  //         <Typography gutterBottom variant="h5" component="div">
  //           {title}
  //         </Typography>
  //         <Typography variant="body2" color="text.secondary">
  //           {`${description.slice(0,200)}...`}
  //         </Typography>
  //       </CardContent>
  //     </CardActionArea>
  //     <CardActions>
  //       <Button size="small" color="primary">
  //         View Full Article
  //       </Button>
  //     </CardActions>
  //   </Card>
  //   </>
  // );
}

export default Cards
