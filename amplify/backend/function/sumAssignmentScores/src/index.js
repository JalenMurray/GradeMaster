/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
('use strict');
var AWS = require('aws-sdk');

exports.handler = (event) => {
  event.Records.forEach((record) => {
    console.log('Stream record: ', JSON.stringify(record, null, 2));

    if (record.eventName == 'INSERT') {
      const who = JSON.stringify(record.dynamodb.NewImage.owner.S);
      const when = JSON.stringify(record.dynamodb.NewImage.updatedAt.S);
      const season = JSON.stringify(record.dynamodb.NewImage.season.S);
      const year = JSON.stringify(record.dynamodb.NewImage.year.S);
      return {
        statusCode: 200,
        body: { who: who, when: when, season: season, year: year },
      };
    }
  });
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};
