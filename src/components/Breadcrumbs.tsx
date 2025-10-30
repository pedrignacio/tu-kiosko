import React from 'react';
import { useNavigate } from 'react-router-dom';

interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
    const navigate = useNavigate();

    return (
        <nav className="mb-6 text-sm text-gray-600 dark:text-gray-400 animate-fadeIn">
            <ol className="flex flex-wrap items-center gap-2">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                        {item.path ? (
                            <button
                                onClick={() => navigate(item.path!)}
                                className="hover:text-blue-600 dark:hover:text-blue-400 transition font-medium"
                            >
                                {item.label}
                            </button>
                        ) : (
                            <span className="text-gray-800 dark:text-white font-semibold">
                                {item.label}
                            </span>
                        )}
                        {index < items.length - 1 && (
                            <span className="text-gray-400 dark:text-gray-600">›</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;