import React from 'react';
import { pageHeaderContainerStyles, pageHeaderSubtitleStyles, pageHeaderTitleStyles } from './pageHeader.styles';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
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