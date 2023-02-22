import * as nacl from 'tweetnacl';

interface IHeaders {
  [name: string]: string | undefined;
}

/**
 * Verify Discord request
 * 
 * @param body discord event body payload
 * @param headers discord event headers
 * @param botPublicKey your bot's public key
 * @returns `true` if request is verified, `false` if not, or headers are missing
 */
export const verifyDiscordRequest = (body: string, headers: IHeaders, botPublicKey: string): boolean => {
  const signature = headers['x-signature-ed25519'];
  const timestamp = headers['x-signature-timestamp'];

  if(!signature || !timestamp) {
    console.error("Missing fields in headers");
    return false;
  }

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body),
    Buffer.from(signature, 'hex'),
    Buffer.from(botPublicKey, 'hex'),
  );

  return isVerified;
};
