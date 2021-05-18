'use strict';

/**
 * tweeter-client.js controller
 *
 * @description: A set of functions called "actions" of the `tweeter-client` plugin.
 */

module.exports = {

  /**
   * Default action.
   *
   * @return {Object}
   */

  index: async (ctx) => {
    const data = await strapi.query('tweet', 'twitter-client').search({ _q: '', _limit: 3, _sort: 'external_id:desc' });

    // Send 200 `ok`
    ctx.send({
      response: data
    });
  }
};
