import FingerprintJS from "@fingerprintjs/fingerprintjs";

const getFingerprint = () =>
  FingerprintJS.load({ monitoring: true })
    .then((a) => a.get())
    .catch((err) => Promise.reject(err));

export default getFingerprint;
