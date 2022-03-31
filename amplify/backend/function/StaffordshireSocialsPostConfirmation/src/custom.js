/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const aws = require('aws-sdk');
const dynamodb = new aws.DynamoDB();

const tableName = process.env.USERTABLE;

exports.handler = async (event, context) => {
  // insert code to be executed by your lambda trigger
  // save the user to dynamodb
  if (!event?.request?.userAttributes?.sub){
    console.log("No sub provided");
    return;
  }
  const dateNow = new Date();
  const currentTimeStamp = dateNow.getTime();
  
  const user = {
    __typename: { S: 'User' },
    _lastChangedAt: { N: currentTimeStamp.toString() },
    _version: { N: "1" },
    createdAt: { S: dateNow.toISOString() },
    updatedAt: { S: dateNow.toISOString() },
    id: { S: event.request.userAttributes.sub },
    name: { S: event.request.userAttributes.email },
  }
  const params = {
    Item: user,
    TableName: tableName
  }
  try {
    await dynamodb.putItem(params).promise();
    console.log("sucess");
  } catch (error) {
    console.log(error);
  }
};
