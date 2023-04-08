interface FilterSelectProps {
  onChange: (value: string) => void;
  data: { id: number; name: string }[] | string[];
  name: string;
  defaultValue: string;
}

function isStringArray(data: unknown[]): data is string[] {
  return data.every((item) => typeof item === "string");
}

const FilterSelect = ({
  onChange,
  data,
  name,
  defaultValue,
}: FilterSelectProps) => {
  const transformeData = isStringArray(data)
    ? data.map((item, i) => ({ id: i, name: item }))
    : data;
  return (
    <div className="filter">
      <div className="filter-container">
        <span className="filter-text">{name}:</span>
      </div>
      <div className="input-group">
        <select
          defaultValue={defaultValue}
          name={name}
          className="form-input"
          onChange={(e) => onChange(e.target.value)}
        >
          {transformeData.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSelect;
