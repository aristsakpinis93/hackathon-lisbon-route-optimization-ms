import axios from 'axios';

import awsParamStore from 'aws-param-store';

export async function handler(event, context){


  const {Value: routificApiKey} = await awsParamStore.getParameter('/routific/apiKey');
  console.log(JSON.stringify(event));

  const {body: rawBody} = event;

  const parsedBody = JSON.parse(rawBody);

  const headers = {
                  'Authorization': `Bearer ${routificApiKey}`,
                  'Content-Type': 'application/json'
                  };

  const result = await axios({
                    method: 'POST',
                    url: 'https://api.routific.com/v1/vrp',
                    headers,
                    data: parsedBody
                  });

  return Promise.resolve({
      statusCode: 200,
      body: JSON.stringify({
      msg: result.data}),
    });
}
