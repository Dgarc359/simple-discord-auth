import nacl from "tweetnacl";
import * as naclUtil from 'tweetnacl-util';
import {verifyDiscordRequest} from "../src/index"

describe('verify signature test suite', () => {
  it('should verify detached signature', () => {
    expect(() => {
      const kp = nacl.sign.keyPair();
      const sk = kp.secretKey;
      const pk = kp.publicKey;
      const msg = naclUtil.decodeUTF8("Test Message")
      const signature = nacl.sign(msg, sk);
      const headers = {
        'x-signature-ed25519': naclUtil.encodeUTF8(signature),
        'x-signature-timestamp': Date.now().toString(),
      }
      return verifyDiscordRequest("", headers, naclUtil.encodeUTF8(pk));
    }).toBeTruthy();
  });
  it('should return false when headers aren\'t present', () => {
    expect(verifyDiscordRequest("dioasjid", {}, "siudua"))
      .toBeFalsy();
  })
})