const legendItems = [
  { color: "bg-green-400", label: "Application to Interview Rate" },
  { color: "bg-purple-500", label: "Offer Acceptance Rate" },
  { color: "bg-orange-400", label: "Rejection Rate" },
];

const CustomLegend = () => (
  <div className="mt-4 ml-11 flex flex-wrap items-center justify-start gap-4 md:gap-6">
    {legendItems.map((item) => (
      <div
        key={item.label}
        className="text-main-primary flex items-center gap-2 text-xs"
      >
        <div className={`h-[14px] w-[14px] rounded-full ${item.color}`} />
        <span className="text-gray-500">{item.label}</span>
      </div>
    ))}
  </div>
);

export default CustomLegend;
