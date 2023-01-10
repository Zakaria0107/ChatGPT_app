const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')
const { Configuration, OpenAIApi } = require("openai");
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())
console.log(process.env.OPENAI_API_KEY)
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

   
app.get('/', async (req, res) => {
    res.status(200).send({
      message: 'hello world'
    })
})


app.post('/', async (req, res) => {
    try {
      const prompt = req.body.prompt;
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0, 
        max_tokens: 3000, 
        top_p: 1, 
        frequency_penalty: 0.5, 
        presence_penalty: 0, 
       });
  
      res.send(response.data.choices[0].text);
    
  
    } catch (error) {
      res.status(500).send(error || 'Something went wrong');
    }
  })
  
  app.listen(5000, () => console.log('AI server started on http://localhost:5000'))