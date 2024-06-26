import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

import dotEnvConfig from 'src/configs/dotEnv.config';
import connectToMongoDB from 'src/db/connect.db';
import error from 'src/middlewares/error.middleware';
import authRoute from 'src/routes/auth.route';
import friendshipRoute from 'src/routes/friend.route';
import groupRoute from 'src/routes/group.route';
import groupMessageRoute from 'src/routes/groupMessage.route';
import messageRoute from 'src/routes/message.route';
import userRoute from 'src/routes/user.route';
import { app, server } from 'src/socket/socket';
import logger from 'src/utils/logger.util';

const __dirname = path.resolve();

app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/friendship', friendshipRoute);
app.use('/api/users', userRoute);
app.use('/api/groups', groupRoute);
app.use('/api/group/messages', groupMessageRoute);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

const PORT = dotEnvConfig.PORT || 4000;
server.listen(PORT, () => {
  connectToMongoDB();
  logger.info(`Server is running on port ${PORT}`);
});
