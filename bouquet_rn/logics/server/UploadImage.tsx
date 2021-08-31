import * as APIs from './APIUtils';

export default async function UploadImageAsync(uri: string): APIs.ResultOutput {
  let extension = '';
  for (let i = uri.length - 1; i >= 0; i-=1) {
    if (uri.charAt(i) === '.') {
      extension = uri.slice(i, uri.length);
      break;
    }
  }
  let type = ''
  if (extension === ".jpg" || extension === ".jpeg") {
    type = "image/jpeg"
  }
  else if (extension === ".png") {
    type = "image/png"
  }
  else if (extension === ".gif") {
    type = "image/gif"
  }
  else {
    return "지원하지 않는 형식이거나, 파일 이름이 잘못되었어요.";
  }

  const formData = new FormData();
  formData.append('img', {
    type,
    uri,
    name: `upload${extension}`,
  });

  const result = await APIs.postAsync(
    "/img/upload",
    { 'Content-Type': 'multipart/form-data' },
    formData,
    true
  );
  
  return result;
}