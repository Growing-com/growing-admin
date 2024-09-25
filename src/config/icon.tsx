import Icon from '@ant-design/icons';
import type { GetProps } from 'antd';
import { CSSProperties } from "react";

type CustomIconComponentProps = GetProps<typeof Icon>;

type tPersonalDataIcon = {
  style?: CSSProperties;
};

export const PersonalDataIcon: React.FC<tPersonalDataIcon> = ({ style }) => {
  return (
    <svg
      //   width="20"
      //   height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M11.6666 1.66675H4.99992C4.55789 1.66675 4.13397 1.84234 3.82141 2.1549C3.50885 2.46746 3.33325 2.89139 3.33325 3.33341V16.6667C3.33325 17.1088 3.50885 17.5327 3.82141 17.8453C4.13397 18.1578 4.55789 18.3334 4.99992 18.3334H14.9999C15.4419 18.3334 15.8659 18.1578 16.1784 17.8453C16.491 17.5327 16.6666 17.1088 16.6666 16.6667V6.66675M11.6666 1.66675L16.6666 6.66675M11.6666 1.66675L11.6666 6.66675H16.6666M13.3333 10.8334H6.66659M13.3333 14.1667H6.66659M8.33325 7.50008H6.66659"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const NewfamilyIcon: React.FC<tPersonalDataIcon> = ({ style }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={style}
    >
      <path
        d="M17.3667 3.84172C16.941 3.41589 16.4357 3.0781 15.8795 2.84763C15.3232 2.61716 14.7271 2.49854 14.125 2.49854C13.5229 2.49854 12.9268 2.61716 12.3705 2.84763C11.8143 3.0781 11.309 3.41589 10.8833 3.84172L10 4.72506L9.11666 3.84172C8.25692 2.98198 7.09086 2.49898 5.875 2.49898C4.65914 2.49898 3.49307 2.98198 2.63333 3.84172C1.77359 4.70147 1.29059 5.86753 1.29059 7.08339C1.29059 8.29925 1.77359 9.46531 2.63333 10.3251L10 17.6917L17.3667 10.3251C17.7925 9.89943 18.1303 9.39407 18.3608 8.83785C18.5912 8.28164 18.7099 7.68546 18.7099 7.08339C18.7099 6.48132 18.5912 5.88514 18.3608 5.32893C18.1303 4.77271 17.7925 4.26735 17.3667 3.84172Z"
        stroke="#444444"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
