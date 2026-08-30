import { useId } from 'react';

const SectionDivider = ({ label }) => {
    const id = useId();
    return (
        <div className="flex items-center justify-center gap-4 py-8 px-4 max-w-full overflow-hidden">
            {/* Left gradient line */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="372"
                height="2"
                viewBox="0 0 272 2"
                fill="none"
                className="flex-shrink-0 min-w-0"
                preserveAspectRatio="none"
            >
                <path d="M272 1L0.5 0.999976" stroke={`url(#dividerLeft-${id})`} />
                <defs>
                    <linearGradient
                        id={`dividerLeft-${id}`}
                        x1="272.5"
                        y1="1.49831"
                        x2="0.500004"
                        y2="0.998287"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#ECA5A7" />
                        <stop offset="0.165137" stopColor="#581D27" />
                        <stop offset="1" stopColor="#190E14" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Label */}
            <span className="text-md font-semibold text-brand-300 tracking-widest uppercase flex-shrink-0">
                {label}
            </span>

            {/* Right gradient line */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="372"
                height="2"
                viewBox="0 0 272 2"
                fill="none"
                className="flex-shrink-0 min-w-0"
                preserveAspectRatio="none"
            >
                <path d="M0 1L271.5 1" stroke={`url(#dividerRight-${id})`} />
                <defs>
                    <linearGradient
                        id={`dividerRight-${id}`}
                        x1="-0.500003"
                        y1="0.501689"
                        x2="271.5"
                        y2="1.00169"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#ECA5A7" />
                        <stop offset="0.165137" stopColor="#581D27" />
                        <stop offset="1" stopColor="#190E14" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default SectionDivider;
