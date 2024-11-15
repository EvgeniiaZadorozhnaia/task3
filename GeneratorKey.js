import crypto from "crypto";

class GeneratorKey {
  static get() {
    return crypto.randomBytes(32).toString('hex');
  }
}

export default GeneratorKey;