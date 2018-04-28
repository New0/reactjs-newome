import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import DataStore from 'flux/stores/DataStore.js';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import orange from 'material-ui/colors/orange';
import red from 'material-ui/colors/red';
import grey from 'material-ui/colors/grey';

const commonOrange = orange[500];
const commonRed = red[500];
const darkRed = red[900];
const softGrey = grey[200];

const styles = theme => ({
    list: {
        width: '80vw',
    },
    redBackground: {
    backgroundColor: commonRed,
    '&:hover': {
        backgroundColor: darkRed,
    }
    },
    whiteDivider: {
        backgroundColor: 'white',
        margin: '3rem 0',
    },
    rightTitle: {
        position: 'absolute',
        top: '5%',
        right: '5%',
        color: commonRed,
        fontFamily: '"Oxygen", sans-serif',
        width: 320,
        padding: '1rem',
        fontWeight: 'bold'
    },
    container: {
        overflowX: 'hidden',
        overflowY: 'auto',
        fontFamily: '"Oxygen", sans-serif',
        width: '50vw',
        height: '100%',
        height: '100vh',
        zIndex: '-5',
        backgroundColor: commonOrange,
    },
    wrapper: {
        height: '100%',
        padding: '15% 10% 10%',
        color: 'white'
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2, 
    },
    alignCenter: {
        textAlign: 'center',
        margin: '0 auto'
    },
    rightDrawer: {
    
    },
    inRightDrawer: {
    
    }
});

class Home extends React.Component {
    state = {
        right: false
    };
    
    rightDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        let pageData = DataStore.getPageBySlug('nicolas-figueira');
        let globalData = DataStore.getAll();
        let telLink = 'tel:' + pageData.tel[0];
        let mailLink = 'mailto:' + pageData.email[0];

        const { classes } = this.props;

        const sideList = (
          <div className={classes.list}>
             <Link to="/" style={{marginRight: '10px'}} >Home</Link>
             <Divider />
             <div dangerouslySetInnerHTML={{__html: pageData.content.rendered}} />
          </div>
        );

        return (
            <div>
                <div className={classes.rightTitle}>
                    <h1>{globalData.global.name}</h1>
                </div>
                <div className={classes.container}>
                    <div className={classes.wrapper} >

                        <h2>{globalData.global.description}</h2>
                        <h3 className={classes.alignCenter}>{pageData.title.rendered}</h3>

                        <Divider className={classes.whiteDivider} />

                        <Grid container justify="center" spacing="40">
                            
                            <Grid key="0" item>
                                <Link to={telLink} target="_blank" title="Tel WordPress developer">
                                    <div dangerouslySetInnerHTML={{__html: pageData.tel[0]}} />
                                </Link>
                            </Grid>
                            <Grid key="1" item>
                                <Link to={mailLink} target="_blank" title="Mail WordPress developer">
                                    <div dangerouslySetInnerHTML={{__html: pageData.email[0]}} />
                                </Link>
                            </Grid>
                            
                        </Grid>

                        <Divider className={classes.whiteDivider} />   

                        <div className={classes.alignCenter}>

                            <Grid container justify="center" spacing="40">
                                <Grid key="0" item>
                                    <Button className={classNames(classes.paper, classes.redBackground)} onClick={this.rightDrawer('right', true)} variant="raised" color="primary">
                                        {pageData.bouton_gauche[0]}
                                    </Button>
                                </Grid>
                                <Grid key="1" item>
                                    <Button className={classNames(classes.paper, classes.redBackground)} to="/profile-etendu" variant="raised" color="primary">
                                        {pageData.bouton_droite[0]}
                                    </Button>
                                </Grid>        
                            </Grid>
     
                        </div>

                    </div>
                </div>
                

                <Drawer classes={classes.rightDrawer} anchor="right" open={this.state.right} onClose={this.rightDrawer('right', false)}>
                    <div
                        className={classes.inRightDrawer}
                        tabIndex={0}
                        role="button"
                        onClick={this.rightDrawer('right', false)}
                        onKeyDown={this.rightDrawer('right', false)}
                    >
                        {sideList}
                    </div>
                </Drawer>


            </div>           
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
