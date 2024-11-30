import * as EditorActionCreators from './editorActionCreators'
import * as SlideActionCreators from './slideActionCreators'
import * as ScaleActionCreators from './scaleActionCreators'
import * as ColorActionCreators from './colorActionCreators'
import * as namePresentationActionCreators from './namePresentationActionCreators'


export default {
    ...SlideActionCreators,
    ...EditorActionCreators,
    ...ScaleActionCreators,
    ...ColorActionCreators,
    ...namePresentationActionCreators,
}