import * as React from "react";
import { Colour, FontSize, FontWeight } from "../../assets";

export const pageHeaderContainerStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  paddingBottom: '16px',
  position: 'sticky',
  zIndex: 10,
  width: '100%',
  backgroundColor: Colour.backgroundDarkGrey,
  top: 0,
};

export const pageHeaderTitleStyles: React.CSSProperties = {
  fontSize: FontSize.xlarge,
  lineHeight: FontSize.xxlarge,
  fontWeight: FontWeight.bold,
  color: Colour.textWhite,
  margin: '16px 0 4px 0',
};

export const pageHeaderSubtitleStyles: React.CSSProperties = {
  fontSize: FontSize.medium,
  lineHeight: FontSize.xlarge,
  marginTop: '4px',
  color: Colour.textLightGrey,
};