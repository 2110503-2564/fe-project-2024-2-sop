'use client';

import Link from "next/link";

interface MenuItemProps {
    title: string;
    href: string;
    count?: number;
}

export default function MenuItem({title, href, count}: MenuItemProps) {
    return (
        <Link href={href} className="text-gray-600 hover:text-gray-800 flex items-center">
            {title}
            {count !== undefined && count > 0 && (
                <span className="ml-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {count}
                </span>
            )}
        </Link>
    );
}