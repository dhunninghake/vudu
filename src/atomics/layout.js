export const buildLayout = () => {
  const layoutClasses = {};

  layoutClasses['table']          = { display: 'table', width: '100%' };
  layoutClasses['table-cell']     = { display: 'table-cell', verticalAlign: 'middle' };
  layoutClasses['table-row']      = { display: 'table-row' };
  layoutClasses['inline']         = { display: 'inline' };
  layoutClasses['block']          = { display: 'block' };
  layoutClasses['inlineBlock']    = { display: 'inline-block' };
  layoutClasses['alignTop']       = { verticalAlign: 'top' };
  layoutClasses['alignMiddle']    = { verticalAlign: 'middle' };
  layoutClasses['alignBottom']    = { verticalAlign: 'bottom' };
  layoutClasses['alignBaseline']  = { verticalAlign: 'baseline' };

  layoutClasses['overflowHidden'] = { overflow: 'hidden' };
  layoutClasses['overflowAuto']   = { overflow: 'auto' };
  layoutClasses['overflowScroll'] = { overflow: 'scroll' };

  layoutClasses['right']          = { float: 'right' };
  layoutClasses['left']           = { float: 'left' };

  layoutClasses['clearfix'] = {
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

  return layoutClasses;
};

