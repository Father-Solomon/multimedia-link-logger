export const imageExtensions = ["png", "jpg", "gif"];
export const videoExtensions = ["mp4", "wmv", "mkv", "avi"];

export function getUrlExtension(url: string): string | boolean {
  return url.split(/[#?]/)[0].split('.')?.pop()?.trim() ?? false;
}

export function mediaExtensionResolver(url: string): 'video' | 'image' | boolean {
  const extension = getUrlExtension(url);
  if (extension && imageExtensions.includes(<string>extension)) {
    return "image";
  } else if (extension && videoExtensions.includes(<string>extension)) {
    return 'video';
  } else {
    return false
  }
}
