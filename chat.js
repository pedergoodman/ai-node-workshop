import {openai} from './openai.js'
// grabbing node package called readline specifically from node, not a 3rd party readline
import readline from 'node:readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const newMessage = async (history, message) => {
  const results = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [...history, message]
  })

  return results//.choices[0].message
}

const formatMessage = (userInput) => ({role: 'user', content: userInput})

const chat = () => {
  const history = [
    {
      role: 'system', 
      content: "You are and AI assistant, answer any questions to the best of your ability",
      // the higher the temp the more "creative" is gets, 0 is straight facts
      // temperature: 0
    }
  ]

  const start = () => {
    rl.question("You: ", async (userInput) => {
      if (userInput.toLocaleLowerCase() === 'exit') {
        rl.close()
        return
      }

    const message = formatMessage(userInput)
    // this is where the message gets sent
    const response = await newMessage(history, message)

    history.push(message, response)

    console.log(response.choices) //[0].message);
    console.log(response.usage);
    // console.log(`\n\nAI: ${response}`);
    // console.log(`\n\nAI: ${response.content}`);
    start()
    })
  }
  start()
}

// test prompt
// I'm a beginner coder with one year of experience. Give me a multi-choice question in the tech stach of javascript and react. return the question in a JSON format
// I'm a beginner coder with one year of experience. Give me a list of multi-choice question in the tech stack of javascript and react. Return the list of questions in a JSON format. return 3 question.
chat()