import {verifyDiscordRequest} from "../src/index"

describe('verify signature test suite', () => {
  it.todo('should verify detached signature');
  it('should return false when headers aren\'t present', () => {
    expect(verifyDiscordRequest("dioasjid", {}, "siudua"))
      .toBeFalsy();
  })
})