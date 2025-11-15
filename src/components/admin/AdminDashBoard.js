import React from 'react';
import {
  Box,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@mui/material';

import FreeAd from './FreeAd';
import Notice from './Notice';
import Fact from './Fact';
import Movement from './Movement';
import Result from './Result';
import ImportantNote from './ImportantNote';
import ImportantFact from './ImportantFact';
import AlterNative from './AlterNative';

const AdminDashBoard = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  const components = [
    { component: <Result />, title: 'Result' },
    { component: <FreeAd />, title: 'Free Ad' },
    { component: <Notice />, title: 'Notice' },
    { component: <ImportantNote />, title: 'Important Note' },
    { component: <ImportantFact />, title: 'Important Fact' },
    { component: <AlterNative />, title: 'Alternative SattaKing' },
    { component: <Fact />, title: 'Advertise' },
    { component: <Movement />, title: 'Movement' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top Header */}
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: '64px',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '1fr 1fr',
          },
          gap: '16px',
        }}
      >
        {components.map((item, index) => (
          <Card key={index}>
            <CardContent>
              <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                {item.title}
              </Typography>
              {item.component}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default AdminDashBoard;
