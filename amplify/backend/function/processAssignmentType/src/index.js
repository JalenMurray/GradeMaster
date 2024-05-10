const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const lambda = new AWS.Lambda();

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

const balanceAssignmentWeights = async (atWeight, assignments) => {
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
  console.log('EVENT STREAM:', event);
  event.Records.forEach(async (record) => {
    console.log('RECORD', record);
    if (record.eventName === 'MODIFY') {
      const oldImage = record.dynamodb.OldImage;
      const image = record.dynamodb.NewImage;
      const atId = image.id.S;
      console.log(`Assignment Type ${atId} was modified`);
      console.log('OLD IMAGE:', oldImage);
      console.log('NEW IMAGE:', image);

      // Balance Weights
      const lockWeightsOn = image.lockWeights.BOOL;
      const weightChanged = oldImage.weight.N !== image.weight.N;

      const lockWeightsToggledOn =
        oldImage.lockWeights.BOOL !== image.lockWeights.BOOL && lockWeightsOn;

      const lockWeightsOnWeightChanged = lockWeightsOn && weightChanged;

      if (lockWeightsOnWeightChanged || lockWeightsToggledOn) {
        console.log('Lock Weights was toggled on or lock weights is on and weight was changed');
        console.log('Balancing Assignment Weights');
        const assignmentTypeWeight = image.weight.N;
        console.log('UPDATING ASSIGNMENTS FROM ASSIGNMENT TYPE:', image.name.S, atId);
        try {
          const assignments = await fetchAssignmentsByType(atId);
          console.log('FOUND ASSIGNMENTS', assignments);
          if (assignments.length > 0) {
            await balanceAssignmentWeights(assignmentTypeWeight, assignments);
            console.log('ASSIGNMENT WEIGHTS SHOULD BE UPDATED');
          }
        } catch (err) {
          console.error('Error processing assignments', err);
          return { statusCode: 500, body: err };
        }
      }

      // Update Scores

      const totalScoreChanged = oldImage.totalScore.N !== image.totalScore.N;
      if (totalScoreChanged || weightChanged) {
        console.log('Total Score or Weight changed');
        console.log('Updating class');
        const params = {
          FunctionName: 'getClassScore-main',
          Payload: JSON.stringify({
            clsId: image.assignmentTypeClassId.S,
          }),
        };
        lambda.invoke(params, (err, data) => {
          if (err) {
            console.error('Error invoking getClassScore:', err);
          } else {
            console.log('Lambda function invoked successfully:', data.Payload);
          }
        });
      }
    }
  });
  return {
    statusCode: 200,
    body: JSON.stringify('Finished toggling lockWeights On'),
  };
};
