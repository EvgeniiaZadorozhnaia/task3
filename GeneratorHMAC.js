import crypto from "crypto";

class GeneratorHMAC {
  static getNumber(min, max) {
    const range = max - min;
    const maxRange = Math.pow(2, 32);
    while (true) {
      const randomBuffer = crypto.randomBytes(4);
      const randomInt = randomBuffer.readUInt32BE(0);
      if (randomInt < Math.floor(maxRange / range) * range) {
        return min + (randomInt % range);
      }
    }
  }

  static getHMAC(secretKey, number) {
    const message = number.toString();
    const hmacResult = crypto
      .createHmac("sha3-256", secretKey)
      .update(message)
      .digest("hex");

    return hmacResult;
  }
}

export default GeneratorHMAC;