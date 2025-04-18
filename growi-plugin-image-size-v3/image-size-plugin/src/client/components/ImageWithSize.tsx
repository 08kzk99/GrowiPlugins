import React, { useState, useEffect } from 'react';
import { logger } from '../utils/logger';

type ImageWithSizeProps = React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

/**
 * Component to render images with size adjustment capabilities
 */
export const ImageWithSize: React.FC<ImageWithSizeProps> = (props) => {
  const { src, alt, width, height, style, onClick, ...rest } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageSize, setImageSize] = useState({ 
    width: width || '', 
    height: height || '' 
  });
  const [originalSize, setOriginalSize] = useState<{ width?: string | number, height?: string | number }>({ width, height });

  useEffect(() => {
    // Store original size when component mounts
    setOriginalSize({ width, height });
    logger.debug('ImageWithSize mounted with src:', src);
  }, [width, height, src]);

  // Combine width/height with style
  const combinedStyle = {
    ...style,
    ...(imageSize.width && { width: typeof imageSize.width === 'number' ? `${imageSize.width}px` : imageSize.width }),
    ...(imageSize.height && { height: typeof imageSize.height === 'number' ? `${imageSize.height}px` : imageSize.height }),
  };

  const handleDoubleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    e.stopPropagation();
    logger.debug('Image double-clicked, opening size adjustment modal');
    setIsModalOpen(true);
  };

  const handleSizeChange = (newSize: { width?: string | number; height?: string | number }) => {
    logger.debug('Applying new image size:', newSize);
    setImageSize({ ...imageSize, ...newSize });
    setIsModalOpen(false);
  };

  const handleReset = () => {
    logger.debug('Resetting image to original size');
    if (originalSize.width !== undefined || originalSize.height !== undefined) {
      setImageSize({ 
        width: originalSize.width || '', 
        height: originalSize.height || '' 
      });
    }
    setIsModalOpen(false);
  };

  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <>
      <img 
        src={src} 
        alt={alt || ''} 
        style={combinedStyle}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        {...rest} 
      />
      
      {isModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              maxWidth: '400px',
              width: '100%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>画像サイズ調整</h3>
            
            <div style={{ marginBottom: '10px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>幅:</label>
              <input 
                type="text" 
                value={imageSize.width || ''} 
                onChange={(e) => setImageSize({ ...imageSize, width: e.target.value })}
                style={{ width: '100%', padding: '5px' }}
                placeholder="例: 300px, 50%, auto"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px' }}>高さ:</label>
              <input 
                type="text" 
                value={imageSize.height || ''} 
                onChange={(e) => setImageSize({ ...imageSize, height: e.target.value })}
                style={{ width: '100%', padding: '5px' }}
                placeholder="例: 200px, auto"
              />
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f1f1f1',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                キャンセル
              </button>
              <button 
                onClick={handleReset}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#f1f1f1',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginLeft: '8px',
                }}
              >
                リセット
              </button>
              <button 
                onClick={() => handleSizeChange(imageSize)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#4285f4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginLeft: '8px',
                }}
              >
                適用
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
