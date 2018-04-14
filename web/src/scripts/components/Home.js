import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import DataStore from 'flux/stores/DataStore.js';
import orange from 'material-ui/colors/orange';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';

const primary = orange[500]; // #FF9800

const styles = {
    list: {
      width: 350,
    }
};

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
                <Button onClick={this.rightDrawer('right', true)} variant="raised" color="primary">
                    Introduction
                </Button>
                <Button variant="raised" color="primary">
                    <Link to="/profile-etendu" style={{marginRight: '10px'}} >Profil étendu</Link>
                </Button>

                <h2>nicolas-figueira</h2>
                <h1>{pageData.title.rendered}</h1>

                <div dangerouslySetInnerHTML={{__html: pageData.excerpt.rendered}} />
                <div>{pageData.content.rendered}</div>


                  <Drawer anchor="right" open={this.state.right} onClose={this.rightDrawer('right', false)}>
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
