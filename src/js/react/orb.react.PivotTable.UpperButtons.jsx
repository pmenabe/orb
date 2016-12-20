/** @jsx React.DOM */

/* global module, require, React */

'use strict';

module.exports.PivotTableUpperButtons = React.createClass({
  render: function() {
    var self = this;
    var PivotButton = comps.PivotButton;
    var DropTarget = comps.DropTarget;

    var config = this.props.pivotTableComp.pgridwidget.pgrid.config;
    
    var fieldsDropTarget;
    if(config.canMoveFields) {
      var fieldsButtons = config.availablefields().map(function(field, index) {
        return <PivotButton key={field.name}
                            field={field}
                            axetype={null}
                            position={index}
                            pivotTableComp={self.props.pivotTableComp}>
               </PivotButton>;
      });
      fieldsDropTarget = <tr>
        <td className="av-flds"> 
          <DropTarget buttons={fieldsButtons} upperButtons={true} axetype={null}>
          </DropTarget>
        </td>
      </tr>;
    } else {
      fieldsDropTarget = null;
    }

    var dataButtons = config.dataFields.map(function(field, index) {
      return <PivotButton key={field.name}
                          field={field}
                          axetype={axe.Type.DATA}
                          position={index}
                          pivotTableComp={self.props.pivotTableComp}>
             </PivotButton>;
    });

    var dataDropTarget = <tr>
      <td className="empty">
        <DropTarget buttons={dataButtons} upperButtons={true} axetype={axe.Type.DATA}>
        </DropTarget>
      </td>
    </tr>;

    return <table className="inner-table upper-buttons">
        <tbody>
          <tr>
            <td className="flds-grp-cap">
              <div>Unused fields</div>
            </td>
          </tr>
          {fieldsDropTarget}
          <tr>
            <td className="flds-grp-cap">
              <div>Data fields</div>
            </td>
          </tr>
          {dataDropTarget}
        </tbody>
    </table>;
  }
});