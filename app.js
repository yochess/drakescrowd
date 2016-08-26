'use strict';
import express from 'express';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
