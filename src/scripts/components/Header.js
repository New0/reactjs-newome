import {Link} from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

const commonOrange = orange[500];
const comonRed = red[500];
const darkRed = red[900];
const softGrey = grey[200];

const styles = theme => ({
    header: {
        float: 'left',
        width: '100px',
        height: '100vh',
        backgroundColor: 'white',
    },
    redBackground: {
        backgroundColor: comonRed,
    },
    redBackgroundIcon: {
        backgroundColor: comonRed,
        '&:hover': {
            backgroundColor: darkRed,
        },
        '&:focus': {
            backgroundColor: darkRed,
        },
    },
    whiteBackgroundIcon: {
        backgroundColor: 'white',
        '&:hover': {
            backgroundColor: softGrey,
        },
        '&:focus': {
            backgroundColor: softGrey,
        },
    },
    iconsLeft: {
        width: '100px',
        height: '100px',
        color: 'white',
        display: 'flex',
        '&:hover': {
            iconChange: {
                fill: 'white',
            }
        }
    },
    icon: {
        width: '100%',
        height: '100%',
        fontSize: '56px'
    },
    iconChange: {
        fill: softGrey,
        width: '68px',
        height: '68px',
        
        '&:hover': {
            fill: 'white',
        },
        '&:focus': {
            fill: 'white',
        },
    },
    list: {
      width: 350,
      marginTop: '3rem',
      textAlign: 'right'
    },
    link: {
        display: 'block',
        color: 'white',
        fontSize: '1.5rem',
        fontFamily: '"Montserrat", sans-serif',
        fontWeight: 'bold',
        textDecoration: 'none',
        padding: '1rem 0.5rem',
        '&:hover': {
            backgroundColor: darkRed,

            iconChange: {
                fill: 'white',
            }
        },
        '&:focus': {
            backgroundColor: darkRed,
        },
    },
    sideBack: {
        height: '100vh',
    },
    notice: {
        position: 'absolute',
        top: '0',
        left: '25%',
        padding: '1rem',
        backgroundColor: 'white',
        color: 'black',
        fontFamily: '"Oxygen", sans-serif',
        textAlign: 'center',
    }
});

class Header extends React.Component {   
    state = {
        left: false
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
                <div>
                    <Link to="/" className={classes.link} >Accueil</Link>
                </div>
            
                {allPages.map((page) => {
                    if(
                        page.slug === 'accueil' || 
                        page.slug === 'articles' ||
                        page.slug === 'profil-webmaster-wordpress' ||
                        page.slug === 'bouton-de-paiement-stripe-wordpress'
                        ){
                        return(
                            <div>
                                <Link 
                                    className={classes.link}
                                    key={page.id} 
                                    to={`/${page.slug}`} 
                                >
                                    {page.title.rendered}
                                </Link>
                                <br/>
                            </div>
                        )                     
                    }
                })}
            
            </div>
        );

        return (
            <div className={classes.header}>
                <div className={classes.notice}>
                    WIP: This is a React Js App using WordPress content, as a headless CMS.
                    <br />
                    Orginal website at <Link style={{ color: 'black'}} to="https://newo.me" title="Web WordPress developer Newo.me" target="_blank">https://newo.me</Link>
                </div>
                <Button 
                onClick={this.toggleDrawer('left', true)}
                className={classNames(classes.redBackgroundIcon, classes.iconsLeft)}
                >
                <Icon className={classes.icon}>menu</Icon>
                </Button>
                <Link to="/"
                    className={classNames(classes.whiteBackgroundIcon, classes.iconsLeft)}
                >
                    <svg width="100%" height="100%" viewBox="0 0 25 25">
                        <path className={classes.iconChange} d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
                    </svg>
                </Link>
                <Divider />
                <Link to="/"
                    className={classNames(classes.whiteBackgroundIcon, classes.iconsLeft)}
                >
                    <svg width="100%" height="100%" viewBox="0 0 25 25">
                        <path className={classes.iconChange} d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
                    </svg>
                </Link>
                <Divider />

                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                    <div
                        className={classNames(classes.sideBack, classes.redBackground)}
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