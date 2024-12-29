import * as EditorActionCreators from './editorActionCreators'
import * as SlideActionCreators from './slideActionCreators'
import * as ScaleActionCreators from './scaleActionCreators'
import * as ColorActionCreators from './colorActionCreators'
import * as namePresentationActionCreators from './namePresentationActionCreators'
import * as PresentationActionCreators from './presentationActionCreators'
import * as ImportExportActionCreators from './importExportActionCreators'


export default {
    ...SlideActionCreators,
    ...EditorActionCreators,
    ...PresentationActionCreators,
    ...ScaleActionCreators,
    ...ColorActionCreators,
    ...namePresentationActionCreators,
    ...ImportExportActionCreators,
}