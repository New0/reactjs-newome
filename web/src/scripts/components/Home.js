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
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2, 
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

        const { classes } = this.props;

        const sideList = (
          <div className={classes.list}>
             <Link to="/" style={{marginRight: '10px'}} >Home</Link>
             <Divider />
             <p>{pageData.content.rendered}</p>
          </div>
        );

        return (
            <div>
                <div className={classes.container}>
                    <div className={classes.wrapper} >

                        <h1>{globalData.global.name}</h1>

                        <Paper className={classes.paper}>
                            <Grid container wrap="nowrap" spacing={16}>
                                <Grid item>
                                <Avatar>W</Avatar>
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                <div wrap="nowrap">
                                    <h1>{pageData.title.rendered}</h1>
                                    <div dangerouslySetInnerHTML={{__html: pageData.excerpt.rendered}} />
                                </div>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Button className={classNames(classes.paper, classes.redBackground)} onClick={this.rightDrawer('right', true)} variant="raised" color="primary">
                            Introduction
                        </Button>
                        <Button className={classNames(classes.paper, classes.redBackground)} to="/profile-etendu" variant="raised" color="primary">
                            Profil étendu
                        </Button>

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
