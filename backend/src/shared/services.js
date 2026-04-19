export const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};
export const generateFingerprint = (idNumber, dob) => {
  const addhar_id = idNumber;
  const dobFormatted = dob.replaceAll("-", "");
  return `${addhar_id}-${dobFormatted}`;
};
export const generateEmployeeId = () => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return `EMP-IND-${random}`;
};

export const normalizeIdentifier = (identifier) => {
  return identifier.includes("@")
    ? { email: identifier.toLowerCase().trim() }
    : { mobile: identifier };
};

export const mapIdType = (type) => {
  const t = (type || "").toLowerCase();
  switch (t) {
    case "aadhaar":
      return "Aadhaar";
    case "pan":
      return "PAN";
    case "passport":
      return "Passport";
    case "driving":
    case "driving_license":
      return "Driving_License";
    default:
      return "Aadhaar";
  }
};
