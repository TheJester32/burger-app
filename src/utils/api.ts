const BASE_URL = 'https://norma.nomoreparties.space/api';

async function checkResponse(response: Response) {
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Ошибка на стороне сервера');
    }
    return response.json();
  }

export {BASE_URL, checkResponse};