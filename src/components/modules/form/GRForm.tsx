import React, { FC, ReactNode } from "react";

type tGRForm = {
  children: ReactNode;
} & React.FormHTMLAttributes<HTMLFormElement>;

const GRForm: FC<tGRForm> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default GRForm;
