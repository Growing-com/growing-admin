import { NextPageContext } from "next";

const Error = ({ statusCode }: { statusCode: string }) => {
  return (
    <p>
      {statusCode
        ? `잘못 들어온 페이지 입니다. 오류 코드 ${statusCode} 발생`
        : "웹페이지 오류 입니다"}
    </p>
  );
};

Error.getInitialProps = (ctx: NextPageContext) => {
  const { res, err } = ctx;
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
