const CustomSelect = ({
    label,
    options,
    selectedOption,
    onChange,
    className,
    standardOptionText,
    capitaliseOptions = false,
}: {
    label: string;
    options: string[];
    selectedOption: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className: string;
    standardOptionText: string;
    capitaliseOptions?: boolean;
}) => {
    return (
        <>
            <label className='block text-sm font-medium text-gray-700'>
                {label}
            </label>
            <select
                className={className}
                value={selectedOption}
                onChange={onChange}>
                <option value='' disabled>
                    {standardOptionText}
                </option>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {capitaliseOptions
                            ? option.slice(0, 1).toUpperCase() +
                              option.slice(1).toLowerCase()
                            : option}
                    </option>
                ))}
            </select>
        </>
    );
};

export default CustomSelect;
