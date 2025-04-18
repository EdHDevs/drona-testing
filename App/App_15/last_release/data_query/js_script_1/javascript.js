const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
const PNF = libphonenumber.PhoneNumberFormat;

const input = "6478062302"; // or use input1.value or {{phone_input}} if dynamic
const region = "CA";

try {
  const number = phoneUtil.parse(input, region);

  if (phoneUtil.isValidNumber(number)) {
    return {
      rawInput: input,
      numberOnly: number.getNationalNumber().toString(), // This is the number without country code
      national: phoneUtil.format(number, PNF.NATIONAL),
      international: phoneUtil.format(number, PNF.INTERNATIONAL),
      e164: phoneUtil.format(number, PNF.E164),
      rfc3966: phoneUtil.format(number, PNF.RFC3966),
      countryCode: number.getCountryCode(),
      numberType: phoneUtil.getNumberType(number), // 1 = MOBILE, 0 = FIXED_LINE, etc.
      isValid: true
    };
  } else {
    return { isValid: false, message: "Invalid phone number" };
  }
} catch (e) {
  return { isValid: false, error: e.message };
}
