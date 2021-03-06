import {render}             from 'react-dom';
import DataActions          from '../flux/actions/DataActions.js';

import Home                 from 'components/Home.js';
import About                from 'components/About.js';
import Contact              from 'components/Contact.js';
import Exemple              from 'components/Exemple.js';
import BoutonStripe         from 'components/BoutonStripe.js';
import Articles             from 'components/Articles.js';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

class Content extends React.Component {

    templates = {
        'about': About,
        'contact': Contact,
        'page-d-exemple': Exemple,
        'bouton-de-paiement-stripe-wordpress': BoutonStripe,
        'articles': Articles
    }

    buildRoutes(data){
        return data.pages.map((page, i) => {
            return(
                <Route
                    key={i}
                    component={this.templates[page.slug]}
                    path={`/${page.slug}`}
                    exact
                /> 
            )
        })     
    }
 
    render() {

        return (
            
            DataActions.getPages((response)=>{
            
                <Router>
                    <div>
                        <Switch>
                            <Route path="/" component={ Home } exact />
                            {this.buildRoutes(response)}
                            <Route render={() => { return <Redirect to="/" /> }} />
                        </Switch> 
                    </div>
                </Router>

            })
        );
        
    }
}
export default Content;