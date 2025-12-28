import dayjs from 'dayjs';

export const generateRandomTransactionExternalId = () => {
  const time = dayjs().valueOf();
  const pre = time.toString(16);
  const suffix = Math.random().toString(36).substring(2, 5);
  return `${pre}_${suffix}`;
};

export function generateRandomCode(length = 12) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let randomCode = '';
  for (let i = 0; i < length; i++) {
    randomCode += characters.charAt(
      Math.floor(Math.random() * characters.length),
    );
  }
  return randomCode;
}

export const generateRandomCodeWithPrefix = (prefix: string, length = 12) => {
  return `${prefix}${generateRandomCode(length)}`;
};

export const generateOTP = (length = 4) => {
  const digits = '0123456789';
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};
