import { ImageWithSize } from './components/ImageWithSize';
import { logger } from './utils/logger';

export const activate = (growi: any): void => {
  logger.info('Activating image size plugin...');
  
  if (growi.markdownRenderer && growi.markdownRenderer.optionsGenerators) {
    logger.debug('Found markdown renderer, registering components...');
    
    try {
      const originalGenerateViewOptions = growi.markdownRenderer.optionsGenerators.generateViewOptions;
      
      growi.markdownRenderer.optionsGenerators.generateViewOptions = (...args: any[]) => {
        const options = originalGenerateViewOptions(...args);
        
        if (options.components) {
          logger.debug('Replacing img component with ImageWithSize component');
          options.components.img = ImageWithSize;
        } else {
          logger.warn('No components object found in options, cannot replace img component');
        }
        
        return options;
      };
      
      const originalGeneratePreviewOptions = growi.markdownRenderer.optionsGenerators.generatePreviewOptions;
      
      growi.markdownRenderer.optionsGenerators.generatePreviewOptions = (...args: any[]) => {
        const options = originalGeneratePreviewOptions(...args);
        
        if (options.components) {
          options.components.img = ImageWithSize;
        } else {
          logger.warn('No components object found in preview options, cannot replace img component');
        }
        
        return options;
      };
      
      logger.info('Image size plugin successfully activated');
    } catch (error) {
      logger.error('Error activating image size plugin:', error);
    }
  } else {
    logger.error('Could not find markdown renderer or optionsGenerators');
  }
};
