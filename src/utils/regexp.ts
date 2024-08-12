// -없는 전화번호 정규식
const REG_PHONE =
  /^(010|011|012|013|014|015|016|017|018|019|02|031|032|033|041|042|043|044|051|052|053|054|055|061|062|063|064|070)\d{3,4}\d{4}$/;

//0-9 로 시작하는 숫자만 가능
const REGEXP_NUM = /^[0-9]+$/;

const REGEXP_PHONE_NUM = /^[0-9-]+$/;

const REGEXP_PHONE_PATTERN = /(\d{3})(\d{4})(\d{4})/;

const REGEXP_PHONE_HYPHEN_PATTERN = /^\d{3}-\d{4}-\d{4}$/;

// 1학년부터 19학년까지
const REGEXP_GRADE_NUM = /^(0?[1-9]|1[0-9])$/;

export { REGEXP_NUM, REGEXP_PHONE_NUM, REGEXP_PHONE_PATTERN, REG_PHONE, REGEXP_PHONE_HYPHEN_PATTERN, REGEXP_GRADE_NUM};

export const getHypenCardNumber = (number: string) => {
  const onlyNumber = number.replace(/[^0-9]/g, "");
  const cardNumber = onlyNumber.replace(
    /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g,
    "$1-$2-$3-$4"
  );
  // dash 삭제
  number = cardNumber.replace(/(-{1,2})$/g, "");
  return number;
};

export const getHypenPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber.length === 11) {
    phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (phoneNumber.length === 13) {
    phoneNumber.replace(/-/g, "").replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  }
};
