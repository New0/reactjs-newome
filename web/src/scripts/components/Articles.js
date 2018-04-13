import {Link} from 'react-router-dom';
import DataStore from 'flux/stores/DataStore.js'

class Articles extends React.Component {
    render() {
        let allPosts = DataStore.getAllPosts();
        
        return (
            <div>
                {allPosts.map((post) => {
                    return(
                        <div>
                            <Link 
                                key={post.id} 
                                to={`/${post.slug}`} 
                                style={{marginRight: '10px'}}
                            >
                                {post.title.rendered}
                            </Link>
                            <br />
                        </div>
                    ) 
                })}
            </div>
        );
    }
}

export default Articles;
