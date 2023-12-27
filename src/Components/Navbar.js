import { AppBar, Typography, Grid, TextField, Box} from '@mui/material'
import React, { useState } from 'react'
import Toolbar from '@mui/material/Toolbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Navbar = ({setSearchParameter,setSort}) => {
    const [search,setSearch]=useState('');
  const [open, setOpen] = React.useState(false);
  const [selectValue,setSelectValue]=useState('');
  const handleChange = (event) => {
    if(event.target.value==='popularity'){
    setSort(true);
    }
  else{
    setSort(false);
  }
  setSelectValue(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
    const keyHandler=(event)=>{
      if(event.key==='Enter'){
        setSearchParameter(event.target.value);
        setSearch('');
      }
      else{
        setSearch(event.target.value);
      }
    }
    const changeHandler=(event)=>{
          console.log(event.target.value);
          setSearch(event.target.value);
    }

  return (
    
    
    <Box sx={{ flexGrow: 1,padding:'0px',mt:1}}>
      <AppBar position="static" color='secondary' sx={{mt:1}}>
        <Toolbar>
        <Grid container alignItems='center' justifySelf='center'>
        <Grid item sm={12} xs={12} md={6} lg={6} >
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1,alignSelf:{sm:'center',xs:'center'},fontFamily:"Georgia, serif"}}
          >
          NEWS AGGREAGATOR
          </Typography>
          </Grid>
          <Grid item sm={6} xs={12} md={4}  lg={4} >
          <TextField
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          onKeyDown={keyHandler}
          onChange={changeHandler}
          value={search}
          sx={{ input: { color: 'white' }}}
        />
        
          </Grid>
          <Grid item lg={2} md={2} sm={6} xs={12} >
          <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">Sort by</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectValue}
          label="Sort by"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="popularity">Popularity</MenuItem>
        </Select>
      </FormControl>
          </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
    
  )
}

export default Navbar
