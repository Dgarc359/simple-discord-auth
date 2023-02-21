import * as nacl from 'tweetnacl';

interface IHeaders {
  [name: string]: string | undefined;
}

export const verifyDiscordRequest = (body: string, headers: IHeaders, botPublicKey: string): boolean => {
  const signature = headers['x-signature-ed25519'];
  const timestamp = headers['x-signature-timestamp'];

  if (!signature) throw new Error('No signature found in headers');
  if (!timestamp) throw new Error('No timestamp found in headers');

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(botPublicKey, 'hex'),
  );

  return isVerified;
};
