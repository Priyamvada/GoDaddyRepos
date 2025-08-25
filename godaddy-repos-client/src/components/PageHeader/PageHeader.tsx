import React from 'react';
import { pageHeaderContainerStyles, pageHeaderSubtitleStyles, pageHeaderTitleStyles } from './pageHeader.styles';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
  styles?: React.CSSProperties;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, className, styles }) => (
  <header className={className || 'page-header'} style={{ ...styles, ...pageHeaderContainerStyles }}>
    <div style={{...pageHeaderTitleStyles}}>{title}</div>
    {subtitle && <div style={{...pageHeaderSubtitleStyles}}>{subtitle}</div>}
  </header>
);

export default PageHeader;