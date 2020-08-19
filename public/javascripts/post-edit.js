let postEditForm = document.getElementById('postEditForm')
postEditForm.addEventListener('submit', function (event) {
    let uploadingImages = document.getElementById('imageUpload').files.length
    let existingImages = document.querySelectorAll('.imageDeleteCheckbox').length
    let deletingImages = document.querySelectorAll('.imageDeleteCheckbox:checked').length
    let newTotal = existingImages + uploadingImages - deletingImages
    if(newTotal > 4) {
        event.preventDefault()
        let removalAmt = newTotal - 4
        alert(`You need to remove at least ${removalAmt} (more) image${removalAmt === 1 ? '' : 's'}`)
    }
})
