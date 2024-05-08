/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
('use strict');
const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const fetchAssignmentsByType = async (id) => {
  const params = {
    TableName: 'Assignment-blsryvexfndfxc4ighlgtmiyge-main',
    IndexName: 'assignmentTypeId',
    KeyConditionExpression: 'assignmentAssignmentTypeId = :id',
    ExpressionAttributeValues: {
      ':id': { S: id },
    },
  };
  try {
    const data = await dynamodb.query(params).promise();
    return data.Items;
  } catch (err) {
    console.error('Error Fetching Assignments By Type', err);
    throw new Error('Error fetching assignments by type');
  }
};

exports.handler = (event) => {
  event.Records.forEach(async (record) => {
    if (record.eventName === 'MODIFY') {
      const image = record.dynamodb.NewImage;
      if (image.lockWeights.BOOL) {
        const assignmentTypeId = image.id.S;
        try {
          const assignments = await fetchAssignmentsByType(assignmentTypeId);
          console.log('FOUND ASSIGNMENTS', assignments);
        } catch (err) {
          console.error('Error processing assignments', error);
          return { statusCode: 500, body: error };
        }
      }
      return { statusCode: 200, body: image };
    }
  });
  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};
