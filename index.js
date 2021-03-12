const { NlpManager } = require('node-nlp');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let isFinished = false;
let answer;
const manager = new NlpManager({
  languages: ['en'],
  forceNER: true,
  nlu: { log: true },
});
// Adds the utterances and intents for the NLP
manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'okay see you later', 'greetings.bye');
manager.addDocument('en', 'bye for now', 'greetings.bye');
manager.addDocument('en', 'i must go', 'greetings.bye');
manager.addDocument('en', 'hello', 'greetings.hello');
manager.addDocument('en', 'hi', 'greetings.hello');
manager.addDocument('en', 'howdy', 'greetings.hello');

// Train also the NLG
manager.addAnswer('en', 'greetings.bye', 'Till next time');
manager.addAnswer('en', 'greetings.bye', 'see you soon!');
manager.addAnswer('en', 'greetings.hello', 'Hey there!');
manager.addAnswer('en', 'greetings.hello', 'Greetings!');

(async () => {
  await manager.train();
  manager.save();
  //prompt
  console.log("Say something to me!!")
  // rl.question('Say something: ', async (reply) => {
  //   const res = await manager.process('en', reply);
  //   console.log('Bot: ', res.answer);
  // });

  rl.on('line', async (input) => {
    const res = await manager.process('en', input);
    console.log('Bot: ', res.answer);
  });

  rl.on('close', () => {
    process.exit(0);
  });
})();
