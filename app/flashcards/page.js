'use client'
import {useUser} from '@clerk/nextjs'
import {useEffect, useState} from 'react'
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs'
import {collection, collectionReference, doc, getDoc, setDoc} from 'firebase/firestore'
import {db} from '@/firebase'
import {useRouter} from 'next/navigation'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, AppBar, Toolbar, Button } from '@mui/material'


export default function Flashcards() {
    const [flashcards, setFlashcards] = useState([])
    const{isLoaded, isSignedIn, user} = useUser()
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards() {
          if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            setFlashcards(collections)
          } else {
            await setDoc(docRef, { flashcards: [] })
          }
        }
        getFlashcards()
      }, [user])

    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

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
            
            <Container maxWidth="md">
                <Grid container spacing={3} sx={{ mt: 4 }}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                        <CardContent>
                            <Typography variant="h5" component="div">
                            {flashcard.name}
                            </Typography>
                        </CardContent>
                        </CardActionArea>
                    </Card>
                    </Grid>
                ))}
                </Grid>
            </Container>
        </Container>
    )
}