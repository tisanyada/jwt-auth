


module.exports = {
    imageUpload: (image) => {
        if (image){
            if (image.mimetype === 'image/jpg' || image.mimetype === 'image/jpeg' || image.mimetype === 'image/png') return true
        }
    },
    imageUpdate: (image)=>{
        if(!image){
            return false;
        }else if (image.mimetype === 'image/jpg' || image.mimetype === 'image/jpeg' || image.mimetype === 'image/png'){
            return true
        }
    }
}