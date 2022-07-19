import React from 'react';
import './Article.css';
import HomeNavBar from './HomeNavBar';
import { Container } from 'bloomer/lib/layout/Container';
import { Title } from 'bloomer/lib/elements/Title';
import { Subtitle } from 'bloomer/lib/elements/Subtitle';
import { Section } from 'bloomer/lib/layout/Section';

const Article = (props) => {

    const thisArticle = props.location.state.article.article;

    const splitPara = thisArticle.body.split('\n').map((item, key) => {
        return <React.Fragment key={key}>{item}<br/><br/></React.Fragment>
    })
    return (
        <div>
        {/* <HomeNavBar/> */}
            <Container>
                <Section>

                    <Title style={{marginTop: 5}}>
                        <h2>{thisArticle.title}</h2>
                    </Title>

                    <Subtitle>
                        <h3>{thisArticle.lead}</h3>
                    </Subtitle>

                        <h4>{thisArticle.user.name}</h4>
                        <h4>{thisArticle.tag}</h4>

                    <Section>
                        <p className = "article-body">{splitPara}</p>
                    </Section>

                </Section>
            </Container>
        </div>

    )

}

export default Article;