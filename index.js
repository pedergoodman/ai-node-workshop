import {openai} from './openai.js'

const results = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages:[  
    {
      role: 'system', 
      content: "You are and AI assistant, answer any questions to the best of your ability"
    },
    {
      role: 'user',
      content: "Hi"
    }
  ]
})

console.log(results);
