import ImageUploading from 'react-images-uploading';
import { FaPaperclip, FaTrash } from 'react-icons/fa';

const maxNumber = 5;

export default function ImageLibrary({ images, onChangeImage }) {
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChangeImage}
      maxNumber={maxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <div className="upload__image-wrapper">
          <button
            style={isDragging ? { color: 'red' } : undefined}
            onClick={onImageUpload}
            {...dragProps}
          >
            Click or Drop here
          </button>
          &nbsp;
          <button onClick={onImageRemoveAll}>Remove all images</button>
          <div style={{ marginTop: '10px' }}>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="" width="150" height="150" />
                <div className="image-item__btn-wrapper">
                  <div>
                    <span style={{ padding: '20px' }}>
                      <FaPaperclip
                        onClick={() => onImageUpdate(index)}
                      ></FaPaperclip>
                    </span>
                    <span style={{ padding: '20px' }}>
                      {' '}
                      <FaTrash onClick={() => onImageRemove(index)}></FaTrash>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ImageUploading>
  );
}
