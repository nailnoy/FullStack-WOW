import React, {Component, Fragment} from 'react';
import { Field } from 'bloomer/lib/elements/Form/Field/Field';
import { Control } from 'bloomer/lib/elements/Form/Control';
import { Select } from 'bloomer/lib/elements/Form/Select';
import { Button } from 'bloomer/lib/elements/Button';
import { Section } from 'bloomer/lib/layout/Section';

class ArticleFilter extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filterName: 'all',
            filterTag: 'all',
            filterByViews: 'all'
        };
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleSubmitFilter = this.handleSubmitFilter.bind(this);
        this.handleViewFilter = this.handleViewFilter.bind(this);
    }

    handleUserChange(event) {
        this.setState({filterName: event.target.value}) 
    }

    handleTagChange(event) {
        this.setState({filterTag: event.target.value})
    }

    handleViewFilter(event) {
        this.setState({filterByViews: event.target.value})
    }

    handleSubmitFilter(event) {
        event.preventDefault();
        this.props.onFilter(this.state.filterName, this.state.filterTag, this.state.filterByViews);   
    }

     render () {
     
            const userOptions = this.props.userNames.map((name, index) => {
                const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1); 
                return <option select= "user-name-option" key={index} value={name} >{uppercaseName}</option>
            })
        
            const tagOptions = this.props.tags.map((tag, index) => {
                const uppercaseTag = tag.charAt(0).toUpperCase() + tag.slice(1); 
                return <option key = {index} value={tag}>{uppercaseTag}</option>
            })
    return (

        <Fragment>
            <Section>
                <form id="filter-form" onSubmit = {this.handleSubmitFilter}>
                    <Field>
                        <Control>
                        <Select name="user-name-option"  value = {this.state.filterName} onChange = {this.handleUserChange}>
                            <option value="all">All Users</option>
                            {userOptions}
                        </Select>
                        <Select style={{marginLeft: 5}}id="tag-option" onChange = {this.handleTagChange}>
                            <option value = "all">All Tags</option>
                            {tagOptions}
                        </Select>
                        <Select style={{marginLeft: 5}}id="tag-option" onChange = {this.handleViewFilter}>
                            <option value = "all">All</option>
                            <option value = "high">Most Popular</option>
                            <option value = "low">Most Obscure</option>
                        </Select>
                        <Button style={{backgroundColor: '#A4C3B2', marginLeft: 5}}type="submit" form="filter-form" >Filter</Button> 
                        </Control>
                    </Field>
                </form>
            </Section>
        </Fragment>

       )
    }
}

export default ArticleFilter;