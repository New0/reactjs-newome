import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Button from 'material-ui/Button';
import DataStore from 'flux/stores/DataStore.js';
import orange from 'material-ui/colors/orange';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';

const primary = orange[500]; // #FF9800

const styles = theme => ({
    list: {
      width: 350,
    },
    root: {
        overflow: 'hidden',
        padding: `0 ${theme.spacing.unit * 3}px`,
    },
    wrapper: {
        maxWidth: 400,
    },
    paper: {
        margin: theme.spacing.unit,
        padding: theme.spacing.unit * 2,
    },
    rightDrawer: {
        width: "80%",
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
                <div className={classes.root}>
                    <div className={classes.wrapper}>

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

                        <Button className={classes.paper} onClick={this.rightDrawer('right', true)} variant="raised" color="primary">
                            Introduction
                        </Button>
                        <Button className={classes.paper} to="/profile-etendu" variant="raised" color="primary">
                            Profil étendu
                        </Button>

                    </div>
                </div>
                

                  <Drawer classes={classes.rightDrawer} anchor="right" open={this.state.right} onClose={this.rightDrawer('right', false)}>
                    <div
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
