import React from 'react';
import { pageHeaderContainerStyles, pageHeaderSubtitleStyles, pageHeaderTitleStyles } from './pageHeader.styles';

/**
 * Props for the PageHeader component
 */
interface PageHeaderProps {
  /**
   * The main title to display in the header
   */
  title: string;

  /**
   * An optional subtitle to display below the title
   */
  subtitle?: string;

  /**
   * @returns Callback function when subtitle is clicked (if provided, subtitle is clickable)
   */
  onSubtitleClick?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, onSubtitleClick }) => (
  <header className='page-header' style={pageHeaderContainerStyles}>
    <div style={{...pageHeaderTitleStyles}}>{title}</div>
    {subtitle && (
      <div
      onClick={onSubtitleClick}
      style={{...pageHeaderSubtitleStyles, ...(onSubtitleClick? {textDecoration: 'underline', cursor: 'pointer'} : {})}}>
        {subtitle}
      </div>
    )}
  </header>
);

export default PageHeader;