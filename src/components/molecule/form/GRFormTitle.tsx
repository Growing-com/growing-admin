import GRText from "@component/atom/text/GRText";

const GRFormTitle = ({ title }: { title?: string }) => {
  return (
    <GRText margin={1} width={4} weight={"bold"}>
      {title ?? ""}
    </GRText>
  );
};

export default GRFormTitle;
