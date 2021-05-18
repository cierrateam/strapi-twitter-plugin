'use strict';

/**
 * tweeter-client.js service
 *
 * @description: A set of functions similar to controller's actions to avoid code duplication.
 */

module.exports = {
  update: async () => {
    const data = await strapi.query('tweet', 'twitter-client').search({ _q: '', _limit: 1, _sort: 'external_id:desc' });

    const params = {
      'tweet.fields': 'created_at',
      'expansions': 'author_id',
      'user.fields': 'created_at',
      'exclude': 'retweets',
      'max_results': 5,
    };

    if (data.length) {
      params.since_id = data[0].external_id;
    }

    const { client, prepareQuery } = strapi.plugins['twitter-client'].services['twitter-client'];
    const response = await client().get(prepareQuery('/tweets', params));

    if (response.status === 200 && response.data.data) {
      const tweets = response.data.data;
      tweets.forEach(tweet => {
        strapi.query('tweet', 'twitter-client').create({
          external_id: tweet.id,
          external_created_at: tweet.created_at,
          content: tweet.text,
        });
      });
    }
  },
};
