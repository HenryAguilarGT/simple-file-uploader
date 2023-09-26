document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('uploaded-files');

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        for (const file of files) {
            if (isAllowedFileType(file)) {
                uploadFile(file);
            } else {
                alert(`File type not allowed: ${file.name}`);
            }
        }
    }

    function isAllowedFileType(file) {
        const allowedTypes = ['text/plain', 'application/msword', 'application/pdf'];
        return allowedTypes.includes(file.type);
    }

    function uploadFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        fetch('upload.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            const listItem = document.createElement('li');
            listItem.textContent = data.message;
            fileList.appendChild(listItem);
        })
        .catch(error => console.error('Error:', error));
    }
});
