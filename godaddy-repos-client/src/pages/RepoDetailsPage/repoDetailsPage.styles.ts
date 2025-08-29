import { Colour, FontSize } from "../../assets";

export const repoDetailsPageContainerStyles: React.CSSProperties = {
  flexDirection: 'row',
  display: 'flex',
  margin: '1rem',
  padding: '0.5rem',
  border: `1px solid ${Colour.borderLightGrey}`,
  borderRadius: 8,
  overflowWrap: 'break-word',
};

export const repoDetailsLeftPanelStyles: React.CSSProperties = {
  flex: 2,
  maxWidth: 300,
  paddingRight: '1rem',
  borderRight: `1px solid ${Colour.borderLightGrey}`,
  fontSize: FontSize.medium,
}

export const repoDetailsRightPanelStyles: React.CSSProperties = {
  flex: 1,
  paddingLeft: '2rem',
  paddingRight: '1rem',
  textAlign: 'left',
  fontSize: FontSize.small,
  lineHeight: FontSize.small,
}