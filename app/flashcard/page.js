'use client'
import { Typography, Container, Grid, Card, CardActionArea, CardContent, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { AppBar, Toolbar } from '@mui/material';
import { db } from '@/firebase';
import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { collection, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore';
import { styled } from '@mui/system';
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const searchParams = useSearchParams();
    const search = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return;

            const colRef = collection(doc(collection(db, 'users'), user.id), search);
            const docs = await getDocs(colRef);
            const flashcards = [];
            docs.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() });
            });
            setFlashcards(flashcards);
        }
        getFlashcard();
    }, [search, user]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleDeleteClick = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    
    

    return (
        <Container maxWidth="md">
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
            <Box sx={{ mt: 2 }} />
            <Typography variant="h4" align="center" gutterBottom>
                {search ? `${search}` : 'Flashcard Group'}
            </Typography>

            <Grid container spacing={3}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(index)}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            perspective: '1000px',
                                            position: 'relative',
                                            width: '100%',
                                            height: '200px',
                                            '& .flip-card-inner': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                            },
                                            '& .flip-card-front, & .flip-card-back': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box',
                                                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
                                            },
                                            '& .flip-card-back': {
                                                transform: 'rotateY(180deg)',
                                            },
                                        }}
                                    >
                                        <div className="flip-card-inner">
                                            <div className="flip-card-front">
                                                <Typography variant="h5" component="div">
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div className="flip-card-back">
                                                <Typography variant="h5" component="div">
                                                    {flashcard.back}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            

            
        </Container>
    );
}

const FlipBox = styled(Box)(({ flipped }) => ({
    perspective: '1000px',
    position: 'relative',
    height: '100%',
    width: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const Face = styled(Box)(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const FrontFace = styled(Face)(({ flipped }) => ({
    transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
}));

const BackFace = styled(Face)(({ flipped }) => ({
    transform: flipped ? 'rotateY(0deg)' : 'rotateY(180deg)',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#f0f0f0',
}));
