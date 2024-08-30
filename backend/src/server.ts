import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = process.env.PORT || 6060;

app.listen(port);
console.log('listening at', port);
