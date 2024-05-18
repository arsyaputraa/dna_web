import dayjs from "dayjs";

const DetailDialog = () => {
  return (
    <div>
      <h1 className="mb-3 font-semibold text-2xl">{"5XX-XXXXXXX"}</h1>
      <div className="flex gap-1 items-center mb-3 text-sm">
        <h4>{"5XX-XXXXXXX_1"}</h4>
        <p>DNA</p>
        <p>{dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")}</p>
      </div>
      <div className="text-center w-full">
        <audio controls className="w-full">
          <source src="https://www.computerhope.com/jargon/m/example.mp3" />
        </audio>
      </div>
    </div>
  );
};

export default DetailDialog;
