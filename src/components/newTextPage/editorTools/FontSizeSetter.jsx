import React, {useState} from 'react'

import styles from '../newTextPage-Styles/textEditorStyles';

import { Button, withStyles } from "@material-ui/core";

function FontSizeSetter(props) {
    const { classes, editorState, setEditorState, styles } = props;

    const [ isShowingFontSizeMenu, setIsShowingFontSizeMenu  ] = useState(false);

    const fontSizes = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 38, 46, 54, 62, 72];
    const [ currentFontSize, setCurrentFontSize ] = useState('16')

    function conditionallyRenderDropdown(e) {
        e.preventDefault();
        setIsShowingFontSizeMenu(!isShowingFontSizeMenu);
    }

    function setFontSize(e, value) {
        e.preventDefault();
        setCurrentFontSize(value.substring(0, 2));
        const newEditorState = styles.fontSize.remove(editorState);
        setEditorState(styles.fontSize.add(newEditorState, value));
        setIsShowingFontSizeMenu(false);

    }

    return (
        <div className={classes.fontSizeDropdown} styles={styles}>
            <Button onMouseDown={(e) => conditionallyRenderDropdown(e)}> 
                {currentFontSize} | v
            </Button>
            <div className={classes.fontSizeMenu}>
                {isShowingFontSizeMenu && fontSizes.map(size => {
                    return <div className={classes.fontSizeOption} key={`font-size-${size}`} onMouseDown={e => setFontSize(e, `${size}px`)}>
                                {size.toString()}
                            </div>
                })}
            </div>
        </div>
    )
}

export default withStyles(styles)(FontSizeSetter);