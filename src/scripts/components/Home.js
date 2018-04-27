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
        overflow: 'hidden',
        fontFamily: '"Oxygen", sans-serif',
        float: 'left',
        width: '50vw',
        height: '100vh'
    },
    wrapper: {
        backgroundColor: commonOrange,
        height: '100vh',
        padding: '10% 0 0 10%',
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
console.log(pageData);
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

                        <h2 className={classes.alignCenter}>{pageData.title.rendered}</h2>
                        <div dangerouslySetInnerHTML={{__html: pageData.intro[0]}} />
                        <div dangerouslySetInnerHTML={{__html: pageData.tel[0]}} />
                        <div dangerouslySetInnerHTML={{__html: pageData.email[0]}} />
                                
                        <div>
                            <Button className={classNames(classes.paper, classes.redBackground)} onClick={this.rightDrawer('right', true)} variant="raised" color="primary">
                                {pageData.bouton_gauche[0]}
                            </Button>
                            <Button className={classNames(classes.paper, classes.redBackground)} to="/profile-etendu" variant="raised" color="primary">
                                {pageData.bouton_droite[0]}
                            </Button>
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
