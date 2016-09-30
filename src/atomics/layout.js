export const buildLayout = () => {
  const layout = {};

  layout['table']          = { display: 'table', width: '100%' };
  layout['table-cell']     = { display: 'table-cell', verticalAlign: 'middle' };
  layout['table-row']      = { display: 'table-row' };
  layout['inline']         = { display: 'inline' };
  layout['block']          = { display: 'block' };
  layout['inlineBlock']    = { display: 'inline-block' };
  layout['alignTop']       = { verticalAlign: 'top' };
  layout['alignMiddle']    = { verticalAlign: 'middle' };
  layout['alignBottom']    = { verticalAlign: 'bottom' };
  layout['alignBaseline']  = { verticalAlign: 'baseline' };

  layout['overflowHidden'] = { overflow: 'hidden' };
  layout['overflowAuto']   = { overflow: 'auto' };
  layout['overflowScroll'] = { overflow: 'scroll' };

  layout['right']          = { float: 'right' };
  layout['left']           = { float: 'left' };

  layout['clearfix'] = {
    ':before': {
      content: '" "', 
      display: 'table'
    },
    ':after': { 
      content: '" "',
      display: 'table',
      clear: 'both'
    }
  };

  return layout;
};

