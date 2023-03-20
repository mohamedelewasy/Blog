/* eslint-disable no-console */
import dotenv from 'dotenv';

import app from './app';

dotenv.config();
const env = process.env.ENV;
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server runs on port ${port} in ${env} environment`));
