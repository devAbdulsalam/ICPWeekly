const Button = ({
    isLoading,
    label,
    onClick,
    icon: Icon,
}: {
    isLoading: boolean;
    label: string;
    onClick: () => void;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}) => (
    <button
        className="py-3 px-6 flex items-center justify-center rounded-md border-gray-600 border-2 w-3/5 mb-4 text-lg hover:bg-gray-800 hover:text-gray-50"
        onClick={onClick}
        disabled={isLoading}
    >
        {Icon && <Icon className="inline-block mr-2" />}
        {isLoading ? 'Processing...' : label}
    </button>
);
