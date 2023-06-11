import { IconEye, IconEyeSlash } from 'library';
import { CSSProperties, useState } from 'react';

type Props<TType> = {
  errors?: string;
  type: string;
  value: string;
  name: keyof TType;
  placeholder: string;
  label?: string;
  labelStyle?: CSSProperties;
  onChange?: any;
};

export function FormInput<TType>({
  errors,
  type,
  name,
  placeholder,
  label,
  value,
  labelStyle,
  onChange,
}: Props<TType>) {
  const [isShowPassword, setIsShowPassword] = useState(false);

  let className =
    'mt-3 h-[52px] w-full appearance-none rounded-[8px] border bg-white px-[20px] py-[15px] text-sm text-[#627480] placeholder-[#A3A9B1] focus:outline-none md:text-base';

  if (errors) {
    className += ' border-red-700 text-red-700 placeholder-red-400';
  }

  return (
    <div className="relative">
      {label && (
        <label
          style={labelStyle}
          className="text-grayColor font-bold text-base mb-3"
        >
          {label}
        </label>
      )}

      <input
        type={isShowPassword ? 'text' : type}
        name={name as string}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
      />

      {type === 'password' && (
        <span
          className="absolute top-12 right-5 z-10"
          onClick={() => setIsShowPassword(!isShowPassword)}
        >
          {isShowPassword ? <IconEyeSlash /> : <IconEye />}
        </span>
      )}
    </div>
  );
}
