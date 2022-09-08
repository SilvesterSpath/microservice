const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};
// QUICK EXAMPLE
/* posts ===
  {
    j123j42: {
      id: 'j123j42',
      title: 'post title',
      comments: [
        {
          id: 'klj3kl',
          content: 'comment',
        }, 
      ],
    },
  }; */

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, title } = data;

    posts[id] = { id, title, comments: [] };
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, status } = data;

    posts[postId].comments.push({ id, content, status });
  }

  if (type === 'CommentUpdated') {
    const { id, content, postId, status } = data;

    const comment = posts[postId].comments.find((item) => item.id === id);

    comment.status = status;
    comment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Query on 4002');

  const res = await axios.get('http://localhost:4005/events');

  console.log(res.data);

  for (let item of res.data) {
    console.log('Processing event: ', item.type);
    handleEvent(item.type, item.data);
  }
});
