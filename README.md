# simple-discord-auth

Simple Discord Authorization for verifying validity of requests coming from Discord's HTTP Interactions endpoint.

Example Usage:
Please note, this example is taken from a discord bot that receives Discord Payloads via a lambda function url
```ts
import { verifyDiscordRequest } from "simple-discord-auth";

const BOT_PUBLIC_KEY = process.env.PUBLIC_KEY
const BadRequest = {
  statusCode: 401,
  body: "Bad Request",
};

const InternalError = {
  statusCode: 500,
  body: "Internal Server Error"
}

export const handler = async (_evt) => {
  if(!BOT_PUBLIC_KEY) return InternalError
  const {body, headers} = _evt;
  if(!body) return BadRequest;

  // verify request is legitimate
  const isVerified = verifyDiscordRequest(body, headers, BOT_PUBLIC_KEY);

  if(!isVerified) return BadRequest;
  // ... Rest of code to handle commands below
}
```