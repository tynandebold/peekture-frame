import React from 'react';
import { ChromePicker } from 'react-color';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      blob: '',
      canvasCreated: false,
      color: {
        hex: '#51B5F0'
      },
      displayColorPicker: false,
      width: 20
    }

    this.fileInput = React.createRef();
    this.canvas = React.createRef();
  }

  createBorderedImage = () => {
    const _this = this;
    const _state = this.state;
    const _canvas = this.canvas.current;
    const fileList = this.fileInput.current.files;
    const reader = new FileReader();
    
    if (typeof fileList[0] == 'undefined') {
      return;
    }

    reader.readAsDataURL(fileList[0]);
    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;

      image.onload = (e) => {
        _this.setState({ canvasCreated: true, });
        _canvas.width = e.target.width + (_state.width * 2);
        _canvas.height = e.target.height + (_state.width * 2);

        const ctx = _canvas.getContext('2d');
        ctx.fillStyle = _state.color.hex;
        ctx.fillRect(0, 0, _canvas.width, _canvas.height);
        ctx.drawImage(image, _state.width, _state.width);

        ctx.canvas.toBlob((blob) => {
          _this.setState({
            blob: URL.createObjectURL(blob)
          });
        });
      };
    }
  }

  handleChange = (event, key) => {
    this.setState({
      [key]: key === 'width' ? event.target.value : event
    },
      this.createBorderedImage
    );    
  }

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  }

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  }

  render() {
    const classes = this.state.canvasCreated ? "second-stage-inputs show" : "second-stage-inputs";

    return (
      <React.Fragment>
        <div className="content-wrapper">
          {!this.state.canvasCreated && <div className="placeholder"></div>}
          <div>
            <canvas id="canvas" width="0" height="0" ref={this.canvas}></canvas>
          </div>
          <div className="inputs-wrapper">
            <div className="file-input-wrapper btn">
              Click to upload file
              <input
                type="file"
                id="input"
                onChange={this.createBorderedImage}
                ref={this.fileInput}
              />
            </div>
            <div style={{position: 'relative'}}>
              <div className={classes}>
                <label>Border options</label>
                <div>
                  <input
                    onChange={(e) => this.handleChange(e, 'width')}
                    min="1"
                    placeholder="Width"
                    step="1"
                    type="number"
                    value={this.state.width}
                  />
                </div>
                <div className="color-picker-wrapper">
                  <div className="swatch-wrapper" onClick={this.handleClick}>
                    <div className="swatch" style={{background: this.state.color.hex}} />
                  </div>
                  {this.state.displayColorPicker ? <div className="popup">
                    <div className="popup-cover" onClick={this.handleClose} />
                    <ChromePicker
                      color={this.state.color.hex}
                      disableAlpha={true}
                      onChangeComplete={(color) => this.handleChange(color, 'color')}
                    />
                  </div> : null}
                  <label>Color</label>
                </div>
                <a
                  download="bordered-image.jpg"
                  className="btn btn-download"
                  href={this.state.blob}>
                  Download image
                </a>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;