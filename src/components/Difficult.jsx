export const Difficult = ({ name, items, value, onChange }) => {
  return (
    <div className="border-2 border-[#615858] rounded-lg p-4 flex flex-col gap-2">
      <h2 className="text-[#d75a5a] text-xl font-semibold">Dificultad</h2>
      <div className="w-full flex justify-between">
        {items.map((item) => (
          <div key={item.value}>
            <input
              name={name}
              type="radio"
              value={item.value}
              id={name + item.value}
              checked={value === item.value}
              onChange={(e) => onChange(e.target.value)}
            />
            <label
              htmlFor={name + item.value}
              className="text-white text-md ml-2"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Difficult;
