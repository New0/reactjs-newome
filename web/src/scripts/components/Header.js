import {Link} from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js';
//import AppBar from 'material-ui/AppBar';

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';

const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };

class Header extends React.Component {   
    state = {
        top: false,
        left: false,
        bottom: false,
        right: false,
      };
    
      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };
   
    render() {
        let allPages = DataStore.getAllPages();
        allPages = _.sortBy(allPages, [function(page) { return page.menu_order; }]); // Sort pages by order

        const { classes } = this.props;

        const sideList = (
          <div className={classes.list}>
             <Link to="/" style={{marginRight: '10px'}} >Home</Link>
             <Divider />
                {allPages.map((page) => {
                    if(page.slug != 'accueil'){
                        return(
                            <div>
                                <Link 
                                    key={page.id} 
                                    to={`/${page.slug}`} 
                                    style={{marginRight: '10px'}}
                                >
                                    {page.title.rendered}
                                </Link>
                                <br/>
                            </div>
                        )                     
                    }
                })}
            <Divider />
            
          </div>
        );

        return (
            <div className="header">
                <Button onClick={this.toggleDrawer('left', true)}>Open Left</Button>

                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>

               
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default  withStyles(styles)(Header);
