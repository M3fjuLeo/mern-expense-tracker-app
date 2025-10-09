import type { IconType } from "react-icons";

type TileProps = {
  value?: number;
  title: string;
  color: string;
  icon: IconType;
};

const Tile = ({ value, title, color, icon: Icon }: TileProps) => {
  return (
    <div className="bg-white p-8 flex w-full rounded-xl shadow-lg items-center gap-6">
      <div className={`text-5xl ${color} text-white rounded-full p-2`}>
        <Icon />
      </div>

      <div>
        <h3 className="text-xl font-medium text-gray-500">{title}</h3>
        <span className="text-lg">
          {value?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </span>
      </div>
    </div>
  );
};

export default Tile;
