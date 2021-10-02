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
        // write your building UI
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
          {imageList.map((image, index) => (
            <div key={index} className="image-item">
              <img src={image['data_url']} alt="" width="100" />
              <div className="image-item__btn-wrapper">
                <FaPaperclip
                  onClick={() => onImageUpdate(index)}
                  style={{ padding: '2px' }}
                ></FaPaperclip>
                <FaTrash
                  onClick={() => onImageRemove(index)}
                  style={{ padding: '2px' }}
                ></FaTrash>
              </div>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
}
