import { TooltipProps } from "recharts";
import {
  NameType,
  Payload,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (!active && !payload && !payload) {
    return null;
  }

  return (
    <div className="rounded-md border-gray-600 bg-white p-2 text-sm shadow-lg">
      <p className="font-bold">{`Day ${label}`}</p>
      {payload?.map((pld: Payload<ValueType, NameType>) => (
        <div key={pld.dataKey} style={{ color: pld.color }}>
          {`${pld.name}: ${pld.value ? Number(pld.value).toFixed(1) : 0}%`}
        </div>
      ))}
    </div>
  );
};

export default CustomTooltip;
