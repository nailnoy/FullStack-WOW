import React from 'react';
import { Link } from 'react-router-dom';
import { Title } from 'bloomer/lib/elements/Title';
import { Subtitle } from 'bloomer/lib/elements/Subtitle';
import { Tile } from 'bloomer/lib/grid/Tile';
import { Box } from 'bloomer/lib/elements/Box';
import Request from '../../helpers/Request';


const ArticlePreview = ({articles}) => {

    function handlearticleViews (thisArticle) {
        const views = thisArticle.views + 1;
         const request = new Request();
         request.patch(`/articles/${thisArticle.id}`, {
             views: views
         })
    }
   
    const articlePreviews = articles.map((article) => {
   
        return <Tile isParent size={6} style={{minWidth: 300}} key={article.title}>
        <Tile isChild  size={12} style={{ color: '#6B9080'}} key={article.id} render= {
            props => (
                <Box {...props}>
                    <Title style={{color: '#6B9080'}}>
                        {article.title} 
                    </Title>
                    <Subtitle style={{color:'#628375'}}> 
                        {article.lead}
                    </Subtitle>
                        Author: {article.user.name}
                    <p>
                        Tag: {article.tag} <br></br>
                        Views: {article.views}
                    </p>
                    <Link onClick={() => handlearticleViews(article)} to={{
                        pathname: `/articles/${article.id}`,
                        state: {
                        article: {article}
                        }
                    }}>Read More </Link>
                  </Box>
                )
        }>
            </Tile>
        </Tile>
     })

    return(
        <React.Fragment>
           {articlePreviews}
        </React.Fragment>
    )
}

export default ArticlePreview;