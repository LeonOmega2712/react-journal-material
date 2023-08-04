import { fileUpload } from '../../src/helpers/fileUpload';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dyqkpjxhj',
  api_key: '635221163656581',
  api_secret: 'mnWGx6cVKPcpi6L8kHlF6EgrDf0',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  test('debe de subir el archivo correctamente a cloudinary', async () => {
    const imageUrl =
      'https://images.unsplash.com/photo-1689525970033-948720b0ccf8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80';

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.png');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    // console.log(url);
    const segments = url.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');
    // console.log({imageId});
    const cloudResp = await cloudinary.api.delete_resources(
      [`journal-app/${imageId}`],
      { resource_type: 'image' }
    );
    // console.log({ cloudResp });
  });

  test('debe de retornar null', async () => {
    const file = new File([], 'foto.png');
    const url = await fileUpload(file);
    expect(url).toBe(null);
  }); 
});
