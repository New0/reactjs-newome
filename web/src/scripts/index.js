import {render}             from 'react-dom';
import DataActions          from 'flux/actions/DataActions.js';

import Home                 from 'components/Home.js';
import About                from 'components/About.js';
import Header               from 'components/Header.js';
import BoutonStripe         from 'components/BoutonStripe.js';
import Articles             from 'components/Articles.js';

import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';

import CssBaseline from 'material-ui/CssBaseline';

class AppInitializer {

    templates = {
        'about': About,
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

    run() {
        DataActions.getPages((response)=>{
            render(
                    
                <Router>
                    <div>
                        <CssBaseline />
                        <Header />

                        <Switch>
                            <Route path="/" component={ Home } exact />

                            {this.buildRoutes(response)}
                            <Route render={() => { return <Redirect to="/" /> }} />
                        </Switch> 
                    </div>
                </Router>

                , document.getElementById('app')
            );
        });
    }
}

new AppInitializer().run();
