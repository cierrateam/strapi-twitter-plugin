'use strict';

const axios = require('axios');

/**
 * tweeter-client.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

const { api } = require('../config/api');

module.exports = {
  client: () => {
    return axios.create({
      baseURL: `https://api.twitter.com/2/users/${api.userId}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api.token}`
      }
    });
  },
  prepareQuery: (endpoint, params) => {
    return `${endpoint}?${Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&')}`;
  },
};
