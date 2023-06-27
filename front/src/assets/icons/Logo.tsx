import { FunctionComponent } from 'react';

type LogoProps = {
    color: string;
};

const Logo: FunctionComponent<LogoProps> = ({ color }) => {
    return (
        <svg width="20" height="24" viewBox="0 0 20 24" fill={color} xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.5"></g>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.74408 7.7073L8.92259 6.29309L13.6785 12.0002L8.92259 17.7073L7.74408 16.2931L11.3208 12.0002L7.74408 7.7073Z"
                fill={color}
            />
        </svg>
    );
};

export default Logo;
