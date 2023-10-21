interface DropdownProps {
  label: string;
  spacing?: string;
  labelStyle: string;
  width?: string;
  options: IProvince[] | string[];
  value?: string;
  provinceChange?: (newId: string) => void;
  onChange?: (e: any) => void;
  flexLabel?: string;
}

interface IProvince {
  province_id: string;
  province: string;
}

function Dropdown(props: DropdownProps) {
  return (
    <div
      className={`dropdown-div ${props.flexLabel} ${
        props.spacing ? props.spacing : ""
      }`}
    >
      <p className={props.labelStyle}>{props.label}</p>
      <select
        className={`p-4 ${props.width} rounded bg-amber-100`}
        name="category-dropdown"
        value={props.value}
        onChange={(e) => {
          if (props.provinceChange) {
            props.provinceChange(e.target.value);
          }

          if (props.onChange) {
            props.onChange(e.target.value);
          }
        }}
      >
        {props.options.map((option, index) => (
          <option
            key={index}
            value={typeof option === "string" ? option : option.province_id}
          >
            {typeof option === "string" ? option : option.province}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
