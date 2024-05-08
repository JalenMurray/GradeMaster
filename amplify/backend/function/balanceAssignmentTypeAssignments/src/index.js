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
      ':id': id,
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

const updateAssignmentsWeights = async (atWeight, assignments) => {
  const newWeight = atWeight / assignments.length;
  console.log('NEW WEIGHT', newWeight);
  const updatePromises = assignments.map(async (assignment) => {
    const params = {
      TableName: 'Assignment-blsryvexfndfxc4ighlgtmiyge-main',
      Key: { id: assignment.id },
      UpdateExpression: 'SET weight = :newWeight',
      ExpressionAttributeValues: {
        ':newWeight': newWeight,
      },
    };

    try {
      await dynamodb.update(params).promise();
      console.log('Updated Assignment Weight', assignment.id);
    } catch (err) {
      console.error('Error updating assignment', assignment.id, err);
      throw new Error('Error updating assignments weights');
    }
  });

  await Promise.all(updatePromises);
};

exports.handler = (event) => {
  event.Records.forEach(async (record) => {
    if (record.eventName === 'MODIFY') {
      const image = record.dynamodb.NewImage;
      if (image.lockWeights.BOOL) {
        const assignmentTypeId = image.id.S;
        const assignmentTypeWeight = image.weight.N;
        console.log('UPDATING ASSIGNMENTS FROM ASSIGNMENT TYPE:', image.name.S, assignmentTypeId);
        try {
          const assignments = await fetchAssignmentsByType(assignmentTypeId);
          console.log('FOUND ASSIGNMENTS', assignments);
          if (assignments.length > 0) {
            await updateAssignmentsWeights(assignmentTypeWeight, assignments);
            console.log('ASSIGNMENT WEIGHTS SHOULD BE UPDATED');
          }
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
