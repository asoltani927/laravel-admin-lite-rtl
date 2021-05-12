<template>
    <div class="row">
        <div class="col-12">
            <div ref="fileBox" class="form-group pointer dashed position-relative media-box"
                 @click="chooseFile($event)">
                <div class="text-center text-muted ln-1 py-3">
                    <div class="text-center text-white-75 fs-20x">
                        <!--<icon icon="cloud-upload-alt"></icon>-->
                    </div>
                    <div class="text-center" size="18">
                        {{ (file.name) ? file.name : 'Upload ' + (typeText) }}
                    </div>
                    <div class="text-center text-purple">Choose File</div>
                </div>
                <input type="file" ref="inputFile" @change="handleFileChange" class="d-none"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "MediaUploader",

    props: {
        typeText: {type: String, default: 'Photo'},
        dataIndex: {type: Number, default: 0},
    },

    data() {
        return {
            dragAndDropCapable: false,
            file: {}
        }
    },

    mounted() {
        this.dragAndDropCapable = this.determineDragAndDropCapable()
        if (this.dragAndDropCapable) {
            ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'].forEach((evt) => {
                this.$refs.fileBox.addEventListener(evt, function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                }, false)
            })
            this.$refs.fileBox.addEventListener('drop', (e) => {
                for (let i = 0; i < e.dataTransfer.files.length; i++) {
                    this.createFile(e.dataTransfer.files[i])
                }
            })
        }
    },

    methods: {
        determineDragAndDropCapable() {
            const div = document.createElement('div')
            return (('draggable' in div) ||
                ('ondragstart' in div && 'ondrop' in div)) &&
                'FormData' in window &&
                'FileReader' in window
        },

        handleFileChange(e) {
            const files = e.target.files || e.dataTransfer.files
            if (!files.length) {
                return
            }
            this.createFile(files[0])
        },

        createFile(file) {
            const reader = new FileReader()
            this.file = file;
            reader.onload = (e) => {
                this.$emit('dragdrop', {
                    index: this.dataIndex,
                    info: file,
                    data: e.target.result
                })
            }
            reader.readAsDataURL(file)
        },

        chooseFile: function () {
            this.$refs.inputFile.click()
        },

        reload() {
            this.file = {}
        }
    }
}
</script>

<style scoped>


.media-box {
    background-color: #fff;
    color: #9a9a9a;
    border: 1px dashed #eeeeee;
    border-radius: 15px;
    font-size: 0.7rem;
}

.pointer {
    cursor: pointer;
}
</style>
