// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');
// Set the region 
AWS.config.update({region: 'us-east-1'});

// Create an SQS service object
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

function createQueue(queueName, fn) {
  let params = {
    QueueName: `${queueName}.fifo`,
    Attributes: {
      'DelaySeconds': '60',
      "FifoQueue": "true"
    }
  };
  
  sqs.createQueue(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
      fn(data);
    }
  });
}

function listQueues(fn) {
  let params = {};

  sqs.listQueues(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
      fn(data)
    }
  });
}

function getQueueUrl(queueName, fn) {
  let params = {
    QueueName: queueName
  };
  
  sqs.getQueueUrl(params, function(err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data.QueueUrl);
      fn(data.QueueUrl);
    }
  });
}

function sendMessage(storeQueueUrl, storeId, customerId, fn) {
  let sqsOrderData = {
      MessageAttributes: {
        "Customer": {
          DataType: "String",
          StringValue: customerId
        }
      },
      MessageBody: customerId,
      MessageDeduplicationId: customerId,
      MessageGroupId: storeId,
      QueueUrl: storeQueueUrl
  }

  let sendSqsMessage = sqs.sendMessage(sqsOrderData).promise();

  sendSqsMessage.then((data) => {
      console.log(`SUCCESS: ${data}`);
      fn(data);
  }).catch((err) => {
      console.log(`ERROR: ${err}`);
  })
}

function recieveAndDeleteMessage(storeQueueUrl, fn) {
  let params = {
    AttributeNames: [
       "SentTimestamp"
    ],
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
       "All"
    ],
    QueueUrl: storeQueueUrl,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 0
   };
   
   sqs.receiveMessage(params, function(err, data) {
     if (err) {
       console.log("Receive Error", err);
     } else if (data.Messages) {
       var deleteParams = {
         QueueUrl: storeQueueUrl,
         ReceiptHandle: data.Messages[0].ReceiptHandle
       };
       sqs.deleteMessage(deleteParams, function(err, data) {
         if (err) {
           console.log("Delete Error", err);
         } else {
           console.log("Message Deleted", data);
           // TODO make sure this sends all the needed data
           fn(data);
         }
       });
     }
   });
}

module.exports.createQueue = createQueue;
module.exports.listQueues = listQueues;
module.exports.getQueueUrl = getQueueUrl;
module.exports.sendMessage = sendMessage;
module.exports.recieveAndDeleteMessage = recieveAndDeleteMessage;
