import DataStore from 'flux/stores/DataStore.js'

class BoutonStripe extends React.Component {
    render() {
        let pageData = DataStore.getPageBySlug('bouton-de-paiement-stripe-wordpress');

        return (
            
            <div>
                <h2>Stripe</h2>
                <h1>{pageData.title.rendered}</h1>

                <div dangerouslySetInnerHTML={{__html: pageData.excerpt.rendered}} />
                <div>{pageData.content.rendered}</div>
            </div>
        );
    }
}

export default BoutonStripe;
