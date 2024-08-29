'use client'
import React, { useState } from 'react';
import Image from "next/image";
import getStripe from "@/utils/get-stripe"; 
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Head from 'next/head';

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [proDialogOpen, setProDialogOpen] = useState(false); // New state for Pro dialog

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleProDialogOpen = () => { // Function to open Pro dialog
    setProDialogOpen(true);
  };

  const handleProDialogClose = () => { // Function to close Pro dialog
    setProDialogOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Head>
        <title>Flashcard SaaS</title>
        <meta name="description" content="Create flashcard from your text" />
      </Head>

      <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                Flashcard SaaS
                </Typography>
                <SignedOut>
                <Button color="inherit" href="/sign-in">Login</Button>
                <Button color="inherit" href="/sign-up">Sign Up</Button>
                </SignedOut>
                <SignedIn>
                <Button color="inherit" href="/flashcards">Flashcards</Button>
                <Button color="inherit" href="/generate">Generate</Button>
                <UserButton />
                </SignedIn>
            </Toolbar>
        </AppBar>
      
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to Flashcard SaaS
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          The easiest way to create flashcards from your text.
        </Typography>
        <Button variant="contained" color="primary" sx={{ mt: 2, mr: 2 }} href="/generate">
          Get Started
        </Button>
      </Box>

      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Text Input</Typography>
            <Typography>Simply input your text and let our software do the rest. Creating flashcards has never been easier.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>Our AI intellectually breaks down your text into concise flashcards, perfect for studying.</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>Access your flashcards from anywhere, using our website on mobile or desktop browsers.</Typography>
          </Grid>
        </Grid>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ my: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Pricing</Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, border: '1px solid', borderColor: 'gray.300', borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>Basic</Typography>
                <Typography variant="h6" gutterBottom>Free</Typography>
                <Typography>Access to basic flashcard features and limited storage</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleDialogOpen}>
                  Choose Basic
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, border: '1px solid', borderColor: 'gray.300', borderRadius: 2 }}>
                <Typography variant="h5" gutterBottom>Pro</Typography>
                <Typography variant="h6" gutterBottom>$10 / Month</Typography>
                <Typography>Unlimited flashcards and storage, with priority support</Typography>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleProDialogOpen}>
                  Choose Pro
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{"Basic Plan"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Basic features are free. Click on GET STARTED to generate your flashcards!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={proDialogOpen} onClose={handleProDialogClose}>
        <DialogTitle>{"Pro Plan"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Pro features are coming soon! Stay tuned for more updates.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleProDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
