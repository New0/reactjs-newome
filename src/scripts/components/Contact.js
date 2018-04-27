import DataStore from 'flux/stores/DataStore.js'

class Contact extends React.Component {
    render() {
        let pageData = DataStore.getPageBySlug('contact');

        return (
            <div>
                <h2>OK</h2>
                <h1>{pageData.title.rendered}</h1>

                <div dangerouslySetInnerHTML={{__html: pageData.excerpt.rendered}} />
                <div>{pageData.content.rendered}</div>
            </div>
        );
    }
}

export default Contact;
