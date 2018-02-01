'use strict';

const Promise = require('bluebird');

const app = require('../server');
const generateTwitterOauthToken =
  require('../helpers/generateTwitterOauthToken');

const TwitterDs = app.datasources.twitterDs;
const twitterConfig = app.get('twitterDs');

let oauthToken = undefined;
let accessToken = undefined;

const updateAccessCode = () => {
  return new Promise((resolve, reject) => {
    oauthToken = generateTwitterOauthToken(
      twitterConfig.consumerKey, twitterConfig.consumerSecret
    );

    TwitterDs.getAccessToken(oauthToken)
      .then(response => {
        const jsonResponse = JSON.parse(response);

        if (jsonResponse.token_type !== 'bearer') {
          return reject(
            new Error(`Twitter returned an invalid token type.\n\n
              Type: ${jsonResponse.token_type}`)
          );
        }

        accessToken = jsonResponse.access_token;
        return resolve();
      })
      .catch(reject);
  });
};

module.exports.bootstrap = async () => {
  return await updateAccessCode();
};

module.exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    if (!accessToken) {
      return updateAccessCode().then(this.getUserById);
    }

    return resolve(TwitterDs.getUserById(userId, accessToken));
  });
};

module.exports.getUserByScreenName = (screenName) => {
  return new Promise((resolve, reject) => {
    if (!accessToken) {
      return updateAccessCode().then(this.getUserByScreenName);
    }

    return resolve(TwitterDs.getUserByScreenName(screenName, accessToken));
  });
};
