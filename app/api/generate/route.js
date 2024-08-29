import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines:

1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and informative answers for the back of the flashcard.
3. Focus on key concepts, definitions, facts, or relationships within the subject matter.
4. Use simple language to ensure clarity and ease of understanding.
5. Avoid overly complex or lengthy content that might be difficult to remember.
6. Include a variety of question types, such as multiple-choice, fill-in-the-blank, or short answer, when appropriate.
7. Ensure that each flashcard covers a single, distinct piece of information.
8. When dealing with sequences or processes, break them down into individual steps.
9. For language learning, include pronunciation guides where relevant.
10. Use mnemonics or memory aids when they can help reinforce the information.
11. You will create 12 to 24 flashcards, but the total number of flashcards generated must be a mulitple of 3

Your goal is to create flashcards that facilitate effective learning and retention of the subject matter.

Return in the following JSON format:
{
    "flashcards": [
        {
            "front" :str, 
            "back" : str
        }
    ]
}
`;

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data}
        ], 
        model: 'gpt-4o-mini',
        response_format: {type: 'json_object'}
    })

    

    const flashcards = JSON.parse(completion.choices[0].message.content)
    return NextResponse.json(flashcards.flashcards)
}



