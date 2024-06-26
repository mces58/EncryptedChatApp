import Joi from 'joi';

import mongoId from 'src/validations/mongoId.validation';

const sendGroupImageMessage = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
  body: Joi.object().keys({
    uri: Joi.string().trim().required().label('Image'),
  }),
};

const sendGroupAudioMessage = {
  params: Joi.object().keys({
    groupId: Joi.custom(mongoId).label('Group ID'),
  }),
  body: Joi.object().keys({
    uri: Joi.string().trim().required().label('Audio'),
  }),
};

export default { sendGroupImageMessage, sendGroupAudioMessage };
