import React from 'react';

var _React = React;
var createClass = _React.createClass;

const styles = {
  inputWrapper: 'input-wrapper',
  inputCover: 'input-cover',
  helpText: 'help-text',
  fileName: 'file-name',
  fileNameStretch: 'file-name spacer',
  fileExt: 'file-ext',
  fileDrag: 'file-drag',
  input: 'input',
  loader: 'loader',
  disabled: 'disabled',
  loading: 'loading',
  loaderItem: 'loader-item',
  spacer: 'spacer',
  button: 'button',
  hover: 'hover',
  imagePreview: 'image-preview',
  preview: 'preview',
  previewItem: 'preview-item',
  previews: 'previews'
};

const uploadFileToServer = (file) => {
  const delay = file.size / 100;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

const getExtFromType = (type) => {
  const parts = type.split('/');
  return parts[parts.length - 1];
};
const getExtFromName = (name) => {
  const parts = name.split('.');
  return parts[parts.length - 1];
};

const Loader = () => {
  return <div className={styles.loader}>
    <span className={styles.loaderItem} />
    <span className={styles.loaderItem} />
    <span className={styles.loaderItem} />
  </div>
}

const FilePreview = createClass({
  getInitialState() {
    return {
      loading: true
    }
  },
  getDefaultProps() {
    return {
      onRemove: () => { }
    }
  },
  componentWillMount() {
    this.loadData();
  },
  componentWillReceiveProps(newProps) {
    this.loadData(newProps.data)
  },
  loadData(data = this.props.data) {
    if (!data) {
      return;
    }
    const reader = new FileReader();
    // const type = do {
    //   if (data.type.match('text')) {
    //     'text'
    //   } else if (data.type.match('image')) {
    //     'image'
    //   } else {
    //     data.type
    //   }
    // }

    var type = data.type.match('text') ? 'text' : data.type.match('image') ? 'image' : data.type;

    reader.onload = (e) => {
      const src = e.target.result;
      this.setState({
        src,
        type,
        loading: false
      });
    }
    if (type === 'text') {
      reader.readAsText(data);

    } else if (type === 'image') {
      reader.readAsDataURL(data);
    } else {
      this.setState({
        src: false,
        type,
        loading: false
      });
    }
  },
  render() {
    var loading = this.state.loading ? 'loading data...' : null;
    // const loading = do {
    //   if (this.state.loading) {
    //     'loading data...'
    //   } else {
    //     null
    //   }
    // }
    var uploading = this.props.data.loading ? React.createElement(Loader, null) : null;
    // const uploading = do {
    //   if (this.props.data.loading) {
    //     <Loader />
    //   } else {
    //     null
    //   }
    // }
    // const preview = do {
    //   if (!this.state.loading && !this.props.data.loading) {
    //     if (this.state.type === 'text') {
    //       <pre className={styles.preview}>{this.state.src}</pre>
    //     } else if (this.state.type === 'image') {
    //       <img alt='preview' src={this.state.src} className={styles.imagePreview} />
    //     } else {
    //       <pre className={styles.preview}>no preview</pre>
    //     }
    //   } else {
    //     null
    //   }
    // }
    // const classes = [
    //   styles.previewItem,
    //   this.props.data.loading ? styles.disabled : ''
    // ].join(' ').trim()

    var preview = !this.state.loading && !this.props.data.loading ? this.state.type === 'text' ? React.createElement(
      'pre',
      { className: styles.preview },
      this.state.src
    ) : this.state.type === 'image' ? React.createElement('img', { alt: 'preview', src: this.state.src, className: styles.imagePreview }) : React.createElement(
      'pre',
      { className: styles.preview },
      'no preview'
    ) : null;
    var classes = [styles.previewItem, this.props.data.loading ? styles.disabled : ''].join(' ').trim();


    return (
      <div className={classes}>
        {uploading}
        {loading}
        {preview}
        <div className={styles.fileNameStretch}>{this.props.data.name}</div>
        <button className={styles.button}
          onClick={this.props.onRemove}>
          remove
        </button>
        <button className={styles.button}
          onClick={this.props.onUpload}>
          upload
        </button>
      </div>
    );
  }
})

const FileUpload = React.createClass({
  getInitialState() {
    return {
      fileList: []
    }
  },

  handleDragOver: function handleDragOver(e) {
    if ('preventDefault' in e) {
      e.stopPropagation();
      e.preventDefault();
    }
    var hoverState = e.type === 'dragover' ? styles.hover : null;
    this.setState({
      hoverState: hoverState
    });
  },

  // handleDragOver(e) {
  //   if ('preventDefault' in e) {
  //     e.stopPropagation();
  //     e.preventDefault();
  //   }
  //   const hoverState = do {
  //     if (e.type === 'dragover') {
  //       styles.hover
  //     } else {
  //       null
  //     }
  //   }
  //   this.setState({
  //       hoverState
  //     })
  // },
  handleFileSelect(e) {
    this.handleDragOver(e);
    const files = e.target.files || e.dataTransfer.files;
    const fileList = Object.keys(files).map(file => files[file]);
    this.setState({
      fileList
    });
  },

  removeItem(index) {
    const fileList = this.state.fileList;
    fileList.splice(index, 1);
    this.setState({
      fileList
    });
  },
  removeFile(file) {
    const fileList = this.state.fileList;
    const index = fileList.indexOf(file);
    this.removeItem(index);
  },
  uploadFile(file) {
    return new Promise((resolve, reject) => {
      const fileList = this.state.fileList;
      const index = fileList.indexOf(file);
      fileList[index].loading = true;
      this.setState({ fileList });
      if (typeof file === 'file' || !('size' in file)) {
        return reject(new Error('No file size'));
      }
      this.props.onUpload(file).then((data) => {
        resolve(data);
      });
    });
  },

  previews() {
    return this.state.fileList.map((file, index) => {
      const removeItem = () => {
        this.removeItem(index);
      }
      const uploadFile = () => {
        this.uploadFile(file).then(() => {
          this.removeFile(file);
        });
      }
      return (
        <FilePreview key={index}
          data={file}
          onRemove={removeItem}
          onUpload={uploadFile} />
      );
    });
  },
  uploadFiles() {
    this.state.fileList.forEach(file => {
      this.uploadFile(file).then(() => {
        this.removeFile(file);
      });
    });
  },
  selectFile(e) {
    e.preventDefault();
    this.input.click(e);
  },
  render() {
    const {
      maxSize,
      name,
      multiple,
      label
    } = this.props;

    const dragClasses = [
      styles.fileDrag,
      this.state.hoverState
    ].join(' ').trim();
    // const fileExt = do {
    //   if (this.state.fileList.length === 1) {
    //     if (this.state.fileList[0].type) {
    //       `.${getExtFromType(this.state.fileList[0].type)}`;
    //     } else {
    //       `.${getExtFromName(this.state.fileList[0].name)}`;
    //     }
    //   } else {
    //     null;
    //   }
    // };
    // const extTail = do {
    //   if (fileExt) {
    //     <span className={styles.fileExt}>{fileExt}</span>
    //   } else {
    //     null;
    //   }
    // }
    // const fileNames = do {
    //   if (this.state.fileList.length > 1) {
    //     `${this.state.fileList.length} Files`
    //   } else if (this.state.fileList.length === 1) {
    //     this.state.fileList[0].name.replace(fileExt, '');
    //   } else {
    //     'No file chosen';
    //   }
    // }

    var fileExt = this.state.fileList.length === 1 ? this.state.fileList[0].type ? '.' + getExtFromType(this.state.fileList[0].type) : '.' + getExtFromName(this.state.fileList[0].name) : null;
    var extTail = fileExt ? React.createElement(
      'span',
      { className: styles.fileExt },
      fileExt
    ) : null;
    var fileNames = this.state.fileList.length > 1 ? this.state.fileList.length + ' Files' : this.state.fileList.length === 1 ? this.state.fileList[0].name.replace(fileExt, '') : 'No file chosen';


    return (
      <div>
        <input type='hidden' name={`${name}:maxSize`} value={maxSize} />
        <div>
          <label>
            <span>{label}</span>
            <div className={dragClasses}
              onDragOver={this.handleDragOver}
              onDragLeave={this.handleDragOver}
              onDrop={this.handleFileSelect}>
              <div className={styles.inputWrapper}>
                <input type='file'
                  tabIndex='-1'
                  ref={x => this.input = x}
                  className={styles.input}
                  name={name}
                  multiple={multiple}
                  onChange={this.handleFileSelect} />
                <div className={styles.inputCover}>
                  <button className={styles.button}
                    type='button'
                    onClick={this.selectFile}>
                    Choose Files</button>
                  <span className={styles.fileName}>{fileNames}</span>
                  {extTail}
                </div>
              </div>
              <span className={styles.helpText}>or drop files here</span></div>
          </label>
          <button className={styles.button}
            type='button'
            onClick={this.uploadFiles}>
            Upload All
            </button>
          <div className={styles.previews}>{this.previews()}</div>
        </div>
      </div>
    );
  }
});



export default FileUpload; 










































/*import React from 'react';

class UploadImg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.onprogress = function (data) {
      if (data.lengthComputable) {
        var progress = parseInt(((data.loaded / data.total) * 100), 10);
        console.log(progress);
      }
    }

    // reader.readAsDataURL(file)
  }


  render() {
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    return (
      <div>
        <form onSubmit={this._handleSubmit}>
          <input type="file" onChange={this._handleImageChange} />
          <button type="submit" onClick={this._handleSubmit}>Upload Image</button>
        </form>
        {$imagePreview}
      </div>
    )
  }

}

export default UploadImg;*/


// import React from 'react';
// import { Field } from 'redux-form';



/*class renderInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: ''
    };
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    // reader.onloadend = () => {
    //   let result = {
    //     file: file,
    //     imagePreviewUrl: reader.result
    //   }
    //   onChange(result)
    // }

    reader.readAsDataURL(file)

  }

  render() {
    const { input: { value } } = this.props

    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }

    return (
      <div>
        <input type="file" value={value} onChange={this.onChange} />
        {$imagePreview}
      </div>
    )
  }
}*/

/*class renderInput extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render() {
    const { input: { value } } = this.props

    return (<input
      type="file"
      value={value}
      onChange={this.onChange}
    />)
  }
}

const UploadImg = props => {

  return (
    <Field
      type="file"
      name="poster"
      component={renderInput}
    />
  )
}*/

/*class renderInput extends React.Component {
  constructor(props) {
    super(props)
    this.onChange = this.onChange.bind(this)
  }

  onChange(e) {
    const { input: { onChange } } = this.props
    onChange(e.target.files[0])
  }

  render() {
    const { input: { value } } = this.props

    return (<input
      type="file"
      value={value}
      onChange={this.onChange}
    />)
  }
}

const UploadImg = props => {

  return (
    <Field
      type="file"
      name="poster"
      component={renderInput}
    />
  )
}*/

// export default UploadImg;
