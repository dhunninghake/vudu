export const buildTypography = () => {
  const typography = {};

  typography['h0'] = { fontSize: '4rem' };
  typography['h1'] = { fontSize: '2rem' };
  typography['h2'] = { fontSize: '1.5rem' };
  typography['h3'] = { fontSize: '1.25rem' };
  typography['h4'] = { fontSize: '1rem' };
  typography['h5'] = { fontSize: '0.875rem' };
  typography['h6'] = { fontSize: '0.75rem' };

  typography['bold'] = { fontWeight: 'bold' };
  typography['normal'] = { fontWeight: 'normal' };
  typography['italic'] = { fontStyle: 'italic' };
  typography['caps'] = { textTransform: 'uppercase' };
  typography['center'] = { textAlign: 'center' };
  typography['leftAlign'] = { textAlign: 'left' };
  typography['rightAlign'] = { textAlign: 'right' };
  typography['justify'] = { textAlign: 'justify' };
  typography['noWrap'] = { whiteSpace: 'nowrap' };
  typography['underline'] = { textDecoration: 'underline' };
  typography['noUnderline'] = { textDecoration: 'none' };
  typography['trackedOut'] = { letterSpacing: '0.1em' };
  typography['listReset'] = { listStyle: 'none', paddingLeft: '0px' };

  return typography;
};
