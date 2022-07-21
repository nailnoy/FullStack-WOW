import React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const Footer = () => {
    return (
        <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Copyright />
      </Box>
    );
};

function Copyright() {
	return (
	  <Typography variant="body2" color="text.secondary" align="center">
		{'Copyright © '}
		<Link color="inherit" href="https://github.com/nailnoy/FullStack-WOW">
		  TEAM WOW
		</Link>{' '}
		{new Date().getFullYear()}
		{'.'}
	  </Typography>
	);
  };

export default Footer;