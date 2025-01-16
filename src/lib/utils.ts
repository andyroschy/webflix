const imageSize = {
  preview: 'w300',
  large: 'w1280',
};

const baseUrl = 'http://image.tmdb.org/t/p';

export function buildImgUrl(imageUrl: string, size: keyof typeof imageSize) {
  return `${baseUrl}/${imageSize[size]}/${imageUrl}`;
}