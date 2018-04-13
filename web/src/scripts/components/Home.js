import Button from 'material-ui/Button';
import DataStore from 'flux/stores/DataStore.js'

class Home extends React.Component {
    render() {
        let pageData = DataStore.getPageBySlug('nicolas-figueira');

        return (
            <div>
                <Button variant="raised" color="primary">
                    Hello World
                </Button>

                <h2>nicolas-figueira</h2>
                <h1>{pageData.title.rendered}</h1>

                <div dangerouslySetInnerHTML={{__html: pageData.excerpt.rendered}} />
                <div>{pageData.content.rendered}</div>

            </div>           
        );
    }
}

export default Home;
