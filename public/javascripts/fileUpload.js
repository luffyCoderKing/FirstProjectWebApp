const rootStyles = window.getComputedStyle(document.documentElement) //this will get all the styles from the root element of our document which will be all the styles in the root tag in the main.css

if(rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') !=""){
    ready();
}else{
    document.getElementById('main-css').addEventListener('load', ready)
}

function ready(){
    const coverWidth = parseFloat (rootStyles.getPropertyValue('--book-cover-width-large'));
    const coverAspectRatio = parseFloat (rootStyles.getPropertyValue('--book-cover-aspect-ratio'));
    const coverHeight = coverWidth / coverAspectRatio;

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    );        
    
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspectRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight
    })
    
    FilePond.parse(document.body);
}