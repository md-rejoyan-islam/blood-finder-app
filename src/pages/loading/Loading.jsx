import "./Style.css";

function Loading() {
  return (
    <div className="h-[calc(100vh-10px)] flex-col flex justify-center items-center">
      <div className="w-full">
        <div className="wrapper">
          <svg className="space-y-3 text-red-500">
            <text x="50%" y="50%" dy=".35em" textAnchor="middle">
              KIN
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default Loading;
