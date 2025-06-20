import React from 'react';
import { Link } from 'react-router-dom';

interface LogoDisplayProps {
  /**
   * Optional additional CSS classes for the main Link wrapper element.
   */
  className?: string;
  /**
   * The source URL for the logo image.
   * Defaults to a placeholder image.
   * Example: "/assets/logo.svg"
   */
  logoSrc?: string;
  /**
   * Alt text for the logo image, for accessibility.
   * Defaults to "Application Logo".
   */
  altText?: string;
  /**
   * The navigation path for the link when the logo is clicked.
   * Defaults to "/".
   */
  homePath?: string;
  /**
   * Tailwind CSS classes to control the size of the image.
   * Example: "h-10 w-auto" or "h-12 w-32".
   * Defaults to "h-10 w-auto".
   */
  imgSizeClassName?: string;
}

const LogoDisplay: React.FC<LogoDisplayProps> = ({
  className = '',
  logoSrc = 'https://via.placeholder.com/150x40?text=AppLogo', // Default placeholder
  altText = 'Application Logo',
  homePath = '/',
  imgSizeClassName = 'h-10 w-auto', // Default: 40px height, auto width
}) => {
  console.log('LogoDisplay loaded');

  return (
    <Link to={homePath} className={`inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm ${className}`} aria-label={altText || 'Go to homepage'}>
      <img
        src={logoSrc}
        alt={altText}
        className={`${imgSizeClassName} object-contain`} // object-contain to ensure logo aspect ratio is maintained
      />
    </Link>
  );
};

export default LogoDisplay;