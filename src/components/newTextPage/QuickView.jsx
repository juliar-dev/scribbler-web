import React from "react";
import { withStyles, Button, Input } from "@material-ui/core";
import styles from './newTextPage-Styles/quickView';

import ReactListInput from 'react-list-input'

import AddIcon from '@material-ui/icons/Add';
import OpenWithIcon from '@material-ui/icons/OpenWith';
import DeleteIcon from '@material-ui/icons/Delete';

// const { classes, chapters, setSelectedChapter, title } = this.props;
let selectedChapterSetter;

const CustomInput = ({ value, onChange, type, onClick }) => 
        <Input type={type} value={value} onChange={e => onChange(e.target.value)} onClick={() => selectedChapterSetter(value)} />

class QuickView extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            value: [...this.props.chapters]
        }
    }

    componentDidMount() {
        selectedChapterSetter = this.props.setSelectedChapter;
    }

    Item ({decorateHandle, removable, onChange, onRemove, value, onClick}) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto', gridTemplateRows: '50px', gridRow: '1 / 1' }}>
                <CustomInput value={value} onChange={onChange} onBlur={selectedChapterSetter(value)} onClick={onClick} />
                {decorateHandle(<span style={{cursor: 'move'}}><OpenWithIcon /></span>)}
                <span
                    onClick={removable ? onRemove : x => x}
                    style={{
                        cursor: removable ? 'pointer' : 'not-allowed',
                    }}><DeleteIcon /></span>
            </div>
        )
    }

    StagingItem ({value, onAdd, canAdd, add, onChange}) {
        return (
            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', gridTemplateRows: '50px', gridRow: '2 / 2' }}>
                <CustomInput value={value} onChange={onChange} />
                <span
                    onClick={canAdd ? onAdd : undefined}
                    style={{
                        color: canAdd ? 'white' : 'gray',
                        cursor: canAdd ? 'pointer' : 'not-allowed'
                    }}><AddIcon /></span>
            </div>
        )
    }

    render() {
        const { value } = this.state
        const { classes, chapters, setSelectedChapter, title } = this.props;

        return (
            <div className={classes.container}>
                <div className={classes.content}>
                    <div className={classes.main}>
                        { title !== '' ? <p className={classes.title}>{title}</p> : <p className={classes.title}>Title</p> }
                        <ul className={classes.chapterList}>  
                            <ReactListInput
                                initialStagingValue=''
                                onChange={value => this.setState({value})}
                                // maxItems={}
                                // minItems={}
                                ItemComponent={this.Item}
                                StagingComponent={this.StagingItem}
                                value={this.state.value}
                            />
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(QuickView);