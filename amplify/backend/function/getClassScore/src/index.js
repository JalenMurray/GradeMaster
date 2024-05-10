/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const fetchAssignmentsByType = async (id) => {
  const params = {
    TableName: 'AssignmentType-blsryvexfndfxc4ighlgtmiyge-main',
    IndexName: 'classId',
    KeyConditionExpression: 'assignmentTypeClassId = :id',
    ExpressionAttributeValues: {
      ':id': id,
    },
  };

  try {
    const data = await dynamodb.query(params).promise();
    return data.Items;
  } catch (err) {
    console.error('Error Fetching Assignment Types by Class', err);
    throw new Error('Error fetching assignment types by class');
  }
};

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  const { clsId } = event;
  const assignmentTypes = await fetchAssignmentsByType(clsId);
  console.log('ASSIGNMENT TYPES FOUND:', assignmentTypes);
  console.log('Adding up Assignment Total Scores and Max Total Scores');
  const totalScore = assignmentTypes.reduce((acc, at) => acc + at.totalScore, 0);
  const maxTotalScore = assignmentTypes.reduce((acc, at) => acc + at.maxTotalScore, 0);
  const score = (totalScore / maxTotalScore) * 100;

  console.log(`Total Class Score: ${totalScore} / ${maxTotalScore} = ${score}`);
  const params = {
    TableName: 'Class-blsryvexfndfxc4ighlgtmiyge-main',
    Key: { id: clsId },
    UpdateExpression: 'SET score = :score',
    ExpressionAttributeValues: {
      ':score': score,
    },
  };
  try {
    await dynamodb.update(params).promise();
    console.log('Updated Class Score', clsId);
  } catch (err) {
    console.error('Error updating class score', clsId, err);
    throw new Error('Error updating class score');
  }

  return {
    statusCode: 200,
    body: JSON.stringify('Class Score Updated!'),
  };
};
