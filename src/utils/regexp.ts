// -없는 전화번호 정규식
const REG_PHONE =
  /^(010|011|012|013|014|015|016|017|018|019|02|031|032|033|041|042|043|044|051|052|053|054|055|061|062|063|064|070)\d{3,4}\d{4}$/;

//0-9 로 시작하는 숫자만 가능
const REGEXP_NUM = /^[0-9]+$/;

const REGEXP_PHONE_NUM = /^[0-9-]+$/;

const REGEXP_PHONE_PATTERN = /(\d{3})(\d{4})(\d{4})/;

export { REGEXP_NUM, REGEXP_PHONE_NUM, REGEXP_PHONE_PATTERN, REG_PHONE };
